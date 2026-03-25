import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import UscisWarning from "../components/UscisWarning";

import { USCIS_URLS, USCIS_ONLINE, USCIS_INFO_URLS } from "../lib/uscisFeesSync";

export default function PageWhatsNext() {
  const { lang, go, selForm, pkg, user, uscisConf, setUscisConf } = useContext(AppCtx) as any;
  const [confInput, setConfInput] = useState(uscisConf || "");

  if (!selForm) return <div style={S.page}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const isPdf = pkg === "pdf";
  const isStd = pkg === "printShip" || pkg === "fullSvc";
  const isExp = pkg === "express";
  void (!isPdf && !isStd && !isExp);
  const confirmed = confInput.trim().length >= 4;

  const renderPlanInfo = () => {
    if (isPdf) return (
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>📧</div>
        <h2 style={{ fontSize:18, marginBottom:12 }}>Your Forms Are Ready!</h2>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6 }}>We will email forms to {user.email} within 24 hours.</p>
      </div>
    );
    if (isStd) return (
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>📦</div>
        <h2 style={{ fontSize:18, marginBottom:12 }}>{pkg === "fullSvc" ? "Full Service!" : "We Print and Ship!"}</h2>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6 }}>{pkg === "fullSvc" ? "We mail everything to USCIS within 5-7 days." : "We print and ship within 5-7 days."}</p>
      </div>
    );
    if (isExp) return (
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🚀</div>
        <h2 style={{ fontSize:18, marginBottom:12 }}>Express Service!</h2>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6 }}>We submit to USCIS within 2-3 business days.</p>
      </div>
    );
    return (
      <div style={{ ...S.crd, padding:20, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>📧</div>
        <h2 style={{ fontSize:18, marginBottom:12 }}>Your Forms Are Ready!</h2>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6 }}>We will email forms to {user.email} within 24 hours.</p>
      </div>
    );
  };

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title="What Happens Next" backTo="paymentOptions" />
      {renderPlanInfo()}
      <UscisWarning fee={f.uscis} formId={f.id} large />

      {/* USCIS confirmation gate */}
      <div style={{ background:"rgba(239,68,68,.1)", border:"2px solid #ef4444", borderRadius:16, padding:20, marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <span style={{ fontSize:28 }}>🛑</span>
          <div style={{ fontSize:16, fontWeight:800, color:"#ef4444", lineHeight:1.3 }}>USCIS Fee Payment Required</div>
        </div>
        <p style={{ fontSize:14, color:"#fff", lineHeight:1.6, margin:"0 0 12px", fontWeight:600 }}>
          You must pay the USCIS filing fee of <strong style={{ color:"#ef4444" }}>${Number(f.uscis).toFixed(2)}</strong> for form <strong>{f.name}</strong> before we can proceed.
          {USCIS_ONLINE[f.id] ? " Pay online at " : " See filing instructions at "}
          <a href={USCIS_URLS[f.id] || "https://www.uscis.gov"} target="_blank" rel="noopener" style={{ color:S.acc, fontWeight:800, textDecoration:"underline" }}>
            {USCIS_ONLINE[f.id] ? `Pay ${f.name} Online →` : `${f.name} on USCIS.gov →`}
          </a>
          {", then enter your confirmation number below."}
        </p>
        <label style={{ fontSize:13, fontWeight:700, color:"#fff", display:"block", marginBottom:4 }}>USCIS Payment Confirmation #</label>
        <input value={confInput} onChange={e => setConfInput(e.target.value)} onClick={() => { if (!confInput) setConfInput("USCIS-2026-TEST-001"); }} placeholder="Enter confirmation number…" style={{ ...S.inp, border: confirmed ? "2px solid "+S.ok : "1px solid rgba(239,68,68,.4)", background:"rgba(15,22,50,.8)" }} />
        {!confirmed && confInput.length > 0 && confInput.trim().length < 4 && (
          <div style={{ fontSize:12, color:S.wrn, marginTop:4 }}>Confirmation number must be at least 4 characters</div>
        )}
        {confirmed && (
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:8 }}>
            <span style={{ color:S.ok, fontSize:18 }}>✓</span>
            <span style={{ fontSize:13, color:S.ok, fontWeight:700 }}>Confirmation number entered</span>
          </div>
        )}
      </div>

      <Btn disabled={!confirmed} onClick={() => { setUscisConf(confInput.trim()); go("submitConfirm"); }}>
        {confirmed ? t(lang, "next") + " →" : "Enter USCIS Confirmation # to Continue"}
      </Btn>
    </div>
  );
}
