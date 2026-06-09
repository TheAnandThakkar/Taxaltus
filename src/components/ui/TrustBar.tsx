import Link from "next/link";

export default function TrustBar({
  reviewed = "10 June 2026",
  appliesTo = "AY 2026-27 and AY 2027-28",
}: {
  reviewed?: string;
  appliesTo?: string;
}) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div>
        <strong>Last reviewed:</strong> {reviewed}
        <span className="mx-2 text-blue-300">|</span>
        <strong>Applicable for:</strong> {appliesTo}
      </div>
      <Link href="/disclaimer" className="font-semibold text-blue-700 hover:underline">
        Educational use only
      </Link>
    </div>
  );
}
