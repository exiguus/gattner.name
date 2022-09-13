import fetch, { HeaderInit, Response } from 'node-fetch'
import { existsSync, mkdirSync } from 'fs'
import { RepositoryTreeItem, ValidateFunction } from './types'
import Helper from './Helper.class'

Helper.sourceName = 'Fetch'

export type DefaultProps = {
  projectUrl: string
  header: HeaderInit
  path: string
}

export type ContentProps = {
  validate?: ValidateFunction
  targetPath: string
}

export type FileProps = {
  targetPath: string
}

export type TreeProps = {
  targetPath: string
  mode: string
}

type FetchProps = (FileProps | ContentProps | TreeProps) & DefaultProps

export default class Fetch {
  public res?: Response
  public data?: string | RepositoryTreeItem[]
  public readonly path: string
  public readonly targetPath: string
  public readonly validate?: ValidateFunction
  public readonly header: HeaderInit
  public readonly mode?: string
  public readonly projectUrl: string
  public url: string

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

    const { projectUrl, header, path, targetPath } = options

    this.projectUrl = projectUrl
    this.header = header
    this.path = path
    this.targetPath = targetPath
    this.validate = 'validate' in options ? options.validate : undefined
    this.mode = 'mode' in options ? options.mode : undefined
    this.url = `${this.projectUrl}/repository/files/${encodeURIComponent(
      this.path
    )}/raw`
  }

  public getDir(): string {
    return this.path.split('/').slice(0, -1).join('/')
  }

  public checkDir(): void {
    const dir = this.getDir()
    if (!existsSync(`${this.targetPath}/${dir}`)) {
      mkdirSync(`${this.targetPath}/${dir}`, { recursive: true })
    }
  }

  public async fetchData() {
    await fetch(this.url, {
      method: 'GET',
      headers: this.header,
    }).then(async res => {
      if (res.status === 200) {
        this.res = res
      } else {
        Helper.throwError(
          `\`${this.path}\` failed to fetch. Status: ${res.status} - ${res.statusText}`
        )
      }
    })
  }

  public async updateData() {
    await (!this.mode ? this.fetchData() : '')
    this.data = await this?.res?.text()
  }

  public async print(): Promise<string | undefined | RepositoryTreeItem[]> {
    await this.updateData()
    return this.data
  }
}
