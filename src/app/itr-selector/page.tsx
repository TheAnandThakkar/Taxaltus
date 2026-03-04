"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  key: string;
}

const questions: Question[] = [
  { id: 1, text: "Are you a salaried individual?", key: "salaried" },
  { id: 2, text: "Do you have capital gains income?", key: "capitalGains" },
  { id: 3, text: "Do you have business or professional income?", key: "business" },
  { id: 4, text: "Do you have foreign income or foreign assets?", key: "foreign" },
  { id: 5, text: "Do you have income from more than one house property?", key: "multipleHouse" },
];

interface Answers {
  [key: string]: boolean | null;
}

function determineITR(answers: Answers): { form: string; explanation: string } {
  if (answers.business) {
    return {
      form: "ITR-3 / ITR-4",
      explanation:
        "Since you have business or professional income, you need to file ITR-3. If your business income is computed on a presumptive basis under sections 44AD, 44ADA, or 44AE, you may file ITR-4 (Sugam) instead.",
    };
  }
  if (answers.foreign) {
    return {
      form: "ITR-2",
      explanation:
        "Since you have foreign income or hold foreign assets, you are required to file ITR-2. This form accommodates the reporting of foreign assets and income under the FEMA/Black Money Act requirements.",
    };
  }
  if (answers.capitalGains || answers.multipleHouse) {
    return {
      form: "ITR-2",
      explanation:
        "Since you have capital gains income or income from more than one house property, you need to file ITR-2. ITR-1 does not support these income types.",
    };
  }
  if (answers.salaried) {
    return {
      form: "ITR-1 (Sahaj)",
      explanation:
        "As a salaried individual with simple income sources (salary, one house property, other sources up to ₹50 lakh), ITR-1 (Sahaj) is the simplest form for you.",
    };
  }
  return {
    form: "ITR-1 (Sahaj) / ITR-2",
    explanation:
      "Based on your answers, ITR-1 may work if your total income is up to ₹50 lakh with simple income sources. Otherwise, consider ITR-2 for more complex situations.",
  };
}

export default function ItrSelector() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  const progress = showResult ? 100 : (currentStep / questions.length) * 100;

  const handleAnswer = (value: boolean) => {
    const key = questions[currentStep].key;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const result = determineITR(answers);

  return (
    <div>
      <PageHeader
        title="ITR Form Selector"
        subtitle="Answer a few simple questions to find out which Income Tax Return form is right for you."
        breadcrumbs={[{ label: "ITR Selector" }]}
      />

      <div className="container-main py-10 sm:py-14">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div>
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-teal h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {questions.map((q, i) => (
              <div key={q.id} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    showResult || i < currentStep
                      ? "bg-teal text-white"
                      : i === currentStep
                      ? "bg-navy text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {showResult || i < currentStep ? "✓" : i + 1}
                </div>
                {i < questions.length - 1 && (
                  <div
                    className={`w-6 sm:w-10 h-0.5 ${
                      i < currentStep || showResult ? "bg-teal" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {!showResult ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 sm:p-10">
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-navy/10 text-navy text-sm font-medium mb-4">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-navy mb-8">
                  {questions[currentStep].text}
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleAnswer(true)}
                    className="px-10 py-3 rounded-lg bg-teal text-white font-semibold hover:bg-teal/90 transition-colors text-lg"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(false)}
                    className="px-10 py-3 rounded-lg bg-gray-100 text-navy font-semibold hover:bg-gray-200 transition-colors text-lg"
                  >
                    No
                  </button>
                </div>
              </div>
              {currentStep > 0 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleBack}
                    className="text-sm text-gray-500 hover:text-navy transition-colors"
                  >
                    ← Go back
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 sm:p-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg text-gray-500 font-medium">Recommended Form</h2>
                <p className="text-3xl sm:text-4xl font-bold text-navy mt-1">{result.form}</p>
              </div>

              <div className="bg-navy/5 rounded-lg p-5 mb-6">
                <h3 className="font-semibold text-navy mb-2">Why this form?</h3>
                <p className="text-gray-600 leading-relaxed">{result.explanation}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-navy mb-3">Your Answers</h3>
                <div className="space-y-2">
                  {questions.map((q) => (
                    <div
                      key={q.id}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
                    >
                      <span className="text-sm text-gray-700">{q.text}</span>
                      <span
                        className={`text-sm font-semibold ${
                          answers[q.key] ? "text-teal" : "text-gray-400"
                        }`}
                      >
                        {answers[q.key] ? "Yes" : "No"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-lg bg-gray-100 text-navy font-semibold hover:bg-gray-200 transition-colors"
                >
                  ← Go Back
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-navy text-white font-semibold hover:bg-navy/90 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
