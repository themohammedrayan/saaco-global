import { site } from '@/content/site'

export type Unit = 'kg' | 'mt' | 'cartons' | 'containers'
export type EnquiryType = 'quote' | 'sample' | 'general'

export type QuoteLine = { id: string; name: string; category: string; qty: string; unit: Unit }

export type Enquiry = {
  ref: string
  type: EnquiryType
  lines: QuoteLine[]
  name: string
  company?: string
  country?: string
  email?: string
  phone?: string
  incoterm?: string
  port?: string
  message?: string
  page?: string
}

export type EnquiryErrors = Partial<Record<'name' | 'country' | 'contact' | 'email' | 'content', true>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEnquiry(e: Enquiry, opts: { requireCountry?: boolean } = {}): EnquiryErrors {
  const err: EnquiryErrors = {}
  if (!e.name.trim()) err.name = true
  if (opts.requireCountry !== false && !e.country?.trim()) err.country = true
  const email = e.email?.trim() ?? ''
  const phone = e.phone?.trim() ?? ''
  if (!email && !phone) err.contact = true
  if (email && !EMAIL_RE.test(email)) err.email = true
  if (e.lines.length === 0 && !e.message?.trim()) err.content = true
  return err
}

/** Reference like SG-261102-K7Q2. `now` and `rand` are injectable for tests. */
export function makeRef(now: Date = new Date(), rand: () => number = Math.random): string {
  const yy = String(now.getUTCFullYear()).slice(2)
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(now.getUTCDate()).padStart(2, '0')
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let tail = ''
  for (let i = 0; i < 4; i++) tail += alphabet[Math.floor(rand() * alphabet.length)]
  return `SG-${yy}${mm}${dd}-${tail}`
}

const TYPE_LABEL: Record<EnquiryType, string> = {
  quote: 'Price quotation',
  sample: 'Sample request',
  general: 'General enquiry',
}

const UNIT_LABEL: Record<Unit, string> = { kg: 'kg', mt: 'MT', cartons: 'cartons', containers: 'containers' }

/**
 * Plain-text enquiry, always in English field labels so the sales team can
 * process every message the same way (buyer-entered values are kept as typed).
 */
export function formatEnquiry(e: Enquiry): string {
  const out: string[] = []
  out.push(`${TYPE_LABEL[e.type]} — ${site.name}`)
  out.push(`Ref: ${e.ref}`)
  out.push('')
  if (e.lines.length) {
    out.push('Products:')
    e.lines.forEach((l, i) => {
      const qty = l.qty.trim() ? `${l.qty.trim()} ${UNIT_LABEL[l.unit]}` : 'qty TBC'
      out.push(`${i + 1}. ${l.name} (${l.category}) — ${qty}`)
    })
    out.push('')
  }
  const field = (label: string, v?: string) => {
    if (v && v.trim()) out.push(`${label}: ${v.trim()}`)
  }
  field('Name', e.name)
  field('Company', e.company)
  field('Country', e.country)
  field('Email', e.email)
  field('Phone', e.phone)
  field('Incoterm', e.incoterm)
  field('Destination', e.port)
  if (e.message?.trim()) {
    out.push('')
    out.push('Message:')
    out.push(e.message.trim())
  }
  if (e.page) {
    out.push('')
    out.push(`Sent from: ${e.page}`)
  }
  return out.join('\n')
}

export function whatsappUrl(e: Enquiry): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(formatEnquiry(e))}`
}

export function mailtoUrl(e: Enquiry): string {
  const subject = `${TYPE_LABEL[e.type]} ${e.ref}${e.company ? ` — ${e.company}` : ''}`
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formatEnquiry(e))}`
}
