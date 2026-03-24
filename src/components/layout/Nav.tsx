import { useContext } from "react";
import { AppCtx } from "../../context/AppContext";
import Stars from "../ui/Stars";
import LangDropdown from "./LangDropdown";
import { t } from "../../data/translations";
import type { PageName } from "../../types";

interface NavProps {
  title?: string;
  backTo?: PageName;
}

function Nav({ title, backTo }: NavProps) {
  const { lang, go } = useContext(AppCtx)!;
  const isRTL = lang === "ar";
  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ marginBottom:16, position:"sticky", top:0, zIndex:100 }}>
      <div style={{ position:"relative", overflow:"visible", background:"linear-gradient(135deg,#0c1445,#1a237e,#0d47a1,#0c1445)", marginLeft:-16, marginRight:-16, padding:"14px 16px 12px", boxShadow:"0 4px 20px rgba(12,20,69,.5)" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, overflow:"hidden", pointerEvents:"none" }}>
          <Stars />
        </div>
        <div style={{ position:"relative", zIndex:2, display:"flex", alignItems:"center", justifyContent:"space-between", maxWidth:480, margin:"0 auto" }}>
          {backTo
            ? <button onClick={() => go(backTo)} style={{ background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", borderRadius:10, padding:"5px 12px", fontSize:13, color:"#fff", cursor:"pointer", fontWeight:600 }}>{"← " + t(lang, "back")}</button>
            : <div style={{ width:40 }} />
          }
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span className="il" style={{ fontSize:32 }}>🗽</span>
            <span className="it">{title || t(lang, "appName")}</span>
          </div>
          <LangDropdown compact />
        </div>
      </div>
    </div>
  );
}

export default Nav;
