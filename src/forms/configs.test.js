import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DONATE, VOLUNTEER, PARTNER } from './configs.js'

const validDonation = () => ({
  name: 'Asha',
  type: 'Restaurant',
  category: 'Cooked meals',
  quantity: '4 trays',
  description: 'Fresh rice',
  servings: '12',
  prepared: '2026-11-07T10:00',
  storageCondition: 'Hot-held',
  storageTemperature: '',
  deadline: '2026-11-07T14:00',
  location: 'Bengaluru',
  email: 'asha@example.com',
  phone: '+919876543210',
  handlingConfirmed: true
})

describe('donation validation', () => {
  beforeEach(() => vi.useFakeTimers({ now: new Date('2026-11-07T12:00:00') }))
  afterEach(() => vi.useRealTimers())

  it('accepts a valid donation without imposing universal category windows', () => {
    const d = validDonation()
    d.deadline = '2026-11-08T14:00'
    expect(DONATE.validate(d)).toEqual({})
  })

  it('rejects invalid email and phone', () => {
    const d = validDonation()
    d.email = 'bad'
    d.phone = '4'
    expect(DONATE.validate(d)).toMatchObject({ email: expect.any(String), phone: expect.any(String) })
  })

  it('rejects a deadline before preparation', () => {
    const d = validDonation()
    d.deadline = '2026-11-07T09:00'
    expect(DONATE.validate(d).deadline).toMatch(/after preparation/)
  })

  it('requires handling confirmation and plausible storage data', () => {
    const d = validDonation()
    d.handlingConfirmed = false
    d.storageTemperature = '150'
    expect(DONATE.validate(d)).toMatchObject({
      handlingConfirmed: expect.any(String),
      storageTemperature: expect.any(String)
    })
  })
})

describe('volunteer and partnership validation', () => {
  it('validates volunteer email and phone correctly', () => {
    expect(VOLUNTEER.validate({ email: 'valid@example.com', phone: '+919876543210' })).toEqual({})
    expect(VOLUNTEER.validate({ email: 'invalid-email', phone: '123' })).toMatchObject({
      email: expect.any(String),
      phone: expect.any(String)
    })
  })

  it('validates partner form fields and configuration structure', () => {
    expect(PARTNER.validate({ email: 'partner@ngo.org', phone: '+919876543210' })).toEqual({})
    expect(PARTNER.fields.some((f) => f.name === 'org')).toBe(true)
    expect(PARTNER.fields.some((f) => f.name === 'message')).toBe(true)
  })
})
