"use client";

import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
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
        subtitle="A non-profit tax education initiative"
        breadcrumbs={[{ label: "About" }]}
      />

      <div className="container-main py-10 sm:py-14">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <div className="space-y-10">
          <section className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50/50 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-amber-100/80 flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-amber-800">Important Disclaimer</h2>
            </div>

            <ul className="space-y-3 text-sm text-amber-900/80">
              <li className="flex items-start gap-3 bg-white/40 p-3 rounded-xl">
                <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-amber-400" />
                <span><strong className="text-amber-900">Educational Purposes Only:</strong> This application does not constitute professional tax, legal, or financial advice. It is a learning tool designed to help you understand Indian taxation.</span>
              </li>
              <li className="flex items-start gap-3 bg-white/40 p-3 rounded-xl">
                <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-amber-400" />
                <span><strong className="text-amber-900">Privacy First:</strong> Calculator inputs stay in your browser. If you voluntarily submit the update/reminder form, Taxaltus stores only the contact details and preferences you provide.</span>
              </li>
              <li className="flex items-start gap-3 bg-white/40 p-3 rounded-xl">
                <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-amber-400" />
                <span><strong className="text-amber-900">Professional Consultation:</strong> We strongly urge you to consult a qualified Chartered Accountant (CA) or financial advisor before making actual tax filing decisions.</span>
              </li>
              <li className="flex items-start gap-3 bg-white/40 p-3 rounded-xl">
                <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-amber-400" />
                <span><strong className="text-amber-900">Dynamic Tax Laws:</strong> Tax rules and slabs are maintained for AY 2026-27 and AY 2027-28 based on official published rules, but tax law remains subject to government amendments and individual edge cases.</span>
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



          <section className="text-center py-8">
            <img
              src="/logo-full.png"
              alt="Taxaltus"
              className="h-12 sm:h-14 mx-auto mb-4 object-contain"
            />
            <p className="text-gray-500 text-sm italic">A non-profit tax education initiative.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
