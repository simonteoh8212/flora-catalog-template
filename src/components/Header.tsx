"use client";

import React from "react";
import siteConfig from "@/config/site";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Sparkles, MessageCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header: React.FC = () => {
  const totalItems = useCartStore((state) => state.totalItems);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const updateHeight = () => {
      const height = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--header-height", `${height}px`);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const cleanWhatsapp = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-primary-muted dark:border-zinc-800 shadow-xs transition-colors"
    >
      {/* Top micro announcement bar */}
      <div className="bg-primary-light dark:bg-primary-light/40 px-3 sm:px-4 py-1.5 text-center text-[11px] sm:text-xs font-medium text-primary flex items-center justify-center gap-1.5 border-b border-primary-muted dark:border-zinc-800">
        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
        <span className="truncate">Same-day flower delivery available for orders before 2 PM</span>
      </div>

      {/* Main navigation header */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {/* Logo Badge - strictly circular and aspect-square */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 aspect-square rounded-full bg-gradient-to-br from-primary-light to-primary-subtle/50 dark:from-primary-light/30 dark:to-zinc-800 flex items-center justify-center border border-primary-subtle dark:border-zinc-700/80 shadow-2xs">
            <span className="text-lg sm:text-xl select-none leading-none" role="img" aria-label="floral">
              🌸
            </span>
          </div>

          {/* Title & Operating Hours */}
          <div className="min-w-0 flex-1">
            <h1 className="text-sm xs:text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-zinc-100 leading-snug truncate">
              {siteConfig.shopName}
            </h1>
            {siteConfig.openingHours && (
              <div className="text-[10px] sm:text-[11px] text-gray-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5 whitespace-nowrap overflow-hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <span className="font-medium text-emerald-700 dark:text-emerald-400 shrink-0">Open</span>
                <span className="text-gray-300 dark:text-zinc-600 shrink-0">·</span>
                <span className="truncate">{siteConfig.openingHours}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Dark / Light Mode Toggle */}
          <ThemeToggle />

          {/* Quick WhatsApp Inquiry */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
              `Hi ${siteConfig.shopName}, I have an inquiry regarding your floral catalog!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors"
            aria-label="Direct WhatsApp Contact"
            title="Chat with florist on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-emerald-600/10 dark:fill-emerald-400/20 text-emerald-600 dark:text-emerald-400" />
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-primary bg-primary-light dark:bg-primary-light/50 hover:bg-primary-muted dark:hover:bg-primary-muted/60 border border-primary-subtle dark:border-primary-subtle/50 transition-colors"
            aria-label="View shopping basket"
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
