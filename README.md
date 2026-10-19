# KR Brothers

KR Brothers is a Vite + React website for a crane rental and lifting services business based in Mukerian, Hoshiarpur, Punjab.

## Features

- Home landing page with service highlights
- Service detail pages for crane and lifting solutions
- Equipment and service area pages
- Contact and quote enquiry flow
- Responsive layout for mobile, tablet and desktop
- SEO-ready metadata and static route support

## Local development

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## Production build

```bash
npx playwright install chromium
npm run build
```

The Playwright Chromium browser is installed once per development environment;
the build script uses it during its automatic postbuild prerender step.

### Quote form

The quote form uses Formspree. Create a Formspree form and set its endpoint
before building/deploying:

```bash
# .env.local (local development) or your hosting build environment
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

The endpoint is public configuration, not a secret. Without it, the form shows
a setup message and visitors can still contact the business by phone or
WhatsApp. Phone and WhatsApp link clicks dispatch a `krb:contact-click` browser
event with `{ channel, href }` detail for future analytics integration.

The production output is written to `dist/`. The build keeps the original
source media intact and excludes verified superseded copies only from `dist/`.
Upload the **contents** of `dist/` (including `.htaccess`) into Hostinger's
`public_html` directory.

### Hostinger domain checklist

- Configure the apex and `www` DNS records using the exact targets shown in
  Hostinger's domain dashboard; do not substitute guessed IP addresses or
  CNAME targets.
- Keep `www.krbrothers.com` as the canonical host. Configure an apex-to-`www`
  redirect in Hostinger after both hostnames resolve to the hosting account.
- Preserve existing MX records and email-related TXT records when changing
  DNS. Only update website records that Hostinger identifies as required.
- Enable the domain's SSL certificate in Hostinger after DNS is pointing to the
  account, verify both hostnames over HTTPS, then enable/verify HTTPS
  redirection.
- The included `.htaccess` selects `index.html` and routes missing files to the
  prerendered `404.html`. Check route refreshes and the branded 404 response
  after upload.
- No production upload, DNS change, live SSL check, or email-delivery test is
  performed by the local build.

## Project stack

- React
- Vite
- Tailwind CSS
- Lucide icons
- React Router
