'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { href, tr, type Locale } from '@/i18n/config'
import { services } from '@/content/company'
import { getDict } from '@/i18n/dict'
import { Icon } from './Icon'
import { Checklist } from './sections'
import { buttonClass, cx } from './ui'

/** Sidebar tab list of services; the URL hash selects the active service. */
export function ServicesTabs({ locale }: { locale: Locale }) {
  const t = getDict(locale)
  const [active, setActive] = useState(services[0].id)
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1)
      if (services.some((s) => s.id === h)) setActive(h)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  const s = services.find((x) => x.id === active)!
  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-2">
        {services.map((x) => (
          <button
            key={x.id}
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={x.id === active}
            aria-controls={`panel-${x.id}`}
            onClick={() => { setActive(x.id); history.replaceState(null, '', `#${x.id}`) }}
            className={cx('flex items-center gap-3 rounded-lg px-4 py-4 text-start font-heading text-sm font-extrabold uppercase transition',
              x.id === active ? 'bg-gold-500 text-navy-950 shadow-card' : 'bg-navy-900 text-white hover:bg-navy-800')}
          >
            <Icon name={x.icon} className="size-5 shrink-0" />
            {tr(x.title, locale)}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${s.id}`} aria-labelledby={`tab-${s.id}`} className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-600"><span className="size-2 bg-gold-500" />{t.services.eyebrow}</p>
        <h2 className="font-heading text-2xl font-black uppercase text-navy-900 sm:text-3xl">{tr(s.title, locale)}</h2>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">{tr(s.body, locale)}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-start">
          <Checklist items={s.points.map((p) => tr(p, locale))} />
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
            <Image src={s.image} alt={tr(s.title, locale)} fill sizes="(min-width:1024px) 30vw, 100vw" className="photo object-cover" />
          </div>
        </div>
        <Link href={href(locale, '/quote')} className={buttonClass('gold', 'mt-8')}>{t.common.requestQuote} <ArrowRight className="flip-rtl size-4" /></Link>
      </div>
    </div>
  )
}
