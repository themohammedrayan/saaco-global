'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ClipboardList, Languages, Menu, X } from 'lucide-react'
import { href, localeNames, locales, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { useQuote } from '@/lib/quote-store'
import { buttonClass, cx } from './ui'

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  const pathname = usePathname() || `/${locale}`
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { state } = useQuote()
  const count = state.lines.length

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const nav = [
    { path: '/products', label: t.nav.products },
    { path: '/export', label: t.nav.export },
    { path: '/services', label: t.nav.services },
    { path: '/about', label: t.nav.about },
    { path: '/faq', label: t.nav.faq },
    { path: '/contact', label: t.nav.contact },
  ]
  const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, '')
  const other = locales.find((l) => l !== locale)!
  const isActive = (p: string) => rest === p || rest.startsWith(p + '/')
  const solid = scrolled || open

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'bg-cream/95 text-forest-900 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md' : 'bg-transparent text-white',
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-forest-900">
        {t.nav.skip}
      </a>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href={href(locale)} className="flex shrink-0 items-center gap-2" aria-label="SAACO Global — home">
          <span className={cx('rounded-lg p-1 transition-colors', solid ? 'bg-transparent' : 'bg-white/95')}>
            <Image src="/images/brand/logo-wide.png" alt="SAACO Global" width={218} height={109} priority className="h-10 w-auto lg:h-12" />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.path}
              href={href(locale, n.path)}
              aria-current={isActive(n.path) ? 'page' : undefined}
              className={cx(
                'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                isActive(n.path)
                  ? solid ? 'bg-forest-100 text-forest-900' : 'bg-white/15'
                  : solid ? 'hover:bg-forest-50' : 'hover:bg-white/10',
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={href(other, rest || '/')}
            hrefLang={other}
            lang={other}
            className={cx('hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium sm:inline-flex', solid ? 'hover:bg-forest-50' : 'hover:bg-white/10')}
            aria-label={`${t.nav.language}: ${localeNames[other]}`}
          >
            <Languages className="size-4" aria-hidden /> {localeNames[other]}
          </Link>
          <Link
            href={href(locale, '/quote')}
            className={cx('relative rounded-full p-2.5', solid ? 'hover:bg-forest-50' : 'hover:bg-white/10')}
            aria-label={`${t.nav.quoteBasket} (${count})`}
          >
            <ClipboardList className="size-5" aria-hidden />
            {count > 0 && (
              <span className="absolute -end-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-saffron-500 text-[11px] font-bold text-forest-950">
                {count}
              </span>
            )}
          </Link>
          <Link href={href(locale, '/quote')} className={buttonClass('primary', 'hidden px-5 py-2.5 md:inline-flex')}>
            {t.nav.quote}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={cx('rounded-full p-2.5 lg:hidden', solid ? 'hover:bg-forest-50' : 'hover:bg-white/10')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-cream px-4 pb-10 pt-4 text-forest-900 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {[{ path: '', label: t.nav.home }, ...nav].map((n) => (
            <Link
              key={n.path}
              href={href(locale, n.path || '/')}
              className="border-b border-line py-4 font-display text-2xl"
              aria-current={(n.path ? isActive(n.path) : rest === '') ? 'page' : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <Link href={href(locale, '/quote')} className={buttonClass('primary')}>{t.nav.quote}</Link>
          <Link href={href(other, rest || '/')} hrefLang={other} lang={other} className={buttonClass('outline')}>
            <Languages className="size-4" aria-hidden /> {localeNames[other]}
          </Link>
        </div>
      </div>
    </header>
  )
}
