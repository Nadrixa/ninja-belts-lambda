module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: 'true',
  testMatch: '[<rootDir>/test/**/*.test.ts]',
  coverageDirectory: 'coverage',
  covreagePathIgnorePatterns: [
    '<rootDir>/test',
    '<rootDir>/node_modules'
  ]
};