// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: for extending jest-dom matchers
  moduleNameMapper: {
    // Handle CSS Modules
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle static assets if necessary
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$' : '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    // Use ts-jest for ts/tsx files
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    // Use babel-jest for js/jsx files if you have any non-TS source/test files
    // '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  // Match test files in the test directory or files ending with .test.ts(x)
  testMatch: [
    '<rootDir>/test/**/*.test.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/*.test.(js|jsx|ts|tsx)',
  ],
  // Ignore node_modules, unless specific modules need transpiling
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^/]+$'],
  // Optional: Configure coverage reporting
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts', // Usually exclude index barrel files
    '!src/**/types.ts', // Exclude type definition files
    '!src/**/CellShape.ts', // Exclude type definition files
  ],
};
