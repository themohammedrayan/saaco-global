'use client'

import { createContext, useContext, useEffect, useReducer, useRef, type ReactNode } from 'react'
import { emptyQuote, quoteReducer, type QuoteAction, type QuoteState } from './quote-reducer'

const KEY = 'saaco.quote.v1'

const Ctx = createContext<{ state: QuoteState; dispatch: (a: QuoteAction) => void } | null>(null)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quoteReducer, emptyQuote)
  const hydrated = useRef(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY)
      if (raw) dispatch({ type: 'hydrate', state: JSON.parse(raw) })
    } catch {
      /* storage unavailable or corrupt: start empty */
    }
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (!hydrated.current) return
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [state])

  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>
}

export function useQuote() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useQuote must be used inside <QuoteProvider>')
  return c
}
