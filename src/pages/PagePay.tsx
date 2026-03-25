import { useContext, useState, useEffect } from "react";
import { AppCtx } from "../context/AppContext";
import { useValidatePromo } from "../hooks/useApi";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PagePay() {
  const { lang, go, selForm, pkg, setPayTotal, setPromoCode, promoCode, discountPct, setDiscountPct } = useContext(AppCtx) as any;
  const [promo, setPromo] = useState(promoCode || "");
  const [promoOn, setPromoOn] = useState(discountPct > 0);
  const [promoErr, setPromoErr] = useState<string | null>(null);
  const validatePromo = useValidatePromo();

  if (!selForm) return <div style={S.page}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const delPr = pkg==="printShip" ? 15 : pkg==="fullSvc" ? 25 : pkg==="express" ? 50 : 0;
  const delLabel = pkg==="printShip" ? "Print & Ship" : pkg==="fullSvc" ? "Full Service" : pkg==="express" ? "Express" : "Digital PDF";
  const sub = f.fee + delPr;
  const pct = promoOn ? discountPct : 0;
  const disc = sub * pct / 100;
  const tot = sub - disc;

  useEffect(() => { setPayTotal(tot); }, [tot, setPayTotal]);

  const handleApplyPromo = async () => {
    if (!promo.trim()) return;
    setPromoErr(null);
    try {
      const result = await validatePromo.mutateAsync(promo.trim());
      if (result.valid) {
        setPromoOn(true);
        setDiscountPct(result.discountPercent);
        setPromoCode(promo.trim().toUpperCase());
      } else {
        setPromoErr("Invalid promo code");
        setPromoOn(false);
        setDiscountPct(0);
      }
    } catch {
      setPromoErr("Failed to validate");
    }
  };

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "payment")} backTo="preview" />
      <div style={{ ...S.crd, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span>{f.name + " — " + t(lang, "serviceFee")}</span><span style={{ fontWeight:700 }}>{"$" + f.fee}</span></div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span>{delLabel}</span><span style={{ fontWeight:700, color:delPr?S.pri:S.ok }}>{delPr ? "$"+delPr : "FREE"}</span></div>
        {disc > 0 && <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, color:S.ok }}><span>{promoCode || "PROMO"} ({pct}%)</span><span style={{ fontWeight:700 }}>-${disc.toFixed(2)}</span></div>}
        <div style={{ display:"flex", justifyContent:"space-between", paddingTop:8, borderTop:"2px solid "+S.bdr, fontWeight:700, fontSize:18 }}><span>{t(lang, "total")}</span><span>${tot.toFixed(2)}</span></div>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:4 }}>
        <input value={promo} onChange={e => setPromo(e.target.value)} onClick={() => { if (!promo) setPromo("WELCOME10"); }} placeholder={t(lang, "promoCode")} style={{ ...S.inp, flex:1 }} />
        <button disabled={validatePromo.isPending} onClick={handleApplyPromo} style={{ ...S.btn, width:"auto", padding:"10px 16px" }}>
          {validatePromo.isPending ? "..." : t(lang, "apply")}
        </button>
      </div>
      {promoErr && <div style={{ color: S.err, fontSize: 12, marginBottom: 12 }}>{promoErr}</div>}
      {promoOn && <div style={{ color: S.ok, fontSize: 12, marginBottom: 12 }}>Promo applied: {pct}% off</div>}
      <Btn onClick={() => go("paymentOptions")}>{t(lang, "payNow") + " — $" + tot.toFixed(2)}</Btn>
    </div>
  );
}
