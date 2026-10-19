import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  HardHat,
  MessageCircle,
  Phone,
  ShieldCheck,
  Weight,
} from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import { getIcon } from '../lib/icons'
import Modal from './Modal'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function ServiceCard({ service, index, onOpen }) {
  const Icon = getIcon(service.icon)

  return (
    <Reveal as="li" variant="lift" delay={index * 60} className="h-full">
      <article className="card card-hover group flex h-full flex-col overflow-hidden">
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-amber-safety transition-all duration-300 group-hover:bg-amber-safety group-hover:text-navy-900">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-bold normal-case tracking-normal text-navy-600">
              {service.capacity}
            </span>
          </div>

          <h3 className="mt-4 font-display text-lg font-bold leading-tight tracking-tight text-navy-900">
            {service.title}
          </h3>

          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-navy-600">
            {service.short}
          </p>

          {/* Two actions: the quick modal summary, and the full page that
              search engines can index. */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
            <button
              type="button"
              onClick={() => onOpen(service.id)}
              className="link-action"
              aria-label={`Quick summary of ${service.title}`}
            >
              Quick Summary
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <Link
              to={`/services/${service.id}/`}
              className="link-action"
            >
              Full details
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="hazard-stripe scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        />
      </article>
    </Reveal>
  )
}

function ServiceModal({ service, isOpen, onClose, onBook }) {
  const Icon = service ? getIcon(service.icon) : null

  const handleBook = useCallback(() => {
    onBook(service.id)
    onClose()
  }, [onBook, onClose, service])

  if (!service) return null

  const headingId = `service-modal-title-${service.id}`
  const descId = `service-modal-desc-${service.id}`

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy={headingId}
      describedBy={descId}
      size="lg"
      closeLabel="Close service details"
    >
      <div className="max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-navy-900 px-6 pb-6 pt-8 sm:px-8">
          <div
            className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-30"
            aria-hidden="true"
          />
          <div className="relative flex items-start gap-4 pr-12">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-amber-safety text-navy-900">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-safety">
                Service Detail
              </p>
              <h2
                id={headingId}
                className="mt-1.5 font-display text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl"
              >
                {service.title}
              </h2>
            </div>
          </div>
          <div className="hazard-stripe relative mt-6 opacity-90" />
        </div>

        <div className="px-6 py-6 sm:px-8">
          <p id={descId} className="text-[15px] leading-relaxed text-navy-700">
            {service.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">
              <Weight className="h-3 w-3" aria-hidden="true" />
              Capacity: {service.capacity}
            </span>
            <span className="chip">
              <HardHat className="h-3 w-3" aria-hidden="true" />
              Certified crew included
            </span>
          </div>

          <div className="mt-7 grid gap-7 lg:grid-cols-2">
            {/* Scope */}
            <section aria-labelledby={`scope-${service.id}`}>
              <h3
                id={`scope-${service.id}`}
                className="flex items-center gap-2 font-display text-base font-bold tracking-wide text-navy-900"
              >
                <span className="h-5 w-1 rounded-full bg-amber-safety" aria-hidden="true" />
                Service Scope
              </h3>
              <ul className="mt-3 space-y-2.5">
                {service.scope.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-navy-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-deepText" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Safety */}
            <section aria-labelledby={`safety-${service.id}`}>
              <h3
                id={`safety-${service.id}`}
                className="flex items-center gap-2 font-display text-base font-bold tracking-wide text-navy-900"
              >
                <span className="h-5 w-1 rounded-full bg-amber-safety" aria-hidden="true" />
                Safety Guidelines
              </h3>
              <ul className="mt-3 space-y-2.5">
                {service.safety.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-navy-600">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Applications */}
          <section aria-labelledby={`apps-${service.id}`} className="mt-7">
            <h3
              id={`apps-${service.id}`}
              className="flex items-center gap-2 font-display text-base font-bold tracking-wide text-navy-900"
            >
              <span className="h-5 w-1 rounded-full bg-amber-safety" aria-hidden="true" />
              Suitable Industrial Applications
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {service.applications.map((app) => (
                <li
                  key={app}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-navy-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-deepText" aria-hidden="true" />
                  {app}
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy-600">
            <strong className="font-semibold text-navy-900">Best suited for:</strong>{' '}
            {service.bestFor}
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
            <button type="button" onClick={handleBook} className="btn-primary flex-1">
              Book This Service
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={BUSINESS_CONFIG.links.whatsappService(service.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-1"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
            <a href={BUSINESS_CONFIG.contacts.primaryPhoneLink} className="btn-outline flex-1">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export function Services({ onBookService }) {
  const { services } = BUSINESS_CONFIG
  const [activeId, setActiveId] = useState(null)

  const activeService = services.find((s) => s.id === activeId) ?? null

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-navy-950 py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-amber-safety/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-kr relative">
        <SectionHeading
          eyebrow="What We Do"
          title="Complete Lifting &"
          titleAccent="Material Handling Services"
          lead="From a single Hydra shift to a multi-crane erection campaign — pick the service you need and book it directly."
          tone="dark"
          headingId="services-heading"
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              onOpen={setActiveId}
            />
          ))}
        </ul>

        <Reveal className="mt-10 flex justify-center">
          <p className="max-w-2xl text-center text-sm text-navy-300">
            Not sure which machine or service fits your job?{' '}
            <button
              type="button"
              onClick={() => onBookService(null)}
              className="link-amber -my-1 inline-flex min-h-[2.5rem] items-center py-2 font-semibold underline-offset-4 hover:underline"
            >
              Send us the load details
            </button>{' '}
            and we will recommend the right setup.
          </p>
        </Reveal>
      </div>

      <ServiceModal
        service={activeService}
        isOpen={Boolean(activeService)}
        onClose={() => setActiveId(null)}
        onBook={onBookService}
      />
    </section>
  )
}

export default Services