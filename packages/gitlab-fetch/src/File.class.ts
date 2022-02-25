import Fetch, {
  FileProps as DefaultFileProps,
  DefaultProps,
} from './Fetch.class'

export type FileProps = DefaultFileProps & DefaultProps

export default class File extends Fetch {
  constructor(options: FileProps) {
    if (!options.projectUrl) {
      throw new Error('Fetch: projectUrl must be defined')
    }
    if (!options.header) {
      throw new Error('Fetch: header must be defined')
    }
    if (!options.path) {
      throw new Error('Fetch: path must be defined')
    }
    super(options)
  }
}
