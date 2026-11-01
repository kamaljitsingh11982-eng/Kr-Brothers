import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
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
  const { brand, seo } = BUSINESS_CONFIG
  const mainTownLinks = [
    'crane-on-rent-mukerian',
    'crane-on-rent-hajipur',
    'crane-on-rent-hoshiarpur',
    'crane-on-rent-pathankot',
    'crane-on-rent-dasuya',
    'crane-on-rent-talwara',
  ]
  const areaLinks = CITY_PAGES.filter((city) => mainTownLinks.includes(city.slug))

  const jsonLd = useMemo(() => {
    const business = getLocalBusinessSchema()
    const businessId = business['@id']
    const websiteId = `${SITE_ORIGIN}/#website`

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
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_ORIGIN}/?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
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
          inLanguage: 'en-IN',
        },
      ],
    }
  }, [brand.name, seo.title, seo.description, seo.keywords])

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
      <section aria-labelledby="areas-we-serve-heading" className="border-b border-slate-200 bg-slate-50 py-12">
        <div className="container-kr">
          <div className="max-w-3xl">
            <h2 id="areas-we-serve-heading" className="section-title text-navy-900">
              Areas <span className="text-amber-deepText">we serve</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-navy-600">
              KR Brothers supports crane service and crane on rent enquiries across the main towns in the local belt.
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {areaLinks.map((city) => (
              <li key={city.slug}>
                <Link to={`/${city.slug}/`} className="chip border border-slate-200 bg-white text-navy-700 hover:text-navy-900">
                  {city.city}
                </Link>
              </li>
            ))}
          </ul>
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