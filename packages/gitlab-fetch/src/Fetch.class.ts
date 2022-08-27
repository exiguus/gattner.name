import fetch, { HeaderInit } from 'node-fetch'
import { existsSync, mkdirSync, writeFile } from 'fs'
import { RepositoryTreeItem, ValidateFunction } from './types'

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
  private projectUrl: string
  private header: HeaderInit
  private path: string
  private targetPath: string
  private validate?: ValidateFunction
  private mode?: string
  private url: string
  private data?: string

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
    // TODO: split fetch, save and data for file, content and tree
    // TODO: async constructor 1!11!!1!!
    // this.data = !this.mode ? this.fetch() : ''
  }

  private async fetchData() {
    return await fetch(this.url, {
      method: 'GET',
      headers: this.header,
    }).then(async res => {
      if (res.status === 200) {
        console.log(`File: ${this.path} fetched`)
        return await res.text()
      } else {
        throw new Error(
          `File: ${this.path} failed to fetch. Status: ${res.status} - ${res.statusText}`
        )
      }
    })
  }

  private async updateData() {
    this.data = await (!this.mode ? this.fetchData() : '')
  }

  private async getRepositoryTree(): Promise<RepositoryTreeItem[]> {
    return await fetch(
      `${this.projectUrl}/repository/tree/?recursive=${true}`,
      {
        method: 'GET',
        headers: this.header,
      }
    )
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error(
            `RepositoryTree: failed to fetch. Status: ${res.status} - ${res.statusText}`
          )
        }
      })
      .then(data => data)
  }

  public async getFilesFromRepositoryTree(): Promise<RepositoryTreeItem[]> {
    const tree = await this.getRepositoryTree()
    return tree.filter(
      // filter only Trees and no directories within the sourcePath
      ({ mode, path }) => mode === this.mode && path.startsWith(this.path || '')
    )
  }

  private getDir(): string {
    return this.path.split('/').slice(0, -1).join('/')
  }

  private checkDir(): void {
    const dir = this.getDir()
    if (!existsSync(`${this.targetPath}/${dir}`)) {
      mkdirSync(`${this.targetPath}/${dir}`, { recursive: true })
    }
  }

  private async writeFile(data: string): Promise<void> {
    this.checkDir()
    await writeFile(`${this.targetPath}/${this.path}`, data, error => {
      if (error) {
        throw error
      }
    })
    console.log(`File: ${this.path} saved`)
  }

  // private async createWriteStream(res: Response): Promise<void> {
  //   this.checkDir()
  //   await res.body.pipe(createWriteStream(`${this.targetPath}/${this.path}`))
  //   console.log(`File: ${this.path} saved`)
  // }

  private async createFile(data: string): Promise<void> {
    // if ('path' in args && 'res' in args) {
    //   const { path, res } = args
    //   await this.createWriteStream(this.targetPath, path, res)
    // } else {
    await this.writeFile(data)
    // }
  }

  private validateFile(data: string) {
    if (this.validate && this.validate(JSON.parse(data))) {
      console.log(`File: ${this.path} validated`)
    } else {
      const error = `File: ${this.path} failed validation`
      console.error(error)
      throw new Error(error)
    }
  }

  // TODO: RepositoryTreeItem should be removed
  public async print(): Promise<string | undefined | RepositoryTreeItem[]> {
    await this.updateData()
    return this.data
  }

  // save or return
  public async save(): Promise<void> {
    await this.updateData()
    if (this.data) {
      if (this.validate) {
        await this.validateFile(this.data)
      }
      await this.createFile(this.data)
    } else {
      throw new Error('Fetch: no data')
    }
  }
}
