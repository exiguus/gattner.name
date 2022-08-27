import Fetch, {
  FileProps as DefaultAssetProps,
  DefaultProps,
} from './Fetch.class'

export type AssetProps = DefaultAssetProps & DefaultProps

export default class Asset extends Fetch {
  constructor(options: AssetProps) {
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
