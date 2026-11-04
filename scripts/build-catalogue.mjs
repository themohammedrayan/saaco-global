// Generates public/catalogue/saaco-global-catalogue.pdf from src/content at build time.
// Runs as `prebuild`. Content modules are TypeScript with type-only imports, loaded via
// Node's built-in type stripping.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { categories } = await import(path.join(root, 'src/content/products.ts'))
const { site } = await import(path.join(root, 'src/content/site.ts'))
const { process: steps, services } = await import(path.join(root, 'src/content/company.ts'))
const { incoterms } = await import(path.join(root, 'src/content/export.ts'))

const C = {
  forest: rgb(0.039, 0.133, 0.341),   // navy-900 #0a2257
  forest2: rgb(0.051, 0.165, 0.42),   // navy-800 #0d2a6b
  saffron: rgb(0.831, 0.639, 0.165),  // gold-500 #d4a32a
  gold: rgb(0.886, 0.725, 0.302),     // gold-400 #e2b94d
  cream: rgb(0.98, 0.969, 0.945),     // cream #faf7f1
  ink: rgb(0.067, 0.094, 0.153),
  muted: rgb(0.357, 0.392, 0.455),
  line: rgb(0.89, 0.902, 0.933),
  white: rgb(1, 1, 1),
}
const W = 595.28, H = 841.89, M = 48

// WinAnsi-safe text for the standard fonts
const safe = (s) => String(s)
  .replace(/[′’‘]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/…/g, '...')
  .replace(/[^\x20-\x7E -ÿ]/g, '')

const doc = await PDFDocument.create()
doc.setTitle(`${site.name} - Product Catalogue`)
doc.setAuthor(site.name)
doc.setSubject('Premium spices and natural produce from Kerala, India')
doc.setKeywords(['spices', 'Kerala', 'export', 'cardamom', 'black pepper'])
const serif = await doc.embedFont(StandardFonts.HelveticaBold)
const sans = await doc.embedFont(StandardFonts.Helvetica)
const bold = await doc.embedFont(StandardFonts.HelveticaBold)

async function jpg(rel, width = 1200) {
  const buf = await sharp(path.join(root, 'public', rel)).resize({ width, withoutEnlargement: true }).jpeg({ quality: 72 }).toBuffer()
  return doc.embedJpg(buf)
}
const logo = await doc.embedPng(fs.readFileSync(path.join(root, 'public/images/brand/saaco-logo.png')))

function wrap(text, font, size, maxW) {
  const words = safe(text).split(/\s+/)
  const lines = []
  let cur = ''
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w
    if (font.widthOfTextAtSize(t, size) > maxW && cur) { lines.push(cur); cur = w } else cur = t
  }
  if (cur) lines.push(cur)
  return lines
}
function para(page, text, { x = M, y, size = 10, font = sans, color = C.ink, maxW = W - 2 * M, lh = 1.45 }) {
  for (const l of wrap(text, font, size, maxW)) { page.drawText(l, { x, y, size, font, color }); y -= size * lh }
  return y
}
function cover(page, img, x, y, w, h) {
  // object-fit: cover via clipping is not available; scale to fill width/height and crop by drawing a frame
  const s = Math.max(w / img.width, h / img.height)
  const dw = img.width * s, dh = img.height * s
  page.drawImage(img, { x: x - (dw - w) / 2, y: y - (dh - h) / 2, width: dw, height: dh })
}
let pageNo = 0
function footer(page) {
  pageNo++
  page.drawLine({ start: { x: M, y: 40 }, end: { x: W - M, y: 40 }, thickness: 0.5, color: C.line })
  page.drawText(safe(`${site.name}  |  ${site.contact.email}  |  WhatsApp ${site.contact.phone}  |  ${site.url.replace(/^https?:\/\//, '')}`), { x: M, y: 26, size: 8, font: sans, color: C.muted })
  page.drawText(String(pageNo), { x: W - M - 8, y: 26, size: 8, font: bold, color: C.muted })
}

// ---- Cover
{
  const p = doc.addPage([W, H])
  const hero = await jpg('/images/plates/mixed.webp', 1400)
  cover(p, hero, 0, 0, W, H)
  p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.forest, opacity: 0.78 })
  p.drawRectangle({ x: M, y: H - 168, width: 228, height: 118, color: C.cream })
  p.drawImage(logo, { x: M + 10, y: H - 160, width: 208, height: 208 * 449 / 900 })
  p.drawText('PRODUCT CATALOGUE', { x: M, y: 420, size: 11, font: bold, color: C.gold })
  p.drawLine({ start: { x: M, y: 410 }, end: { x: M + 60, y: 410 }, thickness: 2, color: C.saffron })
  let y = 360
  for (const l of wrap('Premium spices & natural produce from Kerala, India', serif, 38, W - 2 * M)) {
    p.drawText(l, { x: M, y, size: 38, font: serif, color: C.white }); y -= 44
  }
  y = para(p, site.description.en, { y: y - 10, size: 11, color: C.cream, maxW: W - 2 * M - 40 })
  const contact = [`WhatsApp / Phone: ${site.contact.phone}`, `Email: ${site.contact.email}`, site.address.lines.en]
  y = 110
  for (const c of contact) { p.drawText(safe(c), { x: M, y, size: 10, font: sans, color: C.cream }); y -= 15 }
  p.drawText(`${new Date().getFullYear()} edition`, { x: W - M - 70, y: 60, size: 9, font: sans, color: C.gold })
}

// ---- Contents
{
  const p = doc.addPage([W, H])
  p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.cream })
  p.drawText('Contents', { x: M, y: H - 100, size: 30, font: serif, color: C.forest })
  let y = H - 150
  categories.forEach((c, i) => {
    p.drawText(String(i + 1).padStart(2, '0'), { x: M, y, size: 14, font: bold, color: C.saffron })
    p.drawText(safe(c.name.en), { x: M + 34, y, size: 16, font: serif, color: C.forest })
    y = para(p, c.short.en, { x: M + 34, y: y - 16, size: 9.5, color: C.muted, maxW: W - 2 * M - 34 }) - 14
  })
  p.drawText('How to order', { x: M, y: y - 10, size: 16, font: serif, color: C.forest })
  y -= 34
  steps.forEach((s, i) => {
    p.drawText(safe(`${i + 1}. ${s.title.en}:`), { x: M, y, size: 9.5, font: bold, color: C.ink })
    para(p, s.body.en, { x: M + 110, y, size: 9.5, color: C.muted, maxW: W - 2 * M - 110 })
    y -= 18
  })
  footer(p)
}

// ---- One page per category
for (const c of categories) {
  const p = doc.addPage([W, H])
  p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.cream })
  const img = await jpg(c.cover)
  const bandH = 250
  cover(p, img, 0, H - bandH, W, bandH)
  p.drawRectangle({ x: 0, y: H - bandH, width: W, height: bandH, color: C.forest, opacity: 0.55 })
  // white mask below the band (images may overflow when cropping)
  p.drawRectangle({ x: 0, y: 0, width: W, height: H - bandH, color: C.cream })
  p.drawText(safe(c.name.en), { x: M, y: H - bandH + 30, size: 34, font: serif, color: C.white })

  let y = H - bandH - 36
  y = para(p, c.intro.en, { y, size: 10.5, color: C.ink, lh: 1.5 }) - 14

  // items table
  p.drawText('PRODUCTS', { x: M, y, size: 9, font: bold, color: C.saffron }); y -= 18
  p.drawRectangle({ x: M, y: y - 6, width: W - 2 * M, height: 20, color: C.forest })
  p.drawText('Product', { x: M + 10, y, size: 9, font: bold, color: C.white })
  p.drawText('Forms', { x: M + 190, y, size: 9, font: bold, color: C.white })
  p.drawText('HS code*', { x: W - M - 60, y, size: 9, font: bold, color: C.white })
  y -= 24
  for (const it of c.items) {
    p.drawText(safe(it.name.en), { x: M + 10, y, size: 10, font: bold, color: C.ink })
    const fl = wrap(it.forms.en, sans, 9.5, W - 2 * M - 270)
    fl.forEach((l, i) => p.drawText(l, { x: M + 190, y: y - i * 13, size: 9.5, font: sans, color: C.muted }))
    p.drawText(it.hs, { x: W - M - 60, y, size: 9.5, font: sans, color: C.muted })
    y -= Math.max(1, fl.length) * 13 + 6
    p.drawLine({ start: { x: M, y: y + 6 }, end: { x: W - M, y: y + 6 }, thickness: 0.4, color: C.line })
    y -= 6
  }
  y -= 12
  p.drawText('EXPORT SPECIFICATIONS', { x: M, y, size: 9, font: bold, color: C.saffron }); y -= 18
  for (const s of c.specs) {
    p.drawText(safe(s.label.en), { x: M, y, size: 9.5, font: bold, color: C.ink })
    y = para(p, s.value.en, { x: M + 120, y, size: 9.5, color: C.muted, maxW: W - 2 * M - 120 }) - 4
  }
  p.drawText(safe(`Shipping`), { x: M, y, size: 9.5, font: bold, color: C.ink })
  y = para(p, `FOB / CIF - ${site.port.en}`, { x: M + 120, y, size: 9.5, color: C.muted, maxW: W - 2 * M - 120 }) - 10
  para(p, '* Indicative HS codes for guidance; final classification is confirmed per shipment. Specifications are indicative and confirmed in your quotation.', { y: 62, size: 7.5, color: C.muted })
  footer(p)
}

// ---- Back page
{
  const p = doc.addPage([W, H])
  p.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.forest })
  p.drawText('Request a quotation', { x: M, y: H - 120, size: 32, font: serif, color: C.white })
  let y = para(p, 'Send us your products, quantities and destination port - we reply to every enquiry within 24 hours with a tailored FOB or CIF quotation.', { y: H - 160, size: 12, color: C.cream })
  y -= 20
  p.drawText('Trade terms', { x: M, y, size: 14, font: serif, color: C.gold }); y -= 22
  for (const i of incoterms) {
    p.drawText(i.code, { x: M, y, size: 11, font: bold, color: C.saffron })
    y = para(p, i.body.en, { x: M + 50, y, size: 9.5, color: C.cream, maxW: W - 2 * M - 50 }) - 6
  }
  y -= 14
  p.drawText('Services', { x: M, y, size: 14, font: serif, color: C.gold }); y -= 22
  for (const s of services) {
    p.drawText(safe(s.title.en), { x: M, y, size: 10.5, font: bold, color: C.white })
    y = para(p, s.body.en, { x: M, y: y - 15, size: 9.5, color: C.cream }) - 8
  }
  const box = 150
  p.drawRectangle({ x: M, y: 60, width: W - 2 * M, height: box, color: C.forest2 })
  const lines = [['WhatsApp / Phone', site.contact.phone], ['Email', site.contact.email], ['Address', site.address.lines.en], ['Hours', site.contact.hours.en]]
  let yy = 60 + box - 30
  for (const [k, v] of lines) {
    p.drawText(k, { x: M + 20, y: yy, size: 9, font: bold, color: C.gold })
    p.drawText(safe(v), { x: M + 140, y: yy, size: 10, font: sans, color: C.white })
    yy -= 28
  }
}

const out = path.join(root, 'public/catalogue/saaco-global-catalogue.pdf')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, await doc.save())
console.log(`catalogue: ${path.relative(root, out)} (${doc.getPageCount()} pages)`)
