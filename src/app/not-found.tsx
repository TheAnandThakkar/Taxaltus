import Link from "next/link";
import { Search, Home, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <PageHeader
                title="Page Not Found"
                subtitle="Error 404"
                breadcrumbs={[{ label: "Not Found" }]}
            />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="relative">
                        <h1 className="text-9xl font-extrabold text-navy/5 tracking-tighter">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Search className="w-16 h-16 text-teal opacity-80" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-navy">Looks like you're lost!</h2>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            The tax page or form you're looking for doesn't exist or has been moved.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Link
                            href="/"
                            className="inline-flex justify-center items-center gap-2 bg-navy hover:bg-navy/90 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                        >
                            <Home className="w-4 h-4" />
                            Go to Homepage
                        </Link>
                        <Link
                            href="/estimator"
                            className="inline-flex justify-center items-center gap-2 bg-teal/10 hover:bg-teal/20 text-teal-800 font-medium px-6 py-3 rounded-xl transition-colors"
                        >
                            Tax Estimator
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
