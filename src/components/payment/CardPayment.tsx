import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { S } from "../../data/styles";

interface CardPaymentProps {
  amount: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
  submitLabel: string;
  secureLabel: string;
}

/**
 * Stripe PaymentElement — handles card, Apple Pay, Google Pay, Link.
 * Card data NEVER touches our code (PCI DSS compliant).
 */
export default function CardPayment({ amount, onSuccess, onError, submitLabel, secureLabel }: CardPaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/dashboard",
      },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message || "Payment failed");
      setProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div>
      <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(99,102,241,.08)", border: "1px solid rgba(99,102,241,.3)" }}>
        <PaymentElement
          options={{
            layout: "tabs",
            defaultValues: {},
          }}
        />
      </div>

      <button
        disabled={!stripe || processing}
        onClick={handleSubmit}
        style={{
          ...S.btn,
          opacity: (!stripe || processing) ? 0.5 : 1,
          marginTop: 12,
        }}
      >
        {processing ? "Processing..." : `${submitLabel} — $${amount}`}
      </button>

      <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: S.t2, fontWeight: 600 }}>
        {secureLabel}
      </div>
    </div>
  );
}
