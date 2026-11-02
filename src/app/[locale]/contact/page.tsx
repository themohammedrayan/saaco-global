import Link from 'next/link'
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { site, waLink } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { QuoteForm } from '@/components/QuoteForm'
import { LocalTime } from '@/components/LocalTime'
import { WhatsAppIcon } from '@/components/Icon'
import { Container, Section } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/contact', t.contact.title, t.contact.body)
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const { lat, lng } = site.address.geo
  const cards = [
    { icon: <WhatsAppIcon className="size-6" />, label: 'WhatsApp', value: site.contact.phone, href: waLink(), ltr: true, ext: true },
    { icon: <Phone className="size-6" aria-hidden />, label: t.common.callUs, value: site.contact.phone, href: `tel:${site.contact.phoneE164}`, ltr: true },
    { icon: <Mail className="size-6" aria-hidden />, label: t.common.emailUs, value: site.contact.email, href: `mailto:${site.contact.email}` },
  ]
  return (
    <>
      <PageHero locale={locale} eyebrow={t.contact.eyebrow} title={t.contact.title} body={t.contact.body} image="/images/tea-coffee/cover.webp" crumbs={[{ label: t.nav.contact }]} />
      <section className="relative z-10 -mt-10">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((c) => (
              <a key={c.label} href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-forest-900/5 ring-1 ring-line transition hover:-translate-y-0.5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-100 text-forest-800 group-hover:bg-saffron-500 group-hover:text-forest-950">{c.icon}</span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-muted">{c.label}</span>
                  <span className="mt-0.5 block font-semibold text-forest-900" dir={c.ltr ? 'ltr' : undefined}>{c.value}</span>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>
      <Section tone="cream">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-3xl text-forest-900">{t.contact.formTitle}</h2>
            <Link href={href(locale, '/quote')} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-saffron-600 hover:underline">
              {t.contact.fullQuote} <ArrowRight className="flip-rtl size-4" aria-hidden />
            </Link>
            <div className="mt-8"><QuoteForm locale={locale} compact /></div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-3xl bg-forest-900 p-7 text-white">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300"><Clock className="size-4" aria-hidden />{t.contact.localTime}</p>
              <p className="mt-3 font-display text-2xl"><LocalTime locale={locale} /></p>
              <p className="mt-4 text-sm text-white/70">{t.contact.hours}: {tr(site.contact.hours, locale)}</p>
              <p className="mt-1 text-sm text-white/70">{tr(site.contact.responseTime, locale)}</p>
            </div>
            <div className="rounded-3xl bg-white p-7 ring-1 ring-line">
              <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted"><MapPin className="size-4" aria-hidden />{t.contact.address}</p>
              <address className="mt-3 not-italic leading-relaxed text-forest-900">{site.name}<br />{tr(site.address.lines, locale)}</address>
            </div>
            <div className="overflow-hidden rounded-3xl ring-1 ring-line">
              <iframe
                title={tr(site.address.lines, locale)}
                src={`https://www.google.com/maps?q=${lat},${lng}&z=11&output=embed&hl=${locale}`}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
