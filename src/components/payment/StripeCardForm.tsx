import { useState, useEffect } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise, isStripeConfigured, createPaymentIntent } from "../../lib/stripe";
import { S } from "../../data/styles";
import { t } from "../../data/translations";
import type { LangCode } from "../../types";

interface StripeCardFormProps {
  amount: number;
  onSuccess: (paymentIntentId?: string) => void;
  onError: (msg: string) => void;
  lang: string;
  formId?: string;
  formName?: string;
  packageType?: string | null;
}

/**
 * Inner form rendered inside <Elements>.
 * Uses CardElement for PCI-compliant card collection.
 */
function CardForm({
  amount,
  onSuccess,
  onError,
  lang,
  clientSecret,
}: {
  amount: number;
  onSuccess: (paymentIntentId?: string) => void;
  onError: (msg: string) => void;
  lang: string | LangCode;
  clientSecret: string | null;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (processing) return;
    setProcessing(true);
    setError(null);

    if (isStripeConfigured && stripe && elements && clientSecret) {
      // Real Stripe payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setProcessing(false);
        onError("Card element not found");
        return;
      }

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

      if (stripeError) {
        const msg = stripeError.message || "Payment failed";
        setError(msg);
        setProcessing(false);
        onError(msg);
      } else if (paymentIntent?.status === "succeeded") {
        setProcessing(false);
        onSuccess(paymentIntent.id);
      } else {
        setProcessing(false);
        onError("Payment was not completed. Please try again.");
      }
    } else {
      // Mock mode — simulate 2 second processing
      await new Promise((r) => setTimeout(r, 2000));
      setProcessing(false);
      onSuccess();
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        "::placeholder": {
          color: "rgba(255,255,255,.4)",
        },
        iconColor: "#6366f1",
      },
      invalid: {
        color: "#f87171",
        iconColor: "#f87171",
      },
    },
    hidePostalCode: false,
  };

  return (
    <>
      {/* Dev mode warning when Stripe is not configured */}
      {!isStripeConfigured && (
        <div
          style={{
            background: "rgba(251,191,36,.12)",
            border: "1px solid rgba(251,191,36,.4)",
            borderRadius: 10,
            padding: 10,
            marginTop: 8,
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 11, color: S.wrn, fontWeight: 700 }}>
            {t(lang as LangCode, "stripeDevMode")}
          </div>
        </div>
      )}

      <div
        style={{
          ...S.crd,
          padding: 20,
          marginTop: 4,
          cursor: "default",
          background: "rgba(99,102,241,.08)",
          border: "1px solid rgba(99,102,241,.3)",
        }}
      >
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            display: "block",
            marginBottom: 8,
          }}
        >
          {t(lang as LangCode, "stripeCardDetails")}
        </label>
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(147,197,253,.15)",
            background: "rgba(15,22,50,.6)",
          }}
        >
          <CardElement options={cardElementOptions} />
        </div>

        {error && (
          <div
            style={{
              color: S.err,
              fontSize: 13,
              marginTop: 8,
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}
      </div>

      <button
        disabled={processing || (isStripeConfigured && !stripe)}
        onClick={handleSubmit}
        style={{
          ...S.btn,
          opacity: processing || (isStripeConfigured && !stripe) ? 0.5 : 1,
          marginTop: 12,
        }}
      >
        {processing
          ? t(lang as LangCode, "stripeProcessing")
          : `Submit Payment — $${amount.toFixed(2)}`}
      </button>

      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          fontSize: 12,
          color: S.t2,
          fontWeight: 600,
        }}
      >
        {t(lang as LangCode, "stripeSecure")}
      </div>
    </>
  );
}

/**
 * StripeCardForm — wraps Stripe's CardElement for PCI-compliant card collection.
 *
 * When VITE_STRIPE_PUBLISHABLE_KEY is set:
 *   - Creates a PaymentIntent, wraps in <Elements>, uses real Stripe CardElement
 * When not set (demo mode):
 *   - Shows a mock card input with a 2-second simulated processing delay
 */
export default function StripeCardForm({
  amount,
  onSuccess,
  onError,
  lang,
  formId,
  formName,
  packageType,
}: StripeCardFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    if (isStripeConfigured && !clientSecret) {
      createPaymentIntent({
        formId: formId || "unknown",
        formName: formName || "unknown",
        packageType: packageType || null,
        amount,
      })
        .then((res) => setClientSecret(res.clientSecret))
        .catch(() => {
          setInitError("Failed to initialize payment. Please try again.");
          onError("Failed to initialize payment. Please try again.");
        });
    }
  }, [amount, formId, formName, packageType, clientSecret, onError]);

  // Show init error
  if (initError) {
    return (
      <div
        style={{
          ...S.crd,
          padding: 20,
          marginTop: 4,
          textAlign: "center",
          cursor: "default",
        }}
      >
        <div style={{ color: S.err, fontSize: 14, fontWeight: 600 }}>
          {initError}
        </div>
        <button
          onClick={() => {
            setInitError(null);
            setClientSecret(null);
          }}
          style={{
            color: S.t2,
            fontSize: 12,
            marginTop: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Stripe configured — wait for clientSecret then wrap in Elements
  if (isStripeConfigured) {
    if (!clientSecret) {
      return (
        <div
          style={{
            ...S.crd,
            padding: 20,
            marginTop: 4,
            textAlign: "center",
            cursor: "default",
          }}
        >
          <div style={{ fontSize: 14, color: S.t2 }}>
            Initializing secure payment...
          </div>
        </div>
      );
    }

    return (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "night",
            variables: {
              colorPrimary: "#6366f1",
              colorBackground: "rgba(15, 22, 50, 0.8)",
              colorText: "#ffffff",
              colorDanger: "#f87171",
              fontFamily: "system-ui, -apple-system, sans-serif",
              borderRadius: "10px",
            },
          },
        }}
      >
        <CardForm
          amount={amount}
          onSuccess={onSuccess}
          onError={onError}
          lang={lang}
          clientSecret={clientSecret}
        />
      </Elements>
    );
  }

  // Mock mode — no Stripe configured, render MockCardForm (no Stripe hooks)
  return (
    <MockCardForm
      amount={amount}
      onSuccess={onSuccess}
    />
  );
}

/**
 * MockCardForm — used when Stripe is NOT configured.
 * Does NOT use useStripe/useElements (which require <Elements> provider).
 */
function MockCardForm({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: (paymentIntentId?: string) => void;
}) {
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async () => {
    if (processing) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    onSuccess();
  };

  return (
    <>
      <div
        style={{
          background: "rgba(251,191,36,.12)",
          border: "1px solid rgba(251,191,36,.4)",
          borderRadius: 10,
          padding: 10,
          marginTop: 8,
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 11, color: S.wrn, fontWeight: 700 }}>
          DEV MODE — Set VITE_STRIPE_PUBLISHABLE_KEY for real payments
        </div>
      </div>

      <div
        style={{
          ...S.crd,
          padding: 20,
          marginTop: 4,
          cursor: "default",
          background: "rgba(99,102,241,.08)",
          border: "1px solid rgba(99,102,241,.3)",
        }}
      >
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            display: "block",
            marginBottom: 8,
          }}
        >
          Card Details
        </label>
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(147,197,253,.15)",
            background: "rgba(15,22,50,.6)",
            color: "rgba(255,255,255,.4)",
            fontSize: 14,
          }}
        >
          Mock card input (demo mode)
        </div>
      </div>

      <button
        disabled={processing}
        onClick={handleSubmit}
        style={{
          ...S.btn,
          opacity: processing ? 0.5 : 1,
          marginTop: 12,
        }}
      >
        {processing
          ? "Processing..."
          : `Submit Payment — $${amount.toFixed(2)}`}
      </button>

      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          fontSize: 12,
          color: S.t2,
          fontWeight: 600,
        }}
      >
        Secure payment powered by Stripe
      </div>
    </>
  );
}
