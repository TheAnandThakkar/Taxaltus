"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { glossary } from "@/data/content";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = glossary;
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (g) =>
          g.term.toLowerCase().includes(q) ||
          g.shortDef.toLowerCase().includes(q)
      );
    }
    if (activeLetter) {
      items = items.filter((g) =>
        g.term.toUpperCase().startsWith(activeLetter)
      );
    }
    return items.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, activeLetter]);

  const availableLetters = useMemo(
    () => new Set(glossary.map((g) => g.term[0].toUpperCase())),
    []
  );

  return (
    <div>
      <PageHeader
        title="Tax Glossary"
        subtitle="A-Z guide to common tax terms explained in plain language"
      />

      <section className="py-10 sm:py-14">
        <div className="container-main">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
          <div className="mb-8">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search tax terms..."
            />
          </div>

          <div className="flex flex-wrap gap-1.5 mb-8">
            <button
              onClick={() => setActiveLetter(null)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                activeLetter === null
                  ? "bg-teal text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                onClick={() =>
                  setActiveLetter(activeLetter === letter ? null : letter)
                }
                disabled={!availableLetters.has(letter)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                  activeLetter === letter
                    ? "bg-teal text-white"
                    : availableLetters.has(letter)
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-gray-50 text-gray-300 cursor-not-allowed"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No terms found</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveLetter(null);
                }}
                className="mt-4 text-teal font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((g) => (
                <Link
                  key={g.id}
                  href={`/glossary/${g.id}`}
                  className="card-hover p-5 group"
                >
                  <h3 className="font-bold text-navy group-hover:text-teal transition-colors mb-1">
                    {g.term}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {g.shortDef}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <p className="text-center text-sm text-gray-400 mt-8">
            {filtered.length} term{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </section>
    </div>
  );
}
