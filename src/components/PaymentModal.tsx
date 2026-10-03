"use client";

import React, { useState } from "react";
import siteConfig from "@/config/site";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  QrCode,
  Send,
  Copy,
  Check,
  ShieldCheck,
  Smartphone,
  ExternalLink,
} from "lucide-react";

export const PaymentModal: React.FC = () => {
  const isPaymentModalOpen = useCartStore((state) => state.isPaymentModalOpen);
  const setIsPaymentModalOpen = useCartStore((state) => state.setIsPaymentModalOpen);
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const orderForm = useCartStore((state) => state.orderForm);

  const [copied, setCopied] = useState(false);

  if (!isPaymentModalOpen) return null;

  // Format list of items
  const itemsText = cartItems
    .map(
      (item) =>
        `- ${item.quantity}x ${item.product.name} (${siteConfig.currencySymbol} ${(
          item.product.price * item.quantity
        ).toFixed(2)})`
    )
    .join("\n");

  const fulfillmentValue = orderForm.fulfillmentType === "Delivery" ? "Delivery" : "Pickup";

  const recipientAddress =
    orderForm.fulfillmentType === "Delivery"
      ? orderForm.deliveryAddress
      : `Self-Pickup at ${siteConfig.shopName}${siteConfig.address ? ` (${siteConfig.address})` : ""}`;

  const cardMessageValue = orderForm.cardMessage.trim() || "No card message";

  const unencodedMessage = `🌸 NEW ORDER via Web Catalog 🌸\n\nItem(s):\n${itemsText}\nTotal: ${siteConfig.currencySymbol} ${cartTotal.toFixed(2)}\n\nFulfillment: ${fulfillmentValue}\nDate: ${orderForm.deliveryDate} (${orderForm.timeSlot})\n\nRecipient:\nName: ${orderForm.recipientName}\nPhone: ${orderForm.recipientPhone}\nAddress: ${recipientAddress}\n\nCard Message:\n"${cardMessageValue}"\n\nSender:\nName: ${orderForm.senderName} (${orderForm.senderPhone})\n`;

  const cleanWhatsapp = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(unencodedMessage)}`;

  const handleSendOrder = () => {
    // Fire celebratory confetti with brand colors
    try {
      const primaryHex = siteConfig.primaryColor || "#e11d48";
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: [primaryHex, "#10b981", "#3b82f6", "#f59e0b"],
      });
    } catch {
      // safe fallback
    }

    // Redirect to WhatsApp with prefilled message
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(unencodedMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsPaymentModalOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-3xl shadow-2xl p-5 z-10 max-h-[92vh] flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
        >
          {/* Close button */}
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close payment modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-4 pt-1">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto mb-2 text-emerald-600 dark:text-emerald-400">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 id="payment-modal-title" className="text-lg font-extrabold text-gray-900 dark:text-zinc-100 leading-tight">
              Scan QR to Pay
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
              Instant transfer via any Banking or e-Wallet app
            </p>
          </div>

          {/* Scrollable middle section */}
          <div className="overflow-y-auto flex-1 px-1 space-y-4">
            {/* QR Card Container */}
            <div className="bg-gradient-to-b from-primary-light via-primary-light/40 to-white dark:from-zinc-800/80 dark:via-zinc-900 dark:to-zinc-900 p-4 rounded-2xl border border-primary-subtle dark:border-zinc-700 text-center shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-zinc-800 text-[11px] font-semibold text-primary shadow-2xs border border-primary-muted dark:border-zinc-700 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Merchant: {siteConfig.shopName}</span>
              </div>

              {/* Stylized QR Code Graphic */}
              <div className="relative w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-inner border border-gray-200 dark:border-zinc-600 flex flex-col items-center justify-center">
                <svg
                  viewBox="0 0 160 160"
                  className="w-full h-full text-gray-900"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer corner finder patterns */}
                  <rect x="10" y="10" width="40" height="40" rx="6" fill="#111827" />
                  <rect x="18" y="18" width="24" height="24" rx="3" fill="#ffffff" />
                  <rect x="24" y="24" width="12" height="12" rx="2" fill="var(--primary, #e11d48)" />

                  <rect x="110" y="10" width="40" height="40" rx="6" fill="#111827" />
                  <rect x="118" y="18" width="24" height="24" rx="3" fill="#ffffff" />
                  <rect x="124" y="24" width="12" height="12" rx="2" fill="var(--primary, #e11d48)" />

                  <rect x="10" y="110" width="40" height="40" rx="6" fill="#111827" />
                  <rect x="18" y="118" width="24" height="24" rx="3" fill="#ffffff" />
                  <rect x="24" y="124" width="12" height="12" rx="2" fill="var(--primary, #e11d48)" />

                  {/* QR Data modules */}
                  <rect x="60" y="15" width="8" height="8" rx="1.5" />
                  <rect x="75" y="15" width="8" height="18" rx="1.5" />
                  <rect x="90" y="20" width="8" height="8" rx="1.5" />
                  <rect x="60" y="35" width="18" height="8" rx="1.5" />
                  <rect x="85" y="35" width="12" height="8" rx="1.5" />

                  <rect x="15" y="60" width="8" height="18" rx="1.5" />
                  <rect x="30" y="65" width="18" height="8" rx="1.5" />
                  <rect x="15" y="85" width="12" height="8" rx="1.5" />
                  <rect x="35" y="80" width="8" height="18" rx="1.5" />

                  <rect x="60" y="60" width="12" height="12" rx="2" fill="var(--primary, #e11d48)" />
                  <rect x="80" y="60" width="8" height="8" rx="1.5" />
                  <rect x="95" y="65" width="15" height="8" rx="1.5" />
                  <rect x="65" y="80" width="10" height="10" rx="2" />
                  <rect x="85" y="80" width="12" height="15" rx="2" />

                  <rect x="110" y="60" width="8" height="15" rx="1.5" />
                  <rect x="125" y="65" width="20" height="8" rx="1.5" />
                  <rect x="115" y="85" width="18" height="8" rx="1.5" />
                  <rect x="140" y="80" width="8" height="15" rx="1.5" />

                  <rect x="60" y="115" width="18" height="8" rx="1.5" />
                  <rect x="60" y="130" width="8" height="15" rx="1.5" />
                  <rect x="75" y="125" width="15" height="10" rx="1.5" />
                  <rect x="95" y="115" width="10" height="20" rx="1.5" />
                  <rect x="115" y="115" width="20" height="8" rx="1.5" />
                  <rect x="125" y="130" width="15" height="15" rx="2" fill="var(--primary, #e11d48)" />
                </svg>

                {/* Center floral badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-white border-2 border-primary shadow-md flex items-center justify-center">
                    <span className="text-sm select-none" role="img" aria-label="flower">
                      🌸
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount Display */}
              <div className="mt-3">
                <span className="text-[11px] text-gray-500 dark:text-zinc-400 block uppercase tracking-wider font-semibold">
                  Amount to Transfer
                </span>
                <span className="text-2xl font-black text-primary">
                  {siteConfig.currencySymbol} {cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Exact Required Instruction Text */}
            <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200/90 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Payment Instructions</span>
              </div>
              <p className="text-[12px] font-medium text-gray-800 dark:text-zinc-200">
                Please scan to pay {siteConfig.currencySymbol} {cartTotal.toFixed(2)}. After paying, click &apos;Send Order&apos; and attach your receipt in WhatsApp.
              </p>
            </div>

            {/* Optional copy summary fallback button */}
            <button
              onClick={handleCopySummary}
              className="w-full py-2 px-3 rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400">Order text copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500" />
                  <span>Copy order text summary</span>
                </>
              )}
            </button>
          </div>

          {/* Modal Footer / WhatsApp Redirection Button */}
          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-zinc-800">
            <button
              onClick={handleSendOrder}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Send Order to WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
            <p className="text-[10px] text-center text-gray-400 dark:text-zinc-500 mt-2">
              Opens WhatsApp with pre-filled order details
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
