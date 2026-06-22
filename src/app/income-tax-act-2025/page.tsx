import PageHeader from "@/components/ui/PageHeader";
import OfficialSources from "@/components/ui/OfficialSources";
import JsonLd from "@/components/JsonLd";
import { ArrowLeft, ArrowRight, Calendar, FileText, Scale, CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck, Coins, Briefcase, Wallet } from "lucide-react";
import Link from "next/link";

// Visible FAQ — also emitted as FAQPage JSON-LD for rich results. Questions are
// phrased to match how people search for the new Income-tax Act, 2025.
const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the new Income-tax Act, 2025?",
    a: "The Income-tax Act, 2025 [30 of 2025] is India's new income tax law. It received Presidential assent on 21 August 2025 and comes into force on 1 April 2026, replacing the 63-year-old Income-tax Act, 1961. It applies from FY 2026-27 (Tax Year 2026-27) onward.",
  },
  {
    q: "When does the new Income-tax Act 2025 come into effect?",
    a: "It is in force from 1 April 2026 and governs income earned in FY 2026-27 (Tax Year 2026-27) and later years. Income up to FY 2025-26 continues under the Income-tax Act, 1961.",
  },
  {
    q: "What are the new income tax slabs under the Income-tax Act 2025?",
    a: "Under the new regime (Section 202): up to ₹4 lakh Nil, ₹4–8 lakh 5%, ₹8–12 lakh 10%, ₹12–16 lakh 15%, ₹16–20 lakh 20%, ₹20–24 lakh 25%, and above ₹24 lakh 30%. With the ₹75,000 standard deduction and the Section 156 (old 87A) rebate, a salaried person can pay zero tax up to about ₹12.75 lakh.",
  },
  {
    q: "What is the difference between the old and new income tax act?",
    a: "The 1961 Act used a 'Previous Year' and 'Assessment Year' pair; the 2025 Act uses a single 'Tax Year' (the year income is earned). Every section is renumbered — for example 80C becomes 123, 87A becomes 156 and 115BAC becomes 202 — and the law is shorter and table-driven. The slab rates, rebate, standard deduction, surcharge and cess are unchanged; only the structure and section numbers differ.",
  },
  {
    q: "Does the new Income-tax Act 2025 change how much tax I pay?",
    a: "No. The slab rates, the ₹12 lakh rebate, the ₹75,000 standard deduction, surcharge and 4% health & education cess all carry over unchanged from the Finance Act 2025. Your tax liability stays the same — only the section numbers you cite change.",
  },
  {
    q: "What is Section 80C called under the new Income-tax Act 2025?",
    a: "Section 80C is now Section 123. Other common changes: 80D→126, 80CCD→124, 80D health insurance→126, 87A rebate→156, the new regime 115BAC→202, and Chapter VI-A deductions move to Chapter VIII.",
  },
  {
    q: "What is a 'Tax Year' under the Income-tax Act 2025?",
    a: "A 'Tax Year' is the single financial year in which income is earned, replacing the old Previous Year + Assessment Year system. So FY 2026-27 is simply 'Tax Year 2026-27' — there is no separate assessment year.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const ARTICLE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Income-tax Act, 2025 — What's New, Slabs and Old vs New",
  description:
    "A guide to India's new Income-tax Act, 2025: the Tax Year concept, new tax slabs, the section renumbering map and how it differs from the Income-tax Act, 1961.",
  about: ["Income-tax Act 2025", "New income tax slabs", "Tax Year", "Old vs new income tax act"],
  datePublished: "2025-08-21",
  dateModified: "2026-06-22",
  author: { "@type": "Organization", name: "Taxaltus", url: "https://taxaltus.com" },
  publisher: {
    "@type": "Organization",
    name: "Taxaltus",
    logo: { "@type": "ImageObject", url: "https://taxaltus.com/logo.png" },
  },
  mainEntityOfPage: "https://taxaltus.com/income-tax-act-2025",
  image: "https://taxaltus.com/og-taxaltus.png",
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://taxaltus.com" },
    { "@type": "ListItem", position: 2, name: "Income-tax Act 2025", item: "https://taxaltus.com/income-tax-act-2025" },
  ],
};

// Verified against the Income-tax Act, 2025 [30 of 2025]. The familiar 1961
// number is kept alongside the new section so readers can map their old
// knowledge across. Tax amounts are unchanged — only the citations move.
const SECTION_MAP: { area: string; old: string; neu: string }[] = [
  { area: "New tax regime & slab rates", old: "115BAC", neu: "202" },
  { area: "Rebate (zero-tax up to ₹12 lakh)", old: "87A", neu: "156" },
  { area: "Salary standard deduction (₹75,000)", old: "16(ia)", neu: "19 (Schedule)" },
  { area: "House property — 30% & loan interest", old: "24(a) / 24(b)", neu: "22(1)(a) / 22(1)(b)" },
  { area: "STCG on equity @ 20%", old: "111A", neu: "196" },
  { area: "LTCG on equity @ 12.5% (₹1.25L exempt)", old: "112A", neu: "198" },
  { area: "Life insurance, PF, ELSS, etc. (₹1.5L)", old: "80C", neu: "123" },
  { area: "NPS — self & employer contribution", old: "80CCD", neu: "124" },
  { area: "Agnipath / Agniveer Corpus Fund", old: "80CCH", neu: "125" },
  { area: "Health insurance premium", old: "80D", neu: "126" },
  { area: "Disabled-dependant maintenance", old: "80DD", neu: "127" },
  { area: "Medical treatment of specified illness", old: "80DDB", neu: "128" },
  { area: "Interest on education loan", old: "80E", neu: "129" },
  { area: "Donations to funds & institutions", old: "80G", neu: "133" },
  { area: "Interest on savings / FD (seniors)", old: "80TTA / 80TTB", neu: "153" },
  { area: "Person with disability (self)", old: "80U", neu: "154" },
  { area: "Chapter for Chapter VI-A deductions", old: "Chapter VI-A", neu: "Chapter VIII" },
];

const KEY_CHANGES = [
  {
    icon: Calendar,
    title: "One 'Tax Year' replaces PY + AY",
    body: "The Act drops the confusing 'Previous Year' and 'Assessment Year' pair. There is now a single Tax Year — the financial year in which you earn the income. FY 2026-27 is simply 'Tax Year 2026-27'.",
  },
  {
    icon: FileText,
    title: "Every section renumbered",
    body: "The familiar numbers are gone: 80C is now Section 123, 80D is 126, 87A is 156, and the new regime moves from 115BAC to 202. Deductions move from Chapter VI-A to Chapter VIII.",
  },
  {
    icon: Scale,
    title: "Simpler, table-driven drafting",
    body: "The law is reorganised into 23 chapters and 16 schedules. Long provisos become tables and schedules, with plainer language and far fewer cross-references.",
  },
];

// Substantive points beyond renumbering — each verified against the Act PDF.
const MORE_CHANGES: { icon: typeof Calendar; title: string; body: string }[] = [
  {
    icon: Calendar,
    title: "'Tax Year' is now defined in law",
    body: "Section 3 defines the Tax Year as the twelve-month financial year starting 1 April (with a shorter first year for a newly set-up business). The Previous Year / Assessment Year pair is gone.",
  },
  {
    icon: ShieldCheck,
    title: "Taxpayer's Charter in the Act",
    body: "Section 240 requires the CBDT to adopt and declare a Taxpayer's Charter — taxpayer rights and service standards are written into the statute itself.",
  },
  {
    icon: FileText,
    title: "Deductions moved into Schedules",
    body: "The list of eligible 80C investments (LIC, PF, ELSS, PPF, etc.) now lives in Schedule XV, read with Section 123 — making the deduction easier to follow.",
  },
  {
    icon: Coins,
    title: "Virtual digital assets defined",
    body: "Section 2(111) defines virtual digital assets — crypto, NFTs and similar tokens — which remain taxable. The definition is broad and can be extended by notification.",
  },
  {
    icon: Briefcase,
    title: "Presumptive schemes retained",
    body: "Presumptive taxation for small businesses and professionals (old 44AD / 44ADA) continues under Section 58, so eligible taxpayers can still declare income at a fixed rate.",
  },
  {
    icon: Wallet,
    title: "Family pension deduction",
    body: "Section 93 allows a one-third deduction on family pension, capped at ₹25,000 under the new regime (Section 202) versus ₹15,000 otherwise — a small relief for pensioners.",
  },
];

const UNCHANGED = [
  "Slab rates — both old and new regime are exactly the same.",
  "The ₹12 lakh / ₹60,000 new-regime rebate and ₹75,000 standard deduction.",
  "Surcharge (10/15/25%, new-regime cap 25%) and 4% health & education cess.",
  "Your choice between the old and new regime.",
  "The ₹1.25 lakh LTCG exemption and 20% / 12.5% equity capital-gains rates.",
];

const WATCH_OUT = [
  "Quote the new section on declarations and proofs — e.g. write 'Section 123' (or '123/80C') instead of '80C' on Form 12BB and investment statements.",
  "Read 'Tax Year' on forms as the financial year of earning — not the old assessment year.",
  "Deductions now live in Chapter VIII; TDS/TCS and assessment chapters are renumbered too.",
  "The new Act governs FY 2026-27 onward. For FY 2025-26 and earlier, the 1961 Act and its old section numbers still apply.",
  "Rates still come from the annual Finance Act — always confirm figures against the latest official notification before filing.",
];

export default function IncomeTaxAct2025Page() {
  return (
    <div>
      <JsonLd data={[ARTICLE_JSONLD, FAQ_JSONLD, BREADCRUMB_JSONLD]} />
      <PageHeader
        title="The Income-tax Act, 2025"
        subtitle="A new income-tax law replaces the 1961 Act from FY 2026-27. Here's what actually changes for you — and what doesn't."
        breadcrumbs={[{ label: "Income-tax Act 2025" }]}
      />

      <div className="container-main py-8 sm:py-12">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />Back to Home
          </Link>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 sm:p-8 mb-8">
          <p className="text-gray-700 leading-relaxed">
            The <strong className="text-navy">Income-tax Act, 2025 [30 of 2025]</strong> received Presidential
            assent on <strong>21 August 2025</strong> and comes into force on <strong>1 April 2026</strong>. It
            replaces the 63-year-old Income-tax Act, 1961 and applies from{" "}
            <strong className="text-navy">FY 2026-27 (Tax Year 2026-27)</strong> onward.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            The good news for taxpayers: this is mostly a <strong>rewrite for clarity, not a change to how much
            tax you pay</strong>. The slabs, rebate, standard deduction, surcharge and cess all carry over
            unchanged from the Finance Act 2025. What changes is the <strong>language</strong> (a single
            &ldquo;Tax Year&rdquo;) and the <strong>section numbers</strong> you cite.
          </p>
        </div>

        {/* Key changes */}
        <h2 className="text-2xl font-bold text-navy mb-4">What&rsquo;s new at a glance</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {KEY_CHANGES.map((c) => (
            <div key={c.title} className="bg-white rounded-xl border shadow-sm p-5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                <c.icon className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="font-bold text-navy mb-1.5">{c.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Section map */}
        <h2 className="text-2xl font-bold text-navy mb-2">Section renumbering map</h2>
        <p className="text-gray-600 mb-4 max-w-3xl">
          The provisions people use most, mapped from the old 1961 section to the new 2025 section. The new Act
          applies from FY 2026-27; the old numbers remain valid for FY 2025-26 and earlier.
        </p>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white text-left">
                  <th className="px-4 py-3 font-semibold">What it covers</th>
                  <th className="px-4 py-3 font-semibold">Old (1961 Act)</th>
                  <th className="px-4 py-3 font-semibold">New (2025 Act)</th>
                </tr>
              </thead>
              <tbody>
                {SECTION_MAP.map((row, i) => (
                  <tr key={row.area} className={i % 2 ? "bg-gray-50/60" : ""}>
                    <td className="px-4 py-3 text-gray-700">{row.area}</td>
                    <td className="px-4 py-3 text-gray-500 tabular-nums">{row.old}</td>
                    <td className="px-4 py-3 font-semibold text-teal-700 tabular-nums">{row.neu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Beyond renumbering — substantive points */}
        <h2 className="text-2xl font-bold text-navy mb-2">Beyond renumbering — what else changed</h2>
        <p className="text-gray-600 mb-4 max-w-3xl">
          The 2025 Act is mainly a simplification, but a few things are genuinely worth knowing.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {MORE_CHANGES.map((c) => (
            <div key={c.title} className="bg-white rounded-xl border shadow-sm p-5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                <c.icon className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="font-bold text-navy mb-1.5 text-[15px]">{c.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Unchanged + watch out */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h3 className="flex items-center gap-2 font-bold text-emerald-800 mb-3">
              <CheckCircle2 className="w-5 h-5" />What stays the same
            </h3>
            <ul className="space-y-2">
              {UNCHANGED.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-emerald-900">
                  <span className="text-emerald-500 mt-0.5">•</span><span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-800 mb-3">
              <AlertTriangle className="w-5 h-5" />What to take care of
            </h3>
            <ul className="space-y-2">
              {WATCH_OUT.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-amber-900">
                  <span className="text-amber-500 mt-0.5">•</span><span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-navy text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold">See it applied to your numbers</h3>
            <p className="text-white/70 mt-1 text-sm">
              The Full Income Tax Calculator now cites the 2025-Act sections for Tax Year 2026-27 and prints a
              branded computation with the new references.
            </p>
          </div>
          <Link href="/income-tax-calculator" className="shrink-0 inline-flex items-center gap-2 bg-teal text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal/90 transition">
            Open the calculator<ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* FAQ — visible, and mirrored as FAQPage JSON-LD above for rich results */}
        <h2 className="flex items-center gap-2 text-2xl font-bold text-navy mb-4">
          <HelpCircle className="w-6 h-6 text-teal-700" />Frequently asked questions
        </h2>
        <div className="space-y-3 mb-10">
          {FAQS.map((f) => (
            <details key={f.q} className="group bg-white rounded-xl border shadow-sm p-5 open:shadow-md">
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-navy">
                {f.q}
                <span className="ml-3 text-teal-700 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <OfficialSources note="Section numbers verified against the Income-tax Act, 2025 [30 of 2025], in force 1 April 2026. Rates are governed by the annual Finance Act. This is an educational summary, not tax advice — verify against incometax.gov.in and a qualified professional before filing." />
      </div>
    </div>
  );
}
