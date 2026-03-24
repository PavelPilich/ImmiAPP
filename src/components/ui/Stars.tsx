
const starData = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  l: Math.random() * 100,
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

export default Stars;
