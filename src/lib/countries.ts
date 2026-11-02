/** ISO 3166-1 alpha-2 codes. Names are rendered per-locale via Intl.DisplayNames. */
export const COUNTRY_CODES = (
  'AE SA QA KW BH OM US GB DE NL FR IT ES BE SE NO DK FI IE PL CH AT PT GR CZ RO HU ' +
  'CA MX BR AR CL CO PE AU NZ SG MY ID TH VN PH JP KR CN HK TW BD LK NP PK MV IR IQ JO LB SY YE ' +
  'EG MA DZ TN LY SD ET KE TZ UG NG GH CI SN ZA MU RU UA TR KZ UZ IL CY MT IS LU EE LV LT SK SI HR RS BG'
).split(' ')

/** Gulf + major buyer markets first, then the rest alphabetically by localized name. */
const PRIORITY = ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'US', 'GB', 'DE', 'NL']

export function countryOptions(locale: string): { code: string; name: string }[] {
  let dn: Intl.DisplayNames | null = null
  try {
    dn = new Intl.DisplayNames([locale], { type: 'region' })
  } catch {
    dn = null
  }
  const name = (c: string) => dn?.of(c) ?? c
  const top = PRIORITY.map((code) => ({ code, name: name(code) }))
  const rest = COUNTRY_CODES.filter((c) => !PRIORITY.includes(c))
    .map((code) => ({ code, name: name(code) }))
    .sort((a, b) => a.name.localeCompare(b.name, locale))
  return [...top, ...rest]
}
