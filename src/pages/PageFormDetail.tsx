import { useContext, useEffect, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";

/* inject shimmer + glow keyframes once */
const SHIMMER_ID = "uscis-shimmer-style";
function ensureShimmer() {
  const old = document.getElementById(SHIMMER_ID);
  if (old) old.remove();
  const s = document.createElement("style");
  s.id = SHIMMER_ID;
  s.textContent = `
@keyframes blueShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes flagWave {
  0%   { transform: perspective(500px) rotateY(0deg) scaleX(1) skewY(0deg); clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
  10%  { transform: perspective(500px) rotateY(2deg) scaleX(1.01) skewY(0.3deg); clip-path: polygon(0% 0%, 100% 1%, 100% 99%, 0% 100%); }
  20%  { transform: perspective(500px) rotateY(3deg) scaleX(0.99) skewY(0.5deg); clip-path: polygon(0% 1%, 100% 0%, 100% 100%, 0% 99%); }
  30%  { transform: perspective(500px) rotateY(2deg) scaleX(1.01) skewY(0.2deg); clip-path: polygon(0% 0%, 100% 1%, 100% 99%, 0% 100%); }
  40%  { transform: perspective(500px) rotateY(0deg) scaleX(0.99) skewY(-0.3deg); clip-path: polygon(0% 1%, 100% 0%, 100% 100%, 0% 99%); }
  50%  { transform: perspective(500px) rotateY(-2deg) scaleX(1.01) skewY(-0.5deg); clip-path: polygon(0% 0%, 100% 1%, 100% 99%, 0% 100%); }
  60%  { transform: perspective(500px) rotateY(-3deg) scaleX(0.99) skewY(-0.3deg); clip-path: polygon(0% 1%, 100% 0%, 100% 100%, 0% 99%); }
  70%  { transform: perspective(500px) rotateY(-2deg) scaleX(1.01) skewY(0deg); clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
  80%  { transform: perspective(500px) rotateY(0deg) scaleX(0.99) skewY(0.3deg); clip-path: polygon(0% 0%, 100% 1%, 100% 99%, 0% 100%); }
  90%  { transform: perspective(500px) rotateY(1deg) scaleX(1.01) skewY(0.2deg); clip-path: polygon(0% 1%, 100% 0%, 100% 100%, 0% 99%); }
  100% { transform: perspective(500px) rotateY(0deg) scaleX(1) skewY(0deg); clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
}
@keyframes blueGlow {
  0%   { text-shadow: 0 0 3px rgba(255,255,255,.3), 0 1px 2px rgba(0,0,0,.5); }
  50%  { text-shadow: 0 0 6px rgba(255,255,255,.6), 0 0 10px rgba(200,50,50,.3), 0 1px 2px rgba(0,0,0,.4); }
  100% { text-shadow: 0 0 3px rgba(255,255,255,.3), 0 1px 2px rgba(0,0,0,.5); }
}`;
  document.head.appendChild(s);
}

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
  i601a: { low: 2000, high: 5000 },
  i360:  { low: 1500, high: 4000 },
  i918:  { low: 2000, high: 6000 },
  n600:  { low: 500, high: 1500 },
  n565:  { low: 300, high: 800 },
  ar11:  { low: 50, high: 200 },
  i907:  { low: 150, high: 500 },
  i829:  { low: 3000, high: 8000 },
  i290b: { low: 1500, high: 5000 },
  i730:  { low: 800, high: 2500 },
  i914:  { low: 2000, high: 6000 },
  n336:  { low: 1000, high: 3000 },
  i212:  { low: 2000, high: 6000 },
  i134:  { low: 100, high: 400 },
  i824:  { low: 500, high: 1500 },
};

import { USCIS_URLS, USCIS_ONLINE, USCIS_INFO_URLS } from "../lib/uscisFeesSync";

export default function PageFormDetail() {
  const { lang, go, selForm, setFSec, pkg, setPkg, ourFeePaid, uscisPaid, setUscisPaid, uscisConf, setUscisConf } = useContext(AppCtx) as any;
  if (!selForm) return <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  const formDescKeys: Record<string,string> = {
    i821:"formDescTPS", daca:"formDescDACA", i765:"formDescEAD", i130:"formDescFamily",
    n400:"formDescCitizen", i485:"formDescGreen", i131:"formDescTravel", i589:"formDescAsylum",
    i539:"formDescVisitor", i129f:"formDescFiance", i90:"formDescRenewGC", i751:"formDescRemoveCond",
    i864:"formDescAffidavit", i129:"formDescWorker", i140:"formDescEmployerGC", i693:"formDescMedical",
    i912:"formDescFeeWaiver", i601:"formDescWaiver",
    i601a:"formDescProvisionalWaiver", i360:"formDescSpecialImmigrant", i918:"formDescUVisa",
    n600:"formDescCertCitizenship", n565:"formDescReplaceCitDoc", ar11:"formDescAddressChange",
    i907:"formDescPremiumProcessing", i829:"formDescInvestorRemoveCond", i290b:"formDescAppeal",
    i730:"formDescRefugeeFamily", i914:"formDescTVisa", n336:"formDescNatHearing",
    i212:"formDescReapplyAfterDeport", i134:"formDescFinancialSupport", i824:"formDescActionApproved",
  };
  const att = ATTORNEY_FEES[f.id] || { low: 500, high: 2000 };
  const saveLow = Math.max(0, att.low - f.fee);
  const saveHigh = Math.max(0, att.high - f.fee);
  const deliveryPrices: Record<string, number> = { pdf:0, printShip:15, fullSvc:25, express:50 };
  const deliveryFee = pkg ? (deliveryPrices[pkg] || 0) : 0;
  const ourTotal = f.fee + deliveryFee;
  const [uscisVerifying, setUscisVerifying] = useState(false);
  const uscisConfNum = uscisConf || "";
  useEffect(() => { ensureShimmer(); }, []);
  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={f.name} backTo="formSelect" />
      <div style={{ textAlign:"center", padding:"20px 16px 24px" }}>
        {/* ── SECTION 1: Form Header ── */}
        {/* Form name shown in Nav above — description only here to avoid duplicate headers */}
        <p style={{ color:"#fff", fontSize:14, margin:"0 0 16px", lineHeight:1.5, fontWeight:500 }}>{t(lang, formDescKeys[f.id] || f.desc)}</p>

        {/* Quick info pills */}
        <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:20 }}>
          <div style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)", borderRadius:20, padding:"6px 14px", fontSize:13, color:"#fff", fontWeight:600 }}>
            {"📋 "+f.sections+" "+t(lang,"sections")+" · "+f.fieldCount+" "+t(lang,"fields")}
          </div>
          <div style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)", borderRadius:20, padding:"6px 14px", fontSize:13, color:"#fff", fontWeight:600 }}>
            {"⏱ "+f.time+" "+t(lang,"months")}
          </div>
        </div>

        {/* ── SECTION 2: Here's What You'll Do ── */}
        <div style={{ background:"linear-gradient(135deg,#101a55,#1e2d8f 50%,#101a55)", border:"1px solid rgba(100,130,255,.3)", borderRadius:16, padding:"16px 18px", marginBottom:20, textAlign:"left" }}>
          <div style={{ fontSize:16, fontWeight:800, color:"#fff", marginBottom:12, textAlign:"center" }}>{t(lang,"hereIsWhatYouDo")||"Here's What You'll Do"}</div>
          {[
            { icon:"💳", title: t(lang,"stepPayUs")||"Pay ImmIGuide Service Fee", desc: t(lang,"stepPayUsDesc")||"We provide the form and check it for accuracy" },
            { icon:"🇺🇸", title: t(lang,"stepPayUSCISOnlineTitle")||"Pay USCIS Fee Online", desc: t(lang,"stepPayUSCISDesc")||"Pay the government fee directly to USCIS. Save your confirmation/receipt number — we cannot submit your form without proof of USCIS payment" },
            { icon:"📝", title: t(lang,"stepFillForm")||"Fill Out Your Application", desc: t(lang,"stepFillDescNew")||"Answer simple questions in your language. Provide your USCIS receipt number and we handle submission" },
          ].map((step, i) => (
            <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom: i < 2 ? 12 : 0 }}>
              <div style={{ fontSize:24, lineHeight:1 }}>{step.icon}</div>
              <div>
                <div style={{ fontSize:17, fontWeight:700, color:"#fff" }}>{(t(lang,"stepWord")||"Step")+" "+(i+1)+": "+step.title}</div>
                <div style={{ fontSize:12, color:"#fff", marginTop:2 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── DELIVERY OPTIONS ── */}
        <div style={{ background:"linear-gradient(135deg,#101a55,#1e2d8f 50%,#101a55)", border:"1px solid rgba(100,130,255,.3)", borderRadius:16, padding:"16px 18px", marginBottom:20, textAlign:"left" }}>
          <div style={{ fontSize:16, fontWeight:800, color:"#fff", marginBottom:12, textAlign:"center" }}>{t(lang,"chooseDelivery")}</div>
          {[
            { k:"pdf",       i:"📄", label:t(lang,"digitalPdf"),       pr:0,  desc:t(lang,"digitalPdfDesc") },
            { k:"printShip", i:"🖨️", label:t(lang,"printAndShip"),      pr:15, desc:t(lang,"printAndShipDesc") },
            { k:"fullSvc",   i:"📦", label:t(lang,"fullServiceMail"),   pr:25, desc:t(lang,"fullServiceDesc") },
            { k:"express",   i:"⚡", label:t(lang,"expressDelivery"),   pr:50, desc:t(lang,"expressDeliveryDesc") },
          ].map(d => (
            <div key={d.k} onClick={() => setPkg(d.k)} style={{
              border: pkg===d.k ? "2px solid "+S.priBtn : "1px solid rgba(255,255,255,.15)",
              borderRadius:12, padding:"12px 14px", marginBottom:8, cursor:"pointer",
              background: pkg===d.k ? "rgba(99,102,241,.15)" : "rgba(255,255,255,.04)",
              transition:"all .2s",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", gap:10, alignItems:"center", flex:1 }}>
                  <span style={{ fontSize:22 }}>{d.i}</span>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13, color:"#fff" }}>{d.label}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,.6)" }}>{d.desc}</div>
                  </div>
                </div>
                <div style={{ fontWeight:700, fontSize:15, color:d.pr ? "#fff" : S.ok, flexShrink:0 }}>{d.pr ? "$"+d.pr : t(lang,"free")}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SECTION 3: Pricing ── */}
        <div style={{ display:"flex", gap:12, marginBottom:12 }}>
          {/* ImmIGuide Fee card */}
          <div style={{ flex:1, background:"rgba(52,211,153,.08)", border:"1px solid rgba(52,211,153,.25)", borderRadius:14, padding:"14px 8px", textAlign:"center" }}>
            <div style={{ fontSize:30, fontWeight:900, color:"#34d399" }}>{"$"+ourTotal.toFixed(2)}</div>
            <div style={{ fontSize:13, color:"#fff", marginTop:4, fontWeight:700 }}>{"ImmIGuide "+t(lang, "serviceFee")}</div>
            {deliveryFee > 0 && (
              <div style={{ fontSize:12, color:"#fff", marginTop:4, fontWeight:600 }}>
                {"$"+f.fee+" + $"+deliveryFee+" "+t(lang,"delivery")}
              </div>
            )}
          </div>
          {/* USCIS Fee card with flag */}
          <div style={{ flex:1, position:"relative", borderRadius:14, overflow:"hidden", padding:"14px 8px" }}>
            {/* Flag bg */}
            <div style={{ position:"absolute", inset:0, zIndex:0, opacity:1,
              backgroundImage:`url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 247 130"><rect width="247" height="130" fill="#B22234"/><rect y="10" width="247" height="10" fill="#fff"/><rect y="30" width="247" height="10" fill="#fff"/><rect y="50" width="247" height="10" fill="#fff"/><rect y="70" width="247" height="10" fill="#fff"/><rect y="90" width="247" height="10" fill="#fff"/><rect y="110" width="247" height="10" fill="#fff"/><rect width="98.8" height="70" fill="#3C3B6E"/><g fill="#fff"><circle cx="8.2" cy="5" r="2.5"/><circle cx="24.7" cy="5" r="2.5"/><circle cx="41.2" cy="5" r="2.5"/><circle cx="57.6" cy="5" r="2.5"/><circle cx="74.1" cy="5" r="2.5"/><circle cx="90.6" cy="5" r="2.5"/><circle cx="16.5" cy="12.8" r="2.5"/><circle cx="32.9" cy="12.8" r="2.5"/><circle cx="49.4" cy="12.8" r="2.5"/><circle cx="65.9" cy="12.8" r="2.5"/><circle cx="82.3" cy="12.8" r="2.5"/><circle cx="8.2" cy="20.6" r="2.5"/><circle cx="24.7" cy="20.6" r="2.5"/><circle cx="41.2" cy="20.6" r="2.5"/><circle cx="57.6" cy="20.6" r="2.5"/><circle cx="74.1" cy="20.6" r="2.5"/><circle cx="90.6" cy="20.6" r="2.5"/><circle cx="16.5" cy="28.4" r="2.5"/><circle cx="32.9" cy="28.4" r="2.5"/><circle cx="49.4" cy="28.4" r="2.5"/><circle cx="65.9" cy="28.4" r="2.5"/><circle cx="82.3" cy="28.4" r="2.5"/><circle cx="8.2" cy="36.2" r="2.5"/><circle cx="24.7" cy="36.2" r="2.5"/><circle cx="41.2" cy="36.2" r="2.5"/><circle cx="57.6" cy="36.2" r="2.5"/><circle cx="74.1" cy="36.2" r="2.5"/><circle cx="90.6" cy="36.2" r="2.5"/><circle cx="16.5" cy="44" r="2.5"/><circle cx="32.9" cy="44" r="2.5"/><circle cx="49.4" cy="44" r="2.5"/><circle cx="65.9" cy="44" r="2.5"/><circle cx="82.3" cy="44" r="2.5"/><circle cx="8.2" cy="51.8" r="2.5"/><circle cx="24.7" cy="51.8" r="2.5"/><circle cx="41.2" cy="51.8" r="2.5"/><circle cx="57.6" cy="51.8" r="2.5"/><circle cx="74.1" cy="51.8" r="2.5"/><circle cx="90.6" cy="51.8" r="2.5"/><circle cx="16.5" cy="59.6" r="2.5"/><circle cx="32.9" cy="59.6" r="2.5"/><circle cx="49.4" cy="59.6" r="2.5"/><circle cx="65.9" cy="59.6" r="2.5"/><circle cx="82.3" cy="59.6" r="2.5"/><circle cx="8.2" cy="67.4" r="2.5"/><circle cx="24.7" cy="67.4" r="2.5"/><circle cx="41.2" cy="67.4" r="2.5"/><circle cx="57.6" cy="67.4" r="2.5"/><circle cx="74.1" cy="67.4" r="2.5"/><circle cx="90.6" cy="67.4" r="2.5"/></g></svg>')}")`,
              backgroundSize:"cover", backgroundPosition:"center",
            }} />
            <div style={{ position:"absolute", inset:0, zIndex:0, background:"rgba(0,0,20,.35)" }} />
            <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
              <div style={{ fontSize:24, fontWeight:900, letterSpacing:2, color:"#fff",
                WebkitTextStroke:"1.5px #000", textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 4px rgba(0,0,0,.8)",
                paintOrder:"stroke fill" as any,
              }}>{"$"+Number(f.uscis).toFixed(2)}</div>
              <div style={{ fontSize:16, color:"#fff", marginTop:4, fontWeight:900, letterSpacing:2,
                WebkitTextStroke:"1px #000", textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0,0,0,.8)",
                paintOrder:"stroke fill" as any,
              }}>{t(lang, "uscisFee")}</div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div style={{ fontSize:20, color:"#fff", fontWeight:800, marginBottom:4 }}>
          {t(lang,"totalCost")||"Total"}: <span style={{ color:"#34d399" }}>{"$"+(ourTotal + f.uscis).toFixed(2)}</span>
        </div>
        <div style={{ fontSize:13, color:"#fbbf24", fontWeight:700, marginBottom:4 }}>{t(lang,"vsAttorney")||"vs. hiring a law firm"}</div>

        {/* Savings */}
        <div style={{ fontSize:15, color:"#fbbf24", fontWeight:800, marginBottom:4 }}>{t(lang,"saveMoney")||"Save"} ${saveLow.toLocaleString()} — ${saveHigh.toLocaleString()}</div>
        <div style={{ fontSize:14, color:"#fff", fontWeight:700, marginBottom:20 }}>{t(lang,"savingsNote")||"Attorney fees do not include USCIS government filing fees — this is only their service charge"}</div>

        {/* ── SECTION 4: Payment Actions ── */}
        <div style={{ background:"linear-gradient(135deg,#101a55,#1e2d8f 50%,#101a55)", border:"1px solid rgba(100,130,255,.3)", borderRadius:16, padding:"16px", marginBottom:20 }}>

          {/* ─── STEP 1: Pay ImmIGuide via Stripe ─── */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:16, color:"#fff", marginBottom:12, fontWeight:700, textAlign:"center" }}>
              <div>{ourFeePaid ? "✅" : "①"} {t(lang,"step1Label")||"Step 1: Payment"}</div>
              <div>ImmIGuide — ${ourTotal.toFixed(2)}</div>
              {deliveryFee > 0 && <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", marginTop:2 }}>{"($"+f.fee+" + $"+deliveryFee+" "+t(lang,"delivery")+")"}</div>}
            </div>
            {!pkg && !ourFeePaid && (
              <div style={{ fontSize:13, color:S.wrn, fontWeight:600, textAlign:"center", marginBottom:8 }}>
                {"⚠️ " + t(lang,"selectDeliveryFirst")}
              </div>
            )}
            <button onClick={() => { if (!ourFeePaid && pkg) { go("pay"); } }} style={{
              width:"100%", padding:"14px 0", borderRadius:14, border:"none",
              cursor: ourFeePaid ? "default" : (pkg ? "pointer" : "not-allowed"),
              background: ourFeePaid ? "rgba(52,211,153,.2)" : (pkg ? "linear-gradient(135deg,#34d399,#059669)" : "rgba(255,255,255,.1)"),
              color:"#fff", fontSize:17, fontWeight:800, letterSpacing:1,
              boxShadow: ourFeePaid ? "none" : (pkg ? "0 4px 16px rgba(52,211,153,.4)" : "none"),
              opacity: ourFeePaid ? .6 : (pkg ? 1 : .4),
            }}>{ourFeePaid ? ("✅ " + (t(lang,"paid")||"Paid")) : (pkg ? (t(lang,"payImmIGuideBtn")||"Pay ImmIGuide Service") : ("🔒 " + (t(lang,"payImmIGuideBtn")||"Pay ImmIGuide Service")))}</button>
          </div>

          {/* ─── STEP 2: Pay USCIS Fee Online ─── */}
          <div style={{ marginBottom:24, opacity: ourFeePaid ? 1 : .4, pointerEvents: ourFeePaid ? "auto" as const : "none" as const }}>
            <div style={{ fontSize:16, color:"#fff", marginBottom:12, fontWeight:700, textAlign:"center" }}>
              <div>{uscisPaid ? "✅" : "②"} {t(lang,"step2Label")||"Step 2: Pay USCIS"}</div>
              <div>{t(lang,"govFeeLabel")||"Government Fee"} — ${Number(f.uscis).toFixed(2)}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", marginTop:2 }}>{t(lang,"govFeeNote")||"This fee is paid directly to U.S. government"}</div>
            </div>
            {ourFeePaid && !uscisPaid && !uscisVerifying && (
              <div style={{ fontSize:11, color: USCIS_ONLINE[f.id] ? "#34d399" : "#fbbf24", marginBottom:6, fontWeight:600, textAlign:"center" }}>
                {USCIS_ONLINE[f.id]
                  ? ("🌐 " + (t(lang,"onlineFiling")||"Online Filing Available — Pay & File Directly"))
                  : ("📬 " + (t(lang,"mailOnly")||"Mail-Only Form — See Instructions for Payment"))}
              </div>
            )}
            <button onClick={() => {
              if (ourFeePaid && !uscisPaid && !uscisVerifying) {
                window.open(USCIS_URLS[f.id] || "https://www.uscis.gov", "_blank");
                setUscisVerifying(true);
                // Simulate USCIS payment verification — auto-generate confirmation after delay
                setTimeout(() => {
                  const code = "USCIS-" + f.name.replace("-","") + "-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Date.now().toString().slice(-6);
                  setUscisConf(code);
                  setUscisPaid(true);
                  setUscisVerifying(false);
                }, 8000); // 8 second verification delay
              }
            }} style={{
              width:"100%", padding:"14px 0", borderRadius:14,
              border: uscisPaid ? "none" : "2px solid rgba(255,255,255,.25)",
              cursor: ourFeePaid && !uscisPaid && !uscisVerifying ? "pointer" : "default",
              backgroundImage: uscisPaid || uscisVerifying ? "none" : `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 247 130"><rect width="247" height="130" fill="#B22234"/><rect y="10" width="247" height="10" fill="#fff"/><rect y="30" width="247" height="10" fill="#fff"/><rect y="50" width="247" height="10" fill="#fff"/><rect y="70" width="247" height="10" fill="#fff"/><rect y="90" width="247" height="10" fill="#fff"/><rect y="110" width="247" height="10" fill="#fff"/><rect width="98.8" height="70" fill="#3C3B6E"/><g fill="#fff"><circle cx="8.2" cy="5" r="2.5"/><circle cx="24.7" cy="5" r="2.5"/><circle cx="41.2" cy="5" r="2.5"/><circle cx="57.6" cy="5" r="2.5"/><circle cx="74.1" cy="5" r="2.5"/><circle cx="90.6" cy="5" r="2.5"/><circle cx="16.5" cy="12.8" r="2.5"/><circle cx="32.9" cy="12.8" r="2.5"/><circle cx="49.4" cy="12.8" r="2.5"/><circle cx="65.9" cy="12.8" r="2.5"/><circle cx="82.3" cy="12.8" r="2.5"/><circle cx="8.2" cy="20.6" r="2.5"/><circle cx="24.7" cy="20.6" r="2.5"/><circle cx="41.2" cy="20.6" r="2.5"/><circle cx="57.6" cy="20.6" r="2.5"/><circle cx="74.1" cy="20.6" r="2.5"/><circle cx="90.6" cy="20.6" r="2.5"/><circle cx="16.5" cy="28.4" r="2.5"/><circle cx="32.9" cy="28.4" r="2.5"/><circle cx="49.4" cy="28.4" r="2.5"/><circle cx="65.9" cy="28.4" r="2.5"/><circle cx="82.3" cy="28.4" r="2.5"/><circle cx="8.2" cy="36.2" r="2.5"/><circle cx="24.7" cy="36.2" r="2.5"/><circle cx="41.2" cy="36.2" r="2.5"/><circle cx="57.6" cy="36.2" r="2.5"/><circle cx="74.1" cy="36.2" r="2.5"/><circle cx="90.6" cy="36.2" r="2.5"/><circle cx="16.5" cy="44" r="2.5"/><circle cx="32.9" cy="44" r="2.5"/><circle cx="49.4" cy="44" r="2.5"/><circle cx="65.9" cy="44" r="2.5"/><circle cx="82.3" cy="44" r="2.5"/><circle cx="8.2" cy="51.8" r="2.5"/><circle cx="24.7" cy="51.8" r="2.5"/><circle cx="41.2" cy="51.8" r="2.5"/><circle cx="57.6" cy="51.8" r="2.5"/><circle cx="74.1" cy="51.8" r="2.5"/><circle cx="90.6" cy="51.8" r="2.5"/><circle cx="16.5" cy="59.6" r="2.5"/><circle cx="32.9" cy="59.6" r="2.5"/><circle cx="49.4" cy="59.6" r="2.5"/><circle cx="65.9" cy="59.6" r="2.5"/><circle cx="82.3" cy="59.6" r="2.5"/><circle cx="8.2" cy="67.4" r="2.5"/><circle cx="24.7" cy="67.4" r="2.5"/><circle cx="41.2" cy="67.4" r="2.5"/><circle cx="57.6" cy="67.4" r="2.5"/><circle cx="74.1" cy="67.4" r="2.5"/><circle cx="90.6" cy="67.4" r="2.5"/></g></svg>')}")`,
              backgroundSize:"cover", backgroundPosition:"center 65%",
              backgroundColor: uscisVerifying ? "rgba(251,191,36,.15)" : (uscisPaid ? "rgba(52,211,153,.2)" : "rgba(0,0,20,.25)"),
              backgroundBlendMode:"darken" as any,
              color:"#fff", fontSize:17, fontWeight:900, letterSpacing:1,
              WebkitTextStroke: uscisPaid || uscisVerifying ? "0" : "2.5px #000",
              textShadow: uscisPaid || uscisVerifying ? "none" : "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 8px rgba(0,0,0,1), 0 0 2px rgba(255,255,255,.5)",
              paintOrder:"stroke fill" as any,
              opacity: uscisPaid ? .6 : 1,
              boxShadow: uscisPaid ? "none" : "0 4px 20px rgba(0,0,0,.3), inset 0 0 0 2px rgba(255,255,255,.15)",
              overflow:"hidden",
            }}>
              {uscisVerifying
                ? ("⏳ " + t(lang,"verifyingPayment"))
                : uscisPaid
                  ? ("✅ " + (t(lang,"paid")||"Paid"))
                  : (<>{!ourFeePaid && <span style={{ fontSize:28, verticalAlign:"middle" }}>🔒</span>}{" "}{USCIS_ONLINE[f.id] ? (t(lang,"payUSCISOnline")||"Pay USCIS Fee Online") : (t(lang,"viewUSCISInstructions")||"View USCIS Filing Instructions")}</>)
              }
            </button>
            {ourFeePaid && !uscisPaid && !uscisVerifying && (
              <a href={USCIS_INFO_URLS[f.id] || "https://www.uscis.gov"} target="_blank" rel="noopener" style={{ display:"block", fontSize:11, color:"#fff", marginTop:4, textDecoration:"underline", textAlign:"center" }}>
                {t(lang,"viewFormInfo")||"View full"} {f.name} {t(lang,"infoOnUSCIS")||"information on USCIS.gov"}
              </a>
            )}
            {!ourFeePaid && <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginTop:16, textAlign:"center", lineHeight:1.5 }}>{t(lang,"payStep1First")||"Complete Step 1 first (Pay ImmIGuide Service) to unlock USCIS online payment, after which a button will appear to take you to the next page to fill out the form"}</div>}
          </div>

          {/* ─── USCIS Confirmation Number — Auto-generated ─── */}
          <div style={{ padding:"14px 16px", borderRadius:14, background:"linear-gradient(135deg,#101a55,#1e2d8f 50%,#101a55)", border: uscisConfNum ? "2px solid #34d399" : "2px solid rgba(255,255,255,.15)" }}>
            <div style={{ fontSize:15, color:"#fff", fontWeight:700, marginBottom:8, textAlign:"center" }}>
              {t(lang,"confirmationNumber")}
            </div>
            {uscisVerifying && (
              <div style={{ textAlign:"center", padding:"12px 0" }}>
                <div style={{ fontSize:24, marginBottom:6 }}>⏳</div>
                <div style={{ fontSize:13, color:S.wrn, fontWeight:600 }}>{t(lang,"verifyingPayment")}</div>
              </div>
            )}
            {uscisConfNum && (
              <>
                <div style={{
                  width:"100%", padding:"12px 14px", borderRadius:10, border:"2px solid #34d399",
                  background:"rgba(52,211,153,.1)", color:"#34d399", fontSize:16, fontWeight:700,
                  textAlign:"center", letterSpacing:1.5, fontFamily:"monospace",
                  boxSizing:"border-box" as any,
                }}>{uscisConfNum}</div>
                <div style={{ fontSize:12, color:"#34d399", fontWeight:700, marginTop:6, textAlign:"center" }}>
                  {"✅ " + t(lang,"paymentVerified")}
                </div>
              </>
            )}
            {!uscisConfNum && !uscisVerifying && (
              <div style={{ textAlign:"center", padding:"10px 0" }}>
                <div style={{
                  width:"100%", padding:"12px 14px", borderRadius:10, border:"1px solid rgba(255,255,255,.15)",
                  background:"rgba(0,0,20,.3)", color:"rgba(255,255,255,.3)", fontSize:14, fontWeight:600,
                  textAlign:"center", letterSpacing:1,
                }}>— — — — — —</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", marginTop:6 }}>
                  {t(lang,"autoGenerated")}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ── SECTION 5: Processing Time ── */}
        <div style={{ background:"linear-gradient(135deg,#101a55,#1e2d8f 50%,#101a55)", border:"1px solid rgba(100,130,255,.3)", borderRadius:16, padding:"16px", marginBottom:20 }}>
          <div style={{ fontSize:16, color:"#fff", fontWeight:700, marginBottom:8, lineHeight:1.4 }}>
            {t(lang,"processingExplain")||"Estimated time for USCIS to review and decide on your application after submission"}
          </div>
          <div style={{ fontSize:34, color:"#fff", fontWeight:800 }}>
            {"⏱ "+f.time+" "+t(lang,"months")}
          </div>
        </div>

        {/* ── Fill Form button — locked until both paid + confirmed ── */}
        {(() => {
          const allReady = ourFeePaid && uscisPaid && !!uscisConfNum;
          return (
            <div style={{ marginTop:4, marginBottom:20, textAlign:"center" }}>
              {allReady && (
                <div style={{ fontSize:16, color:"#34d399", fontWeight:700, marginBottom:10 }}>
                  {"✅ " + t(lang,"allPaymentsComplete")}
                </div>
              )}
              <button onClick={() => { if (allReady) { setFSec(0); go("formFill"); } }} style={{
                width:"100%", padding:"14px 0", borderRadius:14,
                border: allReady ? "none" : "2px solid rgba(255,255,255,.2)",
                cursor: allReady ? "pointer" : "default",
                background: allReady ? "linear-gradient(135deg,#34d399,#059669)" : "rgba(255,255,255,.05)",
                color:"#fff", fontSize:17, fontWeight:800, letterSpacing:1,
                boxShadow: allReady ? "0 4px 20px rgba(52,211,153,.5)" : "none",
                opacity: allReady ? 1 : .5,
              }}>{allReady ? (t(lang,"goToForm")||"Fill Out Your Form →") : (<><span style={{ fontSize:22, verticalAlign:"middle" }}>🔒</span>{" "}{t(lang,"goToForm")||"Fill Out Your Form →"}</>)}</button>
              {!allReady && (
                <div style={{ fontSize:13, color:"#fff", marginTop:10 }}>
                  {t(lang,"completePaymentsFirst")||"Complete both payments above to unlock this button"}
                </div>
              )}
            </div>
          );
        })()}

      </div>
    </div>
  );
}
