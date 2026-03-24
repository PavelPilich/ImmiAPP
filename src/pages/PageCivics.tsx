import { useContext, useState, useRef, useEffect } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import Nav from "../components/layout/Nav";
import { PB } from "../components/ui/ProgressBar";
import { Btn } from "../components/ui/Button";
import { CIVICS } from "../data/civics";

export default function PageCivics() {
  const { lang } = useContext(AppCtx) as any;
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const reset = () => { setQIdx(0); setScore(0); setChosen(null); setDone(false); };

  /* Results */
  if (done) {
    const pct = Math.round((score / CIVICS.length) * 100);
    const pass = pct >= 70;
    const clr = pass ? "#22c55e" : "#ef4444";
    return (
      <div style={{ ...S.page, textAlign:"center", paddingTop:20 }} dir={lang==="ar"?"rtl":"ltr"}>
        <Nav title="Civics Test" backTo="dashboard" />
        <div style={{ fontSize:64, marginBottom:8 }}>{pass ? "🎉🏆✅" : "📚💪"}</div>
        <div style={{ width:140, height:140, borderRadius:70, border:"8px solid "+clr, display:"flex", alignItems:"center", justifyContent:"center", margin:"12px auto", background:clr+"18" }}>
          <span style={{ fontSize:44, fontWeight:900, color:clr }}>{score}/{CIVICS.length}</span>
        </div>
        <h2 style={{ fontSize:24, color:clr, marginTop:12 }}>{pass ? "You Passed!" : "Keep Studying"}</h2>
        <p style={{ color:"#fff", fontSize:18, fontWeight:700, margin:"8px 0" }}>Score: {pct}%</p>
        <Btn onClick={reset} style={{ marginTop:16 }}>{pass ? "Play Again" : "Try Again"}</Btn>
      </div>
    );
  }

  /* Question */
  const q = CIVICS[qIdx];
  const handleAnswer = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.a) setScore(p => p + 1);
    timerRef.current = setTimeout(() => {
      if (qIdx < CIVICS.length - 1) { setQIdx(p => p + 1); setChosen(null); }
      else setDone(true);
    }, 1500);
  };

  return (
    <div style={S.page} dir={lang==="ar"?"rtl":"ltr"}>
      <Nav title="Civics Test" backTo="dashboard" />
      <PB pct={((qIdx + 1) / CIVICS.length) * 100} />
      <div style={{ fontSize:13, color:S.t2, marginBottom:8 }}>Question {qIdx + 1} of {CIVICS.length}</div>
      <h3 style={{ fontSize:17, marginBottom:20, lineHeight:1.4, color:"#fff" }}>{q.q}</h3>
      {q.o.map((opt: string, i: number) => {
        let bg = "rgba(255,255,255,.07)", bd = S.bdr;
        if (chosen !== null) {
          if (i === q.a) { bg = "rgba(34,197,94,0.4)"; bd = "#22c55e"; }
          else if (i === chosen) { bg = "rgba(239,68,68,0.4)"; bd = "#ef4444"; }
        }
        return (
          <div key={i} onClick={() => handleAnswer(i)} style={{ background:bg, borderRadius:16, padding:14, marginBottom:8, border:"2px solid "+bd, cursor:chosen===null?"pointer":"default", display:"flex", gap:12, alignItems:"center", transition:"all .2s" }}>
            <div style={{ width:32, height:32, borderRadius:16, background:"rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, flexShrink:0, color:"#fff" }}>{String.fromCharCode(65 + i)}</div>
            <span style={{ fontSize:15, color:"#fff" }}>{opt}</span>
          </div>
        );
      })}
      {chosen !== null && (
        <div style={{ padding:14, borderRadius:12, marginTop:8, background: chosen===q.a ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)", border: chosen===q.a ? "2px solid #22c55e" : "2px solid #ef4444", textAlign:"center", fontWeight:700, fontSize:15, color:"#fff" }}>
          {chosen === q.a ? "Correct!" : "Wrong — Answer: " + q.o[q.a]}
        </div>
      )}
    </div>
  );
}
