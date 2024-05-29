export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          copilotId: string
          created: string | null
          id: string
          title: string | null
          updated: string | null
        }
        Insert: {
          copilotId: string
          created?: string | null
          id?: string
          title?: string | null
          updated?: string | null
        }
        Update: {
          copilotId?: string
          created?: string | null
          id?: string
          title?: string | null
          updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_copilot_id_fkey"
            columns: ["copilotId"]
            isOneToOne: false
            referencedRelation: "copilots"
            referencedColumns: ["id"]
          },
        ]
      }
      copilots: {
        Row: {
          anonymousCredits: number | null
          baseUrl: string
          created: string | null
          credits: number | null
          id: string
          plan: Database["public"]["Enums"]["plan"] | null
          storageUrl: string | null
          updated: string | null
          userId: string
        }
        Insert: {
          anonymousCredits?: number | null
          baseUrl: string
          created?: string | null
          credits?: number | null
          id?: string
          plan?: Database["public"]["Enums"]["plan"] | null
          storageUrl?: string | null
          updated?: string | null
          userId: string
        }
        Update: {
          anonymousCredits?: number | null
          baseUrl?: string
          created?: string | null
          credits?: number | null
          id?: string
          plan?: Database["public"]["Enums"]["plan"] | null
          storageUrl?: string | null
          updated?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "copilots_user_id_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content: string
          copilotId: string
          created: string | null
          embedding: string | null
          id: string
          title: string | null
          updated: string | null
          url: string | null
        }
        Insert: {
          content: string
          copilotId: string
          created?: string | null
          embedding?: string | null
          id?: string
          title?: string | null
          updated?: string | null
          url?: string | null
        }
        Update: {
          content?: string
          copilotId?: string
          created?: string | null
          embedding?: string | null
          id?: string
          title?: string | null
          updated?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_copilot_id_fkey"
            columns: ["copilotId"]
            isOneToOne: false
            referencedRelation: "copilots"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          completionTokens: number | null
          content: string | null
          conversationId: string
          created: string | null
          embedding: string | null
          id: string
          openaiId: string | null
          openaiModel: string | null
          openaiObject: string | null
          promptTokens: number | null
          role: Database["public"]["Enums"]["role"] | null
        }
        Insert: {
          completionTokens?: number | null
          content?: string | null
          conversationId: string
          created?: string | null
          embedding?: string | null
          id?: string
          openaiId?: string | null
          openaiModel?: string | null
          openaiObject?: string | null
          promptTokens?: number | null
          role?: Database["public"]["Enums"]["role"] | null
        }
        Update: {
          completionTokens?: number | null
          content?: string | null
          conversationId?: string
          created?: string | null
          embedding?: string | null
          id?: string
          openaiId?: string | null
          openaiModel?: string | null
          openaiObject?: string | null
          promptTokens?: number | null
          role?: Database["public"]["Enums"]["role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversationId"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      newTable: {
        Row: {
          createdAt: string | null
          id: number
          name: string
        }
        Insert: {
          createdAt?: string | null
          id: number
          name: string
        }
        Update: {
          createdAt?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      responseTemplates: {
        Row: {
          classification: string | null
          copilotId: string
          createdAt: string | null
          id: string
          name: string | null
          template: string
        }
        Insert: {
          classification?: string | null
          copilotId: string
          createdAt?: string | null
          id?: string
          name?: string | null
          template: string
        }
        Update: {
          classification?: string | null
          copilotId?: string
          createdAt?: string | null
          id?: string
          name?: string | null
          template?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_categories_copilot_id_fkey"
            columns: ["copilotId"]
            isOneToOne: false
            referencedRelation: "copilots"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      convert_to_camel_case: {
        Args: {
          input_text: string
        }
        Returns: string
      }
      get_api_key: {
        Args: {
          api_name_param: string
        }
        Returns: string
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
         
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
         
      match_documents: {
        Args: {
          queryEmbedding: string
          matchThreshold: number
          copilotId: string
          matchCount: number
        }
        Returns: {
          id: string
          content: string
          url: string
          similarity: number
        }[]
      }
      match_messages: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          content: string
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      plan: "free" | "silver" | "gold"
      response_template_type: "text" | "completion" | "embedding"
      role: "system" | "user" | "assistant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
