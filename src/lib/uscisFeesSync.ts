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
 */

import { supabase } from './supabase';

export interface UscisFormFee {
  formId: string;
  formName: string;
  fee: number;
  payUrl: string;
  lastUpdated: string;
}

/* Hardcoded fallback fees — 2026 USCIS Fee Schedule */
const FALLBACK_FEES: Record<string, number> = {
  i821:  510,
  daca:  85,
  i765:  560,
  i130:  625,
  n400:  760,
  i485:  1440,
  i131:  575,
  i589:  100,
  i539:  470,
  i129f: 675,
  i90:   465,
  i751:  750,
  i864:  120,
  i129:  780,
  i140:  715,
  i693:  0,   // Doctor fee, not USCIS
  i912:  0,   // Fee waiver — no charge
  i601:  1050,
};

/* USCIS direct filing/payment URLs per form */
const USCIS_URLS: Record<string, string> = {
  i821:  "https://my.uscis.gov",                      // Online filing available
  daca:  "https://myaccount.uscis.gov",                // Online filing available
  i765:  "https://myaccount.uscis.gov",                // Online (specific categories)
  i130:  "https://myaccount.uscis.gov",                // Online filing available
  n400:  "https://myaccount.uscis.gov",                // Online filing available
  i485:  "https://www.uscis.gov/i-485",                // Mail only — no online filing
  i131:  "https://myaccount.uscis.gov",                // Online (specific categories)
  i589:  "https://my.uscis.gov/accounts/annual-asylum-fee/start/overview", // Online
  i539:  "https://myaccount.uscis.gov",                // Online filing available
  i129f: "https://www.uscis.gov/i-129f",               // Mail only — no online filing
  i90:   "https://myaccount.uscis.gov",                // Online filing available
  i751:  "https://www.uscis.gov/i-751",                // Mail only — no online filing
  i864:  "https://myaccount.uscis.gov",                // Online (with eligible forms)
  i129:  "https://myaccount.uscis.gov",                // Online (H-1B & eligible)
  i140:  "https://myaccount.uscis.gov",                // Online filing available
  i693:  "https://www.uscis.gov/i-693",                // Doctor form — mail with I-485
  i912:  "https://myaccount.uscis.gov",                // Online (with eligible forms)
  i601:  "https://www.uscis.gov/i-601",                // Mail only — no online filing
};

/* Whether each form supports online filing or mail only */
const USCIS_ONLINE: Record<string, boolean> = {
  i821: true, daca: true, i765: true, i130: true, n400: true,
  i485: false, i131: true, i589: true, i539: true, i129f: false,
  i90: true, i751: false, i864: true, i129: true, i140: true,
  i693: false, i912: true, i601: false,
};

/* USCIS info page URLs (for forms that require mail) */
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
};

/* Cache: in-memory store so we don't re-fetch every render */
let cachedFees: Record<string, number> | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour cache

/**
 * Get the latest USCIS fee for a form.
 * Tries Supabase first, then falls back to hardcoded values.
 */
export function getUscisFee(formId: string): number {
  if (cachedFees && cachedFees[formId] !== undefined) {
    return cachedFees[formId];
  }
  return FALLBACK_FEES[formId] ?? 0;
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

    const { data, error } = await supabase
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

    const { error } = await supabase
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

export { FALLBACK_FEES, USCIS_URLS, USCIS_ONLINE, USCIS_INFO_URLS };
