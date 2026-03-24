import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "../../lib/stripe";
import type { StripeElementsOptions } from "@stripe/stripe-js";

interface StripeProviderProps {
  clientSecret: string;
  children: React.ReactNode;
}

export default function StripeProvider({ clientSecret, children }: StripeProviderProps) {
  const stripe = getStripe();
  if (!stripe) return <>{children}</>;

  const options: StripeElementsOptions = {
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
        spacingUnit: "4px",
      },
      rules: {
        ".Input": {
          border: "1px solid rgba(147, 197, 253, 0.15)",
          boxShadow: "none",
          padding: "12px 16px",
          fontSize: "15px",
        },
        ".Input:focus": {
          border: "1px solid #6366f1",
          boxShadow: "0 0 0 1px #6366f1",
        },
        ".Label": {
          fontSize: "13px",
          fontWeight: "600",
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <Elements stripe={stripe} options={options}>
      {children}
    </Elements>
  );
}
