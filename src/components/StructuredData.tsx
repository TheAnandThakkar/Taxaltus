import { ASSESSMENT_YEARS_AND } from "@/lib/taxYears";

export default function StructuredData() {
  const baseUrl = "https://taxaltus.com";
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Taxaltus",
        slogan: "A non-profit tax education initiative",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        founder: {
          "@type": "Person",
          name: "Anand Thakkar",
          sameAs: "https://www.linkedin.com/in/theanandthakkar/",
        },
        sameAs: [baseUrl, "https://www.linkedin.com/in/theanandthakkar/"],
        knowsAbout: [
          "Income-tax Act 2025",
          "New income tax slabs",
          "Old vs new tax regime",
          "Income tax calculator",
          "Section 87A rebate",
          "HRA exemption",
          "Capital gains tax",
          "Form 16",
          "Advance tax",
          "ITR filing",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: "Taxaltus",
        alternateName: "Taxaltus Income Tax Companion",
        url: baseUrl,
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/glossary?query={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${baseUrl}/#tax-calculator`,
        name: "Taxaltus Income Tax Companion",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: `${baseUrl}/estimator`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        audience: {
          "@type": "Audience",
          audienceType: "Indian salaried employees and individual taxpayers",
        },
        featureList: [
          `Educational income tax estimator for ${ASSESSMENT_YEARS_AND}`,
          "Full income tax calculator across all income heads",
          "New Income-tax Act 2025 section guide and new tax slabs",
          "Old tax regime vs new tax regime comparison",
          "HRA exemption calculator",
          "Section 87A rebate calculator",
          "Capital gains tax calculator",
          "Advance tax calculator",
          "Income tax notice explainer",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
