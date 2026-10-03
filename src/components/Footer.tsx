"use client";

import React from "react";
import siteConfig from "@/config/site";
import { Mail, MapPin, Clock, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-900 border-t border-primary-muted dark:border-zinc-800 pt-8 pb-24 sm:pb-12 px-4 mt-12 text-center text-xs text-gray-500 dark:text-zinc-400 transition-colors">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl">🌸</span>
          <span className="font-bold text-gray-800 dark:text-zinc-200 text-sm">{siteConfig.shopName}</span>
        </div>

        <p className="max-w-md mx-auto text-gray-600 dark:text-zinc-400 leading-relaxed">
          {siteConfig.shopDescription}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-500 dark:text-zinc-400 pt-2">
          {siteConfig.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{siteConfig.address}</span>
            </div>
          )}
          {siteConfig.openingHours && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{siteConfig.openingHours}</span>
            </div>
          )}
          {siteConfig.contactEmail && (
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>{siteConfig.contactEmail}</span>
            </a>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200/60 dark:border-zinc-800 flex items-center justify-center gap-1 text-[11px] text-gray-400 dark:text-zinc-500">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-primary fill-primary" />
          <span>for {siteConfig.shopName}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
