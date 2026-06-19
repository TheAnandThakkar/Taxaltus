# Taxaltus — Website Audit & Improvement Report

Prepared June 2026. Covers architecture, formula accuracy, assessment-year coverage (AY 2025‑26, AY 2026‑27, AY 2027‑28), educational features, and UI/UX. Tax law verified against current public sources (links at the end).

---

## 1. How the website is built

Taxaltus is a **Next.js 15.1 / React 19** app using the App Router and TypeScript, styled with Tailwind. It is a Progressive Web App (`PWARegister`, manifest, offline-friendly) with proper SEO scaffolding (`sitemap.ts`, `robots.ts`, `StructuredData.tsx`). A Postgres database via Drizzle ORM backs two API routes only — `/api/leads` and `/api/feedback` — so the tax content itself is fully static/client-side and fast.

The single most important design decision is good: **all tax rules live in one file, `src/lib/taxYears.ts`**. Slabs, rebate, standard deduction, cess, age-group variants and the core `calculateIncomeTax()` / `calculateSlabTax()` functions are defined once and imported by every calculator. This means a rule change happens in one place and propagates everywhere — exactly the right architecture for a tax tool.

The app has roughly 30 pages, grouped as:

- **Calculators** — Estimator (old vs new), Regime comparison, Section 87A checker, Capital Gains, CTC → take-home, HRA, Advance Tax, Form 16 (guided).
- **Reference/education** — Glossary (with detail pages), Heads of Income, Deductions (with detail pages), Form 16 Explorer + specimen, AIS/26AS explainer, Salary Slip guide, First-Time Filer, ITR Mistakes, ITR Selector, Tax Notice Decoder, Budget Impact, Budget Changes, Investment Deadlines, Form 12BB, Prep Checklist.
- **Engagement** — Quiz, FAQ, Tax Questions search, Tax Examples (public test cases), Bookmarks.

Content data is centralised in `src/data/content.ts` (glossary, sections, heads, Form 16 fields, quizzes) and `src/data/jargon.ts`. This is clean and maintainable.

**Overall: the codebase is well-structured, consistent, and built on a sound single-source-of-truth tax engine.**

---

## 2. Formula accuracy — verification results

I verified every calculator's math against current Income-tax law. **The core engine is accurate.** Specifically confirmed correct:

| Item | In code | Correct? |
|---|---|---|
| New-regime slabs AY 2026‑27 & 2027‑28 (0‑4L nil, 4‑8 @5%, 8‑12 @10%, 12‑16 @15%, 16‑20 @20%, 20‑24 @25%, >24 @30%) | ✓ | **Correct** (Finance Act 2025) |
| Section 87A — new regime ≤ ₹12L → ₹60,000 | ✓ | **Correct** |
| Section 87A — old regime ≤ ₹5L → ₹12,500 | ✓ | **Correct** |
| Standard deduction — new ₹75,000 / old ₹50,000 | ✓ | **Correct** |
| Health & Education cess 4% | ✓ | **Correct** |
| New-regime marginal relief above ₹12L | ✓ | **Correct** — tax is capped to income above ₹12L, which is the right marginal-relief treatment |
| Slab tax accumulation (`calculateSlabTax`) | ✓ | **Correct** — proper marginal computation per band |
| HRA exemption = least of (actual HRA, 50%/40% of basic+DA, rent − 10% salary) | ✓ | **Correct** (Sec 10(13A)) |
| Capital gains — equity LTCG 12.5%, ₹1.25L exempt; STCG 20%; debt/property/gold at slab | ✓ | **Correct** (post‑23 Jul 2024 rules) |
| Advance-tax installments (15/45/75/100% by 15 Jun/Sep/Dec/Mar) | ✓ | **Correct** |
| CTC — employer PF 12% capped ₹1,800, gratuity 4.81% of basic | ✓ | **Correct** as an estimate |

**Bottom line: no incorrect formulas were found in the supported years.** The values represent true and accurate figures for the new regime under the Finance Act 2025 and the Income‑tax Act, 2025.

### Accuracy limitations worth disclosing (already partly noted in-app)
These are simplifications, not errors, but they matter for some users:

1. **No surcharge.** Incomes above ₹50L attract surcharge (10/15/25%, with the 25% cap in the new regime). High earners will see understated totals. The estimator's note discloses this, but a high earner gets a wrong final number.
2. **80D capped at a flat ₹1,00,000.** The real limit depends on age (₹25k self + ₹25k/₹50k parents). Minor.
3. **Estimator old-regime "Other Deductions"** lumps HRA + 80C + 80D + other into one field with the user typing their own HRA exemption — there's no guard linking it to the HRA calculator, so an over-stated HRA flows straight through.
4. **Capital gains does not vary by assessment year** (the AY selector is cosmetic there) and doesn't model the 23 Jul 2024 split that existed within FY 2024‑25, surcharge on gains, or loss set-off.

---

## 3. Assessment-year coverage — the main gap

**You asked specifically that AY 2025‑26, AY 2026‑27 and AY 2027‑28 all be included. Right now only AY 2026‑27 and AY 2027‑28 exist.** `src/lib/taxYears.ts` defines exactly two years; `AssessmentYear` is typed as `"AY_2026_27" | "AY_2027_28"`. **AY 2025‑26 (FY 2024‑25) is entirely missing.**

### Correct rules to add for AY 2025‑26 (FY 2024‑25), verified
New regime (post‑July 2024 Budget):

| Income band | Rate |
|---|---|
| Up to ₹3,00,000 | Nil |
| ₹3,00,001 – ₹7,00,000 | 5% |
| ₹7,00,001 – ₹10,00,000 | 10% |
| ₹10,00,001 – ₹12,00,000 | 15% |
| ₹12,00,001 – ₹15,00,000 | 20% |
| Above ₹15,00,000 | 30% |

- **Standard deduction:** new ₹75,000, old ₹50,000.
- **Section 87A:** new regime taxable income ≤ ₹7,00,000 → rebate up to ₹25,000; old regime ≤ ₹5,00,000 → ₹12,500.
- **Marginal relief** in the new regime applied just above ₹7,00,000 (not ₹12,00,000 — that ₹12L threshold is a FY 2025‑26 onward feature).
- Old-regime slabs unchanged (same as currently coded).
- Cess 4%.

Adding this is a contained change: one new object in `ASSESSMENT_YEARS`, extend the `AssessmentYear` union, and make the marginal-relief block read the rebate income-limit from the year's rules (it already does via `rules.rebate87A.new.incomeLimit`, so it will adapt automatically).

### Year-tagging issues found (45 hardcoded references)
Many pages hardcode the year range in prose rather than reading it from the engine, so adding AY 2025‑26 will leave stale or contradictory text:

- **`/regime`** — heading literally says *"Tax Slab Comparison – AY 2026‑27 and AY 2027‑28"*, the closing note repeats it, and **the slab tables are hardcoded static arrays, not engine-driven**. This page has **no assessment-year selector at all**, so it cannot show AY 2025‑26's different new-regime slabs. This is the highest-priority page to refactor.
- **`/tax-examples`** — hardwired to `AY_2027_28` only; the "public test cases" don't let a user pick a year.
- **`/form16-guided`** — new regime only, single year, no AY or regime selector.
- **`/capital-gains`** — has an AY selector but the rates don't change with it.
- Static strings in `budget-impact`, `budget-changes`, `faq`, `tax-questions`, `first-time-filer`, `tax-examples`, `itr-mistakes`, `about`, several `layout.tsx` SEO files, `TrustBar`, `PageHeader`, `StructuredData`, and `jargon.ts` all bake in specific years.

**Every answer/figure that is year-sensitive should be tagged with the assessment year and, ideally, driven by `taxYears.ts` rather than hardcoded.** The calculators that use the engine (Estimator, 87A, Advance Tax, HRA, CTC) already display the year correctly — the fix is to bring `/regime`, `/tax-examples`, `/form16-guided` and the static prose in line.

---

## 4. A practical default-year issue

`DEFAULT_ASSESSMENT_YEAR` is set to **AY 2027‑28**. As of June 2026, the return people are actually filing is **AY 2026‑27 (FY 2025‑26), due 31 July 2026**. Defaulting every calculator to AY 2027‑28 (a year whose return isn't due until July 2027) is likely to confuse users who came to compute *this year's* tax. Recommend defaulting to **AY 2026‑27** (the live filing year) and letting users switch forward/back.

---

## 5. Educational improvements (make concepts easier to learn)

The educational foundation is strong — glossary, heads of income, quizzes, Form 16 field-by-field explainers, the 87A "cliff effect" explanation, and plain-English guides are genuinely good. Highest-value additions:

1. **Multi-year comparison.** Once AY 2025‑26 is in, add a "How did the Budget change *my* tax?" view that runs the same income through all three years side by side. This turns an abstract law change into a personal number — the most powerful teaching device you have, and it directly uses the data you're adding anyway.
2. **Interactive slab visualizer.** Replace/augment the static `tax-examples` table with a live bar that fills slab-by-slab as the user types income, showing exactly how much tax each band contributes and where the 87A rebate wipes it out. Makes "marginal vs effective rate" click instantly.
3. **87A cliff visual.** The 87A page explains the ₹12,00,001 cliff well in text; a small chart showing the ₹60,000 jump at ₹1 over the limit would make it unforgettable.
4. **Surcharge explainer for high earners.** Add surcharge to the engine (and a short explainer) so the tool is correct above ₹50L and teaches a concept most salaried users have never seen.
5. **Guided "Which regime / which ITR" wizard** that chains the existing logic into a few yes/no questions and ends on a recommendation with the reasoning shown.
6. **Consistent "where you'll see this on Form 16/AIS" callouts** — you already do this in the glossary; extending it into the calculators ties learning to the real documents.

---

## 6. UI/UX improvements

The UI is clean, responsive (mobile grids collapse correctly), and consistent. Targeted upgrades:

1. **Make the assessment-year selector universal and year-aware.** Put `AssessmentYearSelect` on `/regime`, `/tax-examples`, and `/form16-guided`, and drive their content from `taxYears.ts`. Consider a segmented control (AY 2025‑26 | 2026‑27 | 2027‑28) showing both FY and AY, rather than a dropdown — it surfaces the multi-year support instead of hiding it.
2. **Indian-format number inputs.** Inputs are raw `type="number"`; values only get the `₹12,00,000` grouping on output. Live grouping (or a ₹ prefix and grouping-on-blur) reduces entry errors on large salaries.
3. **Cross-link calculators.** From the estimator's HRA field, link to the HRA calculator; from CTC's TDS estimate, link to the estimator. The pieces exist but don't refer users to each other.
4. **Regime page redesign** — it's the worst offender for stale, hardcoded content and is a prime landing page. Rebuild it engine-driven with a year toggle so the slab tables are always correct.
5. **Add a small "rules as of" badge** (assessment year + law reference, both already in `taxYears.ts`) to each calculator result, so every figure visibly carries its year and legal basis.

---

## 7. Recommended implementation order

1. **Add AY 2025‑26 to `taxYears.ts`** (rules above) and extend the `AssessmentYear` type. *(Safe, self-contained; verify the marginal-relief block reads the year's rebate limit — it does.)*
2. **Refactor `/regime`** to be engine-driven with a year selector. *(Removes the biggest source of stale/incorrect content.)*
3. **Add year + regime selectors to `/tax-examples` and `/form16-guided`.**
4. **Change `DEFAULT_ASSESSMENT_YEAR` to AY 2026‑27.**
5. **Sweep the 45 hardcoded year strings** so prose matches the supported set.
6. **Add surcharge to the engine** (correctness for >₹50L) and the multi-year comparison + slab visualizer (education).

Items 1–5 are low-risk and high-value. Item 6 is the larger build.

---

## 8. Sources (tax law verification)

- [ClearTax — Income Tax Slabs FY 2025‑26 (AY 2026‑27)](https://cleartax.in/s/income-tax-slabs)
- [Tax2win — Section 87A Rebate](https://tax2win.in/guide/section-87a)
- [Tax2win — Income Tax Slabs FY 2024‑25 & FY 2025‑26](https://tax2win.in/guide/income-tax-slabs)
- [HDFC Bank — Budget 2026‑27: Income Tax Act 2026, tax slabs](https://www.hdfc.bank.in/blogs/union-budget/budget-2026-27-income-tax-act-2026-tax-slabs-stt)
- [Income Tax Department — Objective and scope of the New Act (Income‑tax Act, 2025)](https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/objective-and-scope-new-act)
- [NewsOnAir — Income‑tax Act 2025 effective 1 April 2026](https://www.newsonair.gov.in/income-tax-act-2025-gets-presidents-assent-will-be-effective-from-1st-april-2026)
- [NewsOnAir — Budget 2024‑25 standard deduction ₹50k → ₹75k](https://www.newsonair.gov.in/union-budget-2024-25-relief-to-taxpayers-standard-deduction-for-salaried-employees-increased-from-50-thousand-rupees-to-75-rupees)

*Educational tool disclaimer applies: figures are estimates for learning, not a substitute for a qualified CA or the official Income Tax portal.*
