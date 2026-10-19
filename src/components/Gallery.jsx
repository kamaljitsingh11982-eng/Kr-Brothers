import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, MapPin } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import Modal from './Modal'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function GalleryMedia({ item, className, sizes }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        srcSet={item.imageSrcSet}
        sizes={sizes}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className={`${className} object-cover`}
      />
    )
  }

  return <div className={className} role="img" aria-label={`${item.title} image unavailable`} />
}

function GalleryLightbox({ items, index, isOpen, onClose, onPrev, onNext }) {
  const item = items[index]

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onNext, onPrev])

  if (!item) return null

  const headingId = 'lightbox-title'
  const descId = 'lightbox-desc'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy={headingId}
      describedBy={descId}
      size="xl"
      closeLabel="Close image viewer"
      className="bg-navy-950"
    >
      <div className="relative">
        <GalleryMedia
          item={item}
          sizes="(min-width: 1200px) 1152px, 100vw"
          className="aspect-[16/9] w-full sm:aspect-[2/1]"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent"
          aria-hidden="true"
        />

        {/* Arrows */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous image"
              className="icon-btn absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="icon-btn absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        )}

        {/* Caption */}
        <div className="relative px-5 pb-5 pt-4 sm:px-8 sm:pb-7">
          <p className="inline-flex rounded-md bg-amber-safety px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider text-navy-900">
            {item.categoryLabel}
          </p>
          <h2
            id={headingId}
            className="mt-2.5 font-display text-lg font-bold leading-tight tracking-tight text-white sm:text-2xl"
          >
            {item.title}
          </h2>
          <p id={descId} className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-300">
            {item.caption}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-navy-300">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-safety" aria-hidden="true" />
              {item.location}
            </span>
            <span className="font-mono">
              Image {index + 1} of {items.length}
            </span>
          </div>
        </div>

        <div className="hazard-stripe opacity-90" />
      </div>
    </Modal>
  )
}

export function Gallery() {
  const { gallery, galleryFilters } = BUSINESS_CONFIG
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const isOpen = lightboxIndex >= 0

  const filteredItems = useMemo(
    () =>
      [...(activeFilter === 'all'
        ? gallery
        : gallery.filter((item) => item.category === activeFilter))]
        .sort((a, b) => Number(!a.image) - Number(!b.image)),
    [activeFilter, gallery],
  )

  const openLightbox = useCallback((id) => {
    const idx = filteredItems.findIndex((item) => item.id === id)
    setLightboxIndex(idx >= 0 ? idx : 0)
  }, [filteredItems])

  const closeLightbox = useCallback(() => setLightboxIndex(-1), [])

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i <= 0 ? filteredItems.length - 1 : i - 1))
  }, [filteredItems.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % filteredItems.length)
  }, [filteredItems.length])

  // Reset lightbox when the visible set changes underneath it.
  useEffect(() => {
    setLightboxIndex(-1)
  }, [activeFilter])

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="container-kr">
        <SectionHeading
          eyebrow="Project Gallery"
          title="Our Work"
          titleAccent="On Site"
          lead="A look at the kind of machines, sites and lifts we handle every week."
          headingId="gallery-heading"
        />

        {/* Filters */}
        <Reveal className="mt-10">
          <div
            role="group"
            aria-label="Filter gallery by category"
            className="no-scrollbar mx-auto flex max-w-full gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
          >
            {galleryFilters.map((filter) => {
              const isActive = activeFilter === filter.id
              const count =
                filter.id === 'all'
                  ? gallery.length
                  : gallery.filter((g) => g.category === filter.id).length

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActive}
                  className="chip-toggle"
                >
                  {filter.label}
                  <span
                    className={`ml-2 font-mono text-xs ${
                      isActive ? 'text-amber-safety' : 'text-navy-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <ul
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-live="polite"
        >
          {filteredItems.map((item, i) => (
            <Reveal as="li" key={item.id} variant="zoom-out" delay={(i % 3) * 90} className="h-full">
              <button
                type="button"
                onClick={() => openLightbox(item.id)}
                className="group relative block h-full w-full overflow-hidden rounded-xl border border-slate-200 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-amber-safety hover:shadow-card-hover"
                aria-label={`Open full-size view: ${item.title}`}
              >
                <GalleryMedia
                  item={item}
                  sizes="(min-width: 1280px) 24.5rem, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, calc(100vw - 2rem)"
                  className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"
                />

                <span
                  aria-hidden="true"
                  className="icon-btn pointer-events-none absolute right-3 top-3 h-9 w-9 border-white/25 bg-navy-950/60 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
                >
                  <Expand className="h-4 w-4" />
                </span>

                <span className="absolute inset-x-0 bottom-0 block p-4">
                  <span className="inline-block rounded bg-amber-safety px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-navy-900">
                    {item.categoryLabel}
                  </span>
                  <span className="mt-1.5 block font-display text-sm font-bold leading-tight tracking-tight text-white sm:text-base">
                    {item.title}
                  </span>
                  <span className="mt-1 flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-navy-300">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {item.location}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <GalleryLightbox
        items={filteredItems}
        index={lightboxIndex < 0 ? 0 : lightboxIndex}
        isOpen={isOpen}
        onClose={closeLightbox}
        onPrev={prev}
        onNext={next}
      />
    </section>
  )
}

export default Gallery