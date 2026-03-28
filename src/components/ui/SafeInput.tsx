import { useState, useEffect, useRef } from "react";
import { S } from "../../data/styles";

// Admin auto-fill test values by field key pattern
const ADMIN_VALUES: Record<string, string> = {
  firstName: "John", middleName: "Michael", lastName: "Doe", otherNames: "Johnny Doe",
  petitionerName: "Jane Doe", spouseName: "Jane Smith", spouseDob: "1992-05-15",
  childrenNames: "Emily Doe, Jacob Doe", motherName: "Maria Doe", fatherName: "Robert Doe",
  beneficiaryFirstName: "Ana", beneficiaryLastName: "Garcia", beneficiaryDob: "1994-03-20",
  beneficiaryAddress: "123 Main St, Mexico City", beneficiaryPassport: "MEX123456789",
  qualifyingRelative: "Jane Smith (spouse)", relationshipToApplicant: "Spouse",
  persecutorNames: "Unknown government agents", familyAsylumStatus: "None",
  dependentNames: "Emily Doe, Jacob Doe", relationship: "Spouse",
  dob: "1990-01-15", passportExp: "2030-06-30", entryDate: "2020-03-15",
  marriageDate: "2019-08-20", departureDate: "2026-06-01", returnDate: "2026-07-01",
  statusExpDate: "2027-01-01", startDate: "2026-04-01", endDate: "2028-04-01",
  examDate: "2026-02-10", cardExpDate: "2026-12-31",
  aNumber: "A123456789", ssn: "123-45-6789", passportNum: "US123456789",
  i94: "I94-2020-0315-001", gcCardNumber: "SRC2000000001", ein: "12-3456789",
  address: "1234 Liberty Ave, Apt 5B, Miami, FL 33101",
  phone: "3051234567", email: "john.doe@email.com",
  cityOfBirth: "Kyiv", currentStatus: "TPS", beneficiaryStatus: "Pending",
  petitionerCitizenship: "U.S. Citizen",
  employerName: "ABC Construction LLC", employerAddress: "5678 Business Blvd, Miami, FL",
  jobTitle: "Project Manager", annualIncome: "65000",
  incomeYear1: "62000", incomeYear2: "58000", incomeYear3: "55000",
  wageOffered: "75000", positionTitle: "Senior Developer",
  companyName: "TechCorp Inc.", companyAddress: "100 Tech Drive, San Jose, CA",
  employeeCount: "250", workAddress: "100 Tech Drive, San Jose, CA",
  residenceHistory: "2020-present: Miami, FL", employmentHistory: "2021-present: ABC Construction",
  educationHistory: "2012: BS Computer Science", schoolHistory: "2005-2012: Central High School",
  travelHistory: "2023: Canada, 2022: UK", tripsOutsideUS: "2023: Canada 5 days",
  priorMarriages: "None", priorEAD: "None", priorTravelDocs: "None",
  continuousResidence: "2015-present: United States",
  heightFt: "5", heightIn: "10", eyeColor: "Brown", hairColor: "Black",
  householdSize: "4", assets: "$25,000 savings",
  travelPurpose: "Family visit", destinations: "United Kingdom, France",
  extensionReason: "Continued medical treatment", departurePlan: "Return after treatment",
  howMet: "Met through mutual friends in 2022", meetingDates: "June 2023, December 2023",
  weddingPlan: "September 2026 in Miami",
  fearOfReturn: "Fear of persecution due to political activities",
  persecutionNarrative: "Subject to threats by government officials since 2018",
  basisOfClaim: "Extreme hardship to U.S. citizen spouse",
  extremeHardship: "Spouse has chronic medical conditions requiring US treatment",
  doctorName: "Dr. Sarah Johnson, MD", doctorAddress: "456 Medical Center Dr, Miami, FL",
  vaccinations: "COVID-19, Influenza, Tdap, MMR", yearsResident: "6",
  eligCategory: "C09", visaCategory: "H-1B",
};

// Check if admin mode (logged in as Admin or no Supabase)
function isAdminMode(): boolean {
  // Only enable click-to-fill in development
  return !!import.meta.env.DEV;
}

// Extract field key from the composite key (formId_fieldKey)
function getFieldKey(compositeKey: string): string {
  const parts = compositeKey.split("_");
  return parts.length > 1 ? parts.slice(1).join("_") : compositeKey;
}

interface SafeInputProps {
  type: string;
  val: string;
  onCommit: (v: string) => void;
  ph?: string;
  fieldKey?: string; // optional: the raw field key for admin auto-fill
}

function SafeInput({ type, val, onCommit, ph, fieldKey }: SafeInputProps) {
  const [loc, setLoc] = useState(val);
  useEffect(() => { setLoc(val); }, [val]);
  const tp = type === "tel" ? "tel" : type === "date" ? "date" : type === "email" ? "email" : "text";

  const filledRef = useRef(false);

  const handleClick = () => {
    if (loc) return;
    if (!isAdminMode()) return;

    const key = fieldKey || (ph ? getFieldKey(ph) : "");
    const testVal = ADMIN_VALUES[key];
    if (testVal) {
      setLoc(testVal);
      onCommit(testVal);
      filledRef.current = true;
    }
  };

  const handleBlur = () => {
    // Skip onBlur if we just filled via click (prevents overwriting with stale empty value)
    if (filledRef.current) {
      filledRef.current = false;
      return;
    }
    onCommit(loc);
  };

  return (
    <input
      type={tp}
      value={loc}
      onChange={e => setLoc(e.target.value)}
      onBlur={handleBlur}
      onClick={handleClick}
      placeholder={ph}
      style={S.inp}
      autoComplete="off"
    />
  );
}

export default SafeInput;
