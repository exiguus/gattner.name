import { HeadersInit } from 'node-fetch'
import Asset, { AssetProps as DefaultAssetProps } from './Asset.class'
import Data, { DataProps as DefaultDataProps } from './Data.class'
import Tree, { TreeProps as DefaultTreeProps } from './Tree.class'
import Helper from './Helper.class'
import { RepositoryTreeItem } from './types'

Helper.sourceName = 'Factory'

type FactoryProps = {
  projectUrl: string
  header: HeadersInit
  path: string
}

type DataProps = {
  type: 'data'
} & DefaultDataProps

type AssetProps = {
  type: 'asset'
} & DefaultAssetProps

type TreeProps = {
  type: 'tree'
} & DefaultTreeProps

type FetchProps = (AssetProps | DataProps | TreeProps) & FactoryProps

interface IFactory {
  save: () => Promise<void>
  print: () => Promise<string | undefined | RepositoryTreeItem[]>
}

export default class Factory implements IFactory {
  private instance: Asset | Data | Tree | undefined

  constructor(options: FetchProps) {
    if (!options.projectUrl) {
      Helper.throwError('`projectUrl` must be defined')
    }
    if (!options.header) {
      Helper.throwError('`header` must be defined')
    }
    if (!options.path) {
      Helper.throwError('`path` must be defined')
    }

    if (options.type === 'asset') {
      const { projectUrl, header, path, targetPath } = options
      this.instance = new Asset({ projectUrl, header, path, targetPath })
    } else if (options.type === 'data') {
      const { projectUrl, header, path, targetPath, validate } = options
      this.instance = new Data({
        projectUrl,
        header,
        path,
        targetPath,
        validate,
      })
    } else if (options.type === 'tree') {
      const { projectUrl, header, path, targetPath, mode } = options
      this.instance = new Tree({
        projectUrl,
        header,
        path,
        targetPath,
        mode,
      })
    } else {
      Helper.throwError('`type` must be content, asset or tree')
    }
  }

  public async print() {
    return await this?.instance?.print()
  }

  public async save() {
    await this?.instance?.save()
  }
}
