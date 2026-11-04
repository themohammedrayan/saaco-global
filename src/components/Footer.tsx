import Link from 'next/link'
import Image from 'next/image'
import { Download, Mail, MapPin, Phone } from 'lucide-react'
import { href, tr, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories } from '@/content/products'
import { countries, site, waLink } from '@/content/site'
import { WhatsAppIcon } from './Icon'
import { CountryName } from './CountryName'
import { Container } from './ui'

function ColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 font-heading text-sm font-extrabold uppercase tracking-wider text-white">
      {children}
      <span aria-hidden className="mt-2 block h-0.5 w-8 bg-gold-500" />
    </h2>
  )
}

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  const ar = locale === 'ar'
  const year = new Date().getFullYear()
  const links = [
    ['/', t.nav.home], ['/about', t.nav.about], ['/products', t.nav.products], ['/services', t.nav.services],
    ['/export', t.nav.export], ['/faq', t.nav.faq], ['/quote', t.nav.quote], ['/contact', t.nav.contact],
  ] as const
  const socials = Object.entries(site.social).filter(([, url]) => url)

  return (
    <footer className="bg-navy-950 text-[0.95rem] text-white/70">
      <div aria-hidden className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="inline-block rounded-lg bg-white px-4 py-3">
            <Image src="/images/brand/saaco-logo.png" alt="The SAACO Global Trading Company" width={660} height={306} sizes="200px" className="h-20 w-auto" />
          </span>
          <p className="mt-6 max-w-sm leading-relaxed">{t.footer.about}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/catalogue/saaco-global-catalogue.pdf" download className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-navy-950 hover:bg-gold-400">
              <Download className="size-4" aria-hidden /> {t.common.downloadCatalogue}
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#1eb956]">
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          </div>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {socials.map(([k, url]) => (
                <li key={k}><a className="inline-grid size-9 place-items-center rounded-full bg-white/10 text-xs font-bold uppercase hover:bg-gold-500 hover:text-navy-950" href={url} target="_blank" rel="noopener noreferrer" aria-label={k}>{k.slice(0, 2)}</a></li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-2">
          <ColTitle>{ar ? 'روابط سريعة' : 'Quick links'}</ColTitle>
          <ul className="space-y-2.5">
            {links.map(([p, l]) => <li key={p}><Link className="hover:text-gold-400" href={href(locale, p)}>{l}</Link></li>)}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <ColTitle>{t.footer.categories}</ColTitle>
          <ul className="space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}><Link className="hover:text-gold-400" href={href(locale, `/products/${c.slug}`)}>{tr(c.name, locale)}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <ColTitle>{site.name}</ColTitle>
          <ul className="space-y-4">
            <li className="flex gap-3"><MapPin className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden /><span><strong className="font-semibold text-white">{ar ? 'المكتب الرئيسي' : 'Head office'}</strong><br />{tr(site.headOffice.lines, locale)}</span></li>
            <li className="flex gap-3"><MapPin className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden /><span><strong className="font-semibold text-white">{ar ? 'الفروع' : 'Branches'}</strong><br />{tr(site.branches, locale)}</span></li>
            <li className="flex gap-3"><Phone className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden /><a dir="ltr" className="hover:text-gold-400" href={`tel:${site.contact.phoneE164}`}>{site.contact.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-1 size-4 shrink-0 text-gold-400" aria-hidden /><a className="break-all hover:text-gold-400" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="grid gap-3 py-5 text-xs lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <p>© {year} {site.legalName}. {t.footer.rights} <span className="text-white/60">· {ar ? 'تطوير' : 'Created by'} <a className="font-semibold text-gold-400 hover:underline" href="https://rayan.rivlo.live/" target="_blank" rel="noopener noreferrer">Mohammed Rayan</a></span></p>
          <ul aria-label={ar ? 'أين نعمل' : 'Where we trade'} className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-semibold text-white lg:justify-center">
            {countries.map((c, i) => (
              <li key={c.code} className="flex items-center gap-2.5">
                {i > 0 && <span aria-hidden className="text-gold-500">•</span>}
                <CountryName c={c} locale={locale} />
              </li>
            ))}
          </ul>
          <div className="flex gap-5 lg:justify-end">
            <Link className="hover:text-gold-400" href={href(locale, '/legal')}>{t.footer.legal}</Link>
            <Link className="hover:text-gold-400" href={href(locale, '/privacy')}>{t.footer.privacy}</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
