"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "taxaltus-lead-popup-v1";

export default function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferences, setPreferences] = useState<string[]>(["ITR deadline reminders"]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("leadPreview") === "1") {
      setOpen(true);
      return;
    }
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setOpen(false);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, preferences, source: window.location.pathname }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Please check your details and try again.");
      }

      localStorage.setItem(STORAGE_KEY, "submitted");
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy/50 px-3 py-3 sm:py-4">
      <div className="w-full max-w-md max-h-[92svh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        <div className="flex items-start justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-xs font-bold text-teal uppercase tracking-wider">Taxaltus Companion</p>
            <h2 className="text-base sm:text-lg font-bold text-navy mt-1">Get filing reminders and tax updates</h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="shrink-0 p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="px-4 sm:px-5 py-4 sm:py-5 space-y-3.5 overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name *</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal/40"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal/40"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile number</label>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-teal/40"
              placeholder="Optional"
            />
          </div>

          <fieldset className="bg-gray-50 border border-gray-100 rounded-xl p-3">
            <legend className="text-sm font-semibold text-gray-700 mb-2">What should Taxaltus send?</legend>
            <div className="grid grid-cols-1 gap-2">
              {["ITR deadline reminders", "Budget updates", "Tax notice help", "Salary and Form 16 guidance"].map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={preferences.includes(item)}
                    onChange={(event) => {
                      setPreferences((current) =>
                        event.target.checked
                          ? [...current, item]
                          : current.filter((value) => value !== item)
                      );
                    }}
                    className="w-4 h-4 accent-teal"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal hover:bg-teal-700 disabled:opacity-60 text-white font-semibold rounded-xl px-4 py-2.5 sm:py-3 transition-colors"
          >
            {submitting ? "Saving..." : "Keep me updated"}
          </button>
          <p className="text-xs text-gray-500 leading-relaxed">
            We will use these details only for Taxaltus updates, reminders, and future newsletter/contact features.
          </p>
        </form>
      </div>
    </div>
  );
}
