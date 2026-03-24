import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PageSubmitConfirm() {
  const { lang, go, selForm, pkg, uscisConf } = useContext(AppCtx) as any;
  if (!selForm) return <div style={S.page}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const planLabel = pkg==="express" ? "Express Delivery" : pkg==="fullSvc" ? "Full Service (We Mail to USCIS)" : pkg==="printShip" ? "Print & Ship to You" : "Digital PDF Download";

  return (
    <div style={{ ...S.page, textAlign:"center", paddingTop:10 }} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title="Submitting to USCIS" backTo="whatsNext" />
      <div style={{ fontSize:64, marginBottom:8 }}>📬</div>
      <h2 style={{ fontSize:20, marginBottom:12, lineHeight:1.4 }}>We Will Now Submit Your<br /><strong style={{ color:S.pri }}>{f.name}</strong> Application to USCIS</h2>

      <div style={{ ...S.crd, padding:20, textAlign:"left", cursor:"default" }}>
        {[["Form", f.name], ["Delivery Plan", planLabel], ["USCIS Fee ($"+f.uscis+")", "✓ Paid"], ["Confirmation #", uscisConf]].map(([lbl, val]: any, i: number) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom: i<3?10:0 }}>
            <span style={{ color:S.t2, fontSize:14 }}>{lbl}</span>
            <span style={{ fontWeight:700, fontSize:14, color: i===1?S.pri : i===2?S.ok : "#fff", letterSpacing: i===3?1:0 }}>{val}</span>
          </div>
        ))}
      </div>

      <div style={{ ...S.crd, padding:16, cursor:"default", background:"rgba(34,197,94,.1)", border:"1px solid rgba(34,197,94,.3)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}>
          <span style={{ fontSize:24 }}>✅</span>
          <span style={{ fontSize:15, fontWeight:700, color:S.ok }}>Everything is verified and ready!</span>
        </div>
        <p style={{ fontSize:13, color:S.t2, margin:"8px 0 0", lineHeight:1.5 }}>Your application will be submitted to USCIS according to your selected plan.</p>
      </div>

      <Btn onClick={() => go("done")} style={{ marginTop:16 }}>{t(lang, "next") + " →"}</Btn>
    </div>
  );
}
