"use client";

import { ASSESSMENT_YEARS, AssessmentYear } from "@/lib/taxYears";

export default function AssessmentYearSelect({
  value,
  onChange,
  className = "",
}: {
  value: AssessmentYear;
  onChange: (value: AssessmentYear) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        Tax Year
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as AssessmentYear)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-teal/40 bg-white"
      >
        {ASSESSMENT_YEARS.map((year) => (
          <option key={year.key} value={year.key}>
            {year.label} · {year.act}
          </option>
        ))}
      </select>
    </div>
  );
}
