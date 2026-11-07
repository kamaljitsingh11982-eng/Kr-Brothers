import BUSINESS_CONFIG from './businessConfig'
import SITE_ORIGIN from './siteConfig'

export function getLocalBusinessSchema() {
  const { brand, contacts, location, operations, social } = BUSINESS_CONFIG
  const containedInPlace = {
    '@type': 'AdministrativeArea',
    name: `${location.district} District, ${location.state}`,
  }
  const mainAreas = operations.confirmedMainServiceAreas.map((place) => ({
    '@type': 'City',
    name: place,
    description: 'Confirmed main service location.',
    containedInPlace,
  }))
  const nearbyVillages = operations.confirmedNearbyVillages.map((place) => ({
    '@type': 'Place',
    name: place,
    description: 'Confirmed nearby village service area.',
    containedInPlace,
  }))

  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/#business`,
    name: brand.legalName,
    alternateName: brand.name,
    url: `${SITE_ORIGIN}/`,
    image: `${SITE_ORIGIN}/assets/gallery/imgs/og-image.png`,
    logo: `${SITE_ORIGIN}/assets/gallery/imgs/kr-logo-128.webp`,
    description: brand.shortDescription,
    slogan: brand.taglineWithSlogan,
    knowsAbout: [
      'crane rental',
      'hydra crane hire',
      'loading and unloading',
      'material handling',
      'machinery shifting',
      'construction-site lifting',
      'steel erection',
      'breakdown recovery',
    ],
    sameAs: [...Object.values(social), location.mapsLink].filter(Boolean),
    hasMap: location.mapsLink,
    telephone: contacts.primaryPhoneRaw,
    email: contacts.email,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contacts.primaryPhoneRaw,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Punjabi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: contacts.secondaryPhoneRaw.replaceAll(' ', ''),
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Punjabi'],
      },
    ],
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
    areaServed: [...mainAreas, ...nearbyVillages],
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