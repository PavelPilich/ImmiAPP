import { useState, useEffect, useRef } from "react";
import { S } from "../../data/styles";

interface PayPalButtonProps {
  amount: number;
  onSuccess: (orderId?: string) => void;
  onError: (msg: string) => void;
}

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "";

/**
 * PayPalButton — renders a PayPal checkout button.
 *
 * When VITE_PAYPAL_CLIENT_ID is set:
 *   - Loads the PayPal JS SDK dynamically and renders the official PayPal button
 * When not set (demo mode):
 *   - Shows a mock "Redirecting to PayPal..." message with 2s delay, then calls onSuccess
 */
export default function PayPalButton({
  amount,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const paypalRendered = useRef(false);

  // Load PayPal SDK when client ID is available
  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) return;

    const existingScript = document.getElementById("paypal-sdk");
    if (existingScript) {
      // SDK already loaded
      if ((window as any).paypal) {
        setSdkReady(true);
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;

    script.onload = () => setSdkReady(true);
    script.onerror = () => {
      setSdkError(true);
      onError("Failed to load PayPal. Please try another payment method.");
    };

    document.body.appendChild(script);
  }, [onError]);

  // Render PayPal buttons once SDK is ready
  useEffect(() => {
    if (
      !PAYPAL_CLIENT_ID ||
      !sdkReady ||
      !buttonContainerRef.current ||
      paypalRendered.current
    )
      return;

    const paypal = (window as any).paypal;
    if (!paypal?.Buttons) return;

    paypalRendered.current = true;

    paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "blue",
          shape: "pill",
          label: "paypal",
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                  currency_code: "USD",
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            await actions.order.capture();
            onSuccess(data?.orderID);
          } catch {
            onError("PayPal payment could not be captured. Please try again.");
          }
        },
        onError: (err: any) => {
          onError(
            err?.message || "PayPal encountered an error. Please try again."
          );
        },
        onCancel: () => {
          // User cancelled — do nothing, they can retry
        },
      })
      .render(buttonContainerRef.current);
  }, [sdkReady, amount, onSuccess, onError]);

  // Mock mode — no PayPal client ID configured
  if (!PAYPAL_CLIENT_ID) {
    const handleMockPayPal = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 2000);
    };

    return (
      <div
        style={{
          ...S.crd,
          padding: 20,
          marginTop: 4,
          cursor: "default",
          background: "rgba(0,112,243,.1)",
          border: "1px solid rgba(0,112,243,.3)",
          textAlign: "center",
        }}
      >
        {/* Dev mode warning */}
        <div
          style={{
            background: "rgba(251,191,36,.12)",
            border: "1px solid rgba(251,191,36,.4)",
            borderRadius: 10,
            padding: 10,
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 11, color: S.wrn, fontWeight: 700 }}>
            DEV MODE — Set VITE_PAYPAL_CLIENT_ID for real PayPal
          </div>
        </div>

        <div style={{ fontSize: 44, marginBottom: 8 }}>🅿️</div>

        {loading ? (
          <>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              Redirecting to PayPal...
            </div>
            <div style={{ width: 160, margin: "0 auto" }}>
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  background: S.bdr,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    height: "100%",
                    background: "#0070f3",
                    borderRadius: 2,
                    animation: "sh 1.5s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              Pay with PayPal
            </div>
            <div style={{ fontSize: 13, color: S.t2, marginBottom: 12 }}>
              You will be redirected to PayPal to complete your payment of{" "}
              <strong style={{ color: "#fff" }}>${amount.toFixed(2)}</strong>
            </div>
            <button
              onClick={handleMockPayPal}
              style={{
                ...S.btn,
                background: "#0070f3",
                boxShadow: "0 4px 20px rgba(0,112,243,.3)",
              }}
            >
              Continue to PayPal
            </button>
          </>
        )}
      </div>
    );
  }

  // Real PayPal mode
  if (sdkError) {
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
          Failed to load PayPal. Please try another payment method.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        ...S.crd,
        padding: 20,
        marginTop: 4,
        cursor: "default",
        background: "rgba(0,112,243,.1)",
        border: "1px solid rgba(0,112,243,.3)",
      }}
    >
      {!sdkReady && (
        <div
          style={{ textAlign: "center", fontSize: 14, color: S.t2, padding: 10 }}
        >
          Loading PayPal...
        </div>
      )}
      <div ref={buttonContainerRef} />
    </div>
  );
}
