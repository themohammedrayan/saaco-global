import type { ReactNode } from 'react'

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-5 font-serif text-lg leading-relaxed text-ink-2 [&_a]:text-wax [&_a]:underline [&_h2]:mt-14 [&_h2]:border-t [&_h2]:border-ink [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-ink">
      {children}
    </div>
  )
}
