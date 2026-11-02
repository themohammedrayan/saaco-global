# SAACO Global — website

Bilingual (English / Arabic) B2B export website for **SAACO Global**, Perinthalmanna, Kerala, India.

- **Stack:** Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS 4 · lucide icons
- **Hosting:** Vercel. `vercel.json` handles the `/` → `/en` or `/ar` language redirect (Accept-Language) and the security/cache headers
- **No backend.** Enquiries are composed in the browser and sent by the buyer through WhatsApp or email

## Features for buyers

| Feature | Where |
|---|---|
| English + Arabic (full RTL), hreflang, language switcher | `src/i18n/`, `app/[locale]/` |
| 7 product categories with spec tables, indicative HS codes and galleries | `src/content/products.ts` |
| **Quote basket**: add products, set qty/unit, send one RFQ by WhatsApp or email with a reference ID (`SG-YYMMDD-XXXX`) | `src/lib/enquiry.ts`, `src/components/QuoteForm.tsx` |
| Sample requests (one click from any category) | `RequestSamples` in `src/components/AddToQuote.tsx` |
| Downloadable PDF catalogue, regenerated from content on every build | `scripts/build-catalogue.mjs` → `public/catalogue/` |
| Export guide: Incoterms, documents, payment terms, shipping, QA | `src/content/export.ts` |
| Importer FAQ (with FAQPage structured data) | `src/content/faq.ts` |
| Markets map, partners strip, Kerala local-time clock, WhatsApp button | `src/components/` |
| SEO: per-page metadata, OG/Twitter cards, sitemap with alternates, robots, Organization/LocalBusiness/Product JSON-LD | `src/lib/seo.ts`, `app/sitemap.ts` |
| Vercel Web Analytics + Speed Insights (cookieless) | `app/[locale]/layout.tsx` |

## Editing content

All text lives in `src/content/*.ts` (business content) and `src/i18n/dict.ts` (UI strings). Every string has an `en` and an `ar` value.

- Contact details, address, port, stats, social links and certifications: `src/content/site.ts`
- Products: `src/content/products.ts`. Images go in `public/images/<category>/`. Add their size to `src/content/image-dims.json`
- Social links and certification badges stay hidden until filled in

## ⚠️ Confirm before launch: `TODO(verify)`

These are sensible defaults and **must be confirmed by the business**:

1. **Arabic copy.** Have a native speaker review it
2. **Legal entity name** (`site.legalName`)
3. **Export gateway:** Cochin port and airport, and FOB/CIF/CFR terms (`site.port`, `content/export.ts`)
4. **Payment terms**, **documents** and **MOQ / samples** wording (`content/export.ts`, `content/faq.ts`, product specs)
5. **Product list, forms and HS codes.** HS codes are indicative
6. **Partner logos** (`content/company.ts → partners`). They come from the "Companies we work with" section of the old saacoglobal.com. Remove any company that hasn't agreed to be shown
7. **Certifications** (IEC, FSSAI, APEDA, Spices Board…). Add them to `site.certifications` only if held
8. **Stats** (`content/site.ts → stats`)
9. **Domain.** Set `NEXT_PUBLIC_SITE_URL` in Vercel once the custom domain is connected. It defaults to `https://saacoglobal.com`

## Commands

```bash
npm install
npm run dev        # http://localhost:3000/en
npm test           # unit tests (enquiry formatting, quote basket)
npm run typecheck
npm run build      # generates catalogue PDF, then static export to out/
```
