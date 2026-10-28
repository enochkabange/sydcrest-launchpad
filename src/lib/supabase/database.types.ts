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
      ai_review_usage: {
        Row: {
          attempt: number
          cache_creation_input_tokens: number
          cache_read_input_tokens: number
          created_at: string
          estimated_usd: number | null
          id: string
          input_tokens: number
          model: string
          outcome: string
          output_tokens: number
          submission_id: string
        }
        Insert: {
          attempt: number
          cache_creation_input_tokens?: number
          cache_read_input_tokens?: number
          created_at?: string
          estimated_usd?: number | null
          id?: string
          input_tokens?: number
          model: string
          outcome: string
          output_tokens?: number
          submission_id: string
        }
        Update: {
          attempt?: number
          cache_creation_input_tokens?: number
          cache_read_input_tokens?: number
          created_at?: string
          estimated_usd?: number | null
          id?: string
          input_tokens?: number
          model?: string
          outcome?: string
          output_tokens?: number
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_review_usage_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
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
      booking_messages: {
        Row: {
          body: string
          booking_id: string
          created_at: string
          id: string
          sender_id: string
        }
        Insert: {
          body: string
          booking_id: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Update: {
          body?: string
          booking_id?: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_messages_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_requests: {
        Row: {
          brief_id: string | null
          cancelled_by: string | null
          completed_at: string | null
          created_at: string
          expert_id: string
          id: string
          message: string
          offer_id: string | null
          organisation_id: string | null
          pitch_id: string | null
          preferred_times: string | null
          requester_id: string
          responded_at: string | null
          status: string
          status_reason: string | null
          updated_at: string
        }
        Insert: {
          brief_id?: string | null
          cancelled_by?: string | null
          completed_at?: string | null
          created_at?: string
          expert_id: string
          id?: string
          message: string
          offer_id?: string | null
          organisation_id?: string | null
          pitch_id?: string | null
          preferred_times?: string | null
          requester_id?: string
          responded_at?: string | null
          status?: string
          status_reason?: string | null
          updated_at?: string
        }
        Update: {
          brief_id?: string | null
          cancelled_by?: string | null
          completed_at?: string | null
          created_at?: string
          expert_id?: string
          id?: string
          message?: string
          offer_id?: string | null
          organisation_id?: string | null
          pitch_id?: string | null
          preferred_times?: string | null
          requester_id?: string
          responded_at?: string | null
          status?: string
          status_reason?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_requests_brief_id_fkey"
            columns: ["brief_id"]
            isOneToOne: false
            referencedRelation: "briefs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_pitch_id_fkey"
            columns: ["pitch_id"]
            isOneToOne: false
            referencedRelation: "pitches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      briefs: {
        Row: {
          awarded_at: string | null
          categories: string[]
          created_at: string
          deadline: string | null
          description: string
          id: string
          indicative_budget_ghs: number | null
          is_remote: boolean
          kind: string
          location: string | null
          organisation_id: string | null
          poster_id: string
          skills: string[]
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          awarded_at?: string | null
          categories?: string[]
          created_at?: string
          deadline?: string | null
          description: string
          id?: string
          indicative_budget_ghs?: number | null
          is_remote?: boolean
          kind?: string
          location?: string | null
          organisation_id?: string | null
          poster_id?: string
          skills?: string[]
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          awarded_at?: string | null
          categories?: string[]
          created_at?: string
          deadline?: string | null
          description?: string
          id?: string
          indicative_budget_ghs?: number | null
          is_remote?: boolean
          kind?: string
          location?: string | null
          organisation_id?: string | null
          poster_id?: string
          skills?: string[]
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "briefs_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "briefs_poster_id_fkey"
            columns: ["poster_id"]
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
      chapter_members: {
        Row: {
          chapter_id: string
          joined_at: string
          profile_id: string
          role: string
        }
        Insert: {
          chapter_id: string
          joined_at?: string
          profile_id?: string
          role?: string
        }
        Update: {
          chapter_id?: string
          joined_at?: string
          profile_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_members_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapter_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          city: string
          created_at: string
          id: string
          name: string
          region: string
          slug: string
          status: string
          summary: string | null
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          name: string
          region: string
          slug: string
          status?: string
          summary?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          name?: string
          region?: string
          slug?: string
          status?: string
          summary?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Relationships: []
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
      cohort_channels: {
        Row: {
          cohort_id: string
          updated_at: string
          whatsapp_url: string
        }
        Insert: {
          cohort_id: string
          updated_at?: string
          whatsapp_url: string
        }
        Update: {
          cohort_id?: string
          updated_at?: string
          whatsapp_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohort_channels_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: true
            referencedRelation: "cohorts"
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
      community_events: {
        Row: {
          capacity: number | null
          chapter_id: string | null
          city: string | null
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string
          format: string
          id: string
          kind: string
          region: string | null
          slug: string
          starts_at: string
          status: string
          summary: string | null
          title: string
          updated_at: string
          venue_address: string | null
          venue_name: string | null
        }
        Insert: {
          capacity?: number | null
          chapter_id?: string | null
          city?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at: string
          format: string
          id?: string
          kind: string
          region?: string | null
          slug: string
          starts_at: string
          status?: string
          summary?: string | null
          title: string
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
        }
        Update: {
          capacity?: number | null
          chapter_id?: string | null
          city?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string
          format?: string
          id?: string
          kind?: string
          region?: string | null
          slug?: string
          starts_at?: string
          status?: string
          summary?: string | null
          title?: string
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_events_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author_id: string
          body: string
          chapter_id: string | null
          cohort_id: string | null
          created_at: string
          edited_at: string | null
          hidden_at: string | null
          hidden_by: string | null
          hidden_reason: string | null
          id: string
          link_url: string | null
          pinned_at: string | null
          scope: string
          updated_at: string
        }
        Insert: {
          author_id?: string
          body: string
          chapter_id?: string | null
          cohort_id?: string | null
          created_at?: string
          edited_at?: string | null
          hidden_at?: string | null
          hidden_by?: string | null
          hidden_reason?: string | null
          id?: string
          link_url?: string | null
          pinned_at?: string | null
          scope: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          chapter_id?: string | null
          cohort_id?: string | null
          created_at?: string
          edited_at?: string | null
          hidden_at?: string | null
          hidden_by?: string | null
          hidden_reason?: string | null
          id?: string
          link_url?: string | null
          pinned_at?: string | null
          scope?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_hidden_by_fkey"
            columns: ["hidden_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_reactions: {
        Row: {
          created_at: string
          id: string
          kind: string
          post_id: string | null
          profile_id: string
          reply_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          post_id?: string | null
          profile_id?: string
          reply_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          post_id?: string | null
          profile_id?: string
          reply_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_reactions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_reactions_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "community_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      community_replies: {
        Row: {
          author_id: string
          body: string
          created_at: string
          edited_at: string | null
          hidden_at: string | null
          hidden_by: string | null
          hidden_reason: string | null
          id: string
          post_id: string
          updated_at: string
        }
        Insert: {
          author_id?: string
          body: string
          created_at?: string
          edited_at?: string | null
          hidden_at?: string | null
          hidden_by?: string | null
          hidden_reason?: string | null
          id?: string
          post_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          edited_at?: string | null
          hidden_at?: string | null
          hidden_by?: string | null
          hidden_reason?: string | null
          id?: string
          post_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_replies_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_replies_hidden_by_fkey"
            columns: ["hidden_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
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
      event_access: {
        Row: {
          checkin_code: string
          event_id: string
          join_url: string | null
          updated_at: string
        }
        Insert: {
          checkin_code?: string
          event_id: string
          join_url?: string | null
          updated_at?: string
        }
        Update: {
          checkin_code?: string
          event_id?: string
          join_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_access_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "community_events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_checkins: {
        Row: {
          checked_in_at: string
          checked_in_by: string | null
          event_id: string
          method: string
          profile_id: string
        }
        Insert: {
          checked_in_at?: string
          checked_in_by?: string | null
          event_id: string
          method: string
          profile_id: string
        }
        Update: {
          checked_in_at?: string
          checked_in_by?: string | null
          event_id?: string
          method?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_checkins_checked_in_by_fkey"
            columns: ["checked_in_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_checkins_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "community_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_checkins_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_feedback: {
        Row: {
          attend_again: boolean | null
          clarity: number | null
          comment: string | null
          confidence: number | null
          created_at: string
          event_id: string
          logistics: number | null
          profile_id: string
          quote_consent: boolean
          recommend: number | null
          updated_at: string
          usefulness: number | null
        }
        Insert: {
          attend_again?: boolean | null
          clarity?: number | null
          comment?: string | null
          confidence?: number | null
          created_at?: string
          event_id: string
          logistics?: number | null
          profile_id?: string
          quote_consent?: boolean
          recommend?: number | null
          updated_at?: string
          usefulness?: number | null
        }
        Update: {
          attend_again?: boolean | null
          clarity?: number | null
          comment?: string | null
          confidence?: number | null
          created_at?: string
          event_id?: string
          logistics?: number | null
          profile_id?: string
          quote_consent?: boolean
          recommend?: number | null
          updated_at?: string
          usefulness?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_feedback_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "community_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_feedback_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_recordings: {
        Row: {
          created_at: string
          duration_minutes: number | null
          event_id: string
          id: string
          is_published: boolean
          summary: string | null
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          created_at?: string
          duration_minutes?: number | null
          event_id: string
          id?: string
          is_published?: boolean
          summary?: string | null
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number | null
          event_id?: string
          id?: string
          is_published?: boolean
          summary?: string | null
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_recordings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "community_events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_rsvps: {
        Row: {
          event_id: string
          profile_id: string
          responded_at: string
          status: string
          updated_at: string
        }
        Insert: {
          event_id: string
          profile_id: string
          responded_at?: string
          status: string
          updated_at?: string
        }
        Update: {
          event_id?: string
          profile_id?: string
          responded_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "community_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_rsvps_profile_id_fkey"
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
      expert_applications: {
        Row: {
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision_note: string | null
          evidence_links: string[]
          experience: string | null
          fast_track: boolean
          id: string
          motivation: string
          profile_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          evidence_links?: string[]
          experience?: string | null
          fast_track?: boolean
          id?: string
          motivation: string
          profile_id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision_note?: string | null
          evidence_links?: string[]
          experience?: string | null
          fast_track?: boolean
          id?: string
          motivation?: string
          profile_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_applications_decided_by_fkey"
            columns: ["decided_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expert_applications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "expert_profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      expert_profiles: {
        Row: {
          accepting_requests: boolean
          approved_at: string | null
          availability_note: string | null
          bio: string | null
          categories: string[]
          created_at: string
          headline: string
          is_featured: boolean
          is_verified: boolean
          languages: string[]
          links: string[]
          offers_free_intro: boolean
          profile_id: string
          region: string | null
          skills: string[]
          slug: string
          status: string
          status_reason: string | null
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          accepting_requests?: boolean
          approved_at?: string | null
          availability_note?: string | null
          bio?: string | null
          categories?: string[]
          created_at?: string
          headline: string
          is_featured?: boolean
          is_verified?: boolean
          languages?: string[]
          links?: string[]
          offers_free_intro?: boolean
          profile_id?: string
          region?: string | null
          skills?: string[]
          slug: string
          status?: string
          status_reason?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          accepting_requests?: boolean
          approved_at?: string | null
          availability_note?: string | null
          bio?: string | null
          categories?: string[]
          created_at?: string
          headline?: string
          is_featured?: boolean
          is_verified?: boolean
          languages?: string[]
          links?: string[]
          offers_free_intro?: boolean
          profile_id?: string
          region?: string | null
          skills?: string[]
          slug?: string
          status?: string
          status_reason?: string | null
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expert_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_reviews: {
        Row: {
          body: string | null
          booking_id: string
          created_at: string
          expert_id: string
          id: string
          is_hidden: boolean
          rating: number
          reviewer_id: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          booking_id: string
          created_at?: string
          expert_id: string
          id?: string
          is_hidden?: boolean
          rating: number
          reviewer_id?: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          booking_id?: string
          created_at?: string
          expert_id?: string
          id?: string
          is_hidden?: boolean
          rating?: number
          reviewer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "booking_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expert_reviews_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expert_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
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
      notifications: {
        Row: {
          created_at: string
          id: string
          kind: string
          payload: Json
          read_at: string | null
          recipient_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          payload?: Json
          read_at?: string | null
          recipient_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          payload?: Json
          read_at?: string | null
          recipient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          cadence: string | null
          created_at: string
          delivery_days: number | null
          description: string
          duration_minutes: number | null
          expert_id: string
          id: string
          indicative_price_ghs: number | null
          is_active: boolean
          kind: string
          max_participants: number | null
          position: number
          revisions_included: number | null
          scope: string | null
          skills: string[]
          title: string
          updated_at: string
        }
        Insert: {
          cadence?: string | null
          created_at?: string
          delivery_days?: number | null
          description: string
          duration_minutes?: number | null
          expert_id?: string
          id?: string
          indicative_price_ghs?: number | null
          is_active?: boolean
          kind: string
          max_participants?: number | null
          position?: number
          revisions_included?: number | null
          scope?: string | null
          skills?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          cadence?: string | null
          created_at?: string
          delivery_days?: number | null
          description?: string
          duration_minutes?: number | null
          expert_id?: string
          id?: string
          indicative_price_ghs?: number | null
          is_active?: boolean
          kind?: string
          max_participants?: number | null
          position?: number
          revisions_included?: number | null
          scope?: string | null
          skills?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "expert_profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      opportunities: {
        Row: {
          apply_instructions: string | null
          apply_url: string | null
          compensation_note: string | null
          created_at: string
          deadline: string | null
          description: string
          eligibility: string | null
          fields: string[]
          id: string
          is_remote: boolean
          kind: string
          location: string | null
          organisation_id: string | null
          organisation_name: string
          posted_by: string | null
          published_at: string | null
          region: string | null
          skills: string[]
          slug: string
          source_url: string | null
          status: string
          summary: string | null
          title: string
          tracks: string[]
          updated_at: string
        }
        Insert: {
          apply_instructions?: string | null
          apply_url?: string | null
          compensation_note?: string | null
          created_at?: string
          deadline?: string | null
          description: string
          eligibility?: string | null
          fields?: string[]
          id?: string
          is_remote?: boolean
          kind: string
          location?: string | null
          organisation_id?: string | null
          organisation_name: string
          posted_by?: string | null
          published_at?: string | null
          region?: string | null
          skills?: string[]
          slug: string
          source_url?: string | null
          status?: string
          summary?: string | null
          title: string
          tracks?: string[]
          updated_at?: string
        }
        Update: {
          apply_instructions?: string | null
          apply_url?: string | null
          compensation_note?: string | null
          created_at?: string
          deadline?: string | null
          description?: string
          eligibility?: string | null
          fields?: string[]
          id?: string
          is_remote?: boolean
          kind?: string
          location?: string | null
          organisation_id?: string | null
          organisation_name?: string
          posted_by?: string | null
          published_at?: string | null
          region?: string | null
          skills?: string[]
          slug?: string
          source_url?: string | null
          status?: string
          summary?: string | null
          title?: string
          tracks?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunity_saves: {
        Row: {
          applied_at: string | null
          created_at: string
          opportunity_id: string
          profile_id: string
          status: string
          updated_at: string
        }
        Insert: {
          applied_at?: string | null
          created_at?: string
          opportunity_id: string
          profile_id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          applied_at?: string | null
          created_at?: string
          opportunity_id?: string
          profile_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_saves_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunity_saves_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organisation_members: {
        Row: {
          created_at: string
          invited_by: string | null
          joined_at: string | null
          organisation_id: string
          profile_id: string
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          invited_by?: string | null
          joined_at?: string | null
          organisation_id: string
          profile_id: string
          role?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          invited_by?: string | null
          joined_at?: string | null
          organisation_id?: string
          profile_id?: string
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organisation_members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organisation_members_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organisation_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organisations: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          kind: string
          logo_url: string | null
          name: string
          region: string | null
          registration_number: string | null
          slug: string
          updated_at: string
          verification_note: string | null
          verification_status: string
          verified_at: string | null
          verified_by: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          kind?: string
          logo_url?: string | null
          name: string
          region?: string | null
          registration_number?: string | null
          slug: string
          updated_at?: string
          verification_note?: string | null
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          kind?: string
          logo_url?: string | null
          name?: string
          region?: string | null
          registration_number?: string | null
          slug?: string
          updated_at?: string
          verification_note?: string | null
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organisations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organisations_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      outcomes: {
        Row: {
          created_at: string
          evidence_note: string | null
          evidence_url: string | null
          id: string
          opportunity_id: string | null
          organisation_id: string | null
          organisation_name: string
          profile_id: string
          show_on_profile: boolean
          started_on: string
          title: string | null
          type: string
          updated_at: string
          verification_note: string | null
          verification_status: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string
          evidence_note?: string | null
          evidence_url?: string | null
          id?: string
          opportunity_id?: string | null
          organisation_id?: string | null
          organisation_name: string
          profile_id?: string
          show_on_profile?: boolean
          started_on: string
          title?: string | null
          type: string
          updated_at?: string
          verification_note?: string | null
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string
          evidence_note?: string | null
          evidence_url?: string | null
          id?: string
          opportunity_id?: string | null
          organisation_id?: string | null
          organisation_name?: string
          profile_id?: string
          show_on_profile?: boolean
          started_on?: string
          title?: string | null
          type?: string
          updated_at?: string
          verification_note?: string | null
          verification_status?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outcomes_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outcomes_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outcomes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outcomes_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      pitches: {
        Row: {
          brief_id: string
          created_at: string
          decided_at: string | null
          expert_id: string
          id: string
          indicative_price_ghs: number | null
          message: string
          offer_id: string | null
          proposed_timeline: string | null
          status: string
          updated_at: string
        }
        Insert: {
          brief_id: string
          created_at?: string
          decided_at?: string | null
          expert_id?: string
          id?: string
          indicative_price_ghs?: number | null
          message: string
          offer_id?: string | null
          proposed_timeline?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          brief_id?: string
          created_at?: string
          decided_at?: string | null
          expert_id?: string
          id?: string
          indicative_price_ghs?: number | null
          message?: string
          offer_id?: string | null
          proposed_timeline?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pitches_brief_id_fkey"
            columns: ["brief_id"]
            isOneToOne: false
            referencedRelation: "briefs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitches_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "expert_profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "pitches_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
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
          display_prefs: Json
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
          display_prefs?: Json
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
          display_prefs?: Json
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
      skill_assessment_answers: {
        Row: {
          answer_key: Json
          assessment_id: string
          updated_at: string
        }
        Insert: {
          answer_key: Json
          assessment_id: string
          updated_at?: string
        }
        Update: {
          answer_key?: Json
          assessment_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessment_answers_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: true
            referencedRelation: "skill_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_assessment_attempts: {
        Row: {
          answers: Json | null
          assessment_id: string
          id: string
          kind: string
          portfolio_note: string | null
          portfolio_url: string | null
          profile_id: string
          review_note: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          score: number | null
          skill_id: string
          status: string
          submitted_at: string
        }
        Insert: {
          answers?: Json | null
          assessment_id: string
          id?: string
          kind: string
          portfolio_note?: string | null
          portfolio_url?: string | null
          profile_id: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          score?: number | null
          skill_id: string
          status: string
          submitted_at?: string
        }
        Update: {
          answers?: Json | null
          assessment_id?: string
          id?: string
          kind?: string
          portfolio_note?: string | null
          portfolio_url?: string | null
          profile_id?: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          score?: number | null
          skill_id?: string
          status?: string
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessment_attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "skill_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_assessment_attempts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_assessment_attempts_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_assessment_attempts_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_assessments: {
        Row: {
          created_at: string
          id: string
          instructions: string | null
          is_published: boolean
          kind: string
          pass_threshold: number
          questions: Json
          retry_after_hours: number
          skill_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          instructions?: string | null
          is_published?: boolean
          kind: string
          pass_threshold?: number
          questions?: Json
          retry_after_hours?: number
          skill_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          instructions?: string | null
          is_published?: boolean
          kind?: string
          pass_threshold?: number
          questions?: Json
          retry_after_hours?: number
          skill_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessments_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_roadmaps: {
        Row: {
          created_at: string
          roadmap_slug: string
          skill_id: string
        }
        Insert: {
          created_at?: string
          roadmap_slug: string
          skill_id: string
        }
        Update: {
          created_at?: string
          roadmap_slug?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_roadmaps_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          created_at: string
          id: string
          is_published: boolean
          name: string
          slug: string
          summary: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_published?: boolean
          name: string
          slug: string
          summary?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_published?: boolean
          name?: string
          slug?: string
          summary?: string | null
          updated_at?: string
        }
        Relationships: []
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
      talent_contact_requests: {
        Row: {
          created_at: string
          id: string
          message: string
          opportunity_id: string | null
          organisation_id: string
          profile_id: string
          requested_by: string | null
          responded_at: string | null
          shared_contact: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          opportunity_id?: string | null
          organisation_id: string
          profile_id: string
          requested_by?: string | null
          responded_at?: string | null
          shared_contact?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          opportunity_id?: string | null
          organisation_id?: string
          profile_id?: string
          requested_by?: string | null
          responded_at?: string | null
          shared_contact?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "talent_contact_requests_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talent_contact_requests_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talent_contact_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talent_contact_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_listings: {
        Row: {
          availability: string
          created_at: string
          headline: string
          is_active: boolean
          open_to_remote: boolean
          portfolio_url: string | null
          profile_id: string
          region: string | null
          skills: string[]
          summary: string | null
          tracks: string[]
          updated_at: string
        }
        Insert: {
          availability?: string
          created_at?: string
          headline: string
          is_active?: boolean
          open_to_remote?: boolean
          portfolio_url?: string | null
          profile_id?: string
          region?: string | null
          skills?: string[]
          summary?: string | null
          tracks?: string[]
          updated_at?: string
        }
        Update: {
          availability?: string
          created_at?: string
          headline?: string
          is_active?: boolean
          open_to_remote?: boolean
          portfolio_url?: string | null
          profile_id?: string
          region?: string | null
          skills?: string[]
          summary?: string | null
          tracks?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "talent_listings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verified_skills: {
        Row: {
          id: string
          issued_at: string
          issued_by: string | null
          profile_id: string
          revocation_reason: string | null
          revoked_at: string | null
          revoked_by: string | null
          skill_id: string
          source: string
          source_ref: string | null
        }
        Insert: {
          id?: string
          issued_at?: string
          issued_by?: string | null
          profile_id: string
          revocation_reason?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          skill_id: string
          source: string
          source_ref?: string | null
        }
        Update: {
          id?: string
          issued_at?: string
          issued_by?: string | null
          profile_id?: string
          revocation_reason?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          skill_id?: string
          source?: string
          source_ref?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verified_skills_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verified_skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verified_skills_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verified_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
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
      booking_threads: {
        Row: {
          brief_id: string | null
          completed_at: string | null
          created_at: string | null
          expert_avatar: string | null
          expert_id: string | null
          expert_name: string | null
          expert_slug: string | null
          has_review: boolean | null
          id: string | null
          last_message_at: string | null
          message: string | null
          offer_id: string | null
          offer_kind: string | null
          offer_title: string | null
          organisation_id: string | null
          organisation_name: string | null
          pitch_id: string | null
          preferred_times: string | null
          requester_avatar: string | null
          requester_id: string | null
          requester_name: string | null
          responded_at: string | null
          status: string | null
          status_reason: string | null
        }
        Relationships: []
      }
      brief_board: {
        Row: {
          can_manage: boolean | null
          categories: string[] | null
          created_at: string | null
          deadline: string | null
          description: string | null
          id: string | null
          indicative_budget_ghs: number | null
          is_remote: boolean | null
          kind: string | null
          location: string | null
          my_pitch_status: string | null
          organisation_id: string | null
          organisation_logo: string | null
          organisation_name: string | null
          organisation_slug: string | null
          organisation_verified: boolean | null
          pitch_count: number | null
          poster_avatar: string | null
          poster_id: string | null
          poster_name: string | null
          skills: string[] | null
          status: string | null
          title: string | null
        }
        Relationships: []
      }
      chapter_roster: {
        Row: {
          avatar_url: string | null
          chapter_id: string | null
          display_name: string | null
          joined_at: string | null
          profile_id: string | null
          public_slug: string | null
          role: string | null
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
      event_attendance: {
        Row: {
          event_id: string | null
          going_count: number | null
          seats_left: number | null
          waitlist_count: number | null
        }
        Relationships: []
      }
      event_attendees: {
        Row: {
          avatar_url: string | null
          checked_in_at: string | null
          display_name: string | null
          event_id: string | null
          profile_id: string | null
          public_slug: string | null
          responded_at: string | null
          rsvp_status: string | null
        }
        Relationships: []
      }
      expert_application_queue: {
        Row: {
          application_id: string | null
          avatar_url: string | null
          created_at: string | null
          decided_at: string | null
          decision_note: string | null
          display_name: string | null
          evidence_links: string[] | null
          experience: string | null
          expert_status: string | null
          fast_track: boolean | null
          headline: string | null
          links: string[] | null
          motivation: string | null
          profile_id: string | null
          skills: string[] | null
          slug: string | null
          status: string | null
        }
        Relationships: []
      }
      organisation_roster: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          joined_at: string | null
          organisation_id: string | null
          profile_id: string | null
          role: string | null
          status: string | null
        }
        Relationships: []
      }
      outcome_queue: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          evidence_note: string | null
          evidence_url: string | null
          id: string | null
          opportunity_id: string | null
          organisation_id: string | null
          organisation_name: string | null
          profile_id: string | null
          region: string | null
          started_on: string | null
          title: string | null
          type: string | null
          verification_note: string | null
          verification_status: string | null
          verified_at: string | null
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
      portfolio_review_queue: {
        Row: {
          assessment_id: string | null
          attempt_id: string | null
          avatar_url: string | null
          display_name: string | null
          portfolio_note: string | null
          portfolio_url: string | null
          profile_id: string | null
          public_slug: string | null
          review_note: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          skill_id: string | null
          skill_name: string | null
          status: string | null
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
      public_expert_reviews: {
        Row: {
          body: string | null
          created_at: string | null
          expert_id: string | null
          id: string | null
          offer_kind: string | null
          rating: number | null
          reviewer_name: string | null
        }
        Relationships: []
      }
      public_experts: {
        Row: {
          accepting_requests: boolean | null
          approved_at: string | null
          availability_note: string | null
          avatar_url: string | null
          average_rating: number | null
          bio: string | null
          categories: string[] | null
          completed_bookings: number | null
          display_name: string | null
          headline: string | null
          is_featured: boolean | null
          is_verified: boolean | null
          languages: string[] | null
          links: string[] | null
          median_response_hours: number | null
          offers_free_intro: boolean | null
          profile_id: string | null
          region: string | null
          review_count: number | null
          skills: string[] | null
          slug: string | null
          verified_skills: Json | null
        }
        Relationships: []
      }
      public_organisations: {
        Row: {
          description: string | null
          id: string | null
          kind: string | null
          logo_url: string | null
          name: string | null
          region: string | null
          slug: string | null
          verified_at: string | null
          website: string | null
        }
        Relationships: []
      }
      public_outcome_stats: {
        Row: {
          type: string | null
          verified_count: number | null
          verified_people: number | null
        }
        Relationships: []
      }
      public_portfolio: {
        Row: {
          body_excerpt: string | null
          body_is_excerpt: boolean | null
          graded_at: string | null
          has_file: boolean | null
          is_capstone: boolean | null
          link_url: string | null
          profile_id: string | null
          program_slug: string | null
          program_title: string | null
          public_slug: string | null
          submission_id: string | null
          theme: string | null
          week_number: number | null
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
      talent_directory: {
        Row: {
          availability: string | null
          avatar_url: string | null
          certificates: Json | null
          display_name: string | null
          headline: string | null
          open_to_remote: boolean | null
          portfolio_url: string | null
          profile_id: string | null
          public_slug: string | null
          region: string | null
          skills: string[] | null
          summary: string | null
          tracks: string[] | null
          updated_at: string | null
          verified_skills: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      accept_organisation_invite: {
        Args: { p_organisation_id: string }
        Returns: {
          created_at: string
          invited_by: string | null
          joined_at: string | null
          organisation_id: string
          profile_id: string
          role: string
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "organisation_members"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      accept_pitch: {
        Args: { p_pitch_id: string }
        Returns: {
          brief_id: string | null
          cancelled_by: string | null
          completed_at: string | null
          created_at: string
          expert_id: string
          id: string
          message: string
          offer_id: string | null
          organisation_id: string | null
          pitch_id: string | null
          preferred_times: string | null
          requester_id: string
          responded_at: string | null
          status: string
          status_reason: string | null
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "booking_requests"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      admin_cohort_outcomes: {
        Args: { p_months?: number }
        Returns: {
          certified: number
          cohort_id: string
          cohort_name: string
          cohort_status: string
          completed: number
          ends_on: string
          learners: number
          placed: number
          program_id: string
          program_title: string
          starts_on: string
          window_ends_on: string
        }[]
      }
      admin_find_profile_by_email: {
        Args: { p_email: string }
        Returns: {
          display_name: string
          id: string
        }[]
      }
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
      admin_set_expert_flags: {
        Args: {
          p_is_featured?: boolean
          p_is_verified?: boolean
          p_profile_id: string
        }
        Returns: {
          accepting_requests: boolean
          approved_at: string | null
          availability_note: string | null
          bio: string | null
          categories: string[]
          created_at: string
          headline: string
          is_featured: boolean
          is_verified: boolean
          languages: string[]
          links: string[]
          offers_free_intro: boolean
          profile_id: string
          region: string | null
          skills: string[]
          slug: string
          status: string
          status_reason: string | null
          updated_at: string
          verified_at: string | null
        }
        SetofOptions: {
          from: "*"
          to: "expert_profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      admin_set_expert_status: {
        Args: { p_profile_id: string; p_reason?: string; p_status: string }
        Returns: {
          accepting_requests: boolean
          approved_at: string | null
          availability_note: string | null
          bio: string | null
          categories: string[]
          created_at: string
          headline: string
          is_featured: boolean
          is_verified: boolean
          languages: string[]
          links: string[]
          offers_free_intro: boolean
          profile_id: string
          region: string | null
          skills: string[]
          slug: string
          status: string
          status_reason: string | null
          updated_at: string
          verified_at: string | null
        }
        SetofOptions: {
          from: "*"
          to: "expert_profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      admin_set_organisation_verification: {
        Args: { p_note?: string; p_organisation_id: string; p_status: string }
        Returns: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          kind: string
          logo_url: string | null
          name: string
          region: string | null
          registration_number: string | null
          slug: string
          updated_at: string
          verification_note: string | null
          verification_status: string
          verified_at: string | null
          verified_by: string | null
          website: string | null
        }
        SetofOptions: {
          from: "*"
          to: "organisations"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      admin_unpublish_profile: {
        Args: { p_profile_id: string }
        Returns: undefined
      }
      admin_verify_outcome: {
        Args: { p_note?: string; p_outcome_id: string; p_status: string }
        Returns: {
          created_at: string
          evidence_note: string | null
          evidence_url: string | null
          id: string
          opportunity_id: string | null
          organisation_id: string | null
          organisation_name: string
          profile_id: string
          show_on_profile: boolean
          started_on: string
          title: string | null
          type: string
          updated_at: string
          verification_note: string | null
          verification_status: string
          verified_at: string | null
          verified_by: string | null
        }
        SetofOptions: {
          from: "*"
          to: "outcomes"
          isOneToOne: true
          isSetofReturn: false
        }
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
      cancel_rsvp: { Args: { p_event_id: string }; Returns: undefined }
      certification_status: {
        Args: { p_profile_id?: string; p_program_id: string }
        Returns: Json
      }
      check_in_event: {
        Args: { p_code: string; p_event_id: string }
        Returns: string
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
      claim_path_skills: { Args: never; Returns: number }
      community_feed: {
        Args: {
          p_before?: string
          p_limit?: number
          p_scope: string
          p_scope_id?: string
        }
        Returns: {
          author_avatar_url: string
          author_id: string
          author_is_lead: boolean
          author_name: string
          author_public_slug: string
          body: string
          chapter_id: string
          cohort_id: string
          created_at: string
          edited_at: string
          hidden_at: string
          id: string
          link_url: string
          my_reactions: string[]
          pinned_at: string
          reaction_counts: Json
          reply_count: number
          scope: string
        }[]
      }
      community_post: {
        Args: { p_post_id: string }
        Returns: {
          author_avatar_url: string
          author_id: string
          author_is_lead: boolean
          author_name: string
          author_public_slug: string
          body: string
          chapter_id: string
          cohort_id: string
          created_at: string
          edited_at: string
          hidden_at: string
          id: string
          link_url: string
          my_reactions: string[]
          pinned_at: string
          reaction_counts: Json
          reply_count: number
          scope: string
        }[]
      }
      community_report_queue: {
        Args: { p_status?: string }
        Returns: {
          author_id: string
          author_name: string
          chapter_id: string
          cohort_id: string
          content_body: string
          created_at: string
          hidden_at: string
          id: string
          post_id: string
          reason: string
          reporter_name: string
          scope: string
          status: string
          target_id: string
          target_type: string
        }[]
      }
      community_thread: {
        Args: { p_post_id: string }
        Returns: {
          author_avatar_url: string
          author_id: string
          author_name: string
          author_public_slug: string
          body: string
          created_at: string
          edited_at: string
          hidden_at: string
          id: string
          my_reactions: string[]
          post_id: string
          reaction_counts: Json
        }[]
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
      decide_expert_application: {
        Args: { p_application_id: string; p_decision: string; p_note?: string }
        Returns: {
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision_note: string | null
          evidence_links: string[]
          experience: string | null
          fast_track: boolean
          id: string
          motivation: string
          profile_id: string
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "expert_applications"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      decline_pitch: {
        Args: { p_pitch_id: string }
        Returns: {
          brief_id: string
          created_at: string
          decided_at: string | null
          expert_id: string
          id: string
          indicative_price_ghs: number | null
          message: string
          offer_id: string | null
          proposed_timeline: string | null
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "pitches"
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
      event_feedback_summary: {
        Args: { p_event_id: string }
        Returns: {
          attend_again_rate: number
          avg_clarity: number
          avg_confidence: number
          avg_logistics: number
          avg_recommend: number
          avg_usefulness: number
          checked_in: number
          responses: number
          rsvps_going: number
        }[]
      }
      event_join_link: { Args: { p_event_id: string }; Returns: string }
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
      host_check_in: {
        Args: { p_event_id: string; p_profile_id: string }
        Returns: undefined
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
      mark_notifications_read: { Args: { p_ids?: string[] }; Returns: number }
      mint_achievement: {
        Args: {
          p_metadata?: Json
          p_profile_id: string
          p_ref_id?: string
          p_type: string
        }
        Returns: boolean
      }
      moderate_community_content: {
        Args: {
          p_hide: boolean
          p_reason?: string
          p_target_id: string
          p_target_type: string
        }
        Returns: undefined
      }
      notify_user: {
        Args: { p_kind: string; p_payload?: Json; p_recipient_id: string }
        Returns: string
      }
      pin_community_post: {
        Args: { p_pinned: boolean; p_post_id: string }
        Returns: undefined
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
      request_organisation_verification: {
        Args: { p_organisation_id: string }
        Returns: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          kind: string
          logo_url: string | null
          name: string
          region: string | null
          registration_number: string | null
          slug: string
          updated_at: string
          verification_note: string | null
          verification_status: string
          verified_at: string | null
          verified_by: string | null
          website: string | null
        }
        SetofOptions: {
          from: "*"
          to: "organisations"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      respond_talent_contact: {
        Args: {
          p_accept: boolean
          p_request_id: string
          p_shared_contact?: string
        }
        Returns: {
          created_at: string
          id: string
          message: string
          opportunity_id: string | null
          organisation_id: string
          profile_id: string
          requested_by: string | null
          responded_at: string | null
          shared_contact: string | null
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "talent_contact_requests"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      review_skill_portfolio: {
        Args: { p_approve: boolean; p_attempt_id: string; p_note?: string }
        Returns: string
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
      revoke_verified_skill: {
        Args: { p_reason: string; p_verified_skill_id: string }
        Returns: undefined
      }
      rotate_event_checkin_code: {
        Args: { p_event_id: string }
        Returns: string
      }
      rsvp_event: { Args: { p_event_id: string }; Returns: string }
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
      set_booking_status: {
        Args: { p_booking_id: string; p_reason?: string; p_status: string }
        Returns: {
          brief_id: string | null
          cancelled_by: string | null
          completed_at: string | null
          created_at: string
          expert_id: string
          id: string
          message: string
          offer_id: string | null
          organisation_id: string | null
          pitch_id: string | null
          preferred_times: string | null
          requester_id: string
          responded_at: string | null
          status: string
          status_reason: string | null
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "booking_requests"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      set_certificate_badge: {
        Args: { p_badge_json: Json; p_certificate_id: string }
        Returns: undefined
      }
      set_chapter_details: {
        Args: {
          p_chapter_id: string
          p_summary: string
          p_whatsapp_url: string
        }
        Returns: undefined
      }
      set_community_report_status: {
        Args: { p_report_id: string; p_status: string }
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
      submit_skill_portfolio: {
        Args: {
          p_assessment_id: string
          p_note?: string
          p_portfolio_url: string
        }
        Returns: string
      }
      submit_skill_quiz: {
        Args: { p_answers: Json; p_assessment_id: string }
        Returns: {
          passed: boolean
          score: number
          verified_skill_id: string
        }[]
      }
      take_form_rate_limit: {
        Args: { p_bucket: string; p_key: string }
        Returns: boolean
      }
      talent_eligibility: { Args: never; Returns: Json }
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
      withdraw_talent_contact: {
        Args: { p_request_id: string }
        Returns: {
          created_at: string
          id: string
          message: string
          opportunity_id: string | null
          organisation_id: string
          profile_id: string
          requested_by: string | null
          responded_at: string | null
          shared_contact: string | null
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "talent_contact_requests"
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

