import { useEffect, useState } from 'react'
import { ArrowUp, MessageCircle, Phone, X } from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'

const LABELS = {
  call: 'Call KR Brothers',
  whatsapp: 'Chat with KR Brothers on WhatsApp',
  top: 'Back to top',
}

/**
 * Sticky bottom-right speed dial with call + WhatsApp actions and a
 * back-to-top control that appears after scrolling.
 */
export function FloatingActions() {
  const { contacts, links } = BUSINESS_CONFIG
  const [isOpen, setIsOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the dial on Escape.
  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const actions = [
    {
      key: 'whatsapp',
      href: links.whatsappEnquiry,
      label: `WhatsApp ${contacts.whatsappNumber}`,
      shortLabel: 'WhatsApp',
      Icon: MessageCircle,
      className: 'bg-amber-whatsapp hover:bg-amber-whatsappHover',
    },
    {
      key: 'call',
      href: contacts.primaryPhoneLink,
      label: `Call ${contacts.primaryPhone}`,
      shortLabel: 'Call',
      Icon: Phone,
      className: 'bg-amber-safety text-navy-900 hover:bg-amber-light',
    },
  ]

  return (
    <div className="fixed bottom-4 right-4 z-[100] hidden flex-col items-end gap-3 md:flex md:bottom-6 md:right-6">
      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={LABELS.top}
        className={`icon-btn rounded-full shadow-card transition-all duration-300 ${
          showTop
            ? 'visible pointer-events-auto translate-y-0 opacity-100'
            : 'invisible pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Expanded actions */}
      <ul
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
          isOpen
            ? 'visible pointer-events-auto translate-y-0 opacity-100'
            : 'invisible pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        {actions.map(({ key, href, label, shortLabel, Icon, className }) => (
          <li key={key} className="flex items-center gap-2.5">
            <span
              className={`whitespace-nowrap rounded-lg bg-navy-900 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-card ${
                isOpen ? 'animate-fade-up' : ''
              }`}
              aria-hidden="true"
            >
              {shortLabel}
            </span>
            <a
              href={href}
              target={key === 'whatsapp' ? '_blank' : undefined}
              rel={key === 'whatsapp' ? 'noopener noreferrer' : undefined}
              className={`relative grid h-12 w-12 place-items-center rounded-full shadow-card-hover transition-colors ${key === 'whatsapp' ? 'text-white' : ''} ${className}`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-current opacity-20 animate-pulse-ring"
              />
              <Icon className="relative h-6 w-6" aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close quick contact actions' : 'Open quick contact actions'}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-navy-900 text-amber-safety shadow-card-hover transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-amber-safety/45 animate-pulse-ring"
        />
        {isOpen ? (
          <X className="relative h-6 w-6" aria-hidden="true" />
        ) : (
          <Phone className="relative h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

export default FloatingActions