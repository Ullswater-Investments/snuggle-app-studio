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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      access_logs: {
        Row: {
          action: string | null
          asset_id: string | null
          consumer_org_id: string
          created_at: string
          error_message: string | null
          id: string
          metadata: Json | null
          status: string | null
          transaction_id: string
          user_id: string | null
        }
        Insert: {
          action?: string | null
          asset_id?: string | null
          consumer_org_id: string
          created_at?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          transaction_id: string
          user_id?: string | null
        }
        Update: {
          action?: string | null
          asset_id?: string | null
          consumer_org_id?: string
          created_at?: string
          error_message?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          transaction_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "access_logs_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "data_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_logs_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "marketplace_listings"
            referencedColumns: ["asset_id"]
          },
          {
            foreignKeyName: "access_logs_consumer_org_id_fkey"
            columns: ["consumer_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_logs_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "data_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_feedback: {
        Row: {
          bot_response: string
          created_at: string
          current_page: string | null
          id: string
          is_positive: boolean
          status: string | null
          user_correction: string | null
          user_id: string | null
          user_question: string
          user_sector: string | null
        }
        Insert: {
          bot_response: string
          created_at?: string
          current_page?: string | null
          id?: string
          is_positive: boolean
          status?: string | null
          user_correction?: string | null
          user_id?: string | null
          user_question: string
          user_sector?: string | null
        }
        Update: {
          bot_response?: string
          created_at?: string
          current_page?: string | null
          id?: string
          is_positive?: boolean
          status?: string | null
          user_correction?: string | null
          user_id?: string | null
          user_question?: string
          user_sector?: string | null
        }
        Relationships: []
      }
      approval_history: {
        Row: {
          action: Database["public"]["Enums"]["approval_action"]
          actor_org_id: string
          actor_user_id: string
          created_at: string
          id: string
          notes: string | null
          transaction_id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["approval_action"]
          actor_org_id: string
          actor_user_id: string
          created_at?: string
          id?: string
          notes?: string | null
          transaction_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["approval_action"]
          actor_org_id?: string
          actor_user_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "approval_history_actor_org_id_fkey"
            columns: ["actor_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approval_history_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "data_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          organization_id: string
          resource: string | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          organization_id: string
          resource?: string | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          organization_id?: string
          resource?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      catalog_metadata: {
        Row: {
          asset_id: string
          categories: string[] | null
          created_at: string
          dcat_contact_point: Json | null
          dcat_distribution: Json | null
          dcat_theme: string[] | null
          dct_access_rights: string | null
          dct_conforms_to: string | null
          dct_description: string | null
          dct_issued: string | null
          dct_language: string[] | null
          dct_modified: string | null
          dct_publisher: string | null
          dct_spatial: string | null
          dct_temporal_end: string | null
          dct_temporal_start: string | null
          dct_title: string | null
          id: string
          tags: string[] | null
          updated_at: string
          visibility: string
        }
        Insert: {
          asset_id: string
          categories?: string[] | null
          created_at?: string
          dcat_contact_point?: Json | null
          dcat_distribution?: Json | null
          dcat_theme?: string[] | null
          dct_access_rights?: string | null
          dct_conforms_to?: string | null
          dct_description?: string | null
          dct_issued?: string | null
          dct_language?: string[] | null
          dct_modified?: string | null
          dct_publisher?: string | null
          dct_spatial?: string | null
          dct_temporal_end?: string | null
          dct_temporal_start?: string | null
          dct_title?: string | null
          id?: string
          tags?: string[] | null
          updated_at?: string
          visibility?: string
        }
        Update: {
          asset_id?: string
          categories?: string[] | null
          created_at?: string
          dcat_contact_point?: Json | null
          dcat_distribution?: Json | null
          dcat_theme?: string[] | null
          dct_access_rights?: string | null
          dct_conforms_to?: string | null
          dct_description?: string | null
          dct_issued?: string | null
          dct_language?: string[] | null
          dct_modified?: string | null
          dct_publisher?: string | null
          dct_spatial?: string | null
          dct_temporal_end?: string | null
          dct_temporal_start?: string | null
          dct_title?: string | null
          id?: string
          tags?: string[] | null
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_metadata_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: true
            referencedRelation: "data_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catalog_metadata_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: true
            referencedRelation: "marketplace_listings"
            referencedColumns: ["asset_id"]
          },
        ]
      }
      data_assets: {
        Row: {
          admin_notes: string | null
          billing_period: string | null
          created_at: string
          currency: string | null
          custom_metadata: Json | null
          holder_org_id: string
          id: string
          is_public_marketplace: boolean | null
          is_visible: boolean
          price: number | null
          pricing_model: string | null
          product_id: string
          published_at: string | null
          required_assurance_level: string | null
          sample_data: Json | null
          status: string
          subject_org_id: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          billing_period?: string | null
          created_at?: string
          currency?: string | null
          custom_metadata?: Json | null
          holder_org_id: string
          id?: string
          is_public_marketplace?: boolean | null
          is_visible?: boolean
          price?: number | null
          pricing_model?: string | null
          product_id: string
          published_at?: string | null
          required_assurance_level?: string | null
          sample_data?: Json | null
          status?: string
          subject_org_id: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          billing_period?: string | null
          created_at?: string
          currency?: string | null
          custom_metadata?: Json | null
          holder_org_id?: string
          id?: string
          is_public_marketplace?: boolean | null
          is_visible?: boolean
          price?: number | null
          pricing_model?: string | null
          product_id?: string
          published_at?: string | null
          required_assurance_level?: string | null
          sample_data?: Json | null
          status?: string
          subject_org_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_assets_holder_org_id_fkey"
            columns: ["holder_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_assets_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "data_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_assets_subject_org_id_fkey"
            columns: ["subject_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      data_payloads: {
        Row: {
          created_at: string | null
          data_content: Json
          id: string
          schema_type: string
          transaction_id: string
        }
        Insert: {
          created_at?: string | null
          data_content: Json
          id?: string
          schema_type: string
          transaction_id: string
        }
        Update: {
          created_at?: string | null
          data_content?: Json
          id?: string
          schema_type?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_payloads_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: true
            referencedRelation: "data_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      data_policies: {
        Row: {
          generated_at: string
          id: string
          odrl_policy_json: Json
          transaction_id: string
        }
        Insert: {
          generated_at?: string
          id?: string
          odrl_policy_json: Json
          transaction_id: string
        }
        Update: {
          generated_at?: string
          id?: string
          odrl_policy_json?: Json
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_policies_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: true
            referencedRelation: "data_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      data_products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          schema_definition: Json | null
          updated_at: string
          version: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          schema_definition?: Json | null
          updated_at?: string
          version?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          schema_definition?: Json | null
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      data_transactions: {
        Row: {
          access_duration_days: number
          asset_id: string
          consumer_org_id: string
          created_at: string
          holder_org_id: string
          id: string
          invoice_url: string | null
          justification: string
          metadata: Json | null
          payment_provider_id: string | null
          payment_status: string | null
          purpose: string
          requested_by: string
          status: Database["public"]["Enums"]["transaction_status"]
          subject_org_id: string
          subscription_expires_at: string | null
          updated_at: string
        }
        Insert: {
          access_duration_days?: number
          asset_id: string
          consumer_org_id: string
          created_at?: string
          holder_org_id: string
          id?: string
          invoice_url?: string | null
          justification: string
          metadata?: Json | null
          payment_provider_id?: string | null
          payment_status?: string | null
          purpose: string
          requested_by: string
          status?: Database["public"]["Enums"]["transaction_status"]
          subject_org_id: string
          subscription_expires_at?: string | null
          updated_at?: string
        }
        Update: {
          access_duration_days?: number
          asset_id?: string
          consumer_org_id?: string
          created_at?: string
          holder_org_id?: string
          id?: string
          invoice_url?: string | null
          justification?: string
          metadata?: Json | null
          payment_provider_id?: string | null
          payment_status?: string | null
          purpose?: string
          requested_by?: string
          status?: Database["public"]["Enums"]["transaction_status"]
          subject_org_id?: string
          subscription_expires_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "data_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "marketplace_listings"
            referencedColumns: ["asset_id"]
          },
          {
            foreignKeyName: "data_transactions_consumer_org_id_fkey"
            columns: ["consumer_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_transactions_holder_org_id_fkey"
            columns: ["holder_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_transactions_subject_org_id_fkey"
            columns: ["subject_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_configurations: {
        Row: {
          api_key_encrypted: string | null
          auth_method: Database["public"]["Enums"]["auth_method"]
          auth_token_encrypted: string | null
          config_name: string
          config_type: Database["public"]["Enums"]["erp_config_type"]
          created_at: string
          endpoint_url: string
          field_mapping: Json | null
          id: string
          is_active: boolean
          last_test_date: string | null
          last_test_status: string | null
          management_url: string | null
          organization_id: string
          protocol_url: string | null
          public_key: string | null
          updated_at: string
        }
        Insert: {
          api_key_encrypted?: string | null
          auth_method?: Database["public"]["Enums"]["auth_method"]
          auth_token_encrypted?: string | null
          config_name: string
          config_type: Database["public"]["Enums"]["erp_config_type"]
          created_at?: string
          endpoint_url: string
          field_mapping?: Json | null
          id?: string
          is_active?: boolean
          last_test_date?: string | null
          last_test_status?: string | null
          management_url?: string | null
          organization_id: string
          protocol_url?: string | null
          public_key?: string | null
          updated_at?: string
        }
        Update: {
          api_key_encrypted?: string | null
          auth_method?: Database["public"]["Enums"]["auth_method"]
          auth_token_encrypted?: string | null
          config_name?: string
          config_type?: Database["public"]["Enums"]["erp_config_type"]
          created_at?: string
          endpoint_url?: string
          field_mapping?: Json | null
          id?: string
          is_active?: boolean
          last_test_date?: string | null
          last_test_status?: string | null
          management_url?: string | null
          organization_id?: string
          protocol_url?: string | null
          public_key?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "erp_configurations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      esg_reports: {
        Row: {
          certifications: string[] | null
          created_at: string | null
          energy_renewable_percent: number | null
          id: string
          organization_id: string
          report_year: number
          scope1_total_tons: number | null
          scope2_total_tons: number | null
        }
        Insert: {
          certifications?: string[] | null
          created_at?: string | null
          energy_renewable_percent?: number | null
          id?: string
          organization_id: string
          report_year: number
          scope1_total_tons?: number | null
          scope2_total_tons?: number | null
        }
        Update: {
          certifications?: string[] | null
          created_at?: string | null
          energy_renewable_percent?: number | null
          id?: string
          organization_id?: string
          report_year?: number
          scope1_total_tons?: number | null
          scope2_total_tons?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "esg_reports_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      export_logs: {
        Row: {
          created_at: string
          erp_config_id: string | null
          error_message: string | null
          export_status: string
          export_type: string
          id: string
          organization_id: string
          transaction_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          erp_config_id?: string | null
          error_message?: string | null
          export_status: string
          export_type: string
          id?: string
          organization_id: string
          transaction_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          erp_config_id?: string | null
          error_message?: string | null
          export_status?: string
          export_type?: string
          id?: string
          organization_id?: string
          transaction_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "export_logs_erp_config_id_fkey"
            columns: ["erp_config_id"]
            isOneToOne: false
            referencedRelation: "erp_configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "export_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "export_logs_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "data_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      innovation_lab_concepts: {
        Row: {
          business_impact: string
          category: string
          chart_config: Json
          chart_data: Json
          chart_type: string
          created_at: string | null
          full_analysis: string
          id: string
          maturity_level: number | null
          short_description: string
          title: string
        }
        Insert: {
          business_impact: string
          category: string
          chart_config: Json
          chart_data: Json
          chart_type: string
          created_at?: string | null
          full_analysis: string
          id?: string
          maturity_level?: number | null
          short_description: string
          title: string
        }
        Update: {
          business_impact?: string
          category?: string
          chart_config?: Json
          chart_data?: Json
          chart_type?: string
          created_at?: string | null
          full_analysis?: string
          id?: string
          maturity_level?: number | null
          short_description?: string
          title?: string
        }
        Relationships: []
      }
      kit_inscriptions: {
        Row: {
          acceptance_act_accepted: boolean | null
          address: string
          cif: string
          city: string
          clinic_name: string
          communications_accepted: boolean | null
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_role: string
          contract_accepted: boolean | null
          contract_accepted_at: string | null
          created_at: string
          current_software: string | null
          email: string
          has_digital_records: string | null
          has_website: boolean | null
          id: string
          interested_modules: Json | null
          num_employees: number | null
          num_veterinarians: number | null
          phone: string
          postal_code: string
          privacy_accepted: boolean
          province: string
          status: string | null
          terms_accepted: boolean
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          acceptance_act_accepted?: boolean | null
          address: string
          cif: string
          city: string
          clinic_name: string
          communications_accepted?: boolean | null
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_role: string
          contract_accepted?: boolean | null
          contract_accepted_at?: string | null
          created_at?: string
          current_software?: string | null
          email: string
          has_digital_records?: string | null
          has_website?: boolean | null
          id?: string
          interested_modules?: Json | null
          num_employees?: number | null
          num_veterinarians?: number | null
          phone: string
          postal_code: string
          privacy_accepted?: boolean
          province: string
          status?: string | null
          terms_accepted?: boolean
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          acceptance_act_accepted?: boolean | null
          address?: string
          cif?: string
          city?: string
          clinic_name?: string
          communications_accepted?: boolean | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          contact_role?: string
          contract_accepted?: boolean | null
          contract_accepted_at?: string | null
          created_at?: string
          current_software?: string | null
          email?: string
          has_digital_records?: string | null
          has_website?: boolean | null
          id?: string
          interested_modules?: Json | null
          num_employees?: number | null
          num_veterinarians?: number | null
          phone?: string
          postal_code?: string
          privacy_accepted?: boolean
          province?: string
          status?: string | null
          terms_accepted?: boolean
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      login_attempts: {
        Row: {
          attempted_at: string | null
          email: string
          id: string
          ip_address: string | null
          success: boolean | null
        }
        Insert: {
          attempted_at?: string | null
          email: string
          id?: string
          ip_address?: string | null
          success?: boolean | null
        }
        Update: {
          attempted_at?: string | null
          email?: string
          id?: string
          ip_address?: string | null
          success?: boolean | null
        }
        Relationships: []
      }
      marketplace_opportunities: {
        Row: {
          budget_range: string
          category: string
          consumer_org_id: string
          created_at: string
          description: string
          expires_at: string
          id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          budget_range: string
          category: string
          consumer_org_id: string
          created_at?: string
          description: string
          expires_at?: string
          id?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          budget_range?: string
          category?: string
          consumer_org_id?: string
          created_at?: string
          description?: string
          expires_at?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_opportunities_consumer_org_id_fkey"
            columns: ["consumer_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      node_eligibility_requests: {
        Row: {
          created_at: string | null
          ecosystem_status: string
          email: string
          entity_name: string
          entity_type: string
          id: string
          ip_address: string | null
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          ecosystem_status: string
          email: string
          entity_name: string
          entity_type: string
          id?: string
          ip_address?: string | null
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          ecosystem_status?: string
          email?: string
          entity_name?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      organization_reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          metrics: Json | null
          rating: number
          reviewer_org_id: string
          target_org_id: string
          transaction_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          metrics?: Json | null
          rating: number
          reviewer_org_id: string
          target_org_id: string
          transaction_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          metrics?: Json | null
          rating?: number
          reviewer_org_id?: string
          target_org_id?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_reviews_reviewer_org_id_fkey"
            columns: ["reviewer_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_reviews_target_org_id_fkey"
            columns: ["target_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_reviews_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "data_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          assurance_level: string | null
          banner_url: string | null
          created_at: string
          description: string | null
          did: string | null
          id: string
          is_demo: boolean | null
          kyb_verified: boolean | null
          linkedin_url: string | null
          logo_url: string | null
          marketplace_description: string | null
          name: string
          pontus_verified: boolean | null
          sector: string | null
          seller_category: string | null
          stripe_connect_id: string | null
          tax_id: string
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string
          verification_source: string | null
          wallet_address: string | null
          website: string | null
        }
        Insert: {
          assurance_level?: string | null
          banner_url?: string | null
          created_at?: string
          description?: string | null
          did?: string | null
          id?: string
          is_demo?: boolean | null
          kyb_verified?: boolean | null
          linkedin_url?: string | null
          logo_url?: string | null
          marketplace_description?: string | null
          name: string
          pontus_verified?: boolean | null
          sector?: string | null
          seller_category?: string | null
          stripe_connect_id?: string | null
          tax_id: string
          type: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
          verification_source?: string | null
          wallet_address?: string | null
          website?: string | null
        }
        Update: {
          assurance_level?: string | null
          banner_url?: string | null
          created_at?: string
          description?: string | null
          did?: string | null
          id?: string
          is_demo?: boolean | null
          kyb_verified?: boolean | null
          linkedin_url?: string | null
          logo_url?: string | null
          marketplace_description?: string | null
          name?: string
          pontus_verified?: boolean | null
          sector?: string | null
          seller_category?: string | null
          stripe_connect_id?: string | null
          tax_id?: string
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
          verification_source?: string | null
          wallet_address?: string | null
          website?: string | null
        }
        Relationships: []
      }
      partner_access: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          partner_name: string
          partner_number: number | null
          partner_slug: string
          password_hash: string
          redirect_path: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          partner_name: string
          partner_number?: number | null
          partner_slug: string
          password_hash: string
          redirect_path: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          partner_name?: string
          partner_number?: number | null
          partner_slug?: string
          password_hash?: string
          redirect_path?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      privacy_preferences: {
        Row: {
          access_alerts: boolean | null
          anonymous_research: boolean | null
          created_at: string | null
          email_notifications: boolean | null
          id: string
          in_app_notifications: boolean | null
          instant_alerts: boolean | null
          notify_contracts: boolean | null
          notify_data_requests: boolean | null
          notify_marketing: boolean | null
          notify_payments: boolean | null
          notify_system: boolean | null
          profile_visible: boolean | null
          push_notifications: boolean | null
          quiet_hours_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          show_access_history: boolean | null
          updated_at: string | null
          user_id: string
          weekly_digest: boolean | null
        }
        Insert: {
          access_alerts?: boolean | null
          anonymous_research?: boolean | null
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          in_app_notifications?: boolean | null
          instant_alerts?: boolean | null
          notify_contracts?: boolean | null
          notify_data_requests?: boolean | null
          notify_marketing?: boolean | null
          notify_payments?: boolean | null
          notify_system?: boolean | null
          profile_visible?: boolean | null
          push_notifications?: boolean | null
          quiet_hours_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          show_access_history?: boolean | null
          updated_at?: string | null
          user_id: string
          weekly_digest?: boolean | null
        }
        Update: {
          access_alerts?: boolean | null
          anonymous_research?: boolean | null
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          in_app_notifications?: boolean | null
          instant_alerts?: boolean | null
          notify_contracts?: boolean | null
          notify_data_requests?: boolean | null
          notify_marketing?: boolean | null
          notify_payments?: boolean | null
          notify_system?: boolean | null
          profile_visible?: boolean | null
          push_notifications?: boolean | null
          quiet_hours_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          show_access_history?: boolean | null
          updated_at?: string | null
          user_id?: string
          weekly_digest?: boolean | null
        }
        Relationships: []
      }
      registration_requests: {
        Row: {
          accepted_conduct: boolean | null
          accepted_gdpr: boolean | null
          accepted_terms: boolean | null
          address: string
          country: string
          created_at: string | null
          created_organization_id: string | null
          erp_type: string | null
          id: string
          intention_data_types: string[] | null
          intention_has_erp: string | null
          ip_address: string | null
          legal_name: string
          product_category: string | null
          representative_email: string
          representative_name: string
          representative_phone: string | null
          representative_position: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_notes: string | null
          role: string
          sector: string
          size: string
          status: Database["public"]["Enums"]["registration_status"] | null
          tax_id: string
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          accepted_conduct?: boolean | null
          accepted_gdpr?: boolean | null
          accepted_terms?: boolean | null
          address: string
          country: string
          created_at?: string | null
          created_organization_id?: string | null
          erp_type?: string | null
          id?: string
          intention_data_types?: string[] | null
          intention_has_erp?: string | null
          ip_address?: string | null
          legal_name: string
          product_category?: string | null
          representative_email: string
          representative_name: string
          representative_phone?: string | null
          representative_position?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          role: string
          sector: string
          size: string
          status?: Database["public"]["Enums"]["registration_status"] | null
          tax_id: string
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          accepted_conduct?: boolean | null
          accepted_gdpr?: boolean | null
          accepted_terms?: boolean | null
          address?: string
          country?: string
          created_at?: string | null
          created_organization_id?: string | null
          erp_type?: string | null
          id?: string
          intention_data_types?: string[] | null
          intention_has_erp?: string | null
          ip_address?: string | null
          legal_name?: string
          product_category?: string | null
          representative_email?: string
          representative_name?: string
          representative_phone?: string | null
          representative_position?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewer_notes?: string | null
          role?: string
          sector?: string
          size?: string
          status?: Database["public"]["Enums"]["registration_status"] | null
          tax_id?: string
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registration_requests_created_organization_id_fkey"
            columns: ["created_organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      signed_contracts: {
        Row: {
          accepted_gdpr: boolean
          accepted_terms: boolean
          certificate_issuer: string | null
          certificate_serial: string | null
          created_at: string
          document_hash: string | null
          eidas_level: string | null
          full_name: string
          id: string
          ip_address: string | null
          organization_name: string
          position: string
          signature_data_url: string
          signature_provider: string | null
          signature_type: string | null
          signed_at: string
          signed_document_url: string | null
          tax_id: string
          user_agent: string | null
        }
        Insert: {
          accepted_gdpr?: boolean
          accepted_terms?: boolean
          certificate_issuer?: string | null
          certificate_serial?: string | null
          created_at?: string
          document_hash?: string | null
          eidas_level?: string | null
          full_name: string
          id?: string
          ip_address?: string | null
          organization_name: string
          position: string
          signature_data_url: string
          signature_provider?: string | null
          signature_type?: string | null
          signed_at?: string
          signed_document_url?: string | null
          tax_id: string
          user_agent?: string | null
        }
        Update: {
          accepted_gdpr?: boolean
          accepted_terms?: boolean
          certificate_issuer?: string | null
          certificate_serial?: string | null
          created_at?: string
          document_hash?: string | null
          eidas_level?: string | null
          full_name?: string
          id?: string
          ip_address?: string | null
          organization_name?: string
          position?: string
          signature_data_url?: string
          signature_provider?: string | null
          signature_type?: string | null
          signed_at?: string
          signed_document_url?: string | null
          tax_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          author_role: string | null
          challenge: string
          company_name: string
          created_at: string | null
          id: string
          impact_highlight: string
          is_featured: boolean | null
          metrics: Json
          quote: string | null
          sector: string
          solution: string
        }
        Insert: {
          author_role?: string | null
          challenge: string
          company_name: string
          created_at?: string | null
          id?: string
          impact_highlight: string
          is_featured?: boolean | null
          metrics: Json
          quote?: string | null
          sector: string
          solution: string
        }
        Update: {
          author_role?: string | null
          challenge?: string
          company_name?: string
          created_at?: string | null
          id?: string
          impact_highlight?: string
          is_featured?: boolean | null
          metrics?: Json
          quote?: string | null
          sector?: string
          solution?: string
        }
        Relationships: []
      }
      supplier_data: {
        Row: {
          company_name: string
          contact_person_email: string | null
          contact_person_name: string | null
          contact_person_phone: string | null
          created_at: string
          data_source: string | null
          fiscal_address: Json
          id: string
          last_updated: string
          legal_address: Json | null
          legal_admin_name: string | null
          legal_name: string
          tax_id: string
          transaction_id: string
        }
        Insert: {
          company_name: string
          contact_person_email?: string | null
          contact_person_name?: string | null
          contact_person_phone?: string | null
          created_at?: string
          data_source?: string | null
          fiscal_address: Json
          id?: string
          last_updated?: string
          legal_address?: Json | null
          legal_admin_name?: string | null
          legal_name: string
          tax_id: string
          transaction_id: string
        }
        Update: {
          company_name?: string
          contact_person_email?: string | null
          contact_person_name?: string | null
          contact_person_phone?: string | null
          created_at?: string
          data_source?: string | null
          fiscal_address?: Json
          id?: string
          last_updated?: string
          legal_address?: Json | null
          legal_admin_name?: string | null
          legal_name?: string
          tax_id?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_data_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "data_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          sender_org_id: string
          transaction_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          sender_org_id: string
          transaction_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          sender_org_id?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_messages_sender_org_id_fkey"
            columns: ["sender_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_messages_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "data_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          organization_id: string
          position: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          organization_id: string
          position?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          organization_id?: string
          position?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_wishlist: {
        Row: {
          asset_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          asset_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          asset_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_wishlist_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "data_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_wishlist_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "marketplace_listings"
            referencedColumns: ["asset_id"]
          },
        ]
      }
      value_services: {
        Row: {
          api_endpoint: string | null
          category: string | null
          code_examples: Json | null
          created_at: string | null
          currency: string | null
          description: string | null
          documentation_md: string | null
          features: Json | null
          icon_name: string | null
          id: string
          integrations: Json | null
          name: string
          price: number | null
          price_model: string | null
          provider_org_id: string | null
          version: string | null
        }
        Insert: {
          api_endpoint?: string | null
          category?: string | null
          code_examples?: Json | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          documentation_md?: string | null
          features?: Json | null
          icon_name?: string | null
          id?: string
          integrations?: Json | null
          name: string
          price?: number | null
          price_model?: string | null
          provider_org_id?: string | null
          version?: string | null
        }
        Update: {
          api_endpoint?: string | null
          category?: string | null
          code_examples?: Json | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          documentation_md?: string | null
          features?: Json | null
          icon_name?: string | null
          id?: string
          integrations?: Json | null
          name?: string
          price?: number | null
          price_model?: string | null
          provider_org_id?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "value_services_provider_org_id_fkey"
            columns: ["provider_org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      verifiable_credentials: {
        Row: {
          created_at: string
          credential_data: Json
          credential_type: string
          expires_at: string | null
          id: string
          issued_at: string
          issuer_did: string
          organization_id: string
          proof: Json | null
          revocation_reason: string | null
          status: string
          subject_did: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          credential_data: Json
          credential_type: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          issuer_did: string
          organization_id: string
          proof?: Json | null
          revocation_reason?: string | null
          status?: string
          subject_did: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          credential_data?: Json
          credential_type?: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          issuer_did?: string
          organization_id?: string
          proof?: Json | null
          revocation_reason?: string | null
          status?: string
          subject_did?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "verifiable_credentials_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          from_wallet_id: string | null
          id: string
          metadata: Json | null
          reference_id: string | null
          status: string | null
          to_wallet_id: string | null
          transaction_type: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          from_wallet_id?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          status?: string | null
          to_wallet_id?: string | null
          transaction_type?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          from_wallet_id?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          status?: string | null
          to_wallet_id?: string | null
          transaction_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_from_wallet_id_fkey"
            columns: ["from_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_to_wallet_id_fkey"
            columns: ["to_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          address: string
          balance: number | null
          created_at: string | null
          currency: string | null
          id: string
          is_frozen: boolean | null
          organization_id: string
          updated_at: string | null
        }
        Insert: {
          address: string
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          is_frozen?: boolean | null
          organization_id: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          is_frozen?: boolean | null
          organization_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      webhooks: {
        Row: {
          created_at: string | null
          events: string[] | null
          id: string
          is_active: boolean | null
          organization_id: string
          secret: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          organization_id: string
          secret: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          events?: string[] | null
          id?: string
          is_active?: boolean | null
          organization_id?: string
          secret?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhooks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      marketplace_listings: {
        Row: {
          asset_id: string | null
          billing_period: string | null
          category: string | null
          created_at: string | null
          currency: string | null
          energy_renewable_percent: number | null
          has_green_badge: boolean | null
          kyb_verified: boolean | null
          price: number | null
          pricing_model: string | null
          product_description: string | null
          product_id: string | null
          product_name: string | null
          provider_id: string | null
          provider_name: string | null
          reputation_score: number | null
          review_count: number | null
          seller_category: string | null
          version: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_assets_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "data_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_assets_subject_org_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      cleanup_old_login_attempts: { Args: never; Returns: undefined }
      get_org_kpis: { Args: { target_org_id: string }; Returns: Json }
      get_pending_transactions: {
        Args: { _user_id: string }
        Returns: {
          asset_name: string
          consumer_name: string
          created_at: string
          holder_name: string
          purpose: string
          role_in_transaction: string
          status: Database["public"]["Enums"]["transaction_status"]
          subject_name: string
          transaction_id: string
        }[]
      }
      get_user_organization: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _organization_id: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_data_space_owner: { Args: { _user_id: string }; Returns: boolean }
      revoke_expired_transactions: { Args: never; Returns: number }
    }
    Enums: {
      app_role:
        | "admin"
        | "approver"
        | "viewer"
        | "api_configurator"
        | "data_space_owner"
      approval_action: "pre_approve" | "approve" | "deny" | "cancel"
      auth_method: "bearer" | "api_key" | "oauth" | "basic"
      erp_config_type: "download" | "upload"
      organization_type: "consumer" | "provider" | "data_holder"
      registration_status:
        | "pending"
        | "under_review"
        | "approved"
        | "rejected"
        | "needs_info"
      transaction_status:
        | "initiated"
        | "pending_subject"
        | "pending_holder"
        | "approved"
        | "denied_subject"
        | "denied_holder"
        | "completed"
        | "cancelled"
        | "revoked"
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
    Enums: {
      app_role: [
        "admin",
        "approver",
        "viewer",
        "api_configurator",
        "data_space_owner",
      ],
      approval_action: ["pre_approve", "approve", "deny", "cancel"],
      auth_method: ["bearer", "api_key", "oauth", "basic"],
      erp_config_type: ["download", "upload"],
      organization_type: ["consumer", "provider", "data_holder"],
      registration_status: [
        "pending",
        "under_review",
        "approved",
        "rejected",
        "needs_info",
      ],
      transaction_status: [
        "initiated",
        "pending_subject",
        "pending_holder",
        "approved",
        "denied_subject",
        "denied_holder",
        "completed",
        "cancelled",
        "revoked",
      ],
    },
  },
} as const
