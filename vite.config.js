import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import BUSINESS_CONFIG from './src/config/businessConfig.js'
import SITE_ORIGIN from './src/config/siteConfig.js'

function injectBusinessSeo() {
  const replacements = {
    __SEO_TITLE__: BUSINESS_CONFIG.seo.title,
    __SEO_DESCRIPTION__: BUSINESS_CONFIG.seo.description,
    __SEO_KEYWORDS__: BUSINESS_CONFIG.seo.keywords,
    __SITE_ORIGIN__: SITE_ORIGIN,
  }

  return {
    name: 'inject-business-seo',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (result, [placeholder, value]) =>
          result.replaceAll(placeholder, value.replaceAll('&', '&amp;')),
        html,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), injectBusinessSeo()],
  server: {
    host: true,
    port: 5173,
  },
})