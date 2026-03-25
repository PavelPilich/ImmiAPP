import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useSavedForms } from "../hooks/useApi";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import Billboard from "../components/Billboard";
import { FORMS } from "../data/forms";

export default function PageDashboard() {
  const { lang, go, user, setSelForm, setFd, setFSec, setSavedFormId } = useContext(AppCtx) as any;
  const auth = useAuth();
  const { data: savedForms } = useSavedForms(auth.user?.id);

  const acts = [
    { i:"📋", l:"startNew",     p:"formSelect" },
    { i:"🧙", l:"formWizard",   p:"wizard" },
    { i:"🎓", l:"civicsTest",   p:"civics" },
    { i:"📊", l:"tracking",     p:"tracking" },
    { i:"💰", l:"pricing",      p:"pricing" },
    { i:"⚖️", l:"attorneys",    p:"attorneys" },
    { i:"⭐", l:"reviews",      p:"reviews" },
    { i:"❓", l:"faq",          p:"faq" },
    { i:"📚", l:"knowledgeBase",p:"knowledge" },
    { i:"👤", l:"profile",      p:"profile" },
  ];

  const statusColors: Record<string, string> = {
    draft: S.wrn,
    docs_pending: "#f59e0b",
    paid: S.ok,
    submitted: S.pri,
    processing: "#8b5cf6",
  };

  const resumeForm = (sf: any) => {
    const form = FORMS.find((f: any) => f.id === sf.form_type);
    if (!form) return;
    setSelForm(form);
    setFd(sf.form_data || {});
    setFSec(sf.current_section || 0);
    setSavedFormId(sf.id);

    // Navigate based on status
    if (sf.status === 'draft') go('formFill');
    else if (sf.status === 'docs_pending') go('docUpload');
    else if (sf.status === 'paid') go('whatsNext');
    else go('tracking');
  };

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "dashboard")} backTo="onboard" />
      <h2 style={{ fontSize:20, marginBottom:4 }}>{t(lang, "welcome")}, {user.name}!</h2>
      <p style={{ color:S.t2, marginBottom:16 }}>{bt(lang, "myForms")}</p>
      <Billboard />

      {/* Saved forms */}
      {savedForms && savedForms.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>My Forms</div>
          {savedForms.map((sf: any) => (
            <div key={sf.id} onClick={() => resumeForm(sf)} style={{ ...S.crd, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 24 }}>📋</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{sf.form_type}</div>
                <div style={{ fontSize: 11, color: S.t2 }}>
                  {new Date(sf.updated_at).toLocaleDateString()}
                </div>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 8,
                background: `${statusColors[sf.status] || S.t2}22`,
                color: statusColors[sf.status] || S.t2,
                textTransform: "uppercase",
              }}>
                {sf.status}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
        {acts.map(a => (
          <div key={a.l} onClick={() => go(a.p)} style={{ ...S.crd, textAlign:"center", padding:14 }}>
            <div style={{ fontSize:36 }}>{a.i}</div>
            <div style={{ fontSize:14, fontWeight:600, marginTop:4 }}>{t(lang, a.l)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
