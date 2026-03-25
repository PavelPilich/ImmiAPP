import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import { te } from "../data/translationsExtra";
import Nav from "../components/layout/Nav";
import { generateFormPdf } from "../lib/pdfGenerator";
import { Btn } from "../components/ui/Button";

function generateReferralCode(caseRef: string) {
  return "REF-" + caseRef.replace("IMG-", "").slice(0, 6);
}

export default function PageDone() {
  const { lang, go, caseRef, user, selForm, fd, pkg } = useContext(AppCtx) as any;
  const [copied, setCopied] = useState(false);
  const referralCode = generateReferralCode(caseRef);
  const referralLink = `https://immiguide.com/ref/${referralCode}`;

  const copyCode = () => {
    navigator.clipboard?.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ ...S.page, textAlign:"center", paddingTop:40 }} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "complete")} backTo="submitConfirm" />
      <div style={{ fontSize:80, marginBottom:8 }}>🎉🎊✨</div>
      <h1 style={{ fontSize:26, marginBottom:8 }}>{t(lang, "complete")}</h1>
      <p style={{ color:S.t2, marginBottom:20 }}>{te(lang, "thankYou")} <strong style={{ color:"#fff", fontSize:18, fontWeight:900, letterSpacing:1 }}>{lang === "ru" ? "ИММИГИД!" : lang === "uk" ? "ІММІГІД!" : "IMMIGUIDE!"}</strong></p>
      {lang === "ru" && (
        <div style={{ background:"rgba(251,191,36,.12)", border:"1px solid rgba(251,191,36,.4)", borderRadius:14, padding:16, marginBottom:16, textAlign:"center" }}>
          <div style={{ fontSize:17, color:"#fbbf24", fontWeight:800, lineHeight:1.5 }}>Сэкономил на кредит потому что ИммиГид!!!</div>
          <div style={{ fontSize:15, color:"#fff", fontWeight:700, marginTop:8 }}>С нами идёшь — дешевле платёж!</div>
        </div>
      )}
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:13, color:S.t2, marginBottom:4 }}>Case Reference</div>
        <div style={{ fontSize:24, fontWeight:800, color:S.pri, letterSpacing:2 }}>{caseRef}</div>
      </div>

      {/* Download PDF */}
      {selForm && (
        <button onClick={() => generateFormPdf({ formName: selForm.name, formId: selForm.id, caseRef, userName: user?.name || "User", userEmail: user?.email || "", fd, fields: selForm.fields, sections: selForm.sections, packageType: pkg })} style={{ ...S.btn, background: "linear-gradient(135deg,#22c55e,#16a34a)", marginBottom: 12 }}>
          Download Your Forms (PDF)
        </button>
      )}

      {/* ═══ REFERRAL PROGRAM ═══ */}
      <div style={{
        background: "linear-gradient(135deg,rgba(52,211,153,.12),rgba(99,102,241,.08))",
        border: "2px solid rgba(52,211,153,.4)", borderRadius: 20,
        padding: 24, marginTop: 16, marginBottom: 16, textAlign: "center",
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎁</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
          {te(lang, "referTitle")}
        </div>
        <div style={{ fontSize: 13, color: S.t2, lineHeight: 1.6, marginBottom: 16 }}>
          {te(lang, "referDesc")}
        </div>

        {/* Referral code display */}
        <div style={{
          background: "rgba(0,0,0,.3)", borderRadius: 14, padding: 16, marginBottom: 12,
        }}>
          <div style={{ fontSize: 11, color: S.t2, marginBottom: 6 }}>{te(lang, "referCode")}</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: S.ok, letterSpacing: 3, marginBottom: 8 }}>
            {referralCode}
          </div>
          <button onClick={copyCode} style={{
            background: copied ? S.ok : "rgba(52,211,153,.2)",
            border: "1.5px solid " + S.ok, borderRadius: 10,
            padding: "8px 24px", color: copied ? "#000" : S.ok,
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            transition: "all .2s",
          }}>
            {copied ? te(lang, "copied") : te(lang, "copyCode")}
          </button>
        </div>

        {/* How it works */}
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{te(lang, "howItWorks")}</div>
          {[
            { step: "1", text: te(lang, "step1") },
            { step: "2", text: te(lang, "step2") },
            { step: "3", text: te(lang, "step3") },
            { step: "4", text: te(lang, "step4") },
            { step: "5", text: te(lang, "step5") },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: i < 3 ? 8 : 0 }}>
              <div style={{
                width: 24, height: 24, borderRadius: 12,
                background: S.ok, color: "#000", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, flexShrink: 0,
              }}>{item.step}</div>
              <span style={{ fontSize: 12, color: "#fff" }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Stacking discount note */}
        <div style={{
          background: "rgba(0,0,0,.2)", borderRadius: 12, padding: 14, marginTop: 12,
          textAlign: "left", border: "1px solid rgba(52,211,153,.2)",
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: S.ok, marginBottom: 6 }}>{te(lang, "stackTitle")}</div>
          <div style={{ fontSize: 11, color: S.t2, lineHeight: 1.6, marginBottom: 8 }}>
            Every friend you refer who <strong style={{ color: "#fff" }}>signs up and becomes a paying client</strong> earns you an additional 5% off.
          </div>
          <div style={{ fontSize: 11, color: "#fff", lineHeight: 1.8 }}>
            Refer 1 client → You save <strong style={{ color: S.ok }}>5%</strong> + they save <strong style={{ color: S.ok }}>5%</strong> = <strong>10% combined</strong>{"\n"}
            <br/>Refer 2 clients → You save <strong style={{ color: S.ok }}>10%</strong> + they each save <strong style={{ color: S.ok }}>5%</strong> = <strong>20% combined</strong>
            <br/>Refer 3 clients → You save <strong style={{ color: S.ok }}>15%</strong> + they each save <strong style={{ color: S.ok }}>5%</strong> = <strong style={{ color: S.ok, fontSize: 13 }}>30% combined!</strong>
          </div>
          <div style={{ fontSize: 11, color: S.wrn, marginTop: 10, fontWeight: 800, textAlign: "center" }}>
            {te(lang, "verifiedOnly")}
</div>
        </div>

        {/* Share buttons */}
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button onClick={() => {
            const text = `Use my code ${referralCode} on ImmIGuide and get an extra 5% off your immigration forms! ${referralLink}`;
            if (navigator.share) {
              navigator.share({ title: "ImmIGuide Referral", text });
            } else {
              navigator.clipboard?.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }
          }} style={{
            ...S.btn, flex: 1, background: "linear-gradient(135deg,#22c55e,#16a34a)",
            boxShadow: "0 4px 15px rgba(34,197,94,.3)", fontSize: 14,
          }}>
            {te(lang, "shareBtn")}
          </button>
        </div>
      </div>

      {/* Relax message */}
      <div style={{
        background: "linear-gradient(135deg,rgba(52,211,153,.1),rgba(99,102,241,.08))",
        border: "2px solid rgba(52,211,153,.3)", borderRadius: 20,
        padding: 24, marginBottom: 16, textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🏖️</div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{te(lang, "relaxTitle")}</div>
        <div style={{ fontSize: 14, color: S.t2, lineHeight: 1.7, marginBottom: 12 }}>
          {te(lang, "relaxDesc")}
        </div>
        <div style={{
          padding: 14, borderRadius: 14,
          background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.2)",
        }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: S.ok }}>
            {te(lang, "relaxQuote")}
          </div>
          <div style={{ fontSize: 12, color: S.t2, marginTop: 4 }}>
            {te(lang, "relaxNotify")}
          </div>
        </div>
      </div>

      <div style={{ display:"flex", gap:12 }}>
        <Btn outline onClick={() => go("tracking")} style={{ flex:1 }}>{t(lang, "tracking")}</Btn>
        <Btn onClick={() => go("dashboard")} style={{ flex:1 }}>{t(lang, "dashboard")}</Btn>
      </div>
    </div>
  );
}
