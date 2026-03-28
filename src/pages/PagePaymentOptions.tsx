import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useRecordPayment, useUpdateFormStatus } from "../hooks/useApi";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import StripeCardForm from "../components/payment/StripeCardForm";
import PayPalButton from "../components/payment/PayPalButton";

export default function PagePaymentOptions() {
  const { lang, go, selForm, payTotal, pkg, savedFormId, promoCode, discountPct, setOurFeePaid } = useContext(AppCtx) as any;
  const auth = useAuth();
  const recordPayment = useRecordPayment();
  const updateStatus = useUpdateFormStatus();
  const [method, setMethod] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  if (!selForm) return <div style={S.page} dir={isRTL ? "rtl" : "ltr"}><Nav title="" backTo="dashboard" /></div>;
  const tot = (payTotal || 0).toFixed(2);
  const amountCents = Math.round((payTotal || 0) * 100);
  const discountCents = Math.round(amountCents * discountPct / (100 - discountPct)) || 0;
  const userId = auth.user?.id;

  const doRecordPayment = (paymentMethod: string, extra?: { stripePaymentIntentId?: string; paypalOrderId?: string }) => {
    if (userId && savedFormId) {
      recordPayment.mutate({
        userId,
        savedFormId,
        method: paymentMethod,
        amountCents,
        promoCode: promoCode || null,
        discountCents,
        status: 'completed',
        ...extra,
      });
      updateStatus.mutate({ formId: savedFormId, status: 'paid' });
    }
  };

  const handleMockSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      doRecordPayment(method || 'other');
    }, 2000);
  };

  const handlePaymentSuccess = (idOrOrderId?: string) => {
    setSubmitting(false);
    setSuccess(true);
    if (method === 'card') {
      doRecordPayment('card', { stripePaymentIntentId: idOrOrderId });
    } else if (method === 'paypal') {
      doRecordPayment('paypal', { paypalOrderId: idOrOrderId });
    } else {
      doRecordPayment(method || 'other');
    }
  };

  const handlePaymentError = (msg: string) => {
    setError(msg);
  };

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
        <Btn onClick={() => { setOurFeePaid(true); go("formDetail"); }} style={{ marginTop: 16 }}>{t(lang, "backToForm") || "Back to Form →"}</Btn>
      </div>
    );
  }

  if (submitting) {
    return (
      <div style={{ ...S.page, textAlign: "center", paddingTop: 60 }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={t(lang, "paymentOptions")} backTo="pay" />
        <div style={{ fontSize: 60, marginBottom: 16, animation: "gf 1.5s ease-in-out infinite" }}>💳</div>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>{t(lang, "processing")}</h2>
        <div style={{ width: 200, margin: "20px auto" }}>
          <div style={{ height: 4, borderRadius: 2, background: S.bdr, overflow: "hidden" }}>
            <div style={{ width: "60%", height: "100%", background: S.priBtn, borderRadius: 2, animation: "sh 1.5s ease-in-out infinite" }} />
          </div>
        </div>
        <p style={{ color: S.t2, fontSize: 14 }}>{t(lang, "securePayment")}</p>
      </div>
    );
  }

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
    if (method === "card" || method === "paypal") return false;
    return true;
  };

  return (
    <div style={S.page} dir={isRTL ? "rtl" : "ltr"}>
      <Nav title={t(lang, "paymentOptions")} backTo="pay" />

      <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,.2),rgba(6,182,212,.15))", border: "2px solid rgba(99,102,241,.4)", borderRadius: 16, padding: 20, marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: S.t2, fontWeight: 600, marginBottom: 4 }}>{t(lang, "amountDue")}</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>${tot}</div>
        <div style={{ fontSize: 12, color: S.t2, marginTop: 4 }}>{selForm.name} — {t(lang, "securePayment")}</div>
      </div>

      {error && (
        <div style={{ background: "rgba(248,113,113,.15)", border: "1px solid rgba(248,113,113,.4)", borderRadius: 12, padding: 14, marginBottom: 12, textAlign: "center" }}>
          <div style={{ color: S.err, fontSize: 14, fontWeight: 600 }}>{error}</div>
          <button onClick={() => setError(null)} style={{ color: S.t2, fontSize: 12, marginTop: 6, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Dismiss</button>
        </div>
      )}

      {/* Admin bypass — skip payment (DEV only) */}
      {import.meta.env.DEV && (
        <button onClick={() => {
          doRecordPayment('admin_bypass');
          setOurFeePaid(true);
          setSuccess(true);
        }} style={{ background: "rgba(99,102,241,.2)", border: "1px solid rgba(99,102,241,.4)", borderRadius: 12, padding: "10px 16px", color: "#6366f1", fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%", marginBottom: 12 }}>
          Skip Payment (Admin)
        </button>
      )}

      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: "#fff" }}>{t(lang, "selectPayMethod")}</div>

      {methods.map(m => (
        <div key={m.id} onClick={() => { setMethod(m.id); setError(null); }} style={{
          ...S.crd, border: method === m.id ? "2px solid " + S.priBtn : "1px solid " + S.bdr,
          background: method === m.id ? "rgba(99,102,241,.15)" : "rgba(255,255,255,.07)",
          padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, transition: "all .2s",
        }}>
          <div style={{ width: 24, height: 24, borderRadius: 12, border: method === m.id ? "6px solid " + S.priBtn : "2px solid rgba(255,255,255,.3)", background: method === m.id ? S.pri : "transparent", flexShrink: 0, transition: "all .2s" }} />
          <span style={{ fontSize: 24 }}>{m.icon}</span>
          <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>{m.label}</span>
          {method === m.id && <span style={{ color: S.pri, fontSize: 18 }}>✓</span>}
        </div>
      ))}

      {method === "card" && (
        <StripeCardForm
          amount={payTotal || 0}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          lang={lang}
          formId={selForm.id}
          formName={selForm.name}
          packageType={pkg}
        />
      )}

      {method === "paypal" && (
        <PayPalButton
          amount={payTotal || 0}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}

      {method === "zelle" && (
        <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(101,50,205,.1)", border: "1px solid rgba(101,50,205,.3)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t(lang, "zelleInstr")}</div>
          <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 10, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: S.t2, fontSize: 13 }}>Email</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{import.meta.env.VITE_ZELLE_EMAIL || "payments@immiguide.com"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: S.t2, fontSize: 13 }}>{t(lang, "total")}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: S.ok }}>${tot}</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: S.t2, marginTop: 10, lineHeight: 1.5 }}>After sending via Zelle, click "{t(lang, "submitPayment")}" to confirm.</div>
        </div>
      )}

      {method === "bank" && (
        <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.3)" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{t(lang, "bankInstr")}</div>
          <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 10, padding: 14 }}>
            <BankDetails lang={lang} tot={tot} />
          </div>
          <div style={{ fontSize: 12, color: S.t2, marginTop: 10, lineHeight: 1.5 }}>After transferring, click "{t(lang, "submitPayment")}" to confirm.</div>
        </div>
      )}

      {method === "applepay" && (
        <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.2)", textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>🍎</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{t(lang, "applePay")}</div>
          <div style={{ fontSize: 13, color: S.t2 }}>Tap "{t(lang, "submitPayment")}" to pay <strong style={{ color: "#fff" }}>${tot}</strong> with Apple Pay</div>
        </div>
      )}

      {method === "googlepay" && (
        <div style={{ ...S.crd, padding: 20, marginTop: 4, cursor: "default", background: "rgba(66,133,244,.1)", border: "1px solid rgba(66,133,244,.3)", textAlign: "center" }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>🔵</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{t(lang, "googlePay")}</div>
          <div style={{ fontSize: 13, color: S.t2 }}>Tap "{t(lang, "submitPayment")}" to pay <strong style={{ color: "#fff" }}>${tot}</strong> with Google Pay</div>
        </div>
      )}

      {method && method !== "card" && method !== "paypal" && (
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
