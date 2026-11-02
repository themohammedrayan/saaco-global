import { Mail, Phone } from 'lucide-react'
import { tr, type Locale } from '@/i18n/config'
import { countries, site, waLink } from '@/content/site'
import { WhatsAppIcon } from './Icon'
import { Container } from './ui'
import { LangSwitch } from './LangSwitch'

export function TopBar({ locale }: { locale: Locale }) {
  return (
    <div className="bg-navy-950 text-[0.8rem] text-white/80">
      <Container className="flex h-10 items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <a href={`tel:${site.contact.phoneE164}`} className="flex items-center gap-1.5 hover:text-gold-400">
            <Phone className="size-3.5" aria-hidden /><span dir="ltr" className="hidden sm:inline">{site.contact.phone}</span>
            <span className="sr-only sm:hidden">{site.contact.phone}</span>
          </a>
          <a href={`mailto:${site.contact.email}`} className="flex items-center gap-1.5 hover:text-gold-400">
            <Mail className="size-3.5" aria-hidden /><span className="hidden md:inline">{site.contact.email}</span>
            <span className="sr-only md:hidden">{site.contact.email}</span>
          </a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gold-400">
            <WhatsAppIcon className="size-3.5" /><span className="hidden lg:inline">WhatsApp</span>
          </a>
        </div>
        <p className="hidden items-center gap-2 xl:flex">
          {countries.map((c, i) => (
            <span key={c.code} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-gold-500">•</span>}
              {tr(c.name, locale)}
            </span>
          ))}
        </p>
        <LangSwitch locale={locale} className="font-semibold text-white hover:text-gold-400" />
      </Container>
    </div>
  )
}
