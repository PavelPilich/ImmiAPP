
const starData = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  l: Math.random() * 100,
  tp: Math.random() * 100,
  sz: 1 + Math.random() * 2.5,
  d: 1.5 + Math.random() * 3,
  dl: Math.random() * 3,
  op: .3 + Math.random() * .7,
}));

const contentStarData = Array.from({ length: 60 }, (_, i) => ({
  id: i + 200,
  l: Math.random() * 96 + 2,
  tp: Math.random() * 100,
  sz: 1 + Math.random() * 2.5,
  d: 1.5 + Math.random() * 3,
  dl: Math.random() * 3,
  op: .3 + Math.random() * .7,
}));

function Stars() {
  return <>{starData.map(s => (
    <div key={s.id} className="is" style={{ left:s.l+"%", top:s.tp+"%", width:s.sz, height:s.sz, animationDuration:s.d+"s", animationDelay:s.dl+"s", opacity:s.op }} />
  ))}</>;
}

export function ContentStars() {
  return (
    <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, pointerEvents:"none", overflow:"hidden", zIndex:3 }}>
      {contentStarData.map(s => (
        <div key={s.id} className="is" style={{ left:s.l+"%", top:s.tp+"%", width:s.sz, height:s.sz, animationDuration:s.d+"s", animationDelay:s.dl+"s", opacity:s.op }} />
      ))}
    </div>
  );
}

export default Stars;
