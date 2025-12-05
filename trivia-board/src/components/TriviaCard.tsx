"use client";

import { Trivia } from "@/types";

interface TriviaCardProps {
  trivia: Trivia;
  onLike: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  動物: "bg-green-100 text-green-800",
  科学: "bg-blue-100 text-blue-800",
  歴史: "bg-amber-100 text-amber-800",
  食べ物: "bg-red-100 text-red-800",
  雑学: "bg-purple-100 text-purple-800",
  その他: "bg-gray-100 text-gray-800",
};

export default function TriviaCard({ trivia, onLike }: TriviaCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden">
      {trivia.image_url && (
        <img
          src={trivia.image_url}
          alt="豆知識の画像"
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[trivia.category] || categoryColors["その他"]}`}
          >
            {trivia.category}
          </span>
          <span className="text-xs text-gray-400">{formatDate(trivia.created_at)}</span>
        </div>

        <p className="text-gray-800 text-base leading-relaxed mb-4">{trivia.content}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">by {trivia.author}</span>
          <button
            onClick={() => onLike(trivia.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors text-pink-600"
          >
            <span>♥</span>
            <span className="text-sm font-medium">{trivia.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
