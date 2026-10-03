"use client";

import React, { useState } from "react";
import siteConfig from "@/config/site";
import { useCartStore } from "@/store/cartStore";
import { TimeSlot } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Plus,
  Minus,
  Truck,
  Store,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  MessageSquareHeart,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

export const CheckoutBottomSheet: React.FC = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const orderForm = useCartStore((state) => state.orderForm);
  const updateOrderForm = useCartStore((state) => state.updateOrderForm);
  const setIsPaymentModalOpen = useCartStore((state) => state.setIsPaymentModalOpen);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Minimum date is today's date formatted as YYYY-MM-DD
  const todayDate = new Date().toISOString().split("T")[0];

  const handleFieldChange = (field: string, value: any) => {
    updateOrderForm({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (cartItems.length === 0) {
      newErrors.cart = "Your cart is empty. Please add items before proceeding.";
    }

    if (!orderForm.deliveryDate) {
      newErrors.deliveryDate = "Please choose a fulfillment date.";
    }

    if (!orderForm.recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required.";
    }

    if (!orderForm.recipientPhone.trim()) {
      newErrors.recipientPhone = "Recipient contact number is required.";
    }

    if (orderForm.fulfillmentType === "Delivery" && !orderForm.deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Delivery address is required for door-to-door delivery.";
    }

    if (!orderForm.senderName.trim()) {
      newErrors.senderName = "Sender name is required.";
    }

    if (!orderForm.senderPhone.trim()) {
      newErrors.senderPhone = "Sender contact number is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setIsPaymentModalOpen(true);
    } else {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const errorElement = document.getElementById(`field-${firstErrorKey}`);
        errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Slide-up bottom sheet covering 85% of screen */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-lg h-[85vh] max-h-[85vh] bg-white dark:bg-zinc-900 rounded-t-3xl shadow-2xl flex flex-col z-10 overflow-hidden border-t dark:border-zinc-800"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-sheet-title"
          >
            {/* Sheet Handle & Header */}
            <div className="pt-3 pb-2 px-5 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-20">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <div>
                  <h2 id="cart-sheet-title" className="text-lg font-bold text-gray-900 dark:text-zinc-100 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    <span>Your Floral Basket</span>
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    Review items and specify your delivery details
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Close cart sheet"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Section 1: Cart Review */}
              <section aria-labelledby="section-cart-items">
                <div className="flex items-center justify-between mb-3">
                  <h3 id="section-cart-items" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                    Selected Items ({cartItems.length})
                  </h3>
                  {cartItems.length > 0 && (
                    <span className="text-xs font-semibold text-primary">
                      Subtotal: {siteConfig.currencySymbol} {cartTotal.toFixed(2)}
                    </span>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8 px-4 bg-primary-light dark:bg-zinc-800/60 rounded-2xl border border-dashed border-primary-subtle dark:border-zinc-700">
                    <ShoppingBag className="w-10 h-10 text-primary/60 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200">Your basket is currently empty</p>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Explore our catalog and choose fresh blooms!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-zinc-800/80 rounded-2xl border border-gray-100 dark:border-zinc-700/60"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover bg-primary-light dark:bg-zinc-700 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' font-size='20' text-anchor='middle' dominant-baseline='middle'>🌸</text></svg>";
                          }}
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-zinc-100 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-primary font-semibold mt-0.5">
                            {siteConfig.currencySymbol} {item.product.price.toFixed(2)} each
                          </p>
                          <p className="text-[11px] text-gray-400 dark:text-zinc-400 font-medium">
                            Line Total: {siteConfig.currencySymbol} {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-700 p-1 rounded-xl border border-gray-200 dark:border-zinc-600 shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-primary-light hover:text-primary transition-colors"
                            aria-label={`Decrease quantity of ${item.product.name}`}
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-gray-900 dark:text-zinc-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 dark:text-zinc-300 hover:bg-primary-light hover:text-primary transition-colors"
                            aria-label={`Increase quantity of ${item.product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {errors.cart && (
                  <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.cart}</span>
                  </p>
                )}
              </section>

              {/* Section 2: Fulfillment Form */}
              <section className="space-y-4 pt-2 border-t border-gray-100 dark:border-zinc-800" aria-labelledby="section-fulfillment">
                <h3 id="section-fulfillment" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                  Fulfillment & Delivery Details
                </h3>

                {/* Fulfillment Type: Radio toggle (Delivery or Self-Pickup) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                    Fulfillment Method <span className="text-primary">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`relative flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        orderForm.fulfillmentType === "Delivery"
                          ? "bg-primary-light dark:bg-primary-light/40 border-primary text-gray-900 dark:text-zinc-100 ring-2 ring-primary/40 ring-offset-1 font-semibold"
                          : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="fulfillmentType"
                        value="Delivery"
                        checked={orderForm.fulfillmentType === "Delivery"}
                        onChange={() => handleFieldChange("fulfillmentType", "Delivery")}
                        className="sr-only"
                      />
                      <div className={`p-2 rounded-xl ${orderForm.fulfillmentType === "Delivery" ? "bg-primary text-primary-foreground" : "bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300"}`}>
                        <Truck className="w-4 h-4" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs block font-bold">Door Delivery</span>
                        <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-normal">To recipient address</span>
                      </div>
                    </label>

                    <label
                      className={`relative flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        orderForm.fulfillmentType === "Self-Pickup"
                          ? "bg-primary-light dark:bg-primary-light/40 border-primary text-gray-900 dark:text-zinc-100 ring-2 ring-primary/40 ring-offset-1 font-semibold"
                          : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="fulfillmentType"
                        value="Self-Pickup"
                        checked={orderForm.fulfillmentType === "Self-Pickup"}
                        onChange={() => handleFieldChange("fulfillmentType", "Self-Pickup")}
                        className="sr-only"
                      />
                      <div className={`p-2 rounded-xl ${orderForm.fulfillmentType === "Self-Pickup" ? "bg-primary text-primary-foreground" : "bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-zinc-300"}`}>
                        <Store className="w-4 h-4" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs block font-bold">Self-Pickup</span>
                        <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-normal">Pick up at florist</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Delivery Date & Time Slot Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Delivery Date */}
                  <div id="field-deliveryDate">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{orderForm.fulfillmentType === "Delivery" ? "Delivery Date" : "Pickup Date"}</span>
                      <span className="text-primary">*</span>
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      value={orderForm.deliveryDate}
                      onChange={(e) => handleFieldChange("deliveryDate", e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.deliveryDate ? "border-rose-500 bg-rose-50/30 dark:bg-rose-950/20" : "border-gray-200 dark:border-zinc-700"
                      }`}
                      required
                    />
                    {errors.deliveryDate && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1">{errors.deliveryDate}</p>
                    )}
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>Time Slot</span>
                      <span className="text-primary">*</span>
                    </label>
                    <select
                      value={orderForm.timeSlot}
                      onChange={(e) => handleFieldChange("timeSlot", e.target.value as TimeSlot)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs sm:text-sm bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Morning 10AM-1PM">Morning 10AM-1PM</option>
                      <option value="Afternoon 2PM-6PM">Afternoon 2PM-6PM</option>
                    </select>
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="bg-primary-light/40 dark:bg-zinc-800/60 p-3.5 rounded-2xl border border-primary-muted dark:border-zinc-700 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-zinc-200">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>Recipient Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div id="field-recipientName">
                      <label className="block text-[11px] font-semibold text-gray-600 dark:text-zinc-400 mb-1">
                        Recipient Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jane Doe"
                        value={orderForm.recipientName}
                        onChange={(e) => handleFieldChange("recipientName", e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.recipientName ? "border-rose-500" : "border-gray-200 dark:border-zinc-700"
                        }`}
                        required
                      />
                      {errors.recipientName && (
                        <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5">{errors.recipientName}</p>
                      )}
                    </div>

                    <div id="field-recipientPhone">
                      <label className="block text-[11px] font-semibold text-gray-600 dark:text-zinc-400 mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>Recipient Phone</span>
                        <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +60 12-345 6789"
                        value={orderForm.recipientPhone}
                        onChange={(e) => handleFieldChange("recipientPhone", e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.recipientPhone ? "border-rose-500" : "border-gray-200 dark:border-zinc-700"
                        }`}
                        required
                      />
                      {errors.recipientPhone && (
                        <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5">{errors.recipientPhone}</p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Address (Textarea) */}
                  <div id="field-deliveryAddress">
                    <label className="block text-[11px] font-semibold text-gray-600 dark:text-zinc-400 mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>
                        {orderForm.fulfillmentType === "Delivery"
                          ? "Delivery Address"
                          : "Self-Pickup Location Notes"}
                      </span>
                      {orderForm.fulfillmentType === "Delivery" && <span className="text-primary">*</span>}
                    </label>

                    {orderForm.fulfillmentType === "Self-Pickup" ? (
                      <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs text-gray-600 dark:text-zinc-300">
                        <p className="font-semibold text-gray-800 dark:text-zinc-200">Florist Pickup Location:</p>
                        <p className="mt-0.5">{siteConfig.address || "At our studio address"}</p>
                        {siteConfig.openingHours && (
                          <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-1">Operating Hours: {siteConfig.openingHours}</p>
                        )}
                      </div>
                    ) : (
                      <>
                        <textarea
                          rows={2}
                          placeholder="Unit, building name, street address, postal code and city..."
                          value={orderForm.deliveryAddress}
                          onChange={(e) => handleFieldChange("deliveryAddress", e.target.value)}
                          className={`w-full px-3 py-2 rounded-xl border text-xs bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.deliveryAddress ? "border-rose-500" : "border-gray-200 dark:border-zinc-700"
                          }`}
                          required
                        />
                        {errors.deliveryAddress && (
                          <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5">{errors.deliveryAddress}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Greeting Card Message (Textarea) */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MessageSquareHeart className="w-3.5 h-3.5 text-primary" />
                      <span>Complimentary Greeting Card Message</span>
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-zinc-500 font-normal">Handwritten</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder='e.g. "Happy Birthday Sarah! Wishing you happiness, beauty, and bright blooms all year long. Love, Alex"'
                    value={orderForm.cardMessage}
                    onChange={(e) => handleFieldChange("cardMessage", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs sm:text-sm bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">
                    Leave blank if you prefer a blank card to write yourself.
                  </p>
                </div>

                {/* Sender Details */}
                <div className="bg-gray-50 dark:bg-zinc-800/50 p-3.5 rounded-2xl border border-gray-200/80 dark:border-zinc-700 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-zinc-200">
                    <User className="w-3.5 h-3.5 text-gray-600 dark:text-zinc-400" />
                    <span>Sender (Your) Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div id="field-senderName">
                      <label className="block text-[11px] font-semibold text-gray-600 dark:text-zinc-400 mb-1">
                        Your Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. John Smith"
                        value={orderForm.senderName}
                        onChange={(e) => handleFieldChange("senderName", e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.senderName ? "border-rose-500" : "border-gray-200 dark:border-zinc-700"
                        }`}
                        required
                      />
                      {errors.senderName && (
                        <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5">{errors.senderName}</p>
                      )}
                    </div>

                    <div id="field-senderPhone">
                      <label className="block text-[11px] font-semibold text-gray-600 dark:text-zinc-400 mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>Your Contact Phone</span>
                        <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +60 11-2233 4455"
                        value={orderForm.senderPhone}
                        onChange={(e) => handleFieldChange("senderPhone", e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.senderPhone ? "border-rose-500" : "border-gray-200 dark:border-zinc-700"
                        }`}
                        required
                      />
                      {errors.senderPhone && (
                        <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5">{errors.senderPhone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sticky Bottom Checkout Action */}
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 dark:text-zinc-400">Order Final Total</span>
                <span className="text-lg font-black text-primary">
                  {siteConfig.currencySymbol} {cartTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={cartItems.length === 0}
                className={`w-full py-3.5 px-5 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all duration-200 ${
                  cartItems.length === 0
                    ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-hover text-primary-foreground shadow-primary/25 active:scale-98"
                }`}
              >
                <span>Proceed to Payment</span>
                <span className="text-xs opacity-90">({siteConfig.currencySymbol} {cartTotal.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutBottomSheet;
