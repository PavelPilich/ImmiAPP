import { useContext } from "react";
import { AppCtx } from "../context/AppContext";
import { S } from "../data/styles";
import Nav from "../components/layout/Nav";

export default function PageTerms() {
  const { lang } = useContext(AppCtx) as any;
  const isRTL = lang === "ar" || lang === "fa" || lang === "he";

  const sections = [
    { title: "1. Service Description", content: "ImmIGuide is a self-service immigration form-preparation platform. We assist users in completing USCIS immigration forms by providing a guided, multilingual interface. WE ARE NOT A LAW FIRM. We do not provide legal advice, legal representation, or attorney services of any kind. Our service is limited to form preparation, document organization, printing, and mailing assistance." },
    { title: "2. User Responsibilities", content: "You are responsible for the accuracy of all information you provide. You must independently verify that the forms you are filing are appropriate for your immigration situation. We recommend consulting a licensed immigration attorney for complex cases. You are responsible for paying all applicable USCIS filing fees directly to USCIS." },
    { title: "3. Payment & Refund Policy", content: "All service fees are charged at the time of checkout. Prices are displayed in USD and include form preparation, review, and selected delivery method. USCIS government filing fees are separate and paid directly to USCIS. Refunds may be requested within 24 hours of payment if form preparation has not begun. Once form preparation has started, no refunds will be issued. Delivery fees are non-refundable once forms have been printed or mailed." },
    { title: "4. Promo Codes & Referral Program", content: "Promo codes are subject to availability and may have expiration dates, usage limits, or restrictions. The referral program provides a 5% discount to both the referrer and the referred person upon the referred person completing a paid transaction. Referral discounts stack up to a maximum of 15% per user (3 successful referrals). Discounts apply only to verified, paying customers. ImmIGuide reserves the right to modify or terminate the referral program at any time." },
    { title: "5. Attorney Directory Disclaimer", content: "The attorney directory on ImmIGuide is an advertising platform. Attorney listings are paid advertisements. ImmIGuide does not endorse, recommend, vouch for, or guarantee the services of any listed attorney. We verify bar membership and require case results documentation, but we are not responsible for attorney performance. If an attorney receives 3 or more negative client reviews, they will be permanently removed from the platform regardless of remaining contract time. No refunds will be issued to removed attorneys." },
    { title: "6. Intellectual Property", content: "All content, design, code, graphics, logos, and branding on ImmIGuide are the property of ImmIGuide and protected by copyright law. Users may not copy, reproduce, distribute, or create derivative works from our platform without written permission." },
    { title: "7. Limitation of Liability", content: "ImmIGuide is provided 'as is' without warranties of any kind. We are not liable for any damages arising from the use of our service, including but not limited to: USCIS rejections, processing delays, incorrect form submissions, or any immigration-related outcomes. Our total liability is limited to the amount you paid for our service. We are not responsible for actions taken by listed attorneys or any third-party services." },
    { title: "8. Data Handling", content: "We collect and store personal information necessary for form preparation. All data is encrypted in transit and at rest. We use Supabase for data storage and Stripe/PayPal for payment processing. We do not sell or share your personal data with third parties except as necessary to provide our services. See our Privacy Policy for full details." },
    { title: "9. Account Termination", content: "We reserve the right to suspend or terminate accounts that violate these terms, provide false information, or engage in fraudulent activity. Users may request account deletion at any time by contacting support@immiguide.com." },
    { title: "10. Modifications", content: "We may update these Terms of Service at any time. Continued use of the platform after changes constitutes acceptance of the updated terms. Material changes will be communicated via email or in-app notification." },
    { title: "11. Governing Law", content: "These terms are governed by the laws of the State of Florida, United States. Any disputes shall be resolved in the courts of Miami-Dade County, Florida." },
    { title: "12. Contact", content: "For questions about these terms, contact us at: legal@immiguide.com" },
  ];

  return (
    <div style={S.page} dir={isRTL ? "rtl" : "ltr"}>
      <Nav title="Terms of Service" backTo="onboard" />

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
