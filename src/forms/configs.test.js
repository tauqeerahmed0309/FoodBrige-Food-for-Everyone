import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DONATE } from './configs.js'
const valid = () => ({ name: 'Asha', type: 'Restaurant', category: 'Cooked meals', quantity: '4 trays', description: 'Fresh rice', servings: '12', prepared: '2026-11-07T10:00', storageCondition: 'Hot-held', storageTemperature: '', deadline: '2026-11-07T14:00', location: 'Bengaluru', email: 'asha@example.com', phone: '+919876543210', handlingConfirmed: true })
describe('donation validation', () => {
  beforeEach(() => vi.useFakeTimers({ now: new Date('2026-11-07T12:00:00') }))
  afterEach(() => vi.useRealTimers())
  it('accepts a valid donation without imposing universal category windows', () => { const d = valid(); d.deadline = '2026-11-08T14:00'; expect(DONATE.validate(d)).toEqual({}) })
  it('rejects invalid email and phone', () => { const d = valid(); d.email = 'bad'; d.phone = '4'; expect(DONATE.validate(d)).toMatchObject({ email: expect.any(String), phone: expect.any(String) }) })
  it('rejects a deadline before preparation', () => { const d = valid(); d.deadline = '2026-11-07T09:00'; expect(DONATE.validate(d).deadline).toMatch(/after preparation/) })
  it('requires handling confirmation and plausible storage data', () => { const d = valid(); d.handlingConfirmed = false; d.storageTemperature = '150'; expect(DONATE.validate(d)).toMatchObject({ handlingConfirmed: expect.any(String), storageTemperature: expect.any(String) }) })
})
