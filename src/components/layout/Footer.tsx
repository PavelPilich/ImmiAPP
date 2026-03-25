import { useContext } from "react";
import { AppCtx } from "../../context/AppContext";
import { DISC } from "../../data/notifications";

function Footer() {
  const { lang, go } = useContext(AppCtx) as any;
  return (
    <div style={{ borderTop:"1px solid rgba(255,255,255,.25)", marginTop:24, paddingTop:12, paddingBottom:20, textAlign:"center" }}>
      <p style={{ fontSize:11, color:"#fff", lineHeight:1.6, margin:0, padding:"0 8px", fontWeight:500 }}>{DISC[lang] || DISC.en}</p>
      <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:8 }}>
        <button onClick={() => go("terms")} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", fontSize:10, cursor:"pointer", textDecoration:"underline" }}>Terms of Service</button>
        <button onClick={() => go("privacy")} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", fontSize:10, cursor:"pointer", textDecoration:"underline" }}>Privacy Policy</button>
      </div>
    </div>
  );
}

export default Footer;
