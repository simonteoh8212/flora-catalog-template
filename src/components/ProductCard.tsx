"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import siteConfig from "@/config/site";
import { useCartStore } from "@/store/cartStore";
import { Plus, Check, ShoppingBag, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [justAdded, setJustAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <article className="group bg-white dark:bg-zinc-900 rounded-2xl border border-primary-muted dark:border-zinc-800 hover:border-primary-subtle dark:hover:border-primary-subtle shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image container */}
      <div className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden bg-primary-light dark:bg-zinc-800">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='48%' font-size='48' text-anchor='middle' dominant-baseline='middle'>🌸</text><text x='50%' y='60%' font-size='16' fill='%23a1a1aa' font-family='sans-serif' text-anchor='middle'>Handcrafted Floral Bouquet</text></svg>";
          }}
        />

        {/* Badge or Category */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold tracking-wide shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {product.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xs text-gray-700 dark:text-zinc-200 text-[10px] font-medium border border-gray-200 dark:border-zinc-700 shadow-2xs">
            {product.category}
          </span>
        </div>

        {/* Existing in-cart count badge */}
        {currentQuantity > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <ShoppingBag className="w-3 h-3" />
            <span>{currentQuantity} in cart</span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-zinc-100 text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-zinc-800">
          <div>
            <span className="text-[11px] text-gray-400 dark:text-zinc-500 font-medium block">Price</span>
            <div className="text-lg font-extrabold text-primary leading-none">
              {siteConfig.currencySymbol} {product.price.toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary ${
              justAdded
                ? "bg-emerald-600 text-white"
                : "bg-primary-light text-primary hover:bg-primary hover:text-primary-foreground border border-primary-subtle dark:border-primary-subtle/40 hover:border-transparent"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
