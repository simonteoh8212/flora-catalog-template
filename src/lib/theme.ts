/**
 * Theme & Color helper
 * Computes palette variants (primary, hover, light background tint, subtle border, contrast text)
 * from any arbitrary HEX code provided in config/site.ts, supporting 3, 6, and 8-digit hex codes.
 */

export function normalizeHex(input?: string): string {
  if (!input) return "e11d48";
  let hex = input.replace("#", "").trim();

  // If 8-character hex (e.g. #1de1baff with alpha), take first 6 chars
  if (hex.length === 8) {
    hex = hex.substring(0, 6);
  }
  // If 4-character hex (e.g. #1def with alpha), expand RGB
  else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  // If 3-character hex (e.g. #f06), expand to 6 chars
  else if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Validate that it consists only of valid hex digits
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return "e11d48";
  }

  return hex.toLowerCase();
}

export function getBrandCssVariables(rawHex?: string): Record<string, string> {
  const validHex = normalizeHex(rawHex);

  const r = parseInt(validHex.substring(0, 2), 16);
  const g = parseInt(validHex.substring(2, 4), 16);
  const b = parseInt(validHex.substring(4, 6), 16);

  // Darker shade for active & hover states (15% darker)
  const hoverR = Math.max(0, Math.floor(r * 0.85));
  const hoverG = Math.max(0, Math.floor(g * 0.85));
  const hoverB = Math.max(0, Math.floor(b * 0.85));
  const primaryHover = `rgb(${hoverR}, ${hoverG}, ${hoverB})`;

  // Even deeper shade for strong accents
  const darkR = Math.max(0, Math.floor(r * 0.7));
  const darkG = Math.max(0, Math.floor(g * 0.7));
  const darkB = Math.max(0, Math.floor(b * 0.7));
  const primaryDark = `rgb(${darkR}, ${darkG}, ${darkB})`;

  // Soft tints for backgrounds and badges
  const primaryLight = `rgba(${r}, ${g}, ${b}, 0.08)`;
  const primaryMuted = `rgba(${r}, ${g}, ${b}, 0.16)`;
  const primarySubtle = `rgba(${r}, ${g}, ${b}, 0.28)`;

  // High-contrast foreground text calculation (WCAG standard luminance)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const primaryForeground = luminance > 0.6 ? "#18181b" : "#ffffff";

  return {
    "--primary": `#${validHex}`,
    "--primary-hover": primaryHover,
    "--primary-dark": primaryDark,
    "--primary-light": primaryLight,
    "--primary-muted": primaryMuted,
    "--primary-subtle": primarySubtle,
    "--primary-foreground": primaryForeground,
    "--primary-rgb": `${r}, ${g}, ${b}`,
  };
}

export function generateRootStyle(rawHex?: string): string {
  const validHex = normalizeHex(rawHex);
  const r = parseInt(validHex.substring(0, 2), 16);
  const g = parseInt(validHex.substring(2, 4), 16);
  const b = parseInt(validHex.substring(4, 6), 16);

  const vars = getBrandCssVariables(validHex);
  const lightStyles = Object.entries(vars)
    .map(([key, value]) => `${key}: ${value} !important;`)
    .join(" ");

  const darkStyles = `
    --primary-light: rgba(${r}, ${g}, ${b}, 0.18) !important;
    --primary-muted: rgba(${r}, ${g}, ${b}, 0.28) !important;
    --primary-subtle: rgba(${r}, ${g}, ${b}, 0.42) !important;
  `;

  return `
    :root, :root:root, html, body { 
      ${lightStyles} 
    }
    .dark, html.dark, html.dark body { 
      ${darkStyles} 
    }
  `;
}
