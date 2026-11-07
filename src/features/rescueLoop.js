import { readEntries, replaceEntries, saveEntry, STORAGE_KEYS, isAvailableDonation } from '../hooks/useStorage.js'

export const JOURNEY = ['Food Listed', 'NGO Interest Received', 'Pickup Coordinated', 'Distribution Completed']
export const DEMO_KEY = STORAGE_KEYS.demoDonations
const DEMO_ID = 'demo-rescue-loop-001'
export const NGO_PROFILES = [
  { id: 'n1', name: 'Annapurna Community Kitchen', area: 'East Bengaluru', accepts: ['Cooked meals', 'Bakery items', 'Fresh produce'], capacity: 80 },
  { id: 'n2', name: 'Seva Sahayog Trust', area: 'South-East Bengaluru', accepts: ['Cooked meals', 'Dairy', 'Packaged food'], capacity: 60 },
  { id: 'n3', name: 'Roti Bank Collective', area: 'South Bengaluru', accepts: ['Bakery items', 'Fresh produce', 'Packaged food'], capacity: 40 },
  { id: 'n4', name: 'Hasiru Meals Foundation', area: 'Whitefield and ITPL', accepts: ['Cooked meals', 'Bakery items', 'Packaged food'], capacity: 120 },
  { id: 'n5', name: 'Little Hands Learning Centre', area: 'North Bengaluru', accepts: ['Fresh produce', 'Bakery items', 'Packaged food'], capacity: 35 },
  { id: 'n6', name: 'Nanna Mane Elder Care', area: 'North Bengaluru', accepts: ['Cooked meals', 'Fresh produce', 'Dairy'], capacity: 30 }
]
export const COMMUNITY_NEEDS = [
  { id: 'need-east-1', ngoId: 'n1', location: 'Indiranagar, Bengaluru', category: 'Cooked meals', required: 30, capacity: 30, window: 'Before 7:00 pm', priority: 'High', requirements: 'Vegetarian, hot-held or clearly documented storage.' },
  { id: 'need-east-2', ngoId: 'n2', location: 'Indiranagar, Bengaluru', category: 'Cooked meals', required: 40, capacity: 40, window: 'Before 8:00 pm', priority: 'High', requirements: 'Sealed portions preferred; storage details required.' },
  { id: 'need-east-3', ngoId: 'n4', location: 'Indiranagar, Bengaluru', category: 'Cooked meals', required: 50, capacity: 50, window: 'Before 6:30 pm', priority: 'Medium', requirements: 'Event or restaurant surplus with handling confirmation.' },
  { id: 'need-north-1', ngoId: 'n6', location: 'Hebbal, Bengaluru', category: 'Fresh produce', required: 25, capacity: 25, window: 'Daytime collection', priority: 'Medium', requirements: 'Produce must be visibly fresh and unserved.' }
]
const areaFor = (location = '') => /indiranagar|east/i.test(location) ? 'East Bengaluru' : /koramangala/i.test(location) ? 'South-East Bengaluru' : /jayanagar|south/i.test(location) ? 'South Bengaluru' : /whitefield|itpl/i.test(location) ? 'Whitefield and ITPL' : /malleshwaram|hebbal|north/i.test(location) ? 'North Bengaluru' : ''
export function matchDonation(donation) {
  if (!isAvailableDonation(donation) || !donation.storageCondition) return { review: true, results: [], message: 'This listing needs a future deadline and storage condition before it can be assessed.' }
  const area = areaFor(donation.location); const servings = Number(donation.servings || 0)
  const results = NGO_PROFILES.filter((ngo) => ngo.accepts.includes(donation.category) && ngo.capacity >= servings && area && ngo.area === area).map((ngo) => {
    const score = 45 + 30 + 15 + (donation.storageCondition !== 'Unknown' ? 10 : 0)
    return { ...ngo, score, explanation: `Recommended because it serves ${area}, accepts ${donation.category.toLowerCase()}, and has demonstration capacity for ${servings || 'this'} servings.` }
  }).sort((a, b) => b.score - a.score)
  return { review: false, results, message: results.length ? '' : area ? 'No sample organisation meets all essential category, area, and capacity requirements.' : 'The location does not map to a sample service area; manual review is required.' }
}
export function findNeeds({ category = '', location = '', servings = 0 } = {}) {
  const area = areaFor(location)
  return COMMUNITY_NEEDS.filter((need) => (!category || need.category === category) && (!location || areaFor(need.location) === area) && (!servings || need.capacity >= Math.min(Number(servings), need.capacity)))
}
export function smartSplit(donation, needs = COMMUNITY_NEEDS) {
  if (!isAvailableDonation(donation)) return { allocations: [], unallocated: Number(donation?.servings || 0), reason: 'A future collection deadline, category, quantity, and location are required before allocation.' }
  const area = areaFor(donation.location); const remainingStart = Number(donation.servings || 0)
  if (!area || !remainingStart) return { allocations: [], unallocated: remainingStart, reason: 'This listing needs a supported service area and estimated servings for allocation.' }
  let remaining = remainingStart
  const priority = { High: 3, Medium: 2, Low: 1 }
  const allocations = needs.filter((n) => n.category === donation.category && areaFor(n.location) === area).sort((a, b) => (priority[b.priority] || 0) - (priority[a.priority] || 0)).map((need) => {
    const servings = Math.min(remaining, need.capacity, need.required); remaining -= servings
    return servings ? { ...need, servings, reason: `${need.priority} need; compatible category and supported service area.` } : null
  }).filter(Boolean)
  return { allocations, unallocated: remaining, reason: allocations.length ? '' : 'No compatible community need is available. Review area, category, collection window, or volunteer assistance—never extend the donor deadline.' }
}
export function allocationMap(allocations = []) { return Object.fromEntries(allocations.map((a) => [a.id, Number(a.servings) || 0])) }
export function validateAllocations(donation, allocations, needs = COMMUNITY_NEEDS) {
  if (!isAvailableDonation(donation)) return { valid: false, error: 'Expired or incomplete donations cannot be allocated.' }
  const eligible = smartSplit(donation, needs).allocations
  const byId = allocationMap(allocations); const total = Number(donation.servings || 0)
  let used = 0
  for (const [id, value] of Object.entries(byId)) { const need = eligible.find((n) => n.id === id); if (!need) return { valid: false, error: 'This organisation is not eligible for this donation.' }; if (!Number.isInteger(value) || value < 0) return { valid: false, error: 'Allocations must be whole, non-negative servings.' }; if (value > need.capacity) return { valid: false, error: `Allocation exceeds ${need.id}'s capacity of ${need.capacity} servings.` }; used += value }
  if (used > total) return { valid: false, error: `Allocated servings (${used}) exceed the donation total (${total}).` }
  return { valid: true, allocations: eligible.map((need) => ({ ...need, servings: byId[need.id] || 0 })).filter((a) => a.servings), allocated: used, unallocated: total - used }
}
export function impactStory(donation, allocations = donation?.proposedAllocations || []) { const check = validateAllocations(donation, allocations); const breakdown = check.valid ? check.allocations.map((a) => `${a.servings} servings for ${a.id}`).join(', ') || 'no proposed allocation' : 'allocation requires review'; return `FoodBridge Rescue Impact Story\nReference: FB-${donation.id.slice(-8).toUpperCase()}\nPotential rescue: ${donation.servings || 0} ${donation.category || 'food'} servings.\nProposed allocation: ${breakdown}.\nUnallocated: ${check.valid ? check.unallocated : '—'} servings.\nJourney status: ${statusFor(donation)}.\nSimulation notice: This is a browser-local prototype plan, not proof of NGO acceptance, collection, delivery, or real-world impact.` }
export function rescueClock(donation, now = Date.now()) { const ms = Date.parse(donation?.deadline) - now; if (!Number.isFinite(ms) || ms <= 0) return { label: 'Deadline Passed', ms: 0 }; if (ms < 2 * 3600000) return { label: 'Collection Approaching', ms }; return { label: statusFor(donation) === 'Food Listed' ? 'Matching Required' : 'Recently Listed', ms } }
export const allDonations = () => [...readEntries(STORAGE_KEYS.donations).filter(isAvailableDonation), ...readEntries(DEMO_KEY).filter(isAvailableDonation)]
export const statusFor = (donation) => donation.status || 'Food Listed'
export function updateDonation(id, updater) {
  for (const key of [STORAGE_KEYS.donations, DEMO_KEY]) { const records = readEntries(key); const index = records.findIndex((d) => d.id === id); if (index >= 0) { const next = [...records]; next[index] = updater(next[index]); replaceEntries(key, next); window.dispatchEvent(new Event('foodbridge:updated')); return next[index] } } throw new Error('Donation not found')
}
export function recordInterest(donation, ngo) {
  const exists = readEntries(STORAGE_KEYS.interests).some((x) => x.donationId === donation.id && x.ngoId === ngo.id)
  if (exists) throw new Error('Interest already recorded for this donation.')
  saveEntry(STORAGE_KEYS.interests, { donationId: donation.id, ngoId: ngo.id, ngoName: ngo.name, simulated: true })
  return updateDonation(donation.id, (d) => ({ ...d, status: 'NGO Interest Received', selectedNgo: ngo.id, journeyEvents: [...(d.journeyEvents || []), { status: 'NGO Interest Received', at: new Date().toISOString(), simulated: true }] }))
}
export function progressJourney(donation) {
  const index = JOURNEY.indexOf(statusFor(donation)); if (index < 0 || index >= JOURNEY.length - 1) throw new Error('This demonstration journey cannot advance further.')
  const status = JOURNEY[index + 1]; if (status === 'NGO Interest Received' && !donation.selectedNgo) throw new Error('Select an eligible sample NGO before recording interest.')
  return updateDonation(donation.id, (d) => ({ ...d, status, journeyEvents: [...(d.journeyEvents || []), { status, at: new Date().toISOString(), simulated: true }] }))
}
export function seedDemo() {
  const current = readEntries(DEMO_KEY).find((d) => d.id === DEMO_ID); if (current) return current
  const now = new Date(); const prepared = new Date(now.getTime() - 30 * 60000); const deadline = new Date(now.getTime() + 4 * 3600000)
  const demo = { id: DEMO_ID, demo: true, savedAt: now.toISOString(), name: 'Demo Restaurant', type: 'Restaurant', category: 'Cooked meals', quantity: '100 prepared vegetarian meals', description: 'Illustrative prepared vegetarian meal donation.', servings: '100', location: 'Indiranagar, Bengaluru', prepared: prepared.toISOString().slice(0, 16), deadline: deadline.toISOString().slice(0, 16), storageCondition: 'Hot-held', storageTemperature: '63', handlingConfirmed: true, status: 'Food Listed', journeyEvents: [{ status: 'Food Listed', at: now.toISOString(), simulated: true }] }
  saveEntry(DEMO_KEY, demo); return demo
}
export function impact(donations = allDonations()) { const interests = readEntries(STORAGE_KEYS.interests); return { listed: donations.length, servings: donations.reduce((n, d) => n + (Number(d.servings) || 0), 0), available: donations.filter(isAvailableDonation).filter((d) => statusFor(d) === 'Food Listed').length, interests: interests.length, completed: donations.filter((d) => d.demo && statusFor(d) === 'Distribution Completed').length } }
