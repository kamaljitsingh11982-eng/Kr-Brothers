import { useEffect } from 'react'
import BUSINESS_CONFIG from '../config/businessConfig'
import SITE_ORIGIN from '../config/siteConfig'

/**
 * Keeps a single set of document-level meta tags in sync with the current
 * route. Tags are updated in place rather than appended, so navigating between
 * pages never leaves two canonicals or two og:title elements in the document.
 */

function setMeta(keyAttr, key, content) {
  if (content === undefined || content === null || content === '') return
  let el = document.head.querySelector(`meta[${keyAttr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(keyAttr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function absolute(url) {
  if (!url) return undefined
  return url.startsWith('http') ? url : `${SITE_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * @param {object} meta
 * @param {string} meta.title        document.title
 * @param {string} meta.description  meta description + og/twitter description
 * @param {string} [meta.canonical]  path or full URL, defaults to the current path
 * @param {string} [meta.image]      og:image / twitter:image path
 * @param {object} [meta.jsonLd]     structured data object for this page
 * @param {boolean} [meta.robots]    robots meta content
 */
export function useDocumentMeta({
  title,
  description,
  canonical,
  image = '/assets/gallery/imgs/og-image.png',
  jsonLd,
  robots = 'index, follow',
  keywords,
} = {}) {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname
  const path =
    pathname === '/' || pathname.endsWith('.html') || pathname.endsWith('/')
      ? pathname
      : `${pathname}/`

  useEffect(() => {
    const pageKeywords = Array.isArray(keywords)
      ? keywords.join(', ')
      : (keywords ?? BUSINESS_CONFIG.seo.keywords)

    if (title) document.title = title
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    if (title) setMeta('property', 'og:title', title)
    setMeta('property', 'og:locale', 'en_IN')
    if (pageKeywords) setMeta('name', 'keywords', pageKeywords)
    if (description) {
      setMeta('name', 'description', description)
      setMeta('name', 'twitter:description', description)
      setMeta('property', 'og:description', description)
    }
    setMeta('name', 'robots', robots)

    const url = canonical === false ? undefined : absolute(canonical ?? path)
    if (url) {
      setLink('canonical', url)
      setMeta('property', 'og:url', url)
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove()
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'KR Brothers Crane Service')

    const img = absolute(image)
    if (img) {
      setMeta('property', 'og:image', img)
      setMeta('property', 'og:image:secure_url', img)
      setMeta('property', 'og:image:type', 'image/png')
      setMeta('property', 'og:image:width', '1200')
      setMeta('property', 'og:image:height', '630')
      setMeta('name', 'twitter:image', img)
      const imageAlt =
        'KR Brothers construction emblem with crane rental and lifting services in Punjab'
      setMeta('property', 'og:image:alt', imageAlt)
      setMeta('name', 'twitter:image:alt', imageAlt)
    }

    if (jsonLd) {
      let el = document.getElementById('page-jsonld')
      if (!el) {
        el = document.createElement('script')
        el.type = 'application/ld+json'
        el.id = 'page-jsonld'
        document.head.appendChild(el)
      }
      el.textContent = JSON.stringify(jsonLd)
    } else {
      // Pages without their own structured data must clear the previous route's
      // block, otherwise a service page's Service/FAQ schema leaks onto the
      // home page after client-side navigation.
      document.getElementById('page-jsonld')?.remove()
    }
  }, [title, description, canonical, image, jsonLd, robots, path, keywords])
}

export default useDocumentMeta