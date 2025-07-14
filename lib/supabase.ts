import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          specs: string | null
          price_usd: number
          price_ars: number | null
          image_url: string | null
          download_link: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          specs?: string | null
          price_usd: number
          price_ars?: number | null
          image_url?: string | null
          download_link?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          specs?: string | null
          price_usd?: number
          price_ars?: number | null
          image_url?: string | null
          download_link?: string | null
          is_active?: boolean
          updated_at?: string
        }
      }
      contact_info: {
        Row: {
          id: string
          phone: string | null
          email: string | null
          address: string | null
          city: string | null
          country: string | null
          website: string | null
          business_hours: any
          social_media: any
          updated_at: string
        }
        Insert: {
          id?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          website?: string | null
          business_hours?: any
          social_media?: any
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          website?: string | null
          business_hours?: any
          social_media?: any
          updated_at?: string
        }
      }
      currency_rates: {
        Row: {
          id: string
          usd_to_ars: number
          source: string
          updated_at: string
        }
        Insert: {
          id?: string
          usd_to_ars: number
          source?: string
          updated_at?: string
        }
        Update: {
          id?: string
          usd_to_ars?: number
          source?: string
          updated_at?: string
        }
      }
      instagram_posts: {
        Row: {
          id: string
          instagram_id: string
          image_url: string
          caption: string | null
          likes: number
          comments: number
          post_url: string
          timestamp: string
          is_visible: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          instagram_id: string
          image_url: string
          caption?: string | null
          likes?: number
          comments?: number
          post_url: string
          timestamp: string
          is_visible?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          instagram_id?: string
          image_url?: string
          caption?: string | null
          likes?: number
          comments?: number
          post_url?: string
          timestamp?: string
          is_visible?: boolean
          updated_at?: string
        }
      }
    }
  }
}
