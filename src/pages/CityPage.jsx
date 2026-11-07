import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ChevronRight, MapPin, MessageCircle, Phone } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import { getLocalBusinessSchema } from '../config/businessSchema'
import CITY_PAGES from '../config/cityPages'
import SITE_ORIGIN from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'
import FaqAccordion from '../components/FaqAccordion'
import NotFound from './NotFound'

const CITY_PATH = (slug) => `/${slug}/`

function CityDetail({ cityPage }) {
  const { contacts, links, operations, services } = BUSINESS_CONFIG
  const isConfirmedServiceArea = [
    ...operations.confirmedMainServiceAreas,
    ...operations.confirmedNearbyVillages,
  ].includes(cityPage.city)
  const cityUrl = `${SITE_ORIGIN}${CITY_PATH(cityPage.slug)}`
  const relatedServices = cityPage.serviceIds.map((id) => {
    const service = services.find((item) => item.id === id)
    if (!service) throw new Error(`Missing service "${id}" for city "${cityPage.city}".`)
    return service
  })

  const pageKeywords = useMemo(() => [
    cityPage.mainKeyword,
    ...(cityPage.seoKeywords ?? []),
    `crane rental ${cityPage.city}`,
    `hydra crane ${cityPage.city}`,
    `crane service ${cityPage.city}`,
    `lifting contractor ${cityPage.city}`,
  ].filter((keyword, index, keywords) => keywords.indexOf(keyword) === index), [
    cityPage.city,
    cityPage.mainKeyword,
    cityPage.seoKeywords,
  ])

  const jsonLd = useMemo(() => {
    const localBusiness = getLocalBusinessSchema()
    const service = {
      '@type': 'Service',
      name: `${cityPage.mainKeyword} — KR Brothers`,
      description: cityPage.metaDescription,
      keywords: pageKeywords.join(', '),
      url: cityUrl,
      serviceType: cityPage.mainKeyword,
      provider: { '@id': `${SITE_ORIGIN}/#business` },
    }

    if (isConfirmedServiceArea) {
      service.areaServed = { '@type': 'Place', name: cityPage.city }
    }

    return {
      '@context': 'https://schema.org',
      '@graph': [
        localBusiness,
        service,
        {
          '@type': 'FAQPage',
          mainEntity: cityPage.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Service Areas',
              item: `${SITE_ORIGIN}/service-areas/`,
            },
            { '@type': 'ListItem', position: 3, name: cityPage.city, item: cityUrl },
          ],
        },
      ],
    }
  }, [cityPage, cityUrl, isConfirmedServiceArea, pageKeywords])

  useDocumentMeta({
    title: cityPage.metaTitle,
    description: cityPage.metaDescription,
    keywords: pageKeywords,
    canonical: CITY_PATH(cityPage.slug),
    robots: isConfirmedServiceArea ? 'index, follow' : 'noindex, follow',
    jsonLd,
  })

  return (
    <main id="main" className="bg-white">
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-slate-50">
        <ol className="container-kr flex flex-wrap items-center gap-1.5 py-3 text-xs font-semibold text-navy-500">
          <li>
            <Link to="/" className="underline-offset-4 hover:text-navy-900 hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
          <li>
            <Link
              to="/service-areas/"
              className="underline-offset-4 hover:text-navy-900 hover:underline"
            >
              Service Areas
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
          <li aria-current="page" className="text-navy-900">{cityPage.city}</li>
        </ol>
      </nav>

      <header className="bg-navy-950 py-16 text-white sm:py-20">
        <div className="container-kr">
          <p className="eyebrow !text-amber-safety">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Crane &amp; Hydra service area
          </p>
          <h1 className="section-title mt-4 max-w-4xl text-white">
            {cityPage.mainKeyword}
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-navy-200 sm:text-base">
            Crane rental, Hydra services and lifting support from KR Brothers. Share your
            load and site details to discuss availability.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={contacts.primaryPhoneLink} className="btn-primary inline-flex">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {contacts.primaryPhone}
            </a>
            <a
              href={links.whatsappEnquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section aria-labelledby="city-service-heading" className="py-14 sm:py-18">
        <div className="container-kr grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.38fr)]">
          <div>
            <h2 id="city-service-heading" className="section-title text-navy-900">
              Crane and Hydra services in {cityPage.city}
            </h2>
            <div className="mt-6 space-y-5 whitespace-pre-line text-[15px] leading-relaxed text-navy-700">
              {cityPage.intro}
            </div>
            {cityPage.localNotes ? (
              <p className="mt-5 text-[15px] leading-relaxed text-navy-700">
                {cityPage.localNotes}
              </p>
            ) : null}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-display text-lg font-bold text-navy-900">
              Services for this area
            </h2>
            <ul className="mt-4 space-y-2">
              {relatedServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}/`}
                    className="tap-sm group flex items-start gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900"
                  >
                    <ArrowRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-deepText"
                      aria-hidden="true"
                    />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-7 font-display text-base font-bold text-navy-900">
              Nearby service areas
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cityPage.nearbyAreas.map((area) => (
                <li key={area} className="chip">{area}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section aria-labelledby="city-faq-heading" className="bg-slate-50 py-14 sm:py-18">
        <div className="container-kr grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div>
            <h2 id="city-faq-heading" className="section-title text-navy-900">
              {cityPage.city} crane hire questions
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-navy-600">
              Availability and mobilisation depend on the job, machine and site. Contact the
              team with your details to confirm.
            </p>
          </div>
          <FaqAccordion items={cityPage.faq} headingLevel="h3" />
        </div>
      </section>
    </main>
  )
}

export default function CityPage() {
  const { citySlug } = useParams()
  const cityPage = CITY_PAGES.find((item) => item.slug === citySlug)

  if (!cityPage) return <NotFound />
  return <CityDetail cityPage={cityPage} />
}
