import { Clock, Mail, Phone } from 'lucide-react'
import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { site, waLink } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { QuoteForm } from '@/components/QuoteForm'
import { WhatsAppIcon } from '@/components/Icon'
import { Section } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/quote'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/quote', t.quote.eyebrow, t.quote.body)
}

export default async function QuotePage({ params }: PageProps<'/[locale]/quote'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return (
    <>
      <PageHero locale={locale} eyebrow={t.quote.eyebrow} title={t.quote.title} body={t.quote.body} image="/images/spices/mixed.webp" crumbs={[{ label: t.nav.quote }]} />
      <Section tone="cream">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem]">
          <QuoteForm locale={locale} />
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-forest-900 p-7 text-white">
              <Clock className="size-7 text-gold-300" aria-hidden />
              <p className="mt-4 font-display text-xl">{tr(site.contact.responseTime, locale)}</p>
              <p className="mt-2 text-sm text-white/70">{tr(site.contact.hours, locale)}</p>
            </div>
            <div className="space-y-3 rounded-3xl bg-white p-7 text-sm ring-1 ring-line">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-medium text-forest-900 hover:text-saffron-600"><WhatsAppIcon className="size-5 text-[#25D366]" /><span dir="ltr">{site.contact.phone}</span></a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 font-medium text-forest-900 hover:text-saffron-600"><Mail className="size-5 text-forest-600" aria-hidden />{site.contact.email}</a>
              <a href={`tel:${site.contact.phoneE164}`} className="flex items-center gap-3 font-medium text-forest-900 hover:text-saffron-600"><Phone className="size-5 text-forest-600" aria-hidden /><span dir="ltr">{site.contact.phone}</span></a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
