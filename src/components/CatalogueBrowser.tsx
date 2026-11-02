'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { tr, type Locale } from '@/i18n/config'
import type { Category } from '@/content/products'
import { ProductCard } from './sections'
import { cx } from './ui'

/** Client-side filter + search over the static product list. */
export function CatalogueBrowser({ categories, locale }: { categories: Category[]; locale: Locale }) {
  const ar = locale === 'ar'
  const [cat, setCat] = useState<string>('all')
  const [q, setQ] = useState('')
  const all = useMemo(() => categories.flatMap((c) => c.items.map((i) => ({ c, i }))), [categories])
  const needle = q.trim().toLowerCase()
  const list = all.filter(({ c, i }) =>
    (cat === 'all' || c.slug === cat) &&
    (!needle || [i.name.en, i.name.ar, i.latin ?? '', c.name.en, c.name.ar, i.forms.en, i.forms.ar].some((x) => x.toLowerCase().includes(needle))),
  )
  const chip = (active: boolean) =>
    cx('shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition', active ? 'border-navy-800 bg-navy-800 text-white' : 'border-line bg-white text-navy-900 hover:border-navy-800')

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-lg border border-line bg-white p-4 shadow-card lg:flex-row lg:items-center">
        <label className="relative block lg:w-80">
          <span className="sr-only">{ar ? 'ابحث عن منتج' : 'Search products'}</span>
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ar ? 'ابحث: هيل، قهوة، عسل…' : 'Search: cardamom, coffee, honey…'}
            className="w-full rounded-md border border-line bg-mist py-2.5 pe-9 ps-9 text-sm focus:border-navy-600 focus:bg-white focus:outline-none"
          />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label={ar ? 'مسح' : 'Clear'} className="absolute end-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-navy-900">
              <X className="size-4" />
            </button>
          )}
        </label>
        <div role="group" aria-label={ar ? 'تصفية حسب الفئة' : 'Filter by category'} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          <button type="button" aria-pressed={cat === 'all'} onClick={() => setCat('all')} className={chip(cat === 'all')}>
            {ar ? 'الكل' : 'All'} <span className="opacity-60">({all.length})</span>
          </button>
          {categories.map((c) => (
            <button key={c.slug} type="button" aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)} className={chip(cat === c.slug)}>
              {tr(c.name, locale)} <span className="opacity-60">({c.items.length})</span>
            </button>
          ))}
        </div>
      </div>
      <p className="mb-4 text-sm text-muted" aria-live="polite">
        {ar ? `${list.length} منتج` : `${list.length} product${list.length === 1 ? '' : 's'}`}
      </p>
      {list.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map(({ c, i }) => <ProductCard key={i.id} c={c} i={i} locale={locale} reveal={false} />)}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-line p-10 text-center text-muted">
          {ar ? 'لا توجد نتائج. جرّب كلمة أخرى أو اطلب المنتج مباشرة.' : 'No matches. Try another word — or ask us for the product directly.'}
        </p>
      )}
    </div>
  )
}
