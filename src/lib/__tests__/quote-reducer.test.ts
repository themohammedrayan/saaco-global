import { describe, expect, it } from 'vitest'
import { emptyQuote, quoteReducer, sanitize } from '../quote-reducer'

const line = { id: 'clove', name: 'Clove', category: 'Spices' }

describe('quoteReducer', () => {
  it('adds once, ignoring duplicates', () => {
    let s = quoteReducer(emptyQuote, { type: 'add', line })
    s = quoteReducer(s, { type: 'add', line })
    expect(s.lines).toHaveLength(1)
    expect(s.lines[0]).toMatchObject({ qty: '', unit: 'kg' })
  })
  it('updates qty and unit, removes and clears', () => {
    let s = quoteReducer(emptyQuote, { type: 'add', line })
    s = quoteReducer(s, { type: 'update', id: 'clove', qty: '2', unit: 'mt' })
    expect(s.lines[0]).toMatchObject({ qty: '2', unit: 'mt' })
    expect(quoteReducer(s, { type: 'remove', id: 'clove' }).lines).toHaveLength(0)
    expect(quoteReducer(s, { type: 'clear' })).toEqual(emptyQuote)
  })
})

describe('sanitize', () => {
  it('drops junk from persisted state', () => {
    expect(sanitize(null)).toEqual(emptyQuote)
    expect(sanitize({ lines: 'x' })).toEqual(emptyQuote)
    const s = sanitize({ lines: [{ id: 'a', name: 'A', unit: 'bogus', qty: 5 }, { nope: 1 }] })
    expect(s.lines).toEqual([{ id: 'a', name: 'A', category: '', qty: '', unit: 'kg' }])
  })
})
