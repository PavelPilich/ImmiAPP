# ImmiGuide Project Rules

## MANDATORY: Multi-Language Support (20 Languages)

**Every single text change must be translated into ALL 20 supported languages.**

This app supports: en, uk, pl, es, ru, fr, pt, ht, ar, so, ne, my, ro, bg, tr, it, de, fa, he, zh

### Rules:
1. **NEVER hardcode English strings** in any page or component. Every user-facing string MUST use `t(lang, "key")` or `bt(lang, "key")` from `src/data/translations.ts`.
2. **Every new translation key** added to `src/data/translations.ts` MUST include translations for ALL 20 languages — no exceptions.
3. **Every UI change** (new button, label, error message, placeholder, tooltip, heading, etc.) MUST have a corresponding translation key with all 20 languages.
4. **RTL languages** (ar, fa, he) must be tested — ensure `dir="rtl"` is applied and layout works correctly.
5. **Bilingual labels**: For non-English languages, field labels use `bt()` which shows "Translated (English)" format.
6. **After every code edit**, verify the change works in at least English + one non-English language.

### Translation file: `src/data/translations.ts`
- All keys live in the `T` object
- `t(lang, key)` = plain translation
- `bt(lang, key)` = bilingual label (adds English in parentheses for non-en)
- Format: `keyName: { en:"...", es:"...", ru:"...", fr:"...", pt:"...", ht:"...", ar:"...", so:"...", ne:"...", my:"...", uk:"...", pl:"...", ro:"...", bg:"...", tr:"...", it:"...", de:"...", fa:"...", he:"...", zh:"..." }`

## Design Rules
- Do NOT change existing colors or design system — use styles from `src/data/styles.ts` (`S` object)
- Dark theme with blue gradients — maintain existing look and feel
- Mobile-first UI (390px width iPhone mockup)
