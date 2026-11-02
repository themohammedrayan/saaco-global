'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { href, localeNames, locales, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { useQuote } from '@/lib/quote-store'
import { cx } from './ui'

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  const pathname = usePathname() || `/${locale}`
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { state } = useQuote()
  const count = state.lines.length

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
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

  return (
    <header className={cx('sticky top-0 z-50 border-b bg-paper/95 backdrop-blur transition-colors', scrolled ? 'border-ink' : 'border-rule')}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        {t.nav.skip}
      </a>
      <div className="mx-auto flex h-[4.5rem] max-w-[88rem] items-stretch justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link href={href(locale)} className="flex shrink-0 items-center gap-3" aria-label="SAACO Global — home">
          <Image src="/images/brand/saaco-logo.png" alt="The SAACO Global Trading Company" width={660} height={306} priority sizes="180px" className="h-14 w-auto lg:h-[4.25rem]" />
        </Link>

        <nav aria-label="Main" className="hidden items-stretch lg:flex">
          {nav.map((n) => (
            <Link
              key={n.path}
              href={href(locale, n.path)}
              aria-current={isActive(n.path) ? 'page' : undefined}
              className={cx(
                'label relative flex items-center px-3.5 transition-colors hover:text-wax xl:px-5',
                isActive(n.path) ? 'text-wax after:absolute after:inset-x-3.5 after:bottom-0 after:h-0.5 after:bg-wax xl:after:inset-x-5' : 'text-ink-2',
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-stretch">
          <Link
            href={href(other, rest || '/')}
            hrefLang={other}
            lang={other}
            className="hidden items-center border-s border-rule px-4 text-sm hover:text-wax sm:flex"
            aria-label={`${t.nav.language}: ${localeNames[other]}`}
          >
            {localeNames[other]}
          </Link>
          <Link
            href={href(locale, '/quote')}
            className="label flex items-center gap-2 border-s border-rule bg-ink px-4 text-paper transition-colors hover:bg-wax sm:px-6"
            aria-label={`${t.nav.quoteBasket} (${count})`}
          >
            <span className="hidden sm:inline">{t.nav.quote}</span>
            <span className="sm:hidden">{locale === 'ar' ? 'عرض' : 'Quote'}</span>
            <span className={cx('grid h-5 min-w-5 place-items-center px-1 text-[0.65rem] tabular-nums', count ? 'bg-wax text-paper' : 'bg-paper/15')}>{count}</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="label flex items-center border-s border-rule ps-4 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-ink bg-paper px-5 pb-10 lg:hidden">
        <nav aria-label="Mobile">
          <ol>
            {[{ path: '', label: t.nav.home }, ...nav].map((n, i) => (
              <li key={n.path} className="border-b border-rule">
                <Link href={href(locale, n.path || '/')} className="flex items-baseline gap-4 py-4" aria-current={(n.path ? isActive(n.path) : rest === '') ? 'page' : undefined}>
                  <span className="label w-6 text-muted">{String(i).padStart(2, '0')}</span>
                  <span className="font-display text-3xl">{n.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <Link href={href(other, rest || '/')} hrefLang={other} lang={other} className="mt-6 inline-block border border-ink px-5 py-3 text-sm">
          {localeNames[other]}
        </Link>
      </div>
    </header>
  )
}
