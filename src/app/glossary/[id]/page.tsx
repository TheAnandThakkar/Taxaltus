"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useParams } from "next/navigation";
import { glossary } from "@/data/content";
import PageHeader from "@/components/ui/PageHeader";

export default function GlossaryDetail() {
  const { id } = useParams<{ id: string }>();
  const term = glossary.find((g) => g.id === id);

  if (!term) {
    return (
      <div>
        <PageHeader title="Term Not Found" />
        <div className="container-main py-16 text-center">
          <p className="text-gray-500 mb-6">This glossary term does not exist.</p>
          <Link href="/glossary" className="btn-primary">
            Back to Glossary
          </Link>
        </div>
      </div>
    );
  }

  const relatedTerms = term.relatedIds
    .map((rid) => glossary.find((g) => g.id === rid))
    .filter(Boolean);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: term.term,
        text: term.shortDef,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div>
      <PageHeader
        title={term.term}
        subtitle={term.shortDef}
        breadcrumbs={[
          { label: "Glossary", path: "/glossary" },
          { label: term.term },
        ]}
      />

      <section className="py-10 sm:py-14">
        <div className="container-main">
          <div className="mb-6">
            <Link href="/glossary" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Glossary
            </Link>
          </div>

          <div className="card p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-bold text-navy mb-3">Definition</h2>
            <p className="text-gray-600 leading-relaxed">{term.longDef}</p>
          </div>

          <div className="card p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-bold text-navy mb-3">Example</h2>
            <div className="bg-teal/5 border border-teal/20 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed">{term.example}</p>
            </div>
          </div>

          <div className="card p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-bold text-navy mb-3">
              Where You See It
            </h2>
            <div className="flex flex-wrap gap-2">
              {term.whereYouSeeIt.split(", ").map((place, i) => (
                <span
                  key={i}
                  className="badge bg-navy/5 text-navy/70"
                >
                  {place}
                </span>
              ))}
            </div>
          </div>

          {relatedTerms.length > 0 && (
            <div className="card p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-bold text-navy mb-3">
                Related Terms
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTerms.map((rt) => (
                  <Link
                    key={rt!.id}
                    href={`/glossary/${rt!.id}`}
                    className="badge bg-teal/10 text-teal hover:bg-teal/20 transition-colors"
                  >
                    {rt!.term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {term.officialLinks.length > 0 && (
            <div className="card p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-bold text-navy mb-3">
                Official Resources
              </h2>
              <div className="space-y-2">
                {term.officialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-teal hover:underline text-sm"
                  >
                    <svg
                      className="w-4 h-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <Link
              href="/glossary"
              className="text-teal font-medium hover:underline text-sm"
            >
              &larr; Back to Glossary
            </Link>
            <button
              onClick={handleShare}
              className="btn-outline text-sm px-4 py-2 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
