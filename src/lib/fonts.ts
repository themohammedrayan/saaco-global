import { IBM_Plex_Sans_Arabic, Inter, Noto_Kufi_Arabic, Playfair_Display } from 'next/font/google'

export const displayEn = Playfair_Display({ subsets: ['latin'], variable: '--font-display-en', display: 'swap' })
export const sansEn = Inter({ subsets: ['latin'], variable: '--font-sans-en', display: 'swap' })
export const displayAr = Noto_Kufi_Arabic({ subsets: ['arabic'], weight: ['500', '600', '700'], variable: '--font-display-ar', display: 'swap', preload: false })
export const sansAr = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600', '700'], variable: '--font-sans-ar', display: 'swap', preload: false })

export const fontVars = [displayEn.variable, sansEn.variable, displayAr.variable, sansAr.variable].join(' ')
