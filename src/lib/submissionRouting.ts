/**
 * Submission Routing Module
 * Handles routing decisions, tracking number generation, and digital data packages.
 */
import { USCIS_ONLINE, USCIS_FILE_ONLINE_URLS, USCIS_FILING_METHOD } from './uscisFeesSync';
import { t } from '../data/translations';

/**
 * Determine if a form should be submitted digitally or via physical mail.
 */
export function getSubmissionMethod(formId: string): 'mail' | 'digital' {
  return USCIS_ONLINE[formId] === true ? 'digital' : 'mail';
}

/**
 * Get the direct USCIS online filing URL for a form.
 */
export function getFileOnlineUrl(formId: string): string {
  return USCIS_FILE_ONLINE_URLS[formId] || 'https://my.uscis.gov/file-a-form';
}

/**
 * Get the filing method label for a form.
 */
export function getFilingMethodLabel(formId: string, lang: any): string {
  const method = USCIS_FILING_METHOD[formId] || 'mail_only';
  if (method === 'guided') return t(lang, 'guidedWorkflow') || 'Online Guided Workflow';
  if (method === 'pdf_upload') return t(lang, 'pdfUpload') || 'PDF Upload';
  if (method === 'both') return (t(lang, 'guidedWorkflow') || 'Guided') + ' + ' + (t(lang, 'pdfUpload') || 'PDF Upload');
  return '';
}

/**
 * Generate a unique tracking number.
 * Format: TRK-{FORM}-{6 random chars}-{DDMMYY}
 */
export function generateTrackingNumber(formType: string): string {
  const clean = formType.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yy = String(now.getFullYear()).slice(-2);
  return `TRK-${clean}-${rand}-${dd}${mm}${yy}`;
}

/**
 * USCIS field label mapping.
 * Maps internal field keys to USCIS portal labels for the digital filing guide.
 */
const USCIS_FIELD_LABELS: Record<string, string> = {
  firstName: 'Given Name (First Name)',
  lastName: 'Family Name (Last Name)',
  middleName: 'Middle Name',
  otherNames: 'Other Names Used',
  dob: 'Date of Birth',
  countryOfBirth: 'Country of Birth',
  aNumber: 'Alien Registration Number (A-Number)',
  ssn: 'Social Security Number',
  passportNumber: 'Passport Number',
  immigrationStatus: 'Current Immigration Status',
  address: 'Current Mailing Address',
  phone: 'Daytime Phone Number',
  email: 'Email Address',
  lastEntryDate: 'Date of Last Arrival Into the U.S.',
  continuousResidence: 'Continuous Residence Since',
  motherName: "Mother's Full Name",
  fatherName: "Father's Full Name",
  schoolHistory: 'Education History',
  employerName: 'Current Employer Name',
  criminalHistory: 'Criminal History',
  gender: 'Gender',
  maritalStatus: 'Marital Status',
  immigrationViolations: 'Immigration Violations',
  militaryService: 'U.S. Military Service',
  taxRecords: 'Tax Records Filed',
  relationship: 'Relationship to Petitioner',
  replaceReason: 'Reason for Replacement',
  persecutionBasis: 'Basis of Persecution Claim',
  visaCategory: 'Visa Category',
  benefitType: 'Benefit Type',
  metInPerson: 'Met in Person',
  priorApplications: 'Prior Applications Filed',
  jointAccounts: 'Joint Bank Accounts',
  sharedProperty: 'Shared Property',
  eligCategory: 'Eligibility Category',
  tpsCountry: 'TPS Designated Country',
  cityOfBirth: 'City/Town of Birth',
  nationality: 'Country of Nationality',
  dateOfMarriage: 'Date of Marriage',
  spouseName: 'Spouse Full Name',
  annualIncome: 'Annual Income',
  householdSize: 'Household Size',
  occupation: 'Occupation',
  portOfEntry: 'Port of Entry',
  i94Number: 'I-94 Arrival/Departure Number',
  visaNumber: 'Visa Number',
  consulateCity: 'Consulate City',
  petitionerName: 'Petitioner Name',
  beneficiaryName: 'Beneficiary Name',
  receiptNumber: 'USCIS Receipt Number',
};

/**
 * Build a structured data package for digital filing.
 * Returns a clean mapping of USCIS field labels to user-entered values.
 */
export function buildDigitalDataPackage(
  formId: string,
  fd: Record<string, string>,
  fields: Array<{ k: string; s: number; t: string; opts?: string[] }>
): Record<string, string> {
  const pkg: Record<string, string> = {};
  for (const field of fields) {
    const key = formId + '_' + field.k;
    const value = fd[key];
    if (value && value.trim()) {
      const label = USCIS_FIELD_LABELS[field.k] || field.k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();
      pkg[label] = value;
    }
  }
  return pkg;
}

/**
 * Format the data package as a copyable text string.
 */
export function formatDataPackageAsText(pkg: Record<string, string>, formName: string): string {
  let text = `=== ${formName} — USCIS Filing Data ===\n\n`;
  for (const [label, value] of Object.entries(pkg)) {
    text += `${label}: ${value}\n`;
  }
  text += `\n=== End of Data ===`;
  return text;
}
