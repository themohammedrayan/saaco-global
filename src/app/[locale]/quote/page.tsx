import { Clock, Mail, Phone } from 'lucide-react'
import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { site, waLink } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { QuoteForm } from '@/components/QuoteForm'
import { WhatsAppIcon } from '@/components/Icon'
import { Checklist } from '@/components/sections'
import { Section } from '@/components/ui'

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
      <PageBanner locale={locale} eyebrow={t.quote.eyebrow} title={t.quote.title} body={t.quote.body} image="/images/plates/mixed.webp" crumbs={[{ label: t.nav.quote }]} />
      <Section tone="mist">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_21rem]">
          <QuoteForm locale={locale} />
          <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-lg bg-navy-900 p-6 text-white shadow-card">
              <Clock className="size-7 text-gold-400" aria-hidden />
              <p className="mt-3 font-heading text-lg font-extrabold uppercase leading-snug">{tr(site.contact.responseTime, locale)}</p>
              <p className="mt-2 text-sm text-white/70">{tr(site.contact.hours, locale)}</p>
            </div>
            <div className="rounded-lg border border-line bg-white p-6 shadow-card">
              <h2 className="mb-4 font-heading text-sm font-extrabold uppercase text-navy-900">{ar ? 'ما الذي يحدث بعد ذلك؟' : 'What happens next?'}</h2>
              <Checklist items={ar
                ? ['نراجع طلبك ونؤكد التوفر', 'نرسل عرض سعر FOB أو CIF', 'نرتّب العينات عند الحاجة', 'نؤكد المواصفات ونجهّز الطلب']
                : ['We review your request and confirm availability', 'You receive an FOB or CIF quotation', 'We arrange samples if needed', 'We confirm specs and prepare your order']} />
            </div>
            <div className="space-y-2 rounded-lg border border-line bg-white p-6 text-sm shadow-card">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-navy-900 hover:text-gold-600"><WhatsAppIcon className="size-5 text-[#25D366]" /><span dir="ltr">{site.contact.phone}</span></a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 font-semibold text-navy-900 hover:text-gold-600"><Mail className="size-5 text-navy-600" aria-hidden />{site.contact.email}</a>
              <a href={`tel:${site.contact.phoneE164}`} className="flex items-center gap-3 font-semibold text-navy-900 hover:text-gold-600"><Phone className="size-5 text-navy-600" aria-hidden /><span dir="ltr">{site.contact.phone}</span></a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
