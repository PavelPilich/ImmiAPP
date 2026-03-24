import { useState, useEffect } from "react";
import { S } from "../../data/styles";

interface SafeInputProps {
  type: string;
  val: string;
  onCommit: (v: string) => void;
  ph?: string;
}

function SafeInput({ type, val, onCommit, ph }: SafeInputProps) {
  const [loc, setLoc] = useState(val);
  useEffect(() => { setLoc(val); }, [val]);
  const tp = type === "tel" ? "tel" : type === "date" ? "date" : type === "email" ? "email" : "text";
  return (
    <input type={tp} value={loc} onChange={e => setLoc(e.target.value)} onBlur={() => onCommit(loc)} placeholder={ph} style={S.inp} autoComplete="off" />
  );
}

export default SafeInput;
