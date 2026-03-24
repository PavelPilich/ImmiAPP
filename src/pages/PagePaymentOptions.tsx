import { useContext, useState, useEffect } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import StripeProvider from "../components/payment/StripeProvider";
import CardPayment from "../components/payment/CardPayment";
import { createPaymentIntent, isStripeConfigured } from "../lib/stripe";

export default function PagePaymentOptions() {
  const { lang, go, selForm, payTotal, pkg } = useContext(AppCtx) as any;
  const [method, setMethod] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const isRTL = lang === "ar";

  if (!selForm) return <div style={S.page} dir={isRTL ? "rtl" : "ltr"}><Nav title="" backTo="dashboard" /></div>;
  const tot = (payTotal || 0).toFixed(2);

  // Create PaymentIntent when card method is selected
  useEffect(() => {
    if (method === "card" && !clientSecret) {
      createPaymentIntent({
        formId: selForm.id,
        formName: selForm.name,
        packageType: pkg,
        amount: payTotal || 0,
      })
        .then(res => setClientSecret(res.clientSecret))
        .catch(() => setError("Failed to initialize payment. Please try again."));
    }
  }, [method, clientSecret, selForm, pkg, payTotal]);

  // Mock submit for non-Stripe methods (Zelle, Bank, PayPal)
  const handleMockSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  const handleStripeSuccess = () => {
    setSubmitting(false);
    setSuccess(true);
  };

  const handleStripeError = (msg: string) => {
    setError(msg);
  };

  /* ── Success screen ── */
  if (success) {
    return (
      <div style={{ ...S.page, textAlign: "center", paddingTop: 20 }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={t(lang, "paymentOptions")} backTo="pay" />
        <div style={{ fontSize: 72, marginBottom: 12 }}>✅</div>
        <h2 style={{ fontSize: 22, marginBottom: 8, color: S.ok }}>{t(lang, "paymentSuccess")}</h2>
        <div style={{ ...S.crd, padding: 20, textAlign: "center", cursor: "default" }}>
          <div style={{ fontSize: 14, color: S.t2, marginBottom: 4 }}>{t(lang, "total")}</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#fff" }}>${tot}</div>
        </div>
        <Btn onClick={() => go("whatsNext")} style={{ marginTop: 16 }}>{t(lang, "next") + " →"}</Btn>
      </div>
    );
  }

  /* ── Processing screen ── */
  if (submitting) {
    return (
      <div style={{ ...S.page, textAlign: "center", paddingTop: 60 }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={t(lang, "paymentOptions")} backTo="pay" />
        <div style={{ fontSize: 60, marginBottom: 16, animation: "gf 1.5s ease-in-out infinite" }}>💳</div>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>{t(lang, "processing")}</h2>
        <div style={{ width: 200, margin: "20px auto" }}>
          <div style={{ height: 4, borderRadius: 2, background: S.bdr, overflow: "hidden" }}>
            <div style={{ width: "60%", height: "100%", background: S.pri, borderRadius: 2, animation: "sh 1.5s ease-in-out infinite" }} />
          </div>
        </div>
        <p style={{ color: S.t2, fontSize: 14 }}>{t(lang, "securePayment")}</p>
      </div>
    );
  }

  /* ── Payment methods (admin bypass REMOVED, bank details from config not hardcoded) ── */
  const methods = [
    { id: "card", icon: "💳", label: t(lang, "creditDebitCard") },
    { id: "paypal", icon: "🅿️", label: t(lang, "paypal") },
    { id: "zelle", icon: "⚡", label: t(lang, "zelle") },
    { id: "bank", icon: "🏦", label: t(lang, "bankTransfer") },
    { id: "applepay", icon: "🍎", label: t(lang, "applePay") },
    { id: "googlepay", icon: "🔵", label: t(lang, "googlePay") },
  ];

  const canSubmitNonStripe = () => {
    if (!method) return false;
    if (method === "card") return false; // Stripe handles card submission
    return true;
  };

  return (
    <div style={S.page} dir={isRTL ? "rtl" : "ltr"}>
      <Nav title={t(lang, "paymentOptions")} backTo="pay" />

      {/* Amount banner */}
      <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,.2),rgba(6,182,212,.15))", border: "2px solid rgba(99,102,241,.4)", borderRadius: 16, padding: 20, marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: S.t2, fontWeight: 600, marginBottom: 4 }}>{t(lang, "amountDue")}</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>${tot}</div>
        <div style={{ fontSize: 12, color: S.t2, marginTop: 4 }}>{selForm.name} — {t(lang, "securePayment")}</div>
      </div>

      {/* Error display */}
      {error && (
        <div style={{ background: "rgba(248,113,113,.15)", border: "1px solid rgba(248,113,113,.4)", borderRadius: 12, padding: 14, marginBottom: 12, textAlign: "center" }}>
          <div style={{ color: S.err, fontSize: 14, fontWeight: 600 }}>{error}</div>
          <button onClick={() => setError(null)} style={{ color: S.t2, fontSize: 12, marginTop: 6, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Dismiss</button>
        </div>
      )}

      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: "#fff" }}>{t(lang, "selectPayMethod")}</div>

      {/* Method cards */}
      {methods.map(m => (
        <div key={m.id} onClick={() => { setMethod(m.id); setError(null); }} style={{
          ...S.crd, border: method === m.id ? "2px solid " + S.pri : "1px solid " + S.bdr,
          background: method === m.id ? "rgba(99,102,241,.15)" : "rgba(255,255,255,.07)",
          padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, transition: "all .2s",
        }}>
          <div style={{ width: 24, height: 24, borderRadius: 12, border: method === m.id ? "6px solid " + S.pri : "2px solid rgba(255,255,255,.3)", background: method === m.id ? S.pri : "transparent", flexShrink: 0, transition: "all .2s" }} />
          <span style={{ fontSize: 24 }}>{m.icon}</span>
          <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>{m.label}</span>
          {method === m.id && <span style={{ color: S.pri, fontSize: 18 }}>✓</span>}
        </div>
      ))}

      {/* ── Stripe Card Payment (PCI-compliant) ── */}
      {method === "card" && (
        isStripeConfigured && clientSecret ? (
          <StripeProvider clientSecret={clientSecret}>
            <CardPayment
              amount={tot}
              onSuccess={handleStripeSuccess}
              onError={handleStripeError}
              submitLabel={t(lang, "submitPayment")}
              secureLabel={t(lang, "securePayment")}
            />
          </StripeProvider>
        ) : !isStripeConfigured ? (
          /* Fallback for local dev without Stripe keys — mock card form */
          <MockCardForm
            lang={lang}
            tot={tot}
            onSubmit={handleMockSubmit}
          />
        ) : (
          <div style={{ ...S.crd, padding: 20, marginTop: 4, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: S.t2 }}>Initializing secure payment...</div>
          </div>
        )
      )}

      {/* ── PayPal ── */}
      {method === "paypal" && (
        <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(0,112,243,.1)", border: "1px solid rgba(0,112,243,.3)", textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>🅿️</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{t(lang, "payWithPaypal")}</div>
          <div style={{ fontSize: 13, color: S.t2 }}>You will be redirected to PayPal to complete your payment of <strong style={{ color: "#fff" }}>${tot}</strong></div>
        </div>
      )}

      {/* ── Zelle ── */}
      {method === "zelle" && (
        <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(101,50,205,.1)", border: "1px solid rgba(101,50,205,.3)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t(lang, "zelleInstr")}</div>
          <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 10, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: S.t2, fontSize: 13 }}>Email</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>payments@immiguide.com</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: S.t2, fontSize: 13 }}>{t(lang, "total")}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: S.ok }}>${tot}</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: S.t2, marginTop: 10, lineHeight: 1.5 }}>After sending via Zelle, click "{t(lang, "submitPayment")}" to confirm.</div>
        </div>
      )}

      {/* ── Bank Transfer (details fetched from config, not hardcoded) ── */}
      {method === "bank" && (
        <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.3)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t(lang, "bankInstr")}</div>
          <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 10, padding: 14 }}>
            <BankDetails lang={lang} tot={tot} />
          </div>
          <div style={{ fontSize: 12, color: S.t2, marginTop: 10, lineHeight: 1.5 }}>After transferring, click "{t(lang, "submitPayment")}" to confirm.</div>
        </div>
      )}

      {/* ── Apple Pay ── */}
      {method === "applepay" && (
        <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.2)", textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>🍎</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{t(lang, "applePay")}</div>
          <div style={{ fontSize: 13, color: S.t2 }}>Tap "{t(lang, "submitPayment")}" to pay <strong style={{ color: "#fff" }}>${tot}</strong> with Apple Pay</div>
        </div>
      )}

      {/* ── Google Pay ── */}
      {method === "googlepay" && (
        <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(66,133,244,.1)", border: "1px solid rgba(66,133,244,.3)", textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>🔵</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{t(lang, "googlePay")}</div>
          <div style={{ fontSize: 13, color: S.t2 }}>Tap "{t(lang, "submitPayment")}" to pay <strong style={{ color: "#fff" }}>${tot}</strong> with Google Pay</div>
        </div>
      )}

      {/* Submit button for non-Stripe methods */}
      {method && method !== "card" && (
        <>
          <Btn disabled={!canSubmitNonStripe()} onClick={handleMockSubmit} style={{ marginTop: 12 }}>
            {t(lang, "submitPayment") + " — $" + tot}
          </Btn>
          <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: S.t2, fontWeight: 600 }}>
            {t(lang, "securePayment")}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Mock card form for local dev without Stripe keys.
 * Shows a clear warning that this is NOT production-ready.
 */
function MockCardForm({ lang, tot, onSubmit }: { lang: any; tot: string; onSubmit: () => void }) {
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const fmtCard = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 16); return d.replace(/(.{4})/g, "$1 ").trim(); };
  const fmtExp = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

  const canSubmit = cardNum.length >= 13 && cardExp.length >= 4 && cardCvv.length >= 3 && cardName.length >= 2;

  return (
    <>
      {/* Dev mode warning */}
      <div style={{ background: "rgba(251,191,36,.12)", border: "1px solid rgba(251,191,36,.4)", borderRadius: 10, padding: 10, marginTop: 8, marginBottom: 4, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: S.wrn, fontWeight: 700 }}>DEV MODE — Set VITE_STRIPE_PUBLISHABLE_KEY for real payments</div>
      </div>

      <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(99,102,241,.08)", border: "1px solid rgba(99,102,241,.3)" }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{t(lang, "cardNumber")}</label>
          <input value={cardNum} onChange={e => setCardNum(fmtCard(e.target.value))} placeholder="4242 4242 4242 4242" style={S.inp} maxLength={19} inputMode="numeric" />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{t(lang, "expDate")}</label>
            <input value={cardExp} onChange={e => setCardExp(fmtExp(e.target.value))} placeholder="MM/YY" style={S.inp} maxLength={5} inputMode="numeric" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{t(lang, "cvv")}</label>
            <input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" style={S.inp} maxLength={4} inputMode="numeric" type="password" />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{t(lang, "cardHolder")}</label>
          <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="John Doe" style={S.inp} />
        </div>
      </div>

      <Btn disabled={!canSubmit} onClick={onSubmit} style={{ marginTop: 12 }}>
        {t(lang, "submitPayment") + " — $" + tot}
      </Btn>
      <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: S.t2, fontWeight: 600 }}>
        {t(lang, "securePayment")}
      </div>
    </>
  );
}

/**
 * Bank details component — reads from env config instead of hardcoding.
 * In production, fetch from API. For dev, uses env vars with fallbacks.
 */
function BankDetails({ lang, tot }: { lang: any; tot: string }) {
  const bankName = import.meta.env.VITE_BANK_NAME || "Contact support for details";
  const accountName = import.meta.env.VITE_BANK_ACCOUNT_NAME || "Contact support for details";
  const routingNum = import.meta.env.VITE_BANK_ROUTING || "Contact support";
  const accountNum = import.meta.env.VITE_BANK_ACCOUNT || "Contact support";

  const rows = [
    [t(lang, "bankName"), bankName],
    [t(lang, "accountName"), accountName],
    [t(lang, "routingNum"), routingNum],
    [t(lang, "accountNum"), accountNum],
    [t(lang, "total"), "$" + tot],
  ];

  return (
    <>
      {rows.map(([lbl, val], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 8 : 0 }}>
          <span style={{ color: S.t2, fontSize: 13 }}>{lbl}</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: i === 4 ? S.ok : "#fff" }}>{val}</span>
        </div>
      ))}
    </>
  );
}
