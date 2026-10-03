import { create } from "zustand";
import { Product, CartItem, OrderFormData } from "@/types";

interface CartState {
  cartItems: CartItem[];
  cartTotal: number;
  totalItems: number;
  isCartOpen: boolean;
  isPaymentModalOpen: boolean;
  orderForm: OrderFormData;

  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsPaymentModalOpen: (open: boolean) => void;
  updateOrderForm: (fields: Partial<OrderFormData>) => void;
  resetOrderForm: () => void;

  // Helpers
  getCartTotal: () => number;
  getTotalItems: () => number;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

const calculateTotalCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

const initialOrderForm: OrderFormData = {
  fulfillmentType: "Delivery",
  deliveryDate: "",
  timeSlot: "Morning 10AM-1PM",
  recipientName: "",
  recipientPhone: "",
  deliveryAddress: "",
  cardMessage: "",
  senderName: "",
  senderPhone: "",
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  cartTotal: 0,
  totalItems: 0,
  isCartOpen: false,
  isPaymentModalOpen: false,
  orderForm: initialOrderForm,

  addToCart: (product: Product) => {
    set((state) => {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      if (existingIndex > -1) {
        newItems = state.cartItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.cartItems, { product, quantity: 1 }];
      }

      return {
        cartItems: newItems,
        cartTotal: calculateTotal(newItems),
        totalItems: calculateTotalCount(newItems),
      };
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => {
      const newItems = state.cartItems.filter(
        (item) => item.product.id !== productId
      );
      return {
        cartItems: newItems,
        cartTotal: calculateTotal(newItems),
        totalItems: calculateTotalCount(newItems),
      };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      let newItems: CartItem[];
      if (quantity <= 0) {
        newItems = state.cartItems.filter(
          (item) => item.product.id !== productId
        );
      } else {
        newItems = state.cartItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
      }

      return {
        cartItems: newItems,
        cartTotal: calculateTotal(newItems),
        totalItems: calculateTotalCount(newItems),
      };
    });
  },

  clearCart: () => {
    set({
      cartItems: [],
      cartTotal: 0,
      totalItems: 0,
    });
  },

  setIsCartOpen: (open: boolean) => set({ isCartOpen: open }),

  setIsPaymentModalOpen: (open: boolean) => set({ isPaymentModalOpen: open }),

  updateOrderForm: (fields: Partial<OrderFormData>) => {
    set((state) => ({
      orderForm: { ...state.orderForm, ...fields },
    }));
  },

  resetOrderForm: () => set({ orderForm: initialOrderForm }),

  getCartTotal: () => {
    return calculateTotal(get().cartItems);
  },

  getTotalItems: () => {
    return calculateTotalCount(get().cartItems);
  },
}));

export default useCartStore;
