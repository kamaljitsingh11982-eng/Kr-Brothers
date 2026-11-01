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

The production output is written to `dist/`.

### Hosting

The site is hosted on Vercel. `vercel.json` contains the deployment and response
header configuration, and Vercel serves the production build generated in
`dist/`.

## Project stack

- React
- Vite
- Tailwind CSS
- Lucide icons
- React Router
