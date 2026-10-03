"use client";

import React from "react";
import siteConfig from "@/config/site";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Sparkles, MessageCircle, Clock } from "lucide-react";
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
      <div className="bg-primary-light dark:bg-primary-light/40 px-4 py-1.5 text-center text-xs font-medium text-primary flex items-center justify-center gap-1.5 border-b border-primary-muted dark:border-zinc-800">
        <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
        <span>Same-day flower delivery available for orders before 2 PM</span>
      </div>

      {/* Main navigation header */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light dark:bg-primary-light/50 flex items-center justify-center border border-primary-subtle dark:border-primary-subtle/50 shadow-inner">
            <span className="text-xl select-none" role="img" aria-label="floral">
              🌸
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-zinc-100 leading-tight">
              {siteConfig.shopName}
            </h1>
            {siteConfig.openingHours && (
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>{siteConfig.openingHours}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Dark / Light Mode Toggle */}
          <ThemeToggle />

          {/* Quick WhatsApp Inquiry */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
              `Hi ${siteConfig.shopName}, I have an inquiry regarding your floral catalog!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors"
            aria-label="Direct WhatsApp Contact"
            title="Chat with florist on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-emerald-600/10 dark:fill-emerald-400/20 text-emerald-600 dark:text-emerald-400" />
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full text-primary bg-primary-light dark:bg-primary-light/50 hover:bg-primary-muted dark:hover:bg-primary-muted/60 border border-primary-subtle dark:border-primary-subtle/50 transition-colors"
            aria-label="View shopping basket"
          >
            <ShoppingBag className="w-5 h-5 text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
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
