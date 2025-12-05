"use client";

import { useState, useEffect } from "react";
import TriviaCard from "@/components/TriviaCard";
import TriviaForm from "@/components/TriviaForm";
import CategoryFilter from "@/components/CategoryFilter";
import { getSupabase } from "@/lib/supabase";
import { Trivia, Category } from "@/types";

export default function Home() {
  const [trivias, setTrivias] = useState<Trivia[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "すべて">("すべて");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // データ取得
  useEffect(() => {
    fetchTrivias();
  }, []);

  const fetchTrivias = async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("trivias")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching trivias:", error);
    } else {
      setTrivias((data as Trivia[]) || []);
    }
    setIsLoading(false);
  };

  // 新規投稿
  const handleSubmit = async (content: string, author: string, category: Category, imageUrl: string | null) => {
    const supabase = getSupabase();
    if (!supabase) return;

    setIsSubmitting(true);
    const { data, error } = await supabase
      .from("trivias")
      .insert({ content, author, category, image_url: imageUrl })
      .select()
      .single();

    if (error) {
      console.error("Error creating trivia:", error);
      alert("投稿に失敗しました");
    } else if (data) {
      setTrivias([data as Trivia, ...trivias]);
    }
    setIsSubmitting(false);
  };

  // いいね
  const handleLike = async (id: string) => {
    const supabase = getSupabase();
    if (!supabase) return;

    const trivia = trivias.find((t) => t.id === id);
    if (!trivia) return;

    const { error } = await supabase
      .from("trivias")
      .update({ likes: trivia.likes + 1 })
      .eq("id", id);

    if (error) {
      console.error("Error updating likes:", error);
    } else {
      setTrivias(
        trivias.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
      );
    }
  };

  const filteredTrivias =
    selectedCategory === "すべて"
      ? trivias
      : trivias.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            豆知識交換所
          </h1>
          <p className="text-center text-gray-500 text-sm mt-1">
            みんなで豆知識を共有しよう！
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <TriviaForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full"></div>
              <p className="text-gray-400 mt-2">読み込み中...</p>
            </div>
          ) : filteredTrivias.length > 0 ? (
            filteredTrivias.map((trivia) => (
              <TriviaCard key={trivia.id} trivia={trivia} onLike={handleLike} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-2">🔍</p>
              <p>まだ豆知識がありません</p>
              <p className="text-sm mt-1">最初の投稿者になろう！</p>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>豆知識交換所 © 2024</p>
      </footer>
    </div>
  );
}
