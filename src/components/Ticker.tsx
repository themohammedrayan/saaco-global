import { tr, type Locale } from '@/i18n/config'
import { markets } from '@/content/company'
import { site } from '@/content/site'

/** Thin "routes board" strip above the header. */
export function Ticker({ locale }: { locale: Locale }) {
  const from = locale === 'ar' ? 'كوتشين' : 'COCHIN'
  const items = [
    `${site.address.geo.lat.toFixed(2)}°N ${site.address.geo.lng.toFixed(2)}°E`,
    ...markets.map((m) => `${from} → ${tr(m.name, locale)}`),
    locale === 'ar' ? 'عروض FOB · CIF' : 'FOB · CIF QUOTATIONS',
    locale === 'ar' ? 'رد خلال 24 ساعة' : 'REPLY WITHIN 24 HOURS',
    `WHATSAPP ${site.contact.phone}`,
  ]
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden bg-ink text-paper/80" aria-hidden>
      <ul className="label flex w-max animate-ticker gap-10 whitespace-nowrap py-2 !text-[0.62rem]">
        {row.map((x, i) => (
          <li key={i} className="flex items-center gap-10">
            <span>{x}</span>
            <span className="text-wax">✦</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
