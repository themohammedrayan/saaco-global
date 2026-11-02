import { Plane, Ship } from 'lucide-react'
import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { documents, incoterms, paymentTerms, qualitySteps, shippingModes } from '@/content/export'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { Icon } from '@/components/Icon'
import { Checklist, CtaBand, ProcessSteps } from '@/components/sections'
import { Section, SectionTitle } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/export'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/export', t.exportGuide.title, t.exportGuide.body)
}

export default async function ExportPage({ params }: PageProps<'/[locale]/export'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const g = t.exportGuide
  const ar = locale === 'ar'
  return (
    <>
      <PageBanner locale={locale} eyebrow={g.eyebrow} title={g.title} body={g.body} image="/images/plates/delivery.webp" crumbs={[{ label: t.nav.export }]}>
        <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur">
            <Ship className="size-6 shrink-0 text-gold-400" aria-hidden />
            <div><p className="text-xs font-bold uppercase tracking-wide text-white/60">{g.gateway}</p><p className="font-semibold">{tr(site.port, locale)}</p></div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur">
            <Plane className="size-6 shrink-0 text-gold-400" aria-hidden />
            <div><p className="text-xs font-bold uppercase tracking-wide text-white/60">{ar ? 'الشحن الجوي' : 'Air freight'}</p><p className="font-semibold">{tr(site.airport, locale)}</p></div>
          </div>
        </div>
      </PageBanner>

      <Section>
        <SectionTitle kicker={t.v3.deliverKicker} title={t.v3.deliverTitle} lead={t.v3.deliverLead} center />
        <ProcessSteps locale={locale} />
      </Section>

      <Section tone="mist">
        <SectionTitle kicker={g.incoterms} title={ar ? 'شروط التسليم' : 'Delivery terms'} lead={g.incotermsNote} center />
        <div className="grid gap-5 md:grid-cols-3">
          {incoterms.map((i) => (
            <article key={i.code} data-reveal className="overflow-hidden rounded-lg border border-line bg-white shadow-card">
              <div className="flex items-center justify-between bg-navy-900 px-6 py-4">
                <p className="font-heading text-3xl font-black text-gold-400" dir="ltr">{i.code}</p>
                <p className="text-end text-sm font-semibold text-white/80">{tr(i.name, locale)}</p>
              </div>
              <p className="p-6 leading-relaxed text-ink-2">{tr(i.body, locale)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <div data-reveal className="rounded-lg border border-line bg-white p-6 shadow-card">
            <h2 className="font-heading text-lg font-extrabold uppercase text-navy-900">{g.documents}</h2>
            <p className="mb-5 mt-1 text-sm text-muted">{g.documentsNote}</p>
            <Checklist items={documents.map((d) => tr(d.name, locale))} />
          </div>
          <div data-reveal className="rounded-lg border border-line bg-white p-6 shadow-card">
            <h2 className="font-heading text-lg font-extrabold uppercase text-navy-900">{g.payment}</h2>
            <p className="mb-5 mt-1 text-sm text-muted">{g.paymentNote}</p>
            <Checklist items={paymentTerms.map((p) => tr(p, locale))} />
          </div>
          <div data-reveal className="rounded-lg bg-navy-900 p-6 text-white shadow-card">
            <h2 className="font-heading text-lg font-extrabold uppercase">{g.quality}</h2>
            <p className="mb-5 mt-1 text-sm text-white/60">{t.v3.qualityLead}</p>
            <Checklist light items={qualitySteps.map((q) => tr(q, locale))} />
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionTitle kicker={g.shipping} title={ar ? 'بحرًا أو جوًا' : 'By sea or by air'} center />
        <div className="grid gap-5 md:grid-cols-3">
          {shippingModes.map((s, i) => (
            <article key={i} data-reveal className="rounded-lg border border-line bg-white p-6 shadow-card">
              <span className="grid size-12 place-items-center rounded-md bg-gold-500 text-navy-950"><Icon name={s.icon} className="size-6" /></span>
              <h3 className="mt-5 font-heading text-base font-extrabold uppercase text-navy-900">{tr(s.title, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{tr(s.body, locale)}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  )
}
