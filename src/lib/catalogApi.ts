import { Product } from "@/types";
import { products as fallbackProducts, CATEGORIES as DEFAULT_CATEGORIES } from "@/data/products";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

/**
 * Fetches active products from flora-cms.
 * Falls back to local sample products if CMS is offline or unreachable.
 */
export async function getCatalogProducts(): Promise<{
  products: Product[];
  categories: string[];
  isFromCms: boolean;
}> {
  try {
    const res = await fetch(`${CMS_URL}/api/catalog/products`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data: Product[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const uniqueCategories = [
          "All",
          ...Array.from(new Set(data.map((p) => p.category).filter(Boolean))),
        ];

        return {
          products: data,
          categories: uniqueCategories,
          isFromCms: true,
        };
      }
    }
  } catch {
    // CMS is offline or not configured yet; continue to fallback
  }

  return {
    products: fallbackProducts,
    categories: Array.from(DEFAULT_CATEGORIES),
    isFromCms: false,
  };
}

export interface SubmitOrderPayload {
  customerName: string;
  customerPhone: string;
  items: string;
  totalAmount: number;
  deliveryFee?: number;
  paymentMethod?: string;
  deliverySlot?: string;
  deliveryAddress?: string;
  cardMessage?: string;
}

/**
 * Submits an order to flora-cms to record it in Prisma & Google Sheets
 * and generates an official Order Number (#FL-1001).
 */
export async function submitCatalogOrder(
  payload: SubmitOrderPayload
): Promise<{ success: boolean; orderNumber?: string; error?: string }> {
  try {
    const res = await fetch(`${CMS_URL}/api/catalog/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.orderNumber) {
        return { success: true, orderNumber: data.orderNumber };
      }
    }
  } catch (err) {
    console.warn("Could not reach flora-cms order API, continuing with local order ID:", err);
  }

  // Fallback: generate local order number so customer checkout is never blocked
  const fallbackNumber = `FL-${Math.floor(1000 + Math.random() * 9000)}`;
  return { success: false, orderNumber: fallbackNumber };
}
