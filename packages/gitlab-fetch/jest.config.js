module.exports = {
  verbose: true,
  roots: ['<rootDir>'],
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: [
    '[/\\\\](node_modules|.cache|.vscode|coverage)[/\\\\]',
  ],
  coveragePathIgnorePatterns: [
    '[/\\\\](node_modules|.cache|.vscode|coverage|test|mocks)[/\\\\]',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
}
