import { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  X,
} from 'lucide-react'
import BUSINESS_CONFIG from '../config/businessConfig'
import Reveal from './Reveal'
import SocialLinks from './SocialLinks'
import SectionHeading from './SectionHeading'

// Earliest bookable date on the enquiry form. Fixed at load - a session that
// straddles midnight should not silently shift the field out from under someone.
const TODAY = new Date(
  Date.now() - new Date().getTimezoneOffset() * 60000,
).toISOString().slice(0, 10)

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  service: '',
  location: '',
  date: '',
  message: '',
}

const PHONE_RE = /^[+]?[\d][\d\s()-]{7,17}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

function validate(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your full name.'
  } else if (values.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters.'
  }

  const phone = values.phone.trim()
  if (!phone) {
    errors.phone = 'Please enter a contact number.'
  } else if (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Enter a valid phone number (10 digits or more).'
  }

  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.service) errors.service = 'Select the service you need.'

  if (!values.location.trim()) {
    errors.location = 'Tell us the project location.'
  }

  if (!values.message.trim()) {
    errors.message = 'Describe your job so we can quote correctly.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Please add a little more detail (10+ characters).'
  }

  return errors
}

function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

function Input({ label, id, error, hint, className = '', ...rest }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`field-input ${error ? 'field-input-error' : ''}`}
        {...rest}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-navy-500">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  )
}

export function Contact({ preselectService, onPreselectHandled }) {
  const { contacts, links, location, operations, services, map, brand, formspree } =
    BUSINESS_CONFIG

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [submissionError, setSubmissionError] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [summary, setSummary] = useState(null)
  const formRef = useRef(null)
  const successRef = useRef(null)

  // Pre-select the service coming from the services modal.
  useEffect(() => {
    if (!preselectService) return
    setValues((v) => ({ ...v, service: preselectService }))
    setErrors((e) => ({ ...e, service: undefined }))
    const timeoutId = setTimeout(
      () => formRef.current?.querySelector('[name="service"]')?.focus(),
      80,
    )
    onPreselectHandled?.()
    return () => clearTimeout(timeoutId)
  }, [preselectService, onPreselectHandled])

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((v) => ({ ...v, [name]: value }))
    if (touched[name]) {
      setErrors((e) => ({ ...e, [name]: validate({ ...values, [name]: value })[name] }))
    }
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((e) => ({ ...e, [name]: validate(values)[name] }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched(
      Object.keys(EMPTY).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    )

    const firstErrorKey = Object.keys(EMPTY).find((key) => nextErrors[key])
    if (firstErrorKey) {
      formRef.current
        ?.querySelector(`[name="${firstErrorKey}"]`)
        ?.focus()
      return
    }

    const serviceLabel =
      services.find((s) => s.id === values.service)?.title ?? values.service

    const payload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      service: serviceLabel,
      location: values.location.trim(),
      date: values.date || 'Not specified',
      message: values.message.trim(),
    }

    setSummary({
      service: payload.service,
      location: payload.location,
    })
    setSubmissionError('')

    if (!formspree.endpoint) {
      setSubmissionError(
        'Online quote submission is not configured yet. Please contact us by phone or WhatsApp.',
      )
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch(formspree.endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload, _gotcha: honeypot }),
      })

      if (!response.ok) {
        throw new Error(`Formspree returned HTTP ${response.status}`)
      }

      setStatus('success')
    } catch (error) {
      console.error('Quote form submission failed.', error)
      setSubmissionError(
        'We could not send your enquiry just now. Please try again or contact us by phone or WhatsApp.',
      )
      setStatus('error')
    }
  }

  const resetForm = () => {
    setValues(EMPTY)
    setErrors({})
    setTouched({})
    setStatus('idle')
    setSubmissionError('')
    setHoneypot('')
    setSummary(null)
  }

  const buildWhatsAppHref = (payload = values) => {
    const serviceLabel =
      services.find((s) => s.id === payload.service)?.title ?? payload.service
    const text = [
      `New enquiry from the KR Brothers website`,
      ``,
      `Name: ${payload.name.trim()}`,
      `Phone: ${payload.phone.trim()}`,
      `Email: ${payload.email.trim()}`,
      `Service: ${serviceLabel}`,
      `Project location: ${payload.location.trim()}`,
      `Preferred date: ${payload.date || 'Not specified'}`,
      ``,
      `Job details:`,
      payload.message.trim(),
    ].join('\n')

    return `https://wa.me/${contacts.whatsappNumberCompact}?text=${encodeURIComponent(text)}`
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-40" aria-hidden="true" />

      <div className="container-kr relative">
        <SectionHeading
          eyebrow="Get a Quote"
          title="Request a Free"
          titleAccent="Site Assessment"
          lead="Share the load and location. We will call you back, confirm the machine class and give you a clear written quotation."
          headingId="contact-heading"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Info panel */}
          <Reveal variant="slide-right" className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-navy-900 p-6 shadow-card sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-steel-grid bg-grid opacity-25" aria-hidden="true" />
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-amber-safety/15 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-safety">
                  Direct Contact
                </p>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-white">
                  Talk to KR Brothers
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-300">
                  Prefer to speak instead of typing? Both numbers are answered by
                  the operations desk.
                </p>
              </div>

              <ul className="relative mt-7 space-y-3">
                <li>
                  <a
                    href={contacts.primaryPhoneLink}
                    className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.05] p-4 transition-colors hover:border-amber-safety/60 hover:bg-amber-safety/10"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-safety text-navy-900">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-xs font-bold uppercase tracking-wider text-navy-300">
                        Call — Primary
                      </span>
                      <span className="mt-0.5 block font-display text-lg font-bold text-white transition-colors group-hover:text-amber-safety">
                        {contacts.primaryPhone}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={contacts.secondaryPhoneLink}
                    className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.05] p-4 transition-colors hover:border-amber-safety/60 hover:bg-amber-safety/10"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/10 text-amber-safety">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-xs font-bold uppercase tracking-wider text-navy-300">
                        Call — Secondary / WhatsApp
                      </span>
                      <span className="mt-0.5 block font-display text-lg font-bold text-white transition-colors group-hover:text-amber-safety">
                        {contacts.secondaryPhone}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={links.whatsappEnquiry}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.05] p-4 transition-colors hover:border-amber-whatsapp hover:bg-amber-whatsapp/15"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-whatsapp text-white">
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-xs font-bold uppercase tracking-wider text-navy-300">
                        WhatsApp Chat
                      </span>
                      <span className="mt-0.5 block font-display text-lg font-bold text-white transition-colors group-hover:text-[#25D366]">
                        {contacts.whatsappNumber}
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={contacts.mailtoLink}
                    className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.05] p-4 transition-colors hover:border-amber-safety/60 hover:bg-amber-safety/10"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/10 text-amber-safety">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-xs font-bold uppercase tracking-wider text-navy-300">
                        Email
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-bold text-white transition-colors group-hover:text-amber-safety">
                        {contacts.emailDisplay}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="relative mt-6 rounded-xl border border-white/10 bg-navy-950/60 p-4">
                <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-safety">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Operating Yard
                </p>
                <address className="mt-2 not-italic text-sm leading-relaxed text-navy-200">
                  {location.addressLine1}
                  <br />
                  {location.addressLine2}
                </address>
                <a
                  href={location.directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-sm mt-3 gap-1.5 text-xs font-bold normal-case tracking-normal text-amber-safety underline-offset-4 hover:underline"
                >
                  Get directions
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>

              <div className="relative mt-3 rounded-xl border border-white/10 bg-navy-950/60 p-4">
                <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-safety">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Office Address
                </p>
                <address className="mt-2 not-italic text-sm leading-relaxed text-navy-200">
                  {location.office.addressLine1}
                  <br />
                  {location.office.addressLine2}
                </address>
                <a
                  href={location.office.directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-sm mt-3 gap-1.5 text-xs font-bold normal-case tracking-normal text-amber-safety underline-offset-4 hover:underline"
                >
                  Office directions
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>

              <p className="relative mt-5 flex items-start gap-2 text-xs text-navy-300">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-safety" aria-hidden="true" />
                {operations.hours} &nbsp;•&nbsp; {operations.responseTime}
              </p>

              {/* Shows the social profiles configured for the business. */}
              <SocialLinks heading="Follow Us" size="sm" className="mt-5" />
            </div>
          </Reveal>
          <Reveal variant="slide-left" delay={100} className="h-full">
            <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              {status === 'success' ? (
                <div className="flex min-h-[26rem] flex-col items-center justify-center text-center animate-scale-in">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <Send className="h-10 w-10" aria-hidden="true" />
                  </span>
                  <h3
                    ref={successRef}
                    tabIndex={-1}
                    className="mt-6 font-display text-2xl font-bold tracking-tight text-navy-900 outline-none"
                  >
                    Enquiry Sent
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-navy-600">
                    Thank you. Your enquiry has been sent to KR Brothers. We will contact you
                    using the details you provided.
                  </p>

                  <dl className="mt-6 w-full max-w-md space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left">
                    <div className="flex justify-between gap-4">
                      <dt className="text-xs font-bold uppercase tracking-wider text-navy-500">
                        Service
                      </dt>
                      <dd className="text-right text-sm font-semibold text-navy-900">
                        {summary?.service}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-slate-200 pt-2">
                      <dt className="text-xs font-bold uppercase tracking-wider text-navy-500">
                        Location
                      </dt>
                      <dd className="text-right text-sm font-semibold text-navy-900">
                        {summary?.location}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                    <a
                      href={buildWhatsAppHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp flex-1"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Follow up on WhatsApp
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-500 underline-offset-4 hover:text-amber-deepText hover:underline"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-navy-900">
                        Request a Quote
                      </h3>
                      <p className="mt-1.5 text-sm text-navy-600">
                        All fields marked with <span className="text-red-600">*</span> are required.
                      </p>
                    </div>
                    <span className="hidden shrink-0 rounded-lg bg-amber-safety/15 px-2.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-amber-deepText sm:inline">
                      {brand.tagline}
                    </span>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-6"
                  >
                    <div
                      className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
                      aria-hidden="true"
                    >
                      <label htmlFor="krb-website">Leave this field empty</label>
                      <input
                        id="krb-website"
                        name="_gotcha"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(event) => setHoneypot(event.target.value)}
                      />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Full Name *"
                        id="krb-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g. Rakesh Kumar"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name ? errors.name : undefined}
                      />

                      <Input
                        label="Phone Number *"
                        id="krb-phone"
                        name="phone"
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="e.g. 98765 43210"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone ? errors.phone : undefined}
                      />

                      <Input
                        label="Email Address (optional)"
                        id="krb-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email ? errors.email : undefined}
                        className="sm:col-span-2 lg:col-span-1"
                      />

                      <div>
                        <label htmlFor="krb-service" className="field-label">
                          Service Type *
                        </label>
                        <select
                          id="krb-service"
                          name="service"
                          required
                          value={values.service}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={touched.service && errors.service ? 'true' : undefined}
                          aria-describedby={
                            touched.service && errors.service ? 'krb-service-error' : undefined
                          }
                          className={`field-input appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-11 ${
                            touched.service && errors.service ? 'field-input-error' : ''
                          }`}
                        >
                          <option value="">Select a service…</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.title}
                            </option>
                          ))}
                          <option value="other">Something else / not sure</option>
                        </select>
                        <FieldError id="krb-service-error">
                          {touched.service ? errors.service : null}
                        </FieldError>
                      </div>

                      <Input
                        label="Project Location *"
                        id="krb-location"
                        name="location"
                        type="text"
                        required
                        autoComplete="address-level2"
                        placeholder="e.g. Site near Mukerian, Hoshiarpur"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.location ? errors.location : undefined}
                      />

                      <Input
                        label="Preferred Date"
                        id="krb-date"
                        name="date"
                        type="date"
                        min={TODAY}
                        value={values.date}
                        onChange={handleChange}
                        hint="Optional — helps us plan machine availability."
                      />

                      <div className="sm:col-span-2">
                        <label htmlFor="krb-message" className="field-label">
                          Job Description *
                        </label>
                        <textarea
                          id="krb-message"
                          name="message"
                          rows={5}
                          required
                          placeholder="e.g. Need a 25-tonne Hydra for one day to unload 8 T steel sections at our yard. Approx. 20 lifts, ground is compacted hardstand."
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={touched.message && errors.message ? 'true' : undefined}
                          aria-describedby={
                            touched.message && errors.message
                              ? 'krb-message-error'
                              : 'krb-message-hint'
                          }
                          className={`field-input resize-y ${
                            touched.message && errors.message ? 'field-input-error' : ''
                          }`}
                        />
                        {touched.message && errors.message ? (
                          <FieldError id="krb-message-error">{errors.message}</FieldError>
                        ) : (
                          <p id="krb-message-hint" className="mt-1.5 text-xs text-navy-500">
                            Mention load weight in tonnes, working radius and number of
                            shifts for the fastest quote.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Live error summary for screen readers */}
                    <div aria-live="polite" className="sr-only">
                      {Object.keys(errors).length > 0 &&
                        `The form has ${Object.keys(errors).length} error(s). Please review the highlighted fields.`}
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-primary flex-1"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                        {status === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
                      </button>

                      <a
                        href={contacts.primaryPhoneLink}
                        className="btn-outline flex-1"
                        aria-label={`Prefer to talk? Call ${contacts.primaryPhone}`}
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {contacts.primaryPhone}
                      </a>
                    </div>

                    {status === 'error' && (
                      <p className="mt-3 text-sm font-medium text-red-700" role="alert">
                        {submissionError}
                      </p>
                    )}

                    <a
                      href={buildWhatsAppHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp mt-3 inline-flex w-full sm:w-auto"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Send enquiry via WhatsApp instead
                    </a>

                    <p className="mt-4 text-xs leading-relaxed text-navy-500">
                      We use your details only to respond to this enquiry. We do not sell them
                      or share them with advertisers or lead brokers. If you choose WhatsApp
                      or email, your message goes to that provider. Read the{' '}
                      <a
                        href="/privacy.html"
                        className="font-semibold text-navy-700 underline underline-offset-4 hover:text-amber-deepText"
                      >
                        privacy policy
                      </a>
                      .
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal variant="zoom-out" className="mt-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="font-display text-base font-bold tracking-tight text-navy-900">
                  {map.title}
                </h3>
                <p className="mt-0.5 text-xs text-navy-500">{map.subtitle}</p>
              </div>
              <a
                href={location.office.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-sm normal-case"
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Open in Google Maps
              </a>
            </div>

            <div className="relative h-[18rem] w-full sm:h-[24rem] lg:h-[28rem]">
              <iframe
                src={location.office.mapsEmbedSrc}
                title={`Google Map — ${map.title}, ${map.subtitle}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <p className="border-t border-slate-200 px-6 py-4 text-xs leading-relaxed text-navy-500">
              {map.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
