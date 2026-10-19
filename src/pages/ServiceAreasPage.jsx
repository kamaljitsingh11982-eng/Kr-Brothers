import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import SITE_ORIGIN from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Reveal from '../components/Reveal'
import { CtaBand, PageHero } from '../components/PageHero'

const ORIGIN = SITE_ORIGIN
const PATH = '/service-areas'

/**
 * Coverage page.
 *
 * Answers one question - "do you come to my area?" - by grouping the service
 * regions from the config by realistic drive time from the Khizarpur base,
 * rather than listing every town in a flat wall of chips. The honest framing
 * matters: areas in the extended group say to call and confirm, because
 * mobilisation cost and machine availability genuinely vary with distance.
 */
export function ServiceAreasPage() {
  const { serviceAreas, contacts, links, location, operations, brand } = BUSINESS_CONFIG
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Crane rental and lifting services',
        description: serviceAreas.intro,
        url: `${ORIGIN}${PATH}`,
        serviceType: 'Crane rental and lifting contractor',
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${ORIGIN}/#business`,
          name: brand.name,
          telephone: contacts.primaryPhoneRaw,
          email: contacts.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: location.addressLine1,
            addressLocality: location.city,
            addressRegion: location.state,
            postalCode: location.pincode,
            addressCountry: location.countryCode,
          },
          location: {
            '@type': 'Place',
            name: 'KR Brothers Office',
            address: {
              '@type': 'PostalAddress',
              addressLocality: location.office.addressLine1,
              addressRegion: location.state,
              addressCountry: location.countryCode,
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: location.office.latitude,
              longitude: location.office.longitude,
            },
          },
        },
        areaServed: operations.serviceRegions.map((area) => ({
          '@type': 'Place',
          name: area,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN },
          { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${ORIGIN}${PATH}` },
        ],
      },
    ],
  }), [serviceAreas, brand, contacts, location, operations])

  useDocumentMeta({
    title: `Service Areas — Crane Hire Across Punjab & Himachal | ${brand.name}`,
    description:
      'Crane rental and lifting contractor serving Mukerian, Hoshiarpur, Pathankot, Jalandhar, Amritsar, Kangra and the wider Punjab and Himachal belt.',
    keywords:
      'crane hire Hoshiarpur, crane rental Mukerian, lifting contractor Pathankot, crane service Jalandhar, mobile crane Amritsar, crane hire Kangra Himachal, material handling contractor Punjab',
    canonical: PATH,
    jsonLd,
  })

  const totalAreas = serviceAreas.groups.reduce((sum, group) => sum + group.areas.length, 0)

  return (
    <main id="main" className="bg-white">
      <PageHero
        eyebrow="Where We Work"
        title="Service Areas &"
        titleAccent="Coverage"
        intro={serviceAreas.intro}
        crumbs={[{ label: 'Service Areas' }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {totalAreas} areas listed
          </span>
          <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
            {operations.hoursShort}
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={contacts.primaryPhoneLink} className="btn-primary flex-1 sm:flex-none">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Check your site
          </a>
          <a
            href={links.whatsappEnquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 sm:flex-none"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href={location.directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex-1 sm:flex-none"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            Get Directions
          </a>
        </div>
      </PageHero>

      {/* Base location */}
      <section aria-labelledby="base-heading" className="py-16 sm:py-20">
        <div className="container-kr">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
            <Reveal variant="slide-right">
              <h2 id="base-heading" className="section-title text-navy-900">
                Our <span className="text-amber-deepText">base</span>
              </h2>
              <address className="mt-6 not-italic">
                <p className="flex items-start gap-3 text-[15px] leading-relaxed text-navy-700">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-safety" aria-hidden="true" />
                  <span>
                    <strong className="block text-navy-900">Workshop &amp; operating yard</strong>
                    {location.addressLine1}
                    <br />
                    {location.addressLine2}
                  </span>
                </p>
                <p className="mt-4 flex items-start gap-3 text-[15px] leading-relaxed text-navy-700">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-safety" aria-hidden="true" />
                  <span>
                    <strong className="block text-navy-900">Office</strong>
                    {location.office.addressLine1}
                    <br />
                    {location.office.addressLine2}
                  </span>
                </p>
                <p className="mt-4 flex items-start gap-3 text-[15px] leading-relaxed text-navy-700">
                  <Navigation className="mt-0.5 h-5 w-5 shrink-0 text-amber-safety" aria-hidden="true" />
                  <span>{operations.primaryRegionLabel}</span>
                </p>
              </address>

              <p className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-[15px] leading-relaxed text-navy-700">
                {location.notes ?? BUSINESS_CONFIG.map.note}
              </p>

              <a
                href={location.office.directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark mt-6 inline-flex"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Directions to Office
              </a>
              <a
                href={location.directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-3 inline-flex sm:ml-2"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Directions to Yard
              </a>
            </Reveal>

            <Reveal variant="slide-left" delay={80}>
              <h2 className="section-title text-navy-900">
                Full region <span className="text-amber-deepText">list</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
                Every district and corridor we regularly work in, kept as published on our
                service pages.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {operations.serviceRegions.map((region) => (
                  <li key={region} className="chip">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {region}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Coverage tiers */}
      <section aria-labelledby="tiers-heading" className="bg-slate-50 py-16 sm:py-20">
        <div className="container-kr">
          <div className="max-w-3xl">
            <h2 id="tiers-heading" className="section-title text-navy-900">
              Coverage by <span className="text-amber-deepText">distance</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
              Grouped by realistic drive time from the yard, because &ldquo;we cover Punjab&rdquo;
              does not tell you whether we can be on site today or next week.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-5">
            {serviceAreas.groups.map((group, index) => (
              <Reveal key={group.id} delay={index * 80}>
                <article className="card flex h-full flex-col p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-lg font-bold text-navy-900">{group.title}</h3>
                    {index === 0 ? (
                      <span className="chip border-amber-safety/50 bg-amber-safety/15 text-amber-deepText">
                        Fastest response
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-navy-600">{group.lead}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.areas.map((area) => (
                      <li key={area} className="flex items-center gap-2.5">
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-amber-safety"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-semibold text-navy-800">{area}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-navy-900" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-navy-700">{serviceAreas.note}</p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Outside our listed areas?"
        intro="Tell us where the site is. We travel for suitable jobs, and a quick call will tell you whether mobilisation is practical before you spend time on an enquiry form."
      />

      {/* Keep the enquiry path on this page too */}
      <section aria-labelledby="areas-cta-heading" className="border-t border-slate-200 py-14">
        <div className="container-kr flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 id="areas-cta-heading" className="font-display text-lg font-bold text-navy-900">
              Not sure which machine your site needs?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              Look up the fleet, capacities and how we choose between them.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/equipment" className="btn-outline inline-flex">
              Equipment &amp; Fleet
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/#contact" className="btn-primary inline-flex">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ServiceAreasPage