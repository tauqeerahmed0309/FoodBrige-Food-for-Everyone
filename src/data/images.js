const local = (file, alt) => ({ src: `/images/${file}`, alt })

export const IMG = {
  // Hero section
  hero: local(
    'hero-surplus-produce.jpg',
    'Fresh surplus vegetables neatly sorted in wooden crates and biodegradable trays at a Bangalore intake station'
  ),
  heroSmall: local(
    'hero-thermal-handover.jpg',
    'Stainless steel thermal insulated carriers and tiffin containers prepared with temperature logs in a commercial kitchen'
  ),

  // Problem section
  problem: local(
    'problem-surplus-kitchen.jpg',
    'Freshly prepared surplus vegetable pulao, dal, and rotis in stainless steel warming pans awaiting evening rescue before closing'
  ),

  // How It Works chapters (Distinct operational phases)
  kitchen: local(
    'how-kitchen-logging.jpg',
    'Chef in a commercial restaurant kitchen carefully portioning wholesome surplus into clean food-grade delivery containers'
  ),
  connect: local(
    'how-pantry-dispatch.jpg',
    'Pantry coordinator and volunteer inspecting delivery crates of fresh produce and meal trays at a community food hub'
  ),
  deliver: local(
    'how-shelter-delivery.jpg',
    'Civic volunteers carefully transferring insulated thermal food containers into a Bangalore community shelter entrance'
  ),

  // Stories (Unique, dedicated editorial portraits for each contributor)
  storyMeera: local(
    'story-meera-chef.jpg',
    'Meera, café owner, standing in her Bangalore kitchen in an apron beside stainless steel cookware'
  ),
  storyArjun: local(
    'story-arjun-coordinator.jpg',
    'Arjun, community kitchen coordinator, in a bright Bangalore dining hall with stainless steel tables'
  ),
  storyPriya: local(
    'story-priya-volunteer.jpg',
    'Priya, volunteer courier, beside her scooter equipped with an unbranded insulated food delivery pack'
  ),

  // Community solidarity & legacy fallbacks
  volunteers: local(
    'story-priya-volunteer.jpg',
    'Civic volunteer courier ready for evening food rescue distribution in Bengaluru'
  ),
  cta: local(
    'cta-community-solidarity.jpg',
    'Community members sharing a warm, freshly served meal on traditional stainless steel thali plates'
  )
}

export const NGOS = [
  {
    id: 'n1',
    name: 'Annapurna Community Kitchen',
    location: 'Indiranagar, Bengaluru',
    area: 'East Bengaluru',
    focus: 'Daily community meals',
    desc: 'Serves hot lunches to daily-wage workers and students. Accepts cooked food before 6 pm.',
    year: '2014',
    phone: '+91 80 2521 8890',
    street: '42, 100 Feet Road, Indiranagar, Bengaluru 560038',
    transit: [
      'Metro Indiranagar (Purple Line), then 4 min walk',
      'BMTC Bus Stop 100ft Rd (Lines 138, 201), 2 min walk',
      'Vehicle dock access for thermal food vans'
    ]
  },
  {
    id: 'n2',
    name: 'Seva Sahayog Trust',
    location: 'Koramangala, Bengaluru',
    area: 'South-East Bengaluru',
    focus: 'Shelter meals',
    desc: 'Runs meal programmes for night shelters and has its own refrigerated van for pickups.',
    year: '2018',
    phone: '+91 80 4112 5530',
    street: '15, 80 Feet Road, 4th Block Koramangala, Bengaluru 560034',
    transit: [
      'Bus Koramangala Sony World (Lines 342, G4), 3 min walk',
      'Refrigerated van depot with ramp loading',
      'Metro Trinity Station + feeder bus'
    ]
  },
  {
    id: 'n3',
    name: 'Roti Bank Collective',
    location: 'Jayanagar, Bengaluru',
    area: 'South Bengaluru',
    focus: 'Volunteer-led distribution',
    desc: 'A volunteer network that redistributes packaged and fresh food to nearby settlements.',
    year: '2019',
    phone: '+91 80 2663 1240',
    street: '88, 9th Main Road, 4th Block Jayanagar, Bengaluru 560011',
    transit: [
      'Metro Jayanagar (Green Line), 6 min walk',
      'BMTC Bus Terminus 4th Block, 4 min walk',
      'Scooter courier designated drop-off lane'
    ]
  },
  {
    id: 'n4',
    name: 'Hasiru Meals Foundation',
    location: 'Whitefield, Bengaluru',
    area: 'Whitefield and ITPL',
    focus: 'Event surplus',
    desc: 'Specialises in collecting surplus from weddings, conferences and corporate events.',
    year: '2021',
    phone: '+91 80 6720 9940',
    street: '204, ITPL Main Road, Whitefield, Bengaluru 560066',
    transit: [
      'Metro Kadugodi Tree Park (Purple Line), 5 min walk',
      'Direct highway corridor access for catering trucks',
      'Bulk temperature verification station on site'
    ]
  },
  {
    id: 'n5',
    name: 'Little Hands Learning Centre',
    location: 'Malleshwaram, Bengaluru',
    area: 'North Bengaluru',
    focus: 'Children’s nutrition',
    desc: 'Provides snacks and meals to children attending after-school learning programmes.',
    year: '2016',
    phone: '+91 80 2334 7710',
    street: '12, 8th Cross Road, Margosa Road, Malleshwaram, Bengaluru 560003',
    transit: [
      'Metro Sampige Road (Green Line), 7 min walk',
      'Bus 8th Cross Malleshwaram, 2 min walk',
      'Clean pantry receiving counter with cold storage'
    ]
  },
  {
    id: 'n6',
    name: 'Nanna Mane Elder Care',
    location: 'Hebbal, Bengaluru',
    area: 'North Bengaluru',
    focus: 'Elder care meals',
    desc: 'Prepares soft, easily digested meals for senior residents and accepts fresh produce.',
    year: '2020',
    phone: '+91 80 2362 4400',
    street: '56, Outer Ring Road, Near Hebbal Flyover, Bengaluru 560024',
    transit: [
      'Hebbal Bus Junction (Airport routes, 500D), 5 min walk',
      'Dedicated sanitized entrance for dietary donations',
      'Fresh produce inspection station'
    ]
  }
]

export const STORIES = [
  {
    role: 'Restaurant owner',
    name: 'Meera, owner of a 40-seat café',
    quote:
      'We always over-prepare on weekends. Before, the extra rice and dal went in the bin at closing. Now I list it by 8 pm and an NGO picks it up while it is still safe. It feels like the kitchen finally closes the loop.',
    img: 'storyMeera'
  },
  {
    role: 'NGO coordinator',
    name: 'Arjun, kitchen coordinator',
    quote:
      'The difficult part has never been willingness, it is timing. When a donor tells me exactly what is available and until when, I can decide in minutes whether our volunteers can reach it safely.',
    img: 'storyArjun'
  },
  {
    role: 'Volunteer',
    name: 'Priya, weekend volunteer',
    quote:
      'I have two free hours on Saturdays and a scooter. Knowing the pickup address, the safe-to-eat deadline and who is waiting at the other end makes those two hours count.',
    img: 'storyPriya'
  }
]
