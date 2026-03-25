export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          preferred_language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone?: string | null
          preferred_language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          preferred_language?: string
          created_at?: string
          updated_at?: string
        }
      }
      saved_forms: {
        Row: {
          id: string
          user_id: string
          form_type: string
          form_data: Record<string, string>
          current_section: number
          status: string
          package_type: string | null
          case_reference: string | null
          uscis_confirmation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          form_type: string
          form_data?: Record<string, string>
          current_section?: number
          status?: string
          package_type?: string | null
          case_reference?: string | null
          uscis_confirmation?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          form_type?: string
          form_data?: Record<string, string>
          current_section?: number
          status?: string
          package_type?: string | null
          case_reference?: string | null
          uscis_confirmation?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      uploads: {
        Row: {
          id: string
          user_id: string
          saved_form_id: string
          document_type: string
          storage_path: string
          file_name: string
          file_size: number | null
          mime_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          saved_form_id: string
          document_type: string
          storage_path: string
          file_name: string
          file_size?: number | null
          mime_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          saved_form_id?: string
          document_type?: string
          storage_path?: string
          file_name?: string
          file_size?: number | null
          mime_type?: string | null
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          saved_form_id: string
          stripe_payment_intent_id: string | null
          paypal_order_id: string | null
          method: string
          amount_cents: number
          currency: string
          status: string
          promo_code: string | null
          discount_cents: number
          receipt_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          saved_form_id: string
          stripe_payment_intent_id?: string | null
          paypal_order_id?: string | null
          method: string
          amount_cents: number
          currency?: string
          status?: string
          promo_code?: string | null
          discount_cents?: number
          receipt_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          saved_form_id?: string
          stripe_payment_intent_id?: string | null
          paypal_order_id?: string | null
          method?: string
          amount_cents?: number
          currency?: string
          status?: string
          promo_code?: string | null
          discount_cents?: number
          receipt_url?: string | null
          created_at?: string
        }
      }
      promo_codes: {
        Row: {
          id: string
          code: string
          discount_percent: number
          max_uses: number | null
          current_uses: number
          valid_from: string
          valid_until: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          code: string
          discount_percent: number
          max_uses?: number | null
          current_uses?: number
          valid_from?: string
          valid_until?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          code?: string
          discount_percent?: number
          max_uses?: number | null
          current_uses?: number
          valid_from?: string
          valid_until?: string | null
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
