module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/src/*.test.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
};
