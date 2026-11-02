import Link from 'next/link'
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { countries, site, waLink } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { QuoteForm } from '@/components/QuoteForm'
import { LocalTime } from '@/components/LocalTime'
import { WhatsAppIcon } from '@/components/Icon'
import { Container, Section, SectionTitle } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/contact', t.contact.title, t.contact.body)
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  const { lat, lng } = site.address.geo
  const cards = [
    { icon: <WhatsAppIcon className="size-6" />, k: 'WhatsApp', v: site.contact.phone, href: waLink(), ltr: true, ext: true, cls: 'bg-[#25D366] text-white' },
    { icon: <Phone className="size-6" aria-hidden />, k: t.common.callUs, v: site.contact.phone, href: `tel:${site.contact.phoneE164}`, ltr: true, cls: 'bg-navy-800 text-gold-400' },
    { icon: <Mail className="size-6" aria-hidden />, k: t.common.emailUs, v: site.contact.email, href: `mailto:${site.contact.email}`, cls: 'bg-gold-500 text-navy-950' },
  ]
  return (
    <>
      <PageBanner locale={locale} eyebrow={t.contact.eyebrow} title={t.contact.title} body={t.contact.body} image="/images/tea-coffee/cover.webp" crumbs={[{ label: t.nav.contact }]} />
      <div className="relative z-10 -mt-8">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((c) => (
              <a key={c.k} href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-4 rounded-lg border border-line bg-white p-5 shadow-lift transition hover:-translate-y-0.5">
                <span className={`grid size-12 shrink-0 place-items-center rounded-md ${c.cls}`}>{c.icon}</span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">{c.k}</span>
                  <span className="block truncate font-heading font-extrabold text-navy-900 group-hover:text-gold-600" dir={c.ltr ? 'ltr' : undefined}>{c.v}</span>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </div>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionTitle kicker={t.contact.eyebrow} title={t.contact.formTitle} className="!mb-4" />
            <Link href={href(locale, '/quote')} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gold-600 hover:underline">
              {t.contact.fullQuote} <ArrowRight className="flip-rtl size-4" />
            </Link>
            <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8"><QuoteForm locale={locale} compact /></div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-lg bg-navy-900 p-6 text-white shadow-card">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gold-400"><Clock className="size-4" aria-hidden /> {t.contact.localTime}</p>
              <p className="mt-2 font-heading text-xl font-extrabold"><LocalTime locale={locale} /></p>
              <p className="mt-4 border-t border-white/15 pt-4 text-sm text-white/75">{t.contact.hours}: {tr(site.contact.hours, locale)}</p>
              <p className="mt-1 text-sm text-white/75">{tr(site.contact.responseTime, locale)}</p>
            </div>
            <div className="overflow-hidden rounded-lg border border-line bg-white shadow-card">
              <h2 className="bg-mist px-5 py-3 font-heading text-sm font-extrabold uppercase text-navy-900">{ar ? 'مكاتبنا وأسواقنا' : 'Office & markets'}</h2>
              <ul className="divide-y divide-line">
                {countries.map((c, k) => (
                  <li key={c.code} className="flex items-start gap-3 px-5 py-4">
                    <span className={`grid size-9 shrink-0 place-items-center rounded font-heading text-xs font-black ${k === 0 ? 'bg-gold-500 text-navy-950' : 'bg-navy-100 text-navy-800'}`} dir="ltr">{c.code}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading font-extrabold uppercase text-navy-900">{tr(c.name, locale)}</p>
                      {k === 0 ? (
                        <p className="mt-1 flex gap-1.5 text-sm text-ink-2"><MapPin className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />{tr(site.address.lines, locale)}</p>
                      ) : (
                        <p className="mt-1 text-sm text-muted">{t.v3.market} · {tr(c.region, locale)} — {ar ? 'تواصل عبر واتساب أو البريد' : 'enquire via WhatsApp or email'}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-lg border border-line shadow-card">
              <iframe title={tr(site.address.lines, locale)} src={`https://www.google.com/maps?q=${lat},${lng}&z=10&output=embed&hl=${locale}`} className="h-64 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
