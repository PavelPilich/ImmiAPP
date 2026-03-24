import { useState, useEffect, useRef, useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { NOTIF, NOTIF_COLORS } from "../data/notifications";

function Billboard() {
  const { lang } = useContext(AppCtx)!;
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const notifs = NOTIF[lang] || NOTIF.en;
  const notifsRef = useRef(notifs);

  useEffect(() => { notifsRef.current = notifs; }, [notifs]);
  useEffect(() => { setIdx(0); }, [lang]);
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx(p => (p + 1) % notifsRef.current.length), 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [notifs.length]);

  const jumpTo = (i: number) => {
    setIdx(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx(p => (p + 1) % notifsRef.current.length), 4000);
  };

  const n = notifs[idx % notifs.length];
  if (!n) return null;
  const clr = NOTIF_COLORS[n.type] || "#fff";

  return (
    <div style={{ background:"rgba(0,0,0,.3)", border:"2px solid "+clr+"66", borderRadius:14, padding:"18px 16px", marginBottom:16, textAlign:"center", transition:"border-color .5s", minHeight:90, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div style={{ fontSize:36, marginBottom:6 }}>{n.icon}</div>
      <div style={{ fontSize:18, fontWeight:800, color:clr, lineHeight:1.4, letterSpacing:.5 }}>{n.text}</div>
      <div style={{ display:"flex", gap:6, marginTop:10, justifyContent:"center" }}>
        {notifs.map((_: any, i: number) => (
          <div key={i} onClick={() => jumpTo(i)} style={{ width:i===idx?20:8, height:8, borderRadius:4, background:i===idx?clr:"rgba(255,255,255,.25)", cursor:"pointer", transition:"all .3s" }} />
        ))}
      </div>
    </div>
  );
}

export default Billboard;
