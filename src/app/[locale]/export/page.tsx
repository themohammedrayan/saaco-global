import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { documents, incoterms, paymentTerms, qualitySteps, shippingModes } from '@/content/export'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { CtaBand, ProcessSteps } from '@/components/sections'
import { RunningHead, Section, SectionHeading } from '@/components/ui'

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
      <PageHero locale={locale} no="003" eyebrow={g.eyebrow} title={g.title} body={g.body} image="/images/plates/delivery.webp" caption={ar ? 'شكل — جاهزة للشحن' : 'Fig. — Ready for dispatch'} crumbs={[{ label: t.nav.export }]}>
        <dl className="mt-10 grid max-w-xl border-t border-ink sm:grid-cols-2">
          <div className="border-b border-rule py-4 sm:border-e sm:pe-6">
            <dt className="label text-muted">{g.gateway}</dt>
            <dd className="mt-1 font-display text-2xl">{tr(site.port, locale)}</dd>
          </div>
          <div className="border-b border-rule py-4 sm:ps-6">
            <dt className="label text-muted">{ar ? 'الشحن الجوي' : 'Air freight'}</dt>
            <dd className="mt-1 font-display text-2xl">{tr(site.airport, locale)}</dd>
          </div>
        </dl>
      </PageHero>

      <Section>
        <SectionHeading no="01" kicker={t.home.processEyebrow} title={t.home.processTitle} />
        <ProcessSteps locale={locale} />
      </Section>

      <Section tone="paper-2" className="border-y border-ink">
        <SectionHeading no="02" kicker={g.incoterms} title={ar ? 'شروط التسليم' : 'Delivery terms'} body={g.incotermsNote} />
        <div className="grid border-t border-ink md:grid-cols-3">
          {incoterms.map((i) => (
            <article key={i.code} data-reveal className="border-b border-rule py-8 md:border-b-0 md:border-e md:px-8 md:first:ps-0 md:last:border-e-0">
              <p className="font-display text-7xl leading-none text-wax" dir="ltr">{i.code}</p>
              <h3 className="label mt-5 text-ink">{tr(i.name, locale)}</h3>
              <p className="mt-3 font-serif leading-relaxed text-ink-2">{tr(i.body, locale)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <RunningHead no="03">{g.documents}</RunningHead>
            <p className="mt-6 font-serif text-lg text-ink-2">{g.documentsNote}</p>
            <ol className="mt-6 border-t border-ink">
              {documents.map((d, i) => (
                <li key={i} data-reveal className="ledger-row flex items-baseline gap-5 py-4">
                  <span className="label text-muted">D.{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl">{tr(d.name, locale)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <RunningHead no="04">{g.payment}</RunningHead>
            <p className="mt-6 font-serif text-lg text-ink-2">{g.paymentNote}</p>
            <ol className="mt-6 border-t border-ink">
              {paymentTerms.map((p, i) => (
                <li key={i} data-reveal className="ledger-row flex items-baseline gap-5 py-4">
                  <span className="label text-muted">P.{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl">{tr(p, locale)}</span>
                </li>
              ))}
            </ol>
            <RunningHead no="05" className="mt-14">{g.quality}</RunningHead>
            <ol className="mt-6 space-y-3">
              {qualitySteps.map((q, i) => (
                <li key={i} className="flex gap-4 font-serif text-ink-2"><span className="label pt-1 text-wax">{String(i + 1).padStart(2, '0')}</span>{tr(q, locale)}</li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="night">
        <SectionHeading no="06" kicker={g.shipping} title={ar ? 'بحرًا أو جوًا' : 'By sea or by air'} light />
        <div className="grid border-t border-paper/50 md:grid-cols-3">
          {shippingModes.map((s, i) => (
            <article key={i} data-reveal className="border-b border-paper/20 py-8 md:border-b-0 md:border-e md:px-8 md:first:ps-0 md:last:border-e-0">
              <p className="label text-wax">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-display text-3xl">{tr(s.title, locale)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">{tr(s.body, locale)}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  )
}
