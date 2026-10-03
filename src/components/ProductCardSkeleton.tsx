import React from "react";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800/80 shadow-xs flex flex-col overflow-hidden animate-pulse">
      {/* Image Container Skeleton */}
      <div className="relative aspect-4/3 sm:aspect-square w-full bg-gray-200/80 dark:bg-zinc-800">
        {/* Floating badge skeleton */}
        <div className="absolute top-2.5 left-2.5 h-5 w-24 bg-gray-300/70 dark:bg-zinc-700/70 rounded-full" />
      </div>

      {/* Details Skeleton */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2 pt-1">
          {/* Title Skeleton */}
          <div className="h-4.5 bg-gray-200 dark:bg-zinc-800 rounded-lg w-4/5" />
          {/* Description Skeleton */}
          <div className="h-3 bg-gray-100 dark:bg-zinc-800/60 rounded-md w-full" />
          <div className="h-3 bg-gray-100 dark:bg-zinc-800/60 rounded-md w-2/3" />
        </div>

        {/* Price & Add to Cart Skeleton */}
        <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-zinc-800/60">
          <div className="space-y-1">
            <div className="h-2.5 bg-gray-100 dark:bg-zinc-800/60 rounded w-8" />
            <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded-lg w-16" />
          </div>
          <div className="h-8.5 bg-gray-200 dark:bg-zinc-800 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
