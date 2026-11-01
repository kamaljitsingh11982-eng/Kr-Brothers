import BUSINESS_CONFIG from './businessConfig'
import SITE_ORIGIN from './siteConfig'

export function getLocalBusinessSchema() {
  const { brand, contacts, location, operations, social } = BUSINESS_CONFIG

  const servedPlaces = [
    'Mukerian',
    'Hajipur',
    'Talwara',
    'Dasuya',
    'Hoshiarpur',
    'Pathankot',
    ...operations.serviceRegions,
  ]

  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/#business`,
    name: brand.name,
    url: `${SITE_ORIGIN}/`,
    image: `${SITE_ORIGIN}/assets/gallery/imgs/og-image.png`,
    logo: `${SITE_ORIGIN}/assets/gallery/imgs/kr-logo-128.webp`,
    description: brand.shortDescription,
    slogan: brand.taglineWithSlogan,
    knowsAbout: [
      'crane rental',
      'hydra crane hire',
      'machinery shifting',
      'steel erection',
      'breakdown recovery',
    ],
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
    areaServed: [...new Set(servedPlaces)].map((place) => ({ '@type': 'Place', name: place })),
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