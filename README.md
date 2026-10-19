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

```powershell
npm run build
```

Playwright Chromium is installed by the build setup and used during the
postbuild prerender step.

### Quote form

The quote form validates the enquiry and opens a prefilled WhatsApp message.
Visitors review and send the message in WhatsApp; the website does not submit or
confirm delivery of enquiries.
Phone and WhatsApp link clicks dispatch a `krb:contact-click` browser event with
`{ channel, href }` detail for future analytics integration.

The production output is written to `dist/`. The build keeps the original
source media intact and excludes verified superseded copies only from `dist/`.
Upload the **contents** of `dist/` (including `.htaccess`) into Hostinger's
`public_html` directory.

### Hostinger domain checklist

- Configure the apex and `www` DNS records using the exact targets shown in
  Hostinger's domain dashboard; do not substitute guessed IP addresses or
  CNAME targets.
- Keep `www.krbrothers.in` as the canonical host. Configure an apex-to-`www`
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
