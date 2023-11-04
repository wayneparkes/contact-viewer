const isTestEnv = String(process.env.NODE_ENV) === 'test'
export default (testId: string) => isTestEnv ? { 'data-test': testId } : {}
