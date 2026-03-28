import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

interface AuthUser {
  name: string
  email: string
  id?: string
}

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  resendVerification: (email: string) => Promise<void>
  mockLogin: (name: string, email: string) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.full_name || session.user.email || '',
          email: session.user.email || '',
          id: session.user.id,
        })
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.full_name || session.user.email || '',
          email: session.user.email || '',
          id: session.user.id,
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    if (!supabase) {
      mockLogin('User', email)
      return
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    if (!supabase) {
      mockLogin(fullName || 'User', email)
      return
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: fullName ? { data: { full_name: fullName } } : undefined,
    })
    if (error) throw error
  }

  const signInWithGoogle = async () => {
    if (!supabase) {
      mockLogin('Google User', 'user@gmail.com')
      return
    }
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) throw error
  }

  const signInWithApple = async () => {
    if (!supabase) {
      mockLogin('Apple User', 'user@icloud.com')
      return
    }
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'apple' })
    if (error) throw error
  }

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }

  const resetPassword = async (email: string) => {
    if (!supabase) return
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  const resendVerification = async (email: string) => {
    if (!supabase) return
    const { error } = await supabase.auth.resend({ type: 'signup', email })
    if (error) throw error
  }

  const mockLogin = (name: string, email: string) => {
    setUser({ name, email })
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInWithApple,
        signOut,
        resetPassword,
        resendVerification,
        mockLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
