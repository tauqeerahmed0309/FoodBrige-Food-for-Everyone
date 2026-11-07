export const STORAGE_KEYS = Object.freeze({ donations: 'foodbridge_donations', volunteers: 'foodbridge_volunteers', partners: 'foodbridge_partners', interests: 'foodbridge_interests', demoDonations: 'foodbridge_demo_donations' })
const LEGACY_KEYS = Object.freeze({ donations: 'shareplate_donations', volunteers: 'shareplate_volunteers', partners: 'shareplate_partners', interests: 'shareplate_interests', demoDonations: 'shareplate_demo_donations' })
const MIGRATION_KEY = 'foodbridge_storage_migration_v1'
const ownKeys = new Set(Object.values(STORAGE_KEYS))
const asList = (value) => { try { const parsed = JSON.parse(value || '[]'); return Array.isArray(parsed) ? parsed : [] } catch { return [] } }
const unique = (entries) => entries.filter((entry, index, list) => list.findIndex((candidate) => entry?.id ? candidate?.id === entry.id : JSON.stringify(candidate) === JSON.stringify(entry)) === index)
function migrate(storage) {
  if (storage.getItem(MIGRATION_KEY)) return
  Object.keys(STORAGE_KEYS).forEach((name) => {
    const legacy = asList(storage.getItem(LEGACY_KEYS[name])); const current = asList(storage.getItem(STORAGE_KEYS[name]))
    if (legacy.length) storage.setItem(STORAGE_KEYS[name], JSON.stringify(unique([...current, ...legacy])))
  })
  storage.setItem(MIGRATION_KEY, '1')
}
const storage = () => { if (typeof window === 'undefined' || !window.localStorage) throw new Error('Storage unavailable'); const s = window.localStorage; migrate(s); return s }
export const readEntries = (key) => { try { return asList(storage().getItem(key)) } catch { return [] } }
export function saveEntry(key, entry) {
  if (!ownKeys.has(key)) throw new Error('Invalid FoodBridge storage key')
  const record = { ...entry, id: entry.id || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, savedAt: entry.savedAt || new Date().toISOString() }
  storage().setItem(key, JSON.stringify([...readEntries(key), record]))
  return record
}
export function replaceEntries(key, entries) {
  if (!ownKeys.has(key) || !Array.isArray(entries)) throw new Error('Invalid FoodBridge storage update')
  storage().setItem(key, JSON.stringify(entries))
}
export function clearDemoData() {
  const s = storage(); const demoIds = new Set(readEntries(STORAGE_KEYS.demoDonations).map((entry) => entry.id))
  s.removeItem(STORAGE_KEYS.demoDonations)
  replaceEntries(STORAGE_KEYS.interests, readEntries(STORAGE_KEYS.interests).filter((entry) => !demoIds.has(entry.donationId)))
}
export const isAvailableDonation = (x) => x && typeof x === 'object' && x.category && x.quantity && x.location && x.deadline && !Number.isNaN(Date.parse(x.deadline)) && Date.parse(x.deadline) > Date.now()
export const safeDonations = () => readEntries(STORAGE_KEYS.donations).filter(isAvailableDonation)
