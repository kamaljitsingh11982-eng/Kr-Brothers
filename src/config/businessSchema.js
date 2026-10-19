import BUSINESS_CONFIG from './businessConfig'
import SITE_ORIGIN from './siteConfig'

export function getLocalBusinessSchema() {
  const { brand, contacts, location, operations, social } = BUSINESS_CONFIG

  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/#business`,
    name: brand.name,
    url: `${SITE_ORIGIN}/`,
    image: `${SITE_ORIGIN}/assets/gallery/imgs/og-image.png`,
    logo: `${SITE_ORIGIN}/assets/gallery/imgs/favicon.svg`,
    description: brand.shortDescription,
    slogan: brand.taglineWithSlogan,
    sameAs: Object.values(social).filter(Boolean),
    telephone: contacts.primaryPhoneRaw,
    email: contacts.email,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.addressLine1,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.pincode,
      addressCountry: location.countryCode,
    },
    areaServed: operations.serviceRegions,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  }
}