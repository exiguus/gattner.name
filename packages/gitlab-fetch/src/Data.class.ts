import { isError } from '@gattner/utils'
import { writeFile } from 'fs'
import Fetch, {
  ContentProps as DefaultDataProps,
  DefaultProps,
} from './Fetch.class'
import Helper from './Helper.class'

Helper.sourceName = 'Data'

export type DataProps = DefaultDataProps & DefaultProps

export default class Data extends Fetch {
  constructor(options: DataProps) {
    if (!options.projectUrl) {
      Helper.throwError('`projectUrl` must be defined')
    }
    if (!options.header) {
      Helper.throwError('`header` must be defined')
    }
    if (!options.path) {
      Helper.throwError('`path` must be defined')
    }
    if (!options.validate) {
      Helper.throwError('`validate` must be defined')
    }
    super(options)
  }

  public async validateFile() {
    if (
      typeof this.data === 'string' &&
      this.validate &&
      this.validate(JSON.parse(this.data))
    ) {
      Helper.log(`\`${this.path}\` validated`)
    } else {
      Helper.throwError(`\`${this.path}\` failed validation`)
    }
  }

  private async writeFile(): Promise<void> {
    this.checkDir()
    if (typeof this.data === 'string') {
      await writeFile(`${this.targetPath}/${this.path}`, this.data, error => {
        if (error && isError(error)) {
          Helper.throwError(error.message)
        }
      })
    } else {
      Helper.throwError('no data to write')
    }
    Helper.log(`\`${this.path}\` saved`)
  }

  public async save(): Promise<void> {
    await this.updateData()
    if (this.validate) {
      await this.validateFile()
    }
    await this.writeFile()
  }
}
