import { jsPDF } from "jspdf";

interface PdfParams {
  formName: string;
  formId: string;
  caseRef: string;
  userName: string;
  userEmail: string;
  fd: Record<string, string>;
  fields: { s: number; k: string; t: string }[];
  sections: number;
  packageType: string | null;
  date?: string;
}

export function generateFormPdf(params: PdfParams) {
  const { formName, formId, caseRef, userName, userEmail, fd, fields, sections, packageType } = params;
  const doc = new jsPDF();
  const date = params.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  let y = 20;

  const addPage = () => { doc.addPage(); y = 20; };
  const checkPage = (needed: number) => { if (y + needed > 270) addPage(); };

  // ═══ COVER PAGE ═══
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("ImmIGuide", 105, y, { align: "center" });
  y += 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Immigration Form Preparation Service", 105, y, { align: "center" });
  y += 20;

  // Form info box
  doc.setDrawColor(100, 102, 241);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, y, 170, 50, 3, 3);
  y += 12;
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`Form ${formName}`, 105, y, { align: "center" });
  y += 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Case Reference: ${caseRef}`, 105, y, { align: "center" });
  y += 8;
  doc.text(`Prepared for: ${userName} (${userEmail})`, 105, y, { align: "center" });
  y += 8;
  doc.text(`Date: ${date}`, 105, y, { align: "center" });
  y += 8;
  doc.text(`Delivery: ${packageType || "PDF"}`, 105, y, { align: "center" });
  y += 20;

  // Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("DISCLAIMER: This document was prepared using ImmIGuide, a self-service form-preparation tool.", 105, y, { align: "center" });
  y += 5;
  doc.text("ImmIGuide is NOT a law firm and does NOT provide legal advice. For legal advice, consult an attorney.", 105, y, { align: "center" });
  doc.setTextColor(0, 0, 0);

  // ═══ FORM DATA PAGES ═══
  addPage();
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`${formName} — Form Data`, 20, y);
  y += 12;

  for (let sec = 0; sec < sections; sec++) {
    checkPage(20);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 102, 241);
    doc.text(`Section ${sec + 1} of ${sections}`, 20, y);
    doc.setTextColor(0, 0, 0);
    y += 8;

    const sectionFields = fields.filter(f => f.s === sec);
    for (const field of sectionFields) {
      checkPage(14);
      const key = `${formId}_${field.k}`;
      const value = fd[key] || "(not provided)";
      const label = field.k.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text(label, 20, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      y += 5;

      // Handle long text
      const lines = doc.splitTextToSize(value, 160);
      doc.text(lines, 20, y);
      y += lines.length * 5 + 4;

      // Separator line
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.2);
      doc.line(20, y, 190, y);
      y += 4;
    }

    y += 4;
  }

  // ═══ COVER LETTER ═══
  addPage();
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Cover Letter", 20, y);
  y += 12;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const coverLines = [
    `Date: ${date}`,
    "",
    "U.S. Citizenship and Immigration Services",
    "Department of Homeland Security",
    "",
    `Re: ${formName} Application`,
    `Applicant: ${userName}`,
    `Case Reference: ${caseRef}`,
    "",
    "Dear USCIS Officer,",
    "",
    `Please find enclosed the completed ${formName} application for the above-referenced applicant.`,
    `This application has been prepared using ImmIGuide form preparation services.`,
    "",
    "The following documents are included in this package:",
    `  1. Completed ${formName} form`,
    "  2. Supporting documents as required",
    "  3. Applicable filing fees (paid separately to USCIS)",
    "",
    "Thank you for your time and consideration.",
    "",
    "Sincerely,",
    userName,
    userEmail,
  ];

  for (const line of coverLines) {
    checkPage(7);
    doc.text(line, 20, y);
    y += 6;
  }

  // ═══ DOCUMENT CHECKLIST ═══
  addPage();
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Document Checklist", 20, y);
  y += 12;

  const checklist = [
    `${formName} form (completed)`,
    "Passport-style photograph (2x2 inches)",
    "Copy of passport (biographical page)",
    "Birth certificate (with translation if not in English)",
    "Government-issued photo ID",
    "Proof of immigration status",
    "USCIS filing fee payment receipt",
    "Supporting evidence as applicable",
  ];

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  for (const item of checklist) {
    checkPage(10);
    doc.rect(20, y - 3, 4, 4);
    doc.text(item, 28, y);
    y += 8;
  }

  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Generated by ImmIGuide | www.immiguide.com", 105, y, { align: "center" });

  // Save
  doc.save(`ImmIGuide_${formName}_${caseRef}.pdf`);
}
