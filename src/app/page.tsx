"use client";

import React, { useState, useMemo } from "react";
import products, { CATEGORIES } from "@/data/products";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductGrid } from "@/components/ProductGrid";
import { FloatingCartButton } from "@/components/FloatingCartButton";
import { CheckoutBottomSheet } from "@/components/CheckoutBottomSheet";
import { PaymentModal } from "@/components/PaymentModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Compute product counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: products.length,
    };

    CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = products.filter((p) => p.category === cat).length;
      }
    });

    return counts;
  }, []);

  // Filter products by active category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-zinc-950 flex flex-col text-gray-900 dark:text-zinc-100 selection:bg-primary-light selection:text-primary transition-colors duration-200">
      {/* Top Shop Bar */}
      <Header />

      {/* Main Catalog View */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Category Filter Row */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        {/* Responsive Product Grid */}
        <ProductGrid
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onResetCategory={() => setSelectedCategory("All")}
        />
      </main>

      {/* Floating Cart Button */}
      <FloatingCartButton />

      {/* Slide-Up Bottom Sheet (Framer Motion) */}
      <CheckoutBottomSheet />

      {/* Payment Modal with QR & WhatsApp bridge */}
      <PaymentModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}
