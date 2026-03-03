import { useState } from "react";
import { Link } from "react-router-dom";
import { quizzes } from "@/data/content";
import PageHeader from "@/components/ui/PageHeader";

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const current = quizzes[currentIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === current?.answerIndex;

  const handleSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    if (optionIndex === current.answerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsFinished(false);
  };

  const getScoreMessage = () => {
    const pct = (score / quizzes.length) * 100;
    if (pct === 100) return "Perfect score! You're a tax expert!";
    if (pct >= 80) return "Excellent! You know your taxes well.";
    if (pct >= 60) return "Good job! A little more reading and you'll ace it.";
    if (pct >= 40) return "Not bad! Check out the Learn section to improve.";
    return "Keep learning! Explore our glossary and guides to build your knowledge.";
  };

  if (isFinished) {
    const pct = Math.round((score / quizzes.length) * 100);
    return (
      <div>
        <PageHeader title="Quiz Results" subtitle="See how you did!" />
        <section className="py-10 sm:py-14">
          <div className="container-main max-w-xl text-center">
            <div className="card p-8 sm:p-10">
              <div className="w-24 h-24 rounded-full bg-teal/10 text-teal mx-auto flex items-center justify-center mb-6">
                <span className="text-3xl font-bold">{pct}%</span>
              </div>
              <h2 className="text-2xl font-bold text-navy mb-2">
                {score} / {quizzes.length} Correct
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {getScoreMessage()}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={handleRestart} className="btn-primary">
                  Try Again
                </button>
                <Link to="/learn" className="btn-outline">
                  Back to Learn
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Tax Quiz"
        subtitle={`Question ${currentIndex + 1} of ${quizzes.length}`}
      />

      <section className="py-10 sm:py-14">
        <div className="container-main max-w-2xl">
          <div className="flex items-center gap-1.5 mb-6">
            {quizzes.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i < currentIndex
                    ? "bg-teal"
                    : i === currentIndex
                    ? "bg-teal/50"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-1">
              <span className="badge bg-navy/5 text-navy/60">
                Question {currentIndex + 1}
              </span>
              <span className="text-sm text-gray-400">
                Score: {score}/{currentIndex}
              </span>
            </div>
            <h2 className="text-xl font-bold text-navy mt-3 mb-6">
              {current.question}
            </h2>

            <div className="space-y-3">
              {current.options.map((option, i) => {
                let classes =
                  "w-full text-left p-4 rounded-xl border-2 transition-all text-sm font-medium ";
                if (!isAnswered) {
                  classes +=
                    "border-gray-200 hover:border-teal/40 hover:bg-teal/5 cursor-pointer";
                } else if (i === current.answerIndex) {
                  classes +=
                    "border-emerald-400 bg-emerald-50 text-emerald-700";
                } else if (i === selectedOption) {
                  classes += "border-red-400 bg-red-50 text-red-700";
                } else {
                  classes += "border-gray-100 text-gray-400";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={classes}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isAnswered && i === current.answerIndex
                            ? "bg-emerald-400 text-white"
                            : isAnswered && i === selectedOption
                            ? "bg-red-400 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                className={`mt-6 p-4 rounded-xl border ${
                  isCorrect
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <p className="text-sm font-semibold mb-1">
                  {isCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {current.explanation}
                </p>
              </div>
            )}

            {isAnswered && (
              <div className="mt-6 flex justify-end">
                <button onClick={handleNext} className="btn-primary">
                  {currentIndex < quizzes.length - 1
                    ? "Next Question"
                    : "See Results"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
