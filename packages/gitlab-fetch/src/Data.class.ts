import Fetch, {
  ContentProps as DefaultDataProps,
  DefaultProps,
} from './Fetch.class'

export type DataProps = DefaultDataProps & DefaultProps

export default class Data extends Fetch {
  constructor(options: DataProps) {
    if (!options.projectUrl) {
      throw new Error('Fetch: projectUrl must be defined')
    }
    if (!options.header) {
      throw new Error('Fetch: header must be defined')
    }
    if (!options.path) {
      throw new Error('Fetch: path must be defined')
    }
    if (!options.validate) {
      throw new Error('Fetch: validate must be defined')
    }
    super(options)
  }
}
