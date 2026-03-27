export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AppetiteLevel = 'light' | 'moderate' | 'hearty'
export type QuantityLevel = 'low' | 'medium' | 'plenty'
export type AgeGroup = 'child' | 'teen' | 'adult' | 'senior'
export type MealPlanStatus = 'draft' | 'active' | 'completed' | 'archived'
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      household_members: {
        Row: {
          id: string
          profile_id: string
          name: string
          appetite_level: AppetiteLevel
          dietary_restrictions: string[]
          allergies: string[]
          cuisine_preferences: string[]
          age_group: AgeGroup | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          name: string
          appetite_level?: AppetiteLevel
          dietary_restrictions?: string[]
          allergies?: string[]
          cuisine_preferences?: string[]
          age_group?: AgeGroup | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          name?: string
          appetite_level?: AppetiteLevel
          dietary_restrictions?: string[]
          allergies?: string[]
          cuisine_preferences?: string[]
          age_group?: AgeGroup | null
          notes?: string | null
          updated_at?: string
        }
      }
      pantry_items: {
        Row: {
          id: string
          profile_id: string
          name: string
          quantity_level: QuantityLevel
          quantity_value: number | null
          unit: string | null
          expiration_date: string | null
          category: string
          location: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          name: string
          quantity_level?: QuantityLevel
          quantity_value?: number | null
          unit?: string | null
          expiration_date?: string | null
          category: string
          location?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          name?: string
          quantity_level?: QuantityLevel
          quantity_value?: number | null
          unit?: string | null
          expiration_date?: string | null
          category?: string
          location?: string | null
          notes?: string | null
          updated_at?: string
        }
      }
      meal_plans: {
        Row: {
          id: string
          profile_id: string
          week_start_date: string
          week_end_date: string | null
          plan_data: Json
          status: MealPlanStatus
          total_meals: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          week_start_date: string
          week_end_date?: string | null
          plan_data?: Json
          status?: MealPlanStatus
          total_meals?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          week_start_date?: string
          week_end_date?: string | null
          plan_data?: Json
          status?: MealPlanStatus
          total_meals?: number
          notes?: string | null
          updated_at?: string
        }
      }
      cooked_meals: {
        Row: {
          id: string
          profile_id: string
          meal_plan_id: string | null
          date_cooked: string
          meal_type: MealType
          meal_data: Json
          rating: number | null
          feedback: string | null
          would_make_again: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          meal_plan_id?: string | null
          date_cooked: string
          meal_type?: MealType
          meal_data?: Json
          rating?: number | null
          feedback?: string | null
          would_make_again?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          meal_plan_id?: string | null
          date_cooked?: string
          meal_type?: MealType
          meal_data?: Json
          rating?: number | null
          feedback?: string | null
          would_make_again?: boolean | null
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type HouseholdMember = Database['public']['Tables']['household_members']['Row']
export type PantryItem = Database['public']['Tables']['pantry_items']['Row']
export type MealPlan = Database['public']['Tables']['meal_plans']['Row']
export type CookedMeal = Database['public']['Tables']['cooked_meals']['Row']
