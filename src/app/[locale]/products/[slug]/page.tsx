import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { href, locales, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories, getCategory } from '@/content/products'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { AddToQuote, RequestSamples } from '@/components/AddToQuote'
import { CategoryCard, CtaBand } from '@/components/sections'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { ButtonLink, Container, Section } from '@/components/ui'

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
  const others = categories.filter((o) => o.slug !== c.slug).slice(0, 3)
  const sampleLines = c.items.map((i) => ({ id: i.id, name: i.name.en, category: c.name.en }))

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t.products.eyebrow}
        title={tr(c.name, locale)}
        body={tr(c.short, locale)}
        image={c.cover}
        crumbs={[{ label: t.nav.products, path: '/products' }, { label: tr(c.name, locale) }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={href(locale, '/quote')}>{t.common.requestQuote} <ArrowRight className="flip-rtl size-4" aria-hidden /></ButtonLink>
          <RequestSamples locale={locale} lines={sampleLines} />
        </div>
      </PageHero>

      <Section tone="cream">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p data-reveal className="text-lg leading-relaxed text-ink/85 first-letter:float-start first-letter:me-3 first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-saffron-600 rtl:first-letter:float-none rtl:first-letter:text-inherit rtl:first-letter:me-0">
              {tr(c.intro, locale)}
            </p>
            <h2 className="mt-14 font-display text-3xl text-forest-900">{t.products.items}</h2>
            <ul className="mt-6 grid gap-4">
              {c.items.map((i) => (
                <li key={i.id} data-reveal className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
                  <div>
                    <h3 className="font-display text-xl text-forest-900">{tr(i.name, locale)}</h3>
                    <p className="mt-1 text-sm text-muted">{t.products.forms}: {tr(i.forms, locale)}</p>
                    <p className="mt-1 text-xs text-muted/80">{t.common.indicativeHs}: <span dir="ltr" className="font-mono">{i.hs}</span></p>
                  </div>
                  <AddToQuote locale={locale} id={i.id} name={i.name.en} category={c.name.en} />
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
              <h2 className="bg-forest-900 px-6 py-4 font-display text-xl text-white">{t.products.specs}</h2>
              <dl className="divide-y divide-line">
                {c.specs.map((s, idx) => (
                  <div key={idx} className="grid grid-cols-[8rem_1fr] gap-4 px-6 py-4 text-sm">
                    <dt className="font-semibold text-forest-900">{tr(s.label, locale)}</dt>
                    <dd className="text-muted">{tr(s.value, locale)}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[8rem_1fr] gap-4 px-6 py-4 text-sm">
                  <dt className="font-semibold text-forest-900">{locale === 'ar' ? 'الشحن' : 'Shipping'}</dt>
                  <dd className="text-muted">FOB / CIF — {tr(site.port, locale)}</dd>
                </div>
              </dl>
              <p className="border-t border-line bg-sand/60 px-6 py-4 text-xs leading-relaxed text-muted">{t.products.specNote}</p>
            </div>
          </aside>
        </div>
      </Section>

      <section className="bg-white py-20">
        <Container>
          <h2 className="mb-8 font-display text-3xl text-forest-900">{t.products.gallery}</h2>
          <div className="grid auto-rows-[14rem] grid-cols-2 gap-4 md:grid-cols-4">
            {c.gallery.map((g, i) => (
              <figure key={g.src} data-reveal className={`relative overflow-hidden rounded-2xl bg-sand ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <Img src={g.src} alt={tr(g.alt, locale)} fill sizes={i === 0 ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 25vw, 50vw'} className="object-cover transition-transform duration-700 hover:scale-105" />
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <Section tone="sand">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl text-forest-900">{t.products.otherCategories}</h2>
          <Link href={href(locale, '/products')} className="inline-flex items-center gap-2 text-sm font-semibold text-forest-800 hover:text-saffron-600">
            <ArrowLeft className="flip-rtl size-4" aria-hidden /> {t.common.backToProducts}
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {others.map((o) => <CategoryCard key={o.slug} c={o} locale={locale} />)}
        </div>
      </Section>

      <CtaBand locale={locale} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: tr(c.name, locale),
        itemListElement: c.items.map((i, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'Product',
            name: tr(i.name, locale),
            description: `${tr(i.forms, locale)} — ${tr(c.short, locale)}`,
            image: `${site.url}${c.cover}`,
            category: tr(c.name, locale),
            brand: { '@type': 'Brand', name: site.name },
            countryOfOrigin: 'IN',
          },
        })),
      }} />
    </>
  )
}
