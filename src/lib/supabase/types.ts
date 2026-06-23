// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
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
            foreignKeyName: 'ai_food_identifications_food_log_id_fkey'
            columns: ['food_log_id']
            isOneToOne: false
            referencedRelation: 'food_logs'
            referencedColumns: ['id']
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
            foreignKeyName: 'assessment_responses_nutrition_assessment_id_fkey'
            columns: ['nutrition_assessment_id']
            isOneToOne: false
            referencedRelation: 'nutrition_assessments'
            referencedColumns: ['id']
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
            foreignKeyName: 'audit_log_admin_id_fkey'
            columns: ['admin_id']
            isOneToOne: false
            referencedRelation: 'admin_users'
            referencedColumns: ['id']
          },
        ]
      }
      challenge_participations: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          progress: number
          progress_details: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: number
          progress_details?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: number
          progress_details?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'challenge_participations_challenge_id_fkey'
            columns: ['challenge_id']
            isOneToOne: false
            referencedRelation: 'challenges'
            referencedColumns: ['id']
          },
        ]
      }
      challenges: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty: string
          end_date: string
          id: string
          is_active: boolean | null
          name: string
          reward_badge: string | null
          reward_points: number
          rules: string | null
          start_date: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty: string
          end_date: string
          id?: string
          is_active?: boolean | null
          name: string
          reward_badge?: string | null
          reward_points?: number
          rules?: string | null
          start_date: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: string
          end_date?: string
          id?: string
          is_active?: boolean | null
          name?: string
          reward_badge?: string | null
          reward_points?: number
          rules?: string | null
          start_date?: string
          updated_at?: string | null
        }
        Relationships: []
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
            foreignKeyName: 'daily_summaries_nutrition_plan_id_fkey'
            columns: ['nutrition_plan_id']
            isOneToOne: false
            referencedRelation: 'nutrition_plans'
            referencedColumns: ['id']
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
            foreignKeyName: 'decision_matrix_deviation_id_fkey'
            columns: ['deviation_id']
            isOneToOne: false
            referencedRelation: 'deviations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'decision_matrix_exercise_id_fkey'
            columns: ['exercise_id']
            isOneToOne: false
            referencedRelation: 'exercises'
            referencedColumns: ['id']
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
            foreignKeyName: 'food_logs_nutrition_plan_id_fkey'
            columns: ['nutrition_plan_id']
            isOneToOne: false
            referencedRelation: 'nutrition_plans'
            referencedColumns: ['id']
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
            foreignKeyName: 'food_substitutes_meal_food_id_fkey'
            columns: ['meal_food_id']
            isOneToOne: false
            referencedRelation: 'meal_foods'
            referencedColumns: ['id']
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
      gamification_profiles: {
        Row: {
          badges: Json | null
          created_at: string | null
          current_streak: number | null
          experience_points: number | null
          id: string
          level: number | null
          longest_streak: number | null
          points_this_month: number | null
          points_this_week: number | null
          total_points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          badges?: Json | null
          created_at?: string | null
          current_streak?: number | null
          experience_points?: number | null
          id?: string
          level?: number | null
          longest_streak?: number | null
          points_this_month?: number | null
          points_this_week?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          badges?: Json | null
          created_at?: string | null
          current_streak?: number | null
          experience_points?: number | null
          id?: string
          level?: number | null
          longest_streak?: number | null
          points_this_month?: number | null
          points_this_week?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      leaderboards: {
        Row: {
          created_at: string | null
          id: string
          meals_logged: number | null
          nutrition_adherence: number | null
          period: string
          rank: number
          streak_days: number | null
          total_points: number
          updated_at: string | null
          user_avatar: string | null
          user_id: string
          user_name: string | null
          workouts_completed: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meals_logged?: number | null
          nutrition_adherence?: number | null
          period: string
          rank: number
          streak_days?: number | null
          total_points?: number
          updated_at?: string | null
          user_avatar?: string | null
          user_id: string
          user_name?: string | null
          workouts_completed?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meals_logged?: number | null
          nutrition_adherence?: number | null
          period?: string
          rank?: number
          streak_days?: number | null
          total_points?: number
          updated_at?: string | null
          user_avatar?: string | null
          user_id?: string
          user_name?: string | null
          workouts_completed?: number | null
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
            foreignKeyName: 'meal_foods_food_id_fkey'
            columns: ['food_id']
            isOneToOne: false
            referencedRelation: 'foods'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'meal_foods_meal_plan_id_fkey'
            columns: ['meal_plan_id']
            isOneToOne: false
            referencedRelation: 'meal_plans'
            referencedColumns: ['id']
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
            foreignKeyName: 'meal_plans_nutrition_plan_id_fkey'
            columns: ['nutrition_plan_id']
            isOneToOne: false
            referencedRelation: 'nutrition_plans'
            referencedColumns: ['id']
          },
        ]
      }
      monthly_metrics: {
        Row: {
          created_at: string | null
          cycle_number: number
          end_date: string
          id: string
          nutrition_adherence_rate: number | null
          progression_percent: number | null
          start_date: string
          user_id: string
          weight_change: number | null
          workout_completion_rate: number | null
        }
        Insert: {
          created_at?: string | null
          cycle_number: number
          end_date: string
          id?: string
          nutrition_adherence_rate?: number | null
          progression_percent?: number | null
          start_date: string
          user_id: string
          weight_change?: number | null
          workout_completion_rate?: number | null
        }
        Update: {
          created_at?: string | null
          cycle_number?: number
          end_date?: string
          id?: string
          nutrition_adherence_rate?: number | null
          progression_percent?: number | null
          start_date?: string
          user_id?: string
          weight_change?: number | null
          workout_completion_rate?: number | null
        }
        Relationships: []
      }
      monthly_reports: {
        Row: {
          created_at: string | null
          cycle_number: number
          end_date: string
          generated_at: string | null
          id: string
          metrics: Json
          recommendations: Json
          regenerated_meal_plan_id: string | null
          regenerated_training_plan_id: string | null
          start_date: string
          summary: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          cycle_number: number
          end_date: string
          generated_at?: string | null
          id?: string
          metrics: Json
          recommendations: Json
          regenerated_meal_plan_id?: string | null
          regenerated_training_plan_id?: string | null
          start_date: string
          summary: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          cycle_number?: number
          end_date?: string
          generated_at?: string | null
          id?: string
          metrics?: Json
          recommendations?: Json
          regenerated_meal_plan_id?: string | null
          regenerated_training_plan_id?: string | null
          start_date?: string
          summary?: string
          user_id?: string
        }
        Relationships: []
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
            foreignKeyName: 'nutrition_assessments_nutrition_profile_id_fkey'
            columns: ['nutrition_profile_id']
            isOneToOne: false
            referencedRelation: 'nutrition_profiles'
            referencedColumns: ['id']
          },
        ]
      }
      nutrition_chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
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
            foreignKeyName: 'nutrition_onboarding_steps_nutrition_profile_id_fkey'
            columns: ['nutrition_profile_id']
            isOneToOne: false
            referencedRelation: 'nutrition_profiles'
            referencedColumns: ['id']
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
            foreignKeyName: 'nutrition_plans_nutrition_profile_id_fkey'
            columns: ['nutrition_profile_id']
            isOneToOne: false
            referencedRelation: 'nutrition_profiles'
            referencedColumns: ['id']
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
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          is_premium: boolean | null
          last_activity_at: string | null
          name: string | null
          subscription_id: string | null
          trial_started_at: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          is_premium?: boolean | null
          last_activity_at?: string | null
          name?: string | null
          subscription_id?: string | null
          trial_started_at?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_premium?: boolean | null
          last_activity_at?: string | null
          name?: string | null
          subscription_id?: string | null
          trial_started_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_subscription_id_fkey'
            columns: ['subscription_id']
            isOneToOne: false
            referencedRelation: 'subscriptions'
            referencedColumns: ['id']
          },
        ]
      }
      progress_metrics: {
        Row: {
          avg_borg_rpe: number | null
          balance_status: string | null
          calorie_balance: number | null
          calories_burned: number | null
          created_at: string | null
          date: string
          id: string
          meals_completed: number | null
          month_of_year: number | null
          nutrition_adherence_rate: number | null
          total_calories_consumed: number | null
          total_carbs_consumed: number | null
          total_fat_consumed: number | null
          total_protein_consumed: number | null
          total_reps: number | null
          total_time: number | null
          total_weight: number | null
          updated_at: string | null
          user_id: string
          week_of_year: number | null
          workouts_completed: number | null
          year: number | null
        }
        Insert: {
          avg_borg_rpe?: number | null
          balance_status?: string | null
          calorie_balance?: number | null
          calories_burned?: number | null
          created_at?: string | null
          date: string
          id?: string
          meals_completed?: number | null
          month_of_year?: number | null
          nutrition_adherence_rate?: number | null
          total_calories_consumed?: number | null
          total_carbs_consumed?: number | null
          total_fat_consumed?: number | null
          total_protein_consumed?: number | null
          total_reps?: number | null
          total_time?: number | null
          total_weight?: number | null
          updated_at?: string | null
          user_id: string
          week_of_year?: number | null
          workouts_completed?: number | null
          year?: number | null
        }
        Update: {
          avg_borg_rpe?: number | null
          balance_status?: string | null
          calorie_balance?: number | null
          calories_burned?: number | null
          created_at?: string | null
          date?: string
          id?: string
          meals_completed?: number | null
          month_of_year?: number | null
          nutrition_adherence_rate?: number | null
          total_calories_consumed?: number | null
          total_carbs_consumed?: number | null
          total_fat_consumed?: number | null
          total_protein_consumed?: number | null
          total_reps?: number | null
          total_time?: number | null
          total_weight?: number | null
          updated_at?: string | null
          user_id?: string
          week_of_year?: number | null
          workouts_completed?: number | null
          year?: number | null
        }
        Relationships: []
      }
      social_connections: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          friend_id: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          friend_id: string
          id?: string
          status: string
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          friend_id?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
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
            foreignKeyName: 'supplementation_plans_nutrition_plan_id_fkey'
            columns: ['nutrition_plan_id']
            isOneToOne: false
            referencedRelation: 'nutrition_plans'
            referencedColumns: ['id']
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
      user_badges: {
        Row: {
          badge_type: string
          created_at: string | null
          earned_at: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          badge_type: string
          created_at?: string | null
          earned_at?: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          badge_type?: string
          created_at?: string | null
          earned_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_points: {
        Row: {
          amount: number
          created_at: string | null
          earned_at: string
          id: string
          point_type: string
          reason: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          earned_at?: string
          id?: string
          point_type: string
          reason?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          earned_at?: string
          id?: string
          point_type?: string
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      workout_sessions: {
        Row: {
          borg_rpe: number
          calories_burned: number | null
          created_at: string | null
          day_index: number
          end_time: string
          exercises_completed: Json
          id: string
          nutrition_integration: Json | null
          start_time: string
          total_rest_time: number
          total_session_time: number
          total_time: number
          total_volume: number
          total_weight: number
          training_plan_id: string
          updated_at: string | null
          user_id: string
          workout_date: string
        }
        Insert: {
          borg_rpe: number
          calories_burned?: number | null
          created_at?: string | null
          day_index: number
          end_time: string
          exercises_completed: Json
          id?: string
          nutrition_integration?: Json | null
          start_time: string
          total_rest_time: number
          total_session_time: number
          total_time: number
          total_volume: number
          total_weight: number
          training_plan_id: string
          updated_at?: string | null
          user_id: string
          workout_date: string
        }
        Update: {
          borg_rpe?: number
          calories_burned?: number | null
          created_at?: string | null
          day_index?: number
          end_time?: string
          exercises_completed?: Json
          id?: string
          nutrition_integration?: Json | null
          start_time?: string
          total_rest_time?: number
          total_session_time?: number
          total_time?: number
          total_volume?: number
          total_weight?: number
          training_plan_id?: string
          updated_at?: string | null
          user_id?: string
          workout_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_all_leaderboards: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
