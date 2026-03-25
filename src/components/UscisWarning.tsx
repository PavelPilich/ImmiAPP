import { S } from "../data/styles";
import { USCIS_URLS, USCIS_ONLINE } from "../lib/uscisFeesSync";

interface UscisWarningProps {
  fee: number;
  large?: boolean;
  formId?: string;
}

function UscisWarning({ fee, large, formId }: UscisWarningProps) {
  const payUrl = formId ? (USCIS_URLS[formId] || "https://www.uscis.gov") : "https://www.uscis.gov";
  const isOnline = formId ? (USCIS_ONLINE[formId] ?? false) : true;

  return (
    <div style={{ background:"rgba(239,68,68,.15)", border:(large?"3px":"2px")+" solid #ef4444", borderRadius:large?16:14, padding:large?20:16, marginBottom:12, textAlign:"center" }}>
      <span style={{ fontSize:large?36:28 }}>🚨</span>
      <div style={{ fontSize:large?24:18, fontWeight:large?900:800, color:"#ef4444", margin:"6px 0" }}>IMPORTANT</div>
      <p style={{ fontSize:large?16:15, color:"#fff", fontWeight:700, lineHeight:1.6, margin:"0 0 8px" }}>You {large?"MUST":"must"} pay the USCIS filing fee of ${Number(fee).toFixed(2)} {large?"BEFORE we can submit":"separately"}.</p>
      <p style={{ fontSize:large?14:13, color:"#fca5a5", margin:0, lineHeight:1.7 }}>Without payment, USCIS will reject your application.</p>
      {large && (
        <>
          <div style={{ background:"rgba(255,255,255,.1)", borderRadius:10, padding:12, textAlign:"center", margin:"12px 0" }}>
            <p style={{ fontSize:13, color:"#fff", margin:"0 0 4px", fontWeight:600 }}>
              {isOnline ? "Pay & File Online:" : "Filing Instructions:"}
            </p>
            <a href={payUrl} target="_blank" rel="noopener" style={{ color:S.acc, fontWeight:800, fontSize:18, textDecoration:"underline" }}>
              {isOnline ? "🔗 Pay on USCIS.gov →" : "🔗 View Instructions on USCIS.gov →"}
            </a>
            {isOnline && <p style={{ fontSize:11, color:"rgba(255,255,255,.4)", margin:"6px 0 0" }}>Opens myaccount.uscis.gov — create/login to file & pay</p>}
            {!isOnline && <p style={{ fontSize:11, color:"rgba(255,255,255,.4)", margin:"6px 0 0" }}>This form requires mail filing — pay by check/money order</p>}
          </div>
          <div style={{ background:"rgba(239,68,68,.15)", borderRadius:10, padding:10 }}>
            <p style={{ fontSize:12, color:"#fca5a5", margin:0, fontWeight:600 }}>Save your receipt as proof of payment.</p>
          </div>
        </>
      )}
    </div>
  );
}

export default UscisWarning;
