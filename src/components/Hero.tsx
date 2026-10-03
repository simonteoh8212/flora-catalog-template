"use client";

import React from "react";
import siteConfig from "@/config/site";
import { Flower2, HeartHandshake, Truck, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-light via-primary-light/40 to-white dark:from-zinc-900/60 dark:via-zinc-950 dark:to-zinc-950 pt-6 pb-6 px-4 transition-colors">
      {/* Decorative floral background blurs */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 bg-primary-subtle/50 dark:bg-primary-subtle/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 w-44 h-44 bg-primary-light dark:bg-primary-light/20 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-4">
        {/* Pill Tagline */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-primary-subtle shadow-xs text-xs font-semibold text-primary tracking-wide">
          <Flower2 className="w-3.5 h-3.5 text-primary" />
          <span>{siteConfig.tagline || "Artisan Floral Catalog"}</span>
        </div>

        {/* Shop Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-100 leading-tight">
          {siteConfig.shopName}
        </h1>

        {/* Shop Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-zinc-400 leading-relaxed font-normal">
          {siteConfig.shopDescription}
        </p>

        {/* Mobile-Friendly Value Badges */}
        <div className="grid grid-cols-3 gap-2 pt-2 max-w-md mx-auto">
          <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-primary-muted dark:border-zinc-800 shadow-2xs text-center">
            <Truck className="w-4 h-4 text-primary mb-1" />
            <span className="text-[11px] font-semibold text-gray-800 dark:text-zinc-200">Fresh Delivery</span>
            <span className="text-[10px] text-gray-500 dark:text-zinc-400">Carefully Handled</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-primary-muted dark:border-zinc-800 shadow-2xs text-center">
            <HeartHandshake className="w-4 h-4 text-primary mb-1" />
            <span className="text-[11px] font-semibold text-gray-800 dark:text-zinc-200">Free Card</span>
            <span className="text-[10px] text-gray-500 dark:text-zinc-400">Custom Greeting</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-primary-muted dark:border-zinc-800 shadow-2xs text-center">
            <ShieldCheck className="w-4 h-4 text-primary mb-1" />
            <span className="text-[11px] font-semibold text-gray-800 dark:text-zinc-200">Direct Pay</span>
            <span className="text-[10px] text-gray-500 dark:text-zinc-400">Fast WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
