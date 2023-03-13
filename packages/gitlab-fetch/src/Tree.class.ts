import { isArray } from '@gattner/utils'
import Fetch, {
  TreeProps as DefaultTreeProps,
  DefaultProps,
} from './Fetch.class'
import { RepositoryTreeItem } from './types'
import Helper from './Helper.class'
import { TREE_LIMIT } from './Config.class'

Helper.sourceName = 'Tree'

export type TreeProps = DefaultTreeProps & DefaultProps

export default class Tree extends Fetch {
  private tree: RepositoryTreeItem[] | []

  constructor(options: TreeProps) {
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
    // https://docs.gitlab.com/ee/api/repositories.html#list-repository-tree
    this.url = `${
      this.projectUrl
    }/repository/tree/?recursive=${true}&per_page=${TREE_LIMIT}`
    this.tree = []
  }

  private isRepositoryTree = (arr: unknown): arr is RepositoryTreeItem[] =>
    Array.isArray(arr) &&
    arr.length > 0 &&
    arr.filter(
      ({ id, name, path, mode }) =>
        typeof id === 'string' &&
        typeof name === 'string' &&
        typeof path === 'string' &&
        typeof mode === 'string'
    ).length === arr.length

  public async updateData() {
    this.data = await this?.res?.json()
    if (isArray(this.data) && `${this.data.length}` === `${TREE_LIMIT}`) {
      Helper.log(
        `Tree limit has been reach. The tree is limited to ${TREE_LIMIT} items`
      )
    }
    this.tree = this.isRepositoryTree(this.data)
      ? this.data?.filter(
          // filter to have files only and no directories within the sourcePath
          ({ mode, path }) =>
            mode === this.mode && path.startsWith(this.path || '')
        )
      : []
  }

  public async print(): Promise<RepositoryTreeItem[] | []> {
    await this.fetchData()
    await this.updateData()
    return this.tree
  }

  public save() {
    Helper.log('A directory tree cannot be saved')
  }
}
