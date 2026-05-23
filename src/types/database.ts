export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          created_at: string
          name: string
          logo_url: string | null
          website: string | null
          description: string | null
          location: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          logo_url?: string | null
          website?: string | null
          description?: string | null
          location?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          logo_url?: string | null
          website?: string | null
          description?: string | null
          location?: string | null
        }
      }
      jobs: {
        Row: {
          id: string
          created_at: string
          company_id: string
          title: string
          description: string
          salary_range: string | null
          location: string | null
          type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | null
          remote_option: 'Remote' | 'Hybrid' | 'On-site' | null
          status: 'draft' | 'published' | 'filled' | 'archived'
          is_featured: boolean
          expires_at: string | null
          application_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_id: string
          title: string
          description: string
          salary_range?: string | null
          location?: string | null
          type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | null
          remote_option?: 'Remote' | 'Hybrid' | 'On-site' | null
          status?: 'draft' | 'published' | 'filled' | 'archived'
          is_featured?: boolean
          expires_at?: string | null
          application_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_id?: string
          title?: string
          description?: string
          salary_range?: string | null
          location?: string | null
          type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | null
          remote_option?: 'Remote' | 'Hybrid' | 'On-site' | null
          status?: 'draft' | 'published' | 'filled' | 'archived'
          is_featured?: boolean
          expires_at?: string | null
          application_url?: string | null
        }
      }
      job_alerts: {
        Row: {
          id: string
          created_at: string
          email: string
          preferred_role_type: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          preferred_role_type?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          preferred_role_type?: string | null
          is_active?: boolean
        }
      }
    }
  }
}
