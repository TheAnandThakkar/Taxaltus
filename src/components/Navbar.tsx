import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Form 16", path: "/form16" },
  { label: "Deductions", path: "/deductions" },
  { label: "Glossary", path: "/glossary" },
  { label: "Learn", path: "/learn" },
];

const TOOL_LINKS = [
  { label: "Tax Estimator", path: "/estimator" },
  { label: "ITR Form Selector", path: "/itr-selector" },
  { label: "Regime Comparison", path: "/regime" },
  { label: "Tax Prep Checklist", path: "/checklist" },
  { label: "Investment Deadlines", path: "/investment-deadlines" },
  { label: "Budget Changes", path: "/budget-changes" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <img src="/icon.png" alt="Taxaltus" className="h-9 w-9 rounded-lg" />
            <span className="text-white font-bold text-lg tracking-wide">Taxaltus</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path) ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                TOOL_LINKS.some(t => isActive(t.path)) ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}>
                Tools
                <svg className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {toolsOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {TOOL_LINKS.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        isActive(link.path) ? "bg-teal/5 text-teal font-medium" : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setToolsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/about") ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              About
            </Link>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10 pb-4">
          <div className="container-main space-y-1 pt-2">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.path) ? "bg-white/15 text-white" : "text-white/70"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2 pb-1">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Tools</span>
            </div>
            {TOOL_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.path) ? "bg-white/15 text-white" : "text-white/70"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/about"
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                isActive("/about") ? "bg-white/15 text-white" : "text-white/70"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
