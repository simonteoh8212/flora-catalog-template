import type { Metadata, Viewport } from "next";
import "./globals.css";
import siteConfig from "@/config/site";
import { generateRootStyle, getBrandCssVariables, normalizeHex } from "@/lib/theme";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flora-catalog-template.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.shopName} | Artisan WhatsApp Floral Catalog`,
    template: `%s | ${siteConfig.shopName}`,
  },
  description: siteConfig.shopDescription,
  applicationName: siteConfig.shopName,
  authors: [{ name: siteConfig.shopName }],
  keywords: [
    "flower delivery",
    "florist",
    "WhatsApp floral catalog",
    "fresh bouquets",
    "gift hampers",
    siteConfig.shopName,
  ],
  openGraph: {
    title: `${siteConfig.shopName} | WhatsApp Floral Catalog`,
    description: siteConfig.shopDescription,
    url: siteUrl,
    siteName: siteConfig.shopName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${siteConfig.shopName} | WhatsApp Floral Catalog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shopName} | WhatsApp Floral Catalog`,
    description: siteConfig.shopDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: `#${normalizeHex(siteConfig.primaryColor)}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootCss = generateRootStyle(siteConfig.primaryColor);
  const brandVars = getBrandCssVariables(siteConfig.primaryColor);

  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
      style={brandVars as React.CSSProperties}
    >
      <head>
        {/* Injects dynamic CSS variables with high specificity */}
        <style
          id="brand-primary-style"
          dangerouslySetInnerHTML={{
            __html: rootCss,
          }}
        />
        {/* Immediately set dark/light class based on siteConfig or user preference before first paint */}
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var configTheme = "${siteConfig.defaultTheme || 'light'}";
                  var stored = localStorage.getItem('theme');
                  var theme = stored || configTheme;
                  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-50/50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
