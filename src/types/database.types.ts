export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          xp: number;
          streak: number;
          created_at: string;
        };
        Insert: {
          id: string;
          name?: string;
          xp?: number;
          streak?: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          xp?: number;
          streak?: number;
        };
      };
    };
  };
};
