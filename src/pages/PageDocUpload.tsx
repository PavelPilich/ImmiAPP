import { useContext, useRef } from "react";
import { AppCtx } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useUploadDoc } from "../hooks/useApi";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PageDocUpload() {
  const { lang, go, ups, setUps, savedFormId } = useContext(AppCtx) as any;
  const auth = useAuth();
  const uploadDoc = useUploadDoc();
  const docs = [
    { k:"passport", i:"🛂", l:"passport" },
    { k:"birth",    i:"📜", l:"birthCert" },
    { k:"photo",    i:"📷", l:"photo" },
    { k:"support",  i:"📎", l:"supporting" },
  ];
  const camRefs:  any = { passport:useRef<HTMLInputElement>(null), birth:useRef<HTMLInputElement>(null), photo:useRef<HTMLInputElement>(null), support:useRef<HTMLInputElement>(null) };
  const fileRefs: any = { passport:useRef<HTMLInputElement>(null), birth:useRef<HTMLInputElement>(null), photo:useRef<HTMLInputElement>(null), support:useRef<HTMLInputElement>(null) };

  const handleFile = (k: string, e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG, and PNG files are allowed.');
      e.target.value = '';
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be under 10MB.');
      e.target.value = '';
      return;
    }

    if (ups[k]) URL.revokeObjectURL(ups[k]);
    setUps((p: any) => ({ ...p, [k]: URL.createObjectURL(file) }));

    // Upload to Supabase Storage if configured
    const userId = auth.user?.id;
    if (userId && savedFormId) {
      uploadDoc.mutate({
        userId,
        savedFormId,
        documentType: k,
        file,
      });
    }
  };

  const remove = (k: string) => {
    if (ups[k]) URL.revokeObjectURL(ups[k]);
    setUps((p: any) => ({ ...p, [k]: null }));
  };

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
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
              <input ref={camRefs[d.k]} type="file" accept="image/jpeg,image/png,image/jpg" capture="environment" style={{ display:"none" }} onChange={e => handleFile(d.k, e)} />
              <input ref={fileRefs[d.k]} type="file" accept=".pdf,image/jpeg,image/jpg,image/png" style={{ display:"none" }} onChange={e => handleFile(d.k, e)} />
              <button onClick={() => camRefs[d.k].current?.click()} style={{ ...S.btn, flex:1, padding:"10px 8px", fontSize:13 }}>📷 Camera</button>
              <button onClick={() => fileRefs[d.k].current?.click()} style={{ ...S.btn, flex:1, padding:"10px 8px", fontSize:13, background:S.acc }}>📁 Upload</button>
            </div>
          )}
        </div>
      ))}
      {/* Admin bypass — mark all docs as uploaded (DEV only) */}
      {import.meta.env.DEV && (!ups.passport || !ups.birth || !ups.photo || !ups.support) && (
        <button onClick={() => {
          const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23334' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' text-anchor='middle' dy='.3em' font-size='14'%3ETEST DOC%3C/text%3E%3C/svg%3E";
          setUps({ passport: ups.passport || placeholder, birth: ups.birth || placeholder, photo: ups.photo || placeholder, support: ups.support || placeholder });
        }} style={{ background: "rgba(99,102,241,.2)", border: "1px solid rgba(99,102,241,.4)", borderRadius: 12, padding: "10px 16px", color: "#6366f1", fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%", marginBottom: 8 }}>
          Skip All Docs (Admin)
        </button>
      )}
      <Btn onClick={() => go("preview")}>{t(lang, "continueForm")}</Btn>
    </div>
  );
}
