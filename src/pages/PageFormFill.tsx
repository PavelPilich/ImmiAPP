import { useContext, useEffect } from "react";
import { AppCtx } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useAutoSave } from "../hooks/useApi";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import { PB } from "../components/ui/ProgressBar";
import SafeInput from "../components/ui/SafeInput";
import { OPTIONAL_FIELDS, COUNTRIES, TPS_COUNTRIES } from "../data/forms";

export default function PageFormFill() {
  const { lang, go, selForm, fd, setFd, fSec, setFSec, errs, setErrs, savedFormId, setSavedFormId, caseRef } = useContext(AppCtx) as any;
  const auth = useAuth();
  const { debouncedSave, immediateSave, saveForm } = useAutoSave();

  if (!selForm) return <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}><Nav title="" backTo="dashboard" /></div>;

  const f = selForm;
  const sectionFields = f.fields.filter((x: any) => x.s === fSec);
  const totalSections = f.sections;
  const pct = ((fSec + 1) / totalSections) * 100;
  const userId = auth.user?.id;

  // Auto-save on savedFormId creation
  useEffect(() => {
    if ((saveForm.data as any)?.id && !savedFormId) {
      setSavedFormId((saveForm.data as any).id);
    }
  }, [saveForm.data, savedFormId, setSavedFormId]);

  const triggerSave = (newFd: Record<string, string>, section?: number) => {
    if (!userId) return;
    const params = {
      id: savedFormId || undefined,
      userId,
      formType: f.id,
      formData: newFd,
      currentSection: section ?? fSec,
      status: 'draft' as const,
      caseReference: caseRef,
    };
    if (section !== undefined) {
      immediateSave(params);
    } else {
      debouncedSave(params);
    }
  };

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

  const handleFieldChange = (fk: string, v: string) => {
    setFd((prev: any) => {
      const newFd = { ...prev, [fk]: v };
      triggerSave(newFd);
      return newFd;
    });
  };

  const renderField = (fl: any) => {
    const fk = f.id + "_" + fl.k;
    const isOptional = OPTIONAL_FIELDS.includes(fl.k);
    const isDropdown = fl.t === "select" || fl.t === "country" || fl.t === "tps";
    const options = fl.t === "country" ? COUNTRIES : fl.t === "tps" ? TPS_COUNTRIES : fl.opts;
    const isPlain = fl.t === "country" || fl.t === "tps";

    const handleDropdownClick = (fieldKey: string, opts: string[], type: string) => {
      if (fd[fieldKey]) return; // already has value
      // Auto-fill: pick a sensible default
      const ADMIN_DROPDOWN: Record<string, string> = {
        gender: "male", maritalStatus: "married", criminalHistory: "no",
        immigrationViolations: "no", militaryService: "no", taxRecords: "no",
        relationship: "spouse", replaceReason: "expired", persecutionBasis: "politicalOpinion",
        visaCategory: "H-1B", benefitType: "medicaid", metInPerson: "yes",
        priorApplications: "no", jointAccounts: "yes", sharedProperty: "yes",
        eligCategory: "EB-2",
      };
      if (type === "country") { handleFieldChange(fieldKey, "Ukraine"); return; }
      if (type === "tps") { handleFieldChange(fieldKey, "Ukraine"); return; }
      const val = ADMIN_DROPDOWN[fl.k] || (opts && opts[0]) || "";
      if (val) handleFieldChange(fieldKey, val);
    };

    return (
      <div key={fl.k} style={{ marginBottom:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{bt(lang, fl.k)}{isOptional ? " "+(t(lang,"optional")||"(optional)") : ""}</label>
        {isDropdown ? (
          <select value={fd[fk] || ""} onChange={e => handleFieldChange(fk, e.target.value)} onClick={() => handleDropdownClick(fk, options, fl.t)} style={S.inp}>
            <option value="">—</option>
            {options?.map((o: any) => <option key={o} value={o}>{isPlain ? o : bt(lang, o)}</option>)}
          </select>
        ) : (
          <SafeInput type={fl.t} val={fd[fk] || ""} onCommit={(v: string) => handleFieldChange(fk, v)} ph={t(lang, fl.k)} fieldKey={fl.k} />
        )}
        {errs[fl.k] && <div style={{ color:S.err, fontSize:12, marginTop:4 }}>{t(lang, errs[fl.k])}</div>}
      </div>
    );
  };

  return (
    <div style={S.page} dir={["ar","fa","he"].includes(lang)?"rtl":"ltr"}>
      <Nav title={f.name + " " + (fSec+1) + "/" + totalSections} backTo="formDetail" />
      <PB pct={pct} />
      {sectionFields.map(renderField)}
      <div style={{ display:"flex", gap:12 }}>
        {fSec > 0 && <Btn outline onClick={() => { setFSec(fSec - 1); triggerSave(fd, fSec - 1); }} style={{ flex:1 }}>{t(lang, "back")}</Btn>}
        <Btn onClick={() => {
          if (!validate()) return;
          if (fSec < totalSections - 1) {
            setFSec(fSec + 1);
            triggerSave(fd, fSec + 1);
          } else {
            // Final section - save with docs_pending status
            if (userId) {
              immediateSave({
                id: savedFormId || undefined,
                userId,
                formType: f.id,
                formData: fd,
                currentSection: fSec,
                status: 'docs_pending',
                caseReference: caseRef,
              });
            }
            go("docUpload");
          }
        }} style={{ flex:1 }}>
          {fSec < totalSections - 1 ? t(lang, "next") : t(lang, "continueForm")}
        </Btn>
      </div>
    </div>
  );
}
