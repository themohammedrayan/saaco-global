import { tr, type Locale } from '@/i18n/config'
import { markets, originPoint } from '@/content/company'
import { LAND_DOTS, MAP_H, MAP_W, project } from '@/content/world-dots'

/** Dotted chart with sea routes from Kerala, drawn like an old trade map. */
export function WorldMap({ locale, light }: { locale: Locale; light?: boolean }) {
  const [ox, oy] = project(originPoint.lon, originPoint.lat)
  return (
    <figure>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-auto w-full" role="img" aria-label={markets.map((m) => tr(m.name, locale)).join(', ')}>
        {/* graticule */}
        <g stroke="currentColor" strokeWidth={0.5} className={light ? 'text-paper/15' : 'text-ink/15'}>
          {[...Array(9)].map((_, i) => <line key={`v${i}`} x1={(i + 1) * MAP_W / 10} y1={0} x2={(i + 1) * MAP_W / 10} y2={MAP_H} />)}
          {[...Array(4)].map((_, i) => <line key={`h${i}`} x1={0} y1={(i + 1) * MAP_H / 5} x2={MAP_W} y2={(i + 1) * MAP_H / 5} />)}
        </g>
        <g fill="currentColor" className={light ? 'text-paper/35' : 'text-ink/45'}>
          {LAND_DOTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.9} />)}
        </g>
        {markets.map((m, i) => {
          const [x, y] = project(m.lon, m.lat)
          const mx = (ox + x) / 2
          const my = Math.min(oy, y) - Math.abs(x - ox) * 0.25 - 18
          return (
            <g key={m.id}>
              <path d={`M${ox},${oy} Q${mx},${my} ${x},${y}`} fill="none" stroke="var(--color-wax)" strokeWidth={1.4} strokeDasharray="2 5" strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" from="28" to="0" dur={`${1.6 + i * 0.25}s`} repeatCount="indefinite" />
              </path>
              <rect x={x - 4} y={y - 4} width={8} height={8} fill="var(--color-wax)" transform={`rotate(45 ${x} ${y})`} />
              <text x={x} y={y - 12} textAnchor="middle" className={light ? 'fill-paper' : 'fill-ink'} style={{ font: '500 11px var(--font-mono)', letterSpacing: '.08em' }}>
                {String(i + 1).padStart(2, '0')}
              </text>
            </g>
          )
        })}
        <circle cx={ox} cy={oy} r={7} fill="var(--color-wax)" />
        <circle cx={ox} cy={oy} r={13} fill="none" stroke="var(--color-wax)" strokeWidth={1} />
        <circle cx={ox} cy={oy} r={20} fill="none" stroke="var(--color-wax)" strokeWidth={0.6} strokeOpacity={0.6} />
      </svg>
    </figure>
  )
}
