import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { FORMS } from "../data/forms";

export default function PageFormSelect() {
  const { lang, go, setSelForm } = useContext(AppCtx) as any;
  const sortByPrice = (a: any, b: any) => a.fee - b.fee;
  const tiers = [
    { k:"simple",  forms:FORMS.filter((f: any) => f.tier === "simple").sort(sortByPrice),  c:S.ok },
    { k:"medium",  forms:FORMS.filter((f: any) => f.tier === "medium").sort(sortByPrice),  c:S.wrn },
    { k:"complex", forms:FORMS.filter((f: any) => f.tier === "complex").sort(sortByPrice), c:S.err },
    { k:"vcomplex", forms:FORMS.filter((f: any) => f.tier === "vcomplex").sort(sortByPrice), c:"#c084fc" },
  ];
  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "selectForm")} backTo="dashboard" />
      {tiers.map(tier => (
        <div key={tier.k}>
          <div style={{ display:"inline-block", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600, background:tier.c+"22", color:tier.c, marginBottom:8, marginTop:12 }}>{t(lang, tier.k)}</div>
          {tier.forms.map((f: any) => (
            <div key={f.id} onClick={() => { setSelForm(f); go("formDetail"); }} style={{ ...S.crd, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontWeight:700 }}>{f.name}</div>
                <div style={{ fontSize:13, color:S.t2 }}>{bt(lang, f.desc)}</div>
              </div>
              <div style={{ fontWeight:700, color:"#fff" }}>{"$"+f.fee}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
