import { useState, useRef, useContext } from "react";
import { AppCtx } from "../../context/AppContext";
import { LANGS } from "../../data/translations";
import type { LangCode } from "../../types";

interface LangDropdownProps {
  compact?: boolean;
}

function LangDropdown({ compact }: LangDropdownProps) {
  const { lang, setLang } = useContext(AppCtx)!;
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";
  const cur = LANGS.find(x => x.code === lang);

  const enter = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(false), 200); };

  const btnStyle: React.CSSProperties = compact
    ? { background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.2)", borderRadius:10, padding:"4px 10px", fontSize:18, cursor:"pointer", color:"#fff" }
    : { background:"rgba(255,255,255,.08)", border:"1px solid rgba(147,197,253,.2)", borderRadius:10, padding:"5px 12px", fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:6, color:"#fff", fontWeight:600 };

  return (
    <div dir="ltr" style={{ position:"relative", zIndex:9999 }} onMouseEnter={enter} onMouseLeave={leave}>
      <button style={btnStyle}>
        {compact ? <>{cur?.flag} ▾</> : <>{cur?.flag} {cur?.name} ▾</>}
      </button>
      {open && (
        <div style={{ position:"absolute", right:0, top:32, background:"rgba(12,20,69,.95)", border:"1px solid rgba(147,197,253,.2)", borderRadius:12, padding:8, zIndex:99999, minWidth:200, maxWidth:220, boxShadow:"0 8px 32px rgba(0,0,0,.4)" }}>
          {LANGS.map(x => (
            <div key={x.code} onMouseEnter={() => setLang(x.code as LangCode)} style={{
              padding:"9px 14px", borderRadius:8, cursor:"pointer", display:"flex", gap:10, alignItems:"center",
              background: lang === x.code ? "rgba(99,102,241,.2)" : "transparent",
              fontWeight: lang === x.code ? 700 : 400, color:"#fff",
            }}>
              <span style={{ fontSize:18 }}>{x.flag}</span>
              <span>{x.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LangDropdown;
