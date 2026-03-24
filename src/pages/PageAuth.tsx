import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import { GoogleSvg, AppleSvg } from "../components/ui/Icons";

export default function PageAuth() {
  const { lang, go, setUser, setLoggedIn } = useContext(AppCtx) as any;
  const [aEmail, setAEmail] = useState("");
  const [aPass, setAPass] = useState("");
  const isRTL = lang === "ar";

  const login = (name: string, email: string) => { setUser({ name, email }); setLoggedIn(true); go("dashboard"); };

  return (
    <div style={{ ...S.page, paddingTop:0, display:"flex", flexDirection:"column", minHeight:"calc(100vh - 80px)" }} dir={isRTL?"rtl":"ltr"}>
      <Nav title={t(lang, "login")} backTo="onboard" />
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{bt(lang, "email")}</label>
        <input type="email" value={aEmail} onChange={e => setAEmail(e.target.value)} style={S.inp} />
      </div>
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{bt(lang, "password")}</label>
        <input type="password" value={aPass} onChange={e => setAPass(e.target.value)} style={S.inp} />
      </div>
      <div style={{ flex:1, minHeight:48 }} />
      <Btn onClick={() => { if (aEmail && aPass) login("User", aEmail); }}>{t(lang, "login")}</Btn>
      <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
        <div style={{ flex:1, height:1, background:"rgba(255,255,255,.2)" }} />
        <span style={{ fontSize:13, color:"rgba(255,255,255,.5)", fontWeight:600 }}>{t(lang, "or")}</span>
        <div style={{ flex:1, height:1, background:"rgba(255,255,255,.2)" }} />
      </div>
      <button onClick={() => login("Google User", "user@gmail.com")} style={{ ...S.btn, background:"#fff", color:"#333", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}><GoogleSvg /> {t(lang, "continueGoogle")}</button>
      <button onClick={() => login("Apple User", "user@icloud.com")} style={{ ...S.btn, background:"#000", display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginTop:20 }}><AppleSvg /> {t(lang, "continueApple")}</button>
    </div>
  );
}
