const local = (file, alt) => ({ src: `/images/${file}`, alt })
export const IMG = {
  hero: local('hero-vegetables.jpg', 'Fresh vegetables at a market stall'), heroSmall: local('hero-soup.jpg', 'A bowl of soup ready to serve'), problem: local('meal.jpg', 'A plated meal on a table'), kitchen: local('kitchen.jpg', 'Chefs working in a restaurant kitchen'), connect: local('plated-food.jpg', 'A carefully plated dish'), deliver: local('packing.jpg', 'Food being packed for distribution'), volunteers: local('volunteers.jpg', 'Volunteers sharing food with a community'), cta: local('shared-meal.jpg', 'People sharing a meal around a table')
}
export const NGOS = [
  { id: 'n1', name: 'Annapurna Community Kitchen', location: 'Indiranagar, Bengaluru', area: 'East Bengaluru', focus: 'Daily community meals', desc: 'Serves hot lunches to daily-wage workers and students. Accepts cooked food before 6 pm.' },
  { id: 'n2', name: 'Seva Sahayog Trust', location: 'Koramangala, Bengaluru', area: 'South-East Bengaluru', focus: 'Shelter meals', desc: 'Runs meal programmes for night shelters and has its own refrigerated van for pickups.' },
  { id: 'n3', name: 'Roti Bank Collective', location: 'Jayanagar, Bengaluru', area: 'South Bengaluru', focus: 'Volunteer-led distribution', desc: 'A volunteer network that redistributes packaged and fresh food to nearby settlements.' },
  { id: 'n4', name: 'Hasiru Meals Foundation', location: 'Whitefield, Bengaluru', area: 'Whitefield and ITPL', focus: 'Event surplus', desc: 'Specialises in collecting surplus from weddings, conferences and corporate events.' },
  { id: 'n5', name: 'Little Hands Learning Centre', location: 'Malleshwaram, Bengaluru', area: 'North Bengaluru', focus: 'Children’s nutrition', desc: 'Provides snacks and meals to children attending after-school learning programmes.' },
  { id: 'n6', name: 'Nanna Mane Elder Care', location: 'Hebbal, Bengaluru', area: 'North Bengaluru', focus: 'Elder care meals', desc: 'Prepares soft, easily digested meals for senior residents and accepts fresh produce.' }
]
export const STORIES = [
  { role: 'Restaurant owner', name: 'Meera, owner of a 40-seat café', quote: 'We always over-prepare on weekends. Before, the extra rice and dal went in the bin at closing. Now I list it by 8 pm and an NGO picks it up while it is still safe. It feels like the kitchen finally closes the loop.', img: 'kitchen' },
  { role: 'NGO coordinator', name: 'Arjun, kitchen coordinator', quote: 'The difficult part has never been willingness, it is timing. When a donor tells me exactly what is available and until when, I can decide in minutes whether our volunteers can reach it safely.', img: 'connect' },
  { role: 'Volunteer', name: 'Priya, weekend volunteer', quote: 'I have two free hours on Saturdays and a scooter. Knowing the pickup address, the safe-to-eat deadline and who is waiting at the other end makes those two hours count.', img: 'volunteers' }
]
