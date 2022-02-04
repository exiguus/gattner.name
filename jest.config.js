module.exports = {
  verbose: true,
  roots: ['<rootDir>'],
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: [
    '[/\\\\](node_modules|.cache|.vscode|coverage)[/\\\\]',
  ],
  coveragePathIgnorePatterns: [
    '[/\\\\](node_modules|.cache|.vscode|coverage|test|GlobalStyles|mocks)[/\\\\]',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
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
  setupFiles: ['<rootDir>/jest.dotenv.js'],
}
