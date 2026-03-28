import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import { generateFormPdf } from "../lib/pdfGenerator";

export default function PagePreview() {
  const { lang, go, selForm, fd, user, caseRef, pkg, ourFeePaid } = useContext(AppCtx) as any;
  if (!selForm) return <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;
  const f = selForm;

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={t(lang, "pdfPreview")} backTo="docUpload" />
      <div style={{ ...S.crd, padding:24 }}>
        <h3 style={{ marginBottom:16 }}>{f.name + " — " + t(lang, "review")}</h3>
        {f.fields.map((fl: any) => {
          const v = fd[f.id + "_" + fl.k];
          if (!v) return null;
          return (
            <div key={fl.k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid "+S.bdr }}>
              <span style={{ color:S.t2, fontSize:14 }}>{bt(lang, fl.k)}</span>
              <span style={{ fontWeight:600, fontSize:14 }}>{v}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display:"flex", gap:12 }}>
        <Btn outline onClick={() => window.print()} style={{ flex:1 }}>{t(lang, "print")}</Btn>
        <Btn outline onClick={() => generateFormPdf({ formName: f.name, formId: f.id, caseRef, userName: user?.name || "User", userEmail: user?.email || "", fd, fields: f.fields, sections: f.sections, packageType: pkg })} style={{ flex:1 }}>PDF</Btn>
      </div>
      <Btn onClick={() => go(ourFeePaid ? "submitConfirm" : "pay")} style={{ marginTop: 8 }}>{t(lang, "continueForm")}</Btn>
    </div>
  );
}
