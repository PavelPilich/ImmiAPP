import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { S } from "../data/styles";
import { t, bt } from "../data/translations";
import Nav from "../components/layout/Nav";
import { Btn } from "../components/ui/Button";
import { GoogleSvg, AppleSvg } from "../components/ui/Icons";
import PasswordStrength, { getPasswordStrength } from "../components/ui/PasswordStrength";

type AuthView = "login" | "signup" | "forgot" | "verify";

export default function PageAuth() {
  const { lang, go, setUser, setLoggedIn } = useContext(AppCtx) as any;
  const auth = useAuth();

  const [view, setView] = useState<AuthView>("login");
  const [aEmail, setAEmail] = useState("");
  const [aPass, setAPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  const validateSignUp = (): boolean => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = t(lang, "requiredField");
    if (!lastName.trim()) errs.lastName = t(lang, "requiredField");
    if (!aEmail.trim()) errs.email = t(lang, "requiredField");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aEmail)) errs.email = t(lang, "invalidEmail");
    if (phone && !/^[+\d\s()-]{7,20}$/.test(phone)) errs.phone = t(lang, "invalidPhone");
    if (!aPass) errs.password = t(lang, "requiredField");
    else if (aPass.length < 8) errs.password = t(lang, "passwordMinLength");
    else if (getPasswordStrength(aPass) < 2) errs.password = t(lang, "passwordWeak");
    if (aPass !== confirmPass) errs.confirmPass = t(lang, "passwordMismatch");
    if (!agreedTerms) errs.terms = t(lang, "requiredField");
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async () => {
    if (!aEmail || !aPass) return;
    setError(null);
    setLoading(true);
    try {
      await auth.signInWithEmail(aEmail, aPass);
      if (!auth.user) {
        setTimeout(() => {
          setUser({ name: "User", email: aEmail });
          setLoggedIn(true);
          go("dashboard");
        }, 100);
      } else {
        go("dashboard");
      }
    } catch (err: any) {
      setError(err?.message || t(lang, "authFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateSignUp()) return;
    setError(null);
    setLoading(true);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      await auth.signUpWithEmail(aEmail, aPass, fullName);
      if (!auth.user) {
        // Mock mode — go straight to dashboard
        setTimeout(() => {
          setUser({ name: fullName, email: aEmail });
          setLoggedIn(true);
          go("dashboard");
        }, 100);
      } else {
        // Real Supabase — show email verification screen
        setView("verify");
      }
    } catch (err: any) {
      setError(err?.message || t(lang, "signUpFailed"));
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
      if (auth.user) {
        go("dashboard");
      }
    } catch (err: any) {
      setError(err?.message || t(lang, "authFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!aEmail.trim()) {
      setFieldErrors({ email: t(lang, "requiredField") });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aEmail)) {
      setFieldErrors({ email: t(lang, "invalidEmail") });
      return;
    }
    setError(null);
    setFieldErrors({});
    setLoading(true);
    try {
      await auth.resetPassword(aEmail);
      setSuccess(t(lang, "emailSent"));
    } catch (err: any) {
      setError(err?.message || t(lang, "failedSendReset"));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    setError(null);
    try {
      await auth.resendVerification(aEmail);
      setSuccess(t(lang, "emailSent"));
    } catch (err: any) {
      setError(err?.message || t(lang, "failedResend"));
    } finally {
      setLoading(false);
    }
  };

  const switchView = (v: AuthView) => {
    setView(v);
    setError(null);
    setSuccess(null);
    setFieldErrors({});
  };

  const navTitle =
    view === "signup" ? t(lang, "signUp") :
    view === "forgot" ? t(lang, "resetPassword") :
    view === "verify" ? t(lang, "checkEmail") :
    t(lang, "loginGuide");

  const inputStyle = S.inp;
  const labelStyle = { fontSize: 13, fontWeight: 600 as const, color: "#fff", display: "block" as const };
  const fieldErrorStyle = { fontSize: 11, color: S.err, marginTop: 2 };

  const renderInput = (
    label: string, value: string, onChange: (v: string) => void,
    type: string, errorKey: string, placeholder?: string,
    extra?: React.ReactNode
  ) => (
    <div style={{ marginBottom: 10 }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" as const }}>
        <input
          type={type}
          value={value}
          onChange={e => { onChange(e.target.value); if (fieldErrors[errorKey]) setFieldErrors(prev => { const n = { ...prev }; delete n[errorKey]; return n; }); }}
          placeholder={placeholder}
          style={inputStyle}
        />
        {extra}
      </div>
      {fieldErrors[errorKey] && <div style={fieldErrorStyle}>{fieldErrors[errorKey]}</div>}
    </div>
  );

  const eyeBtn = (show: boolean, toggle: () => void) => (
    <button
      type="button"
      onClick={toggle}
      style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,.5)", cursor: "pointer", fontSize: 16, padding: 4 }}
    >
      {show ? "\u{1F441}" : "\u{1F441}\u{200D}\u{1F5E8}"}
    </button>
  );

  /* ── VERIFY VIEW ── */
  if (view === "verify") {
    return (
      <div style={{ ...S.page, paddingTop: 0, display: "flex", flexDirection: "column", minHeight: "calc(100vh - 80px)", textAlign: "center" }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={navTitle} backTo="onboard" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>&#x2709;&#xFE0F;</div>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{t(lang, "checkEmail")}</h2>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>{t(lang, "verifyEmail")}</p>
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: 13, marginBottom: 24 }}>{aEmail}</p>

          {success && (
            <div style={{ background: "rgba(52,211,153,.15)", border: "1px solid rgba(52,211,153,.4)", borderRadius: 12, padding: 12, marginBottom: 12, width: "100%" }}>
              <div style={{ color: S.ok, fontSize: 13, fontWeight: 600 }}>{success}</div>
            </div>
          )}
          {error && (
            <div style={{ background: "rgba(248,113,113,.15)", border: "1px solid rgba(248,113,113,.4)", borderRadius: 12, padding: 12, marginBottom: 12, width: "100%" }}>
              <div style={{ color: S.err, fontSize: 13, fontWeight: 600 }}>{error}</div>
            </div>
          )}

          <Btn disabled={loading} onClick={handleResendVerification} style={{ marginBottom: 12 }}>
            {loading ? "..." : t(lang, "resendVerification")}
          </Btn>
          <button
            onClick={() => switchView("login")}
            style={{ background: "none", border: "none", color: S.ok, fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
          >
            {t(lang, "backToLogin")}
          </button>
        </div>
      </div>
    );
  }

  /* ── FORGOT PASSWORD VIEW ── */
  if (view === "forgot") {
    return (
      <div style={{ ...S.page, paddingTop: 0, display: "flex", flexDirection: "column", minHeight: "calc(100vh - 80px)" }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={navTitle} backTo="onboard" />

        {error && (
          <div style={{ background: "rgba(248,113,113,.15)", border: "1px solid rgba(248,113,113,.4)", borderRadius: 12, padding: 12, marginBottom: 12, textAlign: "center" }}>
            <div style={{ color: S.err, fontSize: 13, fontWeight: 600 }}>{error}</div>
          </div>
        )}
        {success && (
          <div style={{ background: "rgba(52,211,153,.15)", border: "1px solid rgba(52,211,153,.4)", borderRadius: 12, padding: 12, marginBottom: 12, textAlign: "center" }}>
            <div style={{ color: S.ok, fontSize: 13, fontWeight: 600 }}>{success}</div>
          </div>
        )}

        <p style={{ color: "rgba(255,255,255,.7)", fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>
          {t(lang, "checkEmail")}
        </p>

        {renderInput(bt(lang, "email"), aEmail, setAEmail, "email", "email")}

        <div style={{ flex: 1, minHeight: 12 }} />

        <Btn disabled={loading || !aEmail.trim()} onClick={handleForgotPassword}>
          {loading ? "..." : t(lang, "sendResetLink")}
        </Btn>

        <button
          onClick={() => switchView("login")}
          style={{ background: "none", border: "none", color: S.ok, fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "underline", marginTop: 16, textAlign: "center" }}
        >
          {t(lang, "backToLogin")}
        </button>
      </div>
    );
  }

  /* ── LOGIN VIEW ── */
  if (view === "login") {
    return (
      <div style={{ ...S.page, paddingTop: 0, display: "flex", flexDirection: "column", minHeight: "calc(100vh - 80px)" }} dir={isRTL ? "rtl" : "ltr"}>
        <Nav title={t(lang, "loginGuide")} backTo="onboard" />

        {error && (
          <div style={{ background: "rgba(248,113,113,.15)", border: "1px solid rgba(248,113,113,.4)", borderRadius: 12, padding: 12, marginBottom: 12, textAlign: "center" }}>
            <div style={{ color: S.err, fontSize: 13, fontWeight: 600 }}>{error}</div>
          </div>
        )}

        {renderInput(bt(lang, "email"), aEmail, setAEmail, "email", "email")}
        {renderInput(bt(lang, "password"), aPass, setAPass, showPass ? "text" : "password", "password", undefined, eyeBtn(showPass, () => setShowPass(!showPass)))}

        <button
          onClick={() => switchView("forgot")}
          style={{ background: "none", border: "none", color: S.ok, fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: isRTL ? "right" : "left", padding: 0, marginBottom: 8 }}
        >
          {t(lang, "forgotPassword")}
        </button>

        {/* Toggle to sign up */}
        <button
          onClick={() => switchView("signup")}
          style={{ background: "rgba(52,211,153,.12)", border: "1.5px solid rgba(52,211,153,.4)", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", textAlign: "center", marginBottom: 8, marginTop: 4, padding: "12px 20px", width: "100%" }}
        >
          {t(lang, "dontHaveAccount")}
        </button>

        <div style={{ flex: 1, minHeight: 12 }} />

        <Btn disabled={loading || !aEmail || !aPass} onClick={handleLogin} style={{ background: "linear-gradient(135deg,#2563eb,#3b82f6)", boxShadow: "0 4px 24px rgba(37,99,235,.5)", fontSize: 18, fontWeight: 800, padding: "14px 24px", letterSpacing: 1 }}>
          {loading ? "..." : t(lang, "login")}
        </Btn>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#fff" }} />
          <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{t(lang, "or")}</span>
          <div style={{ flex: 1, height: 1, background: "#fff" }} />
        </div>

        <button disabled={loading} onClick={() => handleOAuth("google")} style={{ ...S.btn, background: "#fff", color: "#333", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <GoogleSvg /> {t(lang, "continueGoogle")}
        </button>
        <button disabled={loading} onClick={() => handleOAuth("apple")} style={{ ...S.btn, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 20 }}>
          <AppleSvg /> {t(lang, "continueApple")}
        </button>
      </div>
    );
  }

  /* ── SIGN UP VIEW ── */
  return (
    <div style={{ ...S.page, paddingTop: 0, display: "flex", flexDirection: "column", minHeight: "calc(100vh - 80px)" }} dir={isRTL ? "rtl" : "ltr"}>
      <Nav title={t(lang, "signUp")} backTo="onboard" />

      {error && (
        <div style={{ background: "rgba(248,113,113,.15)", border: "1px solid rgba(248,113,113,.4)", borderRadius: 12, padding: 12, marginBottom: 12, textAlign: "center" }}>
          <div style={{ color: S.err, fontSize: 13, fontWeight: 600 }}>{error}</div>
        </div>
      )}

      {/* Name row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 0 }}>
        <div style={{ flex: 1 }}>
          {renderInput(bt(lang, "firstName"), firstName, setFirstName, "text", "firstName")}
        </div>
        <div style={{ flex: 1 }}>
          {renderInput(bt(lang, "lastName"), lastName, setLastName, "text", "lastName")}
        </div>
      </div>

      {renderInput(bt(lang, "email"), aEmail, setAEmail, "email", "email")}
      {renderInput(bt(lang, "phone"), phone, setPhone, "tel", "phone")}

      {/* Password with strength indicator */}
      <div style={{ marginBottom: 10 }}>
        <label style={labelStyle}>{bt(lang, "password")}</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            value={aPass}
            onChange={e => { setAPass(e.target.value); if (fieldErrors.password) setFieldErrors(prev => { const n = { ...prev }; delete n.password; return n; }); }}
            style={inputStyle}
          />
          {eyeBtn(showPass, () => setShowPass(!showPass))}
        </div>
        <PasswordStrength password={aPass} lang={lang} />
        {fieldErrors.password && <div style={fieldErrorStyle}>{fieldErrors.password}</div>}
      </div>

      {/* Confirm password */}
      <div style={{ marginBottom: 10 }}>
        <label style={labelStyle}>{bt(lang, "confirmPassword")}</label>
        <div style={{ position: "relative" }}>
          <input
            type={showConfirmPass ? "text" : "password"}
            value={confirmPass}
            onChange={e => { setConfirmPass(e.target.value); if (fieldErrors.confirmPass) setFieldErrors(prev => { const n = { ...prev }; delete n.confirmPass; return n; }); }}
            style={inputStyle}
          />
          {eyeBtn(showConfirmPass, () => setShowConfirmPass(!showConfirmPass))}
        </div>
        {confirmPass && aPass !== confirmPass && (
          <div style={fieldErrorStyle}>{t(lang, "passwordMismatch")}</div>
        )}
        {fieldErrors.confirmPass && !confirmPass && <div style={fieldErrorStyle}>{fieldErrors.confirmPass}</div>}
      </div>

      {/* Terms agreement */}
      <div onClick={() => { setAgreedTerms(!agreedTerms); if (fieldErrors.terms) setFieldErrors(prev => { const n = { ...prev }; delete n.terms; return n; }); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8, cursor: "pointer", gap: 6 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: 4, border: agreedTerms ? "none" : `2px solid ${fieldErrors.terms ? S.err : "rgba(255,255,255,.3)"}`, background: agreedTerms ? "#ef4444" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", flexShrink: 0, fontWeight: 700 }}>
            {agreedTerms && "\u2713"}
          </div>
          <div style={{ fontSize: 14, color: "#fff", textAlign: "center", fontWeight: 700 }}>{t(lang, "byContinuing")} <span style={{ fontWeight: 800 }}>IMMIGUIDE'S</span></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span onClick={(e) => { e.stopPropagation(); go("terms"); }} style={{ color: S.ok, textDecoration: "underline", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>{t(lang, "termsOfService")}</span>
          <span style={{ color: "#fff" }}>{t(lang, "and")}</span>
          <span onClick={(e) => { e.stopPropagation(); go("privacy"); }} style={{ color: S.ok, textDecoration: "underline", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>{t(lang, "privacyPolicy")}</span>
        </div>
      </div>
      {fieldErrors.terms && <div style={{ ...fieldErrorStyle, textAlign: "center", marginTop: 4 }}>{fieldErrors.terms}</div>}

      {/* Toggle to login */}
      <button
        onClick={() => switchView("login")}
        style={{ background: "rgba(52,211,153,.12)", border: "1.5px solid rgba(52,211,153,.4)", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", textAlign: "center", marginBottom: 8, marginTop: 12, padding: "12px 20px", width: "100%" }}
      >
        {t(lang, "alreadyHaveAccount")}
      </button>

      <div style={{ flex: 1, minHeight: 12 }} />

      <Btn disabled={loading} onClick={handleSignUp}>
        {loading ? "..." : t(lang, "createAccount")}
      </Btn>

      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
        <div style={{ flex: 1, height: 1, background: "#fff" }} />
        <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{t(lang, "or")}</span>
        <div style={{ flex: 1, height: 1, background: "#fff" }} />
      </div>

      <button disabled={loading} onClick={() => handleOAuth("google")} style={{ ...S.btn, background: "#fff", color: "#333", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <GoogleSvg /> {t(lang, "continueGoogle")}
      </button>
      <button disabled={loading} onClick={() => handleOAuth("apple")} style={{ ...S.btn, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 20 }}>
        <AppleSvg /> {t(lang, "continueApple")}
      </button>
    </div>
  );
}
