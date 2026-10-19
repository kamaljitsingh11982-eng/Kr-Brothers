import { CheckCircle2, MapPin, PhoneCall, Quote } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const CORE_FOCUS = [
  {
    title: 'Strict Site Safety & Rigging-Certified Operations',
    description:
      'Every lift begins with a method statement, a ground check and a briefed crew — nothing is improvised on site.',
  },
  {
    title: 'All Types of Lifting Work & Material Handling',
    description:
      'Hydra, mobile and truck-mounted cranes for yard movements, machine handling, erection and heavy shifting.',
  },
  {
    title: 'Timely Project Execution & Reliable Machine Uptime',
    description:
      'Scheduled equipment is present when promised, serviced on schedule and backed by backup units for critical jobs.',
  },
  {
    title: 'Flexible Shift-Based or Monthly Equipment Rental',
    description:
      'Hourly, per-shift, per-day or monthly hire — structured around how your project actually runs.',
  },
]

export function About() {
  const { brand, location, stats } = BUSINESS_CONFIG
  const yearsExperience = new Date().getFullYear() - brand.foundedYear

  return (
    <section id="about" aria-labelledby="about-heading" className="relative bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-40"
        aria-hidden="true"
      />

      <div className="container-kr relative">
        {/* Heading sits outside the two-column grid so it centres across the
            full page width, not just over the right-hand column. */}
        <SectionHeading
          eyebrow="Our story"
          title="Local Roots,"
          titleAccent="Industrial Strength"
          headingId="about-heading"
          align="center"
          titleSpacing="mt-4"
        />

        {/* items-start keeps the artwork and the copy on a shared top edge.
            min-w-0 on both tracks stops long words from widening a grid track,
            which is what produces sideways overflow. Columns are 48/52 with a
            56px gap. */}
        <div className="mt-12 grid items-start gap-10 sm:gap-12 lg:mt-14 lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:gap-14">
          {/* Image side */}
          <Reveal variant="slide-right" className="min-w-0">
            <figure className="relative">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card">
                <img
                  src="/assets/gallery/optimized/about-crane-operator.webp"
                  alt="Person standing beside an orange crane"
                  width={1600}
                  height={1200}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Decorative stat badge. Kept fully inside the frame (previously
                  -top-3 / -right-5) so it can never be clipped or widen the
                  page. */}
              <div
                className="absolute right-4 top-4 grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-navy-900 text-center shadow-card sm:right-5 sm:top-5"
                aria-hidden="true"
              >
                <div>
                  <p className="font-display text-2xl font-extrabold leading-none text-amber-safety">
                    {yearsExperience}+
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-bold uppercase tracking-wider text-navy-300">
                    Years
                  </p>
                </div>
              </div>

              {/* "Our Base" card. Previously absolute at -bottom-5, so its text
                  sat on top of the artwork and the card hung outside the figure
                  without any reserved space. In normal flow it claims its own
                  height, so nothing can collide with it. */}
              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
                <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-amber-deepText">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Our Base
                </p>
                <p className="mt-1.5 text-sm font-semibold leading-snug text-navy-900">
                  {location.addressShort}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-navy-500">
                  {brand.established} &nbsp;•&nbsp; Serving Punjab &amp; Himachal
                </p>
              </div>
            </figure>
          </Reveal>

          {/* Copy side. A flex column with one explicit gap replaces the stack
              of ad-hoc margin-top utilities, which were collapsing against the
              Reveal wrappers and producing an uneven rhythm. */}
          <div className="flex min-w-0 flex-col gap-7">
            <Reveal delay={100}>
              <p className="text-[15px] leading-relaxed text-navy-600 sm:text-base">
                {brand.shortDescription}
              </p>
            </Reveal>

            <Reveal delay={160}>
              <blockquote className="flex items-start gap-3 rounded-xl border-l-4 border-amber-safety bg-white p-5 shadow-card">
                <Quote className="mt-0.5 h-5 w-5 shrink-0 text-amber-safety" aria-hidden="true" />
                <p className="min-w-0 text-sm font-medium leading-relaxed text-navy-700">
                  “We are a family business from Hajipur, not a broker. That means the
                  machine we send is ours, the crew on site is ours, and when something
                  needs to be solved we come back ourselves.”
                </p>
              </blockquote>
            </Reveal>

            <ul className="flex flex-col gap-5">
              {CORE_FOCUS.map((item, i) => (
                <Reveal as="li" key={item.title} variant="fade" delay={i * 80}>
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-amber-safety/15 text-amber-deepText">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold leading-snug tracking-wide text-navy-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-navy-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal variant="scale-up" delay={200}>
              <div className="mt-0 flex flex-col gap-3 sm:flex-row">
                <a href={BUSINESS_CONFIG.links.whatsappEnquiry} target="_blank" rel="noopener noreferrer" className="btn-dark normal-case">
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  Talk to the Owner
                </a>
                <a href="#services" className="btn-outline normal-case">
                  View Our Services
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Mini trust row */}
        <Reveal variant="swipe-up" className="mt-16 grid gap-4 sm:grid-cols-3">
          {stats.slice(0, 3).map((stat) => (
            <div
              key={stat.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-card"
            >
              <span className="font-display text-2xl font-extrabold text-amber-deepText">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="text-xs font-semibold leading-snug text-navy-600">
                {stat.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default About