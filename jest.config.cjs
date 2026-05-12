const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^ui/(.*)$': '<rootDir>/src/ui/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^__mocks__/(.*)$': '<rootDir>/src/__mocks__/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
