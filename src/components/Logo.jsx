import { getIcon } from '../lib/icons'
import BUSINESS_CONFIG from '../config/businessConfig'

/**
 * KR Brothers brand lockup.
 * `tone`: 'light' renders for dark backgrounds, 'dark' for light backgrounds.
 */
export function Logo({ tone = 'light', showText = true, showTagline = true, taglineClassName = '', className = '' }) {
  const light = tone === 'light'
  const { brand } = BUSINESS_CONFIG

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/assets/gallery/imgs/kr-logo-128.webp"
        alt=""
        width="44"
        height="44"
        className="h-11 w-11 shrink-0 rounded-xl object-cover"
      />

      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-xl font-extrabold uppercase leading-none tracking-wide sm:text-2xl ${
              light ? 'text-white' : 'text-navy-900'
            }`}
          >
            {brand.nameUpper}
          </span>
          {showTagline && (
            <span
              className={`mt-1 font-mono text-xs font-bold tracking-[0.12em] ${taglineClassName} ${
                light ? 'text-amber-safety' : 'text-amber-deepText'
              }`}
            >
              {brand.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  )
}

/** Compact safety badge used in headers and hero. */
export function SafetyBadge({ className = '' }) {
  const ShieldCheck = getIcon('ShieldCheck')

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-amber-safety/35 bg-amber-safety/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-amber-safety ${className}`}
    >
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
      Safe Lift Strong Support
    </span>
  )
}

export default Logo