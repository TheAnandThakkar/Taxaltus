import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 mt-auto">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <img src="/icon.png" alt="Taxaltus" className="h-8 w-8 rounded-lg" />
              <span className="text-white font-bold text-lg">Taxaltus</span>
            </Link>
            <p className="text-sm leading-relaxed">Your Tax Education Companion for Indian salaried employees.</p>
          </div>

          {/* Explore + Guides stacked */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Explore</h4>
              <div className="space-y-2">
                <Link href="/form16" className="block text-sm hover:text-white transition-colors">Form 16 Explorer</Link>
                <Link href="/deductions" className="block text-sm hover:text-white transition-colors">Deductions</Link>
                <Link href="/glossary" className="block text-sm hover:text-white transition-colors">Glossary</Link>
                <Link href="/learn" className="block text-sm hover:text-white transition-colors">Learn</Link>
                <Link href="/faq" className="block text-sm hover:text-white transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Guides</h4>
              <div className="space-y-2">
                <Link href="/first-time-filer" className="block text-sm hover:text-white transition-colors">First-Time Filer Guide</Link>
                <Link href="/salary-slip" className="block text-sm hover:text-white transition-colors">Salary Slip Explained</Link>
                <Link href="/ais-explainer" className="block text-sm hover:text-white transition-colors">AIS / Form 26AS</Link>
                <Link href="/form12bb" className="block text-sm hover:text-white transition-colors">Form 12BB Guide</Link>
                <Link href="/itr-mistakes" className="block text-sm hover:text-white transition-colors">ITR Mistakes to Avoid</Link>
                <Link href="/tax-notice-decoder" className="block text-sm hover:text-white transition-colors">Tax Notice Decoder</Link>
                <Link href="/budget-changes" className="block text-sm hover:text-white transition-colors">Budget Changes</Link>
              </div>
            </div>
          </div>

          {/* Tools — standalone */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Tools</h4>
            <div className="space-y-2">
              <Link href="/estimator" className="block text-sm hover:text-white transition-colors">Tax Estimator</Link>
              <Link href="/ctc-calculator" className="block text-sm hover:text-white transition-colors">CTC → Take-Home</Link>
              <Link href="/capital-gains" className="block text-sm hover:text-white transition-colors">Capital Gains Calc</Link>
              <Link href="/advance-tax" className="block text-sm hover:text-white transition-colors">Advance Tax Calc</Link>
              <Link href="/section-87a" className="block text-sm hover:text-white transition-colors">Section 87A Checker</Link>
              <Link href="/budget-impact" className="block text-sm hover:text-white transition-colors">Budget Impact Calc</Link>
              <Link href="/hra-calculator" className="block text-sm hover:text-white transition-colors">HRA Calculator</Link>
              <Link href="/regime" className="block text-sm hover:text-white transition-colors">Regime Comparison</Link>
              <Link href="/checklist" className="block text-sm hover:text-white transition-colors">Tax Prep Checklist</Link>
            </div>
          </div>

          {/* Official Sources — standalone */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Official Sources</h4>
            <div className="space-y-2">
              <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-white transition-colors">Income Tax Department ↗</a>
              <a href="https://www.incometax.gov.in/iec/foportal" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-white transition-colors">CBDT ↗</a>
              <a href="https://www.epfindia.gov.in" target="_blank" rel="noopener noreferrer" className="block text-sm hover:text-white transition-colors">EPFO ↗</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-center sm:text-left">This website provides educational information only and does not offer tax advice. Consult a qualified professional for personal tax decisions.</p>
          <p className="text-xs shrink-0">© {new Date().getFullYear()} Taxaltus</p>
        </div>
      </div>
    </footer>
  );
}
