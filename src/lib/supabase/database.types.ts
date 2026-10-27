export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          profile_id: string
          ref_id: string | null
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          profile_id: string
          ref_id?: string | null
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          profile_id?: string
          ref_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievements_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage: {
        Row: {
          day: string
          input_tokens: number
          messages: number
          output_tokens: number
          profile_id: string
          updated_at: string
        }
        Insert: {
          day: string
          input_tokens?: number
          messages?: number
          output_tokens?: number
          profile_id: string
          updated_at?: string
        }
        Update: {
          day?: string
          input_tokens?: number
          messages?: number
          output_tokens?: number
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consents: {
        Row: {
          granted_at: string
          id: string
          kind: string
          phone: string | null
          profile_id: string
          revoked_at: string | null
          revoked_reason: string | null
          version: string
        }
        Insert: {
          granted_at?: string
          id?: string
          kind: string
          phone?: string | null
          profile_id?: string
          revoked_at?: string | null
          revoked_reason?: string | null
          version: string
        }
        Update: {
          granted_at?: string
          id?: string
          kind?: string
          phone?: string | null
          profile_id?: string
          revoked_at?: string | null
          revoked_reason?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "consents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          anonymous_id: string | null
          created_at: string
          id: number
          name: string
          profile_id: string | null
          props: Json
        }
        Insert: {
          anonymous_id?: string | null
          created_at?: string
          id?: never
          name: string
          profile_id?: string | null
          props?: Json
        }
        Update: {
          anonymous_id?: string | null
          created_at?: string
          id?: never
          name?: string
          profile_id?: string | null
          props?: Json
        }
        Relationships: [
          {
            foreignKeyName: "events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string
          follower_id?: string
          following_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      node_content: {
        Row: {
          content_version: number
          created_at: string
          explanation_md: string
          generated_at: string
          id: string
          node_id: string
          practice_task_md: string | null
          updated_at: string
        }
        Insert: {
          content_version?: number
          created_at?: string
          explanation_md: string
          generated_at?: string
          id?: string
          node_id: string
          practice_task_md?: string | null
          updated_at?: string
        }
        Update: {
          content_version?: number
          created_at?: string
          explanation_md?: string
          generated_at?: string
          id?: string
          node_id?: string
          practice_task_md?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "node_content_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: true
            referencedRelation: "roadmap_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      node_quiz: {
        Row: {
          created_at: string
          id: string
          node_id: string
          pass_threshold: number
          questions: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          node_id: string
          pass_threshold?: number
          questions: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          node_id?: string
          pass_threshold?: number
          questions?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "node_quiz_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: true
            referencedRelation: "roadmap_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      node_quiz_answers: {
        Row: {
          answer_key: Json
          quiz_id: string
          updated_at: string
        }
        Insert: {
          answer_key: Json
          quiz_id: string
          updated_at?: string
        }
        Update: {
          answer_key?: Json
          quiz_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "node_quiz_answers_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: true
            referencedRelation: "node_quiz"
            referencedColumns: ["id"]
          },
        ]
      }
      node_resources: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          kind: string
          label: string
          node_id: string
          position: number
          source: string | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          kind: string
          label: string
          node_id: string
          position?: number
          source?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          kind?: string
          label?: string
          node_id?: string
          position?: number
          source?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "node_resources_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "roadmap_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      personalized_paths: {
        Row: {
          created_at: string
          id: string
          plan: Json | null
          profile_id: string
          quiz_answers: Json
          recommended_roadmap_id: string | null
          skill_gap: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          plan?: Json | null
          profile_id: string
          quiz_answers: Json
          recommended_roadmap_id?: string | null
          skill_gap?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          plan?: Json | null
          profile_id?: string
          quiz_answers?: Json
          recommended_roadmap_id?: string | null
          skill_gap?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "personalized_paths_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "personalized_paths_recommended_roadmap_id_fkey"
            columns: ["recommended_roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          datacamp_license_slot: string | null
          display_name: string | null
          goals: string | null
          headline: string | null
          id: string
          is_public: boolean
          phone: string | null
          public_slug: string | null
          region: string | null
          role: string
          skills: string[]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          datacamp_license_slot?: string | null
          display_name?: string | null
          goals?: string | null
          headline?: string | null
          id: string
          is_public?: boolean
          phone?: string | null
          public_slug?: string | null
          region?: string | null
          role?: string
          skills?: string[]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          datacamp_license_slot?: string | null
          display_name?: string | null
          goals?: string | null
          headline?: string | null
          id?: string
          is_public?: boolean
          phone?: string | null
          public_slug?: string | null
          region?: string | null
          role?: string
          skills?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          id: string
          reason: string
          reporter_id: string
          status: string
          target_id: string
          target_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          reason: string
          reporter_id?: string
          status?: string
          target_id: string
          target_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string
          reporter_id?: string
          status?: string
          target_id?: string
          target_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_nodes: {
        Row: {
          choice_group: string | null
          created_at: string
          id: string
          is_optional: boolean
          kind: string | null
          parent_id: string | null
          position: number
          roadmap_id: string
          slug: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          choice_group?: string | null
          created_at?: string
          id?: string
          is_optional?: boolean
          kind?: string | null
          parent_id?: string | null
          position?: number
          roadmap_id: string
          slug: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          choice_group?: string | null
          created_at?: string
          id?: string
          is_optional?: boolean
          kind?: string | null
          parent_id?: string | null
          position?: number
          roadmap_id?: string
          slug?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_nodes_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmaps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roadmap_nodes_roadmap_id_parent_id_fkey"
            columns: ["roadmap_id", "parent_id"]
            isOneToOne: false
            referencedRelation: "roadmap_nodes"
            referencedColumns: ["roadmap_id", "id"]
          },
        ]
      }
      roadmap_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          node_id: string
          profile_id: string
          quiz_score: number | null
          status: string
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          node_id: string
          profile_id: string
          quiz_score?: number | null
          status?: string
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          node_id?: string
          profile_id?: string
          quiz_score?: number | null
          status?: string
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_progress_node_id_fkey"
            columns: ["node_id"]
            isOneToOne: false
            referencedRelation: "roadmap_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roadmap_progress_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmaps: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          field_category: string | null
          id: string
          is_published: boolean
          locale: string
          og_image_url: string | null
          slug: string
          title: string
          track: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          field_category?: string | null
          id?: string
          is_published?: boolean
          locale?: string
          og_image_url?: string | null
          slug: string
          title: string
          track?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          field_category?: string | null
          id?: string
          is_published?: boolean
          locale?: string
          og_image_url?: string | null
          slug?: string
          title?: string
          track?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          interest: string | null
          name: string | null
          region: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          interest?: string | null
          name?: string | null
          region?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          interest?: string | null
          name?: string | null
          region?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      public_profile_stats: {
        Row: {
          avatar_url: string | null
          current_streak: number | null
          display_name: string | null
          followers_count: number | null
          following_count: number | null
          has_datacamp_license: boolean | null
          id: string | null
          nodes_completed: number | null
          public_slug: string | null
          region: string | null
        }
        Relationships: []
      }
      public_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          goals: string | null
          headline: string | null
          id: string | null
          public_slug: string | null
          region: string | null
          skills: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_reports: {
        Args: { p_status?: string }
        Returns: {
          created_at: string
          id: string
          reason: string
          reporter_name: string
          status: string
          target_id: string
          target_is_public: boolean
          target_name: string
          target_slug: string
          target_type: string
          updated_at: string
        }[]
      }
      admin_unpublish_profile: {
        Args: { p_profile_id: string }
        Returns: undefined
      }
      funnel_by_week: {
        Args: { p_weeks?: number }
        Returns: {
          activations: number
          signups: number
          visits: number
          week_start: string
        }[]
      }
      mint_achievement: {
        Args: {
          p_metadata?: Json
          p_profile_id: string
          p_ref_id?: string
          p_type: string
        }
        Returns: boolean
      }
      record_ai_tokens: {
        Args: { p_input_tokens?: number; p_output_tokens?: number }
        Returns: {
          day: string
          input_tokens: number
          messages: number
          output_tokens: number
          profile_id: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "ai_usage"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      record_ai_usage: {
        Args: { p_input_tokens?: number; p_output_tokens?: number }
        Returns: {
          day: string
          input_tokens: number
          messages: number
          output_tokens: number
          profile_id: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "ai_usage"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      revoke_consent: { Args: { p_kind: string }; Returns: number }
      set_node_status: {
        Args: { p_node_id: string; p_status: string }
        Returns: {
          completed_at: string | null
          created_at: string
          id: string
          node_id: string
          profile_id: string
          quiz_score: number | null
          status: string
          updated_at: string
          verified_at: string | null
        }
        SetofOptions: {
          from: "*"
          to: "roadmap_progress"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      submit_node_quiz: {
        Args: { p_answers: Json; p_node_id: string }
        Returns: {
          passed: boolean
          results: Json
          score: number
        }[]
      }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

