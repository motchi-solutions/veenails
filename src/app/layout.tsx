import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { SiteAnalytics } from "@/components/analytics/site-analytics";
import { analyticsEnabled } from "@/lib/analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { indexingAllowed, site, siteUrl } from "@/lib/site";

const geistSans = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

const fraunces = Fraunces({
    variable: "--font-display",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Vee's Nail Studio",
        template: "%s | Vee's Nail Studio",
    },
    description:
        "Vee's Nail Studio is run by a certified nail artist in downtown Toronto. Book gel nails, custom nail art, and modern manicure services for a relaxed, one-of-a-kind nail experience.",
    applicationName: "Vee's Nail Studio",
    appleWebApp: {
        title: "Vee's Nails",
        capable: true,
        statusBarStyle: "default",
    },
    metadataBase: new URL(siteUrl()),
    openGraph: {
        type: "website",
        siteName: site.name,
        locale: site.locale,
    },
    twitter: { card: "summary_large_image" },
    robots: indexingAllowed() ? undefined : { index: false, follow: false },
};

/* Business details for search engines. Only facts shown on the site. */
const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: site.name,
    url: site.url,
    image: `${site.url}/opengraph-image.png`,
    description: site.description,
    address: {
        "@type": "PostalAddress",
        addressLocality: "Toronto",
        addressRegion: "ON",
        addressCountry: "CA",
    },
    areaServed: "Toronto",
    sameAs: site.social,
    potentialAction: {
        "@type": "ReserveAction",
        target: site.bookingUrl,
    },
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
            data-scroll-behavior="smooth"
        >
            <body className="min-h-dvh bg-background text-foreground antialiased">
                <JsonLd data={businessJsonLd} />
                <Navbar />
                {children}
                <Footer />
                {analyticsEnabled() && <SiteAnalytics />}
            </body>
        </html>
    );
}
