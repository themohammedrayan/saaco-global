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
      className="fixed bottom-4 end-4 z-40 grid size-14 place-items-center border border-ink bg-paper text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white sm:bottom-6 sm:end-6"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  )
}
