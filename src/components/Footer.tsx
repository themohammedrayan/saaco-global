import Link from 'next/link'
import Image from 'next/image'
import { href, tr, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories } from '@/content/products'
import { countries, site, waLink } from '@/content/site'
import { Container } from './ui'

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  const year = new Date().getFullYear()
  const links = [
    ['/products', t.nav.products], ['/export', t.nav.export], ['/services', t.nav.services],
    ['/about', t.nav.about], ['/faq', t.nav.faq], ['/quote', t.nav.quote], ['/contact', t.nav.contact],
  ] as const
  const socials = Object.entries(site.social).filter(([, url]) => url)

  return (
    <footer className="bg-night text-paper/75">
      <Container className="pt-20">
        <div className="grid gap-12 border-t border-paper/30 pt-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-8 inline-block bg-paper px-4 py-3">
              <Image src="/images/brand/saaco-logo.png" alt="The SAACO Global Trading Company" width={660} height={306} sizes="220px" className="h-20 w-auto" />
            </div>
            <p className="label text-paper/50">{locale === 'ar' ? 'المراسلات' : 'Correspondence'}</p>
            <address className="mt-5 space-y-2 not-italic leading-relaxed">
              <p className="text-paper">{site.name}</p>
              <p>{tr(site.address.lines, locale)}</p>
              <p><a dir="ltr" className="ink-link text-paper" href={`tel:${site.contact.phoneE164}`}>{site.contact.phone}</a></p>
              <p><a className="ink-link text-paper" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
              <p><a className="ink-link text-paper" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
            </address>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-5">
                {socials.map(([k, url]) => (
                  <li key={k}><a className="label ink-link" href={url} target="_blank" rel="noopener noreferrer">{k}</a></li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:col-span-3">
            <p className="label text-paper/50">{t.footer.categories}</p>
            <ol className="mt-5 space-y-2.5">
              {categories.map((c, i) => (
                <li key={c.slug} className="flex gap-3">
                  <span className="label w-8 pt-0.5 text-paper/40">{roman[i]}.</span>
                  <Link className="hover:text-paper" href={href(locale, `/products/${c.slug}`)}>{tr(c.name, locale)}</Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-2">
            <p className="label text-paper/50">{t.footer.explore}</p>
            <ul className="mt-5 space-y-2.5">
              {links.map(([p, l]) => <li key={p}><Link className="hover:text-paper" href={href(locale, p)}>{l}</Link></li>)}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="label text-paper/50">{locale === 'ar' ? 'الكتالوج' : 'Catalogue'}</p>
            <p className="mt-5 leading-relaxed">{t.footer.about}</p>
            <a href="/catalogue/saaco-global-catalogue.pdf" download className="label mt-6 inline-flex items-center gap-3 border border-paper/50 px-5 py-3 text-paper hover:bg-paper hover:text-ink">
              {t.common.downloadCatalogue} · PDF
            </a>
          </div>
        </div>
      </Container>
      <div className="overflow-hidden">
        <p aria-hidden className="select-none whitespace-nowrap text-center font-display text-[15vw] leading-[0.8] text-paper/[0.07]" dir="ltr">
          SAACO Global
        </p>
      </div>
      <Container>
        <div className="label grid gap-4 border-t border-paper/20 py-6 text-paper/50 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <p>© {year} {site.legalName} · {locale === 'ar' ? `منذ ${site.foundedYear}` : `Est. ${site.foundedYear}`}</p>
          <ul aria-label={locale === 'ar' ? 'أين نعمل' : 'Where we trade'} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-paper/85 lg:justify-center">
            {countries.map((c, i) => (
              <li key={c.code} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-wax">✦</span>}
                <span>{tr(c.name, locale)}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-6 lg:justify-end">
            <Link className="hover:text-paper" href={href(locale, '/legal')}>{t.footer.legal}</Link>
            <Link className="hover:text-paper" href={href(locale, '/privacy')}>{t.footer.privacy}</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
