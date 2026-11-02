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
      <Link href={href(locale, '/quote')} className="label inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 text-paper">
        ✓ {t.products.added}
      </Link>
    )
  }
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'add', line: { id, name, category } })}
      className={cx('label inline-flex items-center gap-2 border border-ink px-4 py-2.5 transition-colors hover:bg-ink hover:text-paper')}
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
      className="label fixed bottom-4 start-4 z-40 inline-flex items-center gap-3 border border-ink bg-ink px-5 py-4 text-paper shadow-[4px_4px_0_0_var(--color-wax)] sm:bottom-6 sm:start-6"
    >
      {t.nav.quoteBasket}
      <span className="grid h-5 min-w-5 place-items-center bg-wax px-1 tabular-nums">{n}</span>
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
      className="label inline-flex items-center justify-center gap-3 border border-ink px-6 py-4 !text-[0.72rem] transition-colors hover:bg-ink hover:text-paper"
    >
      {t.products.requestSamples}
    </button>
  )
}
