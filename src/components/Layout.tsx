"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeedbackWidget from "./FeedbackWidget";
import LeadCapturePopup from "./LeadCapturePopup";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FeedbackWidget />
      <LeadCapturePopup />
    </div>
  );
}
