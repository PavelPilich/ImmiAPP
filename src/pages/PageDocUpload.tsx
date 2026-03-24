import { useContext, useRef } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PageDocUpload() {
  const { lang, go, ups, setUps } = useContext(AppCtx) as any;
  const docs = [
    { k:"passport", i:"🛂", l:"passport" },
    { k:"birth",    i:"📜", l:"birthCert" },
    { k:"photo",    i:"📷", l:"photo" },
    { k:"support",  i:"📎", l:"supporting" },
  ];
  const camRefs:  any = { passport:useRef<HTMLInputElement>(null), birth:useRef<HTMLInputElement>(null), photo:useRef<HTMLInputElement>(null), support:useRef<HTMLInputElement>(null) };
  const fileRefs: any = { passport:useRef<HTMLInputElement>(null), birth:useRef<HTMLInputElement>(null), photo:useRef<HTMLInputElement>(null), support:useRef<HTMLInputElement>(null) };

  const handleFile = (k: string, e: any) => {
    if (e.target.files?.[0]) {
      if (ups[k]) URL.revokeObjectURL(ups[k]);
      setUps((p: any) => ({ ...p, [k]: URL.createObjectURL(e.target.files[0]) }));
    }
  };
  const remove = (k: string) => {
    if (ups[k]) URL.revokeObjectURL(ups[k]);
    setUps((p: any) => ({ ...p, [k]: null }));
  };

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "docUpload")} backTo="formFill" />
      {docs.map(d => (
        <div key={d.k} style={{ ...S.crd, padding:16 }}>
          <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
            <span style={{ fontSize:28 }}>{d.i}</span>
            <span style={{ fontWeight:600, flex:1 }}>{bt(lang, d.l)}</span>
            {ups[d.k] && <span style={{ color:S.ok, fontSize:20 }}>✓</span>}
          </div>
          {ups[d.k] ? (
            <div style={{ textAlign:"center" }}>
              <img src={ups[d.k]} style={{ maxWidth:"100%", maxHeight:120, borderRadius:8, marginBottom:8 }} alt="" />
              <button onClick={() => remove(d.k)} style={{ ...S.btnO, padding:"6px 12px", fontSize:12, color:S.err }}>Remove</button>
            </div>
          ) : (
            <div style={{ display:"flex", gap:8 }}>
              <input ref={camRefs[d.k]} type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={e => handleFile(d.k, e)} />
              <input ref={fileRefs[d.k]} type="file" accept="image/*,.pdf" style={{ display:"none" }} onChange={e => handleFile(d.k, e)} />
              <button onClick={() => camRefs[d.k].current?.click()} style={{ ...S.btn, flex:1, padding:"10px 8px", fontSize:13 }}>📷 Camera</button>
              <button onClick={() => fileRefs[d.k].current?.click()} style={{ ...S.btn, flex:1, padding:"10px 8px", fontSize:13, background:S.acc }}>📁 Upload</button>
            </div>
          )}
        </div>
      ))}
      <Btn onClick={() => go("packageSelect")}>{t(lang, "continueForm")}</Btn>
    </div>
  );
}
