import formatDate, { dateToISOString } from './formatDate'

describe('formatting a date', () => {
  test('with a valid date string', () => {
    expect(formatDate('1979-06-20')).toBe('20 June 1979')
  })
  
  test('with the year omitted', () => {
    expect(formatDate('1979-06-20', false)).toBe('20 June')
  })
  
  test('with an invalid date string', () => {
    expect(formatDate('20-06-1979')).toBe('20-06-1979')
  })
})

describe('converting a date to ISO', () => {
  test('with a UTC date string', () => {
    expect(dateToISOString('2023-06-20T00:00:00.000Z')).toBe('2023-06-20')
  })
  
  test('with an ISO date string', () => {
    expect(dateToISOString('2026-05-03')).toBe('2026-05-03')
  })
})
