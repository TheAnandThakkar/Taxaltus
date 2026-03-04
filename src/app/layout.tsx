import Providers from "./providers";
import Layout from "@/components/Layout";
import PWARegister from "@/components/PWARegister";
import "./globals.css";

import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://taxaltus.com'),
    title: {
        default: "Taxaltus - The Ultimate Income Tax Companion",
        template: "%s | Taxaltus",
    },
    description: "Taxaltus helps Indian salaried employees understand Form 16, explore deductions, compare tax regimes (Old vs New), and prepare for tax filing. Free tax calculators and guides.",
    keywords: [
        "Income Tax",
        "Income Tax Companion",
        "Tax Calculation",
        "New Income Tax Rules",
        "Latest Income Tax Rules",
        "How to file ITR",
        "Which ITR should file",
        "What is TDS",
        "HRA Calculations",
        "New Tax Regime Comparision",
        "Old vs New Tax Regime",
        "taxaltus",
        "Anand Thakkar",
        "Form 16 guide",
        "Section 87A rebate",
        "Advance tax calculator",
        "Capital gains tax calculator"
    ],
    authors: [{ name: "Anand Thakkar" }],
    creator: "Anand Thakkar",
    publisher: "Taxaltus",
    icons: {
        icon: '/favicon.png',
        apple: '/icon.png',
    },
    openGraph: {
        title: "Taxaltus - The Ultimate Income Tax Companion",
        description: "Your trusted companion for understanding Indian income tax. Calculate your takes, find deductions, and prepare your ITR.",
        url: "https://taxaltus.com",
        siteName: "Taxaltus",
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Taxaltus - Income Tax Companion",
        description: "Understand Indian income tax effortlessly. Calculators, guides, and tax planning tools.",
    },
    manifest: '/manifest.json',
};

export const viewport: Viewport = {
    themeColor: '#0F172A', // navy color
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen flex flex-col">
                <PWARegister />
                <Providers>
                    <Layout>
                        {children}
                    </Layout>
                </Providers>
            </body>
        </html>
    );
}
