import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import path from 'node:path'
import dims from '../image-dims.json'
import { categories } from '../products'
import { details } from '../product-details'
import { countries } from '../site'

const table = dims as Record<string, number[]>
const isL = (v: unknown) => !!v && typeof v === 'object' && typeof (v as { en: unknown }).en === 'string' && (v as { en: string }).en.length > 0 && typeof (v as { ar: unknown }).ar === 'string' && (v as { ar: string }).ar.length > 0

describe('product catalogue data', () => {
  const items = categories.flatMap((c) => c.items)

  it('has unique category slugs and product ids', () => {
    expect(new Set(categories.map((c) => c.slug)).size).toBe(categories.length)
    expect(new Set(items.map((i) => i.id)).size).toBe(items.length)
  })

  it('uses URL-safe ids', () => {
    for (const x of [...categories.map((c) => c.slug), ...items.map((i) => i.id)]) expect(x).toMatch(/^[a-z0-9-]+$/)
  })

  it('every image exists on disk and in the dimensions manifest', () => {
    const imgs = [...categories.flatMap((c) => [c.cover, ...c.gallery.map((g) => g.src)]), ...items.map((i) => i.image)]
    for (const src of imgs) {
      expect(table[src], `missing dims for ${src}`).toBeDefined()
      expect(existsSync(path.join(process.cwd(), 'public', src)), `missing file ${src}`).toBe(true)
    }
  })

  it('every product has bilingual name, forms and page copy', () => {
    for (const i of items) {
      expect(isL(i.name) && isL(i.forms), i.id).toBe(true)
      const d = details[i.id]
      expect(d, `no details for ${i.id}`).toBeDefined()
      expect(isL(d.desc)).toBe(true)
      expect(d.features.length).toBeGreaterThanOrEqual(3)
      expect(d.uses.length).toBeGreaterThanOrEqual(2)
      for (const x of [...d.features, ...d.uses]) expect(isL(x), i.id).toBe(true)
    }
  })

  it('category copy and specs are bilingual', () => {
    for (const c of categories) {
      for (const x of [c.name, c.short, c.intro, ...c.specs.flatMap((s) => [s.label, s.value]), ...c.gallery.map((g) => g.alt)]) expect(isL(x), c.slug).toBe(true)
    }
  })

  it('lists the five trading countries in order', () => {
    expect(countries.map((c) => c.code)).toEqual(['IN', 'BH', 'LK', 'SA', 'AE'])
  })
})
