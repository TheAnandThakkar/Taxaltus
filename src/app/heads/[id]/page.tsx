"use client";
import Link from "next/link";

import { useParams } from "next/navigation";
import { headsOfIncome } from "@/data/content";
import PageHeader from "@/components/ui/PageHeader";

export default function HeadDetail() {
  const { id } = useParams<{ id: string }>();
  const head = headsOfIncome.find((h) => h.id === id);

  if (!head) {
    return (
      <div>
        <PageHeader title="Head Not Found" />
        <div className="container-main py-16 text-center">
          <p className="text-gray-500 mb-6">The requested head of income could not be found.</p>
          <Link href="/heads" className="text-teal font-semibold hover:underline">
            Back to Heads of Income
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={head.name}
        breadcrumbs={[
          { label: "Heads of Income", path: "/heads" },
          { label: head.name },
        ]}
      />

      <section className="py-12 sm:py-16">
        <div className="container-main">
          <div className="card p-6 sm:p-8 mb-8">
            <h2 className="section-title mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">{head.overview}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card p-6 sm:p-8">
              <h2 className="section-title mb-4 text-teal">Includes</h2>
              <ul className="space-y-2">
                {head.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                    <svg className="w-5 h-5 text-teal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6 sm:p-8">
              <h2 className="section-title mb-4 text-red-500">Excludes</h2>
              <ul className="space-y-2">
                {head.excludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                    <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card p-6 sm:p-8 mb-8 bg-teal/5 border-teal/20">
            <h2 className="section-title mb-4">Examples</h2>
            <ul className="space-y-2">
              {head.examples.map((ex, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                  <span className="w-6 h-6 rounded-full bg-teal/10 text-teal flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="section-title mb-4">Common Terms</h2>
            <div className="flex flex-wrap gap-2">
              {head.commonTerms.map((term, i) => (
                <span
                  key={i}
                  className="badge bg-navy/5 text-navy text-sm px-3 py-1.5"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
