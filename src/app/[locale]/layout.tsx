import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../globals.css'
import { dirOf, isLocale, locales, tr } from '@/i18n/config'
import { site } from '@/content/site'
import { fontVars } from '@/lib/fonts'
import { organizationLd } from '@/lib/seo'
import { QuoteProvider } from '@/lib/quote-store'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppFab } from '@/components/WhatsAppFab'
import { QuoteBasketPill } from '@/components/AddToQuote'
import { RevealObserver } from '@/components/Reveal'
import { JsonLd } from '@/components/JsonLd'

export const dynamicParams = false
export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export const viewport: Viewport = { themeColor: '#0c2a1f', width: 'device-width', initialScale: 1 }

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${locale === 'ar' ? 'مصدّر توابل فاخرة من كيرالا، الهند' : 'Premium Spice Exporter from Kerala, India'}`,
      template: `%s | ${site.name}`,
    },
    description: tr(site.description, locale),
    applicationName: site.name,
    keywords: ['spice exporter India', 'Kerala spices', 'cardamom exporter', 'black pepper exporter', 'cinnamon', 'clove', 'coconut oil', 'honey', 'tea', 'coffee', 'SAACO Global', 'مصدر توابل', 'هيل', 'فلفل أسود'],
    icons: { icon: '/favicon.png', apple: '/favicon.png' },
    formatDetection: { telephone: false },
    other: {
      'geo.region': 'IN-KL',
      'geo.placename': `${site.address.locality}, ${site.address.region}`,
      'geo.position': `${site.address.geo.lat};${site.address.geo.lng}`,
      ICBM: `${site.address.geo.lat}, ${site.address.geo.lng}`,
    },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <html lang={locale} dir={dirOf(locale)} className={fontVars}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-screen">
        <QuoteProvider>
          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer locale={locale} />
          <WhatsAppFab locale={locale} />
          <QuoteBasketPill locale={locale} />
        </QuoteProvider>
        <RevealObserver />
        <JsonLd data={organizationLd(locale)} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
