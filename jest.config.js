module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/src/*.test.ts'],
  moduleNameMapper: {
    '^@Src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
};
