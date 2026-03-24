import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

export default function PageProfile() {
  const { lang, user, doLogout } = useContext(AppCtx) as any;
  const [sms, setSms] = useState(true);
  const [eml, setEml] = useState(true);
  const [push, setPush] = useState(false);

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
        <div style={{ width:80, height:80, borderRadius:40, background:S.pri, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:32, color:"#fff" }}>{(user.name || "U")[0]}</div>
        <h3>{user.name}</h3>
        <p style={{ color:S.t2 }}>{user.email}</p>
      </div>
      <div style={{ ...S.crd, padding:20, cursor:"default" }}>
        <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>📬 Notifications</div>
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
