import { useContext, useState, useEffect } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PagePay() {
  const { lang, go, selForm, pkg, setPayTotal } = useContext(AppCtx) as any;
  const [promo, setPromo] = useState("");
  const [promoOn, setPromoOn] = useState(false);

  if (!selForm) return <div style={S.page}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const delPr = pkg==="printShip" ? 15 : pkg==="fullSvc" ? 25 : pkg==="express" ? 50 : 0;
  const delLabel = pkg==="printShip" ? "Print & Ship" : pkg==="fullSvc" ? "Full Service" : pkg==="express" ? "Express" : "Digital PDF";
  const sub = f.fee + delPr;
  const disc = promoOn ? sub * .1 : 0;
  const tot = sub - disc;

  useEffect(() => { setPayTotal(tot); }, [tot, setPayTotal]);

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "payment")} backTo="preview" />
      <div style={{ ...S.crd, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span>{f.name + " — " + t(lang, "serviceFee")}</span><span style={{ fontWeight:700 }}>{"$" + f.fee}</span></div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span>{delLabel}</span><span style={{ fontWeight:700, color:delPr?S.pri:S.ok }}>{delPr ? "$"+delPr : "FREE"}</span></div>
        {disc > 0 && <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, color:S.ok }}><span>WELCOME10</span><span style={{ fontWeight:700 }}>-${disc.toFixed(2)}</span></div>}
        <div style={{ display:"flex", justifyContent:"space-between", paddingTop:8, borderTop:"2px solid "+S.bdr, fontWeight:700, fontSize:18 }}><span>{t(lang, "total")}</span><span>${tot.toFixed(2)}</span></div>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        <input value={promo} onChange={e => setPromo(e.target.value)} placeholder={t(lang, "promoCode")} style={{ ...S.inp, flex:1 }} />
        <button onClick={() => { if (promo.toUpperCase() === "WELCOME10") setPromoOn(true); }} style={{ ...S.btn, width:"auto", padding:"10px 16px" }}>{t(lang, "apply")}</button>
      </div>
      <Btn onClick={() => go("paymentOptions")}>{t(lang, "payNow") + " — $" + tot.toFixed(2)}</Btn>
    </div>
  );
}
