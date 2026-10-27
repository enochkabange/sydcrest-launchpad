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
      certificates: {
        Row: {
          badge_json: Json | null
          cohort_id: string | null
          created_at: string
          id: string
          issued_at: string
          issued_by: string | null
          profile_id: string
          program_id: string
          program_title: string
          recipient_name: string
          revocation_reason: string | null
          revoked_at: string | null
          revoked_by: string | null
          specialization: string | null
          specialization_label: string | null
          updated_at: string
          verification_id: string
        }
        Insert: {
          badge_json?: Json | null
          cohort_id?: string | null
          created_at?: string
          id?: string
          issued_at?: string
          issued_by?: string | null
          profile_id: string
          program_id: string
          program_title: string
          recipient_name: string
          revocation_reason?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          specialization?: string | null
          specialization_label?: string | null
          updated_at?: string
          verification_id?: string
        }
        Update: {
          badge_json?: Json | null
          cohort_id?: string | null
          created_at?: string
          id?: string
          issued_at?: string
          issued_by?: string | null
          profile_id?: string
          program_id?: string
          program_title?: string
          recipient_name?: string
          revocation_reason?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          specialization?: string | null
          specialization_label?: string | null
          updated_at?: string
          verification_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_applications: {
        Row: {
          cohort_id: string | null
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision_note: string | null
          id: string
          preferred_cohort_id: string | null
          profile_id: string
          program_id: string
          screening_answers: Json
          specialization: string | null
          status: string
          updated_at: string
        }
        Insert: {
          cohort_id?: string | null
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          id?: string
          preferred_cohort_id?: string | null
          profile_id?: string
          program_id: string
          screening_answers?: Json
          specialization?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          cohort_id?: string | null
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          id?: string
          preferred_cohort_id?: string | null
          profile_id?: string
          program_id?: string
          screening_answers?: Json
          specialization?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_applications_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_applications_decided_by_fkey"
            columns: ["decided_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_applications_preferred_cohort_id_fkey"
            columns: ["preferred_cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_applications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_applications_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_members: {
        Row: {
          cohort_id: string
          completed_at: string | null
          created_at: string
          deferred_at: string | null
          deferred_to: string | null
          id: string
          profile_id: string
          role: string
          specialization: string | null
          status: string
          updated_at: string
        }
        Insert: {
          cohort_id: string
          completed_at?: string | null
          created_at?: string
          deferred_at?: string | null
          deferred_to?: string | null
          id?: string
          profile_id: string
          role: string
          specialization?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          cohort_id?: string
          completed_at?: string | null
          created_at?: string
          deferred_at?: string | null
          deferred_to?: string | null
          id?: string
          profile_id?: string
          role?: string
          specialization?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_members_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_members_deferred_to_fkey"
            columns: ["deferred_to"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cohort_notes: {
        Row: {
          author_id: string
          body: string
          cohort_member_id: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          author_id?: string
          body: string
          cohort_member_id: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          cohort_member_id?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_notes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_notes_cohort_member_id_fkey"
            columns: ["cohort_member_id"]
            isOneToOne: false
            referencedRelation: "cohort_members"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          created_at: string
          id: string
          max_size: number
          name: string
          program_id: string
          starts_on: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_size?: number
          name: string
          program_id: string
          starts_on: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          max_size?: number
          name?: string
          program_id?: string
          starts_on?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohorts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
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
      peer_reviews: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          comment: string | null
          created_at: string
          id: string
          reviewer_id: string
          rubric_scores: Json
          status: string
          submission_id: string
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          reviewer_id: string
          rubric_scores?: Json
          status?: string
          submission_id: string
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          reviewer_id?: string
          rubric_scores?: Json
          status?: string
          submission_id?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "peer_reviews_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "peer_reviews_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
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
      program_week_nodes: {
        Row: {
          created_at: string
          id: string
          node_slug: string
          position: number
          program_week_id: string
          roadmap_slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          node_slug: string
          position?: number
          program_week_id: string
          roadmap_slug: string
        }
        Update: {
          created_at?: string
          id?: string
          node_slug?: string
          position?: number
          program_week_id?: string
          roadmap_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_week_nodes_program_week_id_fkey"
            columns: ["program_week_id"]
            isOneToOne: false
            referencedRelation: "program_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      program_weeks: {
        Row: {
          assignment: string
          created_at: string
          id: string
          is_capstone: boolean
          objectives: string[]
          program_id: string
          resource_name: string | null
          resource_url: string | null
          specialization: string | null
          theme: string
          updated_at: string
          week_number: number
        }
        Insert: {
          assignment: string
          created_at?: string
          id?: string
          is_capstone?: boolean
          objectives?: string[]
          program_id: string
          resource_name?: string | null
          resource_url?: string | null
          specialization?: string | null
          theme: string
          updated_at?: string
          week_number: number
        }
        Update: {
          assignment?: string
          created_at?: string
          id?: string
          is_capstone?: boolean
          objectives?: string[]
          program_id?: string
          resource_name?: string | null
          resource_url?: string | null
          specialization?: string | null
          theme?: string
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "program_weeks_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          certification_summary: string | null
          created_at: string
          default_cohort_size: number
          duration_weeks: number
          eligibility: string | null
          grace_days: number
          id: string
          is_published: boolean
          min_age: number
          min_peer_reviews: number
          pass_score: number
          screening_questions: Json
          slug: string
          specializations: Json
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          certification_summary?: string | null
          created_at?: string
          default_cohort_size?: number
          duration_weeks?: number
          eligibility?: string | null
          grace_days?: number
          id?: string
          is_published?: boolean
          min_age?: number
          min_peer_reviews?: number
          pass_score?: number
          screening_questions?: Json
          slug: string
          specializations?: Json
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          certification_summary?: string | null
          created_at?: string
          default_cohort_size?: number
          duration_weeks?: number
          eligibility?: string | null
          grace_days?: number
          id?: string
          is_published?: boolean
          min_age?: number
          min_peer_reviews?: number
          pass_score?: number
          screening_questions?: Json
          slug?: string
          specializations?: Json
          summary?: string | null
          title?: string
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
      rubrics: {
        Row: {
          created_at: string
          criteria: Json
          id: string
          program_id: string
          program_week_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          criteria: Json
          id?: string
          program_id: string
          program_week_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          criteria?: Json
          id?: string
          program_id?: string
          program_week_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rubrics_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rubrics_program_id_program_week_id_fkey"
            columns: ["program_id", "program_week_id"]
            isOneToOne: true
            referencedRelation: "program_weeks"
            referencedColumns: ["program_id", "id"]
          },
        ]
      }
      submissions: {
        Row: {
          ai_feedback: Json | null
          ai_model: string | null
          ai_reviewed_at: string | null
          ai_score: number | null
          attempt: number
          body_text: string | null
          cohort_id: string
          created_at: string
          file_path: string | null
          final_score: number | null
          graded_at: string | null
          graded_by: string | null
          id: string
          in_portfolio: boolean
          link_url: string | null
          mentor_feedback: string | null
          profile_id: string
          program_id: string
          program_week_id: string
          status: string
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          ai_feedback?: Json | null
          ai_model?: string | null
          ai_reviewed_at?: string | null
          ai_score?: number | null
          attempt?: number
          body_text?: string | null
          cohort_id: string
          created_at?: string
          file_path?: string | null
          final_score?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          in_portfolio?: boolean
          link_url?: string | null
          mentor_feedback?: string | null
          profile_id: string
          program_id: string
          program_week_id: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          ai_feedback?: Json | null
          ai_model?: string | null
          ai_reviewed_at?: string | null
          ai_score?: number | null
          attempt?: number
          body_text?: string | null
          cohort_id?: string
          created_at?: string
          file_path?: string | null
          final_score?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          in_portfolio?: boolean
          link_url?: string | null
          mentor_feedback?: string | null
          profile_id?: string
          program_id?: string
          program_week_id?: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_graded_by_fkey"
            columns: ["graded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_program_id_program_week_id_fkey"
            columns: ["program_id", "program_week_id"]
            isOneToOne: false
            referencedRelation: "program_weeks"
            referencedColumns: ["program_id", "id"]
          },
        ]
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
      application_queue: {
        Row: {
          application_id: string | null
          avatar_url: string | null
          cohort_id: string | null
          created_at: string | null
          decided_at: string | null
          decision_note: string | null
          display_name: string | null
          preferred_cohort_id: string | null
          profile_id: string | null
          program_id: string | null
          public_slug: string | null
          region: string | null
          screening_answers: Json | null
          specialization: string | null
          status: string | null
        }
        Relationships: []
      }
      cohort_roster: {
        Row: {
          avatar_url: string | null
          cohort_id: string | null
          deferred_to: string | null
          display_name: string | null
          member_id: string | null
          profile_id: string | null
          public_slug: string | null
          role: string | null
          specialization: string | null
          status: string | null
        }
        Relationships: []
      }
      peer_review_submissions: {
        Row: {
          assigned_at: string | null
          body_text: string | null
          comment: string | null
          file_path: string | null
          link_url: string | null
          program_id: string | null
          program_week_id: string | null
          review_id: string | null
          review_status: string | null
          rubric_scores: Json | null
          submission_id: string | null
          submitted_at: string | null
        }
        Relationships: []
      }
      public_certificates: {
        Row: {
          issued_at: string | null
          profile_id: string | null
          program_slug: string | null
          program_title: string | null
          public_slug: string | null
          specialization_label: string | null
          verification_id: string | null
        }
        Relationships: []
      }
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
      assign_peer_review: {
        Args: { p_reviewer_id: string; p_submission_id: string }
        Returns: {
          assigned_at: string
          assigned_by: string | null
          comment: string | null
          created_at: string
          id: string
          reviewer_id: string
          rubric_scores: Json
          status: string
          submission_id: string
          submitted_at: string | null
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "peer_reviews"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      certification_status: {
        Args: { p_profile_id?: string; p_program_id: string }
        Returns: Json
      }
      choose_specialization: {
        Args: { p_cohort_member_id: string; p_specialization: string }
        Returns: {
          cohort_id: string
          completed_at: string | null
          created_at: string
          deferred_at: string | null
          deferred_to: string | null
          id: string
          profile_id: string
          role: string
          specialization: string | null
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "cohort_members"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      decide_application: {
        Args: {
          p_application_id: string
          p_cohort_id?: string
          p_decision: string
          p_note?: string
        }
        Returns: {
          cohort_id: string | null
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision_note: string | null
          id: string
          preferred_cohort_id: string | null
          profile_id: string
          program_id: string
          screening_answers: Json
          specialization: string | null
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "cohort_applications"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      defer_learner: {
        Args: { p_cohort_member_id: string; p_to_cohort_id?: string }
        Returns: {
          cohort_id: string
          completed_at: string | null
          created_at: string
          deferred_at: string | null
          deferred_to: string | null
          id: string
          profile_id: string
          role: string
          specialization: string | null
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "cohort_members"
          isOneToOne: true
          isSetofReturn: false
        }
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
      grade_submission: {
        Args: {
          p_final_score: number
          p_mentor_feedback?: string
          p_return?: boolean
          p_submission_id: string
        }
        Returns: {
          ai_feedback: Json | null
          ai_model: string | null
          ai_reviewed_at: string | null
          ai_score: number | null
          attempt: number
          body_text: string | null
          cohort_id: string
          created_at: string
          file_path: string | null
          final_score: number | null
          graded_at: string | null
          graded_by: string | null
          id: string
          in_portfolio: boolean
          link_url: string | null
          mentor_feedback: string | null
          profile_id: string
          program_id: string
          program_week_id: string
          status: string
          submitted_at: string | null
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "submissions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      issue_certificate: {
        Args: { p_cohort_member_id: string }
        Returns: {
          badge_json: Json | null
          cohort_id: string | null
          created_at: string
          id: string
          issued_at: string
          issued_by: string | null
          profile_id: string
          program_id: string
          program_title: string
          recipient_name: string
          revocation_reason: string | null
          revoked_at: string | null
          revoked_by: string | null
          specialization: string | null
          specialization_label: string | null
          updated_at: string
          verification_id: string
        }
        SetofOptions: {
          from: "*"
          to: "certificates"
          isOneToOne: true
          isSetofReturn: false
        }
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
      record_ai_review: {
        Args: {
          p_attempt: number
          p_feedback: Json
          p_model: string
          p_score: number
          p_submission_id: string
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
      revoke_certificate: {
        Args: { p_certificate_id: string; p_reason: string }
        Returns: {
          badge_json: Json | null
          cohort_id: string | null
          created_at: string
          id: string
          issued_at: string
          issued_by: string | null
          profile_id: string
          program_id: string
          program_title: string
          recipient_name: string
          revocation_reason: string | null
          revoked_at: string | null
          revoked_by: string | null
          specialization: string | null
          specialization_label: string | null
          updated_at: string
          verification_id: string
        }
        SetofOptions: {
          from: "*"
          to: "certificates"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      revoke_consent: { Args: { p_kind: string }; Returns: number }
      save_submission: {
        Args: {
          p_body_text?: string
          p_file_path?: string
          p_link_url?: string
          p_program_week_id: string
          p_submit?: boolean
        }
        Returns: {
          ai_feedback: Json | null
          ai_model: string | null
          ai_reviewed_at: string | null
          ai_score: number | null
          attempt: number
          body_text: string | null
          cohort_id: string
          created_at: string
          file_path: string | null
          final_score: number | null
          graded_at: string | null
          graded_by: string | null
          id: string
          in_portfolio: boolean
          link_url: string | null
          mentor_feedback: string | null
          profile_id: string
          program_id: string
          program_week_id: string
          status: string
          submitted_at: string | null
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "submissions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_certificate_badge: {
        Args: { p_badge_json: Json; p_certificate_id: string }
        Returns: undefined
      }
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
      submit_peer_review: {
        Args: { p_comment: string; p_review_id: string; p_rubric_scores: Json }
        Returns: {
          assigned_at: string
          assigned_by: string | null
          comment: string | null
          created_at: string
          id: string
          reviewer_id: string
          rubric_scores: Json
          status: string
          submission_id: string
          submitted_at: string | null
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "peer_reviews"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      verify_certificate: {
        Args: { p_verification_id: string }
        Returns: {
          badge_json: Json
          cohort_name: string
          issued_at: string
          program_slug: string
          program_title: string
          recipient_name: string
          revoked_at: string
          specialization_label: string
          verification_id: string
        }[]
      }
      withdraw_application: {
        Args: { p_application_id: string }
        Returns: {
          cohort_id: string | null
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision_note: string | null
          id: string
          preferred_cohort_id: string | null
          profile_id: string
          program_id: string
          screening_answers: Json
          specialization: string | null
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "cohort_applications"
          isOneToOne: true
          isSetofReturn: false
        }
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

