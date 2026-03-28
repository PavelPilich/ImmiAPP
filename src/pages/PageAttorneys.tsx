import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import { t } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";

const PLACEHOLDER_ATTORNEYS = [
  { lang: "English", flag: "🇺🇸", name: "Your Law Firm Here", specialty: "Immigration Law — English Speaking", location: "Nationwide, USA" },
  { lang: "Español", flag: "🇪🇸", name: "Su Bufete Aquí", specialty: "Derecho Migratorio — Habla Español", location: "Nationwide, USA" },
  { lang: "Русский", flag: "🇷🇺", name: "Ваша Фирма Здесь", specialty: "Иммиграционное Право — Русскоязычный", location: "Nationwide, USA" },
  { lang: "Українська", flag: "🇺🇦", name: "Ваша Фірма Тут", specialty: "Імміграційне Право — Україномовний", location: "Nationwide, USA" },
  { lang: "Polski", flag: "🇵🇱", name: "Twoja Kancelaria Tutaj", specialty: "Prawo Imigracyjne — Język Polski", location: "Nationwide, USA" },
  { lang: "Français", flag: "🇫🇷", name: "Votre Cabinet Ici", specialty: "Droit de l'Immigration — Francophone", location: "Nationwide, USA" },
  { lang: "Português", flag: "🇧🇷", name: "Seu Escritório Aqui", specialty: "Direito Imigratório — Língua Portuguesa", location: "Nationwide, USA" },
  { lang: "Kreyòl Ayisyen", flag: "🇭🇹", name: "Kabinè Ou Isit La", specialty: "Lwa Imigrasyon — Kreyòl Ayisyen", location: "Nationwide, USA" },
  { lang: "العربية", flag: "🇸🇦", name: "مكتبك هنا", specialty: "قانون الهجرة — ناطق بالعربية", location: "Nationwide, USA" },
  { lang: "Soomaali", flag: "🇸🇴", name: "Xafiiskaaga Halkan", specialty: "Sharciga Hijrada — Af-Soomaali", location: "Nationwide, USA" },
  { lang: "नेपाली", flag: "🇳🇵", name: "तपाईंको फर्म यहाँ", specialty: "आप्रवासन कानून — नेपाली भाषी", location: "Nationwide, USA" },
  { lang: "မြန်မာ", flag: "🇲🇲", name: "သင့်ရုံးဒီမှာ", specialty: "လူဝင်မှုကြီးကြပ်ရေးဥပဒေ — မြန်မာစကား", location: "Nationwide, USA" },
  { lang: "Română", flag: "🇷🇴", name: "Firma Dvs. Aici", specialty: "Drept Imigratoric — Limba Română", location: "Nationwide, USA" },
  { lang: "Български", flag: "🇧🇬", name: "Вашата Фирма Тук", specialty: "Имиграционно Право — Български Език", location: "Nationwide, USA" },
  { lang: "Türkçe", flag: "🇹🇷", name: "Firmanız Burada", specialty: "Göçmenlik Hukuku — Türkçe", location: "Nationwide, USA" },
  { lang: "Italiano", flag: "🇮🇹", name: "Il Vostro Studio Qui", specialty: "Diritto dell'Immigrazione — Italiano", location: "Nationwide, USA" },
  { lang: "Deutsch", flag: "🇩🇪", name: "Ihre Kanzlei Hier", specialty: "Einwanderungsrecht — Deutsch", location: "Nationwide, USA" },
  { lang: "فارسی", flag: "🇮🇷", name: "دفتر شما اینجا", specialty: "حقوق مهاجرت — فارسی زبان", location: "Nationwide, USA" },
  { lang: "עברית", flag: "🇮🇱", name: "המשרד שלכם כאן", specialty: "דיני הגירה — דובר עברית", location: "Nationwide, USA" },
  { lang: "中文", flag: "🇨🇳", name: "您的律所在此", specialty: "移民法 — 中文服务", location: "Nationwide, USA" },
];

const T_ATTY: Record<string, Record<string, string>> = {
  needLegal:   { en:"Need Legal Advice?",es:"¿Necesita Asesoría Legal?",ru:"Нужна юридическая консультация?",uk:"Потрібна юридична консультація?",pl:"Potrzebujesz porady prawnej?",fr:"Besoin de conseils juridiques?",pt:"Precisa de assessoria jurídica?",ht:"Bezwen konsèy legal?",ar:"هل تحتاج استشارة قانونية؟",so:"Ma u baahan tahay talo sharci?",ne:"कानूनी सल्लाह चाहिन्छ?",my:"ဥပဒေအကြံဉာဏ်လိုအပ်ပါသလား?" },
  heroDesc:    { en:"While ImmIGuide handles your form preparation, some cases may require professional legal counsel. Browse verified immigration attorneys below.",es:"Mientras ImmIGuide prepara sus formularios, algunos casos pueden requerir asesoría legal profesional. Explore abogados de inmigración verificados.",ru:"Пока ImmIGuide готовит ваши формы, некоторые случаи могут потребовать профессиональной юридической консультации. Просмотрите проверенных адвокатов.",uk:"Поки ImmIGuide готує ваші форми, деякі випадки можуть потребувати юридичної допомоги. Перегляньте перевірених адвокатів.",pl:"Podczas gdy ImmIGuide przygotowuje formularze, niektóre sprawy mogą wymagać profesjonalnej porady prawnej.",fr:"Pendant que ImmIGuide prépare vos formulaires, certains cas peuvent nécessiter un conseil juridique professionnel.",pt:"Enquanto o ImmIGuide prepara seus formulários, alguns casos podem exigir assessoria jurídica profissional.",ht:"Pandan ImmIGuide prepare fòm ou yo, kèk ka ka mande konsèy legal pwofesyonèl.",ar:"بينما يعد ImmIGuide نماذجك، قد تتطلب بعض الحالات استشارة قانونية متخصصة.",so:"Inta ImmIGuide uu diyaarinayo foomamkaaga, kiisas qaar waxay u baahan yihiin talo sharci.",ne:"ImmIGuide ले तपाईंको फारम तयार गर्दा, केही केसमा कानूनी सल्लाह आवश्यक हुन सक्छ।",my:"ImmIGuide သည် သင့်ပုံစံများကို ပြင်ဆင်နေစဉ် အချို့ကိစ္စများတွင် ဥပဒေအကြံဉာဏ် လိုအပ်နိုင်ပါသည်။" },
  featured:    { en:"Featured Attorneys",es:"Abogados Destacados",ru:"Рекомендуемые адвокаты",uk:"Рекомендовані адвокати",pl:"Polecani adwokaci",fr:"Avocats en vedette",pt:"Advogados em destaque",ht:"Avoka Vedèt",ar:"محامون مميزون",so:"Qareenno La Soo Bandhigay",ne:"विशेष वकिलहरू",my:"အထူးရှေ့နေများ" },
  sponsored:   { en:"SPONSORED LISTINGS",es:"ANUNCIOS PATROCINADOS",ru:"РЕКЛАМНЫЕ ОБЪЯВЛЕНИЯ",uk:"РЕКЛАМНІ ОГОЛОШЕННЯ",pl:"OGŁOSZENIA SPONSOROWANE",fr:"ANNONCES SPONSORISÉES",pt:"ANÚNCIOS PATROCINADOS",ht:"LIS PATWONE",ar:"إعلانات مدفوعة",so:"LIISASKA LA MAALGELIYEY",ne:"प्रायोजित सूची",my:"ကြော်ငြာစာရင်းများ" },
  available:   { en:"This Spot Is Available",es:"Este Espacio Está Disponible",ru:"Это место свободно",uk:"Це місце вільне",pl:"To miejsce jest dostępne",fr:"Cet espace est disponible",pt:"Este espaço está disponível",ht:"Plas sa disponib",ar:"هذا المكان متاح",so:"Boosku waa bannaan yahay",ne:"यो स्थान उपलब्ध छ",my:"ဤနေရာ ရနိုင်ပါသည်" },
  contactAdmin:{ en:"Contact admin to list your practice",es:"Contacte al administrador para listar su práctica",ru:"Свяжитесь с администратором для размещения",uk:"Зверніться до адміністратора для розміщення",pl:"Skontaktuj się z administratorem",fr:"Contactez l'administrateur pour vous inscrire",pt:"Entre em contato para listar sua prática",ht:"Kontakte admin pou lis pratik ou",ar:"تواصل مع الإدارة لإدراج مكتبك",so:"La xiriir maamulka si aad u liisato",ne:"सूचीकरणको लागि एडमिनलाई सम्पर्क गर्नुहोस्",my:"စာရင်းတင်ရန် အက်ဒမင်ကို ဆက်သွယ်ပါ" },
  disclaimer:  { en:"ImmIGuide is NOT a law firm and does NOT provide legal advice. Attorney listings are paid advertisements. We sell advertising space only. Any engagement with a listed attorney is at your own risk.",es:"ImmIGuide NO es un bufete de abogados y NO proporciona asesoría legal. Los listados son anuncios pagados. Cualquier contratación es bajo su propio riesgo.",ru:"ImmIGuide НЕ является юридической фирмой и НЕ предоставляет юридических консультаций. Объявления адвокатов являются платной рекламой. Любое обращение к адвокату — на ваш собственный риск.",uk:"ImmIGuide НЕ є юридичною фірмою і НЕ надає юридичних порад. Оголошення адвокатів є платною рекламою. Будь-яке звернення до адвоката — на ваш власний ризик.",pl:"ImmIGuide NIE jest kancelarią prawną i NIE udziela porad prawnych. Ogłoszenia adwokatów to płatne reklamy. Wszelkie kontakty z adwokatem odbywają się na własne ryzyko.",fr:"ImmIGuide N'est PAS un cabinet d'avocats et NE fournit PAS de conseils juridiques. Les annonces sont des publicités payantes. Tout engagement est à vos propres risques.",pt:"ImmIGuide NÃO é um escritório de advocacia e NÃO fornece assessoria jurídica. Os anúncios são publicidade paga. Qualquer contratação é por sua conta e risco.",ht:"ImmIGuide PA yon kabinè avoka e PA bay konsèy legal. Lis avoka yo se piblisite peye. Tout angajman ak yon avoka se sou pwòp risk ou.",ar:"ImmIGuide ليس مكتب محاماة ولا يقدم استشارات قانونية. قوائم المحامين إعلانات مدفوعة. أي تعامل مع محامٍ مدرج يكون على مسؤوليتك الخاصة.",so:"ImmIGuide MA AHA xafiis qareen kama bixiso talo sharci. Liisaska qareenadu waa xayeysiis la bixiyey. Macaamil kasta waa khatartaada.",ne:"ImmIGuide कानूनी फर्म होइन र कानूनी सल्लाह प्रदान गर्दैन। वकिल सूची भुक्तान गरिएको विज्ञापन हो। कुनै पनि संलग्नता तपाईंको आफ्नो जोखिममा छ।",my:"ImmIGuide သည် ဥပဒေအတိုင်ပင်ခံ လုပ်ငန်းမဟုတ်ပါ။ ရှေ့နေစာရင်းများသည် ကြော်ငြာများဖြစ်သည်။ မည်သည့် ဆက်သွယ်မှုမဆို သင့်ကိုယ်ပိုင်အန္တရာယ်ဖြင့် ဖြစ်သည်။" },
  areYouAtty:  { en:"Are you an immigration attorney?",es:"¿Es usted un abogado de inmigración?",ru:"Вы иммиграционный адвокат?",uk:"Ви імміграційний адвокат?",pl:"Czy jesteś adwokatem imigracyjnym?",fr:"Êtes-vous un avocat en immigration?",pt:"Você é um advogado de imigração?",ht:"Èske ou se yon avoka imigrasyon?",ar:"هل أنت محامي هجرة؟",so:"Ma qareen soo-gal ah ayaad tahay?",ne:"के तपाईं आप्रवासन वकिल हुनुहुन्छ?",my:"သင်သည် လူဝင်မှုကြီးကြပ်ရေးရှေ့နေဖြစ်ပါသလား?" },
  applyHere:   { en:"Apply Here to Get Listed",es:"Aplique Aquí para Ser Listado",ru:"Подать заявку на размещение",uk:"Подати заявку на розміщення",pl:"Złóż wniosek o wpis",fr:"Postulez ici pour être listé",pt:"Candidate-se aqui para ser listado",ht:"Aplike isit pou yo lis ou",ar:"تقدم هنا للإدراج",so:"Halkan ka codso si laguu liiso",ne:"सूचीकरणको लागि यहाँ आवेदन दिनुहोस्",my:"စာရင်းတင်ရန် ဤနေရာတွင် လျှောက်ထားပါ" },
};

function ta(lang: string, key: string) {
  return T_ATTY[key]?.[lang] || T_ATTY[key]?.en || key;
}

export default function PageAttorneys() {
  const { lang, go } = useContext(AppCtx) as any;
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  // Attorney portal state
  const [showPortal, setShowPortal] = useState(false);
  const [portalStep, setPortalStep] = useState(0); // 0=form, 1=cases, 2=proposal
  const [attyData, setAttyData] = useState({
    fullName: "", firmName: "", barNumber: "", barState: "",
    email: "", phone: "", languages: "", specialty: "", website: "",
  });
  const [cases, setCases] = useState([
    { formType: "", outcome: "", clientSatisfied: "" },
    { formType: "", outcome: "", clientSatisfied: "" },
    { formType: "", outcome: "", clientSatisfied: "" },
  ]);

  const updateAtty = (k: string, v: string) => setAttyData(p => ({ ...p, [k]: v }));
  const updateCase = (i: number, k: string, v: string) => {
    const c = [...cases];
    (c[i] as any)[k] = v;
    setCases(c);
  };
  const addCase = () => { if (cases.length < 5) setCases([...cases, { formType: "", outcome: "", clientSatisfied: "" }]); };

  const step0Valid = attyData.fullName && attyData.firmName && attyData.barNumber && attyData.barState && attyData.email && attyData.phone;
  const step1Valid = cases.filter(c => c.formType && c.outcome && c.clientSatisfied).length >= 3;

  const clickFill = (setter: (v: string) => void, val: string, current: string) => {
    if (!current) setter(val);
  };

  // ════════════════════════════════════════
  // CLIENT-FACING VIEW (default)
  // ════════════════════════════════════════
  if (!showPortal) {
    return (
      <div style={S.page} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={t(lang, "attorneys")} backTo="dashboard" />

        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg,rgba(99,102,241,.15),rgba(234,179,8,.1))",
          border: "2px solid rgba(234,179,8,.3)", borderRadius: 20, padding: 24,
          textAlign: "center", marginBottom: 16,
        }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>&#9878;</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{ta(lang, "needLegal")}</h2>
          <p style={{ fontSize: 13, color: S.t2, lineHeight: 1.6 }}>{ta(lang, "heroDesc")}</p>
        </div>

        {/* When to hire */}
        <div style={{ ...S.crd, padding: 20, cursor: "default", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>When You May Need an Attorney</div>
          {[
            { icon: "⚠️", text: "Criminal history or prior deportation orders" },
            { icon: "🔄", text: "Denied applications or appeals" },
            { icon: "👨‍👩‍👧‍👦", text: "Complex family situations (multiple petitions)" },
            { icon: "🏢", text: "Employer-sponsored visas (H-1B, L-1, O-1)" },
            { icon: "🛡️", text: "Asylum or withholding of removal cases" },
            { icon: "📋", text: "Waivers of inadmissibility (I-601, I-212)" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: i < 5 ? 10 : 0 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: "#fff" }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Attorney listings */}
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{ta(lang, "featured")}</div>
        <div style={{ fontSize: 11, color: S.wrn, fontWeight: 600, marginBottom: 12 }}>{ta(lang, "sponsored")}</div>

        {PLACEHOLDER_ATTORNEYS.map((atty, i) => (
          <div key={i} style={{
            ...S.crd, padding: 16, cursor: "default",
            border: "1.5px dashed rgba(234,179,8,.4)", background: "rgba(234,179,8,.05)",
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(234,179,8,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{atty.flag}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: S.wrn }}>{atty.name}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 8, background: "rgba(234,179,8,.15)", color: S.wrn }}>{atty.lang}</div>
                </div>
                <div style={{ fontSize: 11, color: S.t2, marginTop: 2 }}>{atty.specialty}</div>
                <div style={{ fontSize: 10, color: S.t2, marginTop: 2 }}>{atty.location}</div>
              </div>
            </div>
            <div style={{ marginTop: 10, padding: 10, borderRadius: 10, background: "rgba(234,179,8,.08)", border: "1px solid rgba(234,179,8,.15)", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: S.wrn, fontWeight: 700 }}>{ta(lang, "available")}</div>
              <div style={{ fontSize: 10, color: S.t2, marginTop: 2 }}>{ta(lang, "contactAdmin")}</div>
            </div>
          </div>
        ))}

        {/* Disclaimer */}
        <div style={{ background: "rgba(251,191,36,.08)", border: "1px solid rgba(251,191,36,.3)", borderRadius: 12, padding: 14, marginBottom: 12, fontSize: 11, color: S.wrn, lineHeight: 1.6 }}>
          {ta(lang, "disclaimer")}
        </div>

        {/* Rating & Quality Policy */}
        <div style={{ background: "rgba(52,211,153,.08)", border: "1px solid rgba(52,211,153,.3)", borderRadius: 12, padding: 14, marginBottom: 12, fontSize: 11, color: S.ok, lineHeight: 1.6 }}>
          <strong>OUR QUALITY GUARANTEE:</strong> Only positive client results and reviews are reflected in ImmIGuide's app rating. Negative attorney experiences do not affect our platform's rating — we are a form-preparation tool, not a law firm. Attorney performance is tracked separately.
        </div>

        <div style={{ background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.3)", borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 11, color: S.err, lineHeight: 1.6 }}>
          <strong>3-STRIKE REMOVAL POLICY:</strong> If any listed attorney receives 3 or more negative client reviews or complaints, that attorney will be immediately and permanently removed from the ImmIGuide platform — regardless of remaining contract time. No refunds will be issued. We prioritize our users' safety and trust above all else.
        </div>

        {/* Attorney portal entry — small link, not prominent */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: S.t2, marginBottom: 6 }}>{ta(lang, "areYouAtty")}</div>
          <button onClick={() => setShowPortal(true)} style={{
            background: "none", border: "1.5px solid rgba(234,179,8,.4)",
            borderRadius: 10, padding: "8px 20px", color: S.wrn, fontSize: 12,
            fontWeight: 700, cursor: "pointer",
          }}>
            {ta(lang, "applyHere")}
          </button>
        </div>

        <Btn onClick={() => go("dashboard")}>{t(lang, "back")}</Btn>
      </div>
    );
  }

  // ════════════════════════════════════════
  // ATTORNEY PORTAL (hidden from clients)
  // ════════════════════════════════════════
  const inp = { ...S.inp, marginBottom: 8 };

  return (
    <div style={S.page}>
      <Nav title="Attorney Portal" backTo="dashboard" />

      {/* Step indicator */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {["Your Info", "Case Results", "Proposal"].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: "8px 4px", borderRadius: 8, textAlign: "center",
            fontSize: 11, fontWeight: 700,
            background: i === portalStep ? S.priBtn : "rgba(255,255,255,.07)",
            color: i === portalStep ? "#fff" : i < portalStep ? S.ok : S.t2,
          }}>
            {i < portalStep ? "✓ " : ""}{s}
          </div>
        ))}
      </div>

      {/* STEP 0: Attorney Information */}
      {portalStep === 0 && (
        <>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Attorney Information</div>
          <div style={{ fontSize: 12, color: S.t2, marginBottom: 16, lineHeight: 1.5 }}>
            Please provide your professional credentials. All information will be verified before your listing goes live.
          </div>

          <label style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Full Legal Name *</label>
          <input value={attyData.fullName} onChange={e => updateAtty("fullName", e.target.value)} onClick={() => clickFill(v => updateAtty("fullName", v), "John Smith, Esq.", attyData.fullName)} style={inp} />

          <label style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Law Firm Name *</label>
          <input value={attyData.firmName} onChange={e => updateAtty("firmName", e.target.value)} onClick={() => clickFill(v => updateAtty("firmName", v), "Smith Immigration Law, PLLC", attyData.firmName)} style={inp} />

          <label style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Bar Number *</label>
          <input value={attyData.barNumber} onChange={e => updateAtty("barNumber", e.target.value)} onClick={() => clickFill(v => updateAtty("barNumber", v), "FL-123456", attyData.barNumber)} style={inp} />

          <label style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Bar State *</label>
          <input value={attyData.barState} onChange={e => updateAtty("barState", e.target.value)} onClick={() => clickFill(v => updateAtty("barState", v), "Florida", attyData.barState)} style={inp} />

          <label style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Email *</label>
          <input type="email" value={attyData.email} onChange={e => updateAtty("email", e.target.value)} onClick={() => clickFill(v => updateAtty("email", v), "jsmith@smithimmigration.com", attyData.email)} style={inp} />

          <label style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Phone *</label>
          <input type="tel" value={attyData.phone} onChange={e => updateAtty("phone", e.target.value)} onClick={() => clickFill(v => updateAtty("phone", v), "3051234567", attyData.phone)} style={inp} />

          <label style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Languages Spoken</label>
          <input value={attyData.languages} onChange={e => updateAtty("languages", e.target.value)} onClick={() => clickFill(v => updateAtty("languages", v), "English, Spanish, Russian", attyData.languages)} placeholder="e.g. English, Spanish" style={inp} />

          <label style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Specialty</label>
          <input value={attyData.specialty} onChange={e => updateAtty("specialty", e.target.value)} onClick={() => clickFill(v => updateAtty("specialty", v), "Family Immigration, Green Cards, TPS", attyData.specialty)} placeholder="e.g. Family Immigration, Asylum" style={inp} />

          <label style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Website</label>
          <input value={attyData.website} onChange={e => updateAtty("website", e.target.value)} onClick={() => clickFill(v => updateAtty("website", v), "https://smithimmigration.com", attyData.website)} placeholder="https://" style={inp} />

          <Btn disabled={!step0Valid} onClick={() => setPortalStep(1)}>
            {step0Valid ? "Next — Case Results →" : "Fill All Required Fields (*)"}
          </Btn>
        </>
      )}

      {/* STEP 1: Case Results (3-5 required) */}
      {portalStep === 1 && (
        <>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Proven Case Results</div>
          <div style={{ fontSize: 12, color: S.t2, marginBottom: 16, lineHeight: 1.5 }}>
            Provide 3 to 5 cases where you achieved successful outcomes and clients were satisfied.
            This is required to be listed on ImmIGuide.
          </div>

          {cases.map((c, i) => (
            <div key={i} style={{
              ...S.crd, padding: 16, cursor: "default",
              border: c.formType && c.outcome && c.clientSatisfied ? "1.5px solid rgba(52,211,153,.4)" : "1px solid " + S.bdr,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                <span>Case #{i + 1} {i < 3 ? "*" : "(optional)"}</span>
                {c.formType && c.outcome && c.clientSatisfied && <span style={{ color: S.ok }}>✓</span>}
              </div>

              <label style={{ fontSize: 11, color: S.t2 }}>Form Type / Case Type</label>
              <input value={c.formType} onChange={e => updateCase(i, "formType", e.target.value)}
                onClick={() => { if (!c.formType) updateCase(i, "formType", ["I-485 Green Card", "N-400 Citizenship", "I-130 Family Petition", "I-589 Asylum", "I-751 Remove Conditions"][i] || "I-485 Green Card"); }}
                placeholder="e.g. I-485 Green Card" style={inp} />

              <label style={{ fontSize: 11, color: S.t2 }}>Outcome / Result</label>
              <input value={c.outcome} onChange={e => updateCase(i, "outcome", e.target.value)}
                onClick={() => { if (!c.outcome) updateCase(i, "outcome", ["Approved — Green card received in 8 months", "Approved — Citizenship granted", "Approved — Family reunited in 14 months", "Granted — Asylum approved", "Approved — Conditions removed"][i] || "Approved"); }}
                placeholder="e.g. Approved, Green card received" style={inp} />

              <label style={{ fontSize: 11, color: S.t2 }}>Client Satisfied? (describe)</label>
              <input value={c.clientSatisfied} onChange={e => updateCase(i, "clientSatisfied", e.target.value)}
                onClick={() => { if (!c.clientSatisfied) updateCase(i, "clientSatisfied", ["Yes — 5-star review, referred 3 friends", "Yes — client became US citizen", "Yes — family reunited, very grateful", "Yes — client safe and employed in US", "Yes — couple stayed together, no issues"][i] || "Yes — client satisfied"); }}
                placeholder="e.g. Yes, client left 5-star review" style={inp} />
            </div>
          ))}

          {cases.length < 5 && (
            <button onClick={addCase} style={{ ...S.btnO, width: "100%", marginBottom: 8, fontSize: 12 }}>
              + Add Another Case (up to 5)
            </button>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setPortalStep(0)} style={{ ...S.btnO, flex: 1, padding: "12px 16px", fontSize: 14 }}>{t(lang, "back")}</button>
            <Btn disabled={!step1Valid} onClick={() => setPortalStep(2)} style={{ flex: 2 }}>
              {step1Valid ? "View Our Proposal →" : `Need ${3 - cases.filter(c => c.formType && c.outcome && c.clientSatisfied).length} More Cases`}
            </Btn>
          </div>
        </>
      )}

      {/* STEP 2: Proposal (only shown after credentials + cases) */}
      {portalStep === 2 && (
        <>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Welcome, {attyData.fullName.split(",")[0]}!</div>
            <div style={{ fontSize: 13, color: S.t2, lineHeight: 1.5 }}>
              Your credentials and case results have been submitted for review.
              Here is our exclusive listing proposal for your practice.
            </div>
          </div>

          {/* Requirements met badge */}
          <div style={{ ...S.crd, padding: 16, cursor: "default", border: "1.5px solid rgba(52,211,153,.4)", background: "rgba(52,211,153,.06)", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Your Verification Status</div>
            {[
              `Bar #${attyData.barNumber} — ${attyData.barState}`,
              `${cases.filter(c => c.formType).length} case results submitted`,
              `Languages: ${attyData.languages || "English"}`,
              `Specialty: ${attyData.specialty || "Immigration Law"}`,
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: S.ok, fontSize: 12 }}>✓</span>
                <span style={{ fontSize: 12, color: "#fff" }}>{item}</span>
              </div>
            ))}
            <div style={{ fontSize: 10, color: S.wrn, marginTop: 8 }}>Final verification by admin within 24 hours</div>
          </div>

          {/* ═══ PRICING TIERS ═══ */}
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12, textAlign: "center" }}>Listing Plans</div>

          {/* Basic */}
          <div style={{ ...S.crd, padding: 20, cursor: "default", border: "1.5px solid rgba(147,197,253,.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 800 }}>Basic Listing</div>
              <div><span style={{ fontSize: 22, fontWeight: 900, color: S.pri }}>$500</span><span style={{ fontSize: 11, color: S.t2 }}>/mo</span></div>
            </div>
            <div style={{ fontSize: 11, color: S.ok, fontWeight: 600, marginBottom: 10 }}>$4,800/year (save 20%)</div>
            {["Profile in 1 language slot", "Name, specialty & contact info", "Location & bar number displayed", "Client inquiry notifications"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: S.ok, fontSize: 12 }}>✓</span><span style={{ fontSize: 12, color: S.t2 }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Featured */}
          <div style={{ ...S.crd, padding: 20, cursor: "default", border: "2px solid rgba(234,179,8,.5)", background: "rgba(234,179,8,.06)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: S.wrn, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Most Popular</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 800 }}>Featured Listing</div>
              <div><span style={{ fontSize: 22, fontWeight: 900, color: S.wrn }}>$1,000</span><span style={{ fontSize: 11, color: S.t2 }}>/mo</span></div>
            </div>
            <div style={{ fontSize: 11, color: S.ok, fontWeight: 600, marginBottom: 10 }}>$9,600/year (save 20%)</div>
            {["Everything in Basic", "Highlighted card with gold border", "Top placement in your language", "Verified badge displayed", "Case results showcase (3-5 cases)", "Priority in search results"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: S.wrn, fontSize: 12 }}>★</span><span style={{ fontSize: 12, color: "#fff" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Premium */}
          <div style={{ ...S.crd, padding: 20, cursor: "default", border: "2px solid rgba(168,85,247,.5)", background: "rgba(168,85,247,.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 800 }}>Premium Listing</div>
              <div><span style={{ fontSize: 22, fontWeight: 900, color: "#a855f7" }}>$1,500</span><span style={{ fontSize: 11, color: S.t2 }}>/mo</span></div>
            </div>
            <div style={{ fontSize: 11, color: S.ok, fontWeight: 600, marginBottom: 10 }}>$14,400/year (save 20%)</div>
            {["Everything in Featured", "Listed on ALL 12 language pages", "Exclusive slot — no competitors", "Analytics dashboard (views, clicks, leads)", "Direct lead notifications via SMS & email", "Priority admin support & quarterly review"].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: "#a855f7", fontSize: 12 }}>◆</span><span style={{ fontSize: 12, color: "#fff" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Annual — BEST VALUE */}
          <div style={{
            background: "linear-gradient(135deg,rgba(234,179,8,.12),rgba(239,68,68,.08))",
            border: "3px solid rgba(234,179,8,.6)", borderRadius: 16,
            padding: 24, marginTop: 4, marginBottom: 16, position: "relative" as const, overflow: "hidden",
          }}>
            <div style={{ position: "absolute" as const, top: 12, right: -28, background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 32px", transform: "rotate(45deg)", letterSpacing: 1 }}>BEST VALUE</div>

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: S.wrn, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Annual Subscription</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>$11,999<span style={{ fontSize: 14, color: S.t2 }}>/year</span></div>
              <div style={{ fontSize: 13, color: S.ok, fontWeight: 700, marginTop: 4 }}>Save $6,001 vs. monthly Premium ($18,000/yr)</div>
              <div style={{ display: "inline-block", marginTop: 10, padding: "6px 16px", borderRadius: 20, background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontSize: 13, fontWeight: 800, boxShadow: "0 4px 15px rgba(34,197,94,.4)" }}>
                🎁 Sign Up for a Year — Get 1 Month FREE!
              </div>
              <div style={{ fontSize: 11, color: S.t2, marginTop: 6 }}>That's 13 months of exposure for the price of 12 — only $923/month</div>
            </div>

            {[
              { icon: "💰", title: "One Client Pays for Your Entire Year", desc: "Just 3-8 new clients covers your full subscription." },
              { icon: "🏆", title: "Exclusive Territory — Zero Competition", desc: "You own your language slot. No other attorney competes." },
              { icon: "📈", title: "Thousands of Warm Leads", desc: "Users actively filing forms — not cold leads." },
              { icon: "🌍", title: "12 Language Markets", desc: "Featured across all 12 language pages simultaneously." },
              { icon: "📊", title: "Full Analytics & Lead Tracking", desc: "Monthly reports on views, clicks, and leads." },
              { icon: "⭐", title: "Case Results Showcase", desc: "Your best cases displayed prominently with verified badge." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: S.t2 }}>{item.desc}</div>
                </div>
              </div>
            ))}

            {/* ROI */}
            <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 12, padding: 16, marginTop: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 800, textAlign: "center", marginBottom: 10, color: S.ok }}>The Math Speaks for Itself</div>
              {[["Your investment", "$11,999"], ["Avg case fee", "$2,500"], ["Break even", "Only 5 cases"], ["Expected clients/yr", "20-50+"]].map(([l, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: S.t2 }}>{l}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: i >= 2 ? S.ok : "#fff" }}>{v}</span>
                </div>
              ))}
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <div style={{ fontSize: 10, color: S.t2 }}>Potential annual revenue</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: S.ok }}>$50,000 - $125,000+</div>
              </div>
            </div>

            {/* Payment plan */}
            <div style={{ background: "rgba(99,102,241,.12)", border: "1.5px solid rgba(99,102,241,.4)", borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 800, textAlign: "center", marginBottom: 10 }}>Flexible Payment Plan</div>
              {[["Month 1 — Upon Signing", "50% deposit", "$6,000", S.wrn], ["Month 2", "25% installment", "$3,000", "#fff"], ["Month 3", "Final 25%", "$2,999", "#fff"]].map(([t, d, p, c], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < 2 ? 8 : 0, paddingBottom: i < 2 ? 8 : 0, borderBottom: i < 2 ? "1px solid rgba(255,255,255,.1)" : "none" }}>
                  <div><div style={{ fontSize: 12, fontWeight: 700 }}>{t}</div><div style={{ fontSize: 10, color: S.t2 }}>{d}</div></div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: c as string }}>{p}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(248,113,113,.1)", border: "1px solid rgba(248,113,113,.3)", borderRadius: 10, padding: 12, fontSize: 10, color: S.err, lineHeight: 1.5, marginBottom: 8 }}>
              <strong>CONTRACT REQUIRED:</strong> Annual subscription requires a signed contract by the attorney of record. No refunds after activation.
            </div>

            <div style={{ background: "rgba(248,113,113,.1)", border: "1px solid rgba(248,113,113,.3)", borderRadius: 10, padding: 12, fontSize: 10, color: S.err, lineHeight: 1.5 }}>
              <strong>3-STRIKE REMOVAL POLICY:</strong> If your practice receives 3 or more negative client reviews or complaints, your listing will be immediately and permanently removed from ImmIGuide — regardless of remaining contract time or payments made. No refunds will be issued. By signing, you agree to this policy. We protect our users first.
            </div>
          </div>

          {/* Contact */}
          <div style={{ background: "rgba(234,179,8,.08)", border: "2px solid rgba(234,179,8,.4)", borderRadius: 16, padding: 20, textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Ready to Get Listed?</div>
            <div style={{ fontSize: 12, color: S.t2, marginBottom: 12 }}>Our admin team will review your submission and contact you within 24 hours.</div>
            <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 10, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 11, color: S.t2 }}>Email</span><span style={{ fontSize: 12, fontWeight: 700 }}>attorneys@immiguide.com</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 11, color: S.t2 }}>Response</span><span style={{ fontSize: 12, fontWeight: 700, color: S.ok }}>Within 24 hours</span></div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setPortalStep(1)} style={{ ...S.btnO, flex: 1, padding: "12px 16px", fontSize: 14 }}>{t(lang, "back")}</button>
            <button onClick={() => setShowPortal(false)} style={{ ...S.btn, flex: 2 }}>Back to Directory</button>
          </div>
        </>
      )}
    </div>
  );
}
