import { useParams, Link } from "react-router-dom";
import { form16Fields, sections } from "@/data/content";
import PageHeader from "@/components/ui/PageHeader";
import Accordion from "@/components/ui/Accordion";
import { useApp } from "@/contexts/AppContext";
import { useEffect } from "react";

export default function Form16Detail() {
  const { id } = useParams<{ id: string }>();
  const { addRecentlyViewed, toggleBookmark, isBookmarked } = useApp();
  const field = form16Fields.find((f) => f.id === id);

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id, addRecentlyViewed]);

  if (!field) {
    return (
      <div>
        <PageHeader title="Field Not Found" />
        <div className="container-main py-16 text-center">
          <p className="text-gray-500 text-lg mb-4">
            The Form 16 field you're looking for doesn't exist.
          </p>
          <Link to="/form16" className="btn-primary inline-block">
            Back to Form 16 Explorer
          </Link>
        </div>
      </div>
    );
  }

  const relatedSecs = field.relatedSections
    .map((sid) => sections.find((s) => s.id === sid))
    .filter(Boolean);

  const handleShare = async () => {
    const shareData = {
      title: field.label,
      text: field.description,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch {
    }
  };

  return (
    <div>
      <PageHeader
        title={field.label}
        subtitle={`${field.partLabel} · ${field.headOfIncome}`}
        breadcrumbs={[
          { label: "Form 16 Explorer", path: "/form16" },
          { label: field.label },
        ]}
      />

      <div className="container-main py-8 sm:py-12">
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => toggleBookmark(field.id)}
            className={`btn-outline flex items-center gap-2 text-sm ${
              isBookmarked(field.id) ? "!border-teal !text-teal" : ""
            }`}
          >
            <svg
              className="w-4 h-4"
              fill={isBookmarked(field.id) ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            {isBookmarked(field.id) ? "Bookmarked" : "Bookmark"}
          </button>
          <button
            onClick={handleShare}
            className="btn-outline flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="card p-6">
              <h2 className="section-title text-navy mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{field.description}</p>
            </section>

            <section className="card p-6">
              <h2 className="section-title text-navy mb-3">Why It Matters</h2>
              <p className="text-gray-600 leading-relaxed">{field.whyItMatters}</p>
            </section>

            <section className="card p-6">
              <h2 className="section-title text-navy mb-3">Calculation</h2>
              <div className="bg-navy/5 rounded-xl p-4">
                <p className="text-sm text-navy font-mono leading-relaxed">
                  {field.calculation}
                </p>
              </div>
            </section>

            <section className="card p-6">
              <h2 className="section-title text-navy mb-3">Taxability</h2>
              <p className="text-gray-600 leading-relaxed">{field.taxability}</p>
            </section>

            {field.faqs.length > 0 && (
              <section className="card p-6">
                <h2 className="section-title text-navy mb-4">
                  Frequently Asked Questions
                </h2>
                <Accordion items={field.faqs} />
              </section>
            )}
          </div>

          <div className="space-y-6">
            <div className="card p-5">
              <h3 className="font-semibold text-navy mb-3 text-sm uppercase tracking-wide">
                Field Info
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-400">Specimen Key</dt>
                  <dd className="font-mono text-navy font-medium">{field.specimenKey}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Part</dt>
                  <dd className="font-medium text-gray-700">{field.partLabel}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Head of Income</dt>
                  <dd className="font-medium text-gray-700">{field.headOfIncome}</dd>
                </div>
              </dl>
            </div>

            {relatedSecs.length > 0 && (
              <div className="card p-5">
                <h3 className="font-semibold text-navy mb-3 text-sm uppercase tracking-wide">
                  Related Sections
                </h3>
                <div className="space-y-2">
                  {relatedSecs.map(
                    (sec) =>
                      sec && (
                        <Link
                          key={sec.id}
                          to={`/deductions/${sec.id}`}
                          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-teal/5 transition-colors group"
                        >
                          <div>
                            <p className="text-sm font-medium text-navy group-hover:text-teal transition-colors">
                              Section {sec.sectionCode}
                            </p>
                            <p className="text-xs text-gray-400">{sec.title}</p>
                          </div>
                          <svg className="w-4 h-4 text-gray-300 group-hover:text-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )
                  )}
                </div>
              </div>
            )}

            {field.officialLinks.length > 0 && (
              <div className="card p-5">
                <h3 className="font-semibold text-navy mb-3 text-sm uppercase tracking-wide">
                  Official Links
                </h3>
                <div className="space-y-2">
                  {field.officialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-teal hover:underline"
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
