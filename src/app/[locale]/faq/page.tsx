import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { faqs } from '@/content/faq'
import { site, waLink } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { CtaBand, FaqList } from '@/components/sections'
import { WhatsAppIcon } from '@/components/Icon'
import { JsonLd } from '@/components/JsonLd'
import { ButtonLink, Kicker, Section } from '@/components/ui'
import { href } from '@/i18n/config'

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
      <PageBanner locale={locale} eyebrow={t.faq.eyebrow} title={t.faq.title} body={t.faq.body} image="/images/plates/cardamom-pepper.webp" crumbs={[{ label: t.nav.faq }]} />
      <Section tone="mist">
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <FaqList locale={locale} />
          <aside className="self-start rounded-lg bg-navy-900 p-6 text-white shadow-lift lg:sticky lg:top-32">
            <Kicker light>{t.v3.faqKicker}</Kicker>
            <h2 className="font-heading text-xl font-black uppercase">{t.v3.askTitle}</h2>
            <p className="mt-3 text-sm text-white/75">{t.v3.askBody}</p>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonLink href={waLink()} external variant="whatsapp"><WhatsAppIcon className="size-4" /> {t.common.whatsappUs}</ButtonLink>
              <ButtonLink href={href(locale, '/quote')}>{t.common.requestQuote}</ButtonLink>
              <a href={`mailto:${site.contact.email}`} className="text-center text-sm text-white/75 hover:text-gold-400">{site.contact.email}</a>
            </div>
          </aside>
        </div>
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
