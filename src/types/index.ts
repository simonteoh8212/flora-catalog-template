export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type FulfillmentType = "Delivery" | "Self-Pickup";

export type TimeSlot = "Morning 10AM-1PM" | "Afternoon 2PM-6PM";

export interface OrderFormData {
  fulfillmentType: FulfillmentType;
  deliveryDate: string;
  timeSlot: TimeSlot;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  cardMessage: string;
  senderName: string;
  senderPhone: string;
}
