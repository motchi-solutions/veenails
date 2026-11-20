import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

/** Public pages. Add new public routes here. */
const publicRoutes = ["/", "/pricing", "/gallery", "/privacy-policy", "/terms-of-service"];

export default function sitemap(): MetadataRoute.Sitemap {
    return publicRoutes.map((path) => ({ url: absoluteUrl(path) }));
}
