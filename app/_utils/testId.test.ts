const originalProcessEnv = process.env

beforeEach(() => {
  jest.resetModules() // clears the cache in between tests
  process.env = { ...originalProcessEnv }
})

afterAll(() => {
  process.env = originalProcessEnv
})

test('returns a data-test attribute object when NODE_ENV is "test"', () => {
  // @ts-expect-error
  process.env.NODE_ENV = 'test'
  const testId = require('./testId').default
  const result = testId('my-test-id')
  expect(result).toEqual({ 'data-test': 'my-test-id' })
})

test('should not return a data-test attribute object when NODE_ENV is "development"', () => {
  // @ts-expect-error
  process.env.NODE_ENV = 'development'
  const testId = require('./testId').default
  const result = testId('test-id')
  expect(result).toEqual({})
})

test('should not return a data-test attribute object when NODE_ENV is "staging"', () => {
  // @ts-expect-error
  process.env.NODE_ENV = 'staging'
  const testId = require('./testId').default
  const result = testId('test-id')
  expect(result).toEqual({})
})

test('should not return a data-test attribute object when NODE_ENV is "production"', () => {
  // @ts-expect-error
  process.env.NODE_ENV = 'production'
  const testId = require('./testId').default
  const result = testId('test-id')
  expect(result).toEqual({})
})
