import { useContext, useState } from "react";
import { AppCtx } from "../context/AppContext";
import { FORMS } from "../data/forms";
import { usePendingSubmissions, useMarkTeamNotified } from "../hooks/useApi";
import type { PageName } from "../types";

const ALL_PAGES: { name: PageName; label: string; icon: string }[] = [
  { name: "onboard", label: "Onboard", icon: "🏠" },
  { name: "auth", label: "Auth", icon: "🔑" },
  { name: "dashboard", label: "Dashboard", icon: "📊" },
  { name: "wizard", label: "Wizard", icon: "🧙" },
  { name: "formSelect", label: "Form Select", icon: "📋" },
  { name: "formDetail", label: "Form Detail", icon: "📄" },
  { name: "formFill", label: "Form Fill", icon: "✍️" },
  { name: "docUpload", label: "Doc Upload", icon: "📷" },
  { name: "preview", label: "Preview", icon: "👁️" },
  { name: "pay", label: "Pay", icon: "💳" },
  { name: "paymentOptions", label: "Payment Options", icon: "💰" },
  { name: "whatsNext", label: "What's Next", icon: "➡️" },
  { name: "submitConfirm", label: "Submit Confirm", icon: "✅" },
  { name: "done", label: "Done", icon: "🎉" },
  { name: "tracking", label: "Tracking", icon: "📈" },
  { name: "civics", label: "Civics", icon: "🎓" },
  { name: "knowledge", label: "Knowledge", icon: "📚" },
  { name: "profile", label: "Profile", icon: "👤" },
  { name: "pricing", label: "Pricing", icon: "💰" },
  { name: "attorneys", label: "Attorneys", icon: "⚖️" },
  { name: "reviews", label: "Reviews", icon: "⭐" },
  { name: "faq", label: "FAQ", icon: "❓" },
  { name: "terms", label: "Terms", icon: "📜" },
  { name: "privacy", label: "Privacy", icon: "🔒" },
];

// Test data for every known field key by type
const TEST_VALUES: Record<string, string> = {
  // Names
  firstName: "John",
  middleName: "Michael",
  lastName: "Doe",
  otherNames: "Johnny Doe",
  petitionerName: "Jane Doe",
  spouseName: "Jane Smith",
  spouseDob: "1992-05-15",
  childrenNames: "Emily Doe, Jacob Doe",
  motherName: "Maria Doe",
  fatherName: "Robert Doe",
  beneficiaryFirstName: "Ana",
  beneficiaryLastName: "Garcia",
  beneficiaryDob: "1994-03-20",
  beneficiaryAddress: "123 Main St, Mexico City, Mexico",
  beneficiaryPassport: "MEX123456789",
  beneficiaryCountry: "Mexico",
  qualifyingRelative: "Jane Smith (spouse)",
  relationshipToApplicant: "Spouse",
  persecutorNames: "Unknown government agents",
  familyAsylumStatus: "No family members have filed",
  dependentNames: "Emily Doe (daughter), Jacob Doe (son)",

  // Dates
  dob: "1990-01-15",
  passportExp: "2030-06-30",
  entryDate: "2020-03-15",
  marriageDate: "2019-08-20",
  departureDate: "2026-06-01",
  returnDate: "2026-07-01",
  statusExpDate: "2027-01-01",
  startDate: "2026-04-01",
  endDate: "2028-04-01",
  examDate: "2026-02-10",
  cardExpDate: "2026-12-31",

  // IDs & Numbers
  aNumber: "A123456789",
  ssn: "123-45-6789",
  passportNum: "US123456789",
  i94: "I94-2020-0315-001",
  gcCardNumber: "SRC2000000001",
  ein: "12-3456789",

  // Contact
  address: "1234 Liberty Ave, Apt 5B, Miami, FL 33101",
  phone: "3051234567",
  email: "john.doe@email.com",

  // Country/Status
  country: "Ukraine",
  tpsCountry: "Ukraine",
  persecutionCountry: "Syria",
  cityOfBirth: "Kyiv",
  currentStatus: "TPS",
  beneficiaryStatus: "Pending",
  petitionerCitizenship: "U.S. Citizen",

  // Employment
  employerName: "ABC Construction LLC",
  employerAddress: "5678 Business Blvd, Miami, FL 33102",
  jobTitle: "Project Manager",
  annualIncome: "65000",
  incomeYear1: "62000",
  incomeYear2: "58000",
  incomeYear3: "55000",
  wageOffered: "75000",
  positionTitle: "Senior Developer",
  companyName: "TechCorp Inc.",
  companyAddress: "100 Tech Drive, San Jose, CA 95112",
  employeeCount: "250",
  workAddress: "100 Tech Drive, San Jose, CA 95112",

  // History
  residenceHistory: "2020-present: Miami, FL; 2015-2020: Kyiv, Ukraine",
  employmentHistory: "2021-present: ABC Construction; 2018-2021: XYZ Corp",
  educationHistory: "2012: BS Computer Science, University of Kyiv",
  schoolHistory: "2005-2012: Central High School, Miami FL",
  travelHistory: "2023: Canada (1 week), 2022: UK (2 weeks)",
  tripsOutsideUS: "2023: Canada, 5 days; 2022: Mexico, 3 days",
  priorMarriages: "None",
  priorEAD: "None",
  priorTravelDocs: "None",
  priorApplications: "no",
  continuousResidence: "2015-present: United States",

  // Physical
  heightFt: "5",
  heightIn: "10",
  eyeColor: "Brown",
  hairColor: "Black",

  // Legal
  criminalHistory: "no",
  immigrationViolations: "no",
  militaryService: "no",
  taxRecords: "no",

  // Family
  maritalStatus: "married",
  gender: "male",
  relationship: "spouse",
  householdSize: "4",
  assets: "$25,000 savings, $180,000 home equity",
  jointAccounts: "yes",
  sharedProperty: "yes",

  // Select fields
  replaceReason: "expired",
  eligCategory: "C09",
  persecutionBasis: "politicalOpinion",
  visaCategory: "H-1B",
  benefitType: "medicaid",
  metInPerson: "yes",

  // Specific
  travelPurpose: "Family visit and business meetings",
  destinations: "United Kingdom, France",
  extensionReason: "Continued medical treatment",
  departurePlan: "Return to home country after treatment",
  howMet: "Met through mutual friends in 2022, visited twice",
  meetingDates: "June 2023 in Mexico City, December 2023 in Miami",
  weddingPlan: "Wedding planned for September 2026 in Miami",
  fearOfReturn: "Fear of persecution due to political activities",
  persecutionNarrative: "Subject to threats and harassment by government officials due to political activism since 2018",
  basisOfClaim: "Extreme hardship to qualifying U.S. citizen spouse",
  extremeHardship: "Spouse has chronic medical conditions requiring ongoing treatment in the US; children enrolled in US schools",
  doctorName: "Dr. Sarah Johnson, MD",
  doctorAddress: "456 Medical Center Dr, Miami, FL 33130",
  vaccinations: "COVID-19, Influenza, Tdap, MMR - all up to date",
  yearsResident: "6",
};

function generateFormData(formId: string, fields: any[]): Record<string, string> {
  const fd: Record<string, string> = {};
  for (const field of fields) {
    const key = formId + "_" + field.k;
    const val = TEST_VALUES[field.k];
    if (val) {
      fd[key] = val;
    }
    // If it's a select with opts, pick first option as fallback
    if (!val && field.opts && field.opts.length > 0) {
      fd[key] = field.opts[0];
    }
  }
  return fd;
}

export default function AdminPanel() {
  const ctx = useContext(AppCtx) as any;
  const [open, setOpen] = useState(false);
  const [selectedFormIdx] = useState(0);
  const { data: pendingSubs } = usePendingSubmissions();
  const markNotified = useMarkTeamNotified();

  const ensureTestData = () => {
    if (!ctx.loggedIn) {
      ctx.setUser({ name: "Admin", email: "admin@immiguide.com", id: "admin-test" });
      ctx.setLoggedIn(true);
    }
    if (!ctx.selForm) {
      ctx.setSelForm(FORMS[selectedFormIdx]);
    }
    if (!ctx.pkg) {
      ctx.setPkg("fullSvc");
    }
    if (!ctx.payTotal) {
      ctx.setPayTotal(224.99);
    }
    if (!ctx.uscisConf) {
      ctx.setUscisConf("USCIS-TEST-2026-001");
    }
    if (ctx.setOurFeePaid) ctx.setOurFeePaid(true);
    if (ctx.setUscisPaid) ctx.setUscisPaid(true);
  };

  const autoFillCurrentForm = () => {
    const form = ctx.selForm || FORMS[selectedFormIdx];
    if (!form) return;
    ctx.setSelForm(form);
    const fd = generateFormData(form.id, form.fields);
    ctx.setFd((prev: any) => ({ ...prev, ...fd }));
    ctx.setPkg("fullSvc");
    ctx.setPayTotal(form.fee + 25);
    ctx.setUscisConf("USCIS-TEST-2026-001");
    if (ctx.setOurFeePaid) ctx.setOurFeePaid(true);
    if (ctx.setUscisPaid) ctx.setUscisPaid(true);
  };

  const autoFillAllForms = () => {
    ensureTestData();
    // Fill ALL forms data at once
    const allFd: Record<string, string> = {};
    for (const form of FORMS) {
      const fd = generateFormData(form.id, form.fields);
      Object.assign(allFd, fd);
    }
    ctx.setFd((prev: any) => ({ ...prev, ...allFd }));
  };

  const selectAndGoToForm = (formIdx: number) => {
    const form = FORMS[formIdx];
    ensureTestData();
    ctx.setSelForm(form);
    const fd = generateFormData(form.id, form.fields);
    ctx.setFd((prev: any) => ({ ...prev, ...fd }));
    ctx.setPkg("fullSvc");
    ctx.setPayTotal(form.fee + 25);
    ctx.setFSec(0);
    ctx.go("formFill");
    setOpen(false);
  };

  const goTo = (page: PageName) => {
    ensureTestData();
    ctx.go(page);
    setOpen(false);
  };

  const S = {
    btn: { padding: "5px 8px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700 as const, width: "100%" },
  };

  return (
    <>
      {/* Floating admin button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: 20, right: 20, width: 44, height: 44,
          borderRadius: 22, background: open ? "#ef4444" : "#6366f1", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, cursor: "pointer", zIndex: 9999,
          boxShadow: "0 4px 20px rgba(0,0,0,.4)", transition: "background .2s",
        }}
      >
        {open ? "✕" : "⚙"}
      </div>

      {/* Admin panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: 72, right: 20, width: 240,
          maxHeight: "80vh", overflowY: "auto",
          background: "rgba(15,22,50,.97)", border: "1px solid rgba(99,102,241,.4)",
          borderRadius: 16, padding: 12, zIndex: 9998,
          boxShadow: "0 8px 32px rgba(0,0,0,.6)",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
            Admin Panel
          </div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)", marginBottom: 8 }}>
            Page: {ctx.page} | Lang: {ctx.lang} | Form: {ctx.selForm?.id || "none"}
          </div>

          {/* Auto-fill buttons */}
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            <button onClick={() => { autoFillCurrentForm(); setOpen(false); }} style={{ ...S.btn, background: "#22c55e", color: "#fff" }}>
              Fill Current
            </button>
            <button onClick={() => { autoFillAllForms(); setOpen(false); }} style={{ ...S.btn, background: "#f59e0b", color: "#000" }}>
              Fill ALL Forms
            </button>
          </div>

          {/* Quick form selector */}
          <div style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", marginBottom: 4 }}>FORMS (click = fill + go)</div>
          <div style={{ maxHeight: 120, overflowY: "auto", marginBottom: 8, border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, padding: 4 }}>
            {FORMS.map((f, i) => (
              <div key={f.id} onClick={() => selectAndGoToForm(i)} style={{
                padding: "4px 6px", borderRadius: 6, cursor: "pointer", fontSize: 11,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                color: ctx.selForm?.id === f.id ? "#6366f1" : "#fff",
                background: ctx.selForm?.id === f.id ? "rgba(99,102,241,.15)" : "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = ctx.selForm?.id === f.id ? "rgba(99,102,241,.15)" : "transparent")}
              >
                <span>{f.name}</span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.4)" }}>${f.fee}</span>
              </div>
            ))}
          </div>

          {/* Page navigation */}
          <div style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", marginBottom: 4 }}>PAGES</div>
          {ALL_PAGES.map((p) => (
            <div key={p.name} onClick={() => goTo(p.name)} style={{
              padding: "5px 8px", borderRadius: 8, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, fontSize: 12,
              fontWeight: ctx.page === p.name ? 700 : 400,
              color: ctx.page === p.name ? "#6366f1" : "#fff",
              background: ctx.page === p.name ? "rgba(99,102,241,.15)" : "transparent",
              marginBottom: 1,
            }}
            onMouseEnter={(e) => { if (ctx.page !== p.name) e.currentTarget.style.background = "rgba(255,255,255,.07)"; }}
            onMouseLeave={(e) => { if (ctx.page !== p.name) e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ fontSize: 14 }}>{p.icon}</span>
              {p.label}
            </div>
          ))}

          {/* ── Pending Submissions Queue ── */}
          {pendingSubs && pendingSubs.length > 0 && (
            <>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", marginTop: 8, marginBottom: 4 }}>
                📬 PENDING ({pendingSubs.length})
              </div>
              <div style={{ maxHeight: 120, overflowY: "auto" }}>
                {pendingSubs.map((sub: any) => (
                  <div key={sub.id} style={{ padding: "4px 8px", borderRadius: 6, background: "rgba(251,191,36,.1)", border: "1px solid rgba(251,191,36,.3)", marginBottom: 4, fontSize: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, color: "#fff" }}>{sub.form_type?.toUpperCase()}</span>
                      <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: sub.submission_method === "mail" ? "rgba(251,191,36,.2)" : "rgba(52,211,153,.2)", color: sub.submission_method === "mail" ? "#f59e0b" : "#34d399", fontWeight: 700 }}>
                        {sub.submission_method === "mail" ? "📦 MAIL" : "🌐 DIGITAL"}
                      </span>
                    </div>
                    <div style={{ color: "rgba(255,255,255,.5)", fontSize: 9 }}>{sub.tracking_number}</div>
                    <button onClick={() => markNotified.mutate(sub.id)} style={{ ...S.btn, background: "#f59e0b", color: "#000", marginTop: 3 }}>
                      ✅ Acknowledge
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
