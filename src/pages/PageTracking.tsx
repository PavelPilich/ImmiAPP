import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useSavedForms, usePayments } from "../hooks/useApi";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { SOUNDS, ACTION_SOUNDS } from "../lib/sounds";
import { te } from "../data/translationsExtra";

export default function PageTracking() {
  const { lang, caseRef } = useContext(AppCtx) as any;
  const auth = useAuth();
  const { data: savedForms } = useSavedForms(auth.user?.id);
  const { data: payments } = usePayments(auth.user?.id);

  // Derive status from real data if available
  const activeForms = savedForms?.filter((f: any) => f.status !== 'draft') || [];
  const hasPaid = payments && payments.length > 0;

  const latestForm = activeForms[0] as any;
  const subMethod = latestForm?.submission_method || null;
  const isMail = subMethod === 'mail';
  const isDigital = subMethod === 'digital';

  const deriveSteps = () => {
    if (activeForms.length === 0) {
      return [
        { l: t(lang, "stepPayUs") || "Forms Prepared", s:"done" },
        { l: t(lang, "paid") || "Payment Received", s:"done" },
        { l: t(lang, "submitApp") || "Submitted", s:"pending" },
        { l: t(lang, "uscisProcessingStep") || "USCIS Processing", s:"waiting" },
        { l: t(lang, "decisionStep") || "Decision", s:"waiting" },
      ];
    }

    const status = latestForm?.status || 'draft';

    if (isDigital) {
      return [
        { l: t(lang, "stepPayUs") || "Forms Prepared", s: ["docs_pending","paid","submitted","processing","decided"].includes(status) ? "done" : "pending" },
        { l: t(lang, "paid") || "Payment Received", s: hasPaid || ["paid","submitted","processing","decided"].includes(status) ? "done" : "waiting" },
        { l: t(lang, "filedOnUscis") || "Filed on USCIS.gov", s: ["submitted","processing","decided"].includes(status) ? "done" : status === "paid" ? "pending" : "waiting" },
        { l: t(lang, "uscisProcessingStep") || "USCIS Processing", s: ["processing","decided"].includes(status) ? "done" : status === "submitted" ? "pending" : "waiting" },
        { l: t(lang, "decisionStep") || "Decision", s: status === "decided" ? "done" : "waiting" },
      ];
    }

    // Mail flow (default)
    return [
      { l: t(lang, "stepPayUs") || "Forms Prepared", s: ["docs_pending","paid","submitted","processing","decided"].includes(status) ? "done" : "pending" },
      { l: t(lang, "paid") || "Payment Received", s: hasPaid || ["paid","submitted","processing","decided"].includes(status) ? "done" : "waiting" },
      { l: t(lang, "appReceivedByTeam") || "Received by Team", s: ["submitted","processing","decided"].includes(status) ? "done" : status === "paid" ? "pending" : "waiting" },
      { l: t(lang, "printingAndReview") || "Printing & Review", s: ["processing","decided"].includes(status) ? "done" : status === "submitted" ? "pending" : "waiting" },
      { l: t(lang, "mailedToUscis") || "Mailed to USCIS", s: ["processing","decided"].includes(status) ? "done" : "waiting" },
      { l: t(lang, "uscisProcessingStep") || "USCIS Processing", s: ["processing","decided"].includes(status) ? "done" : "waiting" },
      { l: t(lang, "decisionStep") || "Decision", s: status === "decided" ? "done" : "waiting" },
    ];
  };

  const steps = deriveSteps();
  const displayRef = latestForm?.tracking_number || latestForm?.case_reference || caseRef;

  const colors: any = { done:S.ok, pending:S.wrn, waiting:"rgba(147,197,253,.15)" };
  const icons: any  = { done:"✓", pending:"⏳", waiting:"—" };
  const descs: any  = { done: t(lang,"complete") || "Completed", pending: t(lang,"processing") || "In progress", waiting: t(lang,"pending") || "Awaiting" };

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "tracking")} backTo="dashboard" />
      <div style={{ ...S.crd, padding:16, textAlign:"center", marginBottom:16 }}>
        {(isMail || isDigital) && (
          <div style={{
            display:"inline-block", padding:"3px 12px", borderRadius:8, marginBottom:8,
            background: isMail ? "rgba(251,191,36,.15)" : "rgba(52,211,153,.15)",
            border: "1px solid " + (isMail ? "rgba(251,191,36,.4)" : "rgba(52,211,153,.4)"),
            fontSize:11, fontWeight:800, color: isMail ? S.wrn : S.ok, letterSpacing:1,
          }}>{isMail ? ("📦 " + t(lang, "trackingMailBadge")) : ("🌐 " + t(lang, "trackingDigitalBadge"))}</div>
        )}
        <div style={{ fontSize:13, color:S.t2 }}>{t(lang, "trackingNumber") || "Case"}</div>
        <div style={{ fontSize:18, fontWeight:800, color:S.pri, letterSpacing:1, marginTop:4 }}>{displayRef}</div>
      </div>
      {steps.map((x, i) => (
        <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ width:42, height:42, borderRadius:21, background:colors[x.s], display:"flex", alignItems:"center", justifyContent:"center", fontSize:x.s==="done"?18:14, fontWeight:700, color:x.s==="waiting"?"#555":"#fff", border:x.s==="pending"?"2px solid "+S.wrn:"none" }}>{icons[x.s]}</div>
            {i < 4 && <div style={{ width:2, height:32, background:i<1?S.ok:S.bdr, margin:"2px 0" }} />}
          </div>
          <div style={{ paddingBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:14, color:x.s==="waiting"?S.t2:"#fff" }}>{x.l}</div>
            <div style={{ fontSize:12, color:x.s==="pending"?S.wrn:S.t2, marginTop:2 }}>{descs[x.s]}</div>
          </div>
        </div>
      ))}

      {/* Notification sound selector */}
      <NotificationSounds />

      {/* Relax message */}
      <div style={{
        background: "linear-gradient(135deg,rgba(52,211,153,.1),rgba(99,102,241,.08))",
        border: "2px solid rgba(52,211,153,.3)", borderRadius: 20,
        padding: 24, marginTop: 8, marginBottom: 16, textAlign: "center",
      }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>☕</div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
          {te(lang, "trackRelax")}
        </div>
        <div style={{ fontSize: 14, color: S.t2, lineHeight: 1.7, marginBottom: 16 }}>
          {te(lang, "trackRelaxDesc")}
        </div>

        <div style={{ ...S.crd, cursor: "default", padding: 16, textAlign: "left", background: "rgba(0,0,0,.2)", border: "1px solid rgba(52,211,153,.2)" }}>
          {[
            { icon: "✅", text: "Your forms are prepared and reviewed" },
            { icon: "📦", text: "We're packaging everything for USCIS" },
            { icon: "📬", text: "Cover letter and checklist included" },
            { icon: "🚀", text: "Submission happening on schedule" },
            { icon: "📱", text: "We'll notify you of any updates" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: i < 4 ? 8 : 0 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: "#fff" }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 16, padding: 14, borderRadius: 14,
          background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.2)",
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: S.ok, marginBottom: 4 }}>
            {te(lang, "trackFocus")}
          </div>
          <div style={{ fontSize: 12, color: S.t2 }}>
            {te(lang, "relaxNotify")}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationSounds() {
  const { lang } = useContext(AppCtx) as any;
  const [selected, setSelected] = useState(() => localStorage.getItem("immiguide_notif_sound") || "celebration");
  const [playing, setPlaying] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    const sound = SOUNDS.find(s => s.id === id);
    if (sound) {
      setPlaying(id);
      sound.play();
      setTimeout(() => setPlaying(null), 1500);
    }
  };

  const handleSelect = (id: string) => {
    setSelected(id);
    localStorage.setItem("immiguide_notif_sound", id);
    handlePlay(id);
  };

  return (
    <div style={{
      ...S.crd, padding: 20, cursor: "default", marginBottom: 16,
      border: "1.5px solid rgba(52,211,153,.3)", background: "rgba(52,211,153,.05)",
    }}>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{te(lang, "notifSound")}</div>
      <div style={{ fontSize: 12, color: S.t2, marginBottom: 12, lineHeight: 1.5 }}>
        {te(lang, "notifSoundDesc")}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {SOUNDS.map((s) => (
          <div
            key={s.id}
            onClick={() => handleSelect(s.id)}
            style={{
              padding: "10px 12px", borderRadius: 12, cursor: "pointer",
              border: selected === s.id ? "2px solid " + S.ok : "1px solid " + S.bdr,
              background: selected === s.id ? "rgba(52,211,153,.12)" : "rgba(255,255,255,.04)",
              display: "flex", alignItems: "center", gap: 8,
              transition: "all .2s",
              transform: playing === s.id ? "scale(1.03)" : "scale(1)",
            }}
          >
            <span style={{ fontSize: 22 }}>{s.emoji}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: selected === s.id ? S.ok : "#fff" }}>{s.name}</div>
              {playing === s.id && <div style={{ fontSize: 9, color: S.ok }}>Playing...</div>}
            </div>
            {selected === s.id && <span style={{ marginLeft: "auto", color: S.ok, fontSize: 14 }}>✓</span>}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 10, color: S.t2, marginTop: 10, textAlign: "center" }}>
        <strong style={{ color: S.ok }}>{SOUNDS.find(s => s.id === selected)?.name}</strong> — {te(lang, "notifSelected")}
      </div>

      {/* Action Required Sounds */}
      <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: S.wrn }}>{te(lang, "actionSoundTitle")}</div>
        <div style={{ fontSize: 11, color: S.t2, marginBottom: 10, lineHeight: 1.4 }}>
          {te(lang, "actionSoundDesc")}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {ACTION_SOUNDS.map((s) => {
            const isSelected = localStorage.getItem("immiguide_action_sound") === s.id || (!localStorage.getItem("immiguide_action_sound") && s.id === "action_needed");
            return (
              <div
                key={s.id}
                onClick={() => {
                  localStorage.setItem("immiguide_action_sound", s.id);
                  setPlaying(s.id);
                  s.play();
                  setTimeout(() => setPlaying(null), 1500);
                }}
                style={{
                  padding: "10px 12px", borderRadius: 12, cursor: "pointer",
                  border: isSelected ? "2px solid " + S.wrn : "1px solid " + S.bdr,
                  background: isSelected ? "rgba(251,191,36,.12)" : "rgba(255,255,255,.04)",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "all .2s",
                  transform: playing === s.id ? "scale(1.03)" : "scale(1)",
                }}
              >
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: isSelected ? S.wrn : "#fff" }}>{s.name}</div>
                  {playing === s.id && <div style={{ fontSize: 9, color: S.wrn }}>Playing...</div>}
                </div>
                {isSelected && <span style={{ marginLeft: "auto", color: S.wrn, fontSize: 14 }}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
