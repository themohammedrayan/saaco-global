import type { Metadata } from 'next'
import { href, locales, ogLocale, tr, type L, type Locale } from '@/i18n/config'
import { site } from '@/content/site'

/** Per-page metadata with canonical + hreflang alternates for every locale. */
export function pageMeta(
  locale: Locale,
  path: string,
  title: L | string,
  description: L | string,
  image = '/images/hero/mixed-spices.webp',
): Metadata {
  const t = typeof title === 'string' ? title : tr(title, locale)
  const d = typeof description === 'string' ? description : tr(description, locale)
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, href(l, path)]))
  languages['x-default'] = href('en', path)
  return {
    title: t,
    description: d,
    alternates: { canonical: href(locale, path), languages },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: t,
      description: d,
      url: href(locale, path),
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: image, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title: t, description: d, images: [image] },
  }
}

export function organizationLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#org`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/images/brand/saaco-logo.png`,
        email: site.contact.email,
        telephone: site.contact.phoneE164,
        foundingDate: String(site.foundedYear),
        description: tr(site.description, locale),
        contactPoint: [{
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: site.contact.phoneE164,
          email: site.contact.email,
          availableLanguage: ['English', 'Arabic', 'Malayalam', 'Hindi'],
          areaServed: 'Worldwide',
        }],
        sameAs: Object.values(site.social).filter(Boolean),
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${site.url}/#business`,
        name: site.name,
        image: `${site.url}/images/hero/mixed-spices.webp`,
        url: site.url,
        telephone: site.contact.phoneE164,
        email: site.contact.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.countryCode,
        },
        geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng },
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        }],
      },
    ],
  }
}
