'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check, FlaskConical, Plus } from 'lucide-react'
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
      <Link
        href={href(locale, '/quote')}
        className="inline-flex items-center gap-1.5 rounded-full bg-forest-100 px-4 py-2 text-sm font-semibold text-forest-800"
      >
        <Check className="size-4" aria-hidden /> {t.products.added}
      </Link>
    )
  }
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'add', line: { id, name, category } })}
      className={cx('inline-flex items-center gap-1.5 rounded-full border border-forest-800/20 px-4 py-2 text-sm font-semibold text-forest-900 transition-colors hover:border-forest-800 hover:bg-forest-50')}
    >
      <Plus className="size-4" aria-hidden /> {t.products.addToQuote}
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
      className="fixed bottom-5 start-5 z-40 inline-flex items-center gap-2 rounded-full bg-forest-900 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-black/20 sm:bottom-6 sm:start-6"
    >
      {t.nav.quoteBasket}
      <span className="grid size-6 place-items-center rounded-full bg-saffron-500 text-xs text-forest-950">{n}</span>
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
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
    >
      <FlaskConical className="size-4" aria-hidden /> {t.products.requestSamples}
    </button>
  )
}
