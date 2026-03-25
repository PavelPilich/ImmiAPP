import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { FORMS } from "../data/forms";

/* Attorney fee ranges (market research 2025-2026) */
const ATTORNEY_FEES: Record<string, { low: number; high: number }> = {
  i821:  { low: 800, high: 2000 },
  daca:  { low: 500, high: 1500 },
  i765:  { low: 500, high: 1400 },
  i130:  { low: 1500, high: 3000 },
  n400:  { low: 500, high: 2500 },
  i485:  { low: 1600, high: 5000 },
  i131:  { low: 500, high: 1000 },
  i589:  { low: 2000, high: 6000 },
  i539:  { low: 550, high: 800 },
  i129f: { low: 1000, high: 3000 },
  i90:   { low: 300, high: 800 },
  i751:  { low: 1500, high: 3500 },
  i864:  { low: 200, high: 500 },
  i129:  { low: 1500, high: 4000 },
  i140:  { low: 2250, high: 3400 },
  i693:  { low: 100, high: 300 },
  i912:  { low: 100, high: 300 },
  i601:  { low: 2000, high: 5000 },
};

/* Competitor service fees (SimpleCitizen, FileRight, etc.) */
const COMPETITOR_FEES: Record<string, { low: number; high: number }> = {
  i821:  { low: 229, high: 395 },
  daca:  { low: 119, high: 349 },
  i765:  { low: 159, high: 469 },
  i130:  { low: 459, high: 989 },
  n400:  { low: 229, high: 559 },
  i485:  { low: 529, high: 1199 },
  i131:  { low: 229, high: 395 },
  i589:  { low: 395, high: 900 },
  i539:  { low: 229, high: 395 },
  i129f: { low: 459, high: 989 },
  i90:   { low: 229, high: 559 },
  i751:  { low: 289, high: 689 },
  i864:  { low: 150, high: 350 },
  i129:  { low: 395, high: 900 },
  i140:  { low: 395, high: 900 },
  i693:  { low: 150, high: 300 },
  i912:  { low: 100, high: 250 },
  i601:  { low: 395, high: 900 },
};

/* USCIS filing fees (2025 actual) */
// USCIS fees now match forms.ts directly — this map is kept for reference only
const USCIS_ACTUAL: Record<string, number> = {
  i821: 510, daca: 85, i765: 560, i130: 625, n400: 760,
  i485: 1440, i131: 575, i589: 100, i539: 470, i129f: 675,
  i90: 465, i751: 750, i864: 120, i129: 780, i140: 715,
  i693: 0, i912: 0, i601: 1050,
};

const tierColors: Record<string, string> = {
  simple: "#34d399", medium: "#fbbf24", complex: "#f87171", vcomplex: "#c084fc",
};

const tierLabels: Record<string, string> = {
  simple: "Simple", medium: "Medium", complex: "Complex", vcomplex: "Very Complex",
};

export default function PagePricing() {
  const { lang, go } = useContext(AppCtx) as any;
  const isRTL = lang === "ar";

  const totalOurFees = FORMS.reduce((s, f) => s + f.fee, 0);
  const totalAttorneyLow = Object.values(ATTORNEY_FEES).reduce((s, f) => s + f.low, 0);
  const totalAttorneyHigh = Object.values(ATTORNEY_FEES).reduce((s, f) => s + f.high, 0);
  const totalCompLow = Object.values(COMPETITOR_FEES).reduce((s, f) => s + f.low, 0);
  const totalCompHigh = Object.values(COMPETITOR_FEES).reduce((s, f) => s + f.high, 0);

  return (
    <div style={S.page} dir={isRTL ? "rtl" : "ltr"}>
      <Nav title="Pricing Comparison" backTo="dashboard" />

      {/* Hero savings banner */}
      <div style={{
        background: "linear-gradient(135deg,rgba(52,211,153,.15),rgba(99,102,241,.15))",
        border: "2px solid rgba(52,211,153,.4)", borderRadius: 20, padding: 24,
        textAlign: "center", marginBottom: 16,
      }}>
        <div style={{ fontSize: 14, color: S.t2, fontWeight: 600, marginBottom: 4 }}>Average Savings vs. Attorney</div>
        <div style={{ fontSize: 42, fontWeight: 900, color: S.ok }}>
          Up to ${Math.round((totalAttorneyHigh - totalOurFees) / FORMS.length).toLocaleString()}
        </div>
        <div style={{ fontSize: 13, color: S.t2, marginTop: 4 }}>per form compared to immigration attorneys</div>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        <div style={{ ...S.crd, textAlign: "center", padding: 14, cursor: "default", background: "rgba(99,102,241,.12)", border: "1.5px solid rgba(99,102,241,.4)" }}>
          <div style={{ fontSize: 10, color: S.t2, fontWeight: 600, marginBottom: 4 }}>ImmIGuide</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: S.pri }}>$199</div>
          <div style={{ fontSize: 9, color: S.t2 }}>to $499</div>
        </div>
        <div style={{ ...S.crd, textAlign: "center", padding: 14, cursor: "default" }}>
          <div style={{ fontSize: 10, color: S.t2, fontWeight: 600, marginBottom: 4 }}>Other Services</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: S.wrn }}>$119</div>
          <div style={{ fontSize: 9, color: S.t2 }}>to $1,199</div>
        </div>
        <div style={{ ...S.crd, textAlign: "center", padding: 14, cursor: "default" }}>
          <div style={{ fontSize: 10, color: S.t2, fontWeight: 600, marginBottom: 4 }}>Attorneys</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: S.err }}>$500</div>
          <div style={{ fontSize: 9, color: S.t2 }}>to $6,000</div>
        </div>
      </div>

      {/* Tier legend */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {Object.entries(tierLabels).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: tierColors[k] }} />
            <span style={{ fontSize: 10, color: S.t2 }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Form-by-form comparison */}
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>All 18 Forms — Detailed Comparison</div>

      {/* Table header */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 70px 80px 80px",
        gap: 4, padding: "8px 10px", background: "rgba(99,102,241,.15)",
        borderRadius: "12px 12px 0 0", fontSize: 10, fontWeight: 700, color: S.t2,
      }}>
        <div>Form</div>
        <div style={{ textAlign: "right" }}>ImmIGuide</div>
        <div style={{ textAlign: "right" }}>Others</div>
        <div style={{ textAlign: "right" }}>Attorney</div>
      </div>

      {/* Rows */}
      {FORMS.map((f, i) => {
        const att = ATTORNEY_FEES[f.id] || { low: 0, high: 0 };
        const comp = COMPETITOR_FEES[f.id] || { low: 0, high: 0 };
        const savings = att.high - f.fee;
        const uscisActual = USCIS_ACTUAL[f.id] ?? f.uscis;

        return (
          <div key={f.id} style={{
            display: "grid", gridTemplateColumns: "1fr 70px 80px 80px",
            gap: 4, padding: "10px 10px", alignItems: "center",
            background: i % 2 === 0 ? "rgba(255,255,255,.03)" : "transparent",
            borderBottom: "1px solid rgba(255,255,255,.06)",
            ...(i === FORMS.length - 1 ? { borderRadius: "0 0 12px 12px" } : {}),
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 3, background: tierColors[f.tier], marginRight: 6 }} />
                {f.name}
              </div>
              <div style={{ fontSize: 10, color: S.t2 }}>USCIS: ${uscisActual}</div>
            </div>
            <div style={{ textAlign: "right", fontSize: 14, fontWeight: 800, color: S.ok }}>
              ${f.fee}
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: S.wrn }}>
              ${comp.low}-{comp.high}
            </div>
            <div style={{ textAlign: "right", fontSize: 11, color: S.err }}>
              ${att.low.toLocaleString()}-{att.high.toLocaleString()}
            </div>
          </div>
        );
      })}

      {/* Total row */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 70px 80px 80px",
        gap: 4, padding: "12px 10px", background: "rgba(99,102,241,.1)",
        borderRadius: 12, marginTop: 8, marginBottom: 16,
      }}>
        <div style={{ fontWeight: 800, fontSize: 13 }}>TOTAL (all 18)</div>
        <div style={{ textAlign: "right", fontWeight: 900, fontSize: 14, color: S.ok }}>${totalOurFees.toFixed(0)}</div>
        <div style={{ textAlign: "right", fontSize: 11, color: S.wrn }}>${totalCompLow.toLocaleString()}-{totalCompHigh.toLocaleString()}</div>
        <div style={{ textAlign: "right", fontSize: 11, color: S.err }}>${totalAttorneyLow.toLocaleString()}-{totalAttorneyHigh.toLocaleString()}</div>
      </div>

      {/* ═══ WHY CHOOSE IMMIGUIDE ═══ */}
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, textAlign: "center" }}>Why Choose ImmIGuide?</div>

      {/* Side-by-side feature comparison */}
      {(() => {
        const features = [
          { feature: "Price", us: "Lowest in market", others: "Same or higher", attorney: "3x-10x more" },
          { feature: "Languages", us: "12 languages", others: "1-3 languages", attorney: "English only" },
          { feature: "Form Prep", us: "Guided + specialist review", others: "Software only", attorney: "Attorney prepares" },
          { feature: "Documents", us: "Upload from phone", others: "Upload from phone", attorney: "In-person visit" },
          { feature: "Print & Mail", us: "We mail to USCIS", others: "You mail yourself", attorney: "Attorney mails" },
          { feature: "Cover Letter", us: "Included FREE", others: "Extra fee or none", attorney: "Included" },
          { feature: "Tracking", us: "Real-time status", others: "Email updates", attorney: "Call to check" },
          { feature: "Wait Time", us: "Start in minutes", others: "Start in minutes", attorney: "Weeks for appt" },
          { feature: "Hidden Fees", us: "None — $0", others: "Review fees, rush fees", attorney: "Hourly charges" },
          { feature: "Availability", us: "24/7 online", others: "Business hours", attorney: "Office hours only" },
        ];
        return (
          <>
            {/* Header */}
            <div style={{
              display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr",
              gap: 3, padding: "8px 6px", background: "rgba(99,102,241,.2)",
              borderRadius: "12px 12px 0 0", fontSize: 9, fontWeight: 700, color: S.t2,
            }}>
              <div></div>
              <div style={{ textAlign: "center", color: S.ok }}>ImmIGuide</div>
              <div style={{ textAlign: "center", color: S.wrn }}>Others</div>
              <div style={{ textAlign: "center", color: S.err }}>Attorney</div>
            </div>
            {features.map((row, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr",
                gap: 3, padding: "8px 6px", alignItems: "center",
                background: i % 2 === 0 ? "rgba(255,255,255,.03)" : "transparent",
                borderBottom: "1px solid rgba(255,255,255,.05)",
                ...(i === features.length - 1 ? { borderRadius: "0 0 12px 12px" } : {}),
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: S.t2 }}>{row.feature}</div>
                <div style={{ fontSize: 10, textAlign: "center", color: S.ok, fontWeight: 600 }}>{row.us}</div>
                <div style={{ fontSize: 10, textAlign: "center", color: "rgba(255,255,255,.5)" }}>{row.others}</div>
                <div style={{ fontSize: 10, textAlign: "center", color: "rgba(255,255,255,.5)" }}>{row.attorney}</div>
              </div>
            ))}
          </>
        );
      })()}

      {/* Key advantages */}
      <div style={{ marginTop: 16, marginBottom: 16 }}>
        {[
          { icon: "💵", title: "Lowest Price Guaranteed", desc: "We match or beat every major competitor. Our prices are 5% below the lowest market rate — no exceptions." },
          { icon: "🌍", title: "12 Languages — Your Language", desc: "Fill out forms in your native language. We support English, Spanish, Russian, Ukrainian, Polish, French, Portuguese, Haitian Creole, Arabic, Somali, Nepali & Myanmar." },
          { icon: "📬", title: "We Handle Everything", desc: "From form preparation to printing, cover letter, checklist, and mailing to USCIS — you don't have to do anything except answer questions." },
          { icon: "🚀", title: "Start in 5 Minutes, Not 5 Weeks", desc: "No appointments needed. No waiting rooms. No office hours. Start your application right now from your phone — 24/7." },
          { icon: "🛡️", title: "No Hidden Fees Ever", desc: "The price you see is the price you pay. No hourly charges, no consultation fees, no surprise costs. Other services add review fees, rush fees, and extras." },
          { icon: "💳", title: "Pay Your Way", desc: "Credit card, PayPal, Zelle, bank transfer, Apple Pay, or Google Pay — we accept them all. Attorneys usually require checks or wire transfers only." },
        ].map((item, i) => (
          <div key={i} style={{ ...S.crd, padding: 16, cursor: "default", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: S.t2, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* The math — real savings example */}
      <div style={{
        background: "linear-gradient(135deg,rgba(52,211,153,.1),rgba(99,102,241,.1))",
        border: "2px solid rgba(52,211,153,.3)", borderRadius: 16, padding: 20, marginBottom: 16,
      }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12, textAlign: "center" }}>Real Example: Green Card Application</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: S.t2 }}>Attorney (I-485 + I-130 + I-765)</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: S.err }}>$3,500 - $8,000</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: S.t2 }}>Other services (same 3 forms)</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: S.wrn }}>$807 - $2,657</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>ImmIGuide (same 3 forms)</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: S.ok }}>$806.97</span>
        </div>
        <div style={{ borderTop: "2px solid rgba(52,211,153,.3)", paddingTop: 10, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: S.t2 }}>You save up to</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: S.ok }}>$7,193</div>
          <div style={{ fontSize: 11, color: S.t2 }}>compared to an immigration attorney</div>
        </div>
      </div>

      {/* Delivery add-ons */}
      <div style={{ ...S.crd, padding: 20, cursor: "default", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Delivery Options (Add-on)</div>
        {[
          { plan: "Digital PDF", price: "FREE", desc: "Download & print yourself" },
          { plan: "Print & Ship", price: "+$15", desc: "We print and mail to you" },
          { plan: "Full Service", price: "+$25", desc: "We mail everything to USCIS" },
          { plan: "Express", price: "+$50", desc: "Submit to USCIS in 2-3 days" },
        ].map((d, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < 3 ? 10 : 0 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{d.plan}</div>
              <div style={{ fontSize: 11, color: S.t2 }}>{d.desc}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: d.price === "FREE" ? S.ok : "#fff" }}>{d.price}</div>
          </div>
        ))}
      </div>

      {/* Note about USCIS fees */}
      <div style={{
        background: "rgba(251,191,36,.08)", border: "1px solid rgba(251,191,36,.3)",
        borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 12, color: S.wrn, lineHeight: 1.5,
      }}>
        <strong>Note:</strong> USCIS government filing fees are separate and paid directly to USCIS at uscis.gov/pay. These fees are set by the government and are not included in our service pricing or attorney fees shown above.
      </div>

      {/* CTA */}
      <button onClick={() => go("formSelect")} style={S.btn}>
        Start Your Application →
      </button>
    </div>
  );
}
