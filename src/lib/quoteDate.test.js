import assert from 'node:assert/strict'
import test from 'node:test'
import { getPreferredDateError, toLocalDateValue } from './quoteDate.js'

test('formats a date using local calendar fields', () => {
  assert.equal(toLocalDateValue(new Date(2026, 0, 2)), '2026-01-02')
})

test('allows an empty optional date, today, and a future date', () => {
  const today = '2026-10-20'

  assert.equal(getPreferredDateError('', today), undefined)
  assert.equal(getPreferredDateError(today, today), undefined)
  assert.equal(getPreferredDateError('2026-10-21', today), undefined)
})

test('rejects dates earlier than the local calendar date', () => {
  assert.equal(
    getPreferredDateError('2026-10-19', '2026-10-20'),
    'Preferred date cannot be in the past.',
  )
})

test('updates preferred-date validity when the reference date rolls over', () => {
  assert.equal(getPreferredDateError('2026-10-21', '2026-10-20'), undefined)
  assert.equal(getPreferredDateError('2026-10-21', '2026-10-21'), undefined)
  assert.equal(
    getPreferredDateError('2026-10-20', '2026-10-21'),
    'Preferred date cannot be in the past.',
  )
})

test('rejects malformed and impossible calendar dates', () => {
  assert.equal(getPreferredDateError('2026-1-02', '2026-01-01'), 'Enter a valid preferred date.')
  assert.equal(getPreferredDateError('2026-02-29', '2026-01-01'), 'Enter a valid preferred date.')
  assert.equal(getPreferredDateError('2024-02-29', '2024-01-01'), undefined)
})
