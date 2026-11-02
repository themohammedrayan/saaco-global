import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { pillars, timeline } from '@/content/company'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { Icon } from '@/components/Icon'
import { Img } from '@/components/Img'
import { CtaBand, PartnersMarquee, StatsBand } from '@/components/sections'
import { Container, Section, SectionHeading } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/about', t.about.title, t.about.body, '/images/hero/spice-harvest.webp')
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const { lat, lng } = site.address.geo
  return (
    <>
      <PageHero locale={locale} eyebrow={t.about.eyebrow} title={t.about.title} body={t.about.body} image="/images/wheat-rice/wheat-field.webp" crumbs={[{ label: t.nav.about }]} />

      <Section tone="cream">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="relative aspect-square overflow-hidden rounded-[2rem]">
            <Img src="/images/hero/spice-harvest.webp" alt={locale === 'ar' ? 'توابل كيرالا' : 'Spices of Kerala'} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow={t.about.mission} title={tr(site.tagline, locale)} body={t.about.missionBody} />
            <p data-reveal className="mt-6 leading-relaxed text-muted">{t.home.farmBody}</p>
          </div>
        </div>
      </Section>

      <StatsBand locale={locale} />

      <Section tone="white">
        <SectionHeading eyebrow={t.home.storyEyebrow} title={t.about.timeline} center className="mb-16" />
        <ol className="relative mx-auto max-w-4xl">
          <span aria-hidden className="absolute inset-y-0 start-6 w-px bg-line md:start-1/2" />
          {timeline.map((s, i) => (
            <li key={s.year} data-reveal className="relative mb-12 grid gap-4 ps-16 md:grid-cols-2 md:gap-16 md:ps-0">
              <span aria-hidden className="absolute start-6 top-2 z-10 size-4 -translate-x-1/2 rounded-full border-4 border-white bg-saffron-500 ring-1 ring-saffron-500 md:start-1/2 rtl:translate-x-1/2" />
              <div className={i % 2 === 0 ? 'md:text-end' : 'md:order-last'}>
                <p className="font-display text-5xl text-saffron-600" dir="ltr">{s.year}</p>
              </div>
              <div className="rounded-3xl bg-cream p-7 ring-1 ring-line">
                <h3 className="font-display text-2xl text-forest-900">{tr(s.title, locale)}</h3>
                <p className="mt-3 leading-relaxed text-muted">{tr(s.body, locale)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="sand">
        <SectionHeading title={t.about.values} center className="mb-12" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={i} data-reveal className="rounded-3xl bg-white p-7 ring-1 ring-line">
              <Icon name={p.icon} className="size-8 text-saffron-600" />
              <h3 className="mt-5 font-display text-xl text-forest-900">{tr(p.title, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tr(p.body, locale)}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-cream py-20">
        <Container><SectionHeading eyebrow={t.home.partnersEyebrow} title={t.home.partnersTitle} center className="mb-12" /></Container>
        <PartnersMarquee />
      </section>

      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading title={t.about.whereTitle} body={t.about.whereBody} />
          <div className="overflow-hidden rounded-3xl ring-1 ring-line">
            <iframe
              title={tr(site.address.lines, locale)}
              src={`https://www.google.com/maps?q=${lat},${lng}&z=11&output=embed&hl=${locale}`}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  )
}
