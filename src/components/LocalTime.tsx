'use client'

import { useEffect, useState } from 'react'
import { site } from '@/content/site'

export function LocalTime({ locale }: { locale: string }) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  if (!now) return <span className="tabular-nums">--:--</span>
  const fmt = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-AE' : 'en-GB', {
    timeZone: site.contact.timeZone, hour: '2-digit', minute: '2-digit', weekday: 'long',
  })
  return <time className="tabular-nums" dateTime={now.toISOString()}>{fmt.format(now)} (IST, UTC+5:30)</time>
}
