import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function Stars({ rating, label }) {
  return (
    <p
      className="flex items-center gap-0.5"
      role="img"
      aria-label={label ?? `${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-safety text-amber-safety' : 'fill-slate-200 text-slate-200'}`}
          aria-hidden="true"
        />
      ))}
    </p>
  )
}

function TestimonialCard({ item }) {
  return (
    <figure className="card card-hover flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <Stars rating={item.rating} />
        <Quote className="h-7 w-7 shrink-0 text-slate-200" aria-hidden="true" />
      </div>

      <span className="mt-3 inline-flex self-start rounded-md bg-navy-900 px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider text-amber-safety">
        {item.projectType}
      </span>

      <blockquote className="mt-4 flex-1">
        <p className="text-sm leading-relaxed text-navy-700">“{item.quote}”</p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-4">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-base font-extrabold text-amber-safety"
        >
          {item.name
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold text-navy-900">{item.name}</span>
          <span className="block text-xs text-navy-500">
            {item.designation}, {item.company}
          </span>
          <span className="mt-0.5 block font-mono text-xs uppercase tracking-wider text-amber-deepText">
            {item.location}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const { testimonials } = BUSINESS_CONFIG
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(() => {
    if (typeof window === 'undefined') return 3
    if (window.matchMedia('(min-width: 1024px)').matches) return 3
    if (window.matchMedia('(min-width: 640px)').matches) return 2
    return 1
  })

  useEffect(() => {
    const large = window.matchMedia('(min-width: 1024px)')
    const medium = window.matchMedia('(min-width: 640px)')
    const updatePerPage = () => setPerPage(large.matches ? 3 : medium.matches ? 2 : 1)
    large.addEventListener('change', updatePerPage)
    medium.addEventListener('change', updatePerPage)
    return () => {
      large.removeEventListener('change', updatePerPage)
      medium.removeEventListener('change', updatePerPage)
    }
  }, [])

  const pageCount = Math.ceil(testimonials.length / perPage)
  const clampedPage = Math.min(page, Math.max(pageCount - 1, 0))

  const firstOnPage = clampedPage * perPage + 1
  const lastOnPage = Math.min(
    firstOnPage + perPage - 1,
    testimonials.length,
  )

  const visible = useMemo(
    () =>
      testimonials.slice(
        clampedPage * perPage,
        clampedPage * perPage + perPage,
      ),
    [testimonials, clampedPage, perPage],
  )

  const goPrev = useCallback(
    () => setPage((p) => (p <= 0 ? pageCount - 1 : p - 1)),
    [pageCount],
  )

  const goNext = useCallback(
    () => setPage((p) => (p >= pageCount - 1 ? 0 : p + 1)),
    [pageCount],
  )

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(pageCount - 1, 0)))
  }, [pageCount])

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-navy-950 py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-amber-safety/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-kr relative">
        <SectionHeading
          eyebrow="Client Reviews"
          title="Trusted By Contractors"
          titleAccent="Across Punjab"
          tone="dark"
          headingId="testimonials-heading"
        />

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          className="mt-12"
        >
          <ul
            key={clampedPage}
            className="grid animate-fade-up gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((item) => (
              <li key={item.id}>
                <TestimonialCard item={item} />
              </li>
            ))}
          </ul>
        </div>

        {/* Controls */}
        <div className="mt-9 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonials"
            className="icon-btn"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="group flex items-center" role="group" aria-label="Choose testimonial page">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-current={i === clampedPage ? 'true' : undefined}
                aria-label={`Go to testimonial page ${i + 1} of ${pageCount}`}
                onClick={() => setPage(i)}
                className="grid h-10 w-8 place-items-center rounded-md transition-colors hover:bg-white/10"
              >
                <span
                  aria-hidden="true"
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === clampedPage
                      ? 'w-8 bg-amber-safety'
                      : 'w-2.5 bg-white/25 group-hover:bg-white/50'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonials"
            className="icon-btn"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* The card list is swapped wholesale, so screen readers get the range
            instead of silently landing on different content. */}
        <p className="sr-only" aria-live="polite">
          Showing testimonials {firstOnPage} to {lastOnPage} of {testimonials.length}
        </p>

        <Reveal variant="scale-in" className="mt-10">
          <p className="text-center text-sm text-navy-300">
            Contractors, plant heads and site engineers across Mukerian, Hoshiarpur,
            Pathankot and Kangra rate our lifts on punctuality, safety and clean site
            handover.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default Testimonials