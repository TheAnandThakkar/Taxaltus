"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Clock, Bell, BellOff } from "lucide-react";

function RemindMeButton({ label, iso }: { label: string; iso: string }) {
  const [status, setStatus] = useState<"idle" | "set" | "denied">("idle");

  const handleRemind = async () => {
    if (!('Notification' in window)) return;
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') { setStatus('denied'); return; }

    // Schedule a notification 3 days before the deadline
    const deadline = new Date(iso).getTime();
    const reminderTime = deadline - (3 * 24 * 60 * 60 * 1000);
    const delay = reminderTime - Date.now();

    if (delay > 0) {
      setTimeout(() => {
        new Notification(`📅 Tax Deadline Reminder`, {
          body: `${label} deadline is in 3 days! Don't miss it.`,
          icon: '/icon.png',
        });
      }, Math.min(delay, 2147483647)); // JS max setTimeout
    } else {
      // Deadline passed or very soon — notify immediately
      new Notification(`📅 Tax Deadline: ${label}`, { body: 'This deadline is approaching or has passed. Check your ITR status.', icon: '/icon.png' });
    }
    setStatus('set');
  };

  return (
    <button onClick={handleRemind} title={status === 'denied' ? 'Notifications blocked. Enable in browser settings.' : 'Get a reminder 3 days before deadline'}
      className={`mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${status === 'set' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
        status === 'denied' ? 'bg-red-50 text-red-500 border-red-200' :
          'bg-gray-50 hover:bg-teal/5 text-gray-500 hover:text-teal border-gray-200 hover:border-teal/30'
        }`}>
      {status === 'set' ? <><Bell className="w-3 h-3" /> Reminder Set</> :
        status === 'denied' ? <><BellOff className="w-3 h-3" /> Blocked</> :
          <><Bell className="w-3 h-3" /> Remind Me</>}
    </button>
  );
}

// Dynamically computes tax deadlines for the current financial year.
// Indian FY: Apr 1 → Mar 31. After Apr 1st, automatically rolls to next FY.
function getTaxDates() {
  const now = new Date();
  // FY start year: if current month is Jan-Mar (0-2), we're still in the previous FY
  const fyStartYear = now.getMonth() <= 2 ? now.getFullYear() - 1 : now.getFullYear();
  const fyEndYear = fyStartYear + 1;
  // e.g. "FY 26-27" after April 1 2026
  const fyLabel = `FY ${String(fyStartYear + 1).slice(-2)}-${String(fyEndYear + 1).slice(-2)}`;
  const ayLabel = `AY ${fyStartYear + 2}-${String(fyEndYear + 2).slice(-2)}`;

  const dates = [
    {
      label: "Advance Tax Q1",
      date: `Jun 15, ${fyStartYear + 1}`,
      iso: `${fyStartYear + 1}-06-15T23:59:59+05:30`,
    },
    {
      label: "ITR Filing Deadline",
      date: `Jul 31, ${fyStartYear + 1}`,
      iso: `${fyStartYear + 1}-07-31T23:59:59+05:30`,
    },
    {
      label: "Advance Tax Q2",
      date: `Sep 15, ${fyStartYear + 1}`,
      iso: `${fyStartYear + 1}-09-15T23:59:59+05:30`,
    },
    {
      label: "Advance Tax Q3",
      date: `Dec 15, ${fyStartYear + 1}`,
      iso: `${fyStartYear + 1}-12-15T23:59:59+05:30`,
    },
    {
      label: "Belated Return Filing",
      date: `Dec 31, ${fyStartYear + 1}`,
      iso: `${fyStartYear + 1}-12-31T23:59:59+05:30`,
    },
    {
      label: "Advance Tax Q4",
      date: `Mar 15, ${fyEndYear + 1}`,
      iso: `${fyEndYear + 1}-03-15T23:59:59+05:30`,
    },
  ];
  return { dates, fyLabel, ayLabel };
}

const { dates: TAX_DATES, fyLabel: FY_LABEL, ayLabel: AY_LABEL } = getTaxDates();


function calculateTimeLeft(targetIsoString: string) {
  const target = new Date(targetIsoString).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  };
}

function MiniCountdown({ targetIsoStr }: { targetIsoStr: string }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetIsoStr));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetIsoStr));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetIsoStr]);

  if (!isMounted) return null;

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
    return <div className="text-xs font-semibold text-gray-400 mt-2 bg-gray-50 py-1 rounded-md">Past Deadline</div>;
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-3 bg-teal/5 py-1.5 px-2 rounded-lg border border-teal/10">
      <Clock className="w-3 h-3 text-teal flex-shrink-0" />
      <span className="text-xs font-mono font-semibold text-teal tracking-tighter">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </div>
  );
}

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
              <Link href="/estimator" className="btn-primary">Try Tax Estimator</Link>
              <Link href="/form16" className="btn-outline border-white/30 text-white hover:bg-white/10">Explore Form 16</Link>
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
              <Link key={f.path} href={f.path} className={`card-hover p-6 border ${f.color} group`}>
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
              <Link key={q.path} href={q.path} className="card-hover p-5 group">
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
          <p className="text-gray-500 mb-10">Important deadlines for {FY_LABEL} ({AY_LABEL})</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TAX_DATES.map((d, i) => (
              <div key={i} className="card p-5 border border-gray-100 hover:border-teal/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-bold text-navy">{d.date}</div>
                  <div className="text-xs font-semibold bg-gray-50 text-gray-500 px-2 py-1 rounded">{FY_LABEL}</div>
                </div>
                <div className="text-sm font-medium text-gray-600 border-b border-gray-100 pb-3 mb-1">{d.label}</div>
                <MiniCountdown targetIsoStr={d.iso} />
                <RemindMeButton label={d.label} iso={d.iso} />
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
            <Link href="/estimator" className="bg-white text-teal font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">Tax Estimator</Link>
            <Link href="/form16/specimen" className="border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">View Form 16 Specimen</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
