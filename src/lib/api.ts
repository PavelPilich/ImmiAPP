import { supabase } from './supabase'

// ── Profile ──

export async function getProfile(userId: string) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

export async function upsertProfile(userId: string, updates: {
  full_name?: string
  email?: string
  phone?: string | null
  preferred_language?: string
}) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...updates } as any)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── Saved Forms ──

export async function getSavedForms(userId: string) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('saved_forms')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function getSavedForm(formId: string) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('saved_forms')
    .select('*')
    .eq('id', formId)
    .single()
  if (error) throw error
  return data
}

export async function upsertSavedForm(params: {
  id?: string
  userId: string
  formType: string
  formData: Record<string, string>
  currentSection: number
  status?: string
  packageType?: string | null
  caseReference?: string | null
}) {
  if (!supabase) return null

  // If we have an id, update existing
  if (params.id) {
    const { data, error } = await supabase
      .from('saved_forms')
      .update({
        form_data: params.formData,
        current_section: params.currentSection,
        status: params.status,
        package_type: params.packageType,
        case_reference: params.caseReference,
      })
      .eq('id', params.id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  // Check for existing draft
  const { data: existing } = await supabase
    .from('saved_forms')
    .select('id')
    .eq('user_id', params.userId)
    .eq('form_type', params.formType)
    .eq('status', 'draft')
    .limit(1)
    .single()

  if (existing) {
    const { data, error } = await supabase
      .from('saved_forms')
      .update({
        form_data: params.formData,
        current_section: params.currentSection,
        status: params.status || 'draft',
        package_type: params.packageType,
        case_reference: params.caseReference,
      })
      .eq('id', existing.id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  // Insert new
  const { data, error } = await supabase
    .from('saved_forms')
    .insert({
      user_id: params.userId,
      form_type: params.formType,
      form_data: params.formData,
      current_section: params.currentSection,
      status: params.status || 'draft',
      package_type: params.packageType,
      case_reference: params.caseReference,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateFormStatus(formId: string, status: string, extra?: {
  uscis_confirmation?: string
  package_type?: string
  case_reference?: string
}) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('saved_forms')
    .update({ status, ...extra })
    .eq('id', formId)
    .select()
    .single()
  if (error) throw error
  return data
}

// ── Uploads ──

export async function uploadDocument(params: {
  userId: string
  savedFormId: string
  documentType: string
  file: File
}) {
  if (!supabase) return null

  const ext = params.file.name.split('.').pop() || 'jpg'
  const path = `${params.userId}/${params.savedFormId}/${params.documentType}_${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('documents')
    .upload(path, params.file)
  if (uploadError) throw uploadError

  const { data, error } = await supabase
    .from('uploads')
    .insert({
      user_id: params.userId,
      saved_form_id: params.savedFormId,
      document_type: params.documentType,
      storage_path: path,
      file_name: params.file.name,
      file_size: params.file.size,
      mime_type: params.file.type,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getDocumentUrl(storagePath: string) {
  if (!supabase) return null
  const { data } = await supabase.storage
    .from('documents')
    .createSignedUrl(storagePath, 3600)
  return data?.signedUrl || null
}

export async function getUploads(savedFormId: string) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('uploads')
    .select('*')
    .eq('saved_form_id', savedFormId)
  if (error) throw error
  return data || []
}

export async function deleteUpload(uploadId: string, storagePath: string) {
  if (!supabase) return
  await supabase.storage.from('documents').remove([storagePath])
  await supabase.from('uploads').delete().eq('id', uploadId)
}

// ── Payments ──

export async function recordPayment(params: {
  userId: string
  savedFormId: string
  method: string
  amountCents: number
  currency?: string
  promoCode?: string | null
  discountCents?: number
  stripePaymentIntentId?: string | null
  paypalOrderId?: string | null
  status: string
  receiptUrl?: string | null
}) {
  if (!supabase) {
    console.log('[mock] Payment recorded:', params)
    return null
  }
  const { data, error } = await supabase
    .from('payments')
    .insert({
      user_id: params.userId,
      saved_form_id: params.savedFormId,
      method: params.method,
      amount_cents: params.amountCents,
      currency: params.currency || 'usd',
      promo_code: params.promoCode,
      discount_cents: params.discountCents || 0,
      stripe_payment_intent_id: params.stripePaymentIntentId,
      paypal_order_id: params.paypalOrderId,
      status: params.status,
      receipt_url: params.receiptUrl,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getPayments(userId: string) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

// ── Promo Codes ──

export async function validatePromoCode(code: string): Promise<{ valid: boolean; discountPercent: number }> {
  if (!supabase) {
    // Fallback: hardcoded WELCOME10
    if (code.toUpperCase() === 'WELCOME10') {
      return { valid: true, discountPercent: 10 }
    }
    return { valid: false, discountPercent: 0 }
  }

  const { data } = await supabase
    .from('promo_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single()

  if (!data) return { valid: false, discountPercent: 0 }

  const now = new Date()
  const validFrom = new Date(data.valid_from)
  const validUntil = data.valid_until ? new Date(data.valid_until) : null
  const withinUses = !data.max_uses || data.current_uses < data.max_uses

  if (now >= validFrom && (!validUntil || now <= validUntil) && withinUses) {
    return { valid: true, discountPercent: data.discount_percent }
  }

  return { valid: false, discountPercent: 0 }
}
