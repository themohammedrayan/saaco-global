import { tr, type Locale } from '@/i18n/config'
import { markets, originPoint } from '@/content/company'
import { LAND_DOTS, MAP_H, MAP_W, project } from '@/content/world-dots'

/** Dotted world map with arcs from Kerala to buyer regions. Pure SVG, no JS. */
export function WorldMap({ locale }: { locale: Locale }) {
  const [ox, oy] = project(originPoint.lon, originPoint.lat)
  const label = locale === 'ar' ? 'كيرالا، الهند' : 'Kerala, India'
  return (
    <figure className="relative">
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-auto w-full" role="img" aria-label={markets.map((m) => tr(m.name, locale)).join(', ')}>
        <defs>
          <linearGradient id="arc" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-saffron-400)" stopOpacity="0.95" />
            <stop offset="1" stopColor="var(--color-gold-300)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <g fill="currentColor" className="text-white/20">
          {LAND_DOTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.3} />)}
        </g>
        {markets.map((m, i) => {
          const [x, y] = project(m.lon, m.lat)
          const mx = (ox + x) / 2
          const my = Math.min(oy, y) - Math.abs(x - ox) * 0.28 - 20
          return (
            <g key={m.id}>
              <path d={`M${ox},${oy} Q${mx},${my} ${x},${y}`} fill="none" stroke="url(#arc)" strokeWidth={1.6} strokeDasharray="5 5">
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </path>
              <circle cx={x} cy={y} r={5} className="fill-gold-300" />
              <circle cx={x} cy={y} r={5} className="fill-gold-300/40">
                <animate attributeName="r" values="5;14;5" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}
        <circle cx={ox} cy={oy} r={8} className="fill-saffron-500" />
        <circle cx={ox} cy={oy} r={14} fill="none" className="stroke-saffron-400" strokeWidth={1.5} />
        <text x={ox} y={oy + 32} textAnchor="middle" className="fill-white text-[15px] font-semibold">{label}</text>
      </svg>
    </figure>
  )
}
