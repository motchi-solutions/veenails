import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    // Accept a full URL or a bare host, like sitemap.ts.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        ? process.env.NEXT_PUBLIC_BASE_URL.startsWith("http")
            ? process.env.NEXT_PUBLIC_BASE_URL
            : `https://${process.env.NEXT_PUBLIC_BASE_URL}`
        : "http://localhost:3000";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
