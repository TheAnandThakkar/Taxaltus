"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function FeedbackWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "suggestion", // suggestion, mistake, other
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.message.trim()) return;

        setStatus("submitting");

        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to submit feedback");

            setStatus("success");
            setTimeout(() => {
                setIsOpen(false);
                setStatus("idle");
                setFormData({ name: "", email: "", type: "suggestion", message: "" });
            }, 3000);
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[60] p-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
                aria-label="Feedback"
            >
                <MessageSquare className="w-6 h-6 group-hover:animate-pulse" />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-0">
                    <div
                        className="absolute inset-0 bg-blue-50/70 backdrop-blur-sm cursor-pointer"
                        onClick={() => status !== "submitting" && setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="bg-navy p-5 flex items-center justify-between text-white">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-teal-400" />
                                Give Feedback
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                disabled={status === "submitting"}
                                className="p-1.5 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {status === "success" ? (
                                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-500 mb-2">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-bold text-navy">Thank You!</h4>
                                    <p className="text-gray-600">Your feedback has been sent successfully. We appreciate your input to make Taxaltus better!</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-start gap-2.5">
                                        <div className="mt-0.5 text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                        </div>
                                        <p className="text-xs text-blue-800 leading-relaxed font-medium">
                                            While name and email are optional, we urge you to provide them so we can stay in touch and improve your experience.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name (Optional)</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm bg-white shadow-sm"
                                                placeholder="John Doe"
                                                disabled={status === "submitting"}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm bg-white shadow-sm"
                                                placeholder="john@example.com"
                                                disabled={status === "submitting"}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
                                        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl rounded-lg">
                                            {(["suggestion", "mistake", "other"] as const).map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, type })}
                                                    disabled={status === "submitting"}
                                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all cursor-pointer shadow-sm ${formData.type === type
                                                        ? "bg-white text-navy"
                                                        : "text-gray-500 hover:text-gray-900 shadow-none border border-transparent"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message <span className="text-red-500">*</span></label>
                                            <span className={`text-xs ${formData.message.length > 2000 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                                                {formData.message.length}/2000
                                            </span>
                                        </div>
                                        <textarea
                                            id="message"
                                            required
                                            maxLength={2000}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 2000) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm min-h-[120px] resize-y bg-white shadow-sm"
                                            placeholder="Tell us what you think..."
                                            disabled={status === "submitting"}
                                        />
                                    </div>

                                    {status === "error" && (
                                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                            Something went wrong. Please try again later.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "submitting" || !formData.message.trim()}
                                        className="w-full py-2.5 px-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:bg-navy disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {status === "submitting" ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Send Feedback
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
