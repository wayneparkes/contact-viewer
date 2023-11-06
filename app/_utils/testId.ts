const isTestingEnv = /development|test/.test(String(process.env.NODE_ENV))
export default function testId(testId: string) {
  return isTestingEnv ? { 'data-test': testId } : {}
}
