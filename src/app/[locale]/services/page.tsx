import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { pillars, services } from '@/content/company'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { Img } from '@/components/Img'
import { CtaBand, ProcessSteps } from '@/components/sections'
import { RunningHead, Section, SectionHeading, cx } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/services'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/services', t.services.title, t.services.body, '/images/services/production.webp')
}

const roman = ['I', 'II', 'III']

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  return (
    <>
      <PageHero locale={locale} no="004" eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.body} crumbs={[{ label: t.nav.services }]} />
      <Section>
        <div className="space-y-24">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-start">
              <div data-reveal className={cx('lg:col-span-6', i % 2 === 1 && 'lg:order-last')}>
                <div className="relative aspect-[4/3] overflow-hidden border border-ink bg-paper-2">
                  <Img src={s.image} alt={tr(s.title, locale)} fill sizes="(min-width:1024px) 50vw, 100vw" className="plate-img object-cover" />
                </div>
                <p className="label mt-3 text-muted">{ar ? 'شكل' : 'Fig.'} {roman[i]} — {tr(s.title, locale)}</p>
              </div>
              <div data-reveal className="lg:col-span-6">
                <RunningHead no={String(i + 1).padStart(2, '0')}>{t.services.eyebrow}</RunningHead>
                <h2 className="mt-8 font-display text-5xl leading-[1.02] sm:text-6xl">{tr(s.title, locale)}</h2>
                <p className="mt-6 font-serif text-xl leading-relaxed text-ink-2">{tr(s.body, locale)}</p>
                <ol className="mt-8 border-t border-ink">
                  {s.points.map((p, j) => (
                    <li key={j} className="ledger-row flex items-baseline gap-5 py-4">
                      <span className="label text-wax">{String(j + 1).padStart(2, '0')}</span>
                      <span className="font-display text-xl">{tr(p, locale)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="night">
        <SectionHeading no="04" kicker={t.home.processEyebrow} title={t.home.processTitle} light />
        <ProcessSteps locale={locale} light />
      </Section>
      <Section>
        <SectionHeading no="05" kicker={t.about.values} title={ar ? 'ما يميّز الدار' : 'What sets the house apart'} />
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
      <CtaBand locale={locale} />
    </>
  )
}
