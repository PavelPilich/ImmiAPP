import React, { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { HIGHLIGHTS } from "../data/notifications";

function Marquee() {
  const { lang } = useContext(AppCtx)!;
  const items = (HIGHLIGHTS[lang] || HIGHLIGHTS.en).split("|");

  const buildBlock = (prefix: string) => {
    const out: React.ReactNode[] = [];
    items.forEach((x: string, i: number) => {
      if (i > 0) out.push(<span key={prefix+"s"+i}>{"\u00A0\u00A0\u00A0\u2B50\u00A0\u00A0\u00A0"}</span>);
      const txt = x.trim().split(/(\d[\d,.$]*)/g).map((seg: string, j: number) =>
        /\d/.test(seg) ? <span key={j} style={{ fontSize:19, fontWeight:900 }}>{seg}</span> : seg
      );
      out.push(<span key={prefix+"t"+i}>{txt}</span>);
    });
    out.push(<span key={prefix+"end"}>{"\u00A0\u00A0\u00A0\u2B50\u00A0\u00A0\u00A0"}</span>);
    return out;
  };

  const ts: React.CSSProperties = { fontSize:16, fontWeight:800, whiteSpace:"nowrap", letterSpacing:1, display:"inline-block", color:"#FFD700", textShadow:"0 0 8px rgba(255,215,0,.5), 0 0 20px rgba(255,215,0,.25)" };

  return (
    <div key={lang} style={{ background:"rgba(34,197,94,.12)", border:"1px solid rgba(34,197,94,.3)", borderRadius:12, padding:"14px 0", marginTop:8, marginLeft:-4, marginRight:-4, overflow:"hidden" }}>
      <div className="mq-wrap">
        <div className="mq-track">
          <span style={ts}>{buildBlock("a")}</span>
          <span style={ts}>{buildBlock("b")}</span>
        </div>
      </div>
    </div>
  );
}

export default Marquee;
