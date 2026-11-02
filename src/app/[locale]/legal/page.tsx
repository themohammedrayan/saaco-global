import { tr } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageHero } from '@/components/PageHero'
import { Prose } from '@/components/Prose'
import { Section } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/legal'>) {
  const locale = await getLocale(params)
  return { ...pageMeta(locale, '/legal', getDict(locale).footer.legal, site.description), robots: { index: false } }
}

export default async function LegalPage({ params }: PageProps<'/[locale]/legal'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  return (
    <>
      <PageHero locale={locale} no="L-1" title={t.footer.legal} crumbs={[{ label: t.footer.legal }]} />
      <Section>
        <Prose>
          <h2>{ar ? 'مشغّل الموقع' : 'Website operator'}</h2>
          <p>
            {site.legalName}<br />{tr(site.address.lines, locale)}<br />
            {ar ? 'الهاتف' : 'Phone'}: <span dir="ltr">{site.contact.phone}</span><br />
            {ar ? 'البريد الإلكتروني' : 'Email'}: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
          <h2>{ar ? 'المعلومات على هذا الموقع' : 'Information on this website'}</h2>
          <p>{ar
            ? 'المعلومات عن المنتجات والمواصفات والشروط المعروضة على هذا الموقع استرشادية ولا تُعدّ عرضًا ملزمًا. تُحدَّد الأسعار والكميات والدرجات وشروط التسليم والدفع في عرض سعر مكتوب أو فاتورة مبدئية لكل طلب.'
            : 'Product information, specifications and terms shown on this website are indicative and do not constitute a binding offer. Prices, quantities, grades, delivery and payment terms are confirmed in a written quotation or proforma invoice for each order.'}</p>
          <h2>{ar ? 'الملكية الفكرية' : 'Intellectual property'}</h2>
          <p>{ar
            ? 'جميع النصوص والصور والشعارات على هذا الموقع مملوكة لساكو جلوبال أو لأصحابها المعنيين، ولا يجوز إعادة استخدامها دون إذن. شعارات الشركاء والعلامات التجارية مملوكة لأصحابها.'
            : 'All text, images and logos on this website belong to SAACO Global or their respective owners and may not be reused without permission. Partner logos and trademarks are the property of their owners.'}</p>
          <h2>{ar ? 'الروابط الخارجية' : 'External links'}</h2>
          <p>{ar
            ? 'قد يحتوي هذا الموقع على روابط لمواقع خارجية (مثل واتساب وخرائط جوجل). لسنا مسؤولين عن محتوى تلك المواقع.'
            : 'This website may link to external services (such as WhatsApp and Google Maps). We are not responsible for the content of those sites.'}</p>
        </Prose>
      </Section>
    </>
  )
}
