import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import { FORMS } from "../data/forms";

const FAQ_DATA = [
  { cat: "General", items: [
    { q: "What is ImmIGuide?", a: "ImmIGuide is a self-service immigration form-preparation platform. We help you fill out USCIS immigration forms in your language, prepare your documents, and handle printing and mailing. We are NOT a law firm and do not provide legal advice." },
    { q: "Is ImmIGuide a law firm?", a: "No. ImmIGuide is a form-preparation tool only. We do not provide legal advice, legal representation, or attorney services. For legal advice, consult a licensed immigration attorney." },
    { q: "How many languages do you support?", a: "We support 20 languages: English, Spanish, Russian, Ukrainian, Polish, French, Portuguese, Haitian Creole, Arabic, Somali, Nepali, Myanmar, Romanian, Bulgarian, Turkish, Italian, German, Farsi, Hebrew, and Chinese." },
    { q: "How is ImmIGuide different from an attorney?", a: "Attorneys provide legal advice and representation ($500-$6,000 per form). ImmIGuide provides form preparation only at a fraction of the cost. We guide you through filling out forms correctly, but we cannot advise you on which form to file or your immigration strategy." },
  ]},
  { cat: "Forms & Process", items: [
    { q: "Which forms do you support?", a: "We support 18 USCIS forms including: I-130, I-485, I-765, I-131, N-400, I-821, DACA, I-90, I-129F, I-751, I-589, I-539, I-864, I-129, I-140, I-693, I-912, and I-601." },
    { q: "How long does it take to fill out a form?", a: "Most forms take 15-45 minutes depending on complexity. You can save your progress and return at any time." },
    { q: "Can I save my progress?", a: "Yes! Your form data is automatically saved as you type. You can close the app and come back later to continue where you left off." },
    { q: "What happens after I submit?", a: "Depending on your delivery option: PDF (emailed within 24hrs), Print & Ship (mailed to you in 5-7 days), Full Service (we mail to USCIS in 5-7 days), or Express (submitted to USCIS in 2-3 days)." },
  ]},
  { cat: "Payment", items: [
    { q: "What payment methods do you accept?", a: "We accept Credit/Debit Cards (Visa, Mastercard, Amex), PayPal, Zelle, Bank Transfer, Apple Pay, and Google Pay." },
    { q: "Are USCIS fees included in your price?", a: "No. USCIS government filing fees are separate and must be paid directly to USCIS at uscis.gov/pay. Our prices cover form preparation, review, and delivery only." },
    { q: "Do you offer refunds?", a: "Refunds may be requested within 24 hours of payment if form preparation has not begun. Once preparation starts, no refunds are issued." },
    { q: "Do you have a promo code?", a: "New users can try WELCOME10 for 10% off. Additional discounts are available through our referral program — refer friends and both save 5%!" },
  ]},
  { cat: "Documents", items: [
    { q: "What documents do I need to upload?", a: "Typically: passport photo, birth certificate, a recent photo, and any supporting documents specific to your form. You can upload from your phone camera or file browser." },
    { q: "Are my documents secure?", a: "Yes. All documents are encrypted in transit and at rest. Only you and authorized ImmIGuide personnel can access your files. Documents are deleted 90 days after processing." },
    { q: "What file formats are accepted?", a: "We accept JPG, PNG, and PDF files. Photos can be taken directly with your phone camera." },
  ]},
  { cat: "Tracking & Status", items: [
    { q: "How do I track my application?", a: "Go to the Tracking page from your Dashboard. You'll see real-time status updates for each step of the process." },
    { q: "Will you notify me of updates?", a: "Yes! You'll receive notifications when your status changes. You can choose your notification sound on the Tracking page." },
    { q: "How long does USCIS processing take?", a: "Processing times vary by form type. Use our USCIS Processing Time Calculator on this page for estimates based on current data." },
  ]},
  { cat: "Attorney Directory", items: [
    { q: "Are the attorneys on your platform verified?", a: "All listed attorneys must provide: active bar membership, 3-5 documented case results, verifiable client references, and pass our verification process. Attorneys with 3+ negative reviews are removed." },
    { q: "Does ImmIGuide recommend specific attorneys?", a: "No. Attorney listings are paid advertisements. We do not endorse, recommend, or guarantee any attorney's services. Users should independently verify credentials." },
  ]},
];

// USCIS processing times (months)
const PROCESSING_TIMES: Record<string, { min: number; max: number }> = {
  i821: { min: 6, max: 12 }, daca: { min: 4, max: 8 }, i765: { min: 3, max: 6 },
  i130: { min: 12, max: 24 }, n400: { min: 8, max: 14 }, i485: { min: 12, max: 36 },
  i131: { min: 3, max: 6 }, i589: { min: 6, max: 24 }, i539: { min: 3, max: 6 },
  i129f: { min: 6, max: 12 }, i90: { min: 6, max: 12 }, i751: { min: 12, max: 24 },
  i864: { min: 0, max: 1 }, i129: { min: 3, max: 6 }, i140: { min: 6, max: 12 },
  i693: { min: 0, max: 1 }, i912: { min: 1, max: 2 }, i601: { min: 6, max: 12 },
};

export default function PageFAQ() {
  const { lang, go } = useContext(AppCtx) as any;
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";
  const [openCat, setOpenCat] = useState<string | null>("General");
  const [openQ, setOpenQ] = useState<number | null>(null);
  const [calcForm, setCalcForm] = useState("");
  const [hoverForm, setHoverForm] = useState("");

  const activeForm = hoverForm || calcForm;
  const calcResult = activeForm ? PROCESSING_TIMES[activeForm] : null;
  const activeFormData = activeForm ? FORMS.find(f => f.id === activeForm) : null;

  return (
    <div style={S.page} dir={isRTL ? "rtl" : "ltr"}>
      <Nav title="FAQ & Help" backTo="dashboard" />

      {/* USCIS Processing Time Calculator */}
      <div style={{
        background: "linear-gradient(135deg,rgba(99,102,241,.12),rgba(6,182,212,.08))",
        border: "2px solid rgba(99,102,241,.3)", borderRadius: 20, padding: 20,
        marginBottom: 16, textAlign: "center",
      }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🕐</div>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>USCIS Processing Time Calculator</div>
        <div style={{ fontSize: 12, color: S.t2, marginBottom: 12 }}>Select your form to see estimated processing time</div>

        {/* Result display — always visible, updates on hover */}
        <div style={{
          background: "rgba(0,0,0,.3)", borderRadius: 14, padding: 16, marginBottom: 12,
          minHeight: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          transition: "all .2s",
        }}>
          {calcResult && activeFormData ? (
            <>
              <div style={{ fontSize: 11, color: S.t2, marginBottom: 2 }}>{activeFormData.name}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: S.ok }}>
                {calcResult.min === 0 ? "< 1" : calcResult.min} — {calcResult.max} months
              </div>
              <div style={{ fontSize: 11, color: S.t2, marginTop: 4 }}>
                Service fee: <strong style={{ color: "#fff" }}>${activeFormData.fee}</strong> | USCIS fee: <strong style={{ color: "#fff" }}>${activeFormData.uscis}</strong>
              </div>
              <div style={{ fontSize: 10, color: S.wrn, marginTop: 6 }}>
                Total cost: <strong>${(activeFormData.fee + activeFormData.uscis).toFixed(2)}</strong>
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: S.t2 }}>Hover over a form below to see details</div>
          )}
        </div>

        {/* Form list — hover to preview */}
        <div style={{ maxHeight: 200, overflowY: "auto", borderRadius: 12, border: "1px solid " + S.bdr }}>
          {FORMS.map(f => {
            const pt = PROCESSING_TIMES[f.id];
            const isActive = activeForm === f.id;
            return (
              <div
                key={f.id}
                onMouseEnter={() => setHoverForm(f.id)}
                onMouseLeave={() => setHoverForm("")}
                onClick={() => setCalcForm(f.id)}
                style={{
                  padding: "8px 12px", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: isActive ? "rgba(52,211,153,.12)" : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                  transition: "background .15s",
                }}
              >
                <div>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 400, color: isActive ? S.ok : "#fff" }}>{f.name}</span>
                  <span style={{ fontSize: 10, color: S.t2, marginLeft: 8 }}>${f.fee}</span>
                </div>
                <span style={{ fontSize: 11, color: isActive ? S.ok : S.t2 }}>
                  {pt ? `${pt.min}-${pt.max}mo` : "—"}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: 11, color: S.wrn, marginTop: 8 }}>
          Estimates based on current USCIS data. Actual times may vary. This is not a guarantee.
        </div>
      </div>

      {/* FAQ Categories */}
      {FAQ_DATA.map((cat) => (
        <div key={cat.cat} style={{ marginBottom: 8 }}>
          <div
            onClick={() => setOpenCat(openCat === cat.cat ? null : cat.cat)}
            style={{
              ...S.crd, padding: "14px 16px", display: "flex", justifyContent: "space-between",
              alignItems: "center", cursor: "pointer", marginBottom: 4,
              background: openCat === cat.cat ? "rgba(99,102,241,.12)" : "rgba(255,255,255,.05)",
              border: openCat === cat.cat ? "1.5px solid rgba(99,102,241,.4)" : "1px solid " + S.bdr,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700 }}>{cat.cat}</span>
            <span style={{ fontSize: 12, color: S.t2 }}>{openCat === cat.cat ? "▲" : "▼"} {cat.items.length}</span>
          </div>

          {openCat === cat.cat && cat.items.map((item, i) => (
            <div key={i} style={{ marginBottom: 4, marginLeft: 8 }}>
              <div
                onClick={() => setOpenQ(openQ === i ? null : i)}
                style={{
                  padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                  background: openQ === i ? "rgba(52,211,153,.08)" : "rgba(255,255,255,.03)",
                  border: openQ === i ? "1px solid rgba(52,211,153,.3)" : "1px solid rgba(255,255,255,.05)",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: openQ === i ? S.ok : "#fff" }}>
                  {openQ === i ? "▾ " : "▸ "}{item.q}
                </div>
                {openQ === i && (
                  <div style={{ fontSize: 12, color: S.t2, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                    {item.a}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ fontSize: 12, color: S.t2, textAlign: "center", margin: "16px 0", lineHeight: 1.5 }}>
        Can't find your answer? Contact us at <strong style={{ color: "#fff" }}>support@immiguide.com</strong>
      </div>

      <Btn onClick={() => go("formSelect")}>Start Your Application →</Btn>
    </div>
  );
}
