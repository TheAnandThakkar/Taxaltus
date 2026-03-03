import { useState } from "react";
import { Link } from "react-router-dom";
import { sections } from "@/data/content";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";

export default function Deductions() {
  const [search, setSearch] = useState("");

  const filtered = sections.filter(
    (s) =>
      s.sectionCode.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.includes.some((inc) => inc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <PageHeader
        title="Tax Deductions"
        subtitle="Explore all Chapter VI-A deductions and exemptions available for salaried employees under the Income Tax Act."
      />
      <section className="py-12 sm:py-16">
        <div className="container-main">
          <div className="max-w-md mb-8">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by section, title, or investment..."
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-medium">No sections found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <Link
                  key={s.id}
                  to={`/deductions/${s.id}`}
                  className="card-hover p-6 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="badge bg-teal/10 text-teal font-semibold">
                      {s.sectionCode}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                      {s.maxLimit}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-2 group-hover:text-teal transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {s.explanation}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.includes.slice(0, 3).map((inc, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md"
                      >
                        {inc.length > 25 ? inc.slice(0, 25) + "..." : inc}
                      </span>
                    ))}
                    {s.includes.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{s.includes.length - 3} more
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
