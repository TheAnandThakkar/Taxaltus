import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Form 16", path: "/form16" },
  { label: "Deductions", path: "/deductions" },
  { label: "Glossary", path: "/glossary" },
  { label: "Questions", path: "/tax-questions" },
  { label: "Learn", path: "/learn" },
  { label: "FAQ", path: "/faq" },
];

const TOOL_LINKS = [
  { label: "Full Income Tax Calculator", path: "/income-tax-calculator" },
  { label: "Tax Estimator", path: "/estimator" },
  { label: "HRA Calculator", path: "/hra-calculator" },
  { label: "Capital Gains Calculator", path: "/capital-gains" },
  { label: "Advance Tax Calculator", path: "/advance-tax" },
  { label: "CTC → Take-Home Calculator", path: "/ctc-calculator" },
  { label: "Budget Impact Calculator", path: "/budget-impact" },
  { label: "Section 87A Checker", path: "/section-87a" },
  { label: "ITR Form Selector", path: "/itr-selector" },
  { label: "Form 16 Guided Entry", path: "/form16-guided" },
  { label: "Tax Examples", path: "/tax-examples" },
  { label: "Regime Comparison", path: "/regime" },
  { label: "Tax Prep Checklist", path: "/checklist" },
  { label: "Investment Deadlines", path: "/investment-deadlines" },
  { label: "Budget Changes", path: "/budget-changes" },
];

const SEARCH_INDEX = [
  ...NAV_LINKS.map(l => ({ ...l, desc: "Quick Navigation" })),
  ...TOOL_LINKS.map(l => ({ ...l, desc: "Interactive Tool" })),
  { label: "Salary Slip Explained", path: "/salary-slip", desc: "CTC, HRA, PF, TDS and take-home breakdown" },
  { label: "Form 12BB Guide", path: "/form12bb", desc: "Investment declaration for employer TDS" },
  { label: "I have Form 16, what next?", path: "/form16-guided", desc: "Guided Form 16 entry and ITR preparation flow" },
  { label: "Tax Calculation Examples", path: "/tax-examples", desc: "Public tax test cases for common salaries" },
  { label: "Search Tax Questions", path: "/tax-questions", desc: "Plain-language answers about salary tax, notices, HRA and ITR" },
  { label: "AIS / Form 26AS Explained", path: "/ais-explainer", desc: "Annual Information Statement section-by-section" },
  { label: "First-Time ITR Filer Guide", path: "/first-time-filer", desc: "Step-by-step guide for first-time ITR filers" },
  { label: "Section 87A Rebate", path: "/section-87a", desc: "Zero-tax rebate limit and cliff effect explained" },
  { label: "ITR Common Mistakes", path: "/itr-mistakes", desc: "8 mistakes salaried employees make while filing ITR" },
  { label: "Tax Notice Decoder", path: "/tax-notice-decoder", desc: "What 143(1), 148, 139(9) notices mean" },
  { label: "Budget Impact", path: "/budget-impact", desc: "How recent Budget changes affect your tax" },
  { label: "80C Deductions", path: "/deductions", desc: "Provident Fund, LIC, PPF, ELSS" },
  { label: "80D Health Insurance", path: "/deductions", desc: "Medical insurance premiums" },
  { label: "Section 10(13A) HRA", path: "/hra-calculator", desc: "House Rent Allowance calculation rules" },
  { label: "New Tax Regime Slabs", path: "/regime", desc: "Latest tax slabs and rates for FY 2025-26 onwards (AY 2026-27)" },
  { label: "Old Tax Regime Slabs", path: "/regime", desc: "Traditional tax regime with deductions" },
  { label: "Capital Gains (STCG/LTCG)", path: "/capital-gains", desc: "Taxation on shares, property, and mutual funds" },
  { label: "Form 26AS / AIS", path: "/ais-explainer", desc: "Annual consolidated tax statement details" },
  { label: "ITR-1 (Sahaj)", path: "/itr-selector", desc: "For individuals with salary and one house property" },
  { label: "ITR-2", path: "/itr-selector", desc: "For individuals with capital gains" },
  { label: "Advance Tax Installments", path: "/advance-tax", desc: "Quarterly advance tax payment schedule" },
  { label: "Disclaimer", path: "/disclaimer", desc: "Educational use only, not professional advice" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setToolsOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Handle Escape to close search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && searchOpen) setSearchOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  const filteredSearch = searchQuery.trim().length > 0
    ? SEARCH_INDEX.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <>
      <nav className="bg-navy sticky top-0 z-40 shadow-lg">
        <div className="container-main">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
              <img src="/logo.png" alt="Taxaltus" className="h-10 w-auto object-contain" />
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden lg:flex items-center gap-1 mr-2">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.path) ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="relative" ref={toolsRef}>
                  <button
                    onClick={() => setToolsOpen(prev => !prev)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${toolsOpen || TOOL_LINKS.some(t => isActive(t.path)) ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    Tools
                    <svg className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {toolsOpen && (
                    <div className="absolute right-0 top-full pt-2 w-56 z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                        {TOOL_LINKS.map(link => (
                          <Link
                            key={link.path}
                            href={link.path}
                            className={`block px-4 py-2.5 text-sm transition-colors ${isActive(link.path) ? "bg-teal/5 text-teal font-medium" : "text-gray-700 hover:bg-gray-50"
                              }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/about") ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                >
                  About
                </Link>
              </div>

              {/* Global Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white/80 hover:text-white p-2 sm:px-3 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline-block text-sm font-medium">Search</span>
              </button>

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
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-navy border-t border-white/10 pb-4">
            <div className="container-main space-y-1 pt-2">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${isActive(link.path) ? "bg-white/15 text-white" : "text-white/70"
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
                  href={link.path}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${isActive(link.path) ? "bg-white/15 text-white" : "text-white/70"
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/about"
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${isActive("/about") ? "bg-white/15 text-white" : "text-white/70"
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Global Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-sm flex justify-center p-4 sm:pt-[10vh]">
          {/* Overlay Click Catcher */}
          <div className="absolute inset-0" onClick={() => setSearchOpen(false)} />

          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col h-max max-h-[80vh] relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                autoFocus
                placeholder="Search tools, terms, deductions..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-navy placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              {searchQuery.trim().length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  Start typing to find tax features, calculators, and terms instantly.
                </div>
              ) : filteredSearch.length > 0 ? (
                <div className="p-2">
                  {filteredSearch.map((res, index) => (
                    <Link
                      key={`${res.path}-${index}`}
                      href={res.path}
                      onClick={() => setSearchOpen(false)}
                      className="flex flex-col p-3 hover:bg-teal/5 rounded-xl group transition-colors"
                    >
                      <span className="font-semibold text-navy group-hover:text-teal transition-colors">{res.label}</span>
                      <span className="text-sm text-gray-500 mt-0.5">{res.desc}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No matches found for <span className="font-medium text-navy">"{searchQuery}"</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
