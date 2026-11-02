'use client'

import Link from 'next/link'
import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Mail, Trash2 } from 'lucide-react'
import { href, type Locale } from '@/i18n/config'
import { getDict } from '@/i18n/dict'
import { site } from '@/content/site'
import { countryOptions } from '@/lib/countries'
import { mailtoUrl, makeRef, validateEnquiry, whatsappUrl, type Enquiry, type EnquiryErrors, type EnquiryType, type Unit } from '@/lib/enquiry'
import { useQuote } from '@/lib/quote-store'
import { WhatsAppIcon } from './Icon'
import { buttonClass, cx } from './ui'

const UNITS: Unit[] = ['kg', 'mt', 'cartons', 'containers']
const INCOTERMS = ['FOB', 'CIF', 'CFR', 'EXW']

const inputCls =
  'w-full rounded-md border border-line bg-white px-3.5 py-3 text-ink placeholder:text-muted/70 transition focus:border-navy-600 focus:outline-none focus:ring-4 focus:ring-navy-600/10 aria-[invalid=true]:border-red-500'

function Field({ label, id, required, error, children }: { label: string; id: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-navy-900">
        {label}{required && <span className="text-red-600" aria-hidden> *</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  )
}

/**
 * Builds an enquiry and hands it off to WhatsApp or the buyer's mail client.
 * `compact` = short contact form (no basket, country optional).
 */
export function QuoteForm({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = getDict(locale)
  const q = t.quote
  const { state, dispatch } = useQuote()
  const lines = compact ? [] : state.lines
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([])
  useEffect(() => setCountries(countryOptions(locale)), [locale])

  const [type, setType] = useState<EnquiryType>(compact ? 'general' : 'quote')
  const [f, setF] = useState({ name: '', company: '', country: '', email: '', phone: '', incoterm: '', port: '', message: '' })
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [sent, setSent] = useState<string | null>(null)
  useEffect(() => {
    if (!compact && window.location.hash === '#sample') setType('sample')
  }, [compact])
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }))

  const build = (): Enquiry => {
    const countryName = countries.find((c) => c.code === f.country)
    const enName = f.country ? new Intl.DisplayNames(['en'], { type: 'region' }).of(f.country) : ''
    return {
      ref: makeRef(),
      type,
      lines,
      name: f.name,
      company: f.company,
      country: enName || countryName?.name || '',
      email: f.email,
      phone: f.phone,
      incoterm: f.incoterm,
      port: f.port,
      message: f.message,
      page: typeof window !== 'undefined' ? window.location.href : undefined,
    }
  }

  const submit = (channel: 'wa' | 'mail') => (e?: FormEvent) => {
    e?.preventDefault()
    const enq = build()
    const errs = validateEnquiry(enq, { requireCountry: !compact })
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }
    const url = channel === 'wa' ? whatsappUrl(enq) : mailtoUrl(enq)
    if (channel === 'wa') window.open(url, '_blank', 'noopener,noreferrer')
    else window.location.href = url
    setSent(enq.ref)
  }

  const err = (k: keyof EnquiryErrors) => (errors[k] ? q.errors[k] : undefined)
  const inv = (k: keyof EnquiryErrors) => (errors[k] ? true : undefined)

  return (
    <form noValidate onSubmit={submit('wa')} className="min-w-0 space-y-8">
      {!compact && (
        <fieldset className="min-w-0 rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
          <legend className="sr-only">{q.title}</legend>
          {lines.length === 0 ? (
            <div className="text-center">
              <p className="text-ink-2">{q.empty}</p>
              <Link href={href(locale, '/products')} className={buttonClass('outline', 'mt-5')}>{q.browse}</Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-line">
                {lines.map((l) => (
                  <li key={l.id} className="grid grid-cols-[1fr_auto] items-center gap-3 py-4 sm:grid-cols-[1fr_8rem_11rem_auto]">
                    <div>
                      <p className="font-heading font-extrabold uppercase text-navy-900">{l.name}</p>
                      <p className="text-sm text-muted">{l.category}</p>
                    </div>
                    <button type="button" onClick={() => dispatch({ type: 'remove', id: l.id })} aria-label={`${q.remove} ${l.name}`} className="rounded-md p-2 text-muted hover:bg-red-50 hover:text-red-600 sm:order-last">
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                    <label className="sr-only" htmlFor={`qty-${l.id}`}>{q.quantity} — {l.name}</label>
                    <input id={`qty-${l.id}`} inputMode="decimal" placeholder={q.quantity} value={l.qty} maxLength={20}
                      onChange={(e) => dispatch({ type: 'update', id: l.id, qty: e.target.value })} className={inputCls} />
                    <label className="sr-only" htmlFor={`unit-${l.id}`}>{q.unit} — {l.name}</label>
                    <select id={`unit-${l.id}`} value={l.unit} onChange={(e) => dispatch({ type: 'update', id: l.id, unit: e.target.value as Unit })} className={inputCls}>
                      {UNITS.map((u) => <option key={u} value={u}>{q.units[u]}</option>)}
                    </select>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => dispatch({ type: 'clear' })} className="mt-4 text-sm font-semibold text-muted hover:text-red-600">{q.clear}</button>
            </>
          )}
          {err('content') && <p role="alert" className="mt-4 text-sm text-red-600">{err('content')}</p>}
        </fieldset>
      )}

      <fieldset className={cx('min-w-0', !compact && 'rounded-lg border border-line bg-white p-6 shadow-card sm:p-8')}>
        {!compact && (
          <>
            <legend className="sr-only">{q.details}</legend>
            <h2 aria-hidden className="mb-6 font-heading text-xl font-extrabold uppercase text-navy-900">{q.details}</h2>
          </>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {!compact && (
            <div className="sm:col-span-2">
              <p className="mb-2 text-sm font-bold text-navy-900">{q.type}</p>
              <div role="radiogroup" className="flex flex-wrap gap-2">
                {([['quote', q.typeQuote], ['sample', q.typeSample], ['general', q.typeGeneral]] as const).map(([v, l]) => (
                  <label key={v} className={cx('cursor-pointer rounded-full border px-4 py-2 text-sm font-bold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-500',
                    type === v ? 'border-navy-800 bg-navy-800 text-white' : 'border-line bg-white text-navy-900 hover:border-navy-800')}>
                    <input type="radio" name="type" value={v} checked={type === v} onChange={() => setType(v)} className="sr-only" />
                    {l}
                  </label>
                ))}
              </div>
            </div>
          )}
          <Field label={q.name} id="name" required error={err('name')}>
            <input id="name" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={inv('name')} aria-describedby={errors.name ? 'name-err' : undefined} className={inputCls} />
          </Field>
          <Field label={q.company} id="company">
            <input id="company" autoComplete="organization" value={f.company} onChange={set('company')} className={inputCls} />
          </Field>
          <Field label={q.email} id="email" error={err('email') ?? err('contact')}>
            <input id="email" type="email" dir="ltr" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={inv('email') ?? inv('contact')} aria-describedby={errors.email || errors.contact ? 'email-err' : undefined} className={inputCls} />
          </Field>
          <Field label={q.phone} id="phone">
            <input id="phone" type="tel" dir="ltr" autoComplete="tel" value={f.phone} onChange={set('phone')} aria-invalid={inv('contact')} className={inputCls} />
          </Field>
          <Field label={q.country} id="country" required={!compact} error={err('country')}>
            <select id="country" autoComplete="country" value={f.country} onChange={set('country')} aria-invalid={inv('country')} aria-describedby={errors.country ? 'country-err' : undefined} className={inputCls}>
              <option value="">{q.selectCountry}</option>
              {countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </Field>
          {!compact && (
            <>
              <Field label={q.incoterm} id="incoterm">
                <select id="incoterm" value={f.incoterm} onChange={set('incoterm')} className={inputCls}>
                  <option value="">{locale === 'ar' ? 'أي / غير متأكد' : 'Any / not sure'}</option>
                  {INCOTERMS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label={q.port} id="port">
                  <input id="port" value={f.port} onChange={set('port')} placeholder="Jebel Ali, Rotterdam, Singapore…" className={inputCls} />
                </Field>
              </div>
            </>
          )}
          <div className="sm:col-span-2">
            <Field label={q.message} id="message" error={compact ? err('content') : undefined}>
              <textarea id="message" rows={compact ? 4 : 5} value={f.message} onChange={set('message')} placeholder={q.messagePlaceholder} aria-invalid={compact ? inv('content') : undefined} className={inputCls} />
            </Field>
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className={buttonClass('whatsapp')}>
          <WhatsAppIcon className="size-5" /> {q.sendWhatsApp}
        </button>
        <button type="button" onClick={submit('mail')} className={buttonClass('navy')}>
          <Mail className="size-4" aria-hidden /> {q.sendEmail}
        </button>
        <p className="text-sm text-muted sm:ms-2">{q.privacy}</p>
      </div>

      {sent && (
        <div role="status" className="rounded-lg border border-gold-500 bg-gold-50 p-5 text-sm">
          <p className="flex flex-wrap items-center gap-2 font-semibold">{q.sentTitle} — {q.reference}: <span dir="ltr" className="font-mono">{sent}</span></p>
          <p className="mt-2 text-muted">
            {q.sentBody}{' '}
            <a className="font-semibold underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> ·{' '}
            <a dir="ltr" className="font-semibold underline" href={`tel:${site.contact.phoneE164}`}>{site.contact.phone}</a>
          </p>
        </div>
      )}
    </form>
  )
}
