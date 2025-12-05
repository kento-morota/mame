export interface Trivia {
  id: string;
  content: string;
  author: string;
  category: string;
  image_url: string | null;
  likes: number;
  created_at: string;
}

export type Category = "動物" | "科学" | "歴史" | "食べ物" | "雑学" | "その他";
