import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import { GoogleSvg, AppleSvg } from "../components/ui/Icons";

export default function PageAuth() {
  const { lang, go, setUser, setLoggedIn } = useContext(AppCtx) as any;
  const auth = useAuth();
  const [aEmail, setAEmail] = useState("");
  const [aPass, setAPass] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  const handleAuth = async () => {
    if (!aEmail || !aPass) return;
    setError(null);
    setLoading(true);
    try {
      if (isSignUp) {
        await auth.signUpWithEmail(aEmail, aPass);
      } else {
        await auth.signInWithEmail(aEmail, aPass);
      }
      // AuthSync in App.tsx will handle setting user/loggedIn
      // But for mock mode, we need to handle it directly
      if (!auth.user) {
        // Mock mode fallback - AuthContext sets user synchronously in mockLogin
        setTimeout(() => {
          setUser({ name: "User", email: aEmail });
          setLoggedIn(true);
          go("dashboard");
        }, 100);
      } else {
        go("dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    setError(null);
    setLoading(true);
    try {
      if (provider === "google") {
        await auth.signInWithGoogle();
      } else {
        await auth.signInWithApple();
      }
      // OAuth redirects in real mode; mock mode sets user synchronously
      if (auth.user) {
        go("dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ ...S.page, paddingTop:0, display:"flex", flexDirection:"column", minHeight:"calc(100vh - 80px)" }} dir={isRTL?"rtl":"ltr"}>
      <Nav title={isSignUp ? t(lang, "signUp") : "Login Guide"} backTo="onboard" />

      {error && (
        <div style={{ background: "rgba(248,113,113,.15)", border: "1px solid rgba(248,113,113,.4)", borderRadius: 12, padding: 12, marginBottom: 12, textAlign: "center" }}>
          <div style={{ color: S.err, fontSize: 13, fontWeight: 600 }}>{error}</div>
        </div>
      )}

      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{bt(lang, "email")}</label>
        <input type="email" value={aEmail} onChange={e => setAEmail(e.target.value)} onClick={() => { if (!aEmail) setAEmail("admin@immiguide.com"); }} style={S.inp} />
      </div>
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{bt(lang, "password")}</label>
        <input type="password" value={aPass} onChange={e => setAPass(e.target.value)} onClick={() => { if (!aPass) setAPass("Admin123!"); }} style={S.inp} />
      </div>

      <button
        onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
        style={{ background: "rgba(52,211,153,.12)", border: "1.5px solid rgba(52,211,153,.4)", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", textAlign: "center", marginBottom: 8, marginTop: 4, padding: "12px 20px", width: "100%" }}
      >
        {isSignUp ? "Already have an account? Log In" : "Don't have an account yet? Sign Up"}
      </button>

      {/* Terms agreement */}
      <div onClick={() => setAgreedTerms(!agreedTerms)} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8, cursor: "pointer", gap: 6 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: 4, border: agreedTerms ? "none" : "2px solid #ef4444", background: agreedTerms ? "#ef4444" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", flexShrink: 0, fontWeight: 700 }}>
            {agreedTerms && "✓"}
          </div>
          <div style={{ fontSize: 14, color: "#fff", textAlign: "center" }}>BY CONTINUING, I'VE READ AND ACCEPT <span style={{ fontWeight:800 }}>IMMIGUIDE'S</span></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span onClick={(e) => { e.stopPropagation(); go("terms"); }} style={{ color: S.ok, textDecoration: "underline", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Terms of Service</span>
          <span style={{ color: "#fff" }}>and</span>
          <span onClick={(e) => { e.stopPropagation(); go("privacy"); }} style={{ color: S.ok, textDecoration: "underline", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Privacy Policy</span>
        </div>
      </div>

      <div style={{ flex:1, minHeight:12 }} />

      <Btn disabled={loading || (isSignUp && !agreedTerms)} onClick={handleAuth}>
        {loading ? "..." : isSignUp ? "Sign Up" : t(lang, "login")}
      </Btn>

      <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
        <div style={{ flex:1, height:1, background:"#fff" }} />
        <span style={{ fontSize:13, color:"#fff", fontWeight:600 }}>{t(lang, "or")}</span>
        <div style={{ flex:1, height:1, background:"#fff" }} />
      </div>

      <button disabled={loading} onClick={() => handleOAuth("google")} style={{ ...S.btn, background:"#fff", color:"#333", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
        <GoogleSvg /> {t(lang, "continueGoogle")}
      </button>
      <button disabled={loading} onClick={() => handleOAuth("apple")} style={{ ...S.btn, background:"#000", display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginTop:20 }}>
        <AppleSvg /> {t(lang, "continueApple")}
      </button>

    </div>
  );
}
