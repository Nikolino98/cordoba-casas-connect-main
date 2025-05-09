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
      consultas_contacto: {
        Row: {
          email: string
          fecha_consulta: string | null
          id: number
          leida: boolean | null
          mensaje: string
          nombre: string
          propiedad_id: number | null
          telefono: string | null
        }
        Insert: {
          email: string
          fecha_consulta?: string | null
          id?: number
          leida?: boolean | null
          mensaje: string
          nombre: string
          propiedad_id?: number | null
          telefono?: string | null
        }
        Update: {
          email?: string
          fecha_consulta?: string | null
          id?: number
          leida?: boolean | null
          mensaje?: string
          nombre?: string
          propiedad_id?: number | null
          telefono?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultas_contacto_propiedad_id_fkey"
            columns: ["propiedad_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          año_construccion: number | null
          baños: number | null
          caracteristicas: string | null
          ciudad: string
          codigo_postal: string | null
          descripcion: string
          destacada: boolean | null
          direccion: string
          estado: string | null
          fecha_publicacion: string | null
          habitaciones: number | null
          id: number
          imagen_principal: string | null
          imagenes: string | null
          lat: number | null
          lng: number | null
          moneda: string | null
          operacion: string
          precio: number
          provincia: string | null
          superficie_cubierta: number | null
          superficie_total: number | null
          tipo: string
          titulo: string
          zona: string | null
        }
        Insert: {
          año_construccion?: number | null
          baños?: number | null
          caracteristicas?: string | null
          ciudad: string
          codigo_postal?: string | null
          descripcion: string
          destacada?: boolean | null
          direccion: string
          estado?: string | null
          fecha_publicacion?: string | null
          habitaciones?: number | null
          id?: number
          imagen_principal?: string | null
          imagenes?: string | null
          lat?: number | null
          lng?: number | null
          moneda?: string | null
          operacion: string
          precio: number
          provincia?: string | null
          superficie_cubierta?: number | null
          superficie_total?: number | null
          tipo: string
          titulo: string
          zona?: string | null
        }
        Update: {
          año_construccion?: number | null
          baños?: number | null
          caracteristicas?: string | null
          ciudad?: string
          codigo_postal?: string | null
          descripcion?: string
          destacada?: boolean | null
          direccion?: string
          estado?: string | null
          fecha_publicacion?: string | null
          habitaciones?: number | null
          id?: number
          imagen_principal?: string | null
          imagenes?: string | null
          lat?: number | null
          lng?: number | null
          moneda?: string | null
          operacion?: string
          precio?: number
          provincia?: string | null
          superficie_cubierta?: number | null
          superficie_total?: number | null
          tipo?: string
          titulo?: string
          zona?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
