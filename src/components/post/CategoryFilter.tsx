import React from "react";
import type { Category } from "../../types";

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CATEGORIES: Category[] = [
  "All",
  "Web Dev",
  "Mobile",
  "AI/ML",
  "DevOps",
  "Data Science",
  "Cyber Security",
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? "bg-orange-500 text-white shadow-xs"
                : "bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--surface-border)]"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
