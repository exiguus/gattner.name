import { HeaderInit } from 'node-fetch'
import File, { FileProps as DefaultFileProps } from './File.class'
import Content, { ContentProps as DefaultContentProps } from './Content.class'
import Tree, { TreeProps as DefaultTreeProps } from './Tree.class'
import { RepositoryTreeItem } from './types'

type FactoryProps = {
  projectUrl: string
  header: HeaderInit
  path: string
}

type ContentProps = {
  type: 'content'
} & DefaultContentProps

type FileProps = {
  type: 'file'
} & DefaultFileProps

type TreeProps = {
  type: 'tree'
} & DefaultTreeProps

type FetchProps = (FileProps | ContentProps | TreeProps) & FactoryProps

export default class Factory {
  private instance: File | Content

  constructor(options: FetchProps) {
    if (!options.projectUrl) {
      throw new Error('Fetch: projectUrl must be defined')
    }
    if (!options.header) {
      throw new Error('Fetch: header must be defined')
    }
    if (!options.path) {
      throw new Error('Fetch: path must be defined')
    }

    if (options.type === 'file') {
      const { projectUrl, header, path, targetPath } = options
      this.instance = new File({ projectUrl, header, path, targetPath })
    } else if (options.type === 'content') {
      const { projectUrl, header, path, targetPath, validate } = options
      this.instance = new Content({
        projectUrl,
        header,
        path,
        targetPath,
        validate,
      })
    } else if (options.type === 'tree') {
      const { projectUrl, header, path, targetPath, mode } = options
      this.instance = new Tree({ projectUrl, header, path, targetPath, mode })
    } else {
      throw new Error('Fetch: type must be content or file')
    }
  }

  public async save(): Promise<void> {
    this.instance.save()
  }

  public async filePaths(): Promise<RepositoryTreeItem[]> {
    return await this.instance.filePaths()
  }
}
