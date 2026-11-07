import { describe, expect, it, vi, beforeEach } from 'vitest'
import { allocationMap, impactStory, matchDonation, JOURNEY, findNeeds, rescueClock, smartSplit, validateAllocations } from './rescueLoop.js'
const base = { id: 'x', category: 'Cooked meals', quantity: '30 meals', servings: '30', location: 'Indiranagar, Bengaluru', deadline: '2099-01-01T12:00', storageCondition: 'Hot-held' }
beforeEach(() => vi.stubGlobal('window', { localStorage: { getItem: () => '[]' } }))
describe('rescue matching', () => {
  it('matches an eligible same-area food donation transparently', () => { const result = matchDonation(base); expect(result.results[0]).toMatchObject({ name: 'Annapurna Community Kitchen', score: 100 }); expect(result.results[0].explanation).toMatch(/East Bengaluru/) })
  it('rejects unsupported areas and capacity mismatches', () => { expect(matchDonation({ ...base, location: 'Pune' }).results).toEqual([]); expect(matchDonation({ ...base, servings: '999' }).results).toEqual([]) })
  it('requires assessable storage and a future deadline', () => { expect(matchDonation({ ...base, storageCondition: '' }).review).toBe(true); expect(matchDonation({ ...base, deadline: '2020-01-01' }).review).toBe(true) })
  it('uses explicit journey order', () => expect(JOURNEY).toEqual(['Food Listed', 'NGO Interest Received', 'Pickup Coordinated', 'Distribution Completed']))
  it('filters community needs and splits only within capacity', () => { expect(findNeeds({ category: 'Cooked meals', location: 'Indiranagar' })).toHaveLength(3); const split = smartSplit({ ...base, servings: '100' }, [{ id: 'a', location: 'Indiranagar', category: 'Cooked meals', capacity: 30, required: 30, priority: 'High' }, { id: 'b', location: 'Indiranagar', category: 'Cooked meals', capacity: 40, required: 40, priority: 'Medium' }]); expect(split.allocations.map((a) => a.servings)).toEqual([30, 40]); expect(split.unallocated).toBe(30) })
  it('marks past deadlines without extension', () => expect(rescueClock({ deadline: '2020-01-01' }).label).toBe('Deadline Passed'))
  it('validates editable whole-serving allocations and remaining total', () => { const needs = [{ id: 'a', location: 'Indiranagar', category: 'Cooked meals', capacity: 30, required: 30, priority: 'High' }]; expect(validateAllocations(base, [{ id: 'a', servings: 20 }], needs)).toMatchObject({ valid: true, allocated: 20, unallocated: 10 }); expect(validateAllocations(base, [{ id: 'a', servings: 31 }], needs).valid).toBe(false); expect(validateAllocations(base, [{ id: 'a', servings: -1 }], needs).valid).toBe(false); expect(allocationMap([{ id: 'a', servings: 2 }])).toEqual({ a: 2 }) })
  it('creates a clearly simulated impact story', () => expect(impactStory(base, []).toLowerCase()).toContain('simulation notice'))
})
