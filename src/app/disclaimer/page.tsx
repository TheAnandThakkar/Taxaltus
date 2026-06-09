import PageHeader from "@/components/ui/PageHeader";
import TrustBar from "@/components/ui/TrustBar";
import OfficialSources from "@/components/ui/OfficialSources";

export default function DisclaimerPage() {
  return (
    <div>
      <PageHeader
        title="Educational Disclaimer"
        subtitle="Taxaltus is an income tax education companion, not a professional adviser or government portal."
        breadcrumbs={[{ label: "Disclaimer" }]}
      />
      <div className="container-main py-10 sm:py-14 space-y-6">
        <TrustBar />
        <section className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-navy">Please Read Before Using Taxaltus</h2>
          <p>
            Taxaltus provides educational information, simplified explanations and estimation tools for Indian income tax awareness. It does not provide legal, tax, accounting, investment or financial advice.
          </p>
          <p>
            Calculators and guides may not cover every personal fact, special-rate income, surcharge, marginal relief situation, residential status issue, employer payroll treatment, deduction condition, notice fact pattern, or future government amendment.
          </p>
          <p>
            Before filing an income tax return, paying tax, responding to a notice, choosing a tax regime, or taking any financial decision, verify your details with official records such as Form 16, AIS, Form 26AS, TIS, challans and the latest official law. For personal decisions, consult a qualified Chartered Accountant, tax practitioner, lawyer, employer payroll team or other competent professional.
          </p>
          <p>
            Taxaltus is not affiliated with the Income Tax Department, CBDT, Government of India, or any official tax filing portal.
          </p>
        </section>
        <OfficialSources />
      </div>
    </div>
  );
}
