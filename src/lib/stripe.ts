import { loadStripe } from "@stripe/stripe-js";
import type { Stripe } from "@stripe/stripe-js";

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe() {
  if (!stripePromise && STRIPE_KEY) {
    stripePromise = loadStripe(STRIPE_KEY);
  }
  return stripePromise;
}

/**
 * Create a PaymentIntent via backend.
 * In production, this calls a Supabase Edge Function.
 * For local testing without backend, returns a mock client secret.
 */
export async function createPaymentIntent(params: {
  formId: string;
  formName: string;
  packageType: string | null;
  amount: number;
  promoCode?: string;
}): Promise<{ clientSecret: string; paymentIntentId: string }> {
  const apiUrl = import.meta.env.VITE_PAYMENT_API_URL;

  if (apiUrl) {
    // Production: call real backend
    const res = await fetch(`${apiUrl}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form_id: params.formId,
        package_type: params.packageType,
        amount_cents: Math.round(params.amount * 100),
        promo_code: params.promoCode,
      }),
    });
    if (!res.ok) throw new Error("Payment API error: " + res.status);
    return res.json();
  }

  // Local dev mock — simulate 1.5s delay
  await new Promise(r => setTimeout(r, 1500));
  return {
    clientSecret: "pi_mock_" + Date.now() + "_secret_" + Math.random().toString(36).slice(2),
    paymentIntentId: "pi_mock_" + Date.now(),
  };
}

/**
 * Validate a promo code via backend.
 * Returns discount percentage or null if invalid.
 */
export async function validatePromoCode(code: string): Promise<{ valid: boolean; discountPercent: number } | null> {
  const apiUrl = import.meta.env.VITE_PAYMENT_API_URL;

  if (apiUrl) {
    const res = await fetch(`${apiUrl}/validate-promo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (!res.ok) return null;
    return res.json();
  }

  // Local dev mock — only WELCOME10 works
  if (code.toUpperCase() === "WELCOME10") {
    return { valid: true, discountPercent: 10 };
  }
  return null;
}

export const isStripeConfigured = !!STRIPE_KEY;
