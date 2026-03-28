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

  // Bug fix: reset promo when form changes
  useEffect(() => {
    setPromo("");
    setPromoOn(false);
    setPromoErr(null);
    setPromoCode("");
    setDiscountPct(0);
  }, [selForm?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!selForm) return <div style={S.page}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const delPr = pkg==="printShip" ? 15 : pkg==="fullSvc" ? 25 : pkg==="express" ? 50 : 0;
  const delLabel = pkg==="printShip" ? t(lang,"printAndShip") : pkg==="fullSvc" ? t(lang,"fullServiceMail") : pkg==="express" ? t(lang,"expressDelivery") : t(lang,"digitalPdf");
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
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "payment")} backTo="formDetail" />
      <div style={{ ...S.crd, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span>{f.name + " — " + t(lang, "serviceFee")}</span><span style={{ fontWeight:700 }}>{"$" + f.fee}</span></div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><span>{delLabel}</span><span style={{ fontWeight:700, color:delPr?S.pri:S.ok }}>{delPr ? "$"+delPr : "FREE"}</span></div>
        {/* TODO: Shipping address form (name, address, city, state, zip) needed for printShip and fullSvc delivery options */}
        {(pkg==="printShip" || pkg==="fullSvc") && (
          <div style={{ ...S.crd, padding:16, marginTop:8, borderLeft:"3px solid #f59e0b" }}>
            <div style={{ fontSize:13, fontWeight:600, color:"#fff", marginBottom:8 }}>Shipping Address</div>
            <input placeholder="Full Name" style={{ ...S.inp, marginBottom:8 }} />
            <input placeholder="Address Line 1" style={{ ...S.inp, marginBottom:8 }} />
            <div style={{ display:"flex", gap:8 }}>
              <input placeholder="City" style={{ ...S.inp, flex:2 }} />
              <input placeholder="State" style={{ ...S.inp, flex:1 }} />
              <input placeholder="ZIP" style={{ ...S.inp, flex:1 }} />
            </div>
            {/* TODO: Wire these inputs to context/state and validate before payment */}
          </div>
        )}
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
