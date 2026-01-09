import type { Config } from 'jest';

const config: Config = {
  // Test environment
  testEnvironment: 'jest-environment-jsdom',

  // Transform files with esbuild for speed
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },

  // Test file patterns
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Module resolution
  moduleNameMapper: {
    // CSS modules
    '\\.(css|scss|sass)$': 'identity-obj-proxy',

    // Static assets
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.ts',

    // Path aliases (match tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/*.test.tsx',
    '!src/index.ts',
  ],

  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Performance
  maxWorkers: '50%',

  // Clear mocks between tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

export default config;
