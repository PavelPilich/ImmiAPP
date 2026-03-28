import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import Nav from "../components/layout/Nav";

export default function PagePrivacy() {
  const { lang } = useContext(AppCtx) as any;
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  const sections = [
    { title: "1. Information We Collect", content: "We collect: personal information (name, email, phone, date of birth, address), immigration-related data (A-number, passport details, immigration status), uploaded documents (passport photos, birth certificates, supporting documents), payment information (processed securely by Stripe/PayPal — we never store card numbers), usage data (pages visited, features used, language preference), and device information (browser type, IP address for security)." },
    { title: "2. How We Use Your Data", content: "Your data is used to: prepare and fill immigration forms on your behalf, process payments, send confirmation emails and status updates, improve our services, communicate important information about your application, and comply with legal requirements." },
    { title: "3. Data Storage & Security", content: "All data is stored on Supabase (hosted on AWS) with encryption at rest and in transit. Documents are stored in Supabase Storage with row-level security — only you can access your files. Payment data is processed by Stripe and PayPal — we never store credit card numbers. We use HTTPS/TLS encryption for all data transmission. Access to user data is restricted to authorized personnel only." },
    { title: "4. Third-Party Services", content: "We use the following third-party services: Supabase (database & authentication), Stripe (payment processing), PayPal (payment processing), Resend (email delivery). Each service has its own privacy policy. We only share the minimum data necessary for each service to function." },
    { title: "5. Cookies & Local Storage", content: "We use browser localStorage to save your language preference and form progress locally. We do not use tracking cookies. No advertising cookies or third-party trackers are used on our platform." },
    { title: "6. Document Handling", content: "Uploaded documents (passport photos, birth certificates, etc.) are stored securely in encrypted cloud storage. Documents are accessible only to you and authorized ImmIGuide personnel processing your application. Documents are retained for the duration of your application processing plus 90 days, after which they are permanently deleted unless you request earlier deletion." },
    { title: "7. Your Rights", content: "You have the right to: access all personal data we hold about you, request correction of inaccurate data, request deletion of your data and account, export your data in a portable format, opt out of marketing communications, and withdraw consent for data processing at any time." },
    { title: "8. Data Deletion", content: "To request deletion of your account and all associated data, email privacy@immiguide.com. We will process your request within 30 days. Some data may be retained as required by law (payment records for tax purposes)." },
    { title: "9. Children's Privacy", content: "ImmIGuide is not intended for use by children under 13. We do not knowingly collect data from children. If we discover we have collected data from a child under 13, we will delete it immediately." },
    { title: "10. International Users", content: "Our servers are located in the United States. By using ImmIGuide, you consent to the transfer and processing of your data in the United States. We comply with applicable data protection laws." },
    { title: "11. Changes to Privacy Policy", content: "We may update this Privacy Policy periodically. We will notify you of material changes via email or in-app notification. Continued use after changes constitutes acceptance." },
    { title: "12. Contact", content: "For privacy-related questions or data requests, contact: privacy@immiguide.com" },
  ];

  return (
    <div style={S.page} dir={isRTL ? "rtl" : "ltr"}>
      <Nav title="Privacy Policy" backTo="auth" />

      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: S.t2 }}>Last Updated: March 2026</div>
      </div>

      {sections.map((s, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: "#fff" }}>{s.title}</div>
          <div style={{ fontSize: 12, color: S.t2, lineHeight: 1.7 }}>{s.content}</div>
        </div>
      ))}
    </div>
  );
}
