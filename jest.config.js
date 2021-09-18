module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: '[<rootDir>/test/**/*.test.ts]',
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/test',
    '<rootDir>/node_modules'
  ]
};