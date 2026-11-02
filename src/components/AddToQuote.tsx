'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { href, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { useQuote } from '@/lib/quote-store'
import { cx } from './ui'

/** Names are stored in English so the sales team receives consistent product names. */
export function AddToQuote({ locale, id, name, category }: { locale: Locale; id: string; name: string; category: string }) {
  const t = getDict(locale)
  const { state, dispatch } = useQuote()
  const added = state.lines.some((l) => l.id === id)
  if (added) {
    return (
      <Link href={href(locale, '/quote')} className="inline-flex items-center justify-center gap-1.5 rounded-md bg-navy-100 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-navy-800">
        ✓ {t.products.added}
      </Link>
    )
  }
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'add', line: { id, name, category } })}
      className={cx('inline-flex items-center justify-center gap-1.5 rounded-md bg-navy-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-gold-500 hover:text-navy-950')}
    >
      + {t.products.addToQuote}
    </button>
  )
}

export function QuoteBasketPill({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  const { state } = useQuote()
  const n = state.lines.length
  if (!n) return null
  return (
    <Link
      href={href(locale, '/quote')}
      className="fixed bottom-5 start-5 z-40 inline-flex items-center gap-3 rounded-full bg-navy-900 px-5 py-3.5 text-sm font-bold text-white shadow-lift ring-4 ring-white sm:bottom-6 sm:start-6"
    >
      {t.nav.quoteBasket}
      <span className="grid size-6 place-items-center rounded-full bg-gold-500 text-xs text-navy-950 tabular-nums">{n}</span>
    </Link>
  )
}

export function RequestSamples({ locale, lines }: { locale: Locale; lines: { id: string; name: string; category: string }[] }) {
  const t = getDict(locale)
  const { dispatch } = useQuote()
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => {
        lines.forEach((line) => dispatch({ type: 'add', line }))
        router.push(href(locale, '/quote') + '#sample')
      }}
      className="inline-flex items-center justify-center gap-2.5 rounded-md border-2 border-current px-5 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white hover:text-navy-900"
    >
      {t.products.requestSamples}
    </button>
  )
}
