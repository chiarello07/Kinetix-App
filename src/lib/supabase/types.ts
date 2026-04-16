// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          name: string
          password_hash: string
          permissions: Json | null
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login?: string | null
          name: string
          password_hash: string
          permissions?: Json | null
          role?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          name?: string
          password_hash?: string
          permissions?: Json | null
          role?: string
        }
        Relationships: []
      }
      ai_food_identifications: {
        Row: {
          created_at: string | null
          food_log_id: string
          id: string
          identified_foods: Json | null
          input_type: string | null
          input_url: string | null
          raw_ai_response: Json | null
          user_confirmed: boolean | null
          user_corrections: Json | null
        }
        Insert: {
          created_at?: string | null
          food_log_id: string
          id?: string
          identified_foods?: Json | null
          input_type?: string | null
          input_url?: string | null
          raw_ai_response?: Json | null
          user_confirmed?: boolean | null
          user_corrections?: Json | null
        }
        Update: {
          created_at?: string | null
          food_log_id?: string
          id?: string
          identified_foods?: Json | null
          input_type?: string | null
          input_url?: string | null
          raw_ai_response?: Json | null
          user_confirmed?: boolean | null
          user_corrections?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_food_identifications_food_log_id_fkey"
            columns: ["food_log_id"]
            isOneToOne: false
            referencedRelation: "food_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      app_settings: {
        Row: {
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      assessment_responses: {
        Row: {
          answer_score: number | null
          answer_type: string | null
          answer_value: string | null
          created_at: string | null
          id: string
          nutrition_assessment_id: string
          question_category: string | null
          question_id: string
          question_text: string
        }
        Insert: {
          answer_score?: number | null
          answer_type?: string | null
          answer_value?: string | null
          created_at?: string | null
          id?: string
          nutrition_assessment_id: string
          question_category?: string | null
          question_id: string
          question_text: string
        }
        Update: {
          answer_score?: number | null
          answer_type?: string | null
          answer_value?: string | null
          created_at?: string | null
          id?: string
          nutrition_assessment_id?: string
          question_category?: string | null
          question_id?: string
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_responses_nutrition_assessment_id_fkey"
            columns: ["nutrition_assessment_id"]
            isOneToOne: false
            referencedRelation: "nutrition_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          admin_email: string | null
          admin_id: string | null
          created_at: string | null
          entity: string
          entity_id: string | null
          id: string
          ip_address: string | null
          new_value: Json | null
          old_value: Json | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_email?: string | null
          admin_id?: string | null
          created_at?: string | null
          entity: string
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          new_value?: Json | null
          old_value?: Json | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_email?: string | null
          admin_id?: string | null
          created_at?: string | null
          entity?: string
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          new_value?: Json | null
          old_value?: Json | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_summaries: {
        Row: {
          calories_percentage: number | null
          calories_remaining: number | null
          carbs_percentage: number | null
          carbs_remaining: number | null
          completed: boolean | null
          created_at: string | null
          exceeded: boolean | null
          fat_percentage: number | null
          fat_remaining: number | null
          id: string
          meal_logs: Json | null
          meals_logged: number | null
          nutrition_plan_id: string
          protein_percentage: number | null
          protein_remaining: number | null
          summary_date: string
          target_calories: number | null
          target_carbs: number | null
          target_fat: number | null
          target_protein: number | null
          total_calories_consumed: number | null
          total_carbs_consumed: number | null
          total_fat_consumed: number | null
          total_protein_consumed: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          calories_percentage?: number | null
          calories_remaining?: number | null
          carbs_percentage?: number | null
          carbs_remaining?: number | null
          completed?: boolean | null
          created_at?: string | null
          exceeded?: boolean | null
          fat_percentage?: number | null
          fat_remaining?: number | null
          id?: string
          meal_logs?: Json | null
          meals_logged?: number | null
          nutrition_plan_id: string
          protein_percentage?: number | null
          protein_remaining?: number | null
          summary_date: string
          target_calories?: number | null
          target_carbs?: number | null
          target_fat?: number | null
          target_protein?: number | null
          total_calories_consumed?: number | null
          total_carbs_consumed?: number | null
          total_fat_consumed?: number | null
          total_protein_consumed?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          calories_percentage?: number | null
          calories_remaining?: number | null
          carbs_percentage?: number | null
          carbs_remaining?: number | null
          completed?: boolean | null
          created_at?: string | null
          exceeded?: boolean | null
          fat_percentage?: number | null
          fat_remaining?: number | null
          id?: string
          meal_logs?: Json | null
          meals_logged?: number | null
          nutrition_plan_id?: string
          protein_percentage?: number | null
          protein_remaining?: number | null
          summary_date?: string
          target_calories?: number | null
          target_carbs?: number | null
          target_fat?: number | null
          target_protein?: number | null
          total_calories_consumed?: number | null
          total_carbs_consumed?: number | null
          total_fat_consumed?: number | null
          total_protein_consumed?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_summaries_nutrition_plan_id_fkey"
            columns: ["nutrition_plan_id"]
            isOneToOne: false
            referencedRelation: "nutrition_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      decision_matrix: {
        Row: {
          deviation_id: string
          exercise_id: string
          priority: number | null
        }
        Insert: {
          deviation_id: string
          exercise_id: string
          priority?: number | null
        }
        Update: {
          deviation_id?: string
          exercise_id?: string
          priority?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "decision_matrix_deviation_id_fkey"
            columns: ["deviation_id"]
            isOneToOne: false
            referencedRelation: "deviations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_matrix_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      deviations: {
        Row: {
          affected_muscles: string[] | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          region: string | null
          scientific_reference: string | null
          tight_muscles: string[] | null
          type: string
          updated_at: string | null
          weak_muscles: string[] | null
        }
        Insert: {
          affected_muscles?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          region?: string | null
          scientific_reference?: string | null
          tight_muscles?: string[] | null
          type: string
          updated_at?: string | null
          weak_muscles?: string[] | null
        }
        Update: {
          affected_muscles?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          region?: string | null
          scientific_reference?: string | null
          tight_muscles?: string[] | null
          type?: string
          updated_at?: string | null
          weak_muscles?: string[] | null
        }
        Relationships: []
      }
      exercises: {
        Row: {
          contraindicated_for: string[] | null
          corrective_for: string[] | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          primary_muscles: string[]
          progression_cues: string | null
          safety_notes: string | null
          scientific_reference: string | null
          secondary_muscles: string[] | null
          tier: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          contraindicated_for?: string[] | null
          corrective_for?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          primary_muscles: string[]
          progression_cues?: string | null
          safety_notes?: string | null
          scientific_reference?: string | null
          secondary_muscles?: string[] | null
          tier: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          contraindicated_for?: string[] | null
          corrective_for?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          primary_muscles?: string[]
          progression_cues?: string | null
          safety_notes?: string | null
          scientific_reference?: string | null
          secondary_muscles?: string[] | null
          tier?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      food_database: {
        Row: {
          allergens: string[] | null
          brand_name: string | null
          calories_per_100g: number | null
          carbs_per_100g: number | null
          created_at: string | null
          fat_per_100g: number | null
          fiber_per_100g: number | null
          food_category: string | null
          food_name: string
          glycemic_index: number | null
          id: string
          is_processed: boolean | null
          last_synced: string | null
          micronutrients: Json | null
          protein_per_100g: number | null
          sugar_per_100g: number | null
          usda_fdc_id: string | null
        }
        Insert: {
          allergens?: string[] | null
          brand_name?: string | null
          calories_per_100g?: number | null
          carbs_per_100g?: number | null
          created_at?: string | null
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          food_category?: string | null
          food_name: string
          glycemic_index?: number | null
          id?: string
          is_processed?: boolean | null
          last_synced?: string | null
          micronutrients?: Json | null
          protein_per_100g?: number | null
          sugar_per_100g?: number | null
          usda_fdc_id?: string | null
        }
        Update: {
          allergens?: string[] | null
          brand_name?: string | null
          calories_per_100g?: number | null
          carbs_per_100g?: number | null
          created_at?: string | null
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          food_category?: string | null
          food_name?: string
          glycemic_index?: number | null
          id?: string
          is_processed?: boolean | null
          last_synced?: string | null
          micronutrients?: Json | null
          protein_per_100g?: number | null
          sugar_per_100g?: number | null
          usda_fdc_id?: string | null
        }
        Relationships: []
      }
      food_logs: {
        Row: {
          ai_analysis: Json | null
          ai_confidence: number | null
          confirmed: boolean | null
          confirmed_at: string | null
          created_at: string | null
          edited: boolean | null
          edited_at: string | null
          foods: Json
          id: string
          input_data: Json | null
          input_method: string
          log_date: string
          log_time: string | null
          meal_type: string | null
          nutrition_plan_id: string
          total_calories: number | null
          total_carbs_grams: number | null
          total_fat_grams: number | null
          total_protein_grams: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_analysis?: Json | null
          ai_confidence?: number | null
          confirmed?: boolean | null
          confirmed_at?: string | null
          created_at?: string | null
          edited?: boolean | null
          edited_at?: string | null
          foods: Json
          id?: string
          input_data?: Json | null
          input_method: string
          log_date: string
          log_time?: string | null
          meal_type?: string | null
          nutrition_plan_id: string
          total_calories?: number | null
          total_carbs_grams?: number | null
          total_fat_grams?: number | null
          total_protein_grams?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_analysis?: Json | null
          ai_confidence?: number | null
          confirmed?: boolean | null
          confirmed_at?: string | null
          created_at?: string | null
          edited?: boolean | null
          edited_at?: string | null
          foods?: Json
          id?: string
          input_data?: Json | null
          input_method?: string
          log_date?: string
          log_time?: string | null
          meal_type?: string | null
          nutrition_plan_id?: string
          total_calories?: number | null
          total_carbs_grams?: number | null
          total_fat_grams?: number | null
          total_protein_grams?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_logs_nutrition_plan_id_fkey"
            columns: ["nutrition_plan_id"]
            isOneToOne: false
            referencedRelation: "nutrition_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      food_substitutes: {
        Row: {
          created_at: string | null
          equivalent_calories: number | null
          equivalent_carbs: number | null
          equivalent_fat: number | null
          equivalent_protein: number | null
          id: string
          meal_food_id: string
          substitute_food_name: string
          substitute_quantity: number | null
          substitute_unit: string | null
          substitution_ratio: number | null
        }
        Insert: {
          created_at?: string | null
          equivalent_calories?: number | null
          equivalent_carbs?: number | null
          equivalent_fat?: number | null
          equivalent_protein?: number | null
          id?: string
          meal_food_id: string
          substitute_food_name: string
          substitute_quantity?: number | null
          substitute_unit?: string | null
          substitution_ratio?: number | null
        }
        Update: {
          created_at?: string | null
          equivalent_calories?: number | null
          equivalent_carbs?: number | null
          equivalent_fat?: number | null
          equivalent_protein?: number | null
          id?: string
          meal_food_id?: string
          substitute_food_name?: string
          substitute_quantity?: number | null
          substitute_unit?: string | null
          substitution_ratio?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "food_substitutes_meal_food_id_fkey"
            columns: ["meal_food_id"]
            isOneToOne: false
            referencedRelation: "meal_foods"
            referencedColumns: ["id"]
          },
        ]
      }
      foods: {
        Row: {
          allergens: string[] | null
          calories_per_100g: number | null
          carbs_per_100g: number | null
          category: string
          created_at: string | null
          description: string | null
          fat_per_100g: number | null
          fiber_per_100g: number | null
          glycemic_index: number | null
          glycemic_load: number | null
          id: string
          is_processed: boolean | null
          micronutrients: Json | null
          name: string
          protein_per_100g: number | null
          updated_at: string | null
        }
        Insert: {
          allergens?: string[] | null
          calories_per_100g?: number | null
          carbs_per_100g?: number | null
          category: string
          created_at?: string | null
          description?: string | null
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          glycemic_index?: number | null
          glycemic_load?: number | null
          id?: string
          is_processed?: boolean | null
          micronutrients?: Json | null
          name: string
          protein_per_100g?: number | null
          updated_at?: string | null
        }
        Update: {
          allergens?: string[] | null
          calories_per_100g?: number | null
          carbs_per_100g?: number | null
          category?: string
          created_at?: string | null
          description?: string | null
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          glycemic_index?: number | null
          glycemic_load?: number | null
          id?: string
          is_processed?: boolean | null
          micronutrients?: Json | null
          name?: string
          protein_per_100g?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      meal_foods: {
        Row: {
          calories: number | null
          carbs_grams: number | null
          created_at: string | null
          fat_grams: number | null
          fiber_grams: number | null
          food_category: string | null
          food_id: string | null
          food_name: string
          id: string
          meal_plan_id: string
          protein_grams: number | null
          quantity: number | null
          unit: string | null
        }
        Insert: {
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          fat_grams?: number | null
          fiber_grams?: number | null
          food_category?: string | null
          food_id?: string | null
          food_name: string
          id?: string
          meal_plan_id: string
          protein_grams?: number | null
          quantity?: number | null
          unit?: string | null
        }
        Update: {
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          fat_grams?: number | null
          fiber_grams?: number | null
          food_category?: string | null
          food_id?: string | null
          food_name?: string
          id?: string
          meal_plan_id?: string
          protein_grams?: number | null
          quantity?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_foods_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_foods_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          calories: number | null
          carbs_grams: number | null
          created_at: string | null
          fat_grams: number | null
          id: string
          meal_number: number | null
          meal_options: Json | null
          meal_type: string
          nutrition_plan_id: string
          protein_grams: number | null
          scheduled_time: string | null
          updated_at: string | null
        }
        Insert: {
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          fat_grams?: number | null
          id?: string
          meal_number?: number | null
          meal_options?: Json | null
          meal_type: string
          nutrition_plan_id: string
          protein_grams?: number | null
          scheduled_time?: string | null
          updated_at?: string | null
        }
        Update: {
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          fat_grams?: number | null
          id?: string
          meal_number?: number | null
          meal_options?: Json | null
          meal_type?: string
          nutrition_plan_id?: string
          protein_grams?: number | null
          scheduled_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_nutrition_plan_id_fkey"
            columns: ["nutrition_plan_id"]
            isOneToOne: false
            referencedRelation: "nutrition_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_assessments: {
        Row: {
          assessment_name: string
          assessment_type: string
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          interpretation: string | null
          interpretation_text: string | null
          max_score: number | null
          nutrition_profile_id: string
          recommendations: string[] | null
          responses: Json
          score_percentage: number | null
          total_score: number | null
          updated_at: string | null
        }
        Insert: {
          assessment_name: string
          assessment_type: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          interpretation?: string | null
          interpretation_text?: string | null
          max_score?: number | null
          nutrition_profile_id: string
          recommendations?: string[] | null
          responses: Json
          score_percentage?: number | null
          total_score?: number | null
          updated_at?: string | null
        }
        Update: {
          assessment_name?: string
          assessment_type?: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          interpretation?: string | null
          interpretation_text?: string | null
          max_score?: number | null
          nutrition_profile_id?: string
          recommendations?: string[] | null
          responses?: Json
          score_percentage?: number | null
          total_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_assessments_nutrition_profile_id_fkey"
            columns: ["nutrition_profile_id"]
            isOneToOne: false
            referencedRelation: "nutrition_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_onboarding_steps: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          data: Json | null
          id: string
          is_valid: boolean | null
          nutrition_profile_id: string
          skipped: boolean | null
          step_name: string
          step_number: number
          updated_at: string | null
          validation_errors: string[] | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_valid?: boolean | null
          nutrition_profile_id: string
          skipped?: boolean | null
          step_name: string
          step_number: number
          updated_at?: string | null
          validation_errors?: string[] | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          is_valid?: boolean | null
          nutrition_profile_id?: string
          skipped?: boolean | null
          step_name?: string
          step_number?: number
          updated_at?: string | null
          validation_errors?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_onboarding_steps_nutrition_profile_id_fkey"
            columns: ["nutrition_profile_id"]
            isOneToOne: false
            referencedRelation: "nutrition_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_plans: {
        Row: {
          activity_factor: number | null
          basal_metabolic_rate: number | null
          carbs_grams: number | null
          created_at: string | null
          duration_days: number | null
          dysbiosis_adjustments: string[] | null
          eating_behavior_notes: string | null
          end_date: string
          fat_grams: number | null
          id: string
          meal_times: Json | null
          meals_per_day: number | null
          metabolic_adjustment: number | null
          micronutrients: Json | null
          nutrition_profile_id: string
          plan_description: string | null
          plan_name: string
          primary_goal: string
          protein_grams: number | null
          start_date: string
          status: string
          target_calories: number | null
          total_daily_energy_expenditure: number | null
          updated_at: string | null
          water_liters_per_day: number | null
        }
        Insert: {
          activity_factor?: number | null
          basal_metabolic_rate?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          duration_days?: number | null
          dysbiosis_adjustments?: string[] | null
          eating_behavior_notes?: string | null
          end_date: string
          fat_grams?: number | null
          id?: string
          meal_times?: Json | null
          meals_per_day?: number | null
          metabolic_adjustment?: number | null
          micronutrients?: Json | null
          nutrition_profile_id: string
          plan_description?: string | null
          plan_name: string
          primary_goal: string
          protein_grams?: number | null
          start_date: string
          status?: string
          target_calories?: number | null
          total_daily_energy_expenditure?: number | null
          updated_at?: string | null
          water_liters_per_day?: number | null
        }
        Update: {
          activity_factor?: number | null
          basal_metabolic_rate?: number | null
          carbs_grams?: number | null
          created_at?: string | null
          duration_days?: number | null
          dysbiosis_adjustments?: string[] | null
          eating_behavior_notes?: string | null
          end_date?: string
          fat_grams?: number | null
          id?: string
          meal_times?: Json | null
          meals_per_day?: number | null
          metabolic_adjustment?: number | null
          micronutrients?: Json | null
          nutrition_profile_id?: string
          plan_description?: string | null
          plan_name?: string
          primary_goal?: string
          protein_grams?: number | null
          start_date?: string
          status?: string
          target_calories?: number | null
          total_daily_energy_expenditure?: number | null
          updated_at?: string | null
          water_liters_per_day?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_plans_nutrition_profile_id_fkey"
            columns: ["nutrition_profile_id"]
            isOneToOne: false
            referencedRelation: "nutrition_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_profiles: {
        Row: {
          body_type: string | null
          body_type_confidence: number | null
          body_type_image_url: string | null
          bristol_scale_type: number | null
          created_at: string | null
          current_treatments: string[] | null
          current_weight_kg: number
          date_of_birth: string
          exercise_days_per_week: number | null
          exercise_duration_minutes: number | null
          exercise_types: string[]
          favorite_breakfast_foods: string[] | null
          favorite_dinner_foods: string[] | null
          favorite_fruits: string[] | null
          favorite_lunch_foods: string[] | null
          favorite_snack_foods: string[] | null
          favorite_supper_foods: string[] | null
          favorite_vegetables: string[] | null
          fitness_level: string
          fitness_level_description: string | null
          food_allergies: string[] | null
          food_intolerances: string[] | null
          foods_cannot_live_without: string[] | null
          foods_to_avoid: string[] | null
          gender: string
          goal_description: string | null
          height_cm: number
          hereditary_diseases: string[] | null
          id: string
          intestinal_function: string | null
          max_weight_kg: number | null
          meals_per_day: number | null
          medications: Json | null
          min_weight_kg: number | null
          onboarding_completed: boolean | null
          onboarding_completion_date: string | null
          preferred_meal_times: Json | null
          primary_goal: string
          profession: string | null
          sleep_quality: string | null
          sleep_time: string | null
          status: string
          supplements: Json | null
          target_weight_kg: number
          updated_at: string | null
          user_id: string
          wake_up_time: string | null
          water_intake_liters: number | null
          weight_history: Json | null
          work_activity_level: string | null
          work_days: string[] | null
          work_hours_per_day: number | null
        }
        Insert: {
          body_type?: string | null
          body_type_confidence?: number | null
          body_type_image_url?: string | null
          bristol_scale_type?: number | null
          created_at?: string | null
          current_treatments?: string[] | null
          current_weight_kg: number
          date_of_birth: string
          exercise_days_per_week?: number | null
          exercise_duration_minutes?: number | null
          exercise_types: string[]
          favorite_breakfast_foods?: string[] | null
          favorite_dinner_foods?: string[] | null
          favorite_fruits?: string[] | null
          favorite_lunch_foods?: string[] | null
          favorite_snack_foods?: string[] | null
          favorite_supper_foods?: string[] | null
          favorite_vegetables?: string[] | null
          fitness_level: string
          fitness_level_description?: string | null
          food_allergies?: string[] | null
          food_intolerances?: string[] | null
          foods_cannot_live_without?: string[] | null
          foods_to_avoid?: string[] | null
          gender: string
          goal_description?: string | null
          height_cm: number
          hereditary_diseases?: string[] | null
          id?: string
          intestinal_function?: string | null
          max_weight_kg?: number | null
          meals_per_day?: number | null
          medications?: Json | null
          min_weight_kg?: number | null
          onboarding_completed?: boolean | null
          onboarding_completion_date?: string | null
          preferred_meal_times?: Json | null
          primary_goal: string
          profession?: string | null
          sleep_quality?: string | null
          sleep_time?: string | null
          status?: string
          supplements?: Json | null
          target_weight_kg: number
          updated_at?: string | null
          user_id: string
          wake_up_time?: string | null
          water_intake_liters?: number | null
          weight_history?: Json | null
          work_activity_level?: string | null
          work_days?: string[] | null
          work_hours_per_day?: number | null
        }
        Update: {
          body_type?: string | null
          body_type_confidence?: number | null
          body_type_image_url?: string | null
          bristol_scale_type?: number | null
          created_at?: string | null
          current_treatments?: string[] | null
          current_weight_kg?: number
          date_of_birth?: string
          exercise_days_per_week?: number | null
          exercise_duration_minutes?: number | null
          exercise_types?: string[]
          favorite_breakfast_foods?: string[] | null
          favorite_dinner_foods?: string[] | null
          favorite_fruits?: string[] | null
          favorite_lunch_foods?: string[] | null
          favorite_snack_foods?: string[] | null
          favorite_supper_foods?: string[] | null
          favorite_vegetables?: string[] | null
          fitness_level?: string
          fitness_level_description?: string | null
          food_allergies?: string[] | null
          food_intolerances?: string[] | null
          foods_cannot_live_without?: string[] | null
          foods_to_avoid?: string[] | null
          gender?: string
          goal_description?: string | null
          height_cm?: number
          hereditary_diseases?: string[] | null
          id?: string
          intestinal_function?: string | null
          max_weight_kg?: number | null
          meals_per_day?: number | null
          medications?: Json | null
          min_weight_kg?: number | null
          onboarding_completed?: boolean | null
          onboarding_completion_date?: string | null
          preferred_meal_times?: Json | null
          primary_goal?: string
          profession?: string | null
          sleep_quality?: string | null
          sleep_time?: string | null
          status?: string
          supplements?: Json | null
          target_weight_kg?: number
          updated_at?: string | null
          user_id?: string
          wake_up_time?: string | null
          water_intake_liters?: number | null
          weight_history?: Json | null
          work_activity_level?: string | null
          work_days?: string[] | null
          work_hours_per_day?: number | null
        }
        Relationships: []
      }
      periodization: {
        Row: {
          cardio: string | null
          created_at: string | null
          expectations: string | null
          id: string
          name: string
          objective: string
          parameters: Json
          phase: string | null
          updated_at: string | null
          weeks: number
        }
        Insert: {
          cardio?: string | null
          created_at?: string | null
          expectations?: string | null
          id?: string
          name: string
          objective: string
          parameters: Json
          phase?: string | null
          updated_at?: string | null
          weeks: number
        }
        Update: {
          cardio?: string | null
          created_at?: string | null
          expectations?: string | null
          id?: string
          name?: string
          objective?: string
          parameters?: Json
          phase?: string | null
          updated_at?: string | null
          weeks?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          is_premium: boolean | null
          last_activity_at: string | null
          subscription_id: string | null
          trial_started_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          is_premium?: boolean | null
          last_activity_at?: string | null
          subscription_id?: string | null
          trial_started_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_premium?: boolean | null
          last_activity_at?: string | null
          subscription_id?: string | null
          trial_started_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          auto_renew: boolean | null
          billing_period: string
          cancelled_at: string | null
          created_at: string | null
          expires_at: string
          free_months_granted: number | null
          id: string
          plan_id: string
          started_at: string
          status: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          billing_period?: string
          cancelled_at?: string | null
          created_at?: string | null
          expires_at: string
          free_months_granted?: number | null
          id?: string
          plan_id: string
          started_at?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          billing_period?: string
          cancelled_at?: string | null
          created_at?: string | null
          expires_at?: string
          free_months_granted?: number | null
          id?: string
          plan_id?: string
          started_at?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      supplementation_plans: {
        Row: {
          created_at: string | null
          dosage: number | null
          dosage_unit: string | null
          frequency: string | null
          id: string
          nutrition_plan_id: string
          optional: boolean | null
          rationale: string | null
          recommended: boolean | null
          scientific_reference: string | null
          supplement_name: string
          supplement_type: string | null
        }
        Insert: {
          created_at?: string | null
          dosage?: number | null
          dosage_unit?: string | null
          frequency?: string | null
          id?: string
          nutrition_plan_id: string
          optional?: boolean | null
          rationale?: string | null
          recommended?: boolean | null
          scientific_reference?: string | null
          supplement_name: string
          supplement_type?: string | null
        }
        Update: {
          created_at?: string | null
          dosage?: number | null
          dosage_unit?: string | null
          frequency?: string | null
          id?: string
          nutrition_plan_id?: string
          optional?: boolean | null
          rationale?: string | null
          recommended?: boolean | null
          scientific_reference?: string | null
          supplement_name?: string
          supplement_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplementation_plans_nutrition_plan_id_fkey"
            columns: ["nutrition_plan_id"]
            isOneToOne: false
            referencedRelation: "nutrition_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_log: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity: string
          entity_id: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity: string
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity?: string
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const


// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: admin_users
//   id: uuid (not null, default: gen_random_uuid())
//   email: character varying (not null)
//   name: character varying (not null)
//   password_hash: character varying (not null)
//   role: character varying (not null, default: 'moderator'::character varying)
//   permissions: jsonb (nullable, default: '{}'::jsonb)
//   created_at: timestamp without time zone (nullable, default: now())
//   last_login: timestamp without time zone (nullable)
// Table: ai_food_identifications
//   id: uuid (not null, default: gen_random_uuid())
//   food_log_id: uuid (not null)
//   input_type: character varying (nullable)
//   input_url: text (nullable)
//   identified_foods: jsonb (nullable)
//   raw_ai_response: jsonb (nullable)
//   user_confirmed: boolean (nullable, default: false)
//   user_corrections: jsonb (nullable)
//   created_at: timestamp without time zone (nullable, default: now())
// Table: app_settings
//   id: uuid (not null, default: gen_random_uuid())
//   setting_key: character varying (not null)
//   setting_value: jsonb (not null)
//   description: text (nullable)
//   updated_at: timestamp without time zone (nullable, default: now())
// Table: assessment_responses
//   id: uuid (not null, default: gen_random_uuid())
//   nutrition_assessment_id: uuid (not null)
//   question_id: character varying (not null)
//   question_text: text (not null)
//   question_category: character varying (nullable)
//   answer_type: character varying (nullable)
//   answer_value: text (nullable)
//   answer_score: integer (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: audit_log
//   id: uuid (not null, default: gen_random_uuid())
//   admin_id: uuid (nullable)
//   admin_email: character varying (nullable)
//   action: character varying (not null)
//   entity: character varying (not null)
//   entity_id: character varying (nullable)
//   old_value: jsonb (nullable)
//   new_value: jsonb (nullable)
//   ip_address: character varying (nullable)
//   user_agent: text (nullable)
//   created_at: timestamp without time zone (nullable, default: now())
// Table: daily_summaries
//   id: uuid (not null, default: gen_random_uuid())
//   nutrition_plan_id: uuid (not null)
//   user_id: uuid (not null)
//   summary_date: date (not null)
//   total_calories_consumed: numeric (nullable, default: 0)
//   total_protein_consumed: numeric (nullable, default: 0)
//   total_carbs_consumed: numeric (nullable, default: 0)
//   total_fat_consumed: numeric (nullable, default: 0)
//   target_calories: numeric (nullable)
//   target_protein: numeric (nullable)
//   target_carbs: numeric (nullable)
//   target_fat: numeric (nullable)
//   calories_remaining: numeric (nullable)
//   protein_remaining: numeric (nullable)
//   carbs_remaining: numeric (nullable)
//   fat_remaining: numeric (nullable)
//   calories_percentage: numeric (nullable)
//   protein_percentage: numeric (nullable)
//   carbs_percentage: numeric (nullable)
//   fat_percentage: numeric (nullable)
//   meals_logged: integer (nullable, default: 0)
//   meal_logs: jsonb (nullable, default: '[]'::jsonb)
//   completed: boolean (nullable, default: false)
//   exceeded: boolean (nullable, default: false)
//   created_at: timestamp without time zone (nullable, default: now())
//   updated_at: timestamp without time zone (nullable, default: now())
// Table: decision_matrix
//   deviation_id: uuid (not null)
//   exercise_id: uuid (not null)
//   priority: integer (nullable, default: 1)
// Table: deviations
//   id: uuid (not null, default: gen_random_uuid())
//   type: character varying (not null)
//   name: character varying (not null)
//   description: text (nullable)
//   region: character varying (nullable)
//   affected_muscles: _text (nullable)
//   weak_muscles: _text (nullable)
//   tight_muscles: _text (nullable)
//   scientific_reference: text (nullable)
//   created_at: timestamp without time zone (nullable, default: now())
//   updated_at: timestamp without time zone (nullable, default: now())
// Table: exercises
//   id: uuid (not null, default: gen_random_uuid())
//   name: character varying (not null)
//   description: text (nullable)
//   tier: character varying (not null)
//   primary_muscles: _text (not null)
//   secondary_muscles: _text (nullable)
//   corrective_for: _uuid (nullable, default: '{}'::uuid[])
//   contraindicated_for: _uuid (nullable, default: '{}'::uuid[])
//   safety_notes: text (nullable)
//   progression_cues: text (nullable)
//   scientific_reference: text (nullable)
//   video_url: character varying (nullable)
//   image_url: character varying (nullable)
//   created_at: timestamp without time zone (nullable, default: now())
//   updated_at: timestamp without time zone (nullable, default: now())
// Table: food_database
//   id: uuid (not null, default: gen_random_uuid())
//   usda_fdc_id: character varying (nullable)
//   food_name: character varying (not null)
//   food_category: character varying (nullable)
//   brand_name: character varying (nullable)
//   calories_per_100g: numeric (nullable)
//   protein_per_100g: numeric (nullable)
//   carbs_per_100g: numeric (nullable)
//   fat_per_100g: numeric (nullable)
//   fiber_per_100g: numeric (nullable)
//   sugar_per_100g: numeric (nullable)
//   micronutrients: jsonb (nullable)
//   allergens: _text (nullable)
//   is_processed: boolean (nullable, default: false)
//   glycemic_index: integer (nullable)
//   last_synced: timestamp without time zone (nullable)
//   created_at: timestamp without time zone (nullable, default: now())
// Table: food_logs
//   id: uuid (not null, default: gen_random_uuid())
//   nutrition_plan_id: uuid (not null)
//   user_id: uuid (not null)
//   log_date: date (not null)
//   log_time: time without time zone (nullable)
//   meal_type: character varying (nullable)
//   input_method: character varying (not null)
//   input_data: jsonb (nullable)
//   foods: jsonb (not null)
//   total_calories: numeric (nullable)
//   total_protein_grams: numeric (nullable)
//   total_carbs_grams: numeric (nullable)
//   total_fat_grams: numeric (nullable)
//   ai_confidence: numeric (nullable)
//   ai_analysis: jsonb (nullable)
//   confirmed: boolean (nullable, default: false)
//   confirmed_at: timestamp without time zone (nullable)
//   edited: boolean (nullable, default: false)
//   edited_at: timestamp without time zone (nullable)
//   created_at: timestamp without time zone (nullable, default: now())
//   updated_at: timestamp without time zone (nullable, default: now())
// Table: food_substitutes
//   id: uuid (not null, default: gen_random_uuid())
//   meal_food_id: uuid (not null)
//   substitute_food_name: character varying (not null)
//   substitute_quantity: numeric (nullable)
//   substitute_unit: character varying (nullable)
//   equivalent_calories: numeric (nullable)
//   equivalent_protein: numeric (nullable)
//   equivalent_carbs: numeric (nullable)
//   equivalent_fat: numeric (nullable)
//   substitution_ratio: numeric (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: foods
//   id: uuid (not null, default: gen_random_uuid())
//   name: character varying (not null)
//   description: text (nullable)
//   category: character varying (not null)
//   calories_per_100g: numeric (nullable)
//   protein_per_100g: numeric (nullable)
//   carbs_per_100g: numeric (nullable)
//   fat_per_100g: numeric (nullable)
//   fiber_per_100g: numeric (nullable)
//   micronutrients: jsonb (nullable)
//   allergens: _text (nullable)
//   is_processed: boolean (nullable, default: false)
//   glycemic_index: integer (nullable)
//   glycemic_load: integer (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: meal_foods
//   id: uuid (not null, default: gen_random_uuid())
//   meal_plan_id: uuid (not null)
//   food_id: uuid (nullable)
//   food_name: character varying (not null)
//   food_category: character varying (nullable)
//   quantity: numeric (nullable)
//   unit: character varying (nullable)
//   calories: numeric (nullable)
//   protein_grams: numeric (nullable)
//   carbs_grams: numeric (nullable)
//   fat_grams: numeric (nullable)
//   fiber_grams: numeric (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: meal_plans
//   id: uuid (not null, default: gen_random_uuid())
//   nutrition_plan_id: uuid (not null)
//   meal_type: character varying (not null)
//   meal_number: integer (nullable)
//   scheduled_time: time without time zone (nullable)
//   calories: numeric (nullable)
//   protein_grams: numeric (nullable)
//   carbs_grams: numeric (nullable)
//   fat_grams: numeric (nullable)
//   meal_options: jsonb (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: nutrition_assessments
//   id: uuid (not null, default: gen_random_uuid())
//   nutrition_profile_id: uuid (not null)
//   assessment_type: character varying (not null)
//   assessment_name: character varying (not null)
//   responses: jsonb (not null)
//   total_score: integer (nullable)
//   max_score: integer (nullable)
//   score_percentage: numeric (nullable)
//   interpretation: character varying (nullable)
//   interpretation_text: text (nullable)
//   recommendations: _text (nullable)
//   completed: boolean (nullable, default: false)
//   completed_at: timestamp with time zone (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: nutrition_onboarding_steps
//   id: uuid (not null, default: gen_random_uuid())
//   nutrition_profile_id: uuid (not null)
//   step_number: integer (not null)
//   step_name: character varying (not null)
//   completed: boolean (nullable, default: false)
//   completed_at: timestamp with time zone (nullable)
//   skipped: boolean (nullable, default: false)
//   data: jsonb (nullable)
//   validation_errors: _text (nullable)
//   is_valid: boolean (nullable, default: false)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: nutrition_plans
//   id: uuid (not null, default: gen_random_uuid())
//   nutrition_profile_id: uuid (not null)
//   plan_name: character varying (not null)
//   plan_description: text (nullable)
//   start_date: date (not null)
//   end_date: date (not null)
//   duration_days: integer (nullable)
//   primary_goal: character varying (not null)
//   basal_metabolic_rate: numeric (nullable)
//   total_daily_energy_expenditure: numeric (nullable)
//   activity_factor: numeric (nullable)
//   target_calories: numeric (nullable)
//   protein_grams: numeric (nullable)
//   carbs_grams: numeric (nullable)
//   fat_grams: numeric (nullable)
//   micronutrients: jsonb (nullable)
//   water_liters_per_day: numeric (nullable)
//   meals_per_day: integer (nullable)
//   meal_times: jsonb (nullable)
//   metabolic_adjustment: numeric (nullable)
//   dysbiosis_adjustments: _text (nullable)
//   eating_behavior_notes: text (nullable)
//   status: character varying (not null, default: 'active'::character varying)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: nutrition_profiles
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   gender: character varying (not null)
//   date_of_birth: date (not null)
//   height_cm: numeric (not null)
//   current_weight_kg: numeric (not null)
//   target_weight_kg: numeric (not null)
//   primary_goal: character varying (not null)
//   goal_description: text (nullable)
//   body_type: character varying (nullable)
//   body_type_image_url: text (nullable)
//   body_type_confidence: numeric (nullable)
//   max_weight_kg: numeric (nullable)
//   min_weight_kg: numeric (nullable)
//   weight_history: jsonb (nullable)
//   wake_up_time: time without time zone (nullable)
//   sleep_time: time without time zone (nullable)
//   sleep_quality: character varying (nullable)
//   fitness_level: character varying (not null)
//   fitness_level_description: text (nullable)
//   exercise_types: _text (not null)
//   exercise_days_per_week: integer (nullable)
//   exercise_duration_minutes: integer (nullable)
//   profession: character varying (nullable)
//   work_activity_level: character varying (nullable)
//   work_days: _text (nullable)
//   work_hours_per_day: integer (nullable)
//   hereditary_diseases: _text (nullable)
//   current_treatments: _text (nullable)
//   medications: jsonb (nullable)
//   supplements: jsonb (nullable)
//   intestinal_function: character varying (nullable)
//   bristol_scale_type: integer (nullable)
//   food_allergies: _text (nullable)
//   food_intolerances: _text (nullable)
//   meals_per_day: integer (nullable)
//   preferred_meal_times: jsonb (nullable)
//   water_intake_liters: numeric (nullable)
//   foods_to_avoid: _text (nullable)
//   foods_cannot_live_without: _text (nullable)
//   favorite_fruits: _text (nullable)
//   favorite_vegetables: _text (nullable)
//   favorite_breakfast_foods: _text (nullable)
//   favorite_lunch_foods: _text (nullable)
//   favorite_snack_foods: _text (nullable)
//   favorite_dinner_foods: _text (nullable)
//   favorite_supper_foods: _text (nullable)
//   onboarding_completed: boolean (nullable, default: false)
//   onboarding_completion_date: timestamp without time zone (nullable)
//   status: character varying (not null, default: 'in_progress'::character varying)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: periodization
//   id: uuid (not null, default: gen_random_uuid())
//   name: character varying (not null)
//   weeks: integer (not null)
//   objective: text (not null)
//   parameters: jsonb (not null)
//   cardio: text (nullable)
//   expectations: text (nullable)
//   phase: character varying (nullable)
//   created_at: timestamp without time zone (nullable, default: now())
//   updated_at: timestamp without time zone (nullable, default: now())
// Table: profiles
//   id: uuid (not null)
//   is_premium: boolean (nullable, default: false)
//   trial_started_at: timestamp with time zone (nullable)
//   subscription_id: uuid (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
//   last_activity_at: timestamp without time zone (nullable, default: now())
// Table: subscriptions
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   plan_id: character varying (not null)
//   stripe_subscription_id: character varying (nullable)
//   stripe_customer_id: character varying (nullable)
//   stripe_price_id: character varying (nullable)
//   billing_period: character varying (not null, default: 'monthly'::character varying)
//   free_months_granted: integer (nullable, default: 0)
//   started_at: timestamp with time zone (not null, default: now())
//   expires_at: timestamp with time zone (not null)
//   cancelled_at: timestamp with time zone (nullable)
//   status: character varying (not null, default: 'active'::character varying)
//   auto_renew: boolean (nullable, default: true)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: supplementation_plans
//   id: uuid (not null, default: gen_random_uuid())
//   nutrition_plan_id: uuid (not null)
//   supplement_name: character varying (not null)
//   supplement_type: character varying (nullable)
//   dosage: numeric (nullable)
//   dosage_unit: character varying (nullable)
//   frequency: character varying (nullable)
//   rationale: text (nullable)
//   scientific_reference: character varying (nullable)
//   recommended: boolean (nullable, default: true)
//   optional: boolean (nullable, default: false)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: user_activity_log
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (nullable)
//   action: character varying (not null)
//   entity: character varying (not null)
//   entity_id: character varying (nullable)
//   details: jsonb (nullable)
//   ip_address: character varying (nullable)
//   user_agent: text (nullable)
//   created_at: timestamp without time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: admin_users
//   UNIQUE admin_users_email_key: UNIQUE (email)
//   PRIMARY KEY admin_users_pkey: PRIMARY KEY (id)
// Table: ai_food_identifications
//   FOREIGN KEY ai_food_identifications_food_log_id_fkey: FOREIGN KEY (food_log_id) REFERENCES food_logs(id) ON DELETE CASCADE
//   PRIMARY KEY ai_food_identifications_pkey: PRIMARY KEY (id)
// Table: app_settings
//   PRIMARY KEY app_settings_pkey: PRIMARY KEY (id)
//   UNIQUE app_settings_setting_key_key: UNIQUE (setting_key)
// Table: assessment_responses
//   FOREIGN KEY assessment_responses_nutrition_assessment_id_fkey: FOREIGN KEY (nutrition_assessment_id) REFERENCES nutrition_assessments(id) ON DELETE CASCADE
//   PRIMARY KEY assessment_responses_pkey: PRIMARY KEY (id)
// Table: audit_log
//   FOREIGN KEY audit_log_admin_id_fkey: FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE SET NULL
//   PRIMARY KEY audit_log_pkey: PRIMARY KEY (id)
// Table: daily_summaries
//   FOREIGN KEY daily_summaries_nutrition_plan_id_fkey: FOREIGN KEY (nutrition_plan_id) REFERENCES nutrition_plans(id) ON DELETE CASCADE
//   PRIMARY KEY daily_summaries_pkey: PRIMARY KEY (id)
//   FOREIGN KEY daily_summaries_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   UNIQUE daily_summaries_user_id_summary_date_key: UNIQUE (user_id, summary_date)
// Table: decision_matrix
//   FOREIGN KEY decision_matrix_deviation_id_fkey: FOREIGN KEY (deviation_id) REFERENCES deviations(id) ON DELETE CASCADE
//   FOREIGN KEY decision_matrix_exercise_id_fkey: FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
//   PRIMARY KEY decision_matrix_pkey: PRIMARY KEY (deviation_id, exercise_id)
// Table: deviations
//   UNIQUE deviations_name_key: UNIQUE (name)
//   PRIMARY KEY deviations_pkey: PRIMARY KEY (id)
// Table: exercises
//   UNIQUE exercises_name_key: UNIQUE (name)
//   PRIMARY KEY exercises_pkey: PRIMARY KEY (id)
// Table: food_database
//   PRIMARY KEY food_database_pkey: PRIMARY KEY (id)
//   UNIQUE food_database_usda_fdc_id_key: UNIQUE (usda_fdc_id)
// Table: food_logs
//   FOREIGN KEY food_logs_nutrition_plan_id_fkey: FOREIGN KEY (nutrition_plan_id) REFERENCES nutrition_plans(id) ON DELETE CASCADE
//   PRIMARY KEY food_logs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY food_logs_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: food_substitutes
//   FOREIGN KEY food_substitutes_meal_food_id_fkey: FOREIGN KEY (meal_food_id) REFERENCES meal_foods(id) ON DELETE CASCADE
//   PRIMARY KEY food_substitutes_pkey: PRIMARY KEY (id)
// Table: foods
//   UNIQUE foods_name_key: UNIQUE (name)
//   PRIMARY KEY foods_pkey: PRIMARY KEY (id)
// Table: meal_foods
//   FOREIGN KEY meal_foods_food_id_fkey: FOREIGN KEY (food_id) REFERENCES foods(id)
//   FOREIGN KEY meal_foods_meal_plan_id_fkey: FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE
//   PRIMARY KEY meal_foods_pkey: PRIMARY KEY (id)
// Table: meal_plans
//   FOREIGN KEY meal_plans_nutrition_plan_id_fkey: FOREIGN KEY (nutrition_plan_id) REFERENCES nutrition_plans(id) ON DELETE CASCADE
//   PRIMARY KEY meal_plans_pkey: PRIMARY KEY (id)
// Table: nutrition_assessments
//   FOREIGN KEY nutrition_assessments_nutrition_profile_id_fkey: FOREIGN KEY (nutrition_profile_id) REFERENCES nutrition_profiles(id) ON DELETE CASCADE
//   PRIMARY KEY nutrition_assessments_pkey: PRIMARY KEY (id)
// Table: nutrition_onboarding_steps
//   FOREIGN KEY nutrition_onboarding_steps_nutrition_profile_id_fkey: FOREIGN KEY (nutrition_profile_id) REFERENCES nutrition_profiles(id) ON DELETE CASCADE
//   PRIMARY KEY nutrition_onboarding_steps_pkey: PRIMARY KEY (id)
//   CHECK nutrition_onboarding_steps_step_number_check: CHECK (((step_number >= 1) AND (step_number <= 11)))
// Table: nutrition_plans
//   FOREIGN KEY nutrition_plans_nutrition_profile_id_fkey: FOREIGN KEY (nutrition_profile_id) REFERENCES nutrition_profiles(id) ON DELETE CASCADE
//   PRIMARY KEY nutrition_plans_pkey: PRIMARY KEY (id)
// Table: nutrition_profiles
//   PRIMARY KEY nutrition_profiles_pkey: PRIMARY KEY (id)
// Table: periodization
//   UNIQUE periodization_name_key: UNIQUE (name)
//   PRIMARY KEY periodization_pkey: PRIMARY KEY (id)
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
//   FOREIGN KEY profiles_subscription_id_fkey: FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL
// Table: subscriptions
//   PRIMARY KEY subscriptions_pkey: PRIMARY KEY (id)
//   UNIQUE subscriptions_stripe_customer_id_key: UNIQUE (stripe_customer_id)
//   UNIQUE subscriptions_stripe_subscription_id_key: UNIQUE (stripe_subscription_id)
//   FOREIGN KEY subscriptions_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: supplementation_plans
//   FOREIGN KEY supplementation_plans_nutrition_plan_id_fkey: FOREIGN KEY (nutrition_plan_id) REFERENCES nutrition_plans(id) ON DELETE CASCADE
//   PRIMARY KEY supplementation_plans_pkey: PRIMARY KEY (id)
// Table: user_activity_log
//   PRIMARY KEY user_activity_log_pkey: PRIMARY KEY (id)
//   FOREIGN KEY user_activity_log_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: admin_users
//   Policy "auth_all_admin_users" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: ai_food_identifications
//   Policy "auth_all_ai_food_identifications" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM food_logs fl   WHERE ((fl.id = ai_food_identifications.food_log_id) AND (fl.user_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM food_logs fl   WHERE ((fl.id = ai_food_identifications.food_log_id) AND (fl.user_id = auth.uid()))))
// Table: app_settings
//   Policy "auth_all_app_settings" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "public_read_app_settings" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: assessment_responses
//   Policy "Users can insert their own assessment_responses" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
//   Policy "Users can view their own assessment_responses" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: audit_log
//   Policy "auth_all_audit_log" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: daily_summaries
//   Policy "auth_all_daily_summaries" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: decision_matrix
//   Policy "auth_all_decision_matrix" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: deviations
//   Policy "auth_all_deviations" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "public_read_deviations" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: exercises
//   Policy "auth_all_exercises" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "public_read_exercises" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: food_database
//   Policy "public_read_food_db" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: food_logs
//   Policy "auth_all_food_logs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: food_substitutes
//   Policy "authenticated_all" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: foods
//   Policy "public_select" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: meal_foods
//   Policy "authenticated_all" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: meal_plans
//   Policy "authenticated_all" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: nutrition_assessments
//   Policy "Users can insert their own nutrition_assessments" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
//   Policy "Users can update their own nutrition_assessments" (UPDATE, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Users can view their own nutrition_assessments" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: nutrition_onboarding_steps
//   Policy "authenticated_all" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: nutrition_plans
//   Policy "authenticated_all" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: nutrition_profiles
//   Policy "Users can insert their own nutrition_profiles" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
//   Policy "Users can update their own nutrition_profiles" (UPDATE, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Users can view their own nutrition_profiles" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: periodization
//   Policy "auth_all_periodization" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
//   Policy "public_read_periodization" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: profiles
//   Policy "Users can update their own profiles" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (id = auth.uid())
//     WITH CHECK: (id = auth.uid())
//   Policy "Users can view their own profiles" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (id = auth.uid())
// Table: subscriptions
//   Policy "Users can view their own subscriptions" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
// Table: supplementation_plans
//   Policy "authenticated_all" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true
// Table: user_activity_log
//   Policy "auth_all_user_activity_log" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_new_user()
//   CREATE OR REPLACE FUNCTION public.handle_new_user()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     INSERT INTO public.profiles (id)
//     VALUES (NEW.id)
//     ON CONFLICT (id) DO NOTHING;
//     RETURN NEW;
//   END;
//   $function$
//   

// --- INDEXES ---
// Table: admin_users
//   CREATE UNIQUE INDEX admin_users_email_key ON public.admin_users USING btree (email)
// Table: ai_food_identifications
//   CREATE INDEX idx_ai_food_identifications_food_log_id ON public.ai_food_identifications USING btree (food_log_id)
// Table: app_settings
//   CREATE UNIQUE INDEX app_settings_setting_key_key ON public.app_settings USING btree (setting_key)
// Table: daily_summaries
//   CREATE UNIQUE INDEX daily_summaries_user_id_summary_date_key ON public.daily_summaries USING btree (user_id, summary_date)
//   CREATE INDEX idx_daily_summaries_summary_date ON public.daily_summaries USING btree (summary_date)
//   CREATE INDEX idx_daily_summaries_user_id ON public.daily_summaries USING btree (user_id)
// Table: deviations
//   CREATE UNIQUE INDEX deviations_name_key ON public.deviations USING btree (name)
// Table: exercises
//   CREATE UNIQUE INDEX exercises_name_key ON public.exercises USING btree (name)
// Table: food_database
//   CREATE UNIQUE INDEX food_database_usda_fdc_id_key ON public.food_database USING btree (usda_fdc_id)
//   CREATE INDEX idx_food_database_category ON public.food_database USING btree (food_category)
//   CREATE INDEX idx_food_database_food_name ON public.food_database USING btree (food_name)
// Table: food_logs
//   CREATE INDEX idx_food_logs_log_date ON public.food_logs USING btree (log_date)
//   CREATE INDEX idx_food_logs_nutrition_plan_id ON public.food_logs USING btree (nutrition_plan_id)
//   CREATE INDEX idx_food_logs_user_id ON public.food_logs USING btree (user_id)
// Table: foods
//   CREATE UNIQUE INDEX foods_name_key ON public.foods USING btree (name)
// Table: periodization
//   CREATE UNIQUE INDEX periodization_name_key ON public.periodization USING btree (name)
// Table: profiles
//   CREATE INDEX idx_profiles_is_premium ON public.profiles USING btree (is_premium)
//   CREATE INDEX idx_profiles_subscription_id ON public.profiles USING btree (subscription_id)
//   CREATE INDEX idx_profiles_trial_started_at ON public.profiles USING btree (trial_started_at)
// Table: subscriptions
//   CREATE INDEX idx_subscriptions_expires_at ON public.subscriptions USING btree (expires_at)
//   CREATE INDEX idx_subscriptions_plan_id ON public.subscriptions USING btree (plan_id)
//   CREATE INDEX idx_subscriptions_status ON public.subscriptions USING btree (status)
//   CREATE INDEX idx_subscriptions_user_id ON public.subscriptions USING btree (user_id)
//   CREATE UNIQUE INDEX subscriptions_stripe_customer_id_key ON public.subscriptions USING btree (stripe_customer_id)
//   CREATE UNIQUE INDEX subscriptions_stripe_subscription_id_key ON public.subscriptions USING btree (stripe_subscription_id)

