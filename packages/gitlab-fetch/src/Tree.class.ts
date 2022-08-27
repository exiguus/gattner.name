import Fetch, {
  TreeProps as DefaultTreeProps,
  DefaultProps,
} from './Fetch.class'
import { RepositoryTreeItem } from './types'

export type TreeProps = DefaultTreeProps & DefaultProps

export default class Tree extends Fetch {
  constructor(options: TreeProps) {
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

  public async print(): Promise<RepositoryTreeItem[]> {
    return await this.getFilesFromRepositoryTree()
  }
}
