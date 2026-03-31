import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PH = "(612) 216-1186";
const PHL = "tel:6122161186";
const EM = "Office@SmartConstructionMN.com";
const ADDR = "1507 92nd Ln NE, Blaine, MN 55449";
const WA = "https://wa.me/16122161186";
const FB_MSG = "https://m.me/SmartConstructMN";
const FB = "https://www.facebook.com/SmartConstructMN/";
const IG = "https://www.instagram.com/smartconstructionmn/";
const GG = "https://www.google.com/maps/place/Smart+Construction+%26+Remodeling,+Inc.";
const BBB_URL = "https://www.bbb.org/us/mn/minneapolis/profile/general-contractor/smart-construction-remodeling-inc-0704-96160987";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Service { icon: string; title: string; desc: string; color: string; detail: string }
interface Review { name: string; role: string; text: string; src: "Google" | "Facebook" | "BBB" }
interface Step { num: string; icon: string; title: string; brief: string; detail: string }
interface GalItem { title: string; city: string; type: string; beforeLabel: string; afterLabel: string; beforeGrad: string; afterGrad: string; beforeIcon: string; afterIcon: string }

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  { icon: "💧", title: "Water Damage", color: "#0ea5e9", desc: "Emergency extraction, structural drying, complete restoration from floods, leaks, and pipe bursts.",
    detail: "Water damage doubles every 24 hours. We arrive fast with truck-mounted extraction units, commercial dehumidifiers, and moisture meters. Our IICRC-certified techs document everything for a full insurance claim — walls, floors, ceilings, contents.\n\n• Emergency water extraction\n• Structural drying & monitoring\n• Mold prevention treatments\n• Content pack-out & restoration\n• Full insurance documentation" },
  { icon: "🔥", title: "Fire & Smoke", color: "#ef4444", desc: "Full fire restoration, smoke odor elimination, structural repair, and content cleaning.",
    detail: "Smoke causes more long-term damage than the fire itself. We handle emergency board-up, complete soot removal, thermal fogging, ozone treatment, and structural rebuild — with Xactimate estimates your carrier can't dispute.\n\n• Emergency board-up & securing\n• Smoke & soot removal\n• Thermal fogging / ozone odor treatment\n• Structural demolition & rebuild\n• Full insurance claim management" },
  { icon: "🌪️", title: "Storm Damage", color: "#8b5cf6", desc: "Complete restoration from blizzards, hail, tornadoes, and ice dams across Minnesota.",
    detail: "After a storm, insurance adjusters rush and miss damage. We inspect everything — roof, siding, windows, gutters, fascia — with drone photography. Our 98% approval rate comes from presenting claims adjusters cannot deny.\n\n• Emergency tarping & board-up\n• Drone aerial roof inspection\n• Hail damage documentation\n• Ice dam removal & prevention\n• Insurance negotiation & supplements" },
  { icon: "🦠", title: "Mold Remediation", color: "#22c55e", desc: "Professional testing, containment, removal, and clearance by IICRC-certified technicians.",
    detail: "Mold grows behind walls for weeks before you notice. Our certified techs test, contain, remove, and treat — then we rebuild so your home is fully restored. We know how to document mold as a covered event so insurance pays.\n\n• Air quality & surface testing\n• Negative pressure containment\n• HEPA air filtration\n• Safe removal per EPA guidelines\n• Post-remediation clearance testing" },
  { icon: "🏠", title: "Roof Restoration", color: "#06b6d4", desc: "Emergency tarping, full replacement, shingle repair, and insurance-approved roofing.",
    detail: "We inspect every square foot with drones, write Xactimate estimates, and meet your adjuster on the roof. GAF, Owens Corning, and CertainTeed shingles. 25–50 year manufacturer warranties.\n\n• Same-day emergency tarping\n• Full drone inspection & documentation\n• Xactimate-matched estimates\n• Adjuster walkthrough on-site\n• Premium shingle replacement" },
  { icon: "🪟", title: "Window Restoration", color: "#a855f7", desc: "Storm-damaged window replacement, energy-efficient upgrades, and full frame installation.",
    detail: "We fight for energy-efficient double or triple-pane replacements that reduce heating bills — and get your insurance to cover it. Andersen, Pella, Marvin brands available.\n\n• Complete window inspection\n• Emergency board-up\n• Low-E glass & argon fill upgrades\n• Interior & exterior trim restoration\n• Insurance claim filing & negotiation" },
  { icon: "🏗️", title: "Siding Restoration", color: "#f59e0b", desc: "Vinyl, fiber cement, and wood siding repair and full replacement from wind & hail damage.",
    detail: "We fight for full replacement — not patched siding that never matches. James Hardie, LP SmartSide, vinyl, and cedar options. Complete soffit, fascia, and trim.\n\n• Full exterior hail/wind inspection\n• Photo documentation of every panel\n• Full siding removal & replacement\n• Soffit, fascia & trim restoration\n• Color match documentation for insurance" },
  { icon: "🌧️", title: "Gutter Restoration", color: "#14b8a6", desc: "Seamless gutters, downspouts, LeafGuard systems, and ice dam prevention solutions.",
    detail: "We ensure gutter damage is included in every applicable storm claim. Custom seamless aluminum gutters fabricated on-site, heavy-duty hangers every 24 inches.\n\n• Full gutter system inspection\n• Hail & wind damage documentation\n• Seamless on-site fabrication\n• LeafGuard / gutter protection options\n• Proper downspout routing away from foundation" },
  { icon: "🔨", title: "General Remodeling", color: "#f97316", desc: "Kitchens, bathrooms, basements, additions, and full home renovations.",
    detail: "Licensed MN General Contractor (BC 63, 65, 73). All work in-house — no unknown subcontractors. Kitchen, bath, basement, additions, decks, and painting.\n\n• Kitchen & bathroom remodeling\n• Basement finishing\n• Home additions\n• Interior & exterior painting\n• Decks & porches" },
  { icon: "📋", title: "Other Services", color: "#6b7280", desc: "Foundation repair, electrical, plumbing, concrete, drywall, fencing, and commercial work.",
    detail: "Full-service general contractor for any residential or commercial property need.\n\n• Foundation repair\n• Electrical & plumbing\n• Concrete driveways & patios\n• Drywall repair & installation\n• Commercial restoration" },
];

const STEPS: Step[] = [
  { num: "01", icon: "📞", title: "Emergency Call — 24/7", brief: "We answer any time — nights, weekends, holidays.", detail: "The moment disaster strikes, call us. Our emergency dispatch team answers 24/7/365, assesses urgency, and mobilizes a crew — often within hours.\n\n• Immediate safety guidance\n• Emergency visit scheduled\n• Insurance process explained\n• You're not alone from minute one" },
  { num: "02", icon: "📋", title: "We File Your Claim", brief: "We handle all paperwork and fight for maximum coverage.", detail: "Insurance adjusters are trained to minimize payouts. We've been fighting them for 20+ years and winning. We file correctly, document thoroughly, and meet your adjuster on-site.\n\n• Proper first-time filing\n• Professional drone photography\n• Xactimate estimates (same software adjusters use)\n• Adjuster meeting & negotiation\n• Supplement filing for underpaid claims" },
  { num: "03", icon: "🔍", title: "Damage Assessment", brief: "We find damage others miss — and document everything.", detail: "A 15-minute adjuster walkthrough misses half the damage. We spend 1–3 hours with moisture meters, drone cameras, and thermal imaging — documenting 100+ photos per property.\n\n• Moisture meter readings\n• Drone aerial photography\n• Thermal imaging for hidden leaks\n• Line-by-line Xactimate estimate\n• Comprehensive written report" },
  { num: "04", icon: "📐", title: "Approved Restoration Plan", brief: "No surprises. You and your carrier approve everything first.", detail: "Before a single nail, you know exactly what's happening, when, and how much. We get carrier approval on scope and price before we start.\n\n• Plain-English scope of work\n• Material selection (you choose)\n• Start date & timeline\n• Insurance pre-approval on all costs\n• Supplement filing if estimate is low" },
  { num: "05", icon: "🔨", title: "Expert Restoration", brief: "Licensed crews. Premium materials. Built to last.", detail: "Our licensed, bonded, insured crews arrive on schedule. One dedicated project manager. Daily cleanup. Permits pulled. 100% code compliant.\n\n• Dedicated project manager\n• Daily progress updates\n• GAF, Hardie, Andersen materials\n• Daily site cleanup\n• Code-compliant with permits" },
  { num: "06", icon: "✅", title: "Final Walkthrough", brief: "We don't stop until you're 100% satisfied.", detail: "We walk every inch with you, fix anything on the spot, and handle all remaining insurance paperwork. Insurance pays us directly — you pay only your deductible.\n\n• Complete walkthrough with you\n• Punch list resolved on-site\n• Manufacturer warranty (25–50 yr)\n• Workmanship warranty\n• Insurance files closed" },
];

const REVIEWS: Review[] = [
  { name: "Lin B.", role: "BBB — 2026", src: "BBB", text: "Vadim's communication was top notch! Vladimir did outstanding work. They changed my mind about contractors." },
  { name: "Pavel Z.", role: "BBB — 2023", src: "BBB", text: "Exceeded all expectations on windows, roof, and siding. Professionalism and quality were exceptional." },
  { name: "Elijah S.", role: "Facebook", src: "Facebook", text: "Wonderful employees. Multiple jobs — our forever contractors. Always has the customers back!" },
  { name: "Donny K.", role: "Facebook", src: "Facebook", text: "Known Pavel 20+ years. Replaced roof, siding, windows from storm damage. Highly recommend!" },
  { name: "Alex B.", role: "BBB — Apple Valley", src: "BBB", text: "Gary was genuine — direct questions, direct answers. Clean install. House sold for more with new roof." },
  { name: "Ella S.", role: "BBB — 2023", src: "BBB", text: "Best roofing company in MN! Extremely knowledgeable. SUPERB work on windows and siding!" },
  { name: "Client", role: "Google ★★★★★", src: "Google", text: "Pavel is very nice, Gary is great. 10/10 recommend!" },
  { name: "Homeowner", role: "Google ★★★★★", src: "Google", text: "House looks like new! Crystal and Gary are wonderful. 10/10!" },
  { name: "Lee D.", role: "Facebook", src: "Facebook", text: "They do what's right and handle the insurance company!" },
];

const GALLERY: GalItem[] = [
  { title: "Commercial Roofing — CorTrust Bank", city: "Blaine", type: "Commercial", beforeLabel: "Aging shingles — pre-replacement", afterLabel: "New commercial roof system", beforeGrad: "linear-gradient(135deg,#78350f,#92400e,#a16207)", afterGrad: "linear-gradient(135deg,#1e3a5f,#1e40af,#3b82f6)", beforeIcon: "🏢", afterIcon: "🏢" },
  { title: "Storm Damage — Shingle Roof", city: "Minneapolis", type: "Storm Damage", beforeLabel: "Aerial — shingle blow-off visible", afterLabel: "Full roof + solar integration", beforeGrad: "linear-gradient(135deg,#374151,#4b5563,#6b7280)", afterGrad: "linear-gradient(135deg,#064e3b,#047857,#34d399)", beforeIcon: "🌪️", afterIcon: "☀️" },
  { title: "Severe Damage — Missing Shingles", city: "Plymouth", type: "Insurance Claim", beforeLabel: "Exposed underlayment — urgent claim", afterLabel: "Complete aerial assessment done", beforeGrad: "linear-gradient(135deg,#450a0a,#7f1d1d,#dc2626)", afterGrad: "linear-gradient(135deg,#374151,#4b5563,#9ca3af)", beforeIcon: "⚠️", afterIcon: "✅" },
  { title: "Full Property Storm Damage", city: "Eden Prairie", type: "Storm Damage", beforeLabel: "Aerial — damage across full property", afterLabel: "Ridge rebuilt — fully restored", beforeGrad: "linear-gradient(135deg,#1a2e05,#365314,#65a30d)", afterGrad: "linear-gradient(135deg,#1c1917,#44403c,#a8a29e)", beforeIcon: "🌪️", afterIcon: "🔨" },
  { title: "Ridge Cap Separation", city: "Burnsville", type: "Inspection", beforeLabel: "Close-up — ridge cap failure", afterLabel: "Flashing replaced, fully sealed", beforeGrad: "linear-gradient(135deg,#3f3f46,#52525b,#a1a1aa)", afterGrad: "linear-gradient(135deg,#27272a,#3f3f46,#71717a)", beforeIcon: "🔍", afterIcon: "🛠️" },
  { title: "Wind Damage — Shingle Blow-Off", city: "Woodbury", type: "Insurance Claim", beforeLabel: "Wind damage — deck exposed", afterLabel: "Full replacement completed", beforeGrad: "linear-gradient(135deg,#1c1917,#292524,#57534e)", afterGrad: "linear-gradient(135deg,#1a2e05,#3f6212,#84cc16)", beforeIcon: "💨", afterIcon: "🏠" },
];

const FAQS = [
  { q: "How much will I pay out of pocket?", a: "In most cases, only your deductible. We work within your insurance coverage to ensure zero additional out-of-pocket cost." },
  { q: "Do you work with my insurance company?", a: "Yes — we work with ALL major carriers: State Farm, Allstate, USAA, Liberty Mutual, Progressive, Travelers, American Family, Nationwide, and more." },
  { q: "What if my insurance claim gets denied?", a: "We have a 98% approval rate. Our Xactimate-certified estimators know exactly how to document and present claims that get approved and fully funded." },
  { q: "How long does restoration take?", a: "Roof replacement: 1–3 days. Siding: 3–7 days. Full exterior restoration: 2–4 weeks. Full interior remodel: 4–12 weeks. We give you a detailed timeline before starting." },
  { q: "Do I need to be home during the work?", a: "Not necessarily. Many homeowners leave a key or garage code. We coordinate around your schedule and give daily updates." },
  { q: "Are you licensed and insured?", a: "Yes. MN General Contractor License BC 63, 65, 73. Fully insured, bonded, BBB A+ rated since 2010, IICRC certified." },
  { q: "What areas do you serve?", a: "The entire Twin Cities metro and greater Minnesota — Minneapolis, St. Paul, Blaine, Brooklyn Park, Eden Prairie, Woodbury, and 50+ more communities." },
  { q: "Can you help with remodeling, not just insurance work?", a: "Absolutely. We do full remodeling: kitchens, bathrooms, basements, additions, and more — as a licensed MN General Contractor." },
];

const CITIES = ["Minneapolis", "St. Paul", "Blaine", "Brooklyn Park", "Maple Grove", "Plymouth", "Eden Prairie", "Burnsville", "Apple Valley", "Woodbury", "Minnetonka", "Bloomington", "Shakopee", "Elk River", "Forest Lake", "Inver Grove Heights", "Edina", "Lakeville", "St. Cloud", "Eagan"];

const SLIDE_PHOTOS = [
  { label: "Commercial Roofing — CorTrust Bank, Blaine", cat: "Commercial", grad: "linear-gradient(135deg,#78350f,#92400e,#a16207)" },
  { label: "Luxury Home — Tile Roof Restoration", cat: "Residential", grad: "linear-gradient(135deg,#c2410c,#d97706,#eab308)" },
  { label: "Aerial — Complete Roof System View", cat: "Drone", grad: "linear-gradient(135deg,#166534,#15803d,#4ade80)" },
  { label: "Storm Damage — Shingle Blow-Off Aerial", cat: "Storm", grad: "linear-gradient(135deg,#374151,#4b5563,#6b7280)" },
  { label: "Roof + Solar Panel Integration", cat: "Solar", grad: "linear-gradient(135deg,#1e3a5f,#1e40af,#3b82f6)" },
  { label: "Aerial Assessment — Full Property", cat: "Drone", grad: "linear-gradient(135deg,#064e3b,#047857,#34d399)" },
  { label: "Severe Damage — Missing Ridge Shingles", cat: "Storm", grad: "linear-gradient(135deg,#450a0a,#7f1d1d,#dc2626)" },
  { label: "Pool Enclosure — Roof & Solar Work", cat: "Residential", grad: "linear-gradient(135deg,#1e3a5f,#2563eb,#60a5fa)" },
  { label: "Storm Aftermath — Full Property Aerial", cat: "Storm", grad: "linear-gradient(135deg,#1a2e05,#365314,#65a30d)" },
  { label: "Wind Damage — Shingle Blow-Off", cat: "Storm", grad: "linear-gradient(135deg,#1c1917,#292524,#57534e)" },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, dir = "up" }: { children: React.ReactNode; delay?: number; dir?: "up" | "left" | "right" | "none" }) {
  const { ref, visible } = useInView();
  const transforms: Record<string, string> = { up: "translateY(28px)", left: "translateX(28px)", right: "translateX(-28px)", none: "none" };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : transforms[dir], transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-block", background: "rgba(59,130,246,.12)", color: "#60a5fa", padding: "5px 14px", borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14 }}>{children}</span>;
}

function SectionHeader({ tag, title, sub }: { tag: string; title: React.ReactNode; sub?: string }) {
  return (
    <FadeIn>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <Tag>{tag}</Tag>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, lineHeight: 1.15, marginBottom: sub ? 14 : 0 }}>{title}</h2>
        {sub && <p style={{ color: "rgba(255,255,255,.5)", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
      </div>
    </FadeIn>
  );
}

function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size * 2.8} height={size} viewBox="0 0 140 50">
      <polygon points="8,28 25,10 42,28" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinejoin="round" />
      <rect x="14" y="28" width="22" height="16" fill="none" stroke="#3b82f6" strokeWidth="2.5" rx="1" />
      <rect x="21" y="32" width="8" height="12" fill="#3b82f6" rx="1" />
      <text x="48" y="22" fill="#fff" fontSize="16" fontWeight="900" fontFamily="system-ui,sans-serif" letterSpacing="1">SMART</text>
      <text x="48" y="36" fill="#3b82f6" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif" letterSpacing="2.5">CONSTRUCTION</text>
      <text x="48" y="46" fill="rgba(255,255,255,.45)" fontSize="6.5" fontWeight="600" fontFamily="system-ui,sans-serif" letterSpacing="1.5">& REMODELING INC</text>
    </svg>
  );
}

// ─── PHOTO SLIDER ─────────────────────────────────────────────────────────────
function PhotoSlider() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setFading(true);
      setTimeout(() => { setIdx(i => (i + 1) % SLIDE_PHOTOS.length); setFading(false); }, 350);
    }, 4500);
    return () => clearInterval(iv);
  }, []);

  const go = (n: number) => { setFading(true); setTimeout(() => { setIdx((idx + n + SLIDE_PHOTOS.length) % SLIDE_PHOTOS.length); setFading(false); }, 300); };
  const p = SLIDE_PHOTOS[idx];

  return (
    <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", background: "#111", border: "1px solid rgba(255,255,255,.08)" }}>
      <div style={{ position: "absolute", inset: 0, background: p.grad, opacity: fading ? 0 : 1, transition: "opacity .4s ease" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%,rgba(255,255,255,.06) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ fontSize: 52, marginBottom: 16, filter: "drop-shadow(0 4px 12px rgba(0,0,0,.4))" }}>📸</div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", textAlign: "center", textShadow: "0 2px 8px rgba(0,0,0,.5)", lineHeight: 1.5, maxWidth: "85%" }}>{p.label}</p>
        </div>
      </div>
      {/* Badge */}
      <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,.55)", backdropFilter: "blur(10px)", padding: "4px 12px", borderRadius: 50, fontSize: 10, fontWeight: 700, color: "#60a5fa" }}>{p.cat}</div>
      {/* Counter */}
      <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,.55)", backdropFilter: "blur(10px)", padding: "4px 12px", borderRadius: 50, fontSize: 10, fontWeight: 700, color: "#fff" }}>{idx + 1}/{SLIDE_PHOTOS.length}</div>
      {/* Controls */}
      <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => go(-1)} style={sliderBtn}>◀</button>
        <button onClick={() => go(1)} style={{ ...sliderBtn, background: "rgba(59,130,246,.8)", width: 36, height: 36 }}>▶</button>
      </div>
      {/* Dots */}
      <div style={{ position: "absolute", bottom: 52, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
        {SLIDE_PHOTOS.map((_, i) => (
          <div key={i} onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 300); }} style={{ width: i === idx ? 18 : 6, height: 6, borderRadius: 3, background: i === idx ? "#3b82f6" : "rgba(255,255,255,.25)", transition: "all .3s", cursor: "pointer" }} />
        ))}
      </div>
    </div>
  );
}

const sliderBtn: React.CSSProperties = { width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,.55)", border: "none", color: "#fff", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };

// ─── COUNTER ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number | "24/7"; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        if (to === "24/7") { setVal(-1); return; }
        let i = 0;
        const iv = setInterval(() => { i++; setVal(Math.round((i / 60) * (to as number))); if (i >= 60) clearInterval(iv); }, 20);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val === -1 ? "24/7" : `${val.toLocaleString()}${suffix}`}</span>;
}

// ─── BEFORE/AFTER GALLERY ─────────────────────────────────────────────────────
function Gallery() {
  const [cur, setCur] = useState(0);
  const [pos, setPos] = useState(50);
  const [playing, setPlaying] = useState(true);
  const dragging = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setCur(c => (c + 1) % GALLERY.length), 4000);
    return () => clearInterval(iv);
  }, [playing]);

  const move = (cx: number) => {
    if (!dragging.current || !box.current) return;
    const r = box.current.getBoundingClientRect();
    setPos(Math.max(5, Math.min(95, ((cx - r.left) / r.width) * 100)));
  };

  const g = GALLERY[cur];
  return (
    <div>
      <div ref={box} style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 20, overflow: "hidden", cursor: "col-resize", userSelect: "none", border: "1px solid rgba(255,255,255,.08)" }}
        onMouseDown={() => { dragging.current = true; setPlaying(false); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onMouseMove={e => move(e.clientX)}
        onTouchStart={() => { dragging.current = true; setPlaying(false); }}
        onTouchEnd={() => { dragging.current = false; }}
        onTouchMove={e => move(e.touches[0].clientX)}
      >
        {/* AFTER */}
        <div style={{ position: "absolute", inset: 0, background: g.afterGrad, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 56, filter: "drop-shadow(0 4px 12px rgba(0,0,0,.4))" }}>{g.afterIcon}</div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginTop: 10, textShadow: "0 2px 8px rgba(0,0,0,.5)", maxWidth: "70%", textAlign: "center" }}>{g.afterLabel}</p>
          <div style={{ position: "absolute", bottom: 50, right: 16, background: "rgba(34,197,94,.85)", padding: "6px 18px", borderRadius: 50, fontSize: 13, fontWeight: 700, color: "#fff" }}>✨ AFTER</div>
          <div style={{ position: "absolute", bottom: 16, right: 16, fontSize: 10, color: "rgba(255,255,255,.8)", background: "rgba(0,0,0,.5)", padding: "4px 10px", borderRadius: 8 }}>{g.afterLabel}</div>
        </div>
        {/* BEFORE */}
        <div style={{ position: "absolute", inset: 0, background: g.beforeGrad, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <div style={{ fontSize: 56, filter: "drop-shadow(0 4px 12px rgba(0,0,0,.4))" }}>{g.beforeIcon}</div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginTop: 10, textShadow: "0 2px 8px rgba(0,0,0,.5)", maxWidth: "70%", textAlign: "center" }}>{g.beforeLabel}</p>
          <div style={{ position: "absolute", bottom: 50, left: 16, background: "rgba(220,38,38,.85)", padding: "6px 18px", borderRadius: 50, fontSize: 13, fontWeight: 700, color: "#fff" }}>🏚️ BEFORE</div>
          <div style={{ position: "absolute", bottom: 16, left: 16, fontSize: 10, color: "rgba(255,255,255,.8)", background: "rgba(0,0,0,.5)", padding: "4px 10px", borderRadius: 8 }}>{g.beforeLabel}</div>
        </div>
        {/* Divider */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 3, background: "#fff", transform: "translateX(-50%)", zIndex: 10, boxShadow: "0 0 12px rgba(0,0,0,.6)" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #fff", boxShadow: "0 0 20px rgba(0,0,0,.5)", fontSize: 16, color: "#fff", fontWeight: 700 }}>⟷</div>
        </div>
        {/* Top labels */}
        <div style={{ position: "absolute", top: 14, left: 14, zIndex: 20, display: "flex", gap: 8 }}>
          <span style={{ background: "rgba(0,0,0,.6)", padding: "4px 12px", borderRadius: 50, fontSize: 11, fontWeight: 700, color: "#60a5fa" }}>{g.type}</span>
          <span style={{ background: "rgba(0,0,0,.6)", padding: "4px 12px", borderRadius: 50, fontSize: 11, color: "rgba(255,255,255,.75)" }}>📍 {g.city}</span>
        </div>
        <div style={{ position: "absolute", top: 14, right: 14, zIndex: 20, background: "rgba(0,0,0,.6)", padding: "4px 12px", borderRadius: 50, fontSize: 11, fontWeight: 700, color: "#fff" }}>{cur + 1}/{GALLERY.length}</div>
        <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 20, background: "rgba(0,0,0,.55)", padding: "4px 14px", borderRadius: 50, fontSize: 10, color: "rgba(255,255,255,.5)" }}>← Drag to compare →</div>
      </div>
      {/* Title */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700 }}>{g.title}</h3>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 12, marginTop: 4 }}>{g.city}, MN</p>
      </div>
      {/* Thumbnails */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
        {GALLERY.map((x, i) => (
          <button key={i} onClick={() => { setCur(i); setPlaying(false); }} style={{ width: cur === i ? 52 : 36, height: cur === i ? 34 : 26, borderRadius: 8, border: cur === i ? "2px solid #3b82f6" : "1px solid rgba(255,255,255,.1)", cursor: "pointer", transition: "all .3s", opacity: cur === i ? 1 : .4, padding: 0, background: x.afterGrad }} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button onClick={() => setPlaying(!playing)} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.4)", padding: "5px 18px", borderRadius: 50, fontSize: 12, cursor: "pointer" }}>{playing ? "⏸ Pause" : "▶ Play"}</button>
      </div>
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "20px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: open ? "#60a5fa" : "rgba(255,255,255,.88)", lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: 22, color: "#60a5fa", transition: "transform .3s", transform: open ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
      </div>
      {open && <p style={{ marginTop: 12, color: "rgba(255,255,255,.5)", fontSize: 14, lineHeight: 1.75 }}>{a}</p>}
    </div>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
function ServiceCard({ svc, delay }: { svc: Service; delay: number }) {
  const [open, setOpen] = useState(false);
  const lines = svc.detail.split("\n");
  return (
    <FadeIn delay={delay}>
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 18, overflow: "hidden", height: "100%", transition: "border-color .3s" }}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = `${svc.color}40`}
        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.06)"}
      >
        <div style={{ padding: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${svc.color}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 14 }}>{svc.icon}</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{svc.title}</h3>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 1.7 }}>{svc.desc}</p>
          <button onClick={() => setOpen(!open)} style={{ width: "100%", marginTop: 16, padding: "10px 0", borderRadius: 12, border: open ? `1px solid ${svc.color}50` : `1px solid ${svc.color}28`, background: open ? `${svc.color}18` : `${svc.color}0a`, color: svc.color, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .25s" }}>
            <span style={{ fontSize: 12, transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
            {open ? "Hide Details" : "Read Full Details"}
          </button>
        </div>
        {open && (
          <div style={{ padding: "0 24px 24px", borderTop: `1px solid ${svc.color}18` }}>
            <div style={{ paddingTop: 16 }}>
              {lines.map((line, i) => {
                if (!line.trim()) return <div key={i} style={{ height: 10 }} />;
                if (line.startsWith("•")) return <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7 }}><span style={{ color: svc.color, flexShrink: 0, marginTop: 2 }}>•</span><span style={{ color: "rgba(255,255,255,.58)", fontSize: 13, lineHeight: 1.65 }}>{line.slice(1).trim()}</span></div>;
                return <p key={i} style={{ color: "rgba(255,255,255,.5)", fontSize: 13, lineHeight: 1.7, marginBottom: 6 }}>{line}</p>;
              })}
            </div>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", marginTop: 16, padding: "11px 0", borderRadius: 12, background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              Get Free {svc.title} Estimate
            </button>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

// ─── STEP CARD ────────────────────────────────────────────────────────────────
function StepCard({ step, delay }: { step: Step; delay: number }) {
  const [open, setOpen] = useState(false);
  const lines = step.detail.split("\n");
  return (
    <FadeIn delay={delay}>
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 18, padding: 24, height: "100%", position: "relative", overflow: "hidden", transition: "border-color .3s", cursor: "pointer" }}
        onClick={() => setOpen(!open)}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,.3)"}
        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.06)"}
      >
        <div style={{ position: "absolute", top: 14, right: 16, fontSize: 38, fontWeight: 900, color: "rgba(59,130,246,.06)" }}>{step.num}</div>
        <div style={{ fontSize: 28, marginBottom: 14 }}>{step.icon}</div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#60a5fa", marginBottom: 8, paddingRight: 32 }}>{step.title}</h3>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 1.7 }}>{step.brief}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, color: "#3b82f6", fontSize: 13, fontWeight: 600 }}>
          <span style={{ fontSize: 11, transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
          {open ? "Hide" : "Read full details"}
        </div>
        {open && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.06)" }}>
            {lines.map((line, i) => {
              if (!line.trim()) return <div key={i} style={{ height: 8 }} />;
              if (line.startsWith("•")) return <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}><span style={{ color: "#3b82f6", flexShrink: 0 }}>•</span><span style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.65 }}>{line.slice(1).trim()}</span></div>;
              return <p key={i} style={{ color: "rgba(255,255,255,.5)", fontSize: 13, lineHeight: 1.7, marginBottom: 6 }}>{line}</p>;
            })}
            <button onClick={e => { e.stopPropagation(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} style={{ width: "100%", marginTop: 14, padding: "11px 0", borderRadius: 12, background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              Get Free Estimate — {PH}
            </button>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
const DMG_TYPES = ["Water Damage", "Fire & Smoke Damage", "Hail Damage", "Wind Damage", "Storm Damage", "Ice Dam Damage", "Roof Damage / Restoration", "Siding Damage / Restoration", "Window Damage / Restoration", "Gutter Damage / Restoration", "Mold Damage", "Foundation Damage", "Basement Flooding", "Kitchen Remodel", "Bathroom Remodel", "General Remodeling", "Other — I'll describe below"];

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "Water Damage", msg: "" });
  const [sent, setSent] = useState(false);

  const submit = () => {
    const subj = encodeURIComponent(`Free Inspection Request — ${form.type}`);
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.type}\n\nDetails:\n${form.msg}\n\n---\nSent from SmartConstructionMN.com`);
    window.open(`mailto:${EM}?subject=${subj}&body=${body}`, "_blank");
    setSent(true);
  };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
      <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Request Received!</h3>
      <p style={{ color: "rgba(255,255,255,.5)", fontSize: 14 }}>We'll contact you within 1 hour.</p>
      <button onClick={() => setSent(false)} style={{ marginTop: 20, padding: "10px 24px", borderRadius: 50, border: "1px solid rgba(255,255,255,.15)", background: "transparent", color: "rgba(255,255,255,.6)", fontSize: 13, cursor: "pointer" }}>Submit another</button>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Request Free Inspection</h3>
      <input style={inp} placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input style={inp} placeholder="Phone *" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input style={inp} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </div>
      <select style={{ ...inp, appearance: "none" as const }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
        {DMG_TYPES.map(o => <option key={o} value={o} style={{ background: "#111" }}>{o}</option>)}
      </select>
      <textarea style={{ ...inp, resize: "vertical" as const, minHeight: 90 }} placeholder="Describe your situation..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
      <button onClick={submit} style={{ padding: "14px 0", borderRadius: 14, background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: ".5px" }}>
        🚀 Get My Free Estimate
      </button>
      <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,.28)", marginTop: 4 }}>
        Goes directly to <span style={{ color: "#60a5fa" }}>{EM}</span>
      </p>
    </div>
  );
}

const inp: React.CSSProperties = { width: "100%", padding: "12px 15px", borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit" };

// ─── TRUST BAR ────────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: "⭐", text: "BBB A+ Rated", sub: "Since 2010" },
  { icon: "🌟", text: "Google 4.8★", sub: "163 Reviews" },
  { icon: "🛡️", text: "IICRC Certified", sub: "Clean Trust" },
  { icon: "📜", text: "MN Licensed", sub: "BC 63, 65, 73" },
  { icon: "✅", text: "98% Approval", sub: "Rate" },
  { icon: "🏆", text: "Since 2004", sub: "20+ Years" },
  { icon: "📋", text: "Fully Insured", sub: "& Bonded" },
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ru" | "es">("en");
  const [reviewFilter, setReviewFilter] = useState("All");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const HERO = {
    en: { tag: "24/7 Emergency — Minnesota", h1a: "We Restore.", h1b: "Insurance Pays.", sub: "Minnesota's trusted insurance restoration contractor since 2004. We handle your entire claim — so you don't pay a dime out of pocket.", cta1: "Get Free Estimate", cta2: "Call Now" },
    ru: { tag: "Экстренная помощь 24/7 — Миннесота", h1a: "Мы восстановим.", h1b: "Страховка платит.", sub: "Надёжный подрядчик по страховому восстановлению в Миннесоте с 2004 года. Мы ведём ваше дело — вы не платите ни цента из кармана.", cta1: "Бесплатная оценка", cta2: "Позвонить" },
    es: { tag: "Emergencia 24/7 — Minnesota", h1a: "Restauramos.", h1b: "El seguro paga.", sub: "Contratista de restauración de confianza en Minnesota desde 2004. Manejamos todo su reclamo — usted no paga nada de su bolsillo.", cta1: "Estimado Gratis", cta2: "Llamar" },
  }[lang];

  const filteredReviews = reviewFilter === "All" ? REVIEWS : REVIEWS.filter(r => r.src === reviewFilter);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", color: "#fff", background: "#080c14", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #080c14; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }
        input, select, textarea { font-family: inherit; color: #fff; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,.28); }
        input:focus, select:focus, textarea:focus { border-color: #3b82f6 !important; outline: none; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
        @keyframes glow-btn { 0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); } 50% { box-shadow: 0 0 24px 4px rgba(59,130,246,.3); } }
        @keyframes fade-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        .nav-link { color: rgba(255,255,255,.65); font-size: 13px; font-weight: 500; cursor: pointer; transition: color .2s; padding: 4px 0; }
        .nav-link:hover { color: #fff; }
        .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; border-radius: 50px; background: linear-gradient(135deg,#3b82f6,#1d4ed8); color: #fff; border: none; font-size: 14px; font-weight: 700; cursor: pointer; transition: transform .2s, box-shadow .2s; letter-spacing: .4px; animation: glow-btn 3s ease-in-out infinite; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(59,130,246,.4); }
        .btn-emergency { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; border-radius: 50px; background: transparent; border: 1.5px solid rgba(239,68,68,.5); color: #fca5a5; font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s; }
        .btn-emergency:hover { background: rgba(239,68,68,.12); border-color: #ef4444; color: #fff; }
        .card { background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07); border-radius: 18px; }
        .section { padding: 96px 20px; }
        .section-alt { background: rgba(255,255,255,.018); }
        @media (max-width:768px) {
          .desktop-nav { display:none !important; }
          .mobile-menu-btn { display:flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .h1-size { font-size: 36px !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "12px 24px", background: scrolled ? "rgba(8,12,20,.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "none", transition: "all .35s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Logo size={36} />
          </div>
          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {["services", "gallery", "process", "about", "reviews", "faq", "contact"].map(s => (
              <span key={s} className="nav-link" onClick={() => go(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
            ))}
          </div>
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href={PHL} style={{ display: "flex", alignItems: "center", gap: 6, color: "#60a5fa", fontWeight: 700, fontSize: 13 }}>📞 {PH}</a>
            <Link to="/portal" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.65)", transition: "all .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,.15)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,.4)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.65)"; }}>
              🔐 Team Portal
            </Link>
            <div style={{ display: "flex", gap: 4 }}>
              {(["en", "ru", "es"] as const).map(k => (
                <button key={k} onClick={() => setLang(k)} style={{ padding: "4px 9px", borderRadius: 7, border: lang === k ? "1px solid #3b82f6" : "1px solid rgba(255,255,255,.08)", background: lang === k ? "rgba(59,130,246,.15)" : "transparent", color: lang === k ? "#60a5fa" : "rgba(255,255,255,.35)", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all .2s" }}>
                  {k.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link to="/portal" className="mobile-menu-btn" style={{ display: "none", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.6)" }}>
              🔐 Portal
            </Link>
            <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 6, flexDirection: "column", gap: 5 }}>
              <span style={{ width: 22, height: 2, background: "#fff", display: "block", transition: "all .3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ width: 22, height: 2, background: "#fff", display: "block", transition: "all .3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: 22, height: 2, background: "#fff", display: "block", transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(8,12,20,.98)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,.06)", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
            {["services", "gallery", "process", "about", "reviews", "faq", "contact"].map(s => (
              <span key={s} onClick={() => go(s)} style={{ color: "rgba(255,255,255,.8)", fontSize: 16, fontWeight: 500, cursor: "pointer" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
            ))}
            <a href={PHL} style={{ color: "#60a5fa", fontWeight: 700, fontSize: 16 }}>📞 {PH}</a>
            <Link to="/portal" style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>
              <span style={{ fontSize: 18 }}>🔐</span>
              <div><div style={{ fontSize: 14, fontWeight: 700 }}>Team Portal — CRM</div><div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 2 }}>Employees Only</div></div>
            </Link>
            <div style={{ display: "flex", gap: 8 }}>
              {(["en", "ru", "es"] as const).map(k => (
                <button key={k} onClick={() => { setLang(k); setMenuOpen(false); }} style={{ padding: "6px 16px", borderRadius: 8, border: lang === k ? "1px solid #3b82f6" : "1px solid rgba(255,255,255,.12)", background: lang === k ? "rgba(59,130,246,.15)" : "transparent", color: lang === k ? "#60a5fa" : "rgba(255,255,255,.45)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  {k.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: "radial-gradient(ellipse at 20% 50%, rgba(29,78,216,.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(16,24,40,.9) 0%, transparent 50%), #080c14", paddingTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 80px", width: "100%" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Left */}
            <div style={{ animation: "fade-up .7s ease both" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.2)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#60a5fa", letterSpacing: "1.5px", textTransform: "uppercase" }}>{HERO.tag}</span>
              </div>
              <h1 className="h1-size" style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.08, letterSpacing: "-1px", marginBottom: 20 }}>
                {HERO.h1a}{" "}
                <span style={{ background: "linear-gradient(135deg,#60a5fa,#3b82f6,#1d4ed8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {HERO.h1b}
                </span>
              </h1>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,.55)", lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>{HERO.sub}</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
                <button className="btn-primary" onClick={() => go("contact")}>🔍 {HERO.cta1}</button>
                <a href={PHL}><button className="btn-emergency">🚨 {HERO.cta2}: {PH}</button></a>
              </div>
              {/* Trust row */}
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", paddingTop: 28, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                {[{ icon: "🛡️", t: "Licensed & Insured" }, { icon: "⭐", t: "BBB A+ Rated" }, { icon: "📋", t: "IICRC Certified" }, { icon: "❄️", t: "MN & FL Experts" }].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 16 }}>{b.icon}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", fontWeight: 500 }}>{b.t}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — photo slider */}
            <div style={{ animation: "fade-up .7s ease .15s both" }}>
              <PhotoSlider />
              {/* Quick stats below slider */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                {[{ n: 420, s: "+", l: "Projects" }, { n: 185, s: "+", l: "Reviews" }].map((x, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: "14px 18px", textAlign: "center" }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#60a5fa" }}><Counter to={x.n} suffix={x.s} /></div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginTop: 3 }}>{x.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div style={{ background: "linear-gradient(135deg,#1d4ed8,#1e40af,#1d4ed8)", padding: "0", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "200%" }}>
          {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 36px", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,.1)" }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>{item.text}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", fontWeight: 500 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ background: "rgba(255,255,255,.02)", borderBottom: "1px solid rgba(255,255,255,.04)", padding: "40px 24px" }}>
        <div className="stats-grid" style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
          {[{ n: 2500 as number, s: "+", l: "Projects Completed" }, { n: 98 as number, s: "%", l: "Claim Approval Rate" }, { n: "24/7" as "24/7", s: "", l: "Emergency Response" }, { n: 20 as number, s: "+", l: "Years in Minnesota" }].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#60a5fa" }}><Counter to={stat.n} suffix={stat.s} /></div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginTop: 4 }}>{stat.l}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="section">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader tag="Our Services" title={<>Insurance Restoration<br /><span style={{ color: "#60a5fa" }}>& Remodeling</span></>} sub="We work directly with ALL major insurance carriers — State Farm, Allstate, USAA, Liberty Mutual, Progressive, Travelers, and more." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
            {SERVICES.map((svc, i) => <ServiceCard key={i} svc={svc} delay={(i % 4) * 0.07} />)}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="section section-alt">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader tag="Our Work" title={<>Before & After<br /><span style={{ color: "#60a5fa" }}>Gallery</span></>} sub="Drag the divider to reveal each transformation. Real projects across Minnesota." />
          <FadeIn><Gallery /></FadeIn>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="section">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader tag="How It Works" title={<>From Damage<br /><span style={{ color: "#60a5fa" }}>to Done</span></>} sub="We manage every step of the insurance claim process — you just watch your home get restored." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {STEPS.map((step, i) => <StepCard key={i} step={step} delay={(i % 3) * 0.08} />)}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section section-alt">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <FadeIn dir="right">
              <Tag>Why Smart Construction</Tag>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 18 }}>
                Your Insurance Claim Is Our <span style={{ color: "#60a5fa" }}>Expertise</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,.5)", lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
                Most Minnesota homeowners don't know their rights after storm damage. Insurance companies count on that. We've been fighting for homeowners since 2004 — and winning.
              </p>
              {[
                "Zero out-of-pocket cost in most cases",
                "Direct insurance billing — we handle all paperwork",
                "Xactimate estimates that match carrier standards",
                "98% claim approval rate across 2,500+ projects",
                "MN General Contractor License BC 63, 65, 73",
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(59,130,246,.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa", fontSize: 11, fontWeight: 900, flexShrink: 0, marginTop: 2 }}>✓</div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,.8)" }}>{c}</span>
                </div>
              ))}
            </FadeIn>
            <FadeIn dir="left" delay={0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { icon: "🏠", value: "2,500+", label: "Projects" },
                  { icon: "⭐", value: "4.8★", label: "Google Rating" },
                  { icon: "📋", value: "98%", label: "Approval Rate" },
                  { icon: "🗺️", value: "All MN", label: "Service Area" },
                  { icon: "👷", value: "50+", label: "Crew Members" },
                  { icon: "🏆", value: "BBB A+", label: "Since 2010" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#60a5fa", marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Credentials */}
              <div style={{ marginTop: 14, background: "rgba(59,130,246,.08)", border: "1px solid rgba(59,130,246,.18)", borderRadius: 16, padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
                {[{ icon: "📜", t: "MN License\nBC 63, 65, 73" }, { icon: "🏆", t: "BBB A+\nAccredited" }, { icon: "🛡️", t: "IICRC\nCertified" }].map((b, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{b.icon}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", fontWeight: 600, lineHeight: 1.5, whiteSpace: "pre-line" }}>{b.t}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <section style={{ padding: "80px 24px", background: "#080c14" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader tag="Service Area" title={<>Serving All of <span style={{ color: "#60a5fa" }}>Minnesota</span></>} sub="From the Twin Cities metro to greater Minnesota — we're there when you need us." />
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
              {CITIES.map((city, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 50, padding: "8px 18px", fontSize: 13, fontWeight: 500, transition: "all .2s", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,.35)"; (e.currentTarget as HTMLDivElement).style.color = "#60a5fa"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.06)"; (e.currentTarget as HTMLDivElement).style.color = "#fff"; }}>
                  <span style={{ fontSize: 12, opacity: .5 }}>📍</span> {city}
                </div>
              ))}
              <div style={{ padding: "8px 18px", fontSize: 12, color: "rgba(255,255,255,.3)", fontStyle: "italic" }}>...and 50+ more communities</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="section section-alt">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader tag="Real Reviews" title={<>What Our <span style={{ color: "#60a5fa" }}>Customers Say</span></>} sub="4.8★ across 185+ reviews (163 Google, 22 Facebook, 6 BBB) — BBB A+ since 2010" />
          {/* Filter */}
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
              {[{ f: "All", n: 185 }, { f: "Google", n: 163 }, { f: "Facebook", n: 22 }, { f: "BBB", n: 6 }].map(({ f, n }) => (
                <button key={f} onClick={() => setReviewFilter(f)} style={{ padding: "7px 18px", borderRadius: 50, border: "1px solid", borderColor: reviewFilter === f ? "#3b82f6" : "rgba(255,255,255,.08)", background: reviewFilter === f ? "rgba(59,130,246,.12)" : "transparent", color: reviewFilter === f ? "#60a5fa" : "rgba(255,255,255,.4)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>
                  {f} ({n})
                </button>
              ))}
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {filteredReviews.map((r, i) => (
              <FadeIn key={`${reviewFilter}-${i}`} delay={i * 0.05}>
                <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 18, padding: 24, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 14, color: "#fbbf24", letterSpacing: 2 }}>★★★★★</div>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 9px", borderRadius: 50, background: r.src === "BBB" ? "rgba(34,197,94,.1)" : r.src === "Facebook" ? "rgba(59,130,246,.1)" : "rgba(251,191,36,.1)", color: r.src === "BBB" ? "#22c55e" : r.src === "Facebook" ? "#60a5fa" : "#fbbf24" }}>{r.src}</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,.6)", fontSize: 13, lineHeight: 1.75, fontStyle: "italic", flex: 1 }}>"{r.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.05)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{r.name[0]}</div>
                    <div><div style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 1 }}>{r.role}</div></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div style={{ textAlign: "center", marginTop: 28, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              {[{ l: "BBB A+", c: "#22c55e", u: BBB_URL, n: "6 reviews" }, { l: "Facebook", c: "#60a5fa", u: FB, n: "22 reviews" }, { l: "Google 4.8★", c: "#fbbf24", u: GG, n: "163 reviews" }].map((x, i) => (
                <a key={i} href={x.u} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", borderRadius: 50, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", transition: "all .2s" }}>
                  <span style={{ color: x.c, fontWeight: 700, fontSize: 13 }}>{x.l}</span>
                  <span style={{ color: "rgba(255,255,255,.3)", fontSize: 12 }}>{x.n} →</span>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <SectionHeader tag="FAQ" title={<>Frequently Asked <span style={{ color: "#60a5fa" }}>Questions</span></>} />
          <FadeIn delay={0.1}>
            <div>{FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
          </FadeIn>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section id="docs" className="section section-alt">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader tag="Credentials" title={<>Documents & <span style={{ color: "#60a5fa" }}>Registrations</span></>} sub="Full transparency — our active licenses, certifications, and insurance documents." />
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "📜", title: "MN Contractor License", id: "BC 63, 65, 73", desc: "Minnesota General Contractor License from the Dept. of Labor and Industry. Covers residential and commercial construction, remodeling, and restoration.", status: "Active", issuer: "MN Dept. of Labor & Industry", link: "https://www.dli.mn.gov" },
              { icon: "🏆", title: "BBB A+ Rating", id: "Accredited Since 2010", desc: "Better Business Bureau A+ rating with accreditation since 2010. Committed to BBB Standards for Trust with outstanding complaint resolution.", status: "A+ Rated", issuer: "BBB of Minnesota & North Dakota", link: BBB_URL },
              { icon: "🛡️", title: "IICRC Certification", id: "Certified Firm", desc: "Institute of Inspection, Cleaning and Restoration Certification. Trained in water damage, fire & smoke restoration, and mold remediation.", status: "Certified", issuer: "IICRC — Clean Trust", link: "https://www.iicrc.org" },
              { icon: "📋", title: "Insurance & Bond", id: "Fully Covered", desc: "General liability insurance, workers' compensation, and contractor bond. All policies active and current. Certificates available on request.", status: "Active", issuer: "State of Minnesota", link: null },
            ].map((doc, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="card" style={{ padding: 28, position: "relative", transition: "border-color .3s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,.25)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.07)"}>
                  <div style={{ position: "absolute", top: 18, right: 18, background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.25)", padding: "3px 12px", borderRadius: 50, fontSize: 10, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "1px" }}>{doc.status}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(59,130,246,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{doc.icon}</div>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700 }}>{doc.title}</h3>
                      <div style={{ fontSize: 12, color: "#60a5fa", fontWeight: 600, marginTop: 2 }}>{doc.id}</div>
                    </div>
                  </div>
                  <p style={{ color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{doc.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>Issued by: <strong style={{ color: "rgba(255,255,255,.55)" }}>{doc.issuer}</strong></span>
                    {doc.link && <a href={doc.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#60a5fa", fontWeight: 600 }}>Verify ↗</a>}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            <FadeIn dir="right">
              <Tag>Contact Us</Tag>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
                Get Your <span style={{ color: "#60a5fa" }}>Free Estimate</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                {[{ icon: "📞", label: "Phone (24/7)", value: PH, href: PHL }, { icon: "📧", label: "Email", value: EM, href: `mailto:${EM}` }, { icon: "📍", label: "Office", value: ADDR, href: undefined }].map((c, i) => (
                  <a key={i} href={c.href ?? "#"} style={{ display: "flex", gap: 14, padding: 16, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, transition: "border-color .2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,.25)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.07)"}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(59,130,246,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700, marginBottom: 3 }}>{c.label}</div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,.85)" }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
              {/* Social */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[{ l: "Facebook", u: FB, bg: "#1877f2" }, { l: "Instagram", u: IG, bg: "#e4405f" }, { l: "WhatsApp", u: WA, bg: "#25d366" }, { l: "Messenger", u: FB_MSG, bg: "#0084ff" }].map((s, i) => (
                  <a key={i} href={s.u} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 18px", borderRadius: 50, background: s.bg, color: "#fff", fontSize: 12, fontWeight: 700 }}>{s.l}</a>
                ))}
              </div>
            </FadeIn>
            <FadeIn dir="left" delay={0.1}>
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: 32 }}>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY BAND ── */}
      <div style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", padding: "22px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>🚨 Emergency? We Answer 24/7</div>
        <a href={PHL} style={{ fontSize: 32, fontWeight: 900, letterSpacing: "2px", color: "#fff" }}>{PH}</a>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 5 }}>Blaine • Minneapolis • St. Paul • All Minnesota</div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#04080f", padding: "52px 24px 24px", borderTop: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ marginBottom: 16 }}><Logo size={32} /></div>
              <p style={{ color: "rgba(255,255,255,.3)", fontSize: 13, lineHeight: 1.7, maxWidth: 280, marginBottom: 16 }}>Minnesota's premier insurance restoration contractor since 2004.</p>
              <div style={{ color: "rgba(255,255,255,.3)", fontSize: 12, lineHeight: 1.9 }}>
                <div>📍 {ADDR}</div>
                <div>📞 <a href={PHL} style={{ color: "#60a5fa" }}>{PH}</a></div>
                <div>📧 {EM}</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                {[{ l: "FB", u: FB }, { l: "IG", u: IG }, { l: "G", u: GG }].map((s, i) => (
                  <a key={i} href={s.u} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.4)", transition: "all .2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,.2)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.05)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.4)"; }}>
                    {s.l}
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: ["Water Damage", "Fire & Smoke", "Storm Damage", "Mold Remediation", "Roof Restoration", "General Remodeling"] },
              { title: "Company", links: ["About", "Process", "Gallery", "Reviews", "FAQ", "Documents", "Contact"] },
              { title: "Quick", links: ["Get Free Estimate", "Emergency Call", "Team Portal →", "Insurance Carriers", "Service Area"] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#60a5fa", marginBottom: 16 }}>{col.title}</div>
                {col.links.map((link, j) => {
                  if (link === "Team Portal →") return (
                    <Link key={j} to="/portal" style={{ display: "block", color: "rgba(255,255,255,.3)", fontSize: 13, marginBottom: 10, cursor: "pointer", transition: "color .2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#fff"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.3)"}>
                      {link}
                    </Link>
                  );
                  return (
                    <div key={j} style={{ color: "rgba(255,255,255,.3)", fontSize: 13, marginBottom: 10, cursor: "pointer", transition: "color .2s" }}
                      onMouseEnter={e => (e.target as HTMLElement).style.color = "#fff"}
                      onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,.3)"}>
                      {link}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <span style={{ color: "rgba(255,255,255,.2)", fontSize: 12 }}>© 2026 Smart Construction & Remodeling Inc. · MN License BC 63, 65, 73</span>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy", "Terms", "Sitemap"].map(l => <span key={l} style={{ color: "rgba(255,255,255,.2)", fontSize: 12, cursor: "pointer" }}>{l}</span>)}
            </div>
          </div>
        </div>
      </footer>

      {/* ── STICKY BOTTOM BAR ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999, background: "rgba(4,8,15,.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,.08)", padding: "10px 16px", display: "flex", justifyContent: "center", gap: 10 }}>
        <a href={PHL} style={{ flex: 1, maxWidth: 160, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "linear-gradient(135deg,#dc2626,#b91c1c)", padding: "12px 0", borderRadius: 50, fontWeight: 700, fontSize: 13, color: "#fff" }}>📞 Call Now</a>
        <a href={WA} target="_blank" rel="noopener noreferrer" style={{ flex: 1, maxWidth: 160, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "#25d366", padding: "12px 0", borderRadius: 50, fontWeight: 700, fontSize: 13, color: "#fff" }}>💬 WhatsApp</a>
        <a href={FB_MSG} target="_blank" rel="noopener noreferrer" style={{ flex: 1, maxWidth: 160, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "#0084ff", padding: "12px 0", borderRadius: 50, fontWeight: 700, fontSize: 13, color: "#fff" }}>💬 Messenger</a>
      </div>
      <div style={{ height: 64 }} />
    </div>
  );
}
