import Fetch, {
  ContentProps as DefaultContentProps,
  DefaultProps,
} from './Fetch.class'

export type ContentProps = DefaultContentProps & DefaultProps

export default class Content extends Fetch {
  constructor(options: ContentProps) {
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
