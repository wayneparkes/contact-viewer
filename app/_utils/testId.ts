const isTestEnv = String(process.env.NODE_ENV) === 'test'
export default function testId(testId: string) {
  return isTestEnv ? { 'data-test': testId } : {}
}
