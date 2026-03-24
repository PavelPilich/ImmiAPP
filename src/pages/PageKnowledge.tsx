import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";

export default function PageKnowledge() {
  const { lang } = useContext(AppCtx) as any;
  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "knowledgeBase")} backTo="dashboard" />
      <div style={S.crd}>
        <h3>🇺🇸 {t(lang, "appName")}</h3>
        <p style={{ color:S.t2, fontSize:14, lineHeight:1.6, marginTop:8 }}>{bt(lang, "onboard1Desc")}</p>
      </div>
    </div>
  );
}
