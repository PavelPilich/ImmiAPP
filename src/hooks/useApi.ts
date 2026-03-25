import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef, useCallback } from 'react'
import * as api from '../lib/api'

// ── Profile ──

export function useProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => api.getProfile(userId!),
    enabled: !!userId,
  })
}

export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (params: { userId: string; updates: Parameters<typeof api.upsertProfile>[1] }) =>
      api.upsertProfile(params.userId, params.updates),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ['profile', vars.userId] })
    },
  })
}

// ── Saved Forms ──

export function useSavedForms(userId: string | undefined) {
  return useQuery({
    queryKey: ['savedForms', userId],
    queryFn: () => api.getSavedForms(userId!),
    enabled: !!userId,
  })
}

export function useSaveForm() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.upsertSavedForm,
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ['savedForms', vars.userId] })
    },
  })
}

export function useUpdateFormStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (params: { formId: string; status: string; extra?: Parameters<typeof api.updateFormStatus>[2] }) =>
      api.updateFormStatus(params.formId, params.status, params.extra),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['savedForms'] })
    },
  })
}

// ── Auto-save hook (debounced) ──

export function useAutoSave() {
  const saveForm = useSaveForm()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedSave = useCallback(
    (params: Parameters<typeof api.upsertSavedForm>[0]) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        saveForm.mutate(params)
      }, 800)
    },
    [saveForm]
  )

  const immediateSave = useCallback(
    (params: Parameters<typeof api.upsertSavedForm>[0]) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      saveForm.mutate(params)
    },
    [saveForm]
  )

  return { debouncedSave, immediateSave, saveForm }
}

// ── Uploads ──

export function useUploads(savedFormId: string | undefined) {
  return useQuery({
    queryKey: ['uploads', savedFormId],
    queryFn: () => api.getUploads(savedFormId!),
    enabled: !!savedFormId,
  })
}

export function useUploadDoc() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.uploadDocument,
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ['uploads', vars.savedFormId] })
    },
  })
}

export function useDeleteUpload() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (params: { uploadId: string; storagePath: string }) =>
      api.deleteUpload(params.uploadId, params.storagePath),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['uploads'] })
    },
  })
}

// ── Payments ──

export function usePayments(userId: string | undefined) {
  return useQuery({
    queryKey: ['payments', userId],
    queryFn: () => api.getPayments(userId!),
    enabled: !!userId,
  })
}

export function useRecordPayment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.recordPayment,
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ['payments', vars.userId] })
    },
  })
}

// ── Promo Codes ──

export function useValidatePromo() {
  return useMutation({
    mutationFn: api.validatePromoCode,
  })
}
