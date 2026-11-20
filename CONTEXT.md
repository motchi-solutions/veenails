# Project context: Vee's Nail Studio website

Read this with [AGENTS.md](AGENTS.md) before every task. This file holds the rules that apply only to this project.

## Project

- Public website for Vee's Nail Studio (`https://www.veenailstudio.ca`): services, pricing, design tiers, gallery, policies, FAQs and testimonials. Booking is a separate app (`veenails-booking`, `https://booking.veenailstudio.ca`).
- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Supabase (read-only public content), Swiper, React Icons. Node 26 (`.nvmrc`).
- Branch model: develop flow. `develop` deploys to Vercel Preview, `main` to Production.

## Commands

| Task | Command |
| --- | --- |
| Install | `npm ci` |
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |
| Build | `npm run build` |
| Dependency tracker | `npm run dependencies:inventory` |
| Skill tracker | `npm run skills:inventory` |

## Project-specific rules

- Analytics: Vercel Web Analytics via `src/lib/analytics.ts` and `src/components/analytics/site-analytics.tsx` (Production only, path plus `utm_*` tags). Enable it in the Vercel project's Analytics tab.
- Content comes from Supabase tables (`pricing_*`, `design_tier*`, `gallery_*`, `policies`, `faqs`, `aftercare_instructions`, `testimonials`). Show only active public rows.
- `npm run build` needs `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, because pages are prerendered from Supabase. CI checks lint and types only. Vercel does the build.
- The Supabase skills can reach Supabase. Use them only with explicit approval, and never write to production data.
- The footer credit links to Motchi with tracking tags: `https://www.motchi.ca/websites?utm_source=<client>&utm_medium=referral&utm_campaign=client-footer`. Keep this format if you change the footer.

## Design skills

The design skills in `.agents/skills/` were imported from motchi-website for later clean-up passes. Use only the ones that fit the task. This client's brand and approved content always win over skill defaults. Never invent content, reviews, prices or claims.

Suggested order for major UI work: hallmark (audit only) > frontend-design > better-layout > design-systems-frontend-architecture > frontend-ui-engineering > modern-web-guidance > ux-writing > apple-design > unslop (final polish) > web-design-guidelines (final QA) > untangle-codebase (only for real structural problems).

- modern-web-guidance: run only `.agents/skills/modern-web-guidance/mwg search|list|retrieve`. It is offline with telemetry off. Never run `npx modern-web-guidance`.
- web-design-guidelines fetches its rules from GitHub. The hallmark and unslop helpers can open browsers, download images or call image APIs. All of these need explicit approval first.
