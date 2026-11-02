'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ClipboardList, Menu, X } from 'lucide-react'
import { href, tr, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { categories } from '@/content/products'
import { useQuote } from '@/lib/quote-store'
import { LangSwitch } from './LangSwitch'
import { buttonClass, cx } from './ui'

export function Header({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  const pathname = usePathname() || `/${locale}`
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const megaRef = useRef<HTMLLIElement>(null)
  const { state } = useQuote()
  const count = state.lines.length

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setOpen(false); setMega(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  useEffect(() => {
    if (!mega) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !megaRef.current?.contains(e.target as Node)) setMega(false)
    }
    document.addEventListener('click', close)
    document.addEventListener('keydown', close)
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', close) }
  }, [mega])

  const rest = pathname.replace(/^\/(en|ar)(?=\/|$)/, '')
  const isActive = (p: string) => (p === '' ? rest === '' : rest === p || rest.startsWith(p + '/'))
  const nav = [
    { path: '', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/products', label: t.nav.products, mega: true },
    { path: '/services', label: t.nav.services },
    { path: '/export', label: t.nav.export },
    { path: '/faq', label: t.nav.faq },
    { path: '/contact', label: t.nav.contact },
  ]
  const linkCls = (active: boolean) =>
    cx('relative flex h-full items-center gap-1 px-3 text-[0.82rem] font-bold uppercase tracking-wide transition-colors xl:px-4',
      active ? 'text-gold-600' : 'text-navy-900 hover:text-gold-600')

  return (
    <header className={cx('sticky top-0 z-50 bg-white transition-shadow', scrolled ? 'shadow-[0_6px_24px_-12px_rgb(7_26_68/0.35)]' : 'border-b border-line')}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white">
        {t.nav.skip}
      </a>
      <div className="mx-auto flex h-20 max-w-[80rem] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[5.5rem] lg:px-8">
        <Link href={href(locale)} className="shrink-0" aria-label="The SAACO Global Trading Company — home">
          <Image src="/images/brand/saaco-logo.png" alt="The SAACO Global Trading Company" width={660} height={306} priority sizes="190px" className="h-14 w-auto lg:h-[4.25rem]" />
        </Link>

        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-stretch">
            {nav.map((n) =>
              n.mega ? (
                <li key={n.path} ref={megaRef} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <div className="flex h-full items-stretch">
                    <Link href={href(locale, n.path)} aria-current={isActive(n.path) ? 'page' : undefined} className={cx(linkCls(isActive(n.path)), 'pe-1 xl:pe-1')}>
                      {n.label}
                    </Link>
                    <button
                      type="button"
                      className="flex items-center pe-2 text-navy-900 hover:text-gold-600"
                      aria-expanded={mega}
                      aria-controls="mega-products"
                      aria-label={locale === 'ar' ? 'فئات المنتجات' : 'Product categories'}
                      onClick={(e) => { e.stopPropagation(); setMega((m) => !m) }}
                    >
                      <ChevronDown className={cx('size-4 transition-transform', mega && 'rotate-180')} aria-hidden />
                    </button>
                  </div>
                  <div
                    id="mega-products"
                    hidden={!mega}
                    className="absolute start-1/2 top-full w-[44rem] -translate-x-1/2 rounded-b-lg border border-line bg-white p-5 shadow-lift rtl:translate-x-1/2"
                  >
                    <ul className="grid grid-cols-2 gap-2">
                      {categories.map((c) => (
                        <li key={c.slug}>
                          <Link href={href(locale, `/products/${c.slug}`)} className="group flex items-center gap-3 rounded-md p-2 hover:bg-mist">
                            <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-mist">
                              <Image src={c.cover} alt="" fill sizes="56px" className="photo object-cover" />
                            </span>
                            <span>
                              <span className="block font-heading text-sm font-bold uppercase text-navy-900 group-hover:text-gold-600">{tr(c.name, locale)}</span>
                              <span className="block text-xs text-muted">{c.items.length} {locale === 'ar' ? 'منتجات' : 'products'}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={href(locale, '/products')} className="mt-4 flex items-center justify-between rounded-md bg-navy-900 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-navy-800">
                      {t.common.allProducts}
                      <span className="text-gold-400">→</span>
                    </Link>
                  </div>
                </li>
              ) : (
                <li key={n.path}>
                  <Link href={href(locale, n.path || '/')} aria-current={isActive(n.path) ? 'page' : undefined} className={linkCls(isActive(n.path))}>
                    {n.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={href(locale, '/quote')} className="relative rounded-md p-2.5 text-navy-900 hover:bg-mist" aria-label={`${t.nav.quoteBasket} (${count})`}>
            <ClipboardList className="size-6" aria-hidden />
            <span className={cx('absolute -end-0.5 -top-0.5 grid size-5 place-items-center rounded-full text-[0.68rem] font-bold', count ? 'bg-gold-500 text-navy-950' : 'bg-mist text-muted')}>{count}</span>
          </Link>
          <span className="hidden sm:block"><Link href={href(locale, '/quote')} className={buttonClass('gold')}>{t.nav.quote}</Link></span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2.5 text-navy-900 hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-white px-4 pb-10 lg:hidden">
        <nav aria-label="Mobile">
          <ul>
            {nav.map((n) => (
              <li key={n.path} className="border-b border-line">
                <Link href={href(locale, n.path || '/')} className={cx('block py-4 font-heading text-lg font-bold uppercase', isActive(n.path) ? 'text-gold-600' : 'text-navy-900')}>
                  {n.label}
                </Link>
                {n.mega && (
                  <ul className="grid grid-cols-2 gap-2 pb-4">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link href={href(locale, `/products/${c.slug}`)} className="block rounded-md bg-mist px-3 py-2.5 text-sm font-semibold text-navy-900">{tr(c.name, locale)}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 flex flex-col gap-3">
          <Link href={href(locale, '/quote')} className={buttonClass('gold')}>{t.nav.quote}</Link>
          <LangSwitch locale={locale} className={buttonClass('outline')} />
        </div>
      </div>
    </header>
  )
}
