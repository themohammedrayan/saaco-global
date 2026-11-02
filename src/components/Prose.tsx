import type { ReactNode } from 'react'

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-5 leading-relaxed text-ink/85 [&_a]:font-semibold [&_a]:text-forest-700 [&_a]:underline [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-forest-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:ps-6">
      {children}
    </div>
  )
}
