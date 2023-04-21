module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageReporters: [
    'text',
    'cobertura'
  ],
  setupFilesAfterEnv: ['./src/setupTests.ts']
}
