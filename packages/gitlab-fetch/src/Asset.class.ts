import { createWriteStream } from 'fs'
import Fetch, {
  FileProps as DefaultAssetProps,
  DefaultProps,
} from './Fetch.class'
import Helper from './Helper.class'

export type AssetProps = DefaultAssetProps & DefaultProps

Helper.sourceName = 'Asset'
export default class Asset extends Fetch {
  constructor(options: AssetProps) {
    if (!options.projectUrl) {
      Helper.throwError('`projectUrl` must be defined')
    }
    if (!options.header) {
      Helper.throwError('`header` must be defined')
    }
    if (!options.path) {
      Helper.throwError('`path` must be defined')
    }
    super(options)
  }

  private async createWriteStream(): Promise<void> {
    this.checkDir()
    if (this.res) {
      await this?.res?.body?.pipe(
        createWriteStream(`${this.targetPath}/${this.path}`)
      )
    } else {
      Helper.throwError(`\`${this.path}\` has no saved response`)
    }
    Helper.log(`\`${this.path}\` saved`)
  }

  public async updateData() {
    await this.fetchData()
  }

  public async save(): Promise<void> {
    await this.updateData()
    if (this.res) {
      await this.createWriteStream()
    } else {
      Helper.throwError('no data in response')
    }
  }
}
