import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";

export default function PageTracking() {
  const { lang, caseRef } = useContext(AppCtx) as any;
  const steps = [
    { l:"Forms Prepared",       s:"done" },
    { l:"Payment Received",     s:"done" },
    { l:"Submitted to USCIS",   s:"pending" },
    { l:"USCIS Processing",     s:"waiting" },
    { l:"Decision",             s:"waiting" },
  ];
  const colors: any = { done:S.ok, pending:S.wrn, waiting:"rgba(147,197,253,.15)" };
  const icons: any  = { done:"✓", pending:"⏳", waiting:"—" };
  const descs: any  = { done:"Completed", pending:"Submitting in 5-7 days", waiting:"Awaiting" };

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "tracking")} backTo="dashboard" />
      <div style={{ ...S.crd, padding:16, textAlign:"center", marginBottom:16 }}>
        <div style={{ fontSize:13, color:S.t2 }}>Case</div>
        <div style={{ fontSize:18, fontWeight:800, color:S.pri, letterSpacing:1, marginTop:4 }}>{caseRef}</div>
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
    </div>
  );
}
