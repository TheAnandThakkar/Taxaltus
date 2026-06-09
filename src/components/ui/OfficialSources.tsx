const sources = [
  { label: "Income Tax Department", url: "https://www.incometax.gov.in" },
  { label: "Union Budget documents", url: "https://www.indiabudget.gov.in" },
  { label: "Income Tax India", url: "https://incometaxindia.gov.in" },
];

export default function OfficialSources({
  note = "Taxaltus uses official public tax law references for educational estimations. Individual facts, special-rate income, surcharge, marginal relief, deductions and filing positions may change the final outcome.",
}: {
  note?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 text-sm text-gray-700">
      <h3 className="font-bold text-navy mb-2">Official Source References</h3>
      <p className="leading-relaxed mb-3">{note}</p>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-gray-50 hover:bg-teal/5 border border-gray-200 hover:border-teal/30 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-teal"
          >
            {source.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
