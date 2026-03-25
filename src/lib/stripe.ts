import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "./supabase";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
export const stripePromise = stripeKey ? loadStripe(stripeKey) : null;
export const isStripeConfigured = !!stripeKey;

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
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add auth token if available
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }
    }

    const res = await fetch(`${apiUrl}/create-payment-intent`, {
      method: "POST",
      headers,
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
  await new Promise((r) => setTimeout(r, 1500));
  return {
    clientSecret:
      "pi_mock_" +
      Date.now() +
      "_secret_" +
      Math.random().toString(36).slice(2),
    paymentIntentId: "pi_mock_" + Date.now(),
  };
}
