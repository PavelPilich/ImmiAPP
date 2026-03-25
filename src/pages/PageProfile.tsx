import { useContext, useState, useEffect } from "react";
import { AppCtx } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useProfile, useUpdateProfile } from "../hooks/useApi";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PageProfile() {
  const { lang, user, doLogout } = useContext(AppCtx) as any;
  const auth = useAuth();
  const { data: profile } = useProfile(auth.user?.id);
  const updateProfile = useUpdateProfile();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState("");
  const [sms, setSms] = useState(true);
  const [eml, setEml] = useState(true);
  const [push, setPush] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.full_name || user.name || "");
      setPhone(profile.phone || "");
    }
  }, [profile, user.name]);

  const handleSave = () => {
    if (auth.user?.id) {
      updateProfile.mutate({
        userId: auth.user.id,
        updates: {
          full_name: name,
          phone: phone || null,
          preferred_language: lang,
        },
      });
    }
    setEditing(false);
  };

  const togStyle: any = { width:44, height:24, borderRadius:12, cursor:"pointer", border:"none", transition:"background .3s", display:"flex", alignItems:"center", padding:2 };
  const dotStyle: any = { width:20, height:20, borderRadius:10, background:"#fff", transition:"transform .3s" };

  const Toggle = ({ on, set }: { on: boolean; set: (v: boolean) => void }) => (
    <button onClick={() => set(!on)} style={{ ...togStyle, background: on ? S.ok : "rgba(255,255,255,.2)" }}>
      <div style={{ ...dotStyle, transform: on ? "translateX(20px)" : "translateX(0)" }} />
    </button>
  );

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title={t(lang, "profile")} backTo="dashboard" />
      <div style={{ ...S.crd, textAlign:"center", padding:24 }}>
        <div style={{ width:80, height:80, borderRadius:40, background:S.priBtn, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:32, color:"#fff" }}>{(name || user.name || "U")[0]}</div>
        {editing ? (
          <div style={{ textAlign: "left" }}>
            <label style={{ fontSize: 12, color: S.t2 }}>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} onClick={() => { if (!name) setName("John Doe"); }} style={{ ...S.inp, marginBottom: 8 }} />
            <label style={{ fontSize: 12, color: S.t2 }}>Phone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} onClick={() => { if (!phone) setPhone("3051234567"); }} type="tel" style={{ ...S.inp, marginBottom: 8 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleSave} style={{ ...S.btn, flex: 1, padding: "8px 12px", fontSize: 13 }}>
                {updateProfile.isPending ? "..." : "Save"}
              </button>
              <button onClick={() => setEditing(false)} style={{ ...S.btnO, flex: 1, padding: "8px 12px", fontSize: 13 }}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h3>{name || user.name}</h3>
            <p style={{ color:S.t2 }}>{user.email}</p>
            {phone && <p style={{ color:S.t2, fontSize: 13 }}>{phone}</p>}
            <button onClick={() => setEditing(true)} style={{ background: "none", border: "none", color: S.pri, fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>
              Edit Profile
            </button>
          </>
        )}
      </div>
      <div style={{ ...S.crd, padding:20, cursor:"default" }}>
        <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>Notifications</div>
        {[
          { icon:"📱", label:"SMS",   desc:"Text message updates", on:sms,  set:setSms },
          { icon:"📧", label:"Email", desc:"Email notifications",  on:eml,  set:setEml },
          { icon:"🔔", label:"Push",  desc:"Push notifications",   on:push, set:setPush },
        ].map((n, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: i<2?14:0 }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600 }}>{n.icon} {n.label}</div>
              <div style={{ fontSize:11, color:S.t2 }}>{n.desc}</div>
            </div>
            <Toggle on={n.on} set={n.set} />
          </div>
        ))}
      </div>
      <Btn onClick={doLogout} color={S.err} style={{ marginTop:12 }}>{t(lang, "logout")}</Btn>
    </div>
  );
}
