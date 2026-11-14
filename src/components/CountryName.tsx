import { tr, type Locale } from '@/i18n/config'
import type { countries } from '@/content/site'

type Country = (typeof countries)[number]

/** A country name; links to that branch's WhatsApp when the country has a number. */
export function CountryName({ c, locale, className }: { c: Country; locale: Locale; className?: string }) {
  const name = tr(c.name, locale)
  if (!c.whatsapp) return <>{name}</>
  const greeting = locale === 'ar'
    ? `مرحبًا ساكو جلوبال (${name})، أودّ الاستفسار عن منتجاتكم.`
    : `Hello SAACO Global (${name}), I would like to enquire about your products.`
  return (
    <a
      href={`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(greeting)}`}
      target="_blank"
      rel="noopener noreferrer"
      title={locale === 'ar' ? `واتساب فرع ${name}` : `WhatsApp our ${name} branch`}
      className={className ?? 'underline decoration-gold-500/60 underline-offset-4 hover:text-gold-400'}
    >
      {name}
    </a>
  )
}
