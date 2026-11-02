import type { QuoteLine, Unit } from './enquiry'

export type QuoteState = { lines: QuoteLine[] }

export type QuoteAction =
  | { type: 'add'; line: Omit<QuoteLine, 'qty' | 'unit'> & Partial<Pick<QuoteLine, 'qty' | 'unit'>> }
  | { type: 'remove'; id: string }
  | { type: 'update'; id: string; qty?: string; unit?: Unit }
  | { type: 'clear' }
  | { type: 'hydrate'; state: QuoteState }

export const emptyQuote: QuoteState = { lines: [] }
const UNITS: Unit[] = ['kg', 'mt', 'cartons', 'containers']

export function quoteReducer(state: QuoteState, a: QuoteAction): QuoteState {
  switch (a.type) {
    case 'add':
      if (state.lines.some((l) => l.id === a.line.id)) return state
      return { lines: [...state.lines, { qty: '', unit: 'kg', ...a.line }] }
    case 'remove':
      return { lines: state.lines.filter((l) => l.id !== a.id) }
    case 'update':
      return {
        lines: state.lines.map((l) =>
          l.id === a.id ? { ...l, ...(a.qty !== undefined && { qty: a.qty }), ...(a.unit && { unit: a.unit }) } : l,
        ),
      }
    case 'clear':
      return emptyQuote
    case 'hydrate':
      return sanitize(a.state)
  }
}

/** Defensive parse of persisted state — localStorage content is untrusted. */
export function sanitize(raw: unknown): QuoteState {
  if (!raw || typeof raw !== 'object' || !Array.isArray((raw as QuoteState).lines)) return emptyQuote
  const lines = (raw as QuoteState).lines
    .filter((l): l is QuoteLine => !!l && typeof l.id === 'string' && typeof l.name === 'string')
    .slice(0, 50)
    .map((l) => ({
      id: l.id,
      name: l.name,
      category: typeof l.category === 'string' ? l.category : '',
      qty: typeof l.qty === 'string' ? l.qty.slice(0, 20) : '',
      unit: UNITS.includes(l.unit) ? l.unit : 'kg',
    }))
  return { lines }
}
