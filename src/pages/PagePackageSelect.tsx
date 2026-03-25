import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PagePackageSelect() {
  const { lang, go, selForm, pkg, setPkg } = useContext(AppCtx) as any;
  if (!selForm) return <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;

  const options = [
    { k:"pdf",       i:"📄", label:"Digital PDF Download",          pr:0,  desc:"Download and print yourself" },
    { k:"printShip", i:"🖨️", label:"Print & Ship to You",           pr:15, desc:"We print and mail to your address" },
    { k:"fullSvc",   i:"📦", label:"Full Service (We Mail to USCIS)",pr:25, desc:"We prepare and mail everything" },
    { k:"express",   i:"⚡", label:"Express Delivery",              pr:50, desc:"Fastest option — express shipped" },
  ];

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title="Delivery Option" backTo="docUpload" />
      <div style={{ ...S.crd, padding:12, marginBottom:16, textAlign:"center", background:"rgba(99,102,241,.12)" }}>
        <div style={{ fontSize:14, fontWeight:700 }}>{selForm.name}</div>
        <div style={{ fontSize:13, color:S.t2 }}>Service Fee: ${selForm.fee}</div>
      </div>
      {options.map(d => (
        <div key={d.k} onClick={() => setPkg(d.k)} style={{ ...S.crd, border: pkg===d.k ? "2px solid "+S.priBtn : "1px solid "+S.bdr, padding:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", flex:1 }}>
              <span style={{ fontSize:24 }}>{d.i}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:14 }}>{d.label}</div>
                <div style={{ fontSize:12, color:S.t2 }}>{d.desc}</div>
              </div>
            </div>
            <div style={{ fontWeight:700, fontSize:16, color:d.pr?S.pri:S.ok, flexShrink:0 }}>{d.pr ? "$"+d.pr : "FREE"}</div>
          </div>
        </div>
      ))}
      <Btn disabled={!pkg} onClick={() => go("preview")}>{t(lang, "continueForm")}</Btn>
    </div>
  );
}
