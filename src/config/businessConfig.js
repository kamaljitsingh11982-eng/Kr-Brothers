// Every piece of business data on this website lives in this file. Change a
// phone number or address here and the whole site picks it up.
//
// Icon names are strings and are resolved to Lucide React components through
// `ICON_MAP` in `src/components/icons.js`. Add an entry to ICON_MAP when you
// introduce a new icon name so this file stays framework-free.

export const BUSINESS_CONFIG = {
  // basics
  brand: {
    name: 'KR Brothers',
    nameShort: 'KR',
    nameUpper: 'KR BROTHERS',
    legalName: 'KR Brothers',
    tagline: 'Safe Lift Strong Support',
    slogan: 'Your Trust Our Service',
    taglineWithSlogan: 'Safe Lift Strong Support — Your Trust Our Service',
    subTagline:
      'All Types of Lifting Work, Material Handling & Construction Work',
    shortDescription:
      'A Mukerian-based lifting and material-handling contractor supporting highway, industrial and construction projects across Punjab and Himachal with certified operators and a well-maintained crane fleet.',
    foundedYear: 2015,
    established: 'Established 2015',
  },

  // location
  location: {
    addressLine1: 'Vill. Khizarpur (Hajipur), Teh. Mukerian',
    addressLine2: 'Distt. Hoshiarpur, Punjab, India',
    addressShort: 'Khizarpur (Hajipur), Dasuya, Talwara, Mukerian, Distt. Hoshiarpur, Punjab',
    baseAreaLabel: 'Hajipur, Dasuya, Talwara, Mukerian, Distt. Hoshiarpur',
    city: 'Hajipur',
    district: 'Hoshiarpur',
    state: 'Punjab',
    stateCode: 'PB',
    country: 'India',
    countryCode: 'IN',
    pincode: '146024',
    latitude: 32.0456,
    longitude: 75.6291,
    // Google Maps "embed" style query + a shareable maps link.
    mapQuery: 'Hajipur, Dasuya, Talwara, Mukerian, Hoshiarpur, Punjab, India',
    mapsEmbedSrc:
      'https://www.google.com/maps?q=Hajipur%2C%20Dasuya%2C%20Talwara%2C%20Mukerian%2C%20Hoshiarpur%2C%20Punjab%2C%20India&z=13&output=embed',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Hajipur%2C+Dasuya%2C+Talwara%2C+Mukerian%2C+Hoshiarpur%2C+Punjab%2C+India',
    directionsLink:
      'https://www.google.com/maps/dir/?api=1&destination=Hajipur%2C+Dasuya%2C+Talwara%2C+Mukerian%2C+Hoshiarpur%2C+Punjab%2C+India',
    geoLabel: 'Khizarpur (Hajipur), Dasuya, Talwara, Mukerian — Distt. Hoshiarpur',
    office: {
      addressLine1: 'Parelian',
      addressLine2: 'Punjab, India · Plus Code XP2G+343',
      latitude: 31.9501457,
      longitude: 75.7253036,
      mapsEmbedSrc:
        'https://www.google.com/maps?q=31.9501457%2C75.7253036&z=17&output=embed',
      mapsLink:
        'https://www.google.com/maps/search/?api=1&query=31.9501457%2C75.7253036',
      directionsLink:
        'https://www.google.com/maps/dir/?api=1&destination=31.9501457%2C75.7253036',
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

  formspree: {
    endpoint: import.meta.env?.VITE_FORMSPREE_ENDPOINT ?? '',
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
    responseTime: 'Same-day mobilisation across Hajipur, Dasuya, Talwara, Mukerian & Hoshiarpur',
    serviceRegions: [
      'Hajipur',
      'Dasuya',
      'Talwara',
      'Mukerian',
      'Hoshiarpur',
      'Pathankot',
      'Garhshankar',
      'Mandi Adamgarh',
      'Shamirpur',
      'Sultanpur Lodhi',
      'Phillaur',
      'Jalandhar',
      'Amritsar',
      'Pathankot (K/B Marg)',
      'Kangra, Himachal Pradesh',
      'Jammu & Kathua Corridor',
    ],
    primaryRegionLabel:
      'Hajipur, Dasuya, Talwara, Mukerian, Hoshiarpur and surrounding Punjab / Himachal industrial belts',
    heroServiceAreas: [
      'Hajipur',
      'Dasuya',
      'Talwara',
      'Mukerian',
      'Hoshiarpur',
      'Pathankot',
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
      icon: 'Forklift',
      short:
        'Flexible mobile and hydraulic crane hire on hourly, shift-based, daily or monthly rental plans.',
      summary:
        'Full-fleet rental for contractors who need a machine on site without owning one — with operator, rigging crew and fuel included.',
      capacity: '12 T – 100 T class',
      scope: [
        'Hydraulic mobile, rough-terrain and truck-mounted crane rental.',
        'Hourly, per-shift, per-day or monthly rental arrangements.',
        'Operator and certified rigger supplied as a complete package.',
        'Multiple machines deployed for single large lifting campaigns.',
        'Mobilisation to any site across Punjab and Himachal Pradesh.',
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
      title: 'Hydra Crane Services — Material Handling & Yard Work',
      icon: 'MoveUpRight',
      short:
        'High-reach Hydra cranes for yard stacking, truck loading and confined-site material movement.',
      summary:
        'Hydra cranes give reach and stability in congested yards where a truck-mounted crane cannot reach or manoeuvre.',
      capacity: '12 T – 25 T class with long reach',
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
      title: 'Heavy-Duty Hydraulic Mobile Cranes',
      icon: 'Truck',
      short:
        'High-tonnage hydraulic mobile cranes for plant equipment, structural steel and heavy machinery lifts.',
      summary:
        'Modern hydraulic truck and rough-terrain cranes capable of handling heavy machinery, girders and multi-fork weights at radius.',
      capacity: '25 T – 100 T class',
      scope: [
        'Heavy machinery and plant equipment handling.',
        'Structural steel, girders, trusses and precast lifting.',
        'Pick-and-carry operations across long-radius lifts.',
        'Low-bed trailer coordination for dispatch of machinery.',
        'Rough-terrain and quarry-condition deployment.',
      ],
      safety: [
        'Pre-lift plan reviewed with site engineer and client.',
        'Ground bearing pressure checked; outrigger mats provided.',
        'SWL counterweights configured for the planned radius.',
        'Wind, slew and load-moment limiter compliance monitored.',
      ],
      applications: [
        'Power plant & transmission',
        'Heavy fabrication shops',
        'Bridge segment handling',
        'Plant relocation projects',
      ],
      bestFor: 'High-value, high-tonnage lifts that demand precision planning.',
    },
    {
      id: 'construction-site-lifting-erection',
      title: 'Construction Site Lifting & Erection',
      icon: 'Building2',
      short:
        'Complete site lifting solutions from steel erection to slab and precast element placement.',
      summary:
        'We handle the lifting schedule, equipment sequencing and safe placement of structural and precast elements on live construction sites.',
      capacity: 'As per site load chart',
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
      title: 'Industrial Plant Equipment Relocation & Loading / Unloading',
      icon: 'Factory',
      short:
        'Complete in-plant shifting, unloading and positioning of heavy equipment without disturbing production.',
      summary:
        'Internal plant moves and external unloading handled with shut-down planning so your line restarts on schedule.',
      capacity: 'Up to 100 T class',
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
      title: 'Structural Steel & Girder Positioning',
      icon: 'Ruler',
      short:
        'Precise placement of steel columns, girders, roof trusses and bridge elements.',
      summary:
        'Structural steel handled with tag lines, guides and engineered slinging so members land exactly where the drawings say.',
      capacity: 'Girders up to 10+ T per member',
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
      title: 'Factory Machinery Shifting & Foundation Loading',
      icon: 'Wrench',
      short:
        'Careful machinery shifting between shops, loading on trailers and final foundation setting.',
      summary:
        'Machine-to-machine shifting handled by riggers who understand the fragility of industrial equipment.',
      capacity: 'CNC, presses, transformers, kilns',
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
      title: '24/7 Breakdown & Emergency Recovery Support',
      icon: 'Siren',
      short:
        'Round-the-clock assistance for breakdowns, hydraulic failures, tipper or lorry recovery and stuck-load situations.',
      summary:
        'When a machine or a loaded vehicle fails on site or on the road, we mobilise recovery cranes and Hydra units quickly.',
      capacity: 'Hydra 12–25 T and heavy cranes',
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
        'Hydra, truck-mounted and rough-terrain cranes serviced on schedule with documented fitness and load-test records.',
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
        'Being based in Hajipur means we are genuinely close to Mukerian, Hoshiarpur and Pathankot when you need help.',
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
        'Machine installation, plant relocation, unit-wise shifting and heavy component handling inside running production lines.',
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
      title: 'Heavy Machinery Unloading & Plant Erection',
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
      title: 'Hydraulic Mobile Crane — Pick & Carry',
      caption:
        'Long-reach hydraulic crane configured for pick-and-carry duty with counterweights and full cab controls.',
      location: 'Mukerian Industrial Belt',
      image: '/assets/gallery/optimized/gallery-image-1.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g2',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'Hydra Crane Boom Extension',
      caption:
        'Telescopic Hydra boom raised to working height with stabilisers fully deployed and mats in place.',
      location: 'Hajipur, Hoshiarpur',
      image: '/assets/gallery/optimized/gallery-image-2.webp',
      art: 'hydra-crane',
    },
    {
      id: 'g15',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'ACE Crane Lifting Concrete Slabs',
      caption:
        'ACE crane lifting concrete slabs at a construction site.',
      location: 'Construction Site',
      image: '/assets/gallery/optimized/img3.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g16',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'ACE Crane Lifting Concrete Slab at Sunrise',
      caption:
        'ACE crane handling a concrete slab during a sunrise construction shift.',
      location: 'Construction Site',
      image: '/assets/gallery/optimized/img4.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g17',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'Orange ACE Crane in Industrial Yard',
      caption:
        'Orange ACE crane positioned for lifting work in an industrial yard.',
      location: 'Industrial Yard',
      image: '/assets/gallery/optimized/img5.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g18',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'ACE Crane at Work',
      caption: 'ACE crane ready for lifting work at an active site.',
      location: 'Construction Site',
      image: '/assets/gallery/optimized/img6.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g19',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'ACE Crane at Construction Site',
      caption:
        'ACE crane positioned beside an active construction project.',
      location: 'Construction Site',
      image: '/assets/gallery/optimized/img7.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g20',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'ACE Crane Fleet at Work',
      caption:
        'ACE crane fleet preparing for lifting work at an industrial site.',
      location: 'Industrial Site',
      image: '/assets/gallery/optimized/img8.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g21',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'ACE 16XW Crane — KR Brothers',
      caption:
        'KR Brothers ACE 16XW crane prepared for on-site lifting operations.',
      location: 'KR Brothers Site',
      image: '/assets/gallery/optimized/img9.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g22',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'Crane at Building Site',
      caption:
        'KR Brothers crane alongside a multi-storey building during site work.',
      location: 'Construction Site',
      image: '/assets/gallery/optimized/img10.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g23',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'Crane Lifting Work at Building',
      caption:
        'On-site crane lifting work carried out beside a multi-storey building.',
      location: 'Construction Site',
      image: '/assets/gallery/optimized/img11.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g24',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'Crane Operations at Construction Site',
      caption:
        'KR Brothers crane supporting lifting work at an active construction site.',
      location: 'Construction Site',
      image: '/assets/gallery/optimized/img12.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g25',
      category: 'construction-sites',
      categoryLabel: 'Construction Sites',
      title: 'Crane Team on Site',
      caption:
        'Crane operators and site staff coordinating an on-site lift.',
      location: 'Construction Site',
      image: '/assets/gallery/optimized/img13.webp',
      art: 'mobile-crane',
    },
    {
      id: 'g26',
      category: 'cranes',
      categoryLabel: 'Cranes',
      title: 'ACE Crane on Site',
      caption:
        'ACE crane positioned for lifting operations at a construction site.',
      location: 'Construction Site',
      image: '/assets/gallery/optimized/img14.webp',
      art: 'mobile-crane',
    },
  ],

  galleryFilters: [
    { id: 'all', label: 'All' },
    { id: 'cranes', label: 'Cranes' },
    { id: 'construction-sites', label: 'Construction Sites' },
  ],

  // testimonials
  testimonials: [
    {
      id: 't1',
      name: 'Harjeet Singh Sidhu',
      designation: 'Project Manager',
      company: 'Sidhu Infrastructure Pvt. Ltd.',
      location: 'Mukerian',
      rating: 5,
      projectType: 'Highway & Bridge Package',
      quote:
        'We needed a 40-tonne crane on site for girder setting on a very tight schedule. KR Brothers studied the radius and ground on the same day and had the machine and riggers on site the next morning. Every lift followed the plan, and the crew kept the exclusion zone clean the whole time.',
    },
    {
      id: 't2',
      name: 'Rakesh Kumar Gupta',
      designation: 'Owner',
      company: 'Gupta Steel Rolling Unit',
      location: 'Hoshiarpur',
      rating: 5,
      projectType: 'Yard Material Handling',
      quote:
        'Their Hydra cranes handle our entire daily yard movement. The operators understand how we want stock stacked, and they adjust the sequence to keep our loading bays free. Honest timings and a straight rate card — rare in this trade.',
    },
    {
      id: 't3',
      name: 'Anil Thakur',
      designation: 'Site Engineer',
      company: 'Thakur Builders',
      location: 'Hajipur',
      rating: 5,
      projectType: 'Commercial Construction',
      quote:
        'For our G+ project we hired them for column and stair precast lifting. The tag-line control was excellent and nothing was damaged across two months of continuous work. They also sent the same crew back every time, which made supervision easy.',
    },
    {
      id: 't4',
      name: 'Sunil Sharma',
      designation: 'Plant Head',
      company: 'Bharat Precision Components',
      location: 'Pathankot',
      rating: 5,
      projectType: 'CNC Machine Shifting',
      quote:
        'Moving four CNC machines inside a running plant is not easy. They planned the path, coordinated with our electrical team and completed the shift inside the shutdown window. That saved us a full day of production.',
    },
    {
      id: 't5',
      name: 'Vikram Malhotra',
      designation: 'Regional Contractor',
      company: 'Malhotra Road & Infrastructure',
      location: 'Dasuya',
      rating: 5,
      projectType: 'Material Handling & Recovery',
      quote:
        'At 2 AM a tipper went down near our site. One call and a Hydra was on the road within the hour, with barricades already being placed. They have become our default lifting partner across three running packages now.',
    },
    {
      id: 't6',
      name: 'Pankaj Mehra',
      designation: 'Electrical Contractor',
      company: 'Mehra Power Solutions',
      location: 'Kangra, Himachal Pradesh',
      rating: 5,
      projectType: 'Transformer Installation',
      quote:
        'Transformer placement in a tight substation compound needs experience. They set out the crane in a space I would not have thought possible. Clean job, on time, and the crew cleared the site before shift change.',
    },
  ],

  // faq
  faqs: [
    {
      id: 'f1',
      question: 'What crane capacities and types does KR Brothers operate?',
      answer:
        'Our fleet covers Hydra cranes, hydraulic mobile cranes, truck-mounted and rough-terrain cranes, typically ranging from 12 tonnes up to 100 tonnes. We also arrange higher-capacity or specialist equipment through our equipment network when a job demands it. The exact machine is always chosen after checking the load weight, working radius, boom length and ground conditions — because picking the wrong class of crane is what causes most lifting failures on site.',
    },
    {
      id: 'f2',
      question: 'Do you provide crane services in Mukerian, Hajipur and neighbouring districts?',
      answer:
        'Yes. We are based at Vill. Khizarpur (Hajipur), Teh. Mukerian in Distt. Hoshiarpur, which puts us right in the middle of the Mukerian–Hajipur–Hoshiarpur industrial belt. Our regular working area covers Mukerian, Hajipur, Hoshiarpur, Pathankot, Dasuya, Garhshankar, Sultanpur Lodhi, Phillaur and Jalandhar, and we regularly travel into Kangra and the Jammu corridor in Himachal Pradesh.',
    },
    {
      id: 'f3',
      question: 'How quickly can equipment be mobilised for emergency lifting or breakdown jobs?',
      answer:
        'For emergencies inside the Hoshiarpur and Mukerian belt we can usually have a Hydra or mobile crane rolling within 1 to 3 hours of your call, subject to machine availability and road conditions. For planned jobs we ask for at least 24 to 48 hours notice so we can run the site assessment and keep the scheduled slot for you. Night, Sunday and festival shifts are available because site breakdowns rarely happen at convenient hours.',
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
        return `Call us on ${primaryPhone}, send a WhatsApp message to ${whatsappNumber} with your load weight, site location and duration, or fill the Get a Quote form on this page. Share four things and we can usually quote back within the hour: the approximate load in tonnes, the working radius, the number of lifts or shifts needed, and the site location. If anything is not clear, our engineer will visit and assess the site before we finalise the rate.`
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
    title: 'KR Brothers Office — Parelian',
    subtitle: 'Parelian, Punjab, India · Plus Code XP2G+343',
    note:
      'The map marks our office in Parelian. Our crane workshop and operating yard remain at Khizarpur (Hajipur), Mukerian.',
  },

  /* equipment / fleet
   * Capacity classes only. These deliberately mirror the `capacity` strings
   * already published on each service page so the two can never disagree.
   * Specific tonnage, boom length and counterweight are confirmed against the
   * load chart for the individual job - never quote a machine blind.
   * -------------------------------------------------------------------- */
  equipment: {
    intro:
      'Our fleet is chosen for the work we actually do: hydra and truck-mounted machines for yard and shed work, rough-terrain and heavy mobile cranes for open sites and long reaches. Every machine is serviced on schedule with documented fitness and load-test records.',
    disclaimer:
      'Capacities below are class ranges, not a booking confirmation. Rated capacity falls with boom extension, radius and counterweight configuration, so the machine for your job is confirmed against its load chart after a site or load check.',
    machines: [
      {
        id: 'hydra-12-25',
        name: 'Hydra Cranes — 12 T to 25 T',
        icon: 'Construction',
        capacity: '12 T - 25 T class',
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
        capacity: 'Within the 12 T - 25 T working class',
        bestFor: 'Multi-stop jobs, highway and corridor work, sites we cannot stage a crawler on',
        notes: [
          'Mobilises between sites without a separate transport booking.',
          'Useful where site access is narrow and a large machine cannot be assembled on site.',
        ],
      },
      {
        id: 'rough-terrain',
        name: 'Rough-Terrain Cranes',
        icon: 'Route',
        capacity: '25 T class and above',
        bestFor: 'Uneven ground, mud, canal-side and green-field construction sites',
        notes: [
          'Wide stabiliser base and high ground clearance for unprepared ground.',
          'Set up on prepared pads where soft soil would rule out a truck-mounted machine.',
        ],
      },
      {
        id: 'heavy-mobile',
        name: 'Heavy Mobile Cranes — 25 T to 100 T Class',
        icon: 'Construction',
        capacity: '25 T - 100 T class',
        bestFor: 'Heavy structural steel, plant relocation, girder and column positioning, high-reach lifts',
        notes: [
          'The correct machine for girders, heavy columns and full plant or machinery moves.',
          'Always accompanied by a rigging plan and a briefed signal crew.',
        ],
      },
      {
        id: 'rigging-gear',
        name: 'Rigging Gear & Site Equipment',
        icon: 'Wrench',
        capacity: 'Matched to the load being lifted',
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
      'Our base sits close to the NH-44 / Mukerian corridor, so most of Punjab and the adjoining Himachal belt is within a short mobilisation. Areas below are grouped by realistic drive time from the yard.',
    groups: [
      {
        id: 'core',
        title: 'Core Area — same-day mobilisation',
        lead: 'Our home patch. These are the areas we reach fastest and can usually staff the same day.',
        areas: [
          'Mukerian',
          'Hajipur / Khizarpur',
          'Hoshiarpur',
          'Dasuya',
          'Garhshankar',
          'Mandi Adamgarh',
          'Shamirpur',
        ],
      },
      {
        id: 'nearby',
        title: 'Nearby Districts — a few hours out',
        lead: 'Regular work in these districts, planned around crew and machine availability.',
        areas: [
          'Pathankot',
          'Sultanpur Lodhi',
          'Phillaur',
          'Jalandhar',
          'Amritsar',
          'Kangra, Himachal Pradesh',
        ],
      },
      {
        id: 'extended',
        title: 'Extended Reach — call to confirm',
        lead: 'We travel for suitable jobs. Distance affects mobilisation cost and timing, so confirm before booking.',
        areas: [
          'Jammu & Kathua Corridor',
          'Ludhiana',
          'Amritsar Rural Belt',
          'Other Himachal Locations',
        ],
      },
    ],
    note:
      'Outside the areas above we still take on work depending on machine availability and mobilisation cost. A short phone call is usually faster than an enquiry form.',
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
    { label: 'Equipment & Fleet', href: '/equipment', description: 'Machine classes, capacities and how we select the right crane', icon: 'Wrench' },
    { label: 'Service Areas', href: '/service-areas', description: 'Where we work across Punjab and Himachal Pradesh', icon: 'MapPin' },
    { label: 'Contact & Enquiries', href: '/contact', description: 'Phone, WhatsApp, email, hours and our base location', icon: 'Phone' },
    { label: 'Terms & Conditions', href: '/terms', description: 'Bookings, capacity, site conditions and charges', icon: 'FileText' },
  ],

  // footer
  footer: {
    summary:
      'KR Brothers is a locally rooted lifting and material-handling contractor from Khizarpur (Hajipur), serving construction, infrastructure and industrial clients across Punjab and Himachal Pradesh with certified operators, a maintained fleet and round-the-clock support.',
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
    credits: 'Safe Lift Strong Support — Your Trust Our Service',
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
    title: 'KR Brothers | Crane Rental & Lifting Services Hoshiarpur',
    get description() {
      return `Crane rental, all lifting work, material handling and machinery shifting in Mukerian, Hajipur, Hoshiarpur & Pathankot. Call ${BUSINESS_CONFIG.contacts.primaryPhone}.`
    },
    keywords:
      'crane rental Mukerian, crane hire Hoshiarpur, hydra crane Punjab, lifting contractor, material handling services, mobile crane hire Pathankot, machinery shifting, KR Brothers',
  },
}

export default BUSINESS_CONFIG