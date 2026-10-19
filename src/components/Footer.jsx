import { Link } from 'react-router-dom'
import {
  ArrowUp,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import { Logo } from './Logo'
import Reveal from './Reveal'
import SocialLinks from './SocialLinks'

export function Footer() {
  const { brand, contacts, location, links, footer, services, secondaryNavigation } =
    BUSINESS_CONFIG

  const coreServices = services.slice(0, 6)

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-300">
      <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-20" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-amber-safety/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="hazard-stripe relative" aria-hidden="true" />

      <div className="container-kr relative">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1 — brand */}
          <Reveal className="lg:col-span-4">
            <div>
              <Logo tone="light" />
              <p className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-amber-safety">
                {brand.slogan}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-navy-300">
                {footer.summary}
              </p>
              <p className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-xs leading-relaxed text-navy-300">
                {brand.subTagline}
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <a href={contacts.primaryPhoneLink} className="btn-primary btn-sm">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  Call Now
                </a>
                <a
                  href={links.whatsappEnquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp btn-sm"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>

              {/* Shows the social profiles configured for the business. */}
              <SocialLinks heading="Follow Us" className="mt-6" />
            </div>
          </Reveal>

          {/* Column 2 — quick links */}
          <Reveal delay={70} className="lg:col-span-2">
            <nav aria-label="Footer quick links">
              <h2 className="font-display text-sm font-bold tracking-widest text-white">
                Quick Links
              </h2>
              <span className="mt-3 block h-0.5 w-10 bg-amber-safety" aria-hidden="true" />
              <ul className="mt-4 space-y-0.5">
                {footer.quickLinks.map((link) => (
                  <li key={link.href}>
                    {/* Routed, because these sections only exist on the home page. */}
                    <Link
                      to={`/${link.href}`}
                      className="tap-sm group gap-2 text-sm text-navy-300 transition-colors hover:text-amber-safety"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-navy-600 transition-colors group-hover:bg-amber-safety"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
                {/* The standalone pages, which are not home-page sections. */}
                {secondaryNavigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="tap-sm group items-start gap-2 text-sm leading-snug text-navy-300 transition-colors hover:text-amber-safety"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy-600 transition-colors group-hover:bg-amber-safety"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Column 3 — core services */}
          <Reveal delay={140} className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold tracking-widest text-white">
              Core Services
            </h2>
            <span className="mt-3 block h-0.5 w-10 bg-amber-safety" aria-hidden="true" />
            <ul className="mt-4 space-y-0.5">
              {coreServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}/`}
                    className="tap-sm group items-start gap-2 text-sm leading-snug text-navy-300 transition-colors hover:text-amber-safety"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy-600 transition-colors group-hover:bg-amber-safety"
                    />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/#services"
              className="tap-sm mt-4 gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-safety underline-offset-4 hover:underline"
            >
              View all services
              <ArrowUp className="h-3 w-3 rotate-45" aria-hidden="true" />
            </Link>
          </Reveal>

          {/* Column 4 — contact */}
          <Reveal delay={210} className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold tracking-widest text-white">
              Contact Details
            </h2>
            <span className="mt-3 block h-0.5 w-10 bg-amber-safety" aria-hidden="true" />

            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-safety" aria-hidden="true" />
                <span>
                  <a
                    href={contacts.primaryPhoneLink}
                    className="tap-sm text-sm font-semibold text-white hover:text-amber-safety"
                  >
                    {contacts.primaryPhone}
                  </a>
                  <a
                    href={contacts.secondaryPhoneLink}
                    className="tap-sm text-sm text-navy-300 hover:text-amber-safety"
                  >
                    {contacts.secondaryPhone}
                  </a>
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-safety" aria-hidden="true" />
                <a
                  href={links.whatsappEnquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-sm text-sm text-navy-300 hover:text-amber-safety"
                >
                  WhatsApp: {contacts.whatsappNumber}
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-safety" aria-hidden="true" />
                <a href={contacts.mailtoLink} className="tap-sm break-all text-sm text-navy-300 hover:text-amber-safety">
                  {contacts.emailDisplay}
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-safety" aria-hidden="true" />
                <a
                  href={location.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-sm items-start text-sm leading-relaxed text-navy-300 hover:text-amber-safety"
                >
                  {location.addressLine1}
                  <br />
                  {location.addressLine2}
                </a>
              </li>
            </ul>

            <a
              href={location.directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-amber-safety hover:bg-amber-safety hover:text-navy-900"
            >
              <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
              Directions
            </a>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
              <p className="text-xs text-navy-300">{footer.copyright}</p>
                <a
                  href="/privacy.html"
                  className="tap-sm text-xs text-navy-300 underline-offset-4 transition-colors hover:text-amber-safety hover:underline"
                >
                  Privacy Policy
                </a>
                {/* Router link: /terms is a client route, not a static file. */}
                <Link
                  to="/terms/"
                  className="tap-sm text-xs text-navy-300 underline-offset-4 transition-colors hover:text-amber-safety hover:underline"
                >
                  Terms &amp; Conditions
                </Link>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-navy-300">
              {footer.credits}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer