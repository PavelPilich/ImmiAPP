import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PageDone() {
  const { lang, go, caseRef } = useContext(AppCtx) as any;
  return (
    <div style={{ ...S.page, textAlign:"center", paddingTop:40 }} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "complete")} backTo="submitConfirm" />
      <div style={{ fontSize:80, marginBottom:8 }}>🎉🎊✨</div>
      <h1 style={{ fontSize:26, marginBottom:8 }}>{t(lang, "complete")}</h1>
      <p style={{ color:S.t2, marginBottom:20 }}>{lang === "ru" ? "Спасибо что выбрали ИммиГид!" : "Thank you for choosing ImmIGuide!"}</p>
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
      <div style={{ display:"flex", gap:12, marginTop:16 }}>
        <Btn outline onClick={() => go("tracking")} style={{ flex:1 }}>{t(lang, "tracking")}</Btn>
        <Btn onClick={() => go("dashboard")} style={{ flex:1 }}>{t(lang, "dashboard")}</Btn>
      </div>
    </div>
  );
}
