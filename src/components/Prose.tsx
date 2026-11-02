import type { ReactNode } from 'react'

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-4 rounded-lg border border-line bg-white p-6 leading-relaxed text-ink-2 shadow-card sm:p-10 [&_a]:font-semibold [&_a]:text-navy-700 [&_a]:underline [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:text-navy-900 [&_h2:first-child]:mt-0">
      {children}
    </div>
  )
}
