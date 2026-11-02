import { Check } from 'lucide-react'
import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { pillars, services } from '@/content/company'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { Icon } from '@/components/Icon'
import { Img } from '@/components/Img'
import { CtaBand, ProcessSteps } from '@/components/sections'
import { Section, SectionHeading, cx } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/services'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/services', t.services.title, t.services.body, '/images/services/production.webp')
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return (
    <>
      <PageHero locale={locale} eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.body} image="/images/hero/spice-harvest.webp" crumbs={[{ label: t.nav.services }]} />
      <Section tone="cream">
        <div className="space-y-20 lg:space-y-28">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div data-reveal className={cx('relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand', i % 2 === 1 && 'lg:order-last')}>
                <Img src={s.image} alt={tr(s.title, locale)} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <div data-reveal>
                <span className="grid size-14 place-items-center rounded-2xl bg-saffron-500 text-forest-950"><Icon name={s.icon} className="size-7" /></span>
                <p className="mt-6 font-display text-sm text-saffron-600" dir="ltr">0{i + 1}</p>
                <h2 className="mt-1 font-display text-3xl text-forest-900 sm:text-4xl">{tr(s.title, locale)}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">{tr(s.body, locale)}</p>
                <ul className="mt-7 space-y-3">
                  {s.points.map((p, j) => (
                    <li key={j} className="flex gap-3 text-forest-900"><Check className="mt-0.5 size-5 shrink-0 text-forest-600" aria-hidden />{tr(p, locale)}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="white">
        <SectionHeading eyebrow={t.home.processEyebrow} title={t.home.processTitle} center className="mb-14" />
        <ProcessSteps locale={locale} />
      </Section>
      <Section tone="sand">
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
      <CtaBand locale={locale} />
    </>
  )
}
