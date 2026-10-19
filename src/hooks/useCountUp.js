import { useEffect, useRef } from 'react'

/**
 * Counts up to `value` once the returned ref scrolls into the viewport.
 * `value` may be a plain number or a `{ value: number, decimals: number }`
 * object. Uses requestAnimationFrame for smoothness.
 */
function useCountUp(value, { duration = 1600, decimals } = {}) {
  const ref = useRef(null)
  const target = typeof value === 'number' ? { value, decimals } : value ?? {}
  const numeric = Number(target.value ?? 0)
  const dp =
    target.decimals ?? (Number.isInteger(numeric) ? 0 : String(numeric).split('.')[1]?.length ?? 0)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      node.textContent = numeric.toLocaleString('en-IN', {
        minimumFractionDigits: dp,
        maximumFractionDigits: dp,
      })
      return undefined
    }

    let raf = 0
    let start = 0

    const format = (n) =>
      n.toLocaleString('en-IN', {
        minimumFractionDigits: dp,
        maximumFractionDigits: dp,
      })

    const step = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      node.textContent = format(numeric * eased)
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect()
            node.textContent = format(0)
            raf = requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [numeric, dp, duration])

  return ref
}

export default useCountUp