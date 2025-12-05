"use client";

import { Category } from "@/types";

interface CategoryFilterProps {
  selected: Category | "すべて";
  onSelect: (category: Category | "すべて") => void;
}

const categories: (Category | "すべて")[] = ["すべて", "動物", "科学", "歴史", "食べ物", "雑学", "その他"];

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === cat
              ? "bg-orange-400 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
