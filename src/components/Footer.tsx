import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 mt-auto">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src="/icon.png" alt="Taxaltus" className="h-8 w-8 rounded-lg" />
              <span className="text-white font-bold text-lg">Taxaltus</span>
            </Link>
            <p className="text-sm leading-relaxed">Your Tax Education Companion for Indian salaried employees.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Explore</h4>
            <div className="space-y-2">
              <Link to="/form16" className="block text-sm hover:text-white transition-colors">Form 16 Explorer</Link>
              <Link to="/deductions" className="block text-sm hover:text-white transition-colors">Deductions</Link>
              <Link to="/glossary" className="block text-sm hover:text-white transition-colors">Glossary</Link>
              <Link to="/learn" className="block text-sm hover:text-white transition-colors">Learn</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Tools</h4>
            <div className="space-y-2">
              <Link to="/estimator" className="block text-sm hover:text-white transition-colors">Tax Estimator</Link>
              <Link to="/itr-selector" className="block text-sm hover:text-white transition-colors">ITR Form Selector</Link>
              <Link to="/regime" className="block text-sm hover:text-white transition-colors">Regime Comparison</Link>
              <Link to="/checklist" className="block text-sm hover:text-white transition-colors">Tax Prep Checklist</Link>
            </div>
          </div>

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
