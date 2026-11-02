import { Amiri, IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Libre_Caslon_Display, Libre_Caslon_Text } from 'next/font/google'

// Caslon: the face of 18th-century trade documents and shipping bills.
export const display = Libre_Caslon_Display({ subsets: ['latin'], weight: '400', variable: '--font-display-en', display: 'swap' })
export const serif = Libre_Caslon_Text({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--font-serif-en', display: 'swap' })
export const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans-en', display: 'swap' })
export const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono-plex', display: 'swap' })
export const displayAr = Amiri({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-display-ar', display: 'swap', preload: false })
export const sansAr = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600'], variable: '--font-sans-ar', display: 'swap', preload: false })

export const fontVars = [display, serif, sans, mono, displayAr, sansAr].map((f) => f.variable).join(' ')
