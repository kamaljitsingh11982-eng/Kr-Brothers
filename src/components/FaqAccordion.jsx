import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Reveal from './Reveal'

/**
 * Disclosure list used by the homepage FAQ and by every service page.
 *
 * `items` are objects with `question` and `answer`. Set `headingLevel` to the
 * tag that wraps each question button so the page heading outline stays
 * correct (h2 questions on a service page, h3 inside the homepage FAQ).
 */
export function FaqAccordion({ items, headingLevel: Heading = 'h3', initiallyOpen = 0 }) {
  const baseId = useId()
  // Prefer the caller's stable id; fall back to the question text.
  const keyFor = (item) => item.id ?? item.question
  const [openId, setOpenId] = useState(
    items?.[initiallyOpen] ? keyFor(items[initiallyOpen]) : null,
  )

  if (!items?.length) return null

  return (
    <ul className="space-y-3">
      {items.map((faq, i) => {
        const key = keyFor(faq)
        const isOpen = openId === key
        const btnId = `${baseId}-btn-${i}`
        const panelId = `${baseId}-panel-${i}`

        return (
          <Reveal as="li" key={key} delay={i * 50}>
            <div
              className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                isOpen
                  ? 'border-amber-safety/50 bg-white shadow-card'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <Heading>
                <button
                  type="button"
                  id={btnId}
                  onClick={() => setOpenId(isOpen ? null : key)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 sm:px-6 sm:py-5"
                >
                  <span className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 font-mono text-xs font-bold ${
                        isOpen ? 'text-amber-deepText' : 'text-navy-500'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-bold leading-snug tracking-wide text-navy-900">
                      {faq.question}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-amber-safety text-navy-900'
                        : 'bg-slate-100 text-navy-600'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
              </Heading>

              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                aria-hidden={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-navy-600 sm:px-6 sm:py-5 sm:pl-14">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )
      })}
    </ul>
  )
}

export default FaqAccordion