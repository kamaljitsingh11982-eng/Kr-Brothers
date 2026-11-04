/**
 * Per-service page copy: search-facing metadata and the FAQ block used by
 * /services/:slug. Kept out of businessConfig.js because this is marketing
 * page content, not operational configuration. Every key here must match a
 * service `id` in businessConfig.js — buildServicePages() and ServicePage
 * both fail loudly if one goes missing.
 *
 * metaTitle is kept near 50-60 characters and metaDescription near 155 so
 * neither gets truncated in search results.
 */

const SERVICE_PAGES = {
  'crane-rental-fleet-hire': {
    metaTitle: 'Crane on Rent & Hire in Mukerian | KR Brothers',
    metaDescription:
      'Crane hire and mobile crane on rent across Mukerian and nearby areas. Ask KR Brothers about rental charges, hours and site distance.',
    keywords: [
      'crane rental Mukerian',
      'crane hire Punjab',
      'mobile crane rental Punjab',
      'monthly crane hire',
      'crane rental with operator',
      'hydra machine kiraye par',
      'crane ka rate per hour',
      'crane kiraye par Mukerian',
    ],
    faq: [
      {
        question: 'What is the minimum hire duration for a crane?',
        answer: 'There is no hard minimum. Single-hour jobs are common for maintenance and yard work, while construction and erection projects are usually booked per shift or per day. Monthly rates apply when a machine stays on one site continuously.',
      },
      {
        question: 'Is the operator and rigging crew included in the hire rate?',
        answer: 'Yes. Every hire is supplied as a complete package: the machine, a certified operator and a rigger. You are not asked to arrange the crew separately, and the rigging plan is agreed before mobilisation.',
      },
      {
        question: 'Can you deploy more than one machine to a single site?',
        answer: 'Yes. Large lifting campaigns and factory moves often need parallel machines. Tell us the number of lifts and the programme, and we will plan the fleet deployment and crew accordingly.',
      },
      {
        question: 'Which areas do you deliver machines to?',
        answer: 'Our confirmed main service locations are Dasuya, Mukerian, Talwara, Hajipur and Garhdiwala, with nearby village enquiries for Khizarpur, Bhunga, Mansoorpur, Khanpur, Attalgarh and Aima Mangat. Share the exact site pin to confirm machine, crew and mobilisation availability.',
      },
      {
        question: 'How are crane rental charges and the crane per hour rate assessed?',
        answer: 'Crane rental charges depend on the machine, working hours and site distance. Share the load and location by phone or WhatsApp to discuss a job-specific quotation.',
      },
    ],
  },

  'hydra-crane-services': {
    metaTitle: 'Hydra Crane on Rent in Mukerian | KR Brothers',
    metaDescription:
      'Hydra crane on rent for yard work and truck loading. Ask about fleet suitability, hours and distance; call KR Brothers to discuss your lift.',
    keywords: [
      'hydra crane Dasuya',
      'hydra crane hire Mukerian',
      'hydra crane for loading',
      'yard material handling',
      'hydra crane Punjab',
      'hydra machine kiraye par',
      'hydra ka rate per hour',
      'hydra wale ka number',
    ],
    faq: [
      {
        question: 'When is a Hydra crane better than a truck-mounted crane?',
        answer: 'A Hydra gives more reach with a shorter wheelbase, so it works in congested yards and narrow lanes where a truck-mounted crane cannot position or manoeuvre. If the site is tight, a Hydra is usually the faster and cheaper option.',
      },
      {
        question: 'What load capacity does a Hydra crane handle?',
        answer: 'Our Hydra fleet is within the 0 T to 16 T class. The exact capacity for your job depends on the boom extension used and the working radius, so send us the load weight and reach for a firm answer.',
      },
      {
        question: 'How can I enquire about an ACE Hydra 16XW?',
        answer: 'Share the load, site access and schedule so the team can discuss suitability and availability.',
      },
      {
        question: 'Can you work inside a running factory shed?',
        answer: 'Yes. Confined-space lifting inside factory sheds is routine work for us. We survey the path and set outriggers on firm, level ground with proper mats, and station a banksman for every movement cycle.',
      },
      {
        question: 'Do you handle truck and trailer loading at site?',
        answer: 'Yes. Truck and trailer loading, unloading and re-stacking at site are core Hydra jobs, including transfers between warehouse and worksite and long-reach work over compound walls.',
      },
      {
        question: 'What is the hydra crane per hour rate for truck loading?',
        answer: 'The rate depends on the machine, working hours and site distance. Share the load and location by phone or WhatsApp to discuss availability and a job-specific quotation.',
      },
    ],
  },

  'heavy-duty-mobile-cranes': {
    metaTitle: 'Mobile Crane Services in Punjab | KR Brothers',
    metaDescription:
      'Mobile crane services for lifts within the 0–16 T fleet class. Share the load, radius and site details for a crane enquiry up to 16 tons.',
    keywords: [
      'mobile crane services Punjab',
      'hydraulic truck crane hire',
      '16 ton crane rental',
      'machinery lifting crane',
      'crane kiraye par Mukerian',
      'crane ka rate per hour',
      'industrial lifting crane Punjab',
    ],
    faq: [
      {
        question: 'Which capacity do I need for my lift?',
        answer: 'Our fleet is within the 0–16 T class. Safe capacity depends on load weight and working radius, not weight alone. A 16 T machine may only lift a fraction of that at full outreach. Share the load weight and the radius from your crane spot to the load so we can check suitability against the selected machine’s load chart.',
      },
      {
        question: 'Is a pre-lift plan included?',
        answer: 'Yes. We review the lift with your site engineer before mobilising: ground bearing pressure, outrigger matting, counterweight configuration for the planned radius, and slew and wind limits.',
      },
      {
        question: 'What ground preparation do you need at my site?',
        answer: 'Level, compacted ground that can take the outrigger load. We check ground bearing pressure ourselves and bring mats where the surface is soft. If the access road or the standing area cannot take the machine, we will tell you before the shift, not on arrival.',
      },
      {
        question: 'How do you assess difficult site access?',
        answer: 'We review the approach route, standing area, ground conditions and selected crane load chart before confirming whether the machine suits the job.',
      },
      {
        question: 'What information is needed for a crane enquiry up to 16 tons?',
        answer: 'Share the load weight, working radius, required height and ground conditions. The machine and configuration are reviewed against the load chart before confirming suitability.',
      },
    ],
  },

  'construction-site-lifting-erection': {
    metaTitle: 'Construction Site Crane Hire Enquiries | KR Brothers',
    metaDescription:
      'Construction site crane hire for steel erection and precast slab lifting. Share your site details to discuss availability and mobilisation.',
    keywords: [
      'construction site lifting',
      'steel erection crew Punjab',
      'precast slab lifting',
      'site lifting contractor',
      'night shift erection',
      'crane kiraye par Mukerian',
      'machine shifting crane',
      'crane wale ka number',
    ],
    faq: [
      {
        question: 'Do you work to our lifting schedule?',
        answer: 'Yes. We plan the lift sequence with your site contractor rather than working through a list. Programme-driven sites are our normal case, so we align machine, crew and element delivery with your build schedule.',
      },
      {
        question: 'Do you prepare a method statement before starting?',
        answer: 'Every site starts with a site-specific method statement covering the lift plan, rigging, exclusion zones and emergency arrangements. A daily toolbox talk is then held with the crew for the duration of the work.',
      },
      {
        question: 'Can you handle night-shift erection?',
        answer: 'Yes. Multi-level and night-shift erection programs are supported, with full LED flood lighting for night work and marshals on the site.',
      },
      {
        question: 'Will your crew keep other site workers clear?',
        answer: 'Yes. Unauthorised personnel are kept out of the lifting zone for the duration of each lift, barricades are enforced, and certified tag lines and guides are used on every element lift.',
      },
      {
        question: 'Can you plan a steel erection crane or precast slab lifting crane job?',
        answer: 'Share the element details, lift sequence and site access so the team can discuss the equipment, crew and schedule for the work.',
      },
    ],
  },

  'plant-relocation-loading-unloading': {
    metaTitle: 'Plant Relocation & Loading Crane | KR Brothers',
    metaDescription:
      'Plant relocation crane support, loading unloading crane work and truck unloading crane enquiries. Share the route, load and site access.',
    keywords: [
      'plant equipment relocation',
      'in-plant machinery shifting',
      'truck unloading at site',
      'factory equipment moving',
      'plant layout contractor',
      'machine shifting crane',
      'crane kiraye par Mukerian',
      'crane ka rate per hour',
    ],
    faq: [
      {
        question: 'Can you move equipment without stopping production?',
        answer: 'It depends on the route and your process. We plan the move around your shut-down window so the line restarts on schedule, and we survey the internal path before mobilising the crane to the spot. Early planning is what avoids production loss.',
      },
      {
        question: 'How do you avoid damaging existing plant services?',
        answer: 'Utilities, cable trays and pipe lines are verified and marked before any move, and permit-to-work and lock-out are coordinated with your plant safety team. Spotters are stationed at blind corners inside the shop.',
      },
      {
        question: 'Do you handle positioning and alignment on foundations?',
        answer: 'Yes. We set equipment on the foundation and align it. Grouting, anchor-bolt alignment and levelling support are part of the scope so the machine is ready for commissioning when we leave.',
      },
      {
        question: 'What kinds of machines can you relocate?',
        answer: 'Presses, furnaces, CNC machines, transformers and rolling-mill equipment can be assessed against the selected machine’s load chart. Send us the machine weight, centre of gravity and lifting points so we can discuss suitability.',
      },
      {
        question: 'Can a loading unloading crane support truck unloading at my site?',
        answer: 'Truck unloading is a listed service. Share the load, access route and site details to discuss the suitable machine and schedule.',
      },
    ],
  },

  'structural-steel-girder-positioning': {
    metaTitle: 'Girder Lifting Crane Hire Enquiries | KR Brothers',
    metaDescription:
      'Girder lifting crane support for roof truss erection and bridge girder positioning. Share the member weight, radius and site access.',
    keywords: [
      'structural steel erection',
      'girder positioning',
      'bridge girder lifting',
      'roof truss erection',
      'steel erection Punjab',
      'bhari saman uthane wali crane',
      'crane kiraye par Mukerian',
      'crane wale ka number',
    ],
    faq: [
      {
        question: 'How do you ensure girders land exactly in position?',
        answer: 'Every member is handled with tag lines and guides from certified riggers, using an engineered sling arrangement agreed before the lift. Loads are re-hung only after the slinger has re-checked the rigging, so nothing is placed on guesswork.',
      },
      {
        question: 'Do you work on bridge and highway projects?',
        answer: 'Yes. Bridge girders and deck segment placement is a regular part of our structural steel work. We coordinate with the site contractor on segment delivery and place members to the drawing.',
      },
      {
        question: 'Will you lift over occupied areas?',
        answer: 'No. Lifting over occupied zones is not permitted. Barricades are enforced and exclusion zones are maintained around every lift, so work continues around your people without risk.',
      },
      {
        question: 'What member weight can you handle?',
        answer: 'We handle girders and structural members within our 0 to 16 T crane range.',
      },
      {
        question: 'What details help plan a roof truss erection crane or bridge girder crane lift?',
        answer: 'Share the member weight, lifting radius, height and site access so the team can discuss the lift plan and suitable equipment.',
      },
    ],
  },

  'factory-machinery-shifting': {
    metaTitle: 'Factory Machinery Shifting Crane | KR Brothers',
    metaDescription:
      'Factory machinery shifting crane support for machinery and transformer moves. Share lifting points, route and site access to plan.',
    keywords: [
      'factory machinery shifting',
      'CNC machine moving',
      'transformer loading',
      'foundation loading crane',
      'industrial equipment handling',
      'machine shifting crane',
      'hydra machine kiraye par',
      'crane kiraye par Mukerian',
    ],
    faq: [
      {
        question: 'How do you avoid damaging sensitive machine surfaces?',
        answer: 'We verify the machine centre of gravity and lifting points first, and never lift from non-rated points. Base plates and precision surfaces are protected during transit, so a machine arrives without shimming damage or lost accuracy.',
      },
      {
        question: 'Do you align machines on their foundations?',
        answer: 'Yes. Foundation pit preparation, grouting, anchor-bolt alignment and precision levelling are all in scope. Electrical isolation is confirmed before any internal move, and the machine is handed over ready for commissioning.',
      },
      {
        question: 'Can you move machines within the same plant?',
        answer: 'Yes. Shop-to-shop and machine-to-machine shifting inside one plant is routine. We survey the internal route and plan around your production schedule and shut-down window.',
      },
      {
        question: 'Do you handle transformers?',
        answer: 'Yes. Transformer loading, unloading and yard placement are handled with the lifting points and capacity appropriate to the unit. Oil-filled units are moved with the client’s electrical isolation in place.',
      },
      {
        question: 'What information is needed for a machinery shifting crane or transformer shifting crane?',
        answer: 'Share the machine weight, lifting points, route and site access so the team can discuss the shift and suitable equipment.',
      },
    ],
  },

  'breakdown-emergency-support': {
    metaTitle: '24x7 Emergency Crane Service in Punjab | KR Brothers',
    metaDescription:
      'Breakdown crane service and truck recovery crane support in Punjab. Ask about 24x7 crane service or emergency crane service by phone.',
    keywords: [
      'emergency crane recovery',
      'crane breakdown service',
      'stuck lorry recovery Punjab',
      '24 hour crane hire',
      'hydraulic failure recovery',
      'hydra wale ka number',
      'crane wale ka number',
      'machine shifting crane',
    ],
    faq: [
      {
        question: 'How fast can you reach a breakdown call?',
        answer: 'Call the operations desk and we mobilise. Response time depends on your location and machine class, and we will tell you honestly what is achievable rather than promise something the road conditions will not allow.',
      },
      {
        question: 'How do I request a breakdown crane service or emergency crane service?',
        answer: 'Call or WhatsApp with your location and machine details. Availability and response depend on the location, machine and road conditions.',
      },
      {
        question: 'Can you recover an overturned or stuck lorry?',
        answer: 'Yes. Overturned and stuck lorry and tipper recovery is regular work. We coordinate with the site authorities and highway patrol where the recovery is on the road, and we bring barricades and marshals.',
      },
      {
        question: 'Do you handle crane breakdowns?',
        answer: 'Yes. We assist with crane breakdowns and hook-block recovery, and supply workshop-to-site machine hire when a machine cannot be moved under its own power.',
      },
      {
        question: 'Are night and festival shifts available?',
        answer: 'Yes. Night, Sunday and festival-shift deployments are routine because industrial sites and breakdown call-outs do not keep office hours. Night road lifting is done with full LED flood and warning lighting.',
      },
    ],
  },
}

export default SERVICE_PAGES