import Link from "next/link";
import { Landmark } from "lucide-react";

// Compact callout that flags how the new Income-tax Act, 2025 affects the
// provision discussed on a page, and links to the full explainer. Place near the
// top of a calculator/guide page. Children carry the page-specific note.
export default function ActNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-3 bg-teal-50 border border-teal-200 rounded-xl p-4">
      <Landmark className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
      <p className="text-sm text-teal-900 leading-relaxed">
        <span className="font-semibold">Income-tax Act, 2025 — </span>
        {children}{" "}
        <Link href="/income-tax-act-2025" className="font-semibold underline whitespace-nowrap">
          What&rsquo;s new &rarr;
        </Link>
      </p>
    </div>
  );
}
