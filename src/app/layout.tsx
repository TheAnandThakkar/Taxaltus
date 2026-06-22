import Providers from "./providers";
import Layout from "@/components/Layout";
import PWARegister from "@/components/PWARegister";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ASSESSMENT_YEAR_LABELS, ASSESSMENT_YEARS_AND, ASSESSMENT_YEARS_LIST } from '@/lib/taxYears';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://taxaltus.com'),
    title: {
        default: "Income Tax Companion for Indian Salaried Employees - Taxaltus",
        template: "%s | Taxaltus",
    },
    description: `Taxaltus is a non-profit tax education initiative and income tax companion for Indian salaried employees. Free full income tax calculator for ${ASSESSMENT_YEARS_AND}, the new Income-tax Act 2025 and new tax slabs, old vs new regime comparison, HRA, Form 16, Section 87A/156 rebate and notices.`,
    alternates: {
        canonical: "https://taxaltus.com",
    },
    category: "finance",
    keywords: [
        "income tax calculator",
        "income tax calculator India",
        "tax estimator",
        "tax estimation",
        "income tax notice",
        "income tax notice decoder",
        "HRA calculator",
        "HRA calculation",
        "Taxaltus",
        "Anand Thakkar",
        "non-profit tax education initiative",
        ...ASSESSMENT_YEAR_LABELS.map((label) => `${label} tax calculator`),
        "full income tax calculator",
        "tax calculator",
        "new income tax act",
        "new income tax act 2025",
        "income tax act 2025",
        "income tax act 2025 sections",
        "new tax slabs",
        "new income tax slabs 2025",
        "income tax slabs FY 2026-27",
        "new tax regime calculator",
        "new tax regime slabs",
        "old vs new tax regime",
        "difference between old and new income tax act",
        "difference between new income tax and old income tax act",
        "tax year vs assessment year",
        "section 80C new section 123",
        "section 87A new section 156",
        "section 115BAC new section 202",
        "Section 87A rebate",
        "Form 16 guide",
        "advance tax calculator",
        "capital gains tax calculator",
        "How to file ITR",
        "Which ITR should file"
    ],
    authors: [{ name: "Anand Thakkar" }],
    creator: "Anand Thakkar",
    publisher: "Taxaltus",
    icons: {
        icon: '/favicon.png',
        apple: '/icon.png',
    },
    openGraph: {
        title: "Income Tax Companion for Indian Salaried Employees - Taxaltus",
        description: "Learn and estimate Indian income tax, compare old vs new regime, understand HRA, 87A rebate, advance tax, Form 16 and income tax notices with Taxaltus.",
        url: "https://taxaltus.com",
        siteName: "Taxaltus",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/og-taxaltus.png",
                width: 2400,
                height: 1260,
                alt: "Taxaltus income tax companion for Indian salaried employees",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Income Tax Companion India - Taxaltus",
        description: `Educational calculators and guides for Indian salaried taxpayers: ${ASSESSMENT_YEARS_LIST}, HRA, Form 16, 87A and notices.`,
        images: ["/og-taxaltus.png"],
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
        <html lang="en" className={inter.variable}>
            <body className="font-sans antialiased min-h-screen flex flex-col">
                <PWARegister />
                <StructuredData />
                <Providers>
                    <Layout>
                        {children}
                    </Layout>
                </Providers>
            </body>
        </html>
    );
}
