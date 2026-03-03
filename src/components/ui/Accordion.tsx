import { useState } from "react";

interface Props {
  items: { q: string; a: string }[];
}

export default function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <svg className={`w-5 h-5 shrink-0 text-gray-400 transition-transform ${open === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
