// Every piece of business data on this website lives in this file. Change a
// phone number or address here and the whole site picks it up.
//
// Icon names are strings and are resolved to Lucide React components through
// `ICON_MAP` in `src/lib/icons.js`. Add an entry to ICON_MAP when you
// introduce a new icon name so this file stays framework-free.

export const BUSINESS_CONFIG = {
  // basics
  brand: {
    name: 'KR Brothers',
    nameShort: 'KR',
    nameUpper: 'KR BROTHERS',
    legalName: 'KR Brothers Crane Service',
    tagline: 'Safe Lift Strong Support',
    slogan: 'Your trust, our service',
    taglineWithSlogan: 'Safe Lift Strong Support — Your trust, our service',
    subTagline:
      'Crane on rent and hydra on rent for lifting, material handling and construction work.',
    shortDescription:
      'KR Brothers Crane Service is a Hajipur-based contractor offering Hydra crane rental, crane hire, loading and unloading, material handling, machinery shifting and construction-site lifting in confirmed service areas. Operating since 2015, the published lifting class is 0–16 tons subject to the selected machine’s load chart and site conditions.',
    foundedYear: 2015,
    established: 'Established 2015',
  },

  // Confirm the primary address and coordinates before launch.
  location: {
    addressLine1: 'Vill. Khizarpur (Hajipur), Teh. Mukerian',
    addressLine2: 'Distt. Hoshiarpur, Punjab 144221, India',
    get addressShort() {
      return `${BUSINESS_CONFIG.location.addressLine1}, ${BUSINESS_CONFIG.location.addressLine2}`
    },
    baseAreaLabel: 'Hajipur, Dasuya, Talwara, Mukerian, Distt. Hoshiarpur',
    city: 'Hajipur',
    district: 'Hoshiarpur',
    state: 'Punjab',
    stateCode: 'PB',
    country: 'India',
    countryCode: 'IN',
    pincode: '144221',
    latitude: 31.9501457,
    longitude: 75.7253036,
    get mapQuery() {
      return `${BUSINESS_CONFIG.location.latitude},${BUSINESS_CONFIG.location.longitude}`
    },
    get mapsEmbedSrc() {
      return `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS_CONFIG.location.mapQuery)}&z=13&output=embed`
    },
    get mapsLink() {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_CONFIG.location.mapQuery)}`
    },
    get directionsLink() {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS_CONFIG.location.mapQuery)}`
    },
    get geoLabel() {
      return BUSINESS_CONFIG.location.addressShort
    },
  },

  // phones
  contacts: {
    primaryPhone: '+91 78890 87547',
    primaryPhoneRaw: '+917889087547',
    primaryPhoneLink: 'tel:+917889087547',
    secondaryPhone: '+91 97792 55878',
    secondaryPhoneRaw: '+91 97792 55878',
    secondaryPhoneLink: 'tel:+919779255878',
    whatsappNumber: '+91 97792 55878',
    whatsappRaw: '919779255878',
    whatsappNumberCompact: '919779255878',
    whatsappMessage:
      'Hello KR Brothers, I would like to enquire about your services.',
    email: 'krbrothers82@gmail.com',
    emailDisplay: 'krbrothers82@gmail.com',
    mailtoLink: 'mailto:krbrothers82@gmail.com',
    emergencyNote: '24/7 breakdown & emergency lifting support',
  },

  // generated helper link values
  links: {
    get telPrimary() {
      return BUSINESS_CONFIG.contacts.primaryPhoneLink
    },
    get whatsappEnquiry() {
      const { whatsappRaw, whatsappMessage } = BUSINESS_CONFIG.contacts
      return `https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
        whatsappMessage,
      )}`
    },
get whatsappService() {
      const { whatsappRaw } = BUSINESS_CONFIG.contacts
      return (service) =>
        `https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
          `Hello KR Brothers, I would like to book the service: ${service}. Please share availability and pricing.`,
        )}`
    },
  },

  /* social
   * Paste your real page URLs below. Leave a value as an empty string and the
   * icon is hidden automatically, so the site never shows dead "#" links.
   * Only the full https:// URL goes here — no trailing text needed.
   * -------------------------------------------------------------------- */
  social: {
    facebook: 'https://www.facebook.com/share/18aBi4PuA3/',
    instagram: 'https://www.instagram.com/kr.brothers_khizarpur',
    youtube: 'https://youtube.com/@kr.brothers_khizarpur',
  },

  /* social helper
   * Returns only the platforms that actually have a URL, so components can
   * map over them without checking for blanks themselves.
   * -------------------------------------------------------------------- */
  get activeSocial() {
    const { facebook, instagram, youtube } = BUSINESS_CONFIG.social
    return [
      { id: 'facebook', label: 'Facebook', href: facebook, icon: 'Facebook' },
      { id: 'instagram', label: 'Instagram', href: instagram, icon: 'Instagram' },
      { id: 'youtube', label: 'YouTube', href: youtube, icon: 'Youtube' },
    ].filter((item) => typeof item.href === 'string' && item.href.trim() !== '')
  },

  // operations
  operations: {
    hours: '24 Hours — All 7 Days',
    hoursShort: 'Open 24x7',
    hoursIcon: 'Clock',
    responseTime: 'Mobilisation timing is confirmed for each site based on route, machine and crew availability',
    confirmedMainServiceAreas: [
      'Dasuya',
      'Mukerian',
      'Talwara',
      'Hajipur',
      'Garhdiwala',
    ],
    confirmedNearbyVillages: [
      'Khizarpur',
      'Bhunga',
      'Mansoorpur',
      'Khanpur',
      'Attalgarh',
      'Aima Mangat',
    ],
    serviceRegions: [
      'Dasuya',
      'Mukerian',
      'Talwara',
      'Hajipur',
      'Garhdiwala',
      'Khizarpur',
      'Bhunga',
      'Mansoorpur',
      'Khanpur',
      'Attalgarh',
      'Aima Mangat',
    ],
    primaryRegionLabel:
      'Dasuya, Mukerian, Talwara, Hajipur and Garhdiwala, with nearby village enquiries',
    heroServiceAreas: [
      'Dasuya',
      'Mukerian',
      'Talwara',
      'Hajipur',
      'Garhdiwala',
    ],
  },

  // stats
  stats: [
    {
      id: 'experience',
      get value() {
        return new Date().getFullYear() - BUSINESS_CONFIG.brand.foundedYear
      },
      suffix: '+',
      prefix: '',
      label: 'Years of Field Experience',
      description:
        'Operating from Khizarpur (Hajipur) since 2015 across industrial and civil lifting work.',
      icon: 'Award',
    },
    {
      id: 'projects',
      // TODO(owner): replace with a real, provable number
      hidden: true,
      value: 1200,
      suffix: '+',
      prefix: '',
      label: 'Lifting Projects Completed',
      description:
        'Crane hires, plant shifts and site erection jobs completed across Punjab and Himachal.',
      icon: 'Truck',
    },
    {
      id: 'compliance',
      // TODO(owner): replace with a real, provable number
      hidden: true,
      value: 100,
      suffix: '%',
      prefix: '',
      label: 'Certified Equipment & Safety Compliance',
      description:
        'Fitness certificates, third-party load tests and documented rigging inspections.',
      icon: 'ShieldCheck',
    },
    {
      id: 'support',
      value: 24,
      suffix: '/7',
      prefix: '',
      label: 'Emergency Breakdown & Lifting Support',
      description:
        'Night, Sunday and festival-shift availability for urgent breakdowns and lifts.',
      icon: 'Headset',
    },
  ],

  // services
  /**
   * 8 core services. `id` is used for the quote-form dropdown value, so it must
   * remain stable once enquiries start referencing it.
   */
  services: [
    {
      id: 'crane-rental-fleet-hire',
      title: 'Crane Rental & Fleet Hire',
      shortTitle: 'Fleet Hire',
      icon: 'Forklift',
      short:
        'Flexible mobile and hydraulic crane rental on hourly, shift-based, daily or monthly plans.',
      summary:
        'Ask about crane hire and mobile crane on rent options. Crane rental charges and the crane per hour rate are discussed after reviewing the machine, hours and site distance.',
      capacity: '0 – 16 T class',
      scope: [
        'Hydraulic mobile and truck-mounted crane rental.',
        'Hourly, per-shift, per-day or monthly rental arrangements.',
        'Operator and certified rigger supplied as a complete package.',
        'Multiple machines deployed for coordinated lifting campaigns.',
        'Mobilisation to confirmed service areas, subject to route, machine and crew availability.',
      ],
      safety: [
        'Third-party load test certificate verified before dispatch.',
        'Fitness, pollution and insurance documents checked and carried on site.',
        'Daily pre-shift inspection of boom, wire ropes, hooks and outriggers.',
        'Load charts and rated capacity displayed inside the cab.',
      ],
      applications: [
        'Infrastructure contractors',
        'Industrial plant projects',
        'Real-estate builders',
        'Multi-machine erection campaigns',
      ],
      bestFor: 'Long-running site requirements and ongoing material movement.',
    },
    {
      id: 'hydra-crane-services',
      title: 'Hydra Crane Services & Yard Handling',
      shortTitle: 'Hydra Yard Services',
      icon: 'MoveUpRight',
      short:
        'Hydra cranes within the 0–16 T class for yard stacking, truck loading and confined-site material movement.',
      summary:
        'The ACE Hydra 16XW supports yard handling; ask about hydra on rent for truck loading and the hydra crane per hour rate based on job details. The Hydra fleet is within the 0–16 T class, subject to the machine load chart.',
      capacity: '0 – 16 T class',
      scope: [
        'Yard stacking, re-stacking and stockpile management.',
        'Truck and trailer loading / unloading at site.',
        'Confined-space lifting inside factory sheds and narrow lanes.',
        'Inter-yard and warehouse-to-worksite material transfer.',
        'Long-reach work over compound walls and stored material.',
      ],
      safety: [
        'Outriggers set on firm, level ground with adequate mats.',
        'Stabiliser and slew-radius verified against the load being lifted.',
        'Banksman positioned for every yard movement cycle.',
        'Exclusion zone maintained around the lift circle.',
      ],
      applications: [
        'Foundry & forging units',
        'Steel and cement yards',
        'Rice / agro processing plants',
        'Logistics depots',
      ],
      bestFor: 'Fast, high-cycle yard and loading work where reach matters.',
    },
    {
      id: 'heavy-duty-mobile-cranes',
      title: 'Mobile Crane Services',
      shortTitle: 'Mobile Crane Services',
      icon: 'Truck',
      short:
        'Mobile crane hire for machinery, steel members and planned lifts within the 0–16 T fleet class.',
      summary:
        'Share the load, radius and site details so we can check whether a mobile crane in our 0–16 T fleet class suits the job.',
      capacity: '0 – 16 T class',
      scope: [
        'Machinery and plant equipment handling within the selected machine’s load chart.',
        'Steel members, girders, trusses and precast lifting where the load chart and site conditions allow.',
        'Pick-and-carry operations across long-radius lifts.',
        'Low-bed trailer coordination for dispatch of machinery.',
        'Site access and ground-condition review before mobilisation.',
      ],
      safety: [
        'Pre-lift plan reviewed with site engineer and client.',
        'Ground bearing pressure checked; outrigger mats provided.',
        'SWL counterweights configured for the planned radius.',
        'Wind, slew and load-moment limiter compliance monitored.',
      ],
      applications: [
        'Power plant & transmission',
        'Fabrication shops',
        'Bridge segment handling',
        'Plant relocation projects',
      ],
      bestFor: 'Planned mobile crane lifts that require careful load-chart and site checks.',
    },
    {
      id: 'construction-site-lifting-erection',
      title: 'Construction Site Lifting & Erection',
      shortTitle: 'Site Lifting & Erection',
      icon: 'Building2',
      short:
        'Construction site crane hire for steel erection and precast slab placement at live sites.',
      summary:
        'Construction site crane hire supports projects needing a steel erection crane or precast slab lifting crane. Share the lift sequence and site details to discuss the plan.',
      capacity: '0 – 16 T class',
      scope: [
        'Column, beam, slab and precast element lifting.',
        'Stanchion and truss erection support.',
        'Structural steel alignment and bolting assistance.',
        'Sequence planning with the site contractor.',
        'Multi-level and night-shift erection programs.',
      ],
      safety: [
        'Site-specific method statement prepared before mobilisation.',
        'Certified tag lines and guides used on every element lift.',
        'Unauthorised site personnel kept clear during erection.',
        'Daily toolbox talk conducted with the crew.',
      ],
      applications: [
        'G+ residential projects',
        'Industrial sheds & warehouses',
        'Commercial complexes',
        'Prefabricated structures',
      ],
      bestFor: 'Live construction sites needing a complete lifting crew.',
    },
    {
      id: 'plant-relocation-loading-unloading',
      title: 'Plant Relocation & Loading / Unloading',
      shortTitle: 'Plant Relocation',
      icon: 'Factory',
      short:
        'Plant relocation crane support for loading unloading work and truck unloading at industrial sites.',
      summary:
        'A plant relocation crane can support a loading unloading crane requirement, including truck unloading crane enquiries. Share the route, load and site access details.',
      capacity: '0 – 16 T class',
      scope: [
        'Truck unloading and offloading at site.',
        'In-plant relocation of presses, furnaces and CNC machines.',
        'Positioning and alignment on foundations.',
        'Shut-down-window planning with the plant team.',
        'Internal material movement between shops and godowns.',
      ],
      safety: [
        'Permit-to-work and lock-out coordination with plant safety.',
        'Existing utilities, cable trays and pipe lines verified.',
        'Path survey done before mobilising the crane to the spot.',
        'Spotters stationed at blind corners inside the shop.',
      ],
      applications: [
        'Automotive assembly units',
        'Food & beverage plants',
        'Machine tool builders',
        'Rolling mills',
      ],
      bestFor: 'Moves that must happen inside a live, running factory.',
    },
    {
      id: 'structural-steel-girder-positioning',
      title: 'Girder Lifting & Structural Steel Positioning',
      shortTitle: 'Girder Positioning',
      icon: 'Ruler',
      short:
        'Girder lifting crane support for roof truss erection and bridge girder positioning.',
      summary:
        'Ask about a girder lifting crane, roof truss erection crane or bridge girder crane for structural positioning. Share the member weight, radius and site details.',
      capacity: '0 – 16 T class',
      scope: [
        'Roof truss and gantry girder erection.',
        'Bridge girders and deck segments placement.',
        'Column and gable-frame member lifting.',
        'Tanker, silo and hopper positioning.',
        'Grinding and finishing support during alignment.',
      ],
      safety: [
        'Lifting plan and rigging schematic approved before the lift.',
        'Proper tag lines, chain slings and soft slings used.',
        'No lifting over occupied zones; barricades enforced.',
        'Load re-hung only after the slinger re-checks the rigging.',
      ],
      applications: [
        'Bridge & highway projects',
        'Pre-engineered buildings',
        'Factory roofing',
        'Architectural steel work',
      ],
      bestFor: 'Long-span steel where placement accuracy is critical.',
    },
    {
      id: 'factory-machinery-shifting',
      title: 'Factory Machinery Shifting & Lifting',
      shortTitle: 'Factory Machinery Moves',
      icon: 'Wrench',
      short:
        'Factory machinery shifting crane support for transformers and other industrial equipment.',
      summary:
        'For factory machinery shifting, share lifting points, route and site access; ask about a transformer shifting crane for the move.',
      capacity: '0 – 16 T class',
      scope: [
        'Machine shifting shop-to-shop within the plant.',
        'Loading and unloading of transformers, presses and CNC units.',
        'Foundation pit, grouting and anchor-bolt alignment support.',
        'Levelling and precision alignment on the foundation.',
        'Return and re-installation after a factory move.',
      ],
      safety: [
        'Machine centre-of-gravity and lifting points verified.',
        'Machinery never lifted by non-rated lifting points.',
        'Base plates and precision surfaces protected during transit.',
        'Electrical isolation confirmed before any internal move.',
      ],
      applications: [
        'CNC machine tool units',
        'Electrical & transformer yards',
        'Foundry and forging shops',
        'Packaging plants',
      ],
      bestFor: 'Fragile, high-value equipment that needs careful handling.',
    },
    {
      id: 'breakdown-emergency-support',
      title: 'Breakdown & Emergency Recovery Support',
      shortTitle: 'Breakdown Recovery',
      icon: 'Siren',
      short:
        'Breakdown crane service and truck recovery crane support for hydraulic failures and stuck-load situations.',
      summary:
        'Call about 24x7 crane service or emergency crane service for a breakdown; response depends on location and machine availability.',
      capacity: '0 – 16 T class',
      scope: [
        'Crane breakdown assistance and hook-block recovery.',
        'Overturned or stuck lorry and tipper recovery.',
        'Workshop to site crane hire on emergency call-outs.',
        'Night, Sunday and festival-shift deployments.',
        'Coordination with site authorities and highway patrol.',
      ],
      safety: [
        'Road-side lifting done with traffic barricades and marshals.',
        'Night operations use full LED flood and warning lighting.',
        'Emergency job handled with the shortest safe rigging chain.',
        'Incident and equipment status reported to the client on call.',
      ],
      applications: [
        'Highway & construction contractors',
        'Transport fleet operators',
        'Industrial units on night shift',
        'Any site facing an unplanned breakdown',
      ],
      bestFor: 'Unplanned situations where response time decides the loss.',
    },
  ],

  // why us
  whyChooseUs: [
    {
      id: 'certified-riggers',
      title: 'Certified Riggers & Skilled Operators',
      icon: 'BadgeCheck',
      description:
        'Every lift is executed by trained operators and riggers who understand load charts, tag lines and signal discipline.',
    },
    {
      id: 'modern-fleet',
      title: 'Modern, Well-Maintained Crane Fleet',
      icon: 'Wrench',
      description:
        'Hydra and truck-mounted cranes serviced on schedule with documented fitness and load-test records.',
    },
    {
      id: 'safety-protocols',
      title: 'Zero-Compromise Safety Protocols',
      icon: 'ShieldAlert',
      tagline: 'Safe Lift Strong Support',
      description:
        'Pre-lift planning, ground checks and exclusion zones on every job — no shortcut is ever taken on a lift.',
    },
    {
      id: 'punctual',
      title: 'Punctual Mobilisation & Quick Response',
      icon: 'Timer',
      description:
        'We treat site start dates seriously. Equipment reaches the location when promised, with the crew already briefed.',
    },
    {
      id: 'pricing',
      title: 'Transparent & Competitive Pricing',
      icon: 'IndianRupee',
      description:
        'Rate cards and mobilisation charges are shared upfront. No hidden extras discovered on the completion invoice.',
    },
    {
      id: 'local-support',
      title: 'Dedicated 24/7 Local Support',
      icon: 'Headset',
      description:
        'Being based in Hajipur means we are close to the confirmed service locations when you need help.',
    },
  ],

  // workflow
  workflow: [
    {
      number: '01',
      title: 'Initial Call or Inquiry',
      icon: 'PhoneCall',
      description:
        'Call or WhatsApp us with your location, load weight and timeline. We gather the basics and confirm machine availability.',
    },
    {
      number: '02',
      title: 'Site & Load Assessment',
      icon: 'ClipboardCheck',
      description:
        'Our engineer reviews tonnage, working radius, ground conditions, approach road and site restrictions before committing a crane.',
    },
    {
      number: '03',
      title: 'Transparent Quotation & Equipment Dispatch',
      icon: 'FileText',
      description:
        'You receive a clear written quotation with machine class, duration and shift pattern. On approval the machine and crew are dispatched.',
    },
    {
      number: '04',
      title: 'Safe & Precision Lifting Execution',
      icon: 'ShieldCheck',
      description:
        'Rigging and lifting are carried out as per the approved method statement, with the client signing off on placement.',
    },
  ],

  // applications
  applications: [
    {
      id: 'highway-bridge',
      title: 'Highway & Bridge Infrastructure',
      icon: 'Route',
      description:
        'Girder launching, precast segment placement, pier caps, formwork and equipment handling for NH and state highway packages.',
      accent: 'amber',
    },
    {
      id: 'factories',
      title: 'Industrial Factories & Manufacturing Units',
      icon: 'Factory',
      description:
        'Machine installation, plant relocation, unit-wise shifting and component handling inside running production lines, subject to the selected machine’s load chart.',
      accent: 'steel',
    },
    {
      id: 'real-estate',
      title: 'Commercial Real Estate Construction',
      icon: 'Building2',
      description:
        'Steel erection, precast lifting, façade and MEP equipment placement for G+ commercial and institutional projects.',
      accent: 'amber',
    },
    {
      id: 'machinery-unloading',
      title: 'Machinery Unloading & Plant Erection',
      icon: 'Truck',
      description:
        'Unloading presses, transformers, CNC units and production lines from trailers, then positioning them on foundations.',
      accent: 'steel',
    },
    {
      id: 'power-transmission',
      title: 'Power & Transmission Installations',
      icon: 'Zap',
      description:
        'Transformer and reactor placement, tower and pole assembly work, cable drum handling and substation erection support.',
      accent: 'amber',
    },
    {
      id: 'warehouse-yard',
      title: 'Warehouse & Yard Material Handling',
      icon: 'Warehouse',
      description:
        'Hydra-based stacking, re-stacking, truck loading and high-cycle yard movements for logistics and storage yards.',
      accent: 'steel',
    },
  ],

  // gallery
  /**
   * Each gallery card uses a real project photo. The `art` field is only a
   * fallback for entries that do not have an image.
   */
  gallery: [
    {
      id: 'g1',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'Orange ACE crane with extended boom at an open worksite',
      caption:
        'An orange ACE crane stands on uneven ground with its boom extended and crew nearby.',
      image: '/assets/gallery/optimized/ace-crane-open-worksite.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g2',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'ACE Hydra 16XW crane parked with boom extended in paved yard',
      caption:
        'An orange ACE Hydra 16XW stands in a paved yard with its boom and hook blocks visible.',
      image: '/assets/gallery/optimized/ace-hydra-16xw-crane-paved-yard.webp',
      art: 'hydra-crane',
    },
    {
      id: 'g15',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'Orange ACE crane lifting concrete slab with hook and slings',
      caption:
        'An orange ACE crane uses its hook and slings to lift a concrete slab.',
      image: '/assets/gallery/optimized/ace-crane-lifting-concrete-slab.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g16',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'Crane holding concrete slab beside unfinished building as workers guide lift',
      caption:
        'Workers guide a crane holding a concrete slab beside an unfinished structure.',
      image: '/assets/gallery/optimized/ace-crane-concrete-slab-building-site.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g17',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'ACE Hydra 16XW crane parked beside covered materials in paved yard',
      caption:
        'An orange ACE Hydra 16XW is parked beside materials covered with blue tarpaulins.',
      image: '/assets/gallery/optimized/ace-hydra-16xw-crane-yard-materials.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g18',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'Orange ACE crane positioned on paved area with boom and hooks',
      caption: 'An orange ACE crane stands on the paved area with its boom and hooks visible.',
      image: '/assets/gallery/optimized/ace-crane-open-yard.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g19',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'Workers guide orange crane work platform beneath an indoor ceiling',
      caption:
        'Workers guide an orange crane work platform beneath a ceiling inside a building.',
      image: '/assets/gallery/optimized/crane-crew-positioning-indoor-platform.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g20',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'Orange ACE Hydra crane beside pallet loads under blue tarpaulins',
      caption:
        'An orange ACE Hydra crane is beside pallet-sized loads covered with blue tarpaulins.',
      image: '/assets/gallery/optimized/ace-hydra-crane-covered-yard-loads.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g21',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'Hydra crane lifting orange work platform indoors as workers guide positioning',
      caption:
        'A crane hook supports an orange work platform indoors while workers guide its position.',
      image: '/assets/gallery/optimized/hydra-crane-lifting-indoor-platform.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g22',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'Workers guide suspended orange work platform beneath indoor crane boom',
      caption:
        'Workers stand beside a suspended orange work platform beneath an indoor crane boom.',
      image: '/assets/gallery/optimized/workers-guiding-indoor-crane-platform.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g23',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'Orange crane positioned at decorated building entrance with boom extending inside',
      caption:
        'An orange crane is at a decorated building entrance with its boom extending inside.',
      image: '/assets/gallery/optimized/crane-at-building-entrance.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g24',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'Two orange ACE Hydra cranes beside large building with site staff',
      caption:
        'Two orange ACE Hydra cranes are positioned beside a large building as staff coordinate nearby.',
      image: '/assets/gallery/optimized/two-ace-hydra-cranes-outside-building.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g25',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'Workers guide orange crane platform indoors during careful positioning',
      caption:
        'Several workers guide an orange crane platform inside a building.',
      image: '/assets/gallery/optimized/crane-crew-guiding-indoor-platform.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g26',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'Two orange ACE cranes parked outside building with site staff',
      caption:
        'Two orange ACE cranes are parked beside a building while site staff stand nearby.',
      image: '/assets/gallery/optimized/ace-cranes-building-worksite.webp',
      art: 'mobile-crane',
    },
  ],

  galleryFilters: [
    { id: 'all', label: 'All' },
    { id: 'cranes', label: 'Cranes' },
    { id: 'construction-sites', label: 'Construction Sites' },
  ],

  // faq
  faqs: [
    {
      id: 'f1',
      question: 'What crane capacities and types does KR Brothers operate?',
      answer:
        'Our Hydra, hydraulic mobile and truck-mounted crane fleet is from 0 up to 16 tonnes. If a job needs more than that, we will tell you plainly before you book. The safe working capacity for each lift depends on the load weight, working radius, boom length and ground conditions and must be checked against the selected machine’s load chart.',
    },
    {
      id: 'f2',
      question: 'Where can I hire a Hydra crane near Hajipur?',
      answer:
        'Yes. We are based at Vill. Khizarpur (Hajipur), Teh. Mukerian in Distt. Hoshiarpur. Our confirmed main service locations are Dasuya, Mukerian, Talwara, Hajipur and Garhdiwala. Nearby village enquiries include Khizarpur, Bhunga, Mansoorpur, Khanpur, Attalgarh and Aima Mangat. Share the exact site pin so the team can confirm practical mobilisation.',
    },
    {
      id: 'f3',
      question: 'How quickly can equipment be mobilised for emergency lifting or breakdown jobs?',
      answer:
        'Mobilisation timing depends on the exact site, route, machine and crew availability, and road conditions. Share your site pin and requested date so the team can confirm what can be arranged before you plan around a machine. For planned jobs, send the load and site details early so the team can discuss assessment and scheduling. Night, Sunday and festival shifts are subject to confirmation.',
    },
    {
      id: 'f4',
      question: 'Are your operators and cranes certified for industrial safety audits?',
      answer:
        'Yes. Our cranes carry valid fitness certificates, pollution certificates, insurance and third-party load-test records, and we can share those documents for your site audit or vendor onboarding. Our operators and riggers are trained and certified in lifting and signalling operations, and every job starts with a pre-lift plan and toolbox talk. We follow a zero-compromise safety approach — it is the reason behind our tagline, Safe Lift Strong Support.',
    },
    {
      id: 'f5',
      question: 'How can I get an instant quote?',
      get answer() {
        const { primaryPhone, whatsappNumber } = BUSINESS_CONFIG.contacts
        return `Call us on ${primaryPhone}, send a WhatsApp message to ${whatsappNumber} with your load weight, site location and duration, or fill the Get a Quote form on this page. Share four things to help the team assess your enquiry: the approximate load in tonnes, the working radius, the number of lifts or shifts needed, and the site location. If anything is not clear, the team can discuss a site assessment before finalising the rate.`
      },
    },
    {
      id: 'f6',
      question: 'Do you charge mobilisation separately?',
      answer:
        'Mobilisation and demobilisation charges depend on distance and the number of shifts booked. They are always shown as a separate line in the written quotation so there are no surprises on the final invoice. On long monthly rentals or multi-shift campaigns we normally absorb or reduce the mobilisation cost — ask us for a package rate.',
    },
    {
      id: 'f7',
      question: 'Is fuel and the operator included in the rental?',
      answer:
        'On standard hire the machine, certified operator and rigger are included. Fuel is included for shifts within our regular operating radius and is charged at a transparent rate when the site lies outside it. Overtime and waiting charges are agreed in advance in the quotation so you always know how the bill is calculated.',
    },
  ],

  // map
  map: {
    get title() {
      return `KR Brothers — ${BUSINESS_CONFIG.location.city}`
    },
    get subtitle() {
      return BUSINESS_CONFIG.location.addressShort
    },
    note: 'The map marks the primary business location listed in our contact details.',
  },

  /* equipment / fleet
   * Capacity classes only. These deliberately mirror the `capacity` strings
   * already published on each service page so the two can never disagree.
   * Specific tonnage, boom length and counterweight are confirmed against the
   * load chart for the individual job - never quote a machine blind.
   * -------------------------------------------------------------------- */
  equipment: {
    intro:
      'Our fleet is chosen for the work we actually do: Hydra and truck-mounted machines for yard, shed and site work within the 0–16 T class. Every machine is serviced on schedule with documented fitness and load-test records.',
    disclaimer:
      'Capacities below are class ranges, not a booking confirmation. Rated capacity falls with boom extension, radius and counterweight configuration, so the machine for your job is confirmed against its load chart after a site or load check.',
    machines: [
      {
        id: 'hydra-0-16',
        name: 'Hydra Cranes — 0 T to 16 T',
        icon: 'Construction',
        capacity: '0 T - 16 T class',
        bestFor: 'Yard movements, shed and roof work, plant loading, tight urban sites',
        notes: [
          'Slewing and luffing lets the machine work in confined yards without a large outrigger spread.',
          'The everyday workhorse of the fleet - booked most often for shed and yard lifts.',
        ],
      },
      {
        id: 'truck-mounted',
        name: 'Truck-Mounted Cranes',
        icon: 'Truck',
        capacity: '0 T - 16 T class',
        bestFor: 'Multi-stop jobs and highway or corridor work',
        notes: [
          'Mobilises between sites without a separate transport booking.',
          'Useful where narrow site access limits crane positioning.',
        ],
      },
      {
        id: 'rigging-gear',
        name: 'Rigging Gear & Site Equipment',
        icon: 'Wrench',
        capacity: 'Matched to the selected crane’s load chart',
        bestFor: 'Tag lines, slings, shackles, spreader beams and lifting accessories',
        notes: [
          'Slings and shackles replaced on inspection, not on failure.',
          'Accessories supplied with the crane as part of the lift, not hired separately.',
        ],
      },
    ],
    selectionSteps: [
      {
        step: '01',
        title: 'Tell us the load weight and the distance',
        description:
          'Load in tonnes, plus how far the pick point sits from the crane centre. Without both numbers we cannot recommend a machine.',
      },
      {
        step: '02',
        title: 'Site access and ground condition',
        description:
          'Gate width, overhead cables, headroom, whether the ground is paved and levelled, and how far the crane must be carried from the road.',
      },
      {
        step: '03',
        title: 'We match a machine to the load chart',
        description:
          'The chosen crane is checked against its own load chart for that radius, and we tell you the lifting radius we can safely work to.',
      },
      {
        step: '04',
        title: 'Confirmed quotation and mobilisation',
        description:
          'You get a written scope with the machine, crew, duration and reach. Only then is the crane booked and mobilised.',
      },
    ],
  },

  /* service areas
   * Grouped by realistic drive time from the Khizarpur (Hajipur) base so the
   * page answers "do you come to my area?" instead of listing every village.
   * -------------------------------------------------------------------- */
  serviceAreas: {
    intro:
      'KR Brothers is based in Khizarpur (Hajipur), Tehsil Mukerian. Confirmed main service locations are Dasuya, Mukerian, Talwara, Hajipur and Garhdiwala. Nearby village enquiries include Khizarpur, Bhunga, Mansoorpur, Khanpur, Attalgarh and Aima Mangat. Share the site pin, lift details and date to confirm practical mobilisation.',
    groups: [
      {
        id: 'core',
        title: 'Confirmed Main Service Locations',
        lead: 'Our confirmed main service locations are Dasuya, Mukerian, Talwara, Hajipur and Garhdiwala.',
        areas: [
          'Dasuya',
          'Mukerian',
          'Talwara',
          'Hajipur',
          'Garhdiwala',
        ],
      },
      {
        id: 'nearby-villages',
        title: 'Confirmed Nearby Villages',
        lead: 'Nearby village enquiries are welcome. Share the exact site pin so the team can confirm practical mobilisation.',
        areas: [
          'Khizarpur',
          'Bhunga',
          'Mansoorpur',
          'Khanpur',
          'Attalgarh',
          'Aima Mangat',
        ],
      },
    ],
    note:
      'For a nearby village enquiry, send the village name or a Google Maps pin and the job details. The team will confirm whether the route, machine and crew are practical for the site.',
  },

  /* legal / terms
   * Plain-language commercial terms for a small lifting contractor. Kept in
   * config so the /terms page needs no markup of its own.
   * -------------------------------------------------------------------- */
  legal: {
    title: 'Terms & Conditions',
    subtitle: 'The commercial terms we work on',
    updated: 'Last updated: 2026',
    intro:
      'These terms cover crane hire and lifting work supplied by KR Brothers. They are written to be read, not to be avoided. Anything not covered here is settled in a conversation before the crane is mobilised.',
    sections: [
      {
        id: 'bookings',
        title: 'Bookings & Confirmation',
        points: [
          'A job is confirmed only after we have agreed the machine, crew, duration, working radius and price in writing.',
          'A phone call or WhatsApp message is not a confirmed booking. We treat written confirmation as the booking.',
          'If you need to change or cancel, tell us as early as possible so the machine can be reallocated.',
        ],
      },
      {
        id: 'capacity',
        title: 'Capacity & Load Charts',
        points: [
          'Capacities quoted on this site are class ranges, not a guarantee for your specific lift.',
          'The machine for your job is selected against its own load chart for the radius, boom extension and configuration required.',
          'We will tell you the lifting radius we can safely work to. If your requirement does not suit the machine, we say so rather than attempt the lift.',
        ],
      },
      {
        id: 'site',
        title: 'Site Conditions & Access',
        points: [
          'The client is responsible for safe, level, prepared ground able to carry the outrigger loads of the machine supplied.',
          'Clear the site of obstructions and confirm overhead clearance, underground services and access route details before the crane arrives.',
          'If conditions on arrival are unsafe or unsuitable for the planned lift, the job is stopped until the site is made safe. Any standby is charged.',
        ],
      },
      {
        id: 'crew',
        title: 'Crew, Supervision & Load Handling',
        points: [
          'Every lift is executed by our trained operators and riggers. Clients are asked not to direct the crane or signal the crew.',
          'Tag lines, banksman and signal discipline are used for controlled lifts.',
          'Rigging and lifting accessories are supplied and inspected by us as part of the lift.',
        ],
      },
      {
        id: 'billing',
        title: 'Charges, Standby & Payment',
        points: [
          'Charges are based on the agreed machine, crew, shift pattern and mobilisation distance.',
          'Waiting time becomes chargeable if the crane is held on site for reasons outside our control, including site not being ready.',
          'Payment terms are confirmed in the written quotation for each job.',
        ],
      },
      {
        id: 'damage',
        title: 'Damage & Liability',
        points: [
          'Damage to the machine, its attachments or to client property is assessed and settled on the basis of documented cost.',
          'KR Brothers carries business liability cover for its operations. Certificates can be produced on request.',
        ],
      },
      {
        id: 'safety',
        title: 'Safety & Site Rules',
        points: [
          'Pre-lift planning, ground checks and exclusion zones are standard on every job. No shortcut is taken on a lift.',
          'Unauthorised persons are kept out of the lifting zone.',
          'Work stops if conditions become unsafe. Safety is not negotiable on site.',
        ],
      },
      {
        id: 'privacy',
        title: 'Enquiries & Your Details',
        points: [
          'We use the contact details you give us only to respond to your enquiry and to arrange the work you request.',
          'We do not sell enquiry details or share them with advertisers, lead brokers or data brokers. If you choose WhatsApp or email, your message is handled by that provider as described in the Privacy Policy.',
          'See the Privacy Policy for the fuller explanation of what we collect and how long we keep it.',
        ],
      },
      {
        id: 'law',
        title: 'Governing Law',
        points: [
          'These terms are governed by the laws of India.',
          'Any dispute is subject to the exclusive jurisdiction of the courts at Hoshiarpur, Punjab.',
        ],
      },
    ],
  },

  /* secondary nav — standalone pages, shown in the navbar "More" menu.
   * Kept separate from `navigation` because that array is only home-page
   * section hashes and the active-section scroll spy maps over it.
   * -------------------------------------------------------------------- */
  secondaryNavigation: [
    { label: 'Equipment & Fleet', href: '/equipment/', description: 'Machine classes, capacities and how we select the right crane', icon: 'Wrench' },
    { label: 'Service Areas', href: '/service-areas/', description: 'Confirmed towns and nearby villages we serve', icon: 'MapPin' },
    { label: 'Contact & Enquiries', href: '/contact/', description: 'Phone, WhatsApp, email, hours and our base location', icon: 'Phone' },
    { label: 'Terms & Conditions', href: '/terms/', description: 'Bookings, capacity, site conditions and charges', icon: 'FileText' },
  ],

  // footer
  footer: {
    summary:
      'KR Brothers is a locally rooted lifting and material-handling contractor from Khizarpur (Hajipur), serving confirmed main locations and nearby villages with a maintained fleet and round-the-clock support.',
    quickLinks: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Why Choose Us', href: '#why-us' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} KR Brothers. All Rights Reserved.`,
    credits: 'Safe Lift Strong Support — Your trust, our service',
  },

  // nav
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],

  // seo / meta
  seo: {
    title: 'Crane Rental & Hydra Hire in Hajipur | KR Brothers Crane Service',
    get description() {
      return `Crane and Hydra hire in Dasuya, Mukerian, Talwara, Hajipur and Garhdiwala. Call ${BUSINESS_CONFIG.contacts.primaryPhone} to confirm machine, crew and site availability.`
    },
    keywords:
      'crane service Mukerian, crane on rent Hajipur, hydra crane Dasuya, crane rental Talwara, crane service Garhdiwala, lifting contractor Punjab, machinery shifting services',
  },
}

export default BUSINESS_CONFIG