export interface SiteConfig {
  shopName: string;
  shopDescription: string;
  whatsappNumber: string;
  currencySymbol: string;
  contactEmail: string;
  primaryColor?: string; // Brand HEX color (e.g. "#e11d48" for Rose, "#059669" for Emerald, "#7c3aed" for Purple)
  defaultTheme?: "light" | "dark" | "system"; // Preset default theme ("light" | "dark" | "system")
  enableThemeToggle?: boolean; // Set to true to show a dark/light toggle button in the header
  tagline?: string;
  address?: string;
  openingHours?: string;
  instagramHandle?: string;
}

export const siteConfig: SiteConfig = {
  shopName: "Flora & Bloom Atelier",
  shopDescription: "Artisanal handcrafted bouquets, bespoke floral arrangements, and curated luxury gift hampers for every cherished celebration.",
  whatsappNumber: "60164738833", // WhatsApp country code + number without symbols
  currencySymbol: "RM",
  contactEmail: "hello@florabloom.com",
  primaryColor: "#de4141ff", // Custom brand color hex - changes whole app theme!
  defaultTheme: "light", // Change to "dark" for a luxury dark catalog by default!
  enableThemeToggle: true, // Set to true for customer-facing light/dark toggle button
  tagline: "Handcrafted with love, delivered with care 🌸",
  address: "18 Blossom Lane, Bayan Lepas, 11900 Pulau Pinang",
  openingHours: "Mon - Sun: 9:00 AM - 7:00 PM",
  instagramHandle: "@florabloomatelier",
};

export default siteConfig;
