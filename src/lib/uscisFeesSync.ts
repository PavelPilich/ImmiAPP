/**
 * USCIS Fee Auto-Sync Module
 *
 * Fetches the latest USCIS filing fees and updates the app automatically.
 * Falls back to the hardcoded fees in forms.ts if the fetch fails.
 *
 * Data source: USCIS Fee Schedule (G-1055)
 * https://www.uscis.gov/g-1055
 *
 * In production, this would hit a backend endpoint that scrapes/caches
 * the USCIS fee schedule. For now, we use a Supabase table as the
 * source of truth, updated by an admin or a scheduled cloud function.
 *
 * IMPORTANT: USCIS now charges different fees for online vs paper/mail filing.
 * Online filing is cheaper for many forms. The fees below reflect the
 * PAPER/MAIL filing fees (higher). Online discounts are shown separately.
 */

import { supabase } from './supabase';

export interface UscisFormFee {
  formId: string;
  formName: string;
  fee: number;
  feeOnline: number;
  payUrl: string;
  lastUpdated: string;
}

/* Hardcoded fallback fees — 2025-2026 USCIS Fee Schedule (paper/mail)
 * Updated March 2026 per G-1055 edition 03/23/26.
 * I-821 & I-765 TPS categories reflect HR-1 inflation adjustment eff. 01/01/2026.
 */
const FALLBACK_FEES: Record<string, number> = {
  i821:  510,
  daca:  85,
  i765:  520,    // $520 paper, $470 online (standard category)
  i130:  675,    // $675 paper, $625 online
  n400:  760,    // $760 paper, $710 online
  i485:  1440,
  i131:  630,    // $630 paper, $580 online (advance parole / reentry permit)
  i589:  100,
  i539:  470,    // $470 paper, $420 online
  i129f: 675,
  i90:   465,    // $465 paper, $415 online
  i751:  750,    // $750 paper, $700 online
  i864:  0,      // No USCIS filing fee (NVC charges $120 for consular processing)
  i129:  780,    // $780 paper, $730 online
  i140:  715,    // $715 paper, $715 online (same)
  i693:  0,      // Doctor fee, not USCIS
  i912:  0,      // Fee waiver — no charge
  i601:  930,    // $930 base fee (no biometrics required)
  i601a: 630,    // $630 provisional waiver
  i360:  515,    // $515 (some categories $0 — VAWA self-petitioners)
  i918:  0,      // $0 — no filing fee for U-visa
  n600:  1385,   // $1,385 certificate of citizenship
  n565:  555,    // $555 replacement document
  ar11:  0,      // $0 — address change is free
  i907:  2805,   // $2,805 premium processing
  i829:  3750,   // $3,750 investor remove conditions
  i290b: 800,    // $800 appeal/motion
  i730:  0,      // $0 refugee family petition
  i914:  0,      // $0 T-visa (trafficking victims)
  n336:  750,    // $750 naturalization hearing
  i212:  930,    // $930 reapply after deportation
  i134:  0,      // $0 financial support declaration
  i824:  465,    // $465 action on approved petition
};

/* Online filing fees — lower for forms that support online filing
 * Updated March 2026 per G-1055 edition 03/23/26.
 */
const ONLINE_FEES: Record<string, number> = {
  i821:  510,    // Same (online available but no discount)
  daca:  85,     // Same
  i765:  470,    // $50 savings
  i130:  625,    // $50 savings
  n400:  710,    // $50 savings
  i485:  1440,   // Mail only — no discount
  i131:  580,    // $50 savings (was $630 paper)
  i589:  100,    // Same
  i539:  420,    // $50 savings (was $470 paper)
  i129f: 675,    // Mail only — no discount
  i90:   415,    // $50 savings
  i751:  700,    // $50 savings (online PDF upload)
  i864:  0,      // No USCIS filing fee
  i129:  730,    // $50 savings
  i140:  715,    // Same
  i693:  0,      // Doctor fee, not USCIS
  i912:  0,      // Fee waiver — no charge
  i601:  930,    // Mail only — no discount
  i601a: 630,    // Online filing available
  i360:  515,    // Mail only
  i918:  0,      // No fee
  n600:  1385,   // Online filing available (guided)
  n565:  555,    // Online filing available (guided)
  ar11:  0,      // Online filing available (free)
  i907:  2805,   // Same — online filing
  i829:  3750,   // Mail only
  i290b: 800,    // Mail only
  i730:  0,      // Mail only
  i914:  0,      // Mail only
  n336:  750,    // Online filing available
  i212:  930,    // Mail only
  i134:  0,      // Mail only
  i824:  465,    // Mail only
};

/**
 * USCIS direct filing/payment URLs per form.
 *
 * For ONLINE forms: links to myaccount.uscis.gov (the actual filing portal)
 * For MAIL-ONLY forms: links to the form's USCIS instructions page
 *   where the customer can find mailing addresses & payment info.
 *
 * When the customer clicks "Pay USCIS Fee" these URLs open in a new tab.
 */
const USCIS_URLS: Record<string, string> = {
  i821:  "https://myaccount.uscis.gov/processing-times/more-info/I-821",
  daca:  "https://myaccount.uscis.gov/processing-times/more-info/I-821D",
  i765:  "https://myaccount.uscis.gov/processing-times/more-info/I-765",
  i130:  "https://myaccount.uscis.gov/processing-times/more-info/I-130",
  n400:  "https://myaccount.uscis.gov/processing-times/more-info/N-400",
  i485:  "https://www.uscis.gov/i-485",
  i131:  "https://myaccount.uscis.gov/processing-times/more-info/I-131",
  i589:  "https://my.uscis.gov/accounts/annual-asylum-fee/start/overview",
  i539:  "https://myaccount.uscis.gov/processing-times/more-info/I-539",
  i129f: "https://www.uscis.gov/i-129f",
  i90:   "https://myaccount.uscis.gov/processing-times/more-info/I-90",
  i751:  "https://www.uscis.gov/i-751",
  i864:  "https://myaccount.uscis.gov/processing-times/more-info/I-864",
  i129:  "https://myaccount.uscis.gov/processing-times/more-info/I-129",
  i140:  "https://myaccount.uscis.gov/processing-times/more-info/I-140",
  i693:  "https://www.uscis.gov/i-693",
  i912:  "https://myaccount.uscis.gov/processing-times/more-info/I-912",
  i601:  "https://www.uscis.gov/i-601",
  i601a: "https://myaccount.uscis.gov/processing-times/more-info/I-601A",
  i360:  "https://www.uscis.gov/i-360",
  i918:  "https://www.uscis.gov/i-918",
  n600:  "https://myaccount.uscis.gov/processing-times/more-info/N-600",
  n565:  "https://myaccount.uscis.gov/processing-times/more-info/N-565",
  ar11:  "https://my.uscis.gov/file-a-form",
  i907:  "https://myaccount.uscis.gov/processing-times/more-info/I-907",
  i829:  "https://www.uscis.gov/i-829",
  i290b: "https://www.uscis.gov/i-290b",
  i730:  "https://www.uscis.gov/i-730",
  i914:  "https://www.uscis.gov/i-914",
  n336:  "https://myaccount.uscis.gov/processing-times/more-info/N-336",
  i212:  "https://www.uscis.gov/i-212",
  i134:  "https://www.uscis.gov/i-134",
  i824:  "https://www.uscis.gov/i-824",
};

/**
 * Whether each form supports online filing or mail only.
 * Based on https://www.uscis.gov/file-online/forms-available-to-file-online
 * Updated March 2026.
 */
const USCIS_ONLINE: Record<string, boolean> = {
  i821:  true,   // Online filing available — guided workflow
  daca:  true,   // Online filing available — guided workflow (I-821D)
  i765:  true,   // Online filing available — guided + PDF upload
  i130:  true,   // Online filing available — guided + PDF upload
  n400:  true,   // Online filing available — guided + PDF upload
  i485:  false,  // ❌ Mail only — NOT listed on uscis.gov/file-online
  i131:  true,   // Online filing available — guided + PDF upload
  i589:  true,   // Online filing available — guided workflow
  i539:  true,   // Online filing available — guided workflow
  i129f: false,  // ❌ Mail only — NOT listed on uscis.gov/file-online
  i90:   true,   // Online filing available — guided workflow
  i751:  true,   // PDF upload available
  i864:  false,  // ❌ Mail only — NOT listed on uscis.gov/file-online as standalone
  i129:  true,   // Online filing available — guided + PDF upload
  i140:  true,   // PDF upload available (standalone only)
  i693:  false,  // ❌ Mail only — doctor form, mailed with I-485
  i912:  true,   // PDF upload available
  i601:  false,  // ❌ Mail only — NOT listed on uscis.gov/file-online
  i601a: true,   // Online filing available — guided workflow
  i360:  false,  // ❌ Mail only
  i918:  false,  // ❌ Mail only
  n600:  true,   // Online filing available — guided workflow
  n565:  true,   // Online filing available — guided workflow
  ar11:  true,   // Online filing available — guided workflow
  i907:  true,   // Online filing available
  i829:  false,  // ❌ Mail only
  i290b: false,  // ❌ Mail only
  i730:  false,  // ❌ Mail only
  i914:  false,  // ❌ Mail only
  n336:  true,   // Online filing available — guided workflow
  i212:  false,  // ❌ Mail only
  i134:  false,  // ❌ Mail only
  i824:  false,  // ❌ Mail only
};

/**
 * Direct online filing links — where the customer can file directly on USCIS.
 * Based on https://www.uscis.gov/file-online/forms-available-to-file-online
 * Updated March 28, 2026.
 */
const USCIS_FILE_ONLINE_URLS: Record<string, string> = {
  i821:  "https://my.uscis.gov/file-a-form",   // I-821 guided workflow
  daca:  "https://my.uscis.gov/file-a-form",   // I-821D guided workflow
  i765:  "https://my.uscis.gov/file-a-form",   // I-765 guided + PDF upload
  i130:  "https://my.uscis.gov/file-a-form",   // I-130 guided + PDF upload
  n400:  "https://my.uscis.gov/file-a-form",   // N-400 guided + PDF upload
  i131:  "https://my.uscis.gov/file-a-form",   // I-131 guided + PDF upload
  i589:  "https://my.uscis.gov/file-a-form",   // I-589 guided workflow
  i539:  "https://my.uscis.gov/file-a-form",   // I-539 guided workflow
  i90:   "https://my.uscis.gov/file-a-form",   // I-90 guided workflow
  i751:  "https://my.uscis.gov/file-a-form",   // I-751 PDF upload
  i129:  "https://my.uscis.gov/file-a-form",   // I-129 guided + PDF upload
  i140:  "https://my.uscis.gov/file-a-form",   // I-140 PDF upload
  i912:  "https://my.uscis.gov/file-a-form",   // I-912 PDF upload
  i601a: "https://my.uscis.gov/file-a-form",   // I-601A guided workflow
  n600:  "https://my.uscis.gov/file-a-form",   // N-600 guided workflow
  n565:  "https://my.uscis.gov/file-a-form",   // N-565 guided workflow
  ar11:  "https://my.uscis.gov/file-a-form",   // AR-11 guided workflow
  i907:  "https://my.uscis.gov/file-a-form",   // I-907 guided workflow
  n336:  "https://my.uscis.gov/file-a-form",   // N-336 guided workflow
};

/**
 * Filing method: "guided" = online guided workflow, "pdf_upload" = upload completed PDF,
 * "both" = either option, "mail_only" = no online filing available.
 */
/**
 * Filing method per USCIS.gov/file-online (verified March 28, 2026):
 * "guided"    = online guided workflow on my.uscis.gov
 * "pdf_upload" = upload completed PDF on my.uscis.gov
 * "both"      = guided workflow + PDF upload both available
 * "mail_only" = no online filing — physical mail required
 */
const USCIS_FILING_METHOD: Record<string, "guided" | "pdf_upload" | "both" | "mail_only"> = {
  i821:  "guided",      // I-821: guided workflow
  daca:  "guided",      // I-821D: guided workflow
  i765:  "both",        // I-765: guided + PDF upload
  i130:  "both",        // I-130: guided + PDF upload
  n400:  "both",        // N-400: guided + PDF upload
  i485:  "mail_only",   // I-485: ❌ not on file-online page
  i131:  "both",        // I-131: guided + PDF upload
  i589:  "guided",      // I-589: guided workflow
  i539:  "guided",      // I-539: guided workflow
  i129f: "mail_only",   // I-129F: ❌ not on file-online page
  i90:   "guided",      // I-90: guided workflow
  i751:  "pdf_upload",  // I-751: PDF upload only
  i864:  "mail_only",   // I-864: ❌ not on file-online page as standalone
  i129:  "both",        // I-129: guided + PDF upload
  i140:  "pdf_upload",  // I-140: PDF upload (standalone only)
  i693:  "mail_only",   // I-693: ❌ doctor form, mailed with I-485
  i912:  "pdf_upload",  // I-912: PDF upload
  i601:  "mail_only",   // I-601: ❌ not on file-online page
  i601a: "guided",      // I-601A: guided workflow
  i360:  "mail_only",   // I-360: ❌ mail only
  i918:  "mail_only",   // I-918: ❌ mail only
  n600:  "guided",      // N-600: guided workflow
  n565:  "guided",      // N-565: guided workflow
  ar11:  "guided",      // AR-11: guided workflow
  i907:  "guided",      // I-907: guided workflow
  i829:  "mail_only",   // I-829: ❌ mail only
  i290b: "mail_only",   // I-290B: ❌ mail only
  i730:  "mail_only",   // I-730: ❌ mail only
  i914:  "mail_only",   // I-914: ❌ mail only
  n336:  "guided",      // N-336: guided workflow
  i212:  "mail_only",   // I-212: ❌ mail only
  i134:  "mail_only",   // I-134: ❌ mail only
  i824:  "mail_only",   // I-824: ❌ mail only
};

/* USCIS info page URLs — always points to the official form page */
const USCIS_INFO_URLS: Record<string, string> = {
  i821:  "https://www.uscis.gov/i-821",
  daca:  "https://www.uscis.gov/i-821d",
  i765:  "https://www.uscis.gov/i-765",
  i130:  "https://www.uscis.gov/i-130",
  n400:  "https://www.uscis.gov/n-400",
  i485:  "https://www.uscis.gov/i-485",
  i131:  "https://www.uscis.gov/i-131",
  i589:  "https://www.uscis.gov/i-589",
  i539:  "https://www.uscis.gov/i-539",
  i129f: "https://www.uscis.gov/i-129f",
  i90:   "https://www.uscis.gov/i-90",
  i751:  "https://www.uscis.gov/i-751",
  i864:  "https://www.uscis.gov/i-864",
  i129:  "https://www.uscis.gov/i-129",
  i140:  "https://www.uscis.gov/i-140",
  i693:  "https://www.uscis.gov/i-693",
  i912:  "https://www.uscis.gov/i-912",
  i601:  "https://www.uscis.gov/i-601",
  i601a: "https://www.uscis.gov/i-601a",
  i360:  "https://www.uscis.gov/i-360",
  i918:  "https://www.uscis.gov/i-918",
  n600:  "https://www.uscis.gov/n-600",
  n565:  "https://www.uscis.gov/n-565",
  ar11:  "https://www.uscis.gov/ar-11",
  i907:  "https://www.uscis.gov/i-907",
  i829:  "https://www.uscis.gov/i-829",
  i290b: "https://www.uscis.gov/i-290b",
  i730:  "https://www.uscis.gov/i-730",
  i914:  "https://www.uscis.gov/i-914",
  n336:  "https://www.uscis.gov/n-336",
  i212:  "https://www.uscis.gov/i-212",
  i134:  "https://www.uscis.gov/i-134",
  i824:  "https://www.uscis.gov/i-824",
};

/* Cache: in-memory store so we don't re-fetch every render */
let cachedFees: Record<string, number> | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour cache

/**
 * Get the latest USCIS fee for a form (paper/mail fee).
 * Tries Supabase first, then falls back to hardcoded values.
 */
export function getUscisFee(formId: string): number {
  if (cachedFees && cachedFees[formId] !== undefined) {
    return cachedFees[formId];
  }
  return FALLBACK_FEES[formId] ?? 0;
}

/**
 * Get the online filing fee for a form (lower for online-eligible forms).
 */
export function getUscisOnlineFee(formId: string): number {
  return ONLINE_FEES[formId] ?? FALLBACK_FEES[formId] ?? 0;
}

/**
 * Get the USCIS payment URL for a specific form
 */
export function getUscisPayUrl(formId: string): string {
  return USCIS_URLS[formId] || "https://www.uscis.gov";
}

/**
 * Fetch latest fees from Supabase (or API endpoint).
 * Call this on app startup or periodically.
 */
export async function syncUscisFees(): Promise<Record<string, number>> {
  // Return cache if fresh
  if (cachedFees && Date.now() - lastFetchTime < CACHE_TTL) {
    return cachedFees;
  }

  try {
    if (!supabase) throw new Error("No Supabase connection");

    const { data, error } = await (supabase as any)
      .from('uscis_fees')
      .select('form_id, fee, updated_at')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      const fees: Record<string, number> = {};
      for (const row of data) {
        fees[row.form_id] = row.fee;
      }
      cachedFees = { ...FALLBACK_FEES, ...fees };
      lastFetchTime = Date.now();
      console.log("[USCIS Fee Sync] Updated from database:", Object.keys(fees).length, "forms");
      return cachedFees;
    }
  } catch (err) {
    console.warn("[USCIS Fee Sync] Could not fetch from database, using fallback fees:", err);
  }

  // Fall back to hardcoded
  cachedFees = { ...FALLBACK_FEES };
  lastFetchTime = Date.now();
  return cachedFees;
}

/**
 * Admin function: Update a USCIS fee in the database.
 * This would be called from an admin panel or cloud function
 * that monitors USCIS fee changes.
 */
export async function updateUscisFee(formId: string, newFee: number): Promise<boolean> {
  try {
    if (!supabase) throw new Error("No Supabase connection");

    const { error } = await (supabase as any)
      .from('uscis_fees')
      .upsert({
        form_id: formId,
        fee: newFee,
        pay_url: USCIS_URLS[formId] || "https://www.uscis.gov",
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;

    // Invalidate cache
    cachedFees = null;
    lastFetchTime = 0;
    console.log(`[USCIS Fee Sync] Updated ${formId} to $${newFee}`);
    return true;
  } catch (err) {
    console.error("[USCIS Fee Sync] Failed to update fee:", err);
    return false;
  }
}

export { FALLBACK_FEES, ONLINE_FEES, USCIS_URLS, USCIS_ONLINE, USCIS_INFO_URLS, USCIS_FILE_ONLINE_URLS, USCIS_FILING_METHOD };
