import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { pillars } from '@/content/company'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { ServicesTabs } from '@/components/ServicesTabs'
import { Icon } from '@/components/Icon'
import { CtaBand, ProcessSteps } from '@/components/sections'
import { Section, SectionTitle } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/services'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/services', t.services.title, t.services.body, '/images/services/production.webp')
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  return (
    <>
      <PageBanner locale={locale} eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.body} image="/images/plates/delivery.webp" crumbs={[{ label: t.nav.services }]} />
      <Section tone="mist">
        <ServicesTabs locale={locale} />
      </Section>
      <Section>
        <SectionTitle kicker={t.v3.brandKicker} title={t.v3.brandTitle} lead={t.v3.brandLead} center />
        <div className="grid gap-5 md:grid-cols-2">
          {t.v3.brandCards.map((b, k) => (
            <div key={k} data-reveal className="flex gap-5 rounded-lg border border-line bg-white p-6 shadow-card">
              <span className="grid size-14 shrink-0 place-items-center rounded-md bg-navy-800 text-gold-400"><Icon name={k === 0 ? 'tag' : 'package'} className="size-7" /></span>
              <div>
                <h3 className="font-heading text-lg font-extrabold uppercase text-navy-900">{b.t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b.b}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="navy">
        <SectionTitle kicker={t.v3.deliverKicker} title={t.v3.deliverTitle} lead={t.v3.deliverLead} light center />
        <ProcessSteps locale={locale} light />
      </Section>
      <Section>
        <SectionTitle kicker={t.v3.whyKicker} title={ar ? 'ما يميّزنا' : 'What sets us apart'} center />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={i} data-reveal className="rounded-lg border border-line bg-white p-6 shadow-card">
              <span className="grid size-12 place-items-center rounded-md bg-gold-100 text-gold-600"><Icon name={p.icon} className="size-6" /></span>
              <h3 className="mt-5 font-heading text-base font-extrabold uppercase text-navy-900">{tr(p.title, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tr(p.body, locale)}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand locale={locale} />
    </>
  )
}
