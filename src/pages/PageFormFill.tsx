import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import { PB } from "../components/ui/ProgressBar";
import SafeInput from "../components/ui/SafeInput";
import { OPTIONAL_FIELDS, COUNTRIES, TPS_COUNTRIES } from "../data/forms";

export default function PageFormFill() {
  const { lang, go, selForm, fd, setFd, fSec, setFSec, errs, setErrs } = useContext(AppCtx) as any;
  if (!selForm) return <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;

  const f = selForm;
  const sectionFields = f.fields.filter((x: any) => x.s === fSec);
  const totalSections = f.sections;
  const pct = ((fSec + 1) / totalSections) * 100;

  const validate = () => {
    const e: any = {};
    sectionFields.forEach((fl: any) => {
      if (OPTIONAL_FIELDS.includes(fl.k)) return;
      const v = fd[f.id + "_" + fl.k];
      if (!v || !v.trim()) e[fl.k] = "required";
      else if (fl.t === "email" && !v.includes("@")) e[fl.k] = "invalidEmail";
      else if (fl.t === "tel" && v.replace(/\D/g, "").length < 7) e[fl.k] = "invalidPhone";
    });
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const renderField = (fl: any) => {
    const fk = f.id + "_" + fl.k;
    const isOptional = OPTIONAL_FIELDS.includes(fl.k);
    const isDropdown = fl.t === "select" || fl.t === "country" || fl.t === "tps";
    const options = fl.t === "country" ? COUNTRIES : fl.t === "tps" ? TPS_COUNTRIES : fl.opts;
    const isPlain = fl.t === "country" || fl.t === "tps";

    return (
      <div key={fl.k} style={{ marginBottom:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{bt(lang, fl.k)}{isOptional ? " (optional)" : ""}</label>
        {isDropdown ? (
          <select value={fd[fk] || ""} onChange={e => setFd((p: any) => ({ ...p, [fk]:e.target.value }))} style={S.inp}>
            <option value="">—</option>
            {options?.map((o: any) => <option key={o} value={o}>{isPlain ? o : bt(lang, o)}</option>)}
          </select>
        ) : (
          <SafeInput type={fl.t} val={fd[fk] || ""} onCommit={(v: string) => setFd((p: any) => ({ ...p, [fk]:v }))} ph={t(lang, fl.k)} />
        )}
        {errs[fl.k] && <div style={{ color:S.err, fontSize:12, marginTop:4 }}>{t(lang, errs[fl.k])}</div>}
      </div>
    );
  };

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={f.name + " " + (fSec+1) + "/" + totalSections} backTo="formDetail" />
      <PB pct={pct} />
      {sectionFields.map(renderField)}
      <div style={{ display:"flex", gap:12 }}>
        {fSec > 0 && <Btn outline onClick={() => setFSec(fSec - 1)} style={{ flex:1 }}>{t(lang, "back")}</Btn>}
        <Btn onClick={() => { if (!validate()) return; fSec < totalSections - 1 ? setFSec(fSec + 1) : go("docUpload"); }} style={{ flex:1 }}>
          {fSec < totalSections - 1 ? t(lang, "next") : t(lang, "continueForm")}
        </Btn>
      </div>
    </div>
  );
}
