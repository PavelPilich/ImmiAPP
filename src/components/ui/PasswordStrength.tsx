import { S } from "../../data/styles";
import { t } from "../../data/translations";

interface Props {
  password: string;
  lang: any;
}

export function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export default function PasswordStrength({ password, lang }: Props) {
  if (!password) return null;
  const score = getPasswordStrength(password);
  const label = score <= 1 ? t(lang, "passwordWeak") : score <= 2 ? t(lang, "passwordMedium") : t(lang, "passwordStrong");
  const color = score <= 1 ? S.err : score <= 2 ? S.wrn : S.ok;
  const pct = (score / 4) * 100;

  const checks = [
    { ok: password.length >= 8, label: "8+" },
    { ok: /[A-Z]/.test(password), label: "A-Z" },
    { ok: /[0-9]/.test(password), label: "0-9" },
    { ok: /[^A-Za-z0-9]/.test(password), label: "!@#" },
  ];

  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,.1)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2, transition: "width .3s, background .3s" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <span style={{ fontSize: 11, color, fontWeight: 600 }}>{label}</span>
        <div style={{ display: "flex", gap: 8 }}>
          {checks.map((c, i) => (
            <span key={i} style={{ fontSize: 10, color: c.ok ? S.ok : "rgba(255,255,255,.3)", fontWeight: 600 }}>
              {c.ok ? "\u2713" : "\u2717"} {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
