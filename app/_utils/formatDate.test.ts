import formatDate from './formatDate'

test('formatting a date', () => {
  expect(formatDate('1979-06-20')).toBe('20 June 1979')
})

test('formatting a date with year omitted', () => {
  expect(formatDate('1979-06-20', false)).toBe('20 June')
})

test('formatting an invalid date string', () => {
  expect(formatDate('20-06-1979')).toBe('20-06-1979')
})
