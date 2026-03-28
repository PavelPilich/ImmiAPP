import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import { USCIS_ONLINE, USCIS_FILE_ONLINE_URLS } from "../lib/uscisFeesSync";
import { useSubmitForm } from "../hooks/useApi";
import {
  generateTrackingNumber,
  buildDigitalDataPackage, formatDataPackageAsText, getFilingMethodLabel,
} from "../lib/submissionRouting";

type Phase = "ready" | "digital-prep" | "digital-confirm" | "sending" | "confirmed";

export default function PageSubmitConfirm() {
  const { lang, go, selForm, pkg, uscisConf, caseRef, fd, savedFormId } = useContext(AppCtx) as any;
  const submitFormMut = useSubmitForm();
  const [phase, setPhase] = useState<Phase>("ready");
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [trackNum, setTrackNum] = useState("");
  const [subMethod, setSubMethod] = useState<"mail" | "digital">("mail");
  const [dataPkg, setDataPkg] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  if (!selForm) return <div style={S.page}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const planLabel = pkg === "express" ? t(lang, "expressDelivery") : pkg === "fullSvc" ? t(lang, "fullServiceMail") : pkg === "printShip" ? t(lang, "printAndShip") : t(lang, "digitalPdf");
  const canFileOnline = USCIS_ONLINE[f.id] === true;
  const fileOnlineUrl = USCIS_FILE_ONLINE_URLS[f.id] || "https://my.uscis.gov/file-a-form";
  const methodLabel = getFilingMethodLabel(f.id, lang);

  /* ── Submit to Supabase ── */
  const doSubmit = async (method: "mail" | "digital", digitalPkg?: Record<string, string>) => {
    const trk = generateTrackingNumber(f.name);
    setTrackNum(trk);
    setSubMethod(method);
    try {
      await submitFormMut.mutateAsync({
        savedFormId: savedFormId || "local-" + Date.now(),
        submissionMethod: method,
        trackingNumber: trk,
        digitalDataPackage: digitalPkg || null,
      });
    } catch (e) {
      // If Supabase is not configured, continue anyway (mock mode)
      console.log("[mock] Submit recorded:", method, trk);
    }
    return trk;
  };

  /* ── MAIL: animated sending ── */
  const handleMailSubmit = async () => {
    setPhase("sending");
    setProgress(0);
    setStepIdx(0);
    setSubMethod("mail");

    await doSubmit("mail");

    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      setProgress(Math.min(p, 100));
      if (p >= 33 && p < 37) setStepIdx(1);
      if (p >= 66 && p < 70) setStepIdx(2);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setPhase("confirmed"), 600);
      }
    }, 120);
  };

  /* ── DIGITAL: show data package ── */
  const handleDigitalPrep = () => {
    const pkg = buildDigitalDataPackage(f.id, fd, f.fields);
    setDataPkg(pkg);
    setSubMethod("digital");
    setPhase("digital-prep");
  };

  /* ── DIGITAL: open portal + submit ── */
  const handleOpenPortal = async () => {
    await doSubmit("digital", dataPkg);
    window.open(fileOnlineUrl, "_blank");
    setPhase("digital-confirm");
  };

  /* ── Copy data to clipboard ── */
  const handleCopy = () => {
    const text = formatDataPackageAsText(dataPkg, f.name);
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  };

  const sendingSteps = [
    t(lang, "verifyingInfo"),
    t(lang, "preparingDocs"),
    t(lang, "sendingToCompany"),
  ];

  // ════════════════════════════════════════
  // PHASE: READY — choose submission method
  // ════════════════════════════════════════
  if (phase === "ready") {
    return (
      <div style={{ ...S.page, textAlign: "center", paddingTop: 10 }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={t(lang, "submitApp")} backTo="preview" />
        <div style={{ fontSize: 64, marginBottom: 8 }}>📬</div>
        <h2 style={{ fontSize: 20, marginBottom: 12, lineHeight: 1.4, color: "#fff" }}>
          {t(lang, "submitApp")}<br /><strong style={{ color: S.pri }}>{f.name}</strong>
        </h2>

        <div style={{ ...S.crd, padding: 20, textAlign: "left", cursor: "default" }}>
          {[
            [t(lang, "form") || "Form", f.name],
            [t(lang, "chooseDelivery") || "Delivery", planLabel],
            [(t(lang, "uscisFee") || "USCIS Fee") + " ($" + Number(f.uscis).toFixed(2) + ")", "✓ " + (t(lang, "paid") || "Paid")],
            [t(lang, "confirmationNumber") || "Confirmation #", uscisConf],
            [t(lang, "caseReference") || "Case Ref", caseRef],
          ].map(([lbl, val], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 4 ? 10 : 0 }}>
              <span style={{ color: "rgba(255,255,255,.6)", fontSize: 14 }}>{lbl}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: i === 2 ? S.ok : "#fff", letterSpacing: i >= 3 ? 1 : 0 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ ...S.crd, padding: 16, cursor: "default", background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <span style={{ fontSize: 24 }}>✅</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: S.ok }}>{t(lang, "allPaymentsComplete")}</span>
          </div>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 16, marginBottom: 10 }}>
          {t(lang, "chooseSubmitMethod")}
        </div>

        {/* Option 1: File Digitally */}
        {canFileOnline && (
          <div style={{ background: "linear-gradient(135deg,rgba(52,211,153,.1),rgba(52,211,153,.05))", border: "2px solid rgba(52,211,153,.4)", borderRadius: 16, padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>🌐</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: S.ok, marginBottom: 4 }}>{t(lang, "fileDigitally")}</div>
            <div style={{ fontSize: 12, color: "#fff", marginBottom: 4, lineHeight: 1.4 }}>{t(lang, "digitalAvailable")}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginBottom: 10 }}>{methodLabel}</div>
            <button onClick={handleDigitalPrep} style={{
              width: "100%", padding: "14px 0", borderRadius: 14, border: "none",
              background: "linear-gradient(135deg,#34d399,#059669)", color: "#fff",
              fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(52,211,153,.4)",
            }}>{"🌐 " + t(lang, "fileDigitally")}</button>
          </div>
        )}

        {/* Option 2: Send Physical Copy */}
        <div style={{
          background: "linear-gradient(135deg,rgba(99,102,241,.1),rgba(99,102,241,.05))",
          border: canFileOnline ? "1px solid rgba(99,102,241,.3)" : "2px solid rgba(99,102,241,.4)",
          borderRadius: 16, padding: 16, marginBottom: 12,
        }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>📦</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{t(lang, "sendPhysically")}</div>
          <div style={{ fontSize: 12, color: "#fff", marginBottom: 10, lineHeight: 1.4 }}>
            {canFileOnline ? t(lang, "willPrintAndSend") : t(lang, "mailOnlyForm")}
          </div>
          <button onClick={handleMailSubmit} style={{
            width: "100%", padding: "14px 0", borderRadius: 14, border: "none",
            background: canFileOnline ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "linear-gradient(135deg,#22c55e,#059669)",
            color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer",
            boxShadow: canFileOnline ? "0 4px 16px rgba(99,102,241,.4)" : "0 4px 16px rgba(34,197,94,.4)",
          }}>{"📦 " + t(lang, "sendPhysically")}</button>
        </div>

        {!canFileOnline && (
          <div style={{ fontSize: 12, color: S.wrn, fontWeight: 600, marginBottom: 8 }}>
            {"⚠️ " + t(lang, "mailOnlyForm")}
          </div>
        )}
      </div>
    );
  }

  // ════════════════════════════════════════
  // PHASE: DIGITAL-PREP — USCIS Filing Guide
  // ════════════════════════════════════════
  if (phase === "digital-prep") {
    const entries = Object.entries(dataPkg);
    return (
      <div style={{ ...S.page, textAlign: "center", paddingTop: 10 }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={t(lang, "digitalCheatSheet")} backTo="submitConfirm" />
        <div style={{ fontSize: 48, marginBottom: 8 }}>📋</div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: S.ok, marginBottom: 4 }}>{t(lang, "digitalCheatSheet")}</h2>
        <p style={{ fontSize: 13, color: "#fff", marginBottom: 16, lineHeight: 1.4 }}>{t(lang, "digitalCheatSheetDesc")}</p>

        {/* Data package table */}
        <div style={{ ...S.crd, padding: 16, textAlign: "left", cursor: "default", maxHeight: 350, overflowY: "auto" }}>
          {entries.map(([label, value], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < entries.length - 1 ? "1px solid rgba(255,255,255,.1)" : "none", gap: 8 }}>
              <span style={{ color: "rgba(255,255,255,.5)", fontSize: 12, flex: 1 }}>{label}</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#fff", flex: 1, textAlign: isRTL ? "left" : "right" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Copy button */}
        <button onClick={handleCopy} style={{
          width: "100%", padding: "12px 0", borderRadius: 12, border: "2px solid " + S.ok, marginTop: 12,
          background: copied ? S.ok : "rgba(52,211,153,.1)", color: copied ? "#000" : S.ok,
          fontSize: 15, fontWeight: 800, cursor: "pointer", transition: "all .2s",
        }}>{copied ? ("✅ " + t(lang, "dataCopied")) : ("📋 " + t(lang, "copyAllData"))}</button>

        {/* Open Portal button */}
        <Btn onClick={handleOpenPortal} style={{ marginTop: 12, background: "linear-gradient(135deg,#34d399,#059669)", boxShadow: "0 4px 20px rgba(52,211,153,.4)" }}>
          {"🌐 " + t(lang, "openUscisPortal")}
        </Btn>
      </div>
    );
  }

  // ════════════════════════════════════════
  // PHASE: DIGITAL-CONFIRM — after opening portal
  // ════════════════════════════════════════
  if (phase === "digital-confirm") {
    return (
      <div style={{ ...S.page, textAlign: "center", paddingTop: 20 }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={t(lang, "appSubmitted")} backTo="dashboard" />
        <div style={{ fontSize: 64, marginBottom: 8 }}>🌐</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: S.ok, marginBottom: 8 }}>{t(lang, "digitalConfirmTitle")}</h2>

        {/* Tracking info */}
        <div style={{
          background: "linear-gradient(135deg,#101a55,#1e2d8f 50%,#101a55)",
          border: "2px solid rgba(52,211,153,.4)", borderRadius: 16, padding: 20, marginBottom: 16,
        }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 8, background: "rgba(52,211,153,.15)", border: "1px solid rgba(52,211,153,.4)", fontSize: 11, fontWeight: 800, color: S.ok, letterSpacing: 1, marginBottom: 8 }}>
            {t(lang, "trackingDigitalBadge")}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 4 }}>{t(lang, "trackingNumber")}</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: S.ok, letterSpacing: 2, fontFamily: "monospace" }}>{trackNum}</div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <Btn onClick={() => setPhase("confirmed")} style={{ flex: 1, background: "linear-gradient(135deg,#34d399,#059669)" }}>
            {"✅ " + t(lang, "digitalConfirmYes")}
          </Btn>
        </div>
        <button onClick={() => setPhase("confirmed")} style={{
          width: "100%", padding: "12px 0", borderRadius: 12, border: "1px solid rgba(255,255,255,.2)",
          background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.6)", fontSize: 14, fontWeight: 600, cursor: "pointer",
        }}>{t(lang, "digitalConfirmNo")}</button>
      </div>
    );
  }

  // ════════════════════════════════════════
  // PHASE: SENDING — mail animated submission
  // ════════════════════════════════════════
  if (phase === "sending") {
    return (
      <div style={{ ...S.page, textAlign: "center", paddingTop: 40 }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={t(lang, "submitApp")} backTo="preview" />
        <div style={{ fontSize: 72, marginBottom: 16, animation: "gf 1.5s ease-in-out infinite" }}>📡</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{sendingSteps[stepIdx]}</h2>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 24 }}>{f.name} — {caseRef}</div>

        <div style={{ width: "80%", margin: "0 auto 24px", background: "rgba(255,255,255,.1)", borderRadius: 8, height: 8, overflow: "hidden" }}>
          <div style={{ width: Math.min(progress, 100) + "%", height: "100%", background: "linear-gradient(90deg,#34d399,#22c55e,#059669)", borderRadius: 8, transition: "width .15s linear" }} />
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: S.ok }}>{Math.min(progress, 100)}%</div>

        <div style={{ marginTop: 24 }}>
          {sendingSteps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 14,
                background: i < stepIdx ? S.ok : i === stepIdx ? "rgba(251,191,36,.2)" : "rgba(255,255,255,.1)",
                border: i === stepIdx ? "2px solid " + S.wrn : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, color: i < stepIdx ? "#fff" : i === stepIdx ? S.wrn : "rgba(255,255,255,.3)",
              }}>{i < stepIdx ? "✓" : i === stepIdx ? "⏳" : "—"}</div>
              <span style={{ fontSize: 14, fontWeight: i === stepIdx ? 700 : 500, color: i < stepIdx ? S.ok : i === stepIdx ? "#fff" : "rgba(255,255,255,.3)" }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════
  // PHASE: CONFIRMED — success + tracking
  // ════════════════════════════════════════
  const isMail = subMethod === "mail";
  const trackingSteps = isMail
    ? [
        { icon: "✅", label: t(lang, "allPaymentsComplete"), status: "done" },
        { icon: "✅", label: t(lang, "appSubmitted"), status: "done" },
        { icon: "✅", label: t(lang, "appReceivedByTeam"), status: "done" },
        { icon: "⏳", label: t(lang, "printingAndReview"), status: "active" },
        { icon: "📬", label: t(lang, "mailedToUscis"), status: "pending" },
        { icon: "🇺🇸", label: t(lang, "uscisProcessingStep"), status: "pending" },
        { icon: "📋", label: t(lang, "decisionStep"), status: "pending" },
      ]
    : [
        { icon: "✅", label: t(lang, "allPaymentsComplete"), status: "done" },
        { icon: "✅", label: t(lang, "appSubmitted"), status: "done" },
        { icon: "✅", label: t(lang, "filedOnUscis"), status: "done" },
        { icon: "⏳", label: t(lang, "uscisProcessingStep"), status: "active" },
        { icon: "📋", label: t(lang, "decisionStep"), status: "pending" },
      ];

  return (
    <div style={{ ...S.page, textAlign: "center", paddingTop: 10 }} dir={isRTL ? "rtl" : "ltr"}>
      <Nav title={t(lang, "appSubmitted")} backTo="dashboard" />
      <div style={{ fontSize: 72, marginBottom: 8 }}>🎉</div>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: S.ok, marginBottom: 4 }}>{t(lang, "appSubmitted")}</h2>
      <p style={{ fontSize: 14, color: "#fff", marginBottom: 16 }}>{t(lang, "appReceivedByTeam")}</p>

      {/* Method badge + Tracking */}
      <div style={{
        background: "linear-gradient(135deg,#101a55,#1e2d8f 50%,#101a55)",
        border: "2px solid rgba(52,211,153,.4)", borderRadius: 16, padding: 20, marginBottom: 16,
      }}>
        <div style={{
          display: "inline-block", padding: "4px 14px", borderRadius: 8, marginBottom: 10,
          background: isMail ? "rgba(251,191,36,.15)" : "rgba(52,211,153,.15)",
          border: "1px solid " + (isMail ? "rgba(251,191,36,.4)" : "rgba(52,211,153,.4)"),
          fontSize: 11, fontWeight: 800, color: isMail ? S.wrn : S.ok, letterSpacing: 1,
        }}>{isMail ? ("📦 " + t(lang, "trackingMailBadge")) : ("🌐 " + t(lang, "trackingDigitalBadge"))}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginBottom: 4 }}>{t(lang, "trackingNumber")}</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: S.ok, letterSpacing: 2, fontFamily: "monospace", padding: "8px 14px", background: "rgba(52,211,153,.1)", borderRadius: 10, border: "1px solid rgba(52,211,153,.3)", display: "inline-block" }}>{trackNum}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 8 }}>Case: {caseRef}</div>
      </div>

      {/* Summary */}
      <div style={{ ...S.crd, padding: 16, textAlign: "left", cursor: "default", marginBottom: 16 }}>
        {[
          [t(lang, "form") || "Form", f.name],
          [t(lang, "chooseDelivery") || "Delivery", planLabel],
          [t(lang, "confirmationNumber"), uscisConf],
          [t(lang, "trackingNumber"), trackNum],
        ].map(([lbl, val], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 3 ? 10 : 0 }}>
            <span style={{ color: "rgba(255,255,255,.6)", fontSize: 13 }}>{lbl}</span>
            <span style={{ fontWeight: 700, fontSize: 13, color: i === 3 ? S.ok : "#fff", letterSpacing: i >= 2 ? 1 : 0 }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Tracking timeline */}
      <div style={{ background: "linear-gradient(135deg,#101a55,#1e2d8f 50%,#101a55)", border: "1px solid rgba(100,130,255,.3)", borderRadius: 16, padding: 16, marginBottom: 16, textAlign: "left" }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 14, textAlign: "center" }}>
          {"📦 " + (t(lang, "tracking") || "Tracking")}
        </div>
        {trackingSteps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: i < trackingSteps.length - 1 ? 10 : 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 16, flexShrink: 0,
              background: step.status === "done" ? S.ok : step.status === "active" ? "rgba(251,191,36,.2)" : "rgba(255,255,255,.08)",
              border: step.status === "active" ? "2px solid " + S.wrn : "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: step.status === "done" ? 14 : 16,
              color: step.status === "done" ? "#fff" : step.status === "active" ? S.wrn : "rgba(255,255,255,.3)",
            }}>{step.status === "done" ? "✓" : step.icon}</div>
            <span style={{
              fontSize: 13, fontWeight: step.status === "active" ? 700 : 500,
              color: step.status === "done" ? S.ok : step.status === "active" ? "#fff" : "rgba(255,255,255,.4)",
            }}>{step.label}</span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 12 }}>
        <Btn outline onClick={() => go("tracking")} style={{ flex: 1 }}>{"📦 " + t(lang, "viewTracking")}</Btn>
        <Btn onClick={() => go("done")} style={{ flex: 1 }}>{t(lang, "next") + " →"}</Btn>
      </div>
    </div>
  );
}
