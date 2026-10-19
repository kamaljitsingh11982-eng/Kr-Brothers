import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HardHat,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Weight,
} from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import { getLocalBusinessSchema } from '../config/businessSchema'
import SERVICE_PAGES from '../config/servicePages'
import SITE_ORIGIN from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { getIcon } from '../lib/icons'
import FaqAccordion from '../components/FaqAccordion'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'

const ORIGIN = SITE_ORIGIN

function servicePath(id) {
  return `/services/${id}/`
}

/**
 * One page per entry in BUSINESS_CONFIG.services. Everything on the page comes
 * from the config (scope, safety, applications, capacity) plus the per-service
 * search copy in SERVICE_PAGES, so adding a service means adding config, not
 * writing a page.
 *
 * Split in two so the redirect for an unknown slug can happen before any hook
 * runs — hooks must not sit behind an early return.
 */
function ServiceDetail({ service }) {
  const { contacts, links, operations } = BUSINESS_CONFIG
  const pageCopy = SERVICE_PAGES[service.id]
  const Icon = getIcon(service.icon)
  const url = `${ORIGIN}${servicePath(service.id)}`
  const { title, short, summary, capacity, scope, safety, applications, bestFor } = service
  const related = BUSINESS_CONFIG.services.filter((item) => item.id !== service.id)
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: title,
        description: summary,
        url,
        serviceType: title,
        provider: {
          ...getLocalBusinessSchema(),
          areaServed: operations.serviceRegions.slice(0, 6),
        },
        areaServed: operations.serviceRegions,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${title} — scope`,
          itemListElement: scope.map((line, i) => ({
            '@type': 'Offer',
            position: i + 1,
            itemOffered: { '@type': 'Service', name: line },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: (pageCopy.faq ?? []).map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${ORIGIN}/#services` },
          { '@type': 'ListItem', position: 3, name: title, item: url },
        ],
      },
    ],
  }), [title, summary, url, scope, pageCopy, operations])

  useDocumentMeta({
    title: pageCopy.metaTitle,
    description: pageCopy.metaDescription,
    canonical: servicePath(service.id),
    jsonLd,
  })

  return (
    <main id="main" className="bg-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-slate-50">
        <ol className="container-kr flex flex-wrap items-center gap-1.5 py-3 text-xs font-semibold text-navy-500">
          <li>
            <Link to="/" className="underline-offset-4 hover:text-navy-900 hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link to="/#services" className="underline-offset-4 hover:text-navy-900 hover:underline">
              Services
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3 w-3" />
          </li>
          <li aria-current="page" className="text-navy-900">
            {title}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-25" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-amber-safety/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-kr relative">
          <Reveal variant="fade-up">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-amber-safety text-navy-900">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>

            <p className="eyebrow mt-6 !text-amber-safety">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-amber-safety/70" />
              Crane Rental &amp; Lifting Services
            </p>

            <h1 className="section-title mt-3 max-w-3xl text-white">{title}</h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-navy-300 sm:text-base">
              {summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
                <Weight className="h-3 w-3" aria-hidden="true" />
                Capacity: {capacity}
              </span>
              <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
                <HardHat className="h-3 w-3" aria-hidden="true" />
                Certified crew included
              </span>
              <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {operations.hoursShort}
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/#contact" className="btn-primary flex-1 sm:flex-none">
                Request a Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={contacts.primaryPhoneLink} className="btn-outline flex-1 sm:flex-none">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contacts.primaryPhone}
              </a>
              <a
                href={links.whatsappService(title)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1 sm:flex-none"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>

            <p className="mt-6 text-xs text-navy-300">{short}</p>
          </Reveal>
        </div>
      </header>

      {/* Scope + safety */}
      <section aria-labelledby="scope-heading" className="py-16 sm:py-20">
        <div className="container-kr grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal variant="slide-right">
            <h2 id="scope-heading" className="section-title text-navy-900">
              What this <span className="text-amber-deepText">covers</span>
            </h2>
            <ul className="mt-6 space-y-3">
              {scope.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-safety"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] leading-relaxed text-navy-700">{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-amber-safety/40 bg-amber-safety/10 p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-deepText">
                Best for
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-navy-800">{bestFor}</p>
            </div>
          </Reveal>

          <Reveal variant="slide-left" delay={80}>
            <h2 className="section-title text-navy-900">
              Safety <span className="text-amber-deepText">protocol</span>
            </h2>
            <ul className="mt-6 space-y-3">
              {safety.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-navy-900"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] leading-relaxed text-navy-700">{line}</span>
                </li>
              ))}
            </ul>

            <h2 className="section-title mt-12 text-navy-900">
              Where we <span className="text-amber-deepText">work</span>
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {applications.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      {pageCopy.faq?.length > 0 && (
        <section aria-labelledby="service-faq-heading" className="bg-slate-50 py-16 sm:py-20">
          <div className="container-kr grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
            <div>
              <h2 id="service-faq-heading" className="section-title text-navy-900">
                Common <span className="text-amber-deepText">questions</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
                Straight answers about capacity, crew, timing and coverage. If your
                situation is not covered here, call the operations desk.
              </p>
              <a
                href={contacts.primaryPhoneLink}
                className="btn-dark mt-6 inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contacts.primaryPhone}
              </a>
            </div>

            <FaqAccordion items={pageCopy.faq} headingLevel="h3" />
          </div>
        </section>
      )}

      {/* Related services */}
      <section aria-labelledby="related-heading" className="py-16 sm:py-20">
        <div className="container-kr">
          <h2 id="related-heading" className="section-title text-navy-900">
            Other <span className="text-amber-deepText">services</span>
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => {
              const RelatedIcon = getIcon(item.icon)
              return (
                <li key={item.id}>
                  <Link
                    to={servicePath(item.id)}
                    className="card card-hover group flex h-full flex-col p-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-amber-safety">
                      <RelatedIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-sm font-bold leading-snug tracking-wide text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
                      {item.short}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-900 transition-colors group-hover:text-amber-deepText">
                      Read more
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-navy-900 py-16">
        <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-20" aria-hidden="true" />
        <div className="container-kr relative text-center">
          <h2 id="cta-heading" className="section-title text-white">
            Need {title.toLowerCase()} <span className="text-amber-safety">on your site?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-navy-300">
            Send us the load weight, working radius and site location. We will recommend the
            right machine and give you a clear written quotation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/#contact" className="btn-primary">
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={contacts.primaryPhoneLink}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-amber-safety hover:text-amber-safety"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {contacts.primaryPhone}
            </a>
          </div>
        </div>
        <div className="hazard-stripe relative mt-12 opacity-90" aria-hidden="true" />
      </section>
    </main>
  )
}

/** Resolves the slug and redirects home if it does not match a service. */
export function ServicePage() {
  const { serviceId } = useParams()
  const service = BUSINESS_CONFIG.services.find((item) => item.id === serviceId)

  if (!service) return <NotFound />

  return <ServiceDetail service={service} />
}

export default ServicePage