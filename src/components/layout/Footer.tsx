import { useContext } from "react";
import { AppCtx } from "../../context/AppContext";
import { DISC } from "../../data/notifications";

function Footer() {
  const { lang } = useContext(AppCtx)!;
  return (
    <div style={{ borderTop:"1px solid rgba(255,255,255,.25)", marginTop:24, paddingTop:12, paddingBottom:20, textAlign:"center" }}>
      <p style={{ fontSize:11, color:"#fff", lineHeight:1.6, margin:0, padding:"0 8px", fontWeight:500 }}>{DISC[lang] || DISC.en}</p>
    </div>
  );
}

export default Footer;
