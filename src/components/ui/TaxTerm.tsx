"use client";

import { useState, useRef } from "react";
import { JARGON } from "@/data/jargon";

interface TaxTermProps {
    term: string;           // Key into JARGON dict (e.g. "TDS")
    children?: React.ReactNode; // Display text — defaults to `term`
}

export default function TaxTerm({ term, children }: TaxTermProps) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const data = JARGON[term];
    if (!data) return <>{children ?? term}</>;

    const show = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };
    const hide = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150);
    };

    return (
        <span className="relative inline-block">
            <span
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
                className="border-b border-dashed border-teal/50 text-teal cursor-help font-medium hover:border-teal transition-colors"
                tabIndex={0}
                role="button"
                aria-describedby={`jargon-${term}`}
            >
                {children ?? term}
            </span>

            {open && (
                <span
                    id={`jargon-${term}`}
                    role="tooltip"
                    onMouseEnter={show}
                    onMouseLeave={hide}
                    className="absolute z-50 bottom-full left-0 mb-2 w-72 bg-navy text-white text-xs rounded-xl shadow-2xl p-4 leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-150"
                >
                    <span className="font-bold text-teal text-sm block mb-1">{term}</span>
                    {data.short}
                    {data.detail && (
                        <span className="block mt-2 text-white/60 text-[11px]">{data.detail}</span>
                    )}
                    {/* Arrow */}
                    <span className="absolute top-full left-4 border-4 border-transparent border-t-navy" />
                </span>
            )}
        </span>
    );
}
