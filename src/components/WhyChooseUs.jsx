import BUSINESS_CONFIG from '../config/businessConfig'
import { getIcon } from '../lib/icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export function WhyChooseUs() {
  const { whyChooseUs, brand } = BUSINESS_CONFIG

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="relative bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container-kr">
        <SectionHeading
          eyebrow="Why Us"
          title="Why Choose"
          titleAccent="KR Brothers?"
          lead="Six reasons contractors and plant managers keep calling us back for the next lift."
          headingId="why-us-heading"
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = getIcon(item.icon)
            return (
              <Reveal as="li" key={item.id} variant="scale-in" delay={i * 70} className="h-full">
                <article className="card card-hover group relative flex h-full flex-col overflow-hidden p-6">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-amber-safety/10 transition-transform duration-500 group-hover:scale-150"
                  />

                  <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-amber-safety transition-all duration-300 group-hover:bg-amber-safety group-hover:text-navy-900">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <h3 className="relative mt-5 font-display text-lg font-bold leading-tight tracking-tight text-navy-900">
                    {item.title}
                  </h3>

                  {item.tagline && (
                    <p className="relative mt-2 inline-flex self-start rounded-md bg-amber-safety/15 px-2 py-1 font-mono text-xs font-bold text-amber-deepText">
                      “{item.tagline}”
                    </p>
                  )}

                  <p className="relative mt-3 text-sm leading-relaxed text-navy-600">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </ul>

        <Reveal variant="blur-in" className="mt-12">
          <div className="relative overflow-hidden rounded-2xl bg-navy-900 px-6 py-10 text-center shadow-card sm:px-10">
            <div
              className="pointer-events-none absolute inset-0 bg-safety-stripe opacity-[0.07]"
              style={{ backgroundSize: '28px 28px' }}
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <p className="font-mono text-xs font-bold tracking-wide text-amber-safety">
                {brand.tagline}
              </p>
              <p className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                {brand.slogan}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-navy-300">
                Based in {businessConfigLocation()} — close enough to reach you
                the same day, experienced enough to handle planned lifting work.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function businessConfigLocation() {
  const { location } = BUSINESS_CONFIG
  return location.baseAreaLabel
}

export default WhyChooseUs