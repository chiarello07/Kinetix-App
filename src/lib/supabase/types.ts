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

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
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

// --- CONSTRAINTS ---
// Table: assessment_responses
//   FOREIGN KEY assessment_responses_nutrition_assessment_id_fkey: FOREIGN KEY (nutrition_assessment_id) REFERENCES nutrition_assessments(id) ON DELETE CASCADE
//   PRIMARY KEY assessment_responses_pkey: PRIMARY KEY (id)
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
// Table: supplementation_plans
//   FOREIGN KEY supplementation_plans_nutrition_plan_id_fkey: FOREIGN KEY (nutrition_plan_id) REFERENCES nutrition_plans(id) ON DELETE CASCADE
//   PRIMARY KEY supplementation_plans_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: assessment_responses
//   Policy "Users can insert their own assessment_responses" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
//   Policy "Users can view their own assessment_responses" (SELECT, PERMISSIVE) roles={public}
//     USING: true
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
// Table: supplementation_plans
//   Policy "authenticated_all" (ALL, PERMISSIVE) roles={authenticated}
//     USING: true
//     WITH CHECK: true

// --- INDEXES ---
// Table: foods
//   CREATE UNIQUE INDEX foods_name_key ON public.foods USING btree (name)
