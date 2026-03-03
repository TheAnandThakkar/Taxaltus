import { Link } from "react-router-dom";
import { headsOfIncome } from "@/data/content";
import PageHeader from "@/components/ui/PageHeader";

const COLORS = [
  "bg-teal/5 border-teal/20",
  "bg-indigo/5 border-indigo/20",
  "bg-gold/10 border-gold/20",
  "bg-emerald-50 border-emerald-200",
  "bg-purple-50 border-purple-200",
];

export default function HeadsOfIncome() {
  return (
    <div>
      <PageHeader
        title="Heads of Income"
        subtitle="Under the Income Tax Act, all income is classified under five heads. Understand what falls under each head."
      />

      <section className="py-12 sm:py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {headsOfIncome.map((head, i) => (
              <Link
                key={head.id}
                to={`/heads/${head.id}`}
                className={`card-hover p-6 border ${COLORS[i % COLORS.length]} group`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-navy text-lg group-hover:text-teal transition-colors">
                    {head.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {head.overview}
                </p>
                <div className="mt-4 flex items-center text-sm text-teal font-medium">
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
