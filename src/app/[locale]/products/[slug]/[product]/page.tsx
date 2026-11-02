import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, Globe, MapPin, Package, Ship } from 'lucide-react'
import { href, locales, tr, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories, getCategory } from '@/content/products'
import { details, whySaaco } from '@/content/product-details'
import { site, waLink } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { AddToQuote, RequestSamples } from '@/components/AddToQuote'
import { Checklist, CtaBand, ProductCard, enquireText } from '@/components/sections'
import { Img } from '@/components/Img'
import { WhatsAppIcon } from '@/components/Icon'
import { JsonLd } from '@/components/JsonLd'
import { Kicker, Section, SectionTitle } from '@/components/ui'

export const dynamicParams = false
export const generateStaticParams = () =>
  locales.flatMap((locale) => categories.flatMap((c) => c.items.map((i) => ({ locale, slug: c.slug, product: i.id }))))

function resolve(slug: string, product: string) {
  const c = getCategory(slug)
  const i = c?.items.find((x) => x.id === product)
  return c && i ? { c, i } : null
}

export async function generateMetadata({ params }: PageProps<'/[locale]/products/[slug]/[product]'>) {
  const locale = await getLocale(params)
  const { slug, product } = await params
  const r = resolve(slug, product)
  if (!r) return {}
  const d = details[r.i.id]
  const suffix = locale === 'ar' ? 'مصدّر من الهند' : 'Exporter from India'
  return pageMeta(locale, `/products/${r.c.slug}/${r.i.id}`, `${tr(r.i.name, locale)} — ${suffix}`, d ? d.desc : r.c.short, r.i.image)
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-md bg-mist px-4 py-3">
      <span className="mt-0.5 text-gold-600">{icon}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p>
        <p className="text-sm font-semibold text-navy-900">{value}</p>
      </div>
    </div>
  )
}

export default async function ProductPage({ params }: PageProps<'/[locale]/products/[slug]/[product]'>) {
  const locale: Locale = await getLocale(params)
  const { slug, product } = await params
  const r = resolve(slug, product)
  if (!r) notFound()
  const { c, i } = r
  const t = getDict(locale)
  const ar = locale === 'ar'
  const d = details[i.id]
  const name = tr(i.name, locale)
  const gallery = [i.image, ...c.gallery.map((g) => g.src).filter((s) => s !== i.image)].slice(0, 4)
  const related = [
    ...c.items.filter((x) => x.id !== i.id).map((x) => ({ c, i: x })),
    ...categories.filter((o) => o.slug !== c.slug).map((o) => ({ c: o, i: o.items[0] })),
  ].slice(0, 4)
  const line = { id: i.id, name: i.name.en, category: c.name.en }

  return (
    <>
      <PageBanner
        locale={locale}
        eyebrow={tr(c.name, locale)}
        title={name}
        image={c.cover}
        crumbs={[{ label: t.nav.products, path: '/products' }, { label: tr(c.name, locale), path: `/products/${c.slug}` }, { label: name }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-mist shadow-card">
              <Img src={gallery[0]} alt={name} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="photo object-cover" />
              <span className="absolute start-3 top-3 rounded bg-navy-900/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">{tr(c.name, locale)}</span>
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {gallery.slice(1).map((g) => (
                  <div key={g} className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-mist">
                    <Img src={g} alt="" fill sizes="(min-width:1024px) 15vw, 30vw" className="photo object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <Kicker>{ar ? 'تفاصيل المنتج' : 'Product details'}</Kicker>
            <h2 className="font-heading text-3xl font-black uppercase leading-tight text-navy-900 sm:text-4xl">{name}</h2>
            {i.latin && <p className="mt-1 italic text-muted" dir="ltr">{i.latin}</p>}
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-2">{d ? tr(d.desc, locale) : tr(c.intro, locale)}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoRow icon={<Package className="size-4" />} label={t.products.forms} value={tr(i.forms, locale)} />
              <InfoRow icon={<MapPin className="size-4" />} label={ar ? 'المنشأ' : 'Origin'} value={tr(c.specs.find((s) => s.label.en === 'Origin')?.value ?? { en: 'India', ar: 'الهند' }, locale)} />
              <InfoRow icon={<Globe className="size-4" />} label={t.common.indicativeHs} value={i.hs} />
              <InfoRow icon={<Ship className="size-4" />} label={ar ? 'الشحن' : 'Shipping'} value={`FOB / CIF — ${ar ? 'كوتشين' : 'Cochin'}`} />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 [&_button]:w-full [&_a]:w-full">
              <div className="[&>*]:!py-3.5 [&>*]:!text-sm"><AddToQuote locale={locale} id={i.id} name={i.name.en} category={c.name.en} /></div>
              <div className="text-navy-800"><RequestSamples locale={locale} lines={[line]} /></div>
              <a
                href={waLink(enquireText(locale, i.name.en))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-md bg-[#25D366] px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1eb956] sm:col-span-2"
              >
                <WhatsAppIcon className="size-5" /> {ar ? 'استفسر عبر واتساب' : 'Enquire on WhatsApp'}
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">{tr(site.contact.responseTime, locale)}</p>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-6 lg:grid-cols-3">
          {d && (
            <div className="rounded-lg border border-line bg-white p-6 shadow-card">
              <h3 className="mb-4 font-heading text-lg font-extrabold uppercase text-navy-900">{ar ? 'المزايا الرئيسية' : 'Key features'}</h3>
              <Checklist items={d.features.map((x) => tr(x, locale))} />
            </div>
          )}
          {d && (
            <div className="rounded-lg border border-line bg-white p-6 shadow-card">
              <h3 className="mb-4 font-heading text-lg font-extrabold uppercase text-navy-900">{ar ? 'الاستخدامات' : 'Uses'}</h3>
              <Checklist items={d.uses.map((x) => tr(x, locale))} />
            </div>
          )}
          <div className="rounded-lg bg-navy-900 p-6 text-white shadow-card">
            <h3 className="mb-4 font-heading text-lg font-extrabold uppercase">{ar ? `لماذا ${name} من ساكو؟` : `Why SAACO ${name}?`}</h3>
            <Checklist light items={whySaaco.map((x) => tr(x, locale))} />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-white shadow-card">
          <h3 className="bg-navy-900 px-5 py-4 font-heading text-base font-extrabold uppercase text-white">{t.products.specs}</h3>
          <dl className="grid md:grid-cols-2">
            {[
              ...c.specs.map((s) => [tr(s.label, locale), tr(s.value, locale)] as const),
              [t.common.indicativeHs, i.hs] as const,
              [ar ? 'شروط التسليم' : 'Incoterms', `FOB · CIF · CFR — ${tr(site.port, locale)}`] as const,
            ].map(([k, v], n) => (
              <div key={n} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line px-5 py-3.5 text-sm md:odd:border-e">
                <dt className="font-bold text-navy-800">{k}</dt>
                <dd className="text-ink-2" dir="auto">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="bg-gold-50 px-5 py-3 text-xs text-muted">{t.products.specNote}</p>
        </div>
      </Section>

      <Section>
        <SectionTitle
          kicker={ar ? 'قد يعجبك أيضًا' : 'You may also need'}
          title={ar ? 'منتجات ذات صلة' : 'Related products'}
          action={<Link href={href(locale, '/products')} className="inline-flex items-center gap-2 text-sm font-bold uppercase text-navy-800 hover:text-gold-600">{t.v3.viewAll} <ArrowRight className="flip-rtl size-4" /></Link>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((x) => <ProductCard key={x.i.id} c={x.c} i={x.i} locale={locale} />)}
        </div>
      </Section>

      <CtaBand locale={locale} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            name,
            description: d ? tr(d.desc, locale) : tr(c.short, locale),
            image: `${site.url}${i.image}`,
            category: tr(c.name, locale),
            brand: { '@type': 'Brand', name: site.name },
            countryOfOrigin: 'IN',
            url: `${site.url}${href(locale, `/products/${c.slug}/${i.id}`)}`,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: t.nav.home, item: `${site.url}${href(locale)}` },
              { '@type': 'ListItem', position: 2, name: t.nav.products, item: `${site.url}${href(locale, '/products')}` },
              { '@type': 'ListItem', position: 3, name: tr(c.name, locale), item: `${site.url}${href(locale, `/products/${c.slug}`)}` },
              { '@type': 'ListItem', position: 4, name },
            ],
          },
        ],
      }} />
    </>
  )
}
