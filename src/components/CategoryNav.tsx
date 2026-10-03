"use client";

import React from "react";
import { CATEGORIES } from "@/data/products";

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
  categories?: string[];
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
  categories,
}) => {
  const categoryList = categories && categories.length > 0 ? categories : CATEGORIES;

  return (
    <div
      className="sticky z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 py-3 transition-colors"
      style={{ top: "calc(var(--header-height, 93px) - 1px)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto px-4 py-1 scrollbar-none snap-x touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryList.map((category) => {
            const isSelected = selectedCategory === category;
            const count = categoryCounts[category];

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 font-semibold scale-[1.02]"
                    : "bg-gray-100/80 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-primary-light hover:text-primary dark:hover:bg-primary-light/40 border border-transparent"
                }`}
                aria-pressed={isSelected}
              >
                <span>{category}</span>
                {typeof count === "number" && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white font-bold"
                        : "bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300 font-normal"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
