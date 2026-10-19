import { ArrowRight, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import BUSINESS_CONFIG from '../config/businessConfig'
import { getIcon } from '../lib/icons'

function HeroBackgroundVideo() {
  const saveData =
    typeof navigator !== 'undefined' && navigator.connection?.saveData === true
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia('(max-width: 1024px)').matches,
  )
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const videoRef = useRef(null)
  const videoSrc = isMobile
    ? '/assets/gallery/optimized/hero-background-mobile-optimized.mp4'
    : '/assets/gallery/optimized/hero-background-laptop-optimized.mp4'

  const resumePlayback = useCallback(() => {
    const video = videoRef.current
    if (!video || document.visibilityState !== 'visible') return

    video.play().catch((error) => {
      if (error.name !== 'AbortError') {
        console.error('Hero background video playback failed.', error)
      }
    })
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)')
    const updateVideoSource = (event) => setIsMobile(event.matches)
    mediaQuery.addEventListener('change', updateVideoSource)
    return () => mediaQuery.removeEventListener('change', updateVideoSource)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = (event) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', updateMotionPreference)
    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || saveData) return undefined

    const resumeWhenVisible = () => {
      if (document.visibilityState === 'visible') resumePlayback()
    }
    document.addEventListener('visibilitychange', resumeWhenVisible)
    window.addEventListener('focus', resumePlayback)
    resumePlayback()

    return () => {
      document.removeEventListener('visibilitychange', resumeWhenVisible)
      window.removeEventListener('focus', resumePlayback)
    }
  }, [prefersReducedMotion, resumePlayback, saveData, videoSrc])

  if (prefersReducedMotion || saveData) {
    return (
      <img
        src="/assets/gallery/imgs/hero-video-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: isMobile ? '68% center' : 'center' }}
        alt=""
        aria-hidden="true"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      key={videoSrc}
      src={videoSrc}
      poster="/assets/gallery/imgs/hero-video-poster.jpg"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: isMobile ? '68% center' : 'center' }}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onPause={(event) => {
        if (!event.currentTarget.ended) resumePlayback()
      }}
      onError={() =>
        console.error(
          `Hero background video could not be loaded: ${videoSrc}`,
        )
      }
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}

export function Hero({ onRequestQuote }) {
  const { brand, contacts, location, links, operations } = BUSINESS_CONFIG
  const BadgeIcon = getIcon('BadgeCheck')

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-navy-950"
    >
      {/* Background artwork + overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroBackgroundVideo />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/45 to-navy-950/20 sm:from-navy-950/45 sm:via-navy-950/25 sm:to-navy-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/65 via-transparent to-navy-950/20 sm:from-navy-950/55 sm:to-navy-950/20" />
        <div
          className="absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-amber-safety/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2 bg-safety-stripe opacity-70"
          style={{ backgroundSize: '28px 28px' }}
          aria-hidden="true"
        />
      </div>

      <div className="container-kr relative py-16 sm:py-20 lg:py-24 xl:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-amber-safety/40 bg-amber-safety/10 px-4 py-2 font-mono text-xs font-bold tracking-[0.12em] text-amber-safety">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="pointer-events-none absolute inline-flex h-full w-full rounded-full bg-amber-safety animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-safety" />
            </span>
            KR Brothers &nbsp;•&nbsp; Safe Lift Strong Support
          </p>

          <h1
            id="hero-heading"
            className="mt-6 font-display text-kr-display font-extrabold leading-[1.06] tracking-tight text-white animate-fade-up sm:text-5xl lg:text-6xl xl:text-kr-display-xl"
            style={{ animationDelay: '80ms' }}
          >
            Reliable Crane,{' '}
            <span className="text-amber-safety">Lifting</span> &amp; Heavy Material
            Handling Services
          </h1>

          <p
            className="mt-5 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg animate-fade-up"
            style={{ animationDelay: '160ms' }}
          >
            Specialised in all types of lifting work, material handling and heavy
            industrial construction across Mukerian, Hoshiarpur and Northern India.
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            <button type="button" onClick={onRequestQuote} className="btn-primary btn-lg">
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href={contacts.primaryPhoneLink}
              className="btn-dark btn-lg normal-case"
              aria-label={`Call now on ${contacts.primaryPhone}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now: {contacts.primaryPhone}
            </a>

            <a
              href={links.whatsappEnquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-lg"
              aria-label="Chat with KR Brothers on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>

          {/* Trust strip */}
          <dl
            className="mt-9 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 border-t border-white/10 pt-7 sm:grid-cols-3 animate-fade-up"
            style={{ animationDelay: '320ms' }}
          >
            <div className="flex items-start gap-2.5">
              <BadgeIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-safety" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-white">
                  Certified Crew
                </dt>
                <dd className="mt-0.5 text-xs text-navy-300">Riggers &amp; operators</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-safety" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-white">
                  Safety First
                </dt>
                <dd className="mt-0.5 text-xs text-navy-300">Pre-lift planned lifts</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-safety" aria-hidden="true" />
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-white">
                  Local Base
                </dt>
                <dd className="mt-0.5 text-xs text-navy-300">{location.baseAreaLabel}</dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Floating service card */}
        <aside
          aria-label="Service area and availability"
          className="mt-12 max-w-sm animate-fade-up rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-md lg:absolute lg:bottom-10 lg:right-8 lg:mt-0 lg:max-w-xs xl:right-16"
          style={{ animationDelay: '400ms' }}
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-safety">
            Service Area
          </p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-white">
            {operations.primaryRegionLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {operations.heroServiceAreas.map((place) => (
              <li key={place} className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-navy-100">
                {place}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-navy-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {operations.hours}
          </p>
          <a
            href={location.directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-sm gap-1.5 text-xs font-semibold text-amber-safety underline-offset-4 hover:underline"
          >
            Get directions
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <p className="sr-only">{brand.subTagline}</p>
        </aside>
      </div>
    </section>
  )
}

export default Hero