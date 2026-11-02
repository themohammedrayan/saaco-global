import { describe, expect, it } from 'vitest'
import { formatEnquiry, mailtoUrl, makeRef, validateEnquiry, whatsappUrl, type Enquiry } from '../enquiry'

const base: Enquiry = {
  ref: 'SG-261102-ABCD',
  type: 'quote',
  lines: [
    { id: 'green-cardamom', name: 'Green Cardamom', category: 'Spices', qty: '500', unit: 'kg' },
    { id: 'black-pepper', name: 'Black Pepper', category: 'Spices', qty: '', unit: 'mt' },
  ],
  name: 'Omar Haddad',
  company: 'Haddad Trading LLC',
  country: 'United Arab Emirates',
  email: 'omar@example.com',
  incoterm: 'CIF',
  port: 'Jebel Ali',
  message: 'Need 8mm bold grade.',
}

describe('makeRef', () => {
  it('is deterministic given time and randomness', () => {
    expect(makeRef(new Date(Date.UTC(2026, 10, 2)), () => 0)).toBe('SG-261102-AAAA')
  })
})

describe('validateEnquiry', () => {
  it('accepts a complete enquiry', () => {
    expect(validateEnquiry(base)).toEqual({})
  })
  it('flags missing name, country, contact and content', () => {
    expect(validateEnquiry({ ...base, name: ' ', country: '', email: '', phone: '', lines: [], message: '' })).toEqual({
      name: true,
      country: true,
      contact: true,
      content: true,
    })
  })
  it('accepts phone without email and rejects malformed email', () => {
    expect(validateEnquiry({ ...base, email: '', phone: '+971 50 000 0000' })).toEqual({})
    expect(validateEnquiry({ ...base, email: 'not-an-email' })).toEqual({ email: true })
  })
  it('can skip the country requirement (quick contact form)', () => {
    expect(validateEnquiry({ ...base, country: '' }, { requireCountry: false })).toEqual({})
  })
})

describe('formatEnquiry', () => {
  it('lists products with quantities and TBC for blanks', () => {
    const text = formatEnquiry(base)
    expect(text).toContain('Ref: SG-261102-ABCD')
    expect(text).toContain('1. Green Cardamom (Spices) — 500 kg')
    expect(text).toContain('2. Black Pepper (Spices) — qty TBC')
    expect(text).toContain('Incoterm: CIF')
    expect(text).not.toContain('Phone:')
  })
  it('keeps Arabic input intact through URL encoding', () => {
    const e = { ...base, name: 'عمر حداد', message: 'نحتاج الهيل الأخضر' }
    const url = whatsappUrl(e)
    expect(url.startsWith('https://wa.me/917592030338?text=')).toBe(true)
    const decoded = decodeURIComponent(url.split('?text=')[1])
    expect(decoded).toContain('Name: عمر حداد')
    expect(decoded).toContain('نحتاج الهيل الأخضر')
  })
  it('builds a mailto with subject including ref and company', () => {
    const url = mailtoUrl(base)
    expect(url.startsWith('mailto:sales@saacoglobal.com?subject=')).toBe(true)
    expect(decodeURIComponent(url)).toContain('Price quotation SG-261102-ABCD — Haddad Trading LLC')
  })
})
