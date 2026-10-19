import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, Clock, Menu, Phone, Star, X } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import { getIcon } from '../lib/icons'
import { Logo } from './Logo'
import useFocusTrap from '../hooks/useFocusTrap'
import useScrollLock from '../hooks/useScrollLock'

function QuickCallBadge() {
  const { contacts } = BUSINESS_CONFIG
  return (
    <a
      href={contacts.primaryPhoneLink}
      className="group hidden shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg border border-white/15 bg-white/[0.06] py-2 pl-2.5 pr-3.5 transition-colors hover:border-amber-safety/60 hover:bg-amber-safety/10 xl:flex"
      aria-label={`Call KR Brothers now on ${contacts.primaryPhone}`}
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-md bg-amber-safety text-navy-900">
        <span
          className="pointer-events-none absolute inset-0 rounded-md bg-amber-safety/60 animate-pulse-ring"
          aria-hidden="true"
        />
        <Phone className="relative h-4 w-4" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-[0.16em] text-amber-safety">
          <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
          Quick Call
        </span>
        <span className="mt-1 font-display text-base font-bold tracking-wide text-white transition-colors group-hover:text-amber-safety">
          {contacts.primaryPhone}
        </span>
      </span>
    </a>
  )
}

/**
 * "More" menu for the standalone pages (equipment, service areas, contact,
 * terms).
 *
 * This is a menu, not a dialog, so focus is deliberately *not* trapped - a
 * trapped menu would make Tab cycling feel broken. It closes on Escape, on an
 * outside click, on Tab out and on navigation, and Escape hands focus back to
 * the button so keyboard users are not stranded.
 */
function MoreMenu({ items, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)
  const { pathname } = useLocation()
  const menuId = useId()

  // Any route change closes it, including a client-side navigation from one
  // standalone page to another.
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Outside pointer press.
  useEffect(() => {
    if (!isOpen) return undefined
    const onPointerDown = (event) => {
      if (
        !panelRef.current?.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [isOpen])

  // Tabbing away from the last item closes the menu without stealing focus.
  const onBlurCapture = (event) => {
    if (!panelRef.current?.contains(event.relatedTarget)) setIsOpen(false)
  }

  // Escape must work regardless of where focus currently sits. A menu is not a
  // dialog, so focus is never moved into the panel - without a document-level
  // listener the keypress goes to <body> and the menu stays open.
  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    // self-stretch makes this li as tall as the header bar, so the panel's
    // `top-full` anchors to the header's bottom edge instead of to the middle
    // of a short text link - otherwise the panel opens inside the header.
    <li className="relative self-stretch flex items-center" onBlurCapture={onBlurCapture}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="nav-link inline-flex items-center gap-1 normal-case"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={isOpen ? menuId : undefined}
      >
        More
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          ref={panelRef}
          id={menuId}
          className="absolute right-0 top-full z-[95] mt-3 w-[min(22rem,calc(100vw-2rem))] animate-fade-up overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card"
        >
          <ul className="flex flex-col p-1.5">
            {items.map((item) => {
              const Icon = getIcon(item.icon)
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onNavigate}
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-navy-900/[0.05] focus-visible:bg-navy-900/[0.05]"
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-navy-900 text-amber-safety">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-navy-900">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-navy-600">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </li>
  )
}

export function Navbar({ activeSection, onRequestQuote }) {
  const { navigation, secondaryNavigation, contacts, operations, brand } = BUSINESS_CONFIG
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const drawerRef = useRef(null)
  const toggleRef = useRef(null)

  useScrollLock(isDrawerOpen)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer whenever the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => {
      if (e.matches) setIsDrawerOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Close on route/anchor change.
  useEffect(() => {
    setIsDrawerOpen(false)
  }, [activeSection])

  // Dismissing via the backdrop leaves focus on <body> with nothing to return to,
  // so send it back to the toggle.
  useEffect(() => {
    if (isDrawerOpen) return
    if (document.activeElement === document.body) toggleRef.current?.focus()
  }, [isDrawerOpen])

  useEffect(() => {
    if (!isDrawerOpen) return undefined

    const raf = requestAnimationFrame(() => {
      drawerRef.current?.querySelector('a[href]')?.focus()
    })
    return () => cancelAnimationFrame(raf)
  }, [isDrawerOpen])

  // restore: false - closing via a link should leave focus on the section, not
  // pull it back to the toggle.
  const onDrawerKeyDown = useFocusTrap(drawerRef, isDrawerOpen, {
    onEscape: () => {
      setIsDrawerOpen(false)
      toggleRef.current?.focus()
    },
    restore: false,
  })

  return (
    <>
      {/* Utility strip */}
      <div className="hidden bg-navy-950 text-navy-300 lg:block">
        <div className="container-kr flex h-9 items-center justify-between font-mono text-xs tracking-wide">
          <p className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-amber-safety" aria-hidden="true" />
            {operations.hours}
          </p>
          <p className="truncate pl-6">{operations.primaryRegionLabel}</p>
          <a
            href={`mailto:${contacts.email}`}
            className="transition-colors hover:text-amber-safety"
          >
            {contacts.emailDisplay}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-[90] transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-900 shadow-header'
            : 'bg-navy-900/95 shadow-lg backdrop-blur-md'
        }`}
      >
        <div
          className={`container-kr flex items-center justify-between gap-2 transition-all duration-300 sm:gap-3 ${
            isScrolled ? 'h-16' : 'h-[4.5rem] lg:h-20'
          }`}
        >
          <Link
            to="/"
            className="shrink-0 rounded-md"
            aria-label={`${brand.name} — home`}
          >
            <Logo tone="light" taglineClassName="hidden sm:block" />
          </Link>

          <nav aria-label="Primary" className="hidden min-w-0 flex-1 justify-center lg:flex">
            <ul className="flex h-full items-center gap-2 xl:gap-3 2xl:gap-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  {/* Routed, not a bare hash: these sections only exist on the
                      home page, so a raw #href would dead-end on a service page. */}
                  <Link
                    to={`/${item.href}`}
                    className="nav-link whitespace-nowrap"
                    aria-current={activeSection === item.href ? 'true' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Standalone pages live here so the primary bar keeps its seven
                  section links and stays uncrowded at exactly 1024px. */}
              <MoreMenu items={secondaryNavigation} />
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2 whitespace-nowrap sm:gap-3">
            <QuickCallBadge />

            <button
              type="button"
              onClick={onRequestQuote}
              className="btn-primary btn-sm hidden whitespace-nowrap lg:inline-flex xl:hidden 2xl:inline-flex"
            >
              Get a Quote
            </button>

            <a
              href={contacts.primaryPhoneLink}
              className="btn-primary btn-sm lg:hidden"
              aria-label={`Call now on ${contacts.primaryPhone}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden min-[400px]:inline">Call</span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="icon-btn h-10 w-10 lg:hidden"
              aria-expanded={isDrawerOpen}
              aria-controls={isDrawerOpen ? 'mobile-nav-drawer' : undefined}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div
          className={`hazard-stripe transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-80'
          }`}
        />
      </header>

      {/* Mobile drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 h-full w-full animate-fade-in bg-navy-950/80 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close navigation menu"
            tabIndex={-1}
          />
          <div
            ref={drawerRef}
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onKeyDown={onDrawerKeyDown}
            className="absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] animate-slide-in-left flex-col bg-navy-900 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <Logo tone="light" showTagline={false} />
              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false)
                  toggleRef.current?.focus()
                }}
                className="icon-btn h-10 w-10"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="hazard-stripe shrink-0 opacity-90" />

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-0.5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={`/${item.href}`}
                      onClick={() => setIsDrawerOpen(false)}
                      aria-current={activeSection === item.href ? 'true' : undefined}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                        activeSection === item.href
                          ? 'bg-amber-safety/15 text-amber-safety'
                          : 'text-navy-100 hover:bg-white/5 hover:text-amber-safety'
                      }`}
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 opacity-50" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                {/* Same four standalone pages as the desktop "More" menu, listed
                    flat because a submenu inside a focus-trapped drawer is a
                    keyboard trap for no gain. */}
                {secondaryNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-navy-100 transition-colors hover:bg-white/5 hover:text-amber-safety"
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 opacity-50" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 space-y-2.5 border-t border-white/10 bg-navy-950/60 px-5 py-5">
              <a
                href={contacts.primaryPhoneLink}
                className="btn-dark flex w-full"
                aria-label={`Call ${contacts.primaryPhone}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contacts.primaryPhone}
              </a>
              <a
                href={BUSINESS_CONFIG.links.whatsappEnquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex w-full"
              >
                WhatsApp Us
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false)
                  onRequestQuote()
                }}
                className="btn-primary flex w-full"
              >
                Get a Quote
              </button>
              <p className="pt-1 text-center font-mono text-xs uppercase tracking-wider text-navy-300">
                {operations.hoursShort}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar