import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Clock,
  Headset,
  Mail,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  Star,
} from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import { getLocalBusinessSchema } from '../config/businessSchema'
import SITE_ORIGIN from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Reveal from '../components/Reveal'
import { CtaBand, PageHero } from '../components/PageHero'

const ORIGIN = SITE_ORIGIN
const PATH = '/contact/'

/**
 * Standalone contact page.
 *
 * There is deliberately **no enquiry form here**. The home page #contact
 * section owns the form and its prefill behaviour (it accepts a serviceId so a
 * service page can carry context into it), and duplicating it here would mean
 * two forms to maintain and two places for enquiries to be submitted wrongly.
 * This page instead does what a dedicated contact page is actually for: every
 * contact channel, plainly, with the hours, the base and a direct route into
 * the real enquiry section.
 */
export function ContactPage() {
  const { contacts, links, location, operations, brand } = BUSINESS_CONFIG
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        name: `Contact ${brand.name}`,
        description: `Contact ${brand.name} for crane rental, lifting and material handling enquiries.`,
        url: `${ORIGIN}${PATH}`,
        mainEntity: {
          ...getLocalBusinessSchema(),
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: contacts.primaryPhoneRaw,
              contactType: 'customer service',
              areaServed: 'IN',
              availableLanguage: ['en', 'pa', 'hi'],
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${ORIGIN}${PATH}` },
        ],
      },
    ],
  }), [brand, contacts])

  useDocumentMeta({
    title: `Contact KR Brothers — Crane Rental & Lifting Enquiries`,
    description:
      `Call ${contacts.primaryPhone} or WhatsApp ${contacts.whatsappNumber} for crane rental and lifting enquiries. Open 24x7, based in ${location.baseAreaLabel}, Punjab.`,
    canonical: PATH,
    jsonLd,
  })

  const channels = [
    {
      id: 'phone',
      label: 'Call the operations desk',
      value: contacts.primaryPhone,
      href: contacts.primaryPhoneLink,
      icon: 'Phone',
      note: 'Fastest route for a job that is already live. Straight to the person coordinating the crane.',
      primary: true,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: contacts.whatsappNumber,
      href: links.whatsappEnquiry,
      icon: 'MessageCircle',
      note: 'Good for sending load weight, site photos and drawings. We reply with an initial view and a quotation.',
    },
    {
      id: 'email',
      label: 'Email',
      value: contacts.emailDisplay,
      href: contacts.mailtoLink,
      icon: 'Mail',
      note: 'Best for detailed tenders, site drawings and anything that needs a written trail.',
    },
  ]

  return (
    <main id="main" className="bg-white">
      <PageHero
        eyebrow="Get In Touch"
        title="Contact &"
        titleAccent="Enquiries"
        intro={`Call, message or email ${brand.name} for crane rental, lifting and material handling work. ${operations.hours}.`}
        crumbs={[{ label: 'Contact' }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {operations.hours}
          </span>
          <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
            <Star className="h-3 w-3 fill-current" aria-hidden="true" />
            {operations.responseTime}
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={contacts.primaryPhoneLink} className="btn-primary flex-1 sm:flex-none">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {contacts.primaryPhone}
          </a>
          <a
            href={links.whatsappEnquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 sm:flex-none"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp Us
          </a>
        </div>
      </PageHero>

      {/* Channels */}
      <section aria-labelledby="channels-heading" className="py-16 sm:py-20">
        <div className="container-kr">
          <div className="max-w-3xl">
            <h2 id="channels-heading" className="section-title text-navy-900">
              How to <span className="text-amber-deepText">reach us</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
              Three ways in, all of them answered by the same small team. Pick whichever is
              easiest - there is no call centre in between.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {channels.map((channel, index) => {
              const Icon =
                channel.icon === 'Phone'
                  ? Phone
                  : channel.icon === 'MessageCircle'
                    ? MessageCircle
                    : Mail
              return (
                <li key={channel.id}>
                  <Reveal delay={index * 80} className="h-full">
                    <article
                      className={`card card-hover flex h-full flex-col p-6 ${
                        channel.primary ? 'border-amber-safety/50' : ''
                      }`}
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-amber-safety">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 font-display text-base font-bold text-navy-900">
                        {channel.label}
                      </h3>
                      <a
                        href={channel.href}
                        {...(channel.icon === 'MessageCircle'
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="btn-outline btn-sm mt-4 self-start break-all normal-case"
                      >
                        {channel.value}
                      </a>
                      <p className="mt-4 text-sm leading-relaxed text-navy-600">
                        {channel.note}
                      </p>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Hours + base */}
      <section aria-labelledby="details-heading" className="bg-slate-50 py-16 sm:py-20">
        <div className="container-kr grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal variant="slide-right">
            <h2 id="details-heading" className="section-title text-navy-900">
              Hours &amp; <span className="text-amber-deepText">response</span>
            </h2>

            <dl className="mt-6 flex flex-col gap-5">
              <div className="relative pl-8">
                <dt className="text-sm font-bold text-navy-900">
                  <Clock
                    className="absolute left-0 top-0.5 h-5 w-5 text-amber-safety"
                    aria-hidden="true"
                  />
                  Operating hours
                </dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-navy-700">
                  {operations.hours}
                </dd>
              </div>
              <div className="relative pl-8">
                <dt className="text-sm font-bold text-navy-900">
                  <Headset
                    className="absolute left-0 top-0.5 h-5 w-5 text-amber-safety"
                    aria-hidden="true"
                  />
                  Mobilisation
                </dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-navy-700">
                  {operations.responseTime}
                </dd>
              </div>
              <div className="relative pl-8">
                <dt className="text-sm font-bold text-navy-900">
                  <Phone
                    className="absolute left-0 top-0.5 h-5 w-5 text-amber-safety"
                    aria-hidden="true"
                  />
                  Secondary line
                </dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-navy-700">
                  <a
                    href={contacts.secondaryPhoneLink}
                    className="tap-sm font-semibold text-navy-900 underline-offset-4 hover:text-amber-deepText hover:underline"
                  >
                    {contacts.secondaryPhone}
                  </a>
                </dd>
              </div>
              <div className="relative pl-8">
                <dt className="text-sm font-bold text-navy-900">
                  <ShieldCheck
                    className="absolute left-0 top-0.5 h-5 w-5 text-amber-safety"
                    aria-hidden="true"
                  />
                  Breakdown emergencies
                </dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-navy-700">
                  {servicesEmergencyCopy(brand.name)}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal variant="slide-left" delay={80}>
            <h2 className="section-title text-navy-900">
              Find <span className="text-amber-deepText">our location</span>
            </h2>
            <div className="mt-6 grid gap-4">
              <address className="rounded-xl border border-slate-200 bg-white p-5 not-italic">
                <h3 className="font-display text-base font-bold text-navy-900">Primary business location</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-700">
                  {location.addressLine1}
                  <br />
                  {location.addressLine2}
                </p>
                <a
                  href={location.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-sm mt-3 inline-flex text-sm font-semibold text-navy-900 underline-offset-4 hover:text-amber-deepText hover:underline"
                >
                  View on Google Maps
                </a>
              </address>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-navy-700">
              {BUSINESS_CONFIG.map.note}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={location.directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Directions
              </a>
              <Link to="/service-areas/" className="btn-outline inline-flex">
                Check your area
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Route into the real enquiry form */}
      <section aria-labelledby="enquiry-heading" className="py-16 sm:py-20">
        <div className="container-kr">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-amber-safety text-navy-900">
              <Send className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 id="enquiry-heading" className="section-title mt-6">
              Ready to send the <span className="text-amber-deepText">details?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600">
              The quickest way to get a written quotation is the enquiry form on our home page.
              It reaches the same desk, and it lets you attach the load weight and site
              location in one go instead of over a phone call.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/#contact" className="btn-primary">
                Go to the enquiry form
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/equipment/" className="btn-outline">
                Check machine capacities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Job running late?"
        intro="Breakdown and emergency recovery runs 24x7. Call the operations desk directly and we will mobilise the nearest available machine."
      />
    </main>
  )
}

/** Small helper keeps the emergency copy out of the JSX tree. */
function servicesEmergencyCopy(brandName) {
  return `Call the ${brandName} operations desk for machinery breakdown recovery and emergency lifting support, at any hour.`
}

export default ContactPage