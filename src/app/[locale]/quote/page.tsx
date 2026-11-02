import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { site, waLink } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { QuoteForm } from '@/components/QuoteForm'
import { RunningHead, Section } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/quote'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/quote', t.quote.eyebrow, t.quote.body)
}

export default async function QuotePage({ params }: PageProps<'/[locale]/quote'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  return (
    <>
      <PageHero locale={locale} no="RFQ" eyebrow={t.quote.eyebrow} title={t.quote.title} body={t.quote.body} crumbs={[{ label: t.nav.quote }]} />
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_20rem]">
          <QuoteForm locale={locale} />
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <RunningHead>{ar ? 'مباشرة' : 'Direct line'}</RunningHead>
            <p className="mt-6 font-display text-3xl leading-tight">{tr(site.contact.responseTime, locale)}</p>
            <p className="label mt-3 text-muted">{tr(site.contact.hours, locale)}</p>
            <dl className="mt-8 border-t border-ink text-sm">
              <div className="ledger-row flex justify-between gap-4 py-3"><dt className="label text-muted">WhatsApp</dt><dd><a dir="ltr" className="ink-link" href={waLink()} target="_blank" rel="noopener noreferrer">{site.contact.phone}</a></dd></div>
              <div className="ledger-row flex justify-between gap-4 py-3"><dt className="label text-muted">{ar ? 'البريد' : 'Email'}</dt><dd><a className="ink-link" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></dd></div>
              <div className="ledger-row flex justify-between gap-4 py-3"><dt className="label text-muted">{ar ? 'الهاتف' : 'Phone'}</dt><dd><a dir="ltr" className="ink-link" href={`tel:${site.contact.phoneE164}`}>{site.contact.phone}</a></dd></div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  )
}
