import { Check } from 'lucide-react'
import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { documents, incoterms, paymentTerms, qualitySteps, shippingModes } from '@/content/export'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { Icon } from '@/components/Icon'
import { CtaBand, ProcessSteps } from '@/components/sections'
import { Section, SectionHeading } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/export'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/export', t.exportGuide.title, t.exportGuide.body)
}

export default async function ExportPage({ params }: PageProps<'/[locale]/export'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const g = t.exportGuide
  return (
    <>
      <PageHero locale={locale} eyebrow={g.eyebrow} title={g.title} body={g.body} image="/images/services/delivery.webp" crumbs={[{ label: t.nav.export }]}>
        <dl className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
            <dt className="text-xs uppercase tracking-widest text-gold-300">{g.gateway}</dt>
            <dd className="mt-1 font-semibold">{tr(site.port, locale)}</dd>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur">
            <dt className="text-xs uppercase tracking-widest text-gold-300">{locale === 'ar' ? 'الشحن الجوي' : 'Air freight'}</dt>
            <dd className="mt-1 font-semibold">{tr(site.airport, locale)}</dd>
          </div>
        </dl>
      </PageHero>

      <Section tone="white">
        <SectionHeading eyebrow={t.home.processEyebrow} title={t.home.processTitle} center className="mb-14" />
        <ProcessSteps locale={locale} />
      </Section>

      <Section tone="cream">
        <SectionHeading title={g.incoterms} body={g.incotermsNote} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {incoterms.map((i) => (
            <article key={i.code} data-reveal className="rounded-3xl bg-white p-7 ring-1 ring-line">
              <p className="font-display text-4xl text-saffron-600" dir="ltr">{i.code}</p>
              <h3 className="mt-2 font-semibold text-forest-900">{tr(i.name, locale)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{tr(i.body, locale)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading title={g.documents} body={g.documentsNote} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {documents.map((d, i) => (
                <li key={i} data-reveal className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-800"><Icon name={d.icon} className="size-5" /></span>
                  <span className="text-sm font-medium text-forest-900">{tr(d.name, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={g.payment} body={g.paymentNote} />
            <ul className="mt-8 space-y-3">
              {paymentTerms.map((p, i) => (
                <li key={i} data-reveal className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-line">
                  <Check className="mt-0.5 size-5 shrink-0 text-forest-600" aria-hidden />
                  <span className="text-forest-900">{tr(p, locale)}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-12 font-display text-2xl text-forest-900">{g.quality}</h3>
            <ul className="mt-5 space-y-3">
              {qualitySteps.map((q, i) => (
                <li key={i} className="flex gap-3 text-muted"><Check className="mt-1 size-4 shrink-0 text-saffron-600" aria-hidden />{tr(q, locale)}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="forest">
        <SectionHeading light title={g.shipping} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {shippingModes.map((s, i) => (
            <article key={i} data-reveal className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-saffron-500 text-forest-950"><Icon name={s.icon} className="size-6" /></span>
              <h3 className="mt-5 font-display text-xl">{tr(s.title, locale)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{tr(s.body, locale)}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  )
}
