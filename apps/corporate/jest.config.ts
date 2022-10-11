import { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/js-with-babel',
  verbose: true,
  roots: ['<rootDir>'],
  clearMocks: true,
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test|contract).[tj]s?(x)',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: [
    '[/\\\\](node_modules|.cache|.vscode|coverage)[/\\\\]',
  ],
  coveragePathIgnorePatterns: [
    '[/\\\\](node_modules|.cache|.vscode|coverage|test|GlobalStyles|mocks)[/\\\\]',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx|mjs)$': 'ts-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(gif|woff|woff2|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/test/__mocks__/windowMediaMock.js'],
  testEnvironment: 'jsdom',
}

export default config
