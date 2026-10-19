import BUSINESS_CONFIG from '../config/businessConfig'
import { getIcon } from '../lib/icons'
import useCountUp from '../hooks/useCountUp'
import Reveal from './Reveal'

function StatItem({ stat }) {
  const Icon = getIcon(stat.icon)
  const ref = useCountUp({ value: stat.value })

  return (
    <div className="group relative flex flex-col items-center gap-3 px-4 py-7 text-center sm:py-8">
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-0.5 origin-center scale-x-0 bg-amber-safety transition-transform duration-300 group-hover:scale-x-100"
      />
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-amber-safety shadow-card transition-transform duration-300 group-hover:-translate-y-1">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>

      <p className="font-display text-4xl font-extrabold leading-none tracking-tight text-navy-900 sm:text-5xl">
        {/* No aria-label here: a bare <span> has no role, so naming it is
            invalid and gets dropped. The number, suffix and label below read
            out correctly as plain text. */}
        <span
              ref={ref}
              className="tabular-nums"
              data-count-up-final={stat.value.toLocaleString('en-IN')}
        >
              {stat.value.toLocaleString('en-IN')}
        </span>
        <span className="text-amber-deepText">{stat.suffix}</span>
      </p>

      <p className="text-sm font-bold leading-snug text-navy-900">
        {stat.label}
      </p>
      <p className="hidden max-w-[16rem] text-xs leading-relaxed text-navy-500 sm:block">
        {stat.description}
      </p>
    </div>
  )
}

/**
 * Animated trust / metrics bar directly beneath the hero.
 */
export function StatsBar() {
  const { stats, brand } = BUSINESS_CONFIG

  return (
    <section
      aria-label={`${brand.name} key figures and trust indicators`}
      className="relative z-10 -mt-px border-y border-slate-200 bg-white shadow-card"
    >
      <div className="hazard-stripe opacity-100" />
      <div className="container-kr">
        <div className="grid grid-cols-2 divide-slate-200 lg:grid-cols-4 lg:divide-x">
          {stats.map((stat, i) => (
            <Reveal
              as="div"
              key={stat.id}
              variant="scale-in"
              delay={i * 90}
              className="h-full"
            >
              <StatItem stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar