import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, T } from "../data/translations";
import { ONBOARD_TITLE, ONBOARD_STEPS } from "../data/notifications";
import Marquee from "../components/Marquee";
import { Btn } from "../components/ui/Button";
import Stars from "../components/ui/Stars";

export default function PageOnboard() {
  const { lang, go } = useContext(AppCtx) as any;
  const isRTL = lang === "ar";
  const isEn = lang === "en";
  const title = ONBOARD_TITLE[lang] || ONBOARD_TITLE.en;

  return (
    <div style={{ ...S.page, paddingTop:0, textAlign:"center", display:"flex", flexDirection:"column" }} dir={isRTL?"rtl":"ltr"}>
      {/* Header */}
      <div style={{ position:"relative", overflow:"hidden", marginLeft:-16, marginRight:-16, background:"linear-gradient(135deg,#0c1445,#1a237e,#0d47a1,#0c1445)", padding:"12px 20px 24px" }}>
        <Stars />
        <div style={{ position:"relative", zIndex:2 }}>
          <span className="il" style={{ fontSize:144, marginTop:-8 }}>🗽</span>
          <h1 className="it" style={{ fontSize:30, marginTop:10 }}>{t(lang, "appName")}</h1>
          <p style={{ color:"#fff", fontSize:18, marginTop:6, fontWeight:900, marginBottom:4 }}>{title}</p>
          {!isEn && <div style={{ fontSize:13, color:"rgba(255,255,255,.65)", fontWeight:600, fontStyle:"italic" }}>{ONBOARD_TITLE.en}</div>}
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding:"20px 4px 0", textAlign:"left", display:"flex", flexDirection:"column", flex:1 }}>
        {ONBOARD_STEPS.map((st: any, idx: number) => (
          <div key={idx} style={{ textAlign:"center", marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:4 }}>
                <div style={{ width:32, height:32, borderRadius:10, background:"rgba(99,102,241,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{st.i}</div>
                <div style={{ fontSize:12, color:"#fff", fontWeight:700, letterSpacing:.5 }}>{(T.step[lang] || "STEP") + " " + (idx + 1)}</div>
              </div>
              <div style={{ fontSize:17, color:"#fff", lineHeight:1.6, fontWeight:700 }}>{st[lang] || st.en}</div>
              {!isEn && <div style={{ fontSize:12, color:"#fff", lineHeight:1.4, marginTop:2, fontWeight:400, fontStyle:"italic" }}>({st.en})</div>}
          </div>
        ))}
        <Marquee key={lang} />
        <div style={{ flex:1 }} />
        <Btn onClick={() => go("auth")} style={{ marginTop:32 }}>{t(lang, "getStarted") + " →"}</Btn>
      </div>
    </div>
  );
}
