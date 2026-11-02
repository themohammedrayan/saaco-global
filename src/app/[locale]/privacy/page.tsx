import { getDict } from '@/i18n/dict'
import { site } from '@/content/site'
import { getLocale } from '@/lib/locale'
import { pageMeta } from '@/lib/seo'
import { PageBanner } from '@/components/PageBanner'
import { Prose } from '@/components/Prose'
import { Section } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[locale]/privacy'>) {
  const locale = await getLocale(params)
  return { ...pageMeta(locale, '/privacy', getDict(locale).footer.privacy, site.description), robots: { index: false } }
}

export default async function PrivacyPage({ params }: PageProps<'/[locale]/privacy'>) {
  const locale = await getLocale(params)
  const t = getDict(locale)
  const ar = locale === 'ar'
  return (
    <>
      <PageBanner locale={locale} title={t.footer.privacy} crumbs={[{ label: t.footer.privacy }]} />
      <Section tone="mist">
        <Prose>
          <p>{ar ? 'نحترم خصوصيتك. توضح هذه الصفحة البيانات التي نتعامل معها عند استخدامك لهذا الموقع.' : 'We respect your privacy. This page explains what data is handled when you use this website.'}</p>
          <h2>{ar ? 'نماذج الاستفسار' : 'Enquiry forms'}</h2>
          <p>{ar
            ? 'لا يخزّن هذا الموقع البيانات التي تُدخلها في نماذج الاستفسار على أي خادم. عند الضغط على «أرسل»، يُفتح واتساب أو تطبيق البريد الإلكتروني لديك مع رسالة جاهزة، ولا تصلنا البيانات إلا إذا أرسلتها أنت. نستخدم هذه البيانات فقط للرد على استفسارك وتنفيذ طلبك.'
            : 'Information you type into our enquiry forms is not stored on any server by this website. When you press “Send”, WhatsApp or your email app opens with a pre-written message, and we only receive it if you send it. We use that information solely to respond to your enquiry and fulfil your order.'}</p>
          <h2>{ar ? 'سلة عرض السعر' : 'Quote basket'}</h2>
          <p>{ar
            ? 'تُحفظ المنتجات التي تضيفها إلى سلة عرض السعر في متصفحك فقط (التخزين المحلي) ويمكنك حذفها في أي وقت.'
            : 'Products you add to your quote basket are saved only in your own browser (local storage) and can be cleared at any time.'}</p>
          <h2>{ar ? 'الإحصاءات' : 'Analytics'}</h2>
          <p>{ar
            ? 'نستخدم Vercel Web Analytics لفهم عدد الزيارات والصفحات الأكثر زيارة بشكل مجمّع. لا يستخدم ملفات تعريف الارتباط ولا يتتبّعك عبر المواقع.'
            : 'We use Vercel Web Analytics to understand visits and popular pages in aggregate. It does not use cookies and does not track you across websites.'}</p>
          <h2>{ar ? 'الخدمات الخارجية' : 'Third-party services'}</h2>
          <p>{ar
            ? 'تُعرض خريطة الموقع عبر خرائط جوجل، وتخضع لسياسة خصوصية جوجل. ويخضع التواصل عبر واتساب لسياسة خصوصية واتساب.'
            : 'The location map is provided by Google Maps and is subject to Google’s privacy policy. Communication via WhatsApp is subject to WhatsApp’s privacy policy.'}</p>
          <h2>{ar ? 'تواصل معنا' : 'Contact'}</h2>
          <p>{ar ? 'لأي سؤال حول بياناتك:' : 'For any question about your data:'} <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
        </Prose>
      </Section>
    </>
  )
}
