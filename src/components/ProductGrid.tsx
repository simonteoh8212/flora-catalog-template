import React from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { Sparkles, RefreshCw } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onResetCategory?: () => void;
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onResetCategory,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-6" aria-label="Loading flower catalog">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-36 bg-gray-200 dark:bg-zinc-800 rounded-md animate-pulse" />
          <div className="h-4 w-52 bg-gray-100 dark:bg-zinc-800/60 rounded-md animate-pulse hidden sm:block" />
        </div>

        {/* Grid of Skeleton Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-primary-subtle dark:border-zinc-800 my-6 max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-primary-light dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-primary">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100">
          No arrangements found in {selectedCategory}
        </h3>
        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
          We are currently handcrafting new designs for this collection.
        </p>
        {onResetCategory && (
          <button
            onClick={onResetCategory}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-primary bg-primary-light hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>View All Arrangements</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-6" aria-label="Product Catalog">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
          <span>{selectedCategory}</span>
          <span className="text-xs font-normal text-gray-400 dark:text-zinc-500">
            ({products.length} {products.length === 1 ? "design" : "designs"})
          </span>
        </h2>
        <span className="text-xs text-gray-500 dark:text-zinc-400 hidden sm:inline">
          Prices include complimentary message card
        </span>
      </div>

      {/* Grid: 1 column on mobile, 2-3 on tablet/desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
