import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { pillars, timeline } from '@/content/company'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { Img } from '@/components/Img'
import { CtaBand, Particulars, PartnersGrid } from '@/components/sections'
import { RunningHead, Section, SectionHeading } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/about', t.about.title, t.about.body, '/images/hero/spice-harvest.webp')
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  const { lat, lng } = site.address.geo
  return (
    <>
      <PageHero locale={locale} no="005" eyebrow={t.about.eyebrow} title={t.about.title} body={t.about.body} image="/images/wheat-rice/wheat-field.webp" caption={ar ? 'شكل — حقول الحصاد' : 'Fig. — Harvest fields'} crumbs={[{ label: t.nav.about }]} />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RunningHead no="01">{t.about.mission}</RunningHead>
            <p data-reveal className="mt-8 font-display text-4xl leading-[1.1] sm:text-5xl">{t.about.missionBody}</p>
            <p data-reveal className="mt-10 font-serif text-lg leading-relaxed text-ink-2">{t.home.farmBody}</p>
          </div>
          <div className="lg:col-span-5">
            <RunningHead no="02">{t.ledger.particulars}</RunningHead>
            <div className="mt-8"><Particulars locale={locale} /></div>
          </div>
        </div>
      </Section>

      <Section tone="paper-2" className="border-y border-ink">
        <SectionHeading no="03" kicker={t.ledger.chronicle} title={t.about.timeline} />
        <ol className="border-t border-ink">
          {timeline.map((s) => (
            <li key={s.year} data-reveal className="grid gap-6 border-b border-rule py-10 md:grid-cols-12">
              <p className="font-display text-8xl leading-none text-wax md:col-span-4 lg:text-9xl" dir="ltr">{s.year}</p>
              <div className="md:col-span-8 md:pt-3">
                <h3 className="font-display text-3xl">{tr(s.title, locale)}</h3>
                <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink-2">{tr(s.body, locale)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading no="04" kicker={t.about.values} title={ar ? 'مبادئ الدار' : 'Principles of the house'} />
        <dl className="grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={i} data-reveal className="bg-paper p-7">
              <dt>
                <span className="label text-wax">{String(i + 1).padStart(2, '0')}</span>
                <span className="mt-4 block font-display text-2xl">{tr(p.title, locale)}</span>
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-2">{tr(p.body, locale)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="paper-2" className="border-y border-ink">
        <SectionHeading no="05" kicker={t.ledger.correspondents} title={t.home.partnersTitle} />
        <PartnersGrid />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RunningHead no="06">{t.about.whereTitle}</RunningHead>
            <p className="mt-8 font-serif text-xl leading-relaxed text-ink-2">{t.about.whereBody}</p>
            <address className="mt-8 border-t border-ink pt-4 not-italic">
              <p className="font-display text-2xl">{site.name}</p>
              <p className="mt-1 text-ink-2">{tr(site.address.lines, locale)}</p>
              <p className="label mt-3 text-muted" dir="ltr">{lat.toFixed(4)}°N · {lng.toFixed(4)}°E</p>
            </address>
          </div>
          <div className="border border-ink lg:col-span-7">
            <iframe
              title={tr(site.address.lines, locale)}
              src={`https://www.google.com/maps?q=${lat},${lng}&z=10&output=embed&hl=${locale}`}
              className="h-96 w-full border-0 grayscale-[0.6] sepia-[0.2]"
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
