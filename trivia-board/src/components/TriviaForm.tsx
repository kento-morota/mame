"use client";

import { useState } from "react";
import { Category } from "@/types";
import ImageUpload from "./ImageUpload";

interface TriviaFormProps {
  onSubmit: (content: string, author: string, category: Category, imageUrl: string | null) => void;
  isSubmitting?: boolean;
}

const categories: Category[] = ["動物", "科学", "歴史", "食べ物", "雑学", "その他"];

export default function TriviaForm({ onSubmit, isSubmitting }: TriviaFormProps) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<Category>("雑学");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && author.trim()) {
      onSubmit(content.trim(), author.trim(), category, imageUrl);
      setContent("");
      setAuthor("");
      setCategory("雑学");
      setImageUrl(null);
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-lg"
      >
        + 豆知識を投稿する
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">新しい豆知識を共有</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">カテゴリ</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-orange-400 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">豆知識</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="みんなに教えたい豆知識を書いてね！"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all resize-none text-gray-800"
            rows={3}
            maxLength={280}
          />
          <p className="text-xs text-gray-400 text-right mt-1">{content.length}/280</p>
        </div>

        <ImageUpload
          currentImage={imageUrl}
          onUpload={(url) => setImageUrl(url || null)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">ニックネーム</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="あなたのニックネーム"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all text-gray-800"
            maxLength={20}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={!content.trim() || !author.trim() || isSubmitting}
            className="flex-1 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg font-bold hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "投稿中..." : "投稿する"}
          </button>
        </div>
      </div>
    </form>
  );
}
