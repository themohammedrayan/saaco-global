import Link from 'next/link'
import { href, tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { site, waLink } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { QuoteForm } from '@/components/QuoteForm'
import { LocalTime } from '@/components/LocalTime'
import { Arrow, RunningHead, Section } from '@/components/ui'

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
  const lines = [
    { k: 'WhatsApp', v: site.contact.phone, href: waLink(), ltr: true, ext: true },
    { k: t.common.callUs, v: site.contact.phone, href: `tel:${site.contact.phoneE164}`, ltr: true },
    { k: t.common.emailUs, v: site.contact.email, href: `mailto:${site.contact.email}` },
  ]
  return (
    <>
      <PageHero locale={locale} no="007" eyebrow={t.contact.eyebrow} title={t.contact.title} body={t.contact.body} crumbs={[{ label: t.nav.contact }]}>
        <div className="mt-10 grid border-t border-ink sm:grid-cols-3">
          {lines.map((l) => (
            <a key={l.k} href={l.href} {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group border-b border-rule py-5 sm:border-e sm:px-6 sm:first:ps-0 sm:last:border-e-0">
              <span className="label block text-muted">{l.k}</span>
              <span className="mt-2 block font-display text-2xl group-hover:text-wax" dir={l.ltr ? 'ltr' : undefined}>{l.v}</span>
            </a>
          ))}
        </div>
      </PageHero>
      <Section>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RunningHead no="01">{t.contact.formTitle}</RunningHead>
            <Link href={href(locale, '/quote')} className="label ink-link mt-6 inline-flex items-center gap-3 text-wax">{t.contact.fullQuote} <Arrow /></Link>
            <div className="mt-8"><QuoteForm locale={locale} compact /></div>
          </div>
          <aside className="space-y-10 lg:col-span-5">
            <div className="bg-night p-7 text-paper">
              <p className="label text-paper/60">{t.contact.localTime}</p>
              <p className="mt-3 font-display text-3xl"><LocalTime locale={locale} /></p>
              <p className="mt-5 border-t border-paper/20 pt-4 text-sm text-paper/70">{t.contact.hours}: {tr(site.contact.hours, locale)}</p>
              <p className="mt-1 text-sm text-paper/70">{tr(site.contact.responseTime, locale)}</p>
            </div>
            <div>
              <RunningHead no="02">{t.contact.address}</RunningHead>
              <address className="mt-5 not-italic">
                <p className="font-display text-2xl">{site.name}</p>
                <p className="mt-1 text-ink-2">{tr(site.address.lines, locale)}</p>
                <p className="label mt-3 text-muted" dir="ltr">{lat.toFixed(4)}°N · {lng.toFixed(4)}°E</p>
              </address>
            </div>
            <div className="border border-ink">
              <iframe
                title={tr(site.address.lines, locale)}
                src={`https://www.google.com/maps?q=${lat},${lng}&z=10&output=embed&hl=${locale}`}
                className="h-72 w-full border-0 grayscale-[0.6] sepia-[0.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="label text-muted">{ar ? 'نردّ بالعربية والإنجليزية' : 'We reply in English and Arabic'}</p>
          </aside>
        </div>
      </Section>
    </>
  )
}
