import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PageFormDetail() {
  const { lang, go, selForm, setFSec, setPkg } = useContext(AppCtx) as any;
  if (!selForm) return <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;
  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={f.name} backTo="formSelect" />
      <div style={{ ...S.crd, textAlign:"center", padding:24 }}>
        <h2>{f.name}</h2>
        <p style={{ color:S.t2 }}>{bt(lang, f.desc)}</p>
        <div style={{ display:"flex", justifyContent:"center", gap:24, margin:"16px 0" }}>
          <div><div style={{ fontWeight:700, fontSize:24 }}>{"$"+f.fee}</div><div style={{ fontSize:12, color:S.t2 }}>{t(lang, "serviceFee")}</div></div>
          <div><div style={{ fontWeight:700, fontSize:24 }}>{"$"+f.uscis}</div><div style={{ fontSize:12, color:S.t2 }}>{t(lang, "uscisFee")}</div></div>
        </div>
        <div style={{ fontSize:13, color:S.t2, marginBottom:8 }}>{f.sections+" "+t(lang,"sections")+" · "+f.fieldCount+" "+t(lang,"fields")+" · "+f.time+" "+t(lang,"months")}</div>
        <Btn onClick={() => { setFSec(0); setPkg(null); go("formFill"); }}>{t(lang, "startForm")}</Btn>
      </div>
    </div>
  );
}
