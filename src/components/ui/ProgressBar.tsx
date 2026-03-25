import { S } from "../../data/styles";

interface PBProps {
  pct: number;
}

function PB({ pct }: PBProps) {
  return (
    <div style={{ height:6, borderRadius:3, background:S.bdr, overflow:"hidden", marginBottom:12 }}>
      <div style={{ width:pct+"%", height:"100%", background:S.priBtn, borderRadius:3, transition:"width .3s" }} />
    </div>
  );
}

export { PB };
export default PB;
