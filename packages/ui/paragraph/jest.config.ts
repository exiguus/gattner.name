import { Config } from 'jest'
import jestConfig from '../jest.config'

const config: Config = {
  ...jestConfig,
  moduleNameMapper: {
    ...jestConfig.moduleNameMapper,
    Randext: '<rootDir>/node_modules/randext',
    randext: '<rootDir>/node_modules/randext',
  },
}

export default config
