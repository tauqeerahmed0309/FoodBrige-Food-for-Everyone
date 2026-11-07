import { beforeEach, describe, expect, it, vi } from 'vitest'
import { clearDemoData, STORAGE_KEYS, isAvailableDonation, readEntries, saveEntry } from './useStorage.js'
const store = new Map()
beforeEach(() => { store.clear(); vi.stubGlobal('window', { localStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v), removeItem: (k) => store.delete(k) } }) })
describe('local demo storage', () => {
  it('persists a donation once', () => { saveEntry(STORAGE_KEYS.donations, { category: 'Bakery items' }); expect(readEntries(STORAGE_KEYS.donations)).toHaveLength(1) })
  it('preserves supplied stable record IDs', () => { saveEntry(STORAGE_KEYS.demoDonations, { id: 'demo-1', category: 'Bakery items' }); expect(readEntries(STORAGE_KEYS.demoDonations)[0].id).toBe('demo-1') })
  it('handles corrupted JSON safely', () => { store.set(STORAGE_KEYS.donations, '{bad'); expect(readEntries(STORAGE_KEYS.donations)).toEqual([]) })
  it('filters expired donations', () => { expect(isAvailableDonation({ category: 'Bakery', quantity: '1', location: 'X', deadline: '2020-01-01' })).toBe(false) })
  it('clears only isolated demo data and related interests', () => { saveEntry(STORAGE_KEYS.donations, { id: 'user-1' }); saveEntry(STORAGE_KEYS.demoDonations, { id: 'demo-1' }); saveEntry(STORAGE_KEYS.interests, { donationId: 'demo-1' }); clearDemoData(); expect(readEntries(STORAGE_KEYS.donations)).toHaveLength(1); expect(readEntries(STORAGE_KEYS.demoDonations)).toEqual([]); expect(readEntries(STORAGE_KEYS.interests)).toEqual([]) })
  it('migrates legacy SharePlate records once without duplicates', () => { store.set('shareplate_donations', JSON.stringify([{ id: 'legacy-1', category: 'Bakery' }])); expect(readEntries(STORAGE_KEYS.donations)).toEqual([{ id: 'legacy-1', category: 'Bakery' }]); expect(readEntries(STORAGE_KEYS.donations)).toHaveLength(1) })
})
