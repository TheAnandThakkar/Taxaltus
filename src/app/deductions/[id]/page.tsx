"use client";
import Link from "next/link";

import { useParams } from "next/navigation";
import { sections } from "@/data/content";
import PageHeader from "@/components/ui/PageHeader";
import Accordion from "@/components/ui/Accordion";

export default function SectionDetail() {
  const { id } = useParams<{ id: string }>();
  const section = sections.find((s) => s.id === id);

  if (!section) {
    return (
      <div>
        <PageHeader title="Section Not Found" />
        <div className="container-main py-16 text-center">
          <p className="text-gray-500 mb-6">The requested deduction section could not be found.</p>
          <Link href="/deductions" className="text-teal font-semibold hover:underline">
            Back to Deductions
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Section ${section.sectionCode} — ${section.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div>
      <PageHeader
        title={`Section ${section.sectionCode}`}
        subtitle={section.title}
        breadcrumbs={[
          { label: "Deductions", path: "/deductions" },
          { label: section.sectionCode },
        ]}
      />

      <section className="py-12 sm:py-16">
        <div className="container-main">
          <div className="flex items-center gap-3 mb-8">
            <span className="badge bg-teal/10 text-teal font-semibold text-sm">
              {section.sectionCode}
            </span>
            <span className="badge bg-gold/10 text-gold font-semibold text-sm">
              Max: {section.maxLimit}
            </span>
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-2 text-sm text-gray-400 hover:text-teal transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>

          <div className="card p-6 sm:p-8 mb-8">
            <h2 className="section-title mb-4">Explanation</h2>
            <p className="text-gray-600 leading-relaxed">{section.explanation}</p>
          </div>

          <div className="card p-6 sm:p-8 mb-8">
            <h2 className="section-title mb-4">What's Included</h2>
            <ul className="space-y-2">
              {section.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-teal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-8 mb-8 bg-teal/5 border-teal/20">
            <h2 className="section-title mb-4">Example</h2>
            <p className="text-gray-600 leading-relaxed">{section.example}</p>
          </div>

          {section.faqs.length > 0 && (
            <div className="mb-8">
              <h2 className="section-title mb-4">FAQs</h2>
              <Accordion items={section.faqs} />
            </div>
          )}

          {section.officialLinks.length > 0 && (
            <div className="card p-6 sm:p-8">
              <h2 className="section-title mb-4">Official Links</h2>
              <div className="flex flex-wrap gap-3">
                {section.officialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-teal hover:underline"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
