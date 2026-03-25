export function paymentConfirmationEmail(params: {
  userName: string; formName: string; amount: string; caseRef: string; date: string;
}) {
  return {
    subject: `ImmIGuide — Payment Confirmed for ${params.formName}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#0c1445;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#1a237e,#0d47a1);padding:32px;text-align:center">
          <h1 style="margin:0;font-size:28px">ImmIGuide</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,.7)">Payment Confirmation</p>
        </div>
        <div style="padding:32px">
          <p>Hi ${params.userName},</p>
          <p>Your payment has been successfully processed!</p>
          <div style="background:rgba(255,255,255,.1);border-radius:12px;padding:20px;margin:20px 0">
            <p style="margin:0 0 8px"><strong>Form:</strong> ${params.formName}</p>
            <p style="margin:0 0 8px"><strong>Amount:</strong> $${params.amount}</p>
            <p style="margin:0 0 8px"><strong>Case Reference:</strong> ${params.caseRef}</p>
            <p style="margin:0"><strong>Date:</strong> ${params.date}</p>
          </div>
          <p>Our team is now preparing your forms. You'll receive updates as we progress.</p>
          <p style="color:rgba(255,255,255,.5);font-size:12px;margin-top:24px">
            ImmIGuide is a self-service form-preparation tool. We are not a law firm.
          </p>
        </div>
      </div>
    `,
  };
}

export function formSubmissionEmail(params: {
  userName: string; formName: string; caseRef: string; packageType: string;
}) {
  const deliveryMsg = params.packageType === "pdf" ? "emailed within 24 hours"
    : params.packageType === "printShip" ? "printed and shipped within 5-7 days"
    : params.packageType === "fullSvc" ? "mailed to USCIS within 5-7 days"
    : params.packageType === "express" ? "submitted to USCIS within 2-3 business days"
    : "processed shortly";

  return {
    subject: `ImmIGuide — Your ${params.formName} Has Been Submitted!`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#0c1445;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#1a237e,#0d47a1);padding:32px;text-align:center">
          <h1 style="margin:0;font-size:28px">ImmIGuide</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,.7)">Application Submitted</p>
        </div>
        <div style="padding:32px">
          <p>Hi ${params.userName},</p>
          <p>Great news! Your ${params.formName} application has been submitted successfully.</p>
          <div style="background:rgba(52,211,153,.15);border:1px solid rgba(52,211,153,.3);border-radius:12px;padding:20px;margin:20px 0;text-align:center">
            <p style="font-size:18px;font-weight:700;color:#34d399;margin:0">Case Reference</p>
            <p style="font-size:24px;font-weight:900;letter-spacing:2px;margin:8px 0 0">${params.caseRef}</p>
          </div>
          <p>Your forms will be ${deliveryMsg}.</p>
          <p>You can track your application status anytime in the ImmIGuide app.</p>
          <p>Relax — we've got this! Our team is handling everything from here.</p>
          <p style="color:rgba(255,255,255,.5);font-size:12px;margin-top:24px">
            ImmIGuide is a self-service form-preparation tool. We are not a law firm.
          </p>
        </div>
      </div>
    `,
  };
}

export function statusUpdateEmail(params: {
  userName: string; formName: string; caseRef: string; status: string; message: string;
}) {
  return {
    subject: `ImmIGuide — Status Update for ${params.formName} (${params.caseRef})`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#0c1445;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#1a237e,#0d47a1);padding:32px;text-align:center">
          <h1 style="margin:0;font-size:28px">ImmIGuide</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,.7)">Status Update</p>
        </div>
        <div style="padding:32px">
          <p>Hi ${params.userName},</p>
          <p>There's an update on your ${params.formName} application:</p>
          <div style="background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.3);border-radius:12px;padding:20px;margin:20px 0">
            <p style="margin:0 0 8px"><strong>Status:</strong> ${params.status}</p>
            <p style="margin:0">${params.message}</p>
          </div>
          <p>Case Reference: <strong>${params.caseRef}</strong></p>
          <p>Log in to the ImmIGuide app for full details.</p>
        </div>
      </div>
    `,
  };
}

export function referralSuccessEmail(params: {
  userName: string; referredName: string; discountPercent: number;
}) {
  return {
    subject: `ImmIGuide — Your Referral Earned You ${params.discountPercent}% Off!`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#0c1445;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#1a237e,#0d47a1);padding:32px;text-align:center">
          <h1 style="margin:0;font-size:28px">ImmIGuide</h1>
          <p style="margin:8px 0 0;color:#34d399;font-weight:700">Referral Reward!</p>
        </div>
        <div style="padding:32px;text-align:center">
          <p style="font-size:48px;margin:0">🎁</p>
          <p>Hi ${params.userName},</p>
          <p>${params.referredName} just signed up using your referral code and completed their payment!</p>
          <div style="background:rgba(52,211,153,.15);border-radius:12px;padding:20px;margin:20px 0">
            <p style="font-size:24px;font-weight:900;color:#34d399;margin:0">${params.discountPercent}% OFF</p>
            <p style="margin:8px 0 0;color:rgba(255,255,255,.7)">Your next application</p>
          </div>
          <p>Keep sharing your code to earn up to 15% off (30% combined savings)!</p>
        </div>
      </div>
    `,
  };
}
