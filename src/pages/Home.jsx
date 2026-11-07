import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import About from '../components/About'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import Workflow from '../components/Workflow'
import Applications from '../components/Applications'
import Gallery from '../components/Gallery'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import Reveal from '../components/Reveal'
import BUSINESS_CONFIG from '../config/businessConfig'
import CITY_PAGES from '../config/cityPages'
import SITE_ORIGIN from '../config/siteConfig'
import { getLocalBusinessSchema } from '../config/businessSchema'
import useDocumentMeta from '../hooks/useDocumentMeta'

/**
 * The one-page marketing site. Service detail lives on /services/:serviceId
 * instead, so this component owns only the section stack and the cross-section
 * interactions. Navbar / footer chrome and the in-view section highlight live
 * in SiteShell.
 */
export function Home() {
  const [preselectService, setPreselectService] = useState(null)
  const { brand, faqs, seo } = BUSINESS_CONFIG
  const mainTownLinks = [
    'crane-on-rent-mukerian',
    'crane-on-rent-hajipur',
    'crane-on-rent-dasuya',
    'crane-on-rent-talwara',
  ]
  const areaLinks = CITY_PAGES.filter((city) => mainTownLinks.includes(city.slug))

  const jsonLd = useMemo(() => {
    const business = getLocalBusinessSchema()
    const businessId = business['@id']
    const websiteId = `${SITE_ORIGIN}/#website`
    const faqId = `${SITE_ORIGIN}/#faq`

    return {
      '@context': 'https://schema.org',
      '@graph': [
        business,
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url: `${SITE_ORIGIN}/`,
          name: brand.name,
          publisher: { '@id': businessId },
          inLanguage: 'en-IN',
        },
        {
          '@type': 'WebPage',
          '@id': `${SITE_ORIGIN}/#webpage`,
          url: `${SITE_ORIGIN}/`,
          name: seo.title,
          description: seo.description,
          keywords: seo.keywords,
          isPartOf: { '@id': websiteId },
          about: { '@id': businessId },
          mainEntity: { '@id': faqId },
          inLanguage: 'en-IN',
        },
        {
          '@type': 'FAQPage',
          '@id': faqId,
          url: `${SITE_ORIGIN}/#faq`,
          name: 'Frequently Asked Questions | KR Brothers',
          isPartOf: { '@id': websiteId },
          about: { '@id': businessId },
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      ],
    }
  }, [brand.name, faqs, seo.title, seo.description, seo.keywords])

  // Restores the home page tags after a service page, since the router swaps the
  // document head in place and nothing would otherwise put them back.
  useDocumentMeta({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: '/',
    jsonLd,
  })

  /** Smooth-scroll to the quote form and focus the first field. */
  const scrollToContact = useCallback((serviceId = null) => {
    if (serviceId) setPreselectService(serviceId)

    const run = () => {
      document.getElementById('contact')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      })
    }

    if (serviceId) {
      // Let the contact section re-render with the pre-selected service first.
      requestAnimationFrame(() => setTimeout(run, 60))
    } else {
      run()
    }
  }, [])

  const handleBookService = useCallback(
    (serviceId) => scrollToContact(serviceId),
    [scrollToContact],
  )

  return (
    <main id="main">
      <Hero onRequestQuote={() => scrollToContact()} />
      <StatsBar />
      <section aria-labelledby="areas-we-serve-heading" className="border-b border-slate-200 bg-slate-50 py-14 sm:py-16">
        <div className="container-kr">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <Reveal variant="slide-left">
              <p className="eyebrow text-amber-deepText">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Local service belt
              </p>
              <h2 id="areas-we-serve-heading" className="section-title mt-3 text-navy-900">
                Areas <span className="text-amber-deepText">we serve</span>
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-600">
                Crane service and crane on rent enquiries across Mukerian, Hajipur,
                Dasuya and Talwara. Share your site pin to confirm availability and
                mobilisation.
              </p>
            </Reveal>
            <Reveal variant="slide-right" delay={120} className="rounded-2xl border border-navy-200 bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-4">
              <ul className="grid gap-2 sm:grid-cols-2">
                {areaLinks.map((city) => (
                  <li key={city.slug}>
                    <Link
                      to={`/${city.slug}/`}
                      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-navy-800 transition hover:border-amber-safety hover:bg-amber-50 hover:text-navy-950"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-amber-deepText" aria-hidden="true" />
                        {city.city}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-navy-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-deepText"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
      <About />
      <Services onBookService={handleBookService} />
      <WhyChooseUs />
      <Workflow />
      <Applications onRequestQuote={() => scrollToContact()} />
      <Gallery />
      <Faq />
      <Contact
        preselectService={preselectService}
        onPreselectHandled={() => setPreselectService(null)}
      />
    </main>
  )
}

export default Home