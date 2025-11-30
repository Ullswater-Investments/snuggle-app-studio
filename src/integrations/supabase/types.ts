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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
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
      catalog_metadata: {
        Row: {
          asset_id: string
          categories: string[] | null
          created_at: string
          id: string
          tags: string[] | null
          updated_at: string
          visibility: string
        }
        Insert: {
          asset_id: string
          categories?: string[] | null
          created_at?: string
          id?: string
          tags?: string[] | null
          updated_at?: string
          visibility?: string
        }
        Update: {
          asset_id?: string
          categories?: string[] | null
          created_at?: string
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
        ]
      }
      data_assets: {
        Row: {
          created_at: string
          custom_metadata: Json | null
          holder_org_id: string
          id: string
          product_id: string
          status: string
          subject_org_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_metadata?: Json | null
          holder_org_id: string
          id?: string
          product_id: string
          status?: string
          subject_org_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_metadata?: Json | null
          holder_org_id?: string
          id?: string
          product_id?: string
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
          justification: string
          metadata: Json | null
          purpose: string
          requested_by: string
          status: Database["public"]["Enums"]["transaction_status"]
          subject_org_id: string
          updated_at: string
        }
        Insert: {
          access_duration_days?: number
          asset_id: string
          consumer_org_id: string
          created_at?: string
          holder_org_id: string
          id?: string
          justification: string
          metadata?: Json | null
          purpose: string
          requested_by: string
          status?: Database["public"]["Enums"]["transaction_status"]
          subject_org_id: string
          updated_at?: string
        }
        Update: {
          access_duration_days?: number
          asset_id?: string
          consumer_org_id?: string
          created_at?: string
          holder_org_id?: string
          id?: string
          justification?: string
          metadata?: Json | null
          purpose?: string
          requested_by?: string
          status?: Database["public"]["Enums"]["transaction_status"]
          subject_org_id?: string
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
          organization_id: string
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
          organization_id: string
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
          organization_id?: string
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
      organizations: {
        Row: {
          created_at: string
          id: string
          is_demo: boolean | null
          name: string
          sector: string | null
          tax_id: string
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_demo?: boolean | null
          name: string
          sector?: string | null
          tax_id: string
          type: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_demo?: boolean | null
          name?: string
          sector?: string | null
          tax_id?: string
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string
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
      value_services: {
        Row: {
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          features: Json | null
          icon_name: string | null
          id: string
          name: string
          price: number | null
          price_model: string | null
          provider_org_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          features?: Json | null
          icon_name?: string | null
          id?: string
          name: string
          price?: number | null
          price_model?: string | null
          provider_org_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          features?: Json | null
          icon_name?: string | null
          id?: string
          name?: string
          price?: number | null
          price_model?: string | null
          provider_org_id?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
    }
    Enums: {
      app_role: "admin" | "approver" | "viewer" | "api_configurator"
      approval_action: "pre_approve" | "approve" | "deny" | "cancel"
      auth_method: "bearer" | "api_key" | "oauth" | "basic"
      erp_config_type: "download" | "upload"
      organization_type: "consumer" | "provider" | "data_holder"
      transaction_status:
        | "initiated"
        | "pending_subject"
        | "pending_holder"
        | "approved"
        | "denied_subject"
        | "denied_holder"
        | "completed"
        | "cancelled"
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
      app_role: ["admin", "approver", "viewer", "api_configurator"],
      approval_action: ["pre_approve", "approve", "deny", "cancel"],
      auth_method: ["bearer", "api_key", "oauth", "basic"],
      erp_config_type: ["download", "upload"],
      organization_type: ["consumer", "provider", "data_holder"],
      transaction_status: [
        "initiated",
        "pending_subject",
        "pending_holder",
        "approved",
        "denied_subject",
        "denied_holder",
        "completed",
        "cancelled",
      ],
    },
  },
} as const
