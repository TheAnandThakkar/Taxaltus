import PageHeader from "@/components/ui/PageHeader";

const OFFICIAL_SOURCES = [
  { name: "Income Tax Department", url: "https://www.incometax.gov.in", desc: "Official portal for ITR filing, forms, and tax information" },
  { name: "CBDT (Central Board of Direct Taxes)", url: "https://www.incometax.gov.in/iec/foportal/", desc: "Policy-making body for direct taxes in India" },
  { name: "EPFO (Employees' Provident Fund Organisation)", url: "https://www.epfindia.gov.in", desc: "Manage your EPF account, check balance, and download statements" },
];

export default function About() {
  return (
    <div>
      <PageHeader
        title="About Taxaltus"
        subtitle="Your trusted companion for understanding Indian income tax"
        breadcrumbs={[{ label: "About" }]}
      />

      <div className="container-main py-10 sm:py-14">
        <div className="max-w-3xl mx-auto space-y-10">
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-amber-800 mb-3">Disclaimer</h2>
            <ul className="space-y-2 text-sm text-amber-900/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                This app is for <strong>educational purposes only</strong>. It does not constitute tax advice, legal advice, or professional consultation.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                No personal or financial data is collected, stored, or transmitted. All calculations and preferences are stored locally on your device.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                Always consult a qualified Chartered Accountant or tax professional for your specific tax situation.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" />
                Tax laws are subject to change. Information is based on FY 2024-25 rules and may not reflect the latest amendments.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-4">Official Sources</h2>
            <div className="space-y-3">
              {OFFICIAL_SOURCES.map((source) => (
                <a
                  key={source.name}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-gray-200 p-4 hover:border-teal/40 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-teal transition-colors">
                        {source.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">{source.desc}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-teal transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-navy mb-4">App Information</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500 font-medium">Version</dt>
                <dd className="text-gray-900 font-semibold mt-0.5">1.0.0</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Architecture</dt>
                <dd className="text-gray-900 font-semibold mt-0.5">Offline-first</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Data Storage</dt>
                <dd className="text-gray-900 font-semibold mt-0.5">Local only (localStorage)</dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Financial Year</dt>
                <dd className="text-gray-900 font-semibold mt-0.5">FY 2024-25 (AY 2025-26)</dd>
              </div>
            </dl>
          </section>

          <section className="text-center py-8">
            <img
              src="/logo-full.png"
              alt="Taxaltus"
              className="h-12 sm:h-14 mx-auto mb-4 object-contain"
            />
            <p className="text-gray-500 text-sm italic">Your Tax Education Companion</p>
          </section>
        </div>
      </div>
    </div>
  );
}
