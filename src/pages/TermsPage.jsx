import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Printer, ShieldCheck } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import SITE_ORIGIN from '../config/siteConfig'
import useDocumentMeta from '../hooks/useDocumentMeta'
import Reveal from '../components/Reveal'
import { CtaBand, PageHero } from '../components/PageHero'

const ORIGIN = SITE_ORIGIN
const PATH = '/terms/'

/**
 * Terms & Conditions.
 *
 * Served as a real route rather than a static .html file so it shares the
 * navbar, footer and the rest of the site's chrome - a legal page that looks
 * like it belongs to a different website undermines the site it protects.
 *
 * The copy lives in BUSINESS_CONFIG.legal, so adding or re-wording a clause is
 * a config edit rather than a markup edit.
 */
export function TermsPage() {
  const { legal, contacts, links, brand } = BUSINESS_CONFIG
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `${legal.title} — ${brand.name}`,
        description: legal.intro,
        url: `${ORIGIN}${PATH}`,
        inLanguage: 'en-IN',
        isPartOf: {
          '@type': 'WebSite',
          name: brand.name,
          url: `${ORIGIN}/`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Terms & Conditions', item: `${ORIGIN}${PATH}` },
        ],
      },
    ],
  }), [legal, brand])

  useDocumentMeta({
    title: `Terms & Conditions | ${brand.name}`,
    description: `Terms for crane hire, lifting and material handling work by ${brand.name} — bookings, capacity and load charts, site conditions and charges.`,
    canonical: PATH,
    jsonLd,
  })

  return (
    <main id="main" className="bg-white">
      <PageHero
        eyebrow="Legal"
        title="Terms &"
        titleAccent="Conditions"
        intro={legal.intro}
        crumbs={[{ label: 'Terms & Conditions' }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
            <FileText className="h-3 w-3" aria-hidden="true" />
            {legal.sections.length} clauses
          </span>
          <span className="chip border-white/15 bg-white/[0.06] text-amber-safety">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" />
            {legal.updated}
          </span>
        </div>

        {/* Anchors so a long document is navigable on mobile, where a single
            scrolling column of nine clauses is otherwise hard to move around. */}
        <nav aria-label="On this page" className="mt-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-safety">
            On this page
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {legal.sections.map((section) => (
              <li key={section.id}>
                {/* A router Link, not a bare #href. A plain anchor to the hash
                    already in the address bar is a browser no-op, so clicking
                    the chip you are already on would do nothing. */}
                <Link
                      to={`/terms/#${section.id}`}
                  className="chip border-white/15 bg-white/[0.06] text-navy-200 hover:text-amber-safety"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* Clauses */}
      <section aria-labelledby="terms-heading" className="py-16 sm:py-20">
        <div className="container-kr">
          <h2 id="terms-heading" className="sr-only">
            {legal.title}
          </h2>

          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
            {legal.sections.map((section, index) => (
              <Reveal key={section.id} delay={index * 50}>
                <article className="flex h-full flex-col">
                  <div className="flex items-baseline gap-3 border-b border-slate-200 pb-3">
                    <span className="font-mono text-sm font-bold text-amber-deepText">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3
                      id={section.id}
                      /* scroll-mt mirrors the site-wide scroll-padding-top, so a
                         chip click clears the sticky header even if the browser
                         resolves the target before the padding is applied. */
                      className="scroll-mt-28 font-display text-lg font-bold leading-snug text-navy-900"
                    >
                      {section.title}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-col gap-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-safety"
                        />
                        <span className="text-[15px] leading-relaxed text-navy-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Cross-links: privacy sits next to this in the real estate, so link
              it rather than leaving the reader to hunt for it. */}
          <div className="mt-14 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-navy-900">
                Questions about these terms?
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-600">
                Anything here that is unclear, or a job you think these terms do not cover,
                is better asked on a call than assumed.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:items-end">
              <a href={contacts.primaryPhoneLink} className="btn-dark inline-flex">
                Call {contacts.primaryPhone}
              </a>
<a
                  href="/privacy.html"
                  className="tap-sm text-sm font-semibold text-navy-900 underline-offset-4 hover:text-amber-deepText hover:underline"
                >
                  Read the Privacy Policy
                </a>
            </div>
          </div>

          <p className="mt-8 flex items-center justify-center gap-2 text-xs text-navy-500">
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            Use your browser&rsquo;s print function if you need a copy for your site file.
          </p>
        </div>
      </section>

      <CtaBand
        title="Need terms in writing?"
        intro="Send us the scope by email and we will return a written quotation with these terms attached, so both sides work from the same document."
      />

      <section aria-labelledby="terms-alt-heading" className="border-t border-slate-200 py-14">
        <div className="container-kr flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 id="terms-alt-heading" className="font-display text-lg font-bold text-navy-900">
              Looking for something else?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              The fleet list and our coverage area are the two other pages worth a look.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/equipment/" className="btn-outline inline-flex">
              Equipment &amp; Fleet
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/service-areas/" className="btn-outline inline-flex">
              Service Areas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={links.whatsappEnquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TermsPage