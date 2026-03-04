export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 backdrop-blur-sm relative z-50">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-teal/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-teal rounded-full border-t-transparent animate-spin"></div>
                    {/* Inner Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-navy rounded-sm opacity-20"></div>
                    </div>
                </div>
                <p className="text-sm font-semibold text-teal tracking-widest uppercase animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
