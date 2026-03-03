import { Link } from "react-router-dom";

const FEATURES = [
  { title: "Form 16 Explorer", desc: "Understand every field in your Form 16 with detailed explanations", path: "/form16", icon: "📋", color: "bg-teal/5 border-teal/20" },
  { title: "Tax Estimator", desc: "Compare your tax under Old vs New regime with side-by-side breakdown", path: "/estimator", icon: "🧮", color: "bg-gold/10 border-gold/20" },
  { title: "Deductions Guide", desc: "Explore all Chapter VI-A deductions — 80C, 80D, NPS, and more", path: "/deductions", icon: "💰", color: "bg-indigo/5 border-indigo/20" },
  { title: "ITR Form Selector", desc: "Answer simple questions to find which ITR form you should file", path: "/itr-selector", icon: "📝", color: "bg-emerald-50 border-emerald-200" },
  { title: "Old vs New Regime", desc: "Side-by-side comparison of tax slabs, exemptions, and features", path: "/regime", icon: "⚖️", color: "bg-purple-50 border-purple-200" },
  { title: "Tax Prep Checklist", desc: "Track all documents and steps needed before filing your return", path: "/checklist", icon: "✅", color: "bg-sky-50 border-sky-200" },
];

const QUICK_LINKS = [
  { title: "Tax Glossary", desc: "A-Z of tax terms explained simply", path: "/glossary" },
  { title: "Budget 2024 Changes", desc: "What changed for salaried employees", path: "/budget-changes" },
  { title: "Investment Deadlines", desc: "Key dates and lock-in periods", path: "/investment-deadlines" },
  { title: "Tax Quiz", desc: "Test your tax knowledge", path: "/quiz" },
];

export default function Home() {
  return (
    <div>
      <section className="bg-navy text-white py-16 sm:py-24">
        <div className="container-main">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-sm font-medium text-teal">FY 2024-25</span>
              <span className="text-white/40">•</span>
              <span className="text-sm text-white/60">Educational Only</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Understand Your <span className="text-teal">Taxes</span>,<br />
              Make Smarter Decisions
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed">
              Taxaltus helps Indian salaried employees understand Form 16, explore deductions, compare tax regimes, and prepare for tax filing — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/estimator" className="btn-primary">Try Tax Estimator</Link>
              <Link to="/form16" className="btn-outline border-white/30 text-white hover:bg-white/10">Explore Form 16</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-main">
          <h2 className="section-title text-center mb-4">Everything You Need to Know</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">From understanding your salary slip to filing your ITR — explore tools and guides designed for salaried employees.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <Link key={f.path} to={f.path} className={`card-hover p-6 border ${f.color} group`}>
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-teal transition-colors">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container-main">
          <h2 className="section-title mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_LINKS.map(q => (
              <Link key={q.path} to={q.path} className="card-hover p-5 group">
                <h3 className="font-semibold text-navy mb-1 group-hover:text-teal transition-colors">{q.title}</h3>
                <p className="text-sm text-gray-500">{q.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main text-center">
          <h2 className="section-title mb-4">Key Tax Dates</h2>
          <p className="text-gray-500 mb-10">Important deadlines for FY 2024-25 (AY 2025-26)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { date: "Jun 15", label: "Advance Tax Q1" },
              { date: "Jul 31", label: "ITR Filing" },
              { date: "Sep 15", label: "Advance Tax Q2" },
              { date: "Dec 15", label: "Advance Tax Q3" },
              { date: "Dec 31", label: "Belated Return" },
              { date: "Mar 15", label: "Advance Tax Q4" },
            ].map((d, i) => (
              <div key={i} className="card p-4 text-center">
                <div className="text-lg font-bold text-teal">{d.date}</div>
                <div className="text-xs text-gray-500 mt-1">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal text-white">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Start with the Tax Estimator to see how much you could save, or dive into the Form 16 Explorer to understand your salary structure.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/estimator" className="bg-white text-teal font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">Tax Estimator</Link>
            <Link to="/form16/specimen" className="border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">View Form 16 Specimen</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
