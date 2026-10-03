"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Product } from "@/types";
import { products as fallbackProducts, CATEGORIES as DEFAULT_CATEGORIES } from "@/data/products";
import { getCatalogProducts } from "@/lib/catalogApi";
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
  const [catalogItems, setCatalogItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(Array.from(DEFAULT_CATEGORIES));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Dynamically load active flowers from flora-cms
  useEffect(() => {
    let isMounted = true;
    getCatalogProducts()
      .then((res) => {
        if (isMounted) {
          setCatalogItems(res.products.length > 0 ? res.products : fallbackProducts);
          if (res.categories && res.categories.length > 0) {
            setCategories(res.categories);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Using local flower catalog fallback:", err);
        if (isMounted) {
          setCatalogItems(fallbackProducts);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute product counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: catalogItems.length,
    };

    categories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = catalogItems.filter((p) => p.category === cat).length;
      }
    });

    return counts;
  }, [catalogItems, categories]);

  // Filter products by active category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return catalogItems;
    }
    return catalogItems.filter((product) => product.category === selectedCategory);
  }, [selectedCategory, catalogItems]);

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
          categories={categories}
          isLoading={isLoading}
        />

        {/* Responsive Product Grid */}
        <ProductGrid
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onResetCategory={() => setSelectedCategory("All")}
          isLoading={isLoading}
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
