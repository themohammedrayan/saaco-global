import { Archivo, Cairo, Inter } from 'next/font/google'

export const heading = Archivo({ subsets: ['latin'], weight: ['600', '700', '800', '900'], variable: '--font-heading-en', display: 'swap' })
export const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body-en', display: 'swap' })
export const arabic = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '500', '600', '700', '800', '900'], variable: '--font-ar', display: 'swap', preload: false })

export const fontVars = [heading, body, arabic].map((f) => f.variable).join(' ')
