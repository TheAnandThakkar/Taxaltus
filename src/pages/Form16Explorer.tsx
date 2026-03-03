import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { form16Fields } from "@/data/content";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";

const FILTERS = ["All", "Part A & B", "Part B"] as const;

export default function Form16Explorer() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    return form16Fields.filter((f) => {
      const matchesSearch =
        !search ||
        f.label.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "All" || f.partLabel === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <div>
      <PageHeader
        title="Form 16 Explorer"
        subtitle="Understand every field in your Form 16 with detailed explanations, calculations, and FAQs"
      />

      <div className="container-main py-8 sm:py-12">
        <Link
          to="/form16/specimen"
          className="block mb-8 rounded-2xl border border-teal/20 bg-teal/5 p-5 sm:p-6 hover:border-teal/40 transition-colors group"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-navy group-hover:text-teal transition-colors">
                View Specimen Form 16
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                See a complete specimen Form 16 with illustrative data — Part A & Part B
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400 shrink-0 ml-auto mt-1 group-hover:text-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search Form 16 fields..."
            />
          </div>
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === f
                    ? "bg-teal text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {filtered.length} field{filtered.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((field) => (
            <Link
              key={field.id}
              to={`/form16/${field.id}`}
              className="card card-hover p-5 group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="badge bg-navy/5 text-navy text-xs font-mono">
                  {field.specimenKey}
                </span>
                <span
                  className={`badge text-xs ${
                    field.partLabel === "Part B"
                      ? "bg-teal/10 text-teal"
                      : "bg-gold/10 text-gold"
                  }`}
                >
                  {field.partLabel}
                </span>
              </div>
              <h3 className="font-semibold text-navy group-hover:text-teal transition-colors mb-2">
                {field.label}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {field.description}
              </p>
              <div className="mt-3 flex items-center text-xs text-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No fields match your search</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-4 text-teal text-sm font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
