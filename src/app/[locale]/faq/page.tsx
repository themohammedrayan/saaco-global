import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { faqs } from '@/content/faq'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { CtaBand, FaqList } from '@/components/sections'
import { JsonLd } from '@/components/JsonLd'
import { Section } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/faq'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return pageMeta(locale, '/faq', t.faq.title, t.faq.body)
}

export default async function FaqPage({ params }: PageProps<'/[locale]/faq'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  return (
    <>
      <PageHero locale={locale} eyebrow={t.faq.eyebrow} title={t.faq.title} body={t.faq.body} image="/images/spices/cardamom-pepper.webp" crumbs={[{ label: t.nav.faq }]} />
      <Section tone="cream">
        <div className="mx-auto max-w-4xl"><FaqList locale={locale} /></div>
      </Section>
      <CtaBand locale={locale} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: tr(f.q, locale), acceptedAnswer: { '@type': 'Answer', text: tr(f.a, locale) } })),
      }} />
    </>
  )
}
