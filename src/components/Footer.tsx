import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { href, tr, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories } from '@/content/products'
import { site, waLink } from '@/content/site'
import { Container } from './ui'
import { WhatsAppIcon } from './Icon'

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  const year = new Date().getFullYear()
  const links = [
    ['/products', t.nav.products], ['/export', t.nav.export], ['/services', t.nav.services],
    ['/about', t.nav.about], ['/faq', t.nav.faq], ['/quote', t.nav.quote], ['/contact', t.nav.contact],
  ] as const
  const socials = Object.entries(site.social).filter(([, url]) => url)

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-white/80">
      <div aria-hidden className="grain absolute inset-0 opacity-60" />
      <Container className="relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <span className="inline-block rounded-xl bg-white p-2">
            <Image src="/images/brand/logo-wide.png" alt="SAACO Global" width={218} height={109} className="h-14 w-auto" />
          </span>
          <p className="mt-6 max-w-sm leading-relaxed">{t.footer.about}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {socials.map(([k, url]) => (
                <li key={k}><a className="capitalize hover:text-gold-300" href={url} target="_blank" rel="noopener noreferrer">{k}</a></li>
              ))}
            </ul>
          )}
        </div>
        <div className="lg:col-span-2">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{t.footer.explore}</h2>
          <ul className="space-y-3 text-sm">
            {links.map(([p, l]) => (
              <li key={p}><Link className="hover:text-white" href={href(locale, p)}>{l}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{t.footer.categories}</h2>
          <ul className="space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}><Link className="hover:text-white" href={href(locale, `/products/${c.slug}`)}>{tr(c.name, locale)}</Link></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{t.footer.contact}</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden />{tr(site.address.lines, locale)}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden /><a dir="ltr" className="hover:text-white" href={`tel:${site.contact.phoneE164}`}>{site.contact.phone}</a></li>
            <li className="flex gap-3"><WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gold-300" /><a dir="ltr" className="hover:text-white" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp {site.contact.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden /><a className="hover:text-white" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
          </ul>
        </div>
      </Container>
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}. {t.footer.rights}</p>
          <div className="flex gap-6">
            <Link className="hover:text-white" href={href(locale, '/legal')}>{t.footer.legal}</Link>
            <Link className="hover:text-white" href={href(locale, '/privacy')}>{t.footer.privacy}</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
