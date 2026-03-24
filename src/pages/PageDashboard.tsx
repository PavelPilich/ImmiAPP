import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import Billboard from "../components/Billboard";

export default function PageDashboard() {
  const { lang, go, user } = useContext(AppCtx) as any;
  const acts = [
    { i:"📋", l:"startNew",     p:"formSelect" },
    { i:"🧙", l:"formWizard",   p:"wizard" },
    { i:"🎓", l:"civicsTest",   p:"civics" },
    { i:"📊", l:"tracking",     p:"tracking" },
    { i:"📚", l:"knowledgeBase",p:"knowledge" },
    { i:"👤", l:"profile",      p:"profile" },
  ];

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "dashboard")} backTo="onboard" />
      <h2 style={{ fontSize:20, marginBottom:4 }}>{t(lang, "welcome")}, {user.name}!</h2>
      <p style={{ color:S.t2, marginBottom:16 }}>{bt(lang, "myForms")}</p>
      <Billboard />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        {acts.map(a => (
          <div key={a.l} onClick={() => go(a.p)} style={{ ...S.crd, textAlign:"center", padding:14 }}>
            <div style={{ fontSize:28 }}>{a.i}</div>
            <div style={{ fontSize:11, fontWeight:600, marginTop:4 }}>{t(lang, a.l)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
