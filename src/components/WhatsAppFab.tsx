import { site, waLink } from '@/content/site'
import { getDict } from '@/i18n/dict'
import type { Locale } from '@/i18n/config'
import { WhatsAppIcon } from './Icon'

export function WhatsAppFab({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  const greeting = locale === 'ar'
    ? `مرحبًا ${site.name}، أودّ الاستفسار عن منتجاتكم.`
    : `Hello ${site.name}, I would like to enquire about your products.`
  return (
    <a
      href={waLink(greeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.common.whatsappUs}
      className="group fixed bottom-5 end-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-xl shadow-black/20 transition-transform hover:scale-105 sm:bottom-6 sm:end-6"
    >
      <WhatsAppIcon className="size-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-48 group-hover:pe-2 sm:inline">
        {t.common.whatsappUs}
      </span>
    </a>
  )
}
