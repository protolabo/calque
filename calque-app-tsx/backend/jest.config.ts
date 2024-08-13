//boilerplate config

import type { Config } from 'jest';

const config: Config = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // A map from regular expressions to module names or to arrays of module names
  // that allow to stub out resources, like images or styles with a single module
  moduleNameMapper: {},

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'src'],

  // A list of paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['dotenv/config'], // Load environment variables before tests

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  //setupFilesAfterEnv: ['./jest.setup.ts'], // Optional: additional setup like custom matchers

  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/src/tests/*.test.(ts|tsx|js|jsx)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // Transform setting to use ts-jest for TypeScript files
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Global setup and teardown (Optional)
  //globalSetup: './jest.globalSetup.ts', // Optional global setup script
  //globalTeardown: './jest.globalTeardown.ts', // Optional global teardown script
};

export default config;
