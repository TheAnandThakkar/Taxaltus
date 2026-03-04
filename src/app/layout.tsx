import Providers from "./providers";
import Layout from "@/components/Layout";
import PWARegister from "@/components/PWARegister";
import "./globals.css";

export const metadata = {
    title: "Taxaltus - Understand Your Taxes",
    description: "Taxaltus helps Indian salaried employees understand Form 16, explore deductions, compare tax regimes, and prepare for tax filing.",
    icons: {
        icon: '/favicon.png',
        apple: '/icon.png',
    },
    openGraph: {
        title: "Taxaltus",
        description: "Your trusted companion for understanding Indian income tax.",
        url: "https://taxaltus.com",
        siteName: "Taxaltus",
        locale: "en_IN",
        type: "website",
    },
    manifest: '/manifest.json',
};

export const viewport = {
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
