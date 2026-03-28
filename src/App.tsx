import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppCtx } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { queryClient } from "./lib/queryClient";
import ErrorBoundary from "./components/ErrorBoundary";
import type { PageName, PackageType, User, UploadState } from "./types";

import Stars, { ContentStars } from "./components/ui/Stars";
import LangDropdown from "./components/layout/LangDropdown";
import Footer from "./components/layout/Footer";
import AdminPanel from "./components/AdminPanel";

import PageOnboard from "./pages/PageOnboard";
import PageAuth from "./pages/PageAuth";
import PageDashboard from "./pages/PageDashboard";
import PageWizard from "./pages/PageWizard";
import PageFormSelect from "./pages/PageFormSelect";
import PageFormDetail from "./pages/PageFormDetail";
import PageFormFill from "./pages/PageFormFill";
import PageDocUpload from "./pages/PageDocUpload";
import PagePreview from "./pages/PagePreview";
import PagePay from "./pages/PagePay";
import PagePaymentOptions from "./pages/PagePaymentOptions";
import PageWhatsNext from "./pages/PageWhatsNext";
import PageSubmitConfirm from "./pages/PageSubmitConfirm";
import PageDone from "./pages/PageDone";
import PageTracking from "./pages/PageTracking";
import PageCivics from "./pages/PageCivics";
import PageKnowledge from "./pages/PageKnowledge";
import PageProfile from "./pages/PageProfile";
import PagePricing from "./pages/PagePricing";
import PageAttorneys from "./pages/PageAttorneys";
import PageTerms from "./pages/PageTerms";
import PagePrivacy from "./pages/PagePrivacy";
import PageReviews from "./pages/PageReviews";
import PageFAQ from "./pages/PageFAQ";

const PAGES: Record<string, React.ComponentType> = {
  onboard: PageOnboard,
  auth: PageAuth,
  dashboard: PageDashboard,
  wizard: PageWizard,
  formSelect: PageFormSelect,
  formDetail: PageFormDetail,
  formFill: PageFormFill,
  docUpload: PageDocUpload,
  preview: PagePreview,
  pay: PagePay,
  paymentOptions: PagePaymentOptions,
  whatsNext: PageWhatsNext,
  submitConfirm: PageSubmitConfirm,
  done: PageDone,
  tracking: PageTracking,
  civics: PageCivics,
  knowledge: PageKnowledge,
  profile: PageProfile,
  pricing: PagePricing,
  attorneys: PageAttorneys,
  terms: PageTerms,
  privacy: PagePrivacy,
  reviews: PageReviews,
  faq: PageFAQ,
};

export default function App() {
  /* ── State ── */
  const [lang, setLang] = useState<"en" | "uk" | "pl" | "es" | "ru" | "fr" | "pt" | "ht" | "ar" | "so" | "ne" | "my" | "ro" | "bg" | "tr" | "it" | "de" | "fa" | "he" | "zh">(() => {
    try { const saved = localStorage.getItem("immiguide_lang"); return (saved as any) || "en"; } catch { return "en"; }
  });
  const [page, setPage] = useState<PageName>("onboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [selForm, setSelForm] = useState<any>(null);
  const SENSITIVE_KEYS = ["ssn","aNumber","passportNum","address","cardNumber","i94"];
  const [fd, setFd] = useState<Record<string, string>>(() => {
    try { const saved = localStorage.getItem("immiguide_fd"); if (!saved) return {}; const raw = JSON.parse(saved); Object.keys(raw).forEach(k => { if (SENSITIVE_KEYS.includes(k) && raw[k]) try { raw[k] = atob(raw[k]); } catch {} }); return raw; } catch { return {}; }
  });
  const [fSec, setFSec] = useState(0);
  const [pkg, setPkg] = useState<PackageType | null>(null);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [ups, setUps] = useState<UploadState>({ passport: null, birth: null, photo: null, support: null });
  const [clock, setClock] = useState("");
  const [payTotal, setPayTotal] = useState(0);
  const [uscisConf, setUscisConf] = useState("");
  const [ourFeePaid, setOurFeePaid] = useState(false);
  const [uscisPaid, setUscisPaid] = useState(false);
  const [savedFormId, setSavedFormId] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);

  const upsRef = useRef(ups);
  const caseRef = useRef("IMG-" + Math.random().toString(36).substr(2, 6).toUpperCase() + "-2026").current;

  useEffect(() => { upsRef.current = ups; }, [ups]);

  /* ── Persist to localStorage ── */
  useEffect(() => { localStorage.setItem("immiguide_lang", lang); }, [lang]);
  useEffect(() => {
    if (Object.keys(fd).length > 0) { const enc = {...fd}; Object.keys(enc).forEach(k => { if (SENSITIVE_KEYS.includes(k) && enc[k]) try { enc[k] = btoa(enc[k]); } catch {} }); localStorage.setItem("immiguide_fd", JSON.stringify(enc)); }
  }, [fd]);

  /* ── Navigation ── */
  const go = useCallback((p: PageName) => { setPage(p); setErrs({}); }, []);

  const resetForm = useCallback(() => { setSelForm(null); setPkg(null); setFSec(0); setSavedFormId(null); setPromoCode(""); setDiscountPct(0); setOurFeePaid(false); setUscisPaid(false); setUscisConf(""); }, []);

  const doLogout = useCallback(() => {
    setLoggedIn(false);
    resetForm();
    setFd({});
    setUps({ passport: null, birth: null, photo: null, support: null });
    go("auth");
  }, [go, resetForm]);

  /* ── Clock ── */
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, []);

  /* ── Global CSS (animations) ── */
  useEffect(() => {
    if (document.getElementById("immiguide-css")) return;
    const el = document.createElement("style");
    el.id = "immiguide-css";
    el.textContent = `
      @keyframes tw{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
      @keyframes sh{0%{background-position:200% center}100%{background-position:-200% center}}
      @keyframes gf{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
      .is{position:absolute;border-radius:50%;background:#fff;animation:tw ease-in-out infinite}
      .it{font-weight:800;font-size:18px;color:#fff;background:linear-gradient(90deg,#fff,#93c5fd,#fff,#93c5fd,#fff);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:sh 4s linear infinite}
      .il{animation:gf 3s ease-in-out infinite;display:inline-block;filter:drop-shadow(0 0 8px rgba(147,197,253,.6))}
      .mq-wrap{overflow:hidden;position:relative}
      .mq-track{display:flex;width:max-content;animation:mqe 80s linear infinite}
      @keyframes mqe{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      select option{background:#0f1629;color:#fff}
      input::placeholder{color:rgba(255,255,255,.4)!important}
    `;
    document.head.appendChild(el);
    return () => { const x = document.getElementById("immiguide-css"); if (x) x.remove(); };
  }, []);

  /* ── Cleanup blob URLs ── */
  useEffect(() => () => {
    Object.values(upsRef.current).forEach(u => { if (u) URL.revokeObjectURL(u); });
  }, []);

  /* ── Context value ── */
  const ctx = {
    lang, setLang, page, go,
    loggedIn, setLoggedIn,
    user, setUser,
    selForm, setSelForm,
    fd, setFd,
    fSec, setFSec,
    pkg, setPkg,
    errs, setErrs,
    ups, setUps,
    caseRef,
    resetForm, doLogout,
    payTotal, setPayTotal,
    uscisConf, setUscisConf,
    ourFeePaid, setOurFeePaid,
    uscisPaid, setUscisPaid,
    savedFormId, setSavedFormId,
    promoCode, setPromoCode,
    discountPct, setDiscountPct,
  };

  const PageComp = PAGES[page] || PageDashboard;

  /* ── Render ── */
  return (
    <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <AppCtx.Provider value={ctx as any}>
      <AuthSync />
      <AdminPanel />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", background: "#080e27", padding: "16px 0" }}>
        <div style={{ width: "100%", maxWidth: 390, minHeight: 760, maxHeight: 844, overflowY: "auto", overflowX: "hidden", borderRadius: 40, border: "6px solid rgba(147,197,253,.15)", boxShadow: "0 0 60px rgba(99,102,241,.2),0 20px 60px rgba(0,0,0,.4)", position: "relative", background: "linear-gradient(135deg,#0c1445,#1a237e 30%,#0d47a1 60%,#1a237e 80%,#0c1445)" }}>

          {/* Statue of Liberty watermark */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
            <span style={{ fontSize: "min(90vw, 600px)", opacity: .25, filter: "grayscale(0%)", userSelect: "none", lineHeight: 1 }}>🗽</span>
          </div>

          <Stars />

          <div style={{ position: "relative", zIndex: 2 }}>
            <ContentStars />
            {/* Notch */}
            <div style={{ width: 120, height: 28, background: "rgba(12,20,69,.9)", borderRadius: "0 0 16px 16px", margin: "0 auto", position: "sticky", top: 0, zIndex: 300 }} />

            {/* Status bar */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 16px 4px", fontSize: 12, fontWeight: 600, color: "#fff" }}>
              <span>{clock}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ fontSize: 11 }}>📶</span>
                <span style={{ fontSize: 11 }}>🔋</span>
              </div>
            </div>

            {/* Lang dropdown on onboard only */}
            {page === "onboard" && (
              <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 16px 0" }}>
                <LangDropdown />
              </div>
            )}

            <PageComp />
            <Footer />
          </div>
        </div>
      </div>
    </AppCtx.Provider>
    </AuthProvider>
    </QueryClientProvider>
    </ErrorBoundary>
  );
}

/** Syncs AuthContext user state into AppCtx */
function AuthSync() {
  const auth = useAuth();
  const { setUser, setLoggedIn, loggedIn, doLogout } = useContext(AppCtx) as any;
  const prevAuthUser = useRef<string | null>(null);

  useEffect(() => {
    if (auth.user && !auth.loading) {
      const uid = auth.user.id || auth.user.email;
      if (prevAuthUser.current !== uid) {
        prevAuthUser.current = uid;
        setUser({ name: auth.user.name, email: auth.user.email, id: auth.user.id });
        if (!loggedIn) setLoggedIn(true);
      }
    } else if (!auth.user && !auth.loading && prevAuthUser.current) {
      prevAuthUser.current = null;
      doLogout();
    }
  }, [auth.user, auth.loading, setUser, setLoggedIn, loggedIn, doLogout]);

  return null;
}
