"use client";

import React from "react";
import siteConfig from "@/config/site";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingCartButton: React.FC = () => {
  const totalItems = useCartStore((state) => state.totalItems);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  // Hide floating cart button if bottom sheet is open or cart is completely empty
  if (isCartOpen || totalItems === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ y: 80, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed bottom-5 right-4 left-4 sm:left-auto sm:right-6 z-30"
        aria-label="Floating Cart Summary"
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-between sm:justify-start gap-4 transition-transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/40"
          aria-label={`Open Cart with ${totalItems} items, total ${siteConfig.currencySymbol} ${cartTotal.toFixed(2)}`}
        >
          {/* Left: Bag & Count Badge */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-white/90" />
              <span className="absolute -top-1.5 -right-2 bg-white text-primary text-[11px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            </div>
            <span className="text-xs font-semibold text-white/90 tracking-wide">
              {totalItems === 1 ? "1 item added" : `${totalItems} items added`}
            </span>
          </div>

          {/* Right: Total and Proceed */}
          <div className="flex items-center gap-2 pl-3 sm:border-l sm:border-white/20">
            <span className="text-sm font-extrabold text-white">
              {siteConfig.currencySymbol} {cartTotal.toFixed(2)}
            </span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </button>
      </motion.aside>
    </AnimatePresence>
  );
};

export default FloatingCartButton;
