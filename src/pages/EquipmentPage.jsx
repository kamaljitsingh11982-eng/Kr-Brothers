import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Info,
  MessageCircle,
  Phone,
  Weight,
} from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import SITE_ORIGIN from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getIcon } from '../lib/icons'
import Reveal from '../components/Reveal'
import { CtaBand, PageHero } from '../components/PageHero'

const ORIGIN = SITE_ORIGIN
const PATH = '/equipment'

/**
 * Fleet reference page.
 *
 * Everything is driven by BUSINESS_CONFIG.equipment, and the capacities quoted
 * there mirror the strings already published on the service pages so the two
 * can never contradict each other. The page deliberately shows capacity
 * *classes* rather than per-machine tonnage: rated capacity falls with radius
 * and boom extension, so a single number would be a claim we cannot stand
 * behind. The disclaimer above the table is part of the content, not filler.
 */
export function EquipmentPage() {
  const { equipment, contacts, links, services, brand } = BUSINESS_CONFIG
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'Crane fleet and equipment',
        description: equipment.intro,
        url: `${ORIGIN}${PATH}`,
        itemListElement: equipment.machines.map((machine, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: machine.name,
            description: machine.bestFor,
            category: 'Crane and lifting equipment',
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN },
          { '@type': 'ListItem', position: 2, name: 'Equipment & Fleet', item: `${ORIGIN}${PATH}` },
        ],
      },
    ],
  }), [equipment])

  useDocumentMeta({
    title: `Crane Fleet & Equipment Capacities | ${brand.name}`,
    description:
      'Hydra cranes 12-25 T, truck-mounted, rough-terrain and heavy mobile cranes 25-100 T class. See the KR Brothers fleet and how we pick your machine.',
    keywords:
      'crane fleet Punjab, hydra crane 12 ton capacity, 25 ton crane hire Hoshiarpur, truck mounted crane rental, rough terrain crane hire, mobile crane capacity, heavy mobile crane Punjab, crane equipment Mukerian',
    canonical: PATH,
    jsonLd,
  })

  return (
    <main id="main" className="bg-white">
      <PageHero
        eyebrow="Our Fleet"
        title="Equipment &"
        titleAccent="Crane Capacities"
        intro={equipment.intro}
        crumbs={[{ label: 'Equipment & Fleet' }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
            <Weight className="h-3 w-3" aria-hidden="true" />
            12 T to 100 T class
          </span>
          <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
            <Gauge className="h-3 w-3" aria-hidden="true" />
            Matched against the load chart
          </span>
          <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
            {equipment.selectionSteps.length}-step machine selection
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={contacts.primaryPhoneLink} className="btn-primary flex-1 sm:flex-none">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Ask for a machine
          </a>
          <Link to="/#contact" className="btn-outline flex-1 sm:flex-none">
            Request a Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={links.whatsappEnquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 sm:flex-none"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Fleet */}
      <section aria-labelledby="fleet-heading" className="py-16 sm:py-20">
        <div className="container-kr">
          <div className="max-w-3xl">
            <h2 id="fleet-heading" className="section-title text-navy-900">
              What we <span className="text-amber-deepText">run</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
              Machines are listed by the work they are actually chosen for. If your job does
              not match any of these classes, say so on the call - we will tell you honestly
              rather than send a machine that cannot do the lift.
            </p>
          </div>

          {/* The disclaimer is load-bearing: it is the reason this page shows
              classes instead of per-machine tonnage. */}
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-safety/40 bg-amber-safety/10 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-deepText" aria-hidden="true" />
            <p className="text-sm font-semibold leading-relaxed text-navy-800">
              {equipment.disclaimer}
            </p>
          </div>

          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {equipment.machines.map((machine, index) => {
              const MachineIcon = getIcon(machine.icon)
              return (
                <li key={machine.id}>
                  <Reveal delay={index * 70} className="h-full">
                    <article className="card card-hover flex h-full flex-col p-6">
                      <div className="flex items-start gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-amber-safety">
                          <MachineIcon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-base font-bold leading-snug text-navy-900">
                            {machine.name}
                          </h3>
                          <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-navy-900/[0.06] px-2.5 py-1 font-mono text-xs font-bold text-navy-900">
                            <Weight className="h-3 w-3" aria-hidden="true" />
                            {machine.capacity}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-sm font-bold uppercase tracking-wider text-amber-deepText">
                        Best for
                      </p>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-navy-700">
                        {machine.bestFor}
                      </p>

                      <ul className="mt-5 flex flex-col gap-2.5 border-t border-slate-200 pt-5">
                        {machine.notes.map((note) => (
                          <li key={note} className="flex items-start gap-2.5">
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-amber-safety"
                              aria-hidden="true"
                            />
                            <span className="text-sm leading-relaxed text-navy-600">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* How a machine gets selected */}
      <section aria-labelledby="selection-heading" className="bg-slate-50 py-16 sm:py-20">
        <div className="container-kr">
          <div className="max-w-3xl">
            <h2 id="selection-heading" className="section-title text-navy-900">
              How we <span className="text-amber-deepText">select</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
              Capacity alone does not pick a crane - radius, ground and access do most of the
              deciding. This is the sequence every enquiry goes through before a machine is
              booked.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.selectionSteps.map((item, index) => (
              <li key={item.step}>
                <Reveal delay={index * 70} className="h-full">
                  <div className="card flex h-full flex-col p-5">
                    <span className="font-mono text-sm font-bold tracking-[0.18em] text-amber-deepText">
                      {item.step}
                    </span>
                    <h3 className="mt-3 text-sm font-bold leading-snug text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Which service uses which machine */}
      <section aria-labelledby="match-heading" className="py-16 sm:py-20">
        <div className="container-kr">
          <div className="max-w-3xl">
            <h2 id="match-heading" className="section-title text-navy-900">
              Which service <span className="text-amber-deepText">uses what</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
              Every service we offer sits on one of the machine classes above. If you are not
              sure which one you need, start from the job rather than the machine.
            </p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const ServiceIcon = getIcon(service.icon)
              return (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="card card-hover group flex h-full flex-col p-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-amber-safety">
                      <ServiceIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-sm font-bold leading-snug text-navy-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
                      {service.short}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-navy-500">
                      <Weight className="h-3 w-3" aria-hidden="true" />
                      {service.capacity}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/service-areas" className="btn-outline inline-flex">
              Check your area
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={links.whatsappEnquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Service areas teaser */}
      <section aria-labelledby="coverage-heading" className="bg-navy-950 py-16">
        <div className="container-kr relative text-center">
          <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-20" aria-hidden="true" />
          <div className="relative">
            <h2 id="coverage-heading" className="section-title text-white">
              Machines <span className="text-amber-safety">where you are</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-navy-300">
              Our base sits on the NH-44 / Mukerian corridor, so the fleet reaches most of Punjab
              and the adjoining Himachal belt without a repositioning charge.
            </p>
            <Link to="/service-areas" className="btn-primary mt-8 inline-flex">
              See our service areas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand title="Need a machine" />
    </main>
  )
}

export default EquipmentPage