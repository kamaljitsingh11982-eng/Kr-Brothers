import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import { getIcon } from '../lib/icons'
import useDocumentMeta from '../hooks/useDocumentMeta'

export function NotFound() {
  const { services, contacts, links } = BUSINESS_CONFIG

  // A 404 must never be indexed, and it must not keep the home page's tags.
  useDocumentMeta({
    title: 'Page not found | KR Brothers',
    description: `The page you were looking for is not available. Browse our crane rental, lifting and material handling services or call ${contacts.primaryPhone}.`,
    canonical: '/404',
    robots: 'noindex, follow',
  })

  return (
    <main id="main" className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-amber-safety/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-kr relative text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-amber-safety">
          Error 404
        </p>
        <h1 className="section-title mt-4 text-white">
          That page is <span className="text-amber-safety">off the hook</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-navy-300">
          The link you followed does not exist on this site. The services below cover
          everything we do, or call us and we will point you to the right place.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a href={contacts.primaryPhoneLink} className="btn-outline">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {contacts.primaryPhone}
          </a>
          <a
            href={links.whatsappEnquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        <nav aria-label="Services" className="mt-14">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white">
            Our Services
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-3 block h-0.5 w-10 bg-amber-safety"
          />
          <ul className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = getIcon(service.icon)
              return (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left transition-colors hover:border-amber-safety/50 hover:bg-amber-safety/10"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-amber-safety">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold leading-snug text-white">
                      {service.title}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </main>
  )
}

export default NotFound