import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { href, locales, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories, getCategory } from '@/content/products'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { RequestSamples } from '@/components/AddToQuote'
import { CategoryTile, CtaBand, FaqList, ProductCard } from '@/components/sections'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { ButtonLink, Section, SectionTitle } from '@/components/ui'

export const dynamicParams = false
export const generateStaticParams = () => locales.flatMap((locale) => categories.map((c) => ({ locale, slug: c.slug })))

export async function generateMetadata({ params }: PageProps<'/[locale]/products/[slug]'>) {
  const locale = await getLocale(params)
  const c = getCategory((await params).slug)
  if (!c) return {}
  const exporter = locale === 'ar' ? 'مصدّر من كيرالا، الهند' : 'Exporter from Kerala, India'
  return pageMeta(locale, `/products/${c.slug}`, `${tr(c.name, locale)} — ${exporter}`, c.short, c.cover)
}

export default async function CategoryPage({ params }: PageProps<'/[locale]/products/[slug]'>) {
  const locale = await getLocale(params)
  const c = getCategory((await params).slug)
  if (!c) notFound()
  const t = getDict(locale)
  const ar = locale === 'ar'
  const others = categories.filter((o) => o.slug !== c.slug)
  const sampleLines = c.items.map((i) => ({ id: i.id, name: i.name.en, category: c.name.en }))

  return (
    <>
      <PageBanner
        locale={locale}
        eyebrow={`${c.items.length} ${ar ? 'منتجات' : 'products'}`}
        title={tr(c.name, locale)}
        body={tr(c.short, locale)}
        image={c.cover}
        crumbs={[{ label: t.nav.products, path: '/products' }, { label: tr(c.name, locale) }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={href(locale, '/quote')}>{t.common.requestQuote} <ArrowRight className="flip-rtl size-4" /></ButtonLink>
          <RequestSamples locale={locale} lines={sampleLines} />
        </div>
      </PageBanner>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionTitle kicker={ar ? 'نظرة عامة' : 'Overview'} title={tr(c.name, locale)} className="!mb-6" />
            <p className="text-[1.05rem] leading-relaxed text-ink-2">{tr(c.intro, locale)}</p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {c.gallery.slice(0, 3).map((g) => (
                <div key={g.src} className="relative aspect-square overflow-hidden rounded-lg bg-mist">
                  <Img src={g.src} alt={tr(g.alt, locale)} fill sizes="(min-width:1024px) 15vw, 30vw" className="photo object-cover" />
                </div>
              ))}
            </div>
          </div>
          <aside className="self-start overflow-hidden rounded-lg border border-line bg-white shadow-card lg:sticky lg:top-32">
            <h2 className="bg-navy-900 px-5 py-4 font-heading text-base font-extrabold uppercase text-white">{t.products.specs}</h2>
            <dl>
              {c.specs.map((s, k) => (
                <div key={k} className={`grid grid-cols-[8.5rem_1fr] gap-4 px-5 py-3.5 text-sm ${k % 2 === 0 ? 'bg-mist/60' : ''}`}>
                  <dt className="font-bold text-navy-800">{tr(s.label, locale)}</dt>
                  <dd className="text-ink-2">{tr(s.value, locale)}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[8.5rem_1fr] gap-4 px-5 py-3.5 text-sm">
                <dt className="font-bold text-navy-800">{ar ? 'الشحن' : 'Shipping'}</dt>
                <dd className="text-ink-2">FOB / CIF — {tr(site.port, locale)}</dd>
              </div>
            </dl>
            <p className="border-t border-line bg-gold-50 px-5 py-3 text-xs leading-relaxed text-muted">{t.products.specNote}</p>
          </aside>
        </div>
      </Section>

      <Section tone="mist">
        <SectionTitle kicker={t.products.eyebrow} title={t.products.items} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((i) => <ProductCard key={i.id} c={c} i={i} locale={locale} />)}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionTitle kicker={t.v3.faqKicker} title={ar ? 'أسئلة قبل الطلب' : 'Before you order'} lead={t.faq.body} />
          <FaqList locale={locale} limit={4} />
        </div>
      </Section>

      <Section tone="cream">
        <SectionTitle kicker={t.products.otherCategories} title={ar ? 'استكشف فئات أخرى' : 'Explore other categories'} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {others.map((o) => <CategoryTile key={o.slug} c={o} locale={locale} />)}
        </div>
      </Section>

      <CtaBand locale={locale} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: tr(c.name, locale),
        itemListElement: c.items.map((i, k) => ({
          '@type': 'ListItem', position: k + 1, name: tr(i.name, locale), url: `${site.url}${href(locale, `/products/${c.slug}/${i.id}`)}`,
        })),
      }} />
    </>
  )
}
