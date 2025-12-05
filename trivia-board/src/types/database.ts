export type Database = {
  public: {
    Tables: {
      trivias: {
        Row: {
          id: string;
          content: string;
          author: string;
          category: string;
          image_url: string | null;
          likes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          author: string;
          category: string;
          image_url?: string | null;
          likes?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          author?: string;
          category?: string;
          image_url?: string | null;
          likes?: number;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
