import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import BUSINESS_CONFIG from '../config/businessConfig'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingActions from './FloatingActions'
import { trackContactClick } from '../lib/contactTracking'

/**
 * Chrome shared by every route: skip link, navbar, page outlet, footer and the
 * floating contact actions.
 *
 * Only the one-page home has in-view section tracking, so the active-section
 * highlight is computed here but observed only on the home route.
 */
export function SiteShell() {
  const location = useLocation()
  const { pathname, hash } = location
  const locationKey = location.key
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const [activeSection, setActiveSection] = useState('#home')
  const isHome = pathname === '/'

  // Highlight the section currently in view in the navigation.
  useEffect(() => {
    if (!isHome) return undefined

    const ids = BUSINESS_CONFIG.navigation.map((item) => item.href.slice(1))
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node) => node instanceof HTMLElement)

    if (nodes.length === 0 || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(`#${visible[0].target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [isHome])

  useEffect(() => {
    const onContactClick = (event) => {
      if (!(event.target instanceof Element)) return
      const link = event.target.closest('a[href^="tel:"], a[href*="wa.me/"]')
      if (!link) return
      trackContactClick(link.href.startsWith('tel:') ? 'phone' : 'whatsapp', link.href)
    }

    document.addEventListener('click', onContactClick)
    return () => document.removeEventListener('click', onContactClick)
  }, [])

  // The router does not scroll on its own. Jump to the top on a new navigation, and
  // honour an in-page hash such as /#contact coming from a service page.
  //
  // `location.key` is in the dependency list deliberately. React Router mints a
  // fresh key for every navigation, including one that lands on a hash already
  // in the address bar. Keying on [pathname, hash] alone meant that clicking
  // the section link you are already on emitted a NAVIGATION but changed
  // neither value, so the effect never re-ran and the click silently did
  // nothing.
  useEffect(() => {
    if (!hash) {
      if (navigationType === 'PUSH' || navigationType === 'REPLACE') {
        window.scrollTo(0, 0)
      }
      return undefined
    }

    // Two frames: the first lands after the route has rendered, the second
    // after the target section's reveal wrappers have mounted.
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)))
        if (!target) return
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
          block: 'start',
        })
      })
    })

    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [pathname, hash, locationKey, navigationType])

  const requestQuote = useCallback(() => navigate('/#contact'), [navigate])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[200] rounded-lg bg-amber-safety px-4 py-2.5 text-sm font-bold text-navy-900 focus:not-sr-only focus:fixed"
      >
        Skip to main content
      </a>

      <Navbar activeSection={isHome ? activeSection : null} onRequestQuote={requestQuote} />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
      <FloatingActions />
    </div>
  )
}

export default SiteShell