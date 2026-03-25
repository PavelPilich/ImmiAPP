import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

const REVIEWS = [
  { name: "Maria G.", form: "I-485", rating: 5, flag: "🇲🇽", text: "ImmIGuide saved me thousands compared to an attorney. My green card was approved in 10 months! The multilingual support made everything so easy.", date: "Feb 2026" },
  { name: "Oleksandr K.", form: "I-821", rating: 5, flag: "🇺🇦", text: "Як українець, я був дуже радий заповнити форму TPS рідною мовою. Все було зрозуміло і просто. Дуже дякую ImmIGuide!", date: "Jan 2026" },
  { name: "Fatima A.", form: "N-400", rating: 5, flag: "🇸🇦", text: "كانت تجربة رائعة. استطعت ملء طلب الجنسية بالعربية. توفير كبير مقارنة بالمحامي. شكراً ImmIGuide!", date: "Mar 2026" },
  { name: "Jean-Pierre L.", form: "I-130", rating: 5, flag: "🇭🇹", text: "Mwen te kapab ranpli fòm I-130 nan Kreyòl! Sa te fè tout bagay pi fasil. Mèsi ImmIGuide pou ede fanmi mwen reyini.", date: "Dec 2025" },
  { name: "Carlos R.", form: "DACA", rating: 5, flag: "🇸🇻", text: "Renové mi DACA por solo $113.99 en vez de pagar $1,500 a un abogado. El proceso fue rápido y en español. Excelente servicio!", date: "Feb 2026" },
  { name: "Priya S.", form: "I-765", rating: 5, flag: "🇳🇵", text: "मेरो EAD फार्म नेपालीमा भर्न सक्नु अद्भुत थियो। प्रक्रिया सजिलो थियो र मैले धेरै पैसा बचत गरें।", date: "Jan 2026" },
  { name: "Andrei M.", form: "I-129F", rating: 5, flag: "🇷🇴", text: "Am completat formularul pentru logodnica mea în română! Procesul a fost simplu și am economisit mult față de un avocat. Recomand cu încredere!", date: "Mar 2026" },
  { name: "Sergei V.", form: "I-485", rating: 5, flag: "🇷🇺", text: "Сэкономил на кредит потому что ИммиГид! Заполнил всё на русском языке за 30 минут. Грин-карта одобрена через 8 месяцев.", date: "Nov 2025" },
  { name: "Wei L.", form: "I-140", rating: 5, flag: "🇨🇳", text: "用中文填写移民表格太方便了！ImmIGuide帮我节省了大量律师费。强烈推荐给所有华人朋友！", date: "Mar 2026" },
  { name: "Mehmet K.", form: "I-539", rating: 5, flag: "🇹🇷", text: "Türkçe form doldurma imkanı harika! Avukat yerine ImmIGuide kullandım ve binlerce dolar tasarruf ettim. Herkese tavsiye ederim!", date: "Feb 2026" },
];

const STATS = { total: 12847, avgRating: 4.9, approved: 96, countries: 85 };

export default function PageReviews() {
  const { lang, go } = useContext(AppCtx) as any;
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  return (
    <div style={S.page} dir={isRTL ? "rtl" : "ltr"}>
      <Nav title="Reviews" backTo="dashboard" />

      {/* Stats banner */}
      <div style={{
        background: "linear-gradient(135deg,rgba(52,211,153,.12),rgba(99,102,241,.08))",
        border: "2px solid rgba(52,211,153,.3)", borderRadius: 20, padding: 20,
        textAlign: "center", marginBottom: 16,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: S.ok }}>{STATS.total.toLocaleString()}+</div>
            <div style={{ fontSize: 10, color: S.t2 }}>Happy Clients</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#fbbf24" }}>{"★".repeat(5)} {STATS.avgRating}</div>
            <div style={{ fontSize: 10, color: S.t2 }}>Average Rating</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: S.ok }}>{STATS.approved}%</div>
            <div style={{ fontSize: 10, color: S.t2 }}>Approval Rate</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: S.pri }}>{STATS.countries}</div>
            <div style={{ fontSize: 10, color: S.t2 }}>Countries Served</div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {REVIEWS.map((r, i) => (
        <div key={i} style={{ ...S.crd, padding: 16, cursor: "default" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>{r.flag}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: 10, color: S.t2 }}>{r.form} | {r.date}</div>
              </div>
            </div>
            <div style={{ color: "#fbbf24", fontSize: 12 }}>{"★".repeat(r.rating)}</div>
          </div>
          <div style={{ fontSize: 12, color: S.t2, lineHeight: 1.6, fontStyle: "italic" }}>"{r.text}"</div>
        </div>
      ))}

      <div style={{ fontSize: 10, color: S.t2, textAlign: "center", margin: "12px 0" }}>
        Reviews are from verified ImmIGuide customers. Results may vary.
      </div>

      <Btn onClick={() => go("formSelect")}>Start Your Application →</Btn>
    </div>
  );
}
