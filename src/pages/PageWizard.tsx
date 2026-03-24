import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { FORMS } from "../data/forms";

export default function PageWizard() {
  const { lang, go, setSelForm } = useContext(AppCtx) as any;
  const goals = [
    { k:"goalTPS",f:"i821" },{ k:"goalDACA",f:"daca" },{ k:"goalEAD",f:"i765" },{ k:"goalFamily",f:"i130" },
    { k:"goalCitizen",f:"n400" },{ k:"goalGreen",f:"i485" },{ k:"goalTravel",f:"i131" },{ k:"goalAsylum",f:"i589" },
  ];
  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "formWizard")} backTo="dashboard" />
      {goals.map(g => (
        <div key={g.k} onClick={() => { setSelForm(FORMS.find((f: any) => f.id === g.f)); go("formDetail"); }} style={{ ...S.crd, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontWeight:600 }}>{bt(lang, g.k)}</span>
          <span style={{ color:S.pri }}>→</span>
        </div>
      ))}
    </div>
  );
}
