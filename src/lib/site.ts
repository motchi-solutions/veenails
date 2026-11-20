/* Site identity. Shared Motchi standard (AGENTS.md, "Website standard"). */
export const site = {
    name: "Vee's Nail Studio",
    /** Production origin. veenailstudio.ca redirects here. */
    url: "https://www.veenailstudio.ca",
    /** The separate booking app. */
    bookingUrl: "https://booking.veenailstudio.ca",
    description:
        "Vee's Nail Studio is run by a certified nail artist in downtown Toronto. Book gel nails, custom nail art, and modern manicure services for a relaxed, one-of-a-kind nail experience.",
    locale: "en_CA",
    social: ["https://www.instagram.com/vee.nailsstudio", "https://tiktok.com/@vee.nailstudio"],
} as const;

/* Site URLs and indexing. Shared Motchi standard (AGENTS.md, "Website standard").

   The production origin is set in site.url, so no environment variable is
   needed. SITE_URL (server-only, optional) overrides it, for example for
   another local port. Vercel sets VERCEL_ENV and VERCEL_BRANCH_URL. */

const localUrl = "http://localhost:3000";

/** This deployment's origin: SITE_URL if set, localhost in development, the
    branch URL on Vercel previews, otherwise the production origin. */
export function siteUrl(): string {
    const override = process.env.SITE_URL?.trim();
    if (override) return override.replace(/\/+$/, "");
    if (process.env.NODE_ENV === "development") return localUrl;
    const branchUrl = process.env.VERCEL_BRANCH_URL?.trim();
    if (process.env.VERCEL_ENV === "preview" && branchUrl) return `https://${branchUrl}`;
    return site.url;
}

/** Absolute URL on this deployment, for metadata, sitemaps, emails and redirects. */
export function absoluteUrl(path = "/"): string {
    return new URL(path, `${siteUrl()}/`).href;
}

/** Search engines may index Vercel Production only. Previews and local builds
    are served with noindex and a robots.txt that keeps crawlers out. */
export function indexingAllowed(): boolean {
    return process.env.VERCEL_ENV === "production";
}
