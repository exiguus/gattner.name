import Config from './Config.class'
import Factory from './Factory.class'
import { FilePath } from './types'
/*
 * Fetch assets and data from GitLab API v4
 *  GET /projects/:id/repository/files/:file_path
 *  see: https://docs.gitlab.com/ee/api/repository_files.html
 * @param options {{token: string, projectId: string}} bearer token send with the request header to authenticate and GitLab project ID
 */

type Action = 'save' | 'print'

type ActionSave = {
  action: 'save'
  targetPath: string
}

type ActionPrint = {
  action: 'print'
  targetPath: never
}

type DataProps = {
  action?: Action
  filePaths: FilePath[]
} & (ActionSave | ActionPrint)

type AssetProps = {
  sourcePath: string
} & (ActionSave | ActionPrint)

interface IClient {
  assets: (props: AssetProps) => Promise<void> | Promise<unknown>
  data: (props: DataProps) => Promise<void> | Promise<unknown>
}

export default class Client extends Config implements IClient {
  /**
   * Fetch and save from GitLab.
   *  Fetch, validate and save JSON files.
   * @param targetPath {string} target path to save content in
   * @param filePaths {FilePath[]} array of objects containing file path and validate function of the content
   */
  public async data({
    action = 'save',
    targetPath,
    filePaths,
  }: DataProps): Promise<void> {
    try {
      await Promise.all(
        filePaths.map(async ({ path, validate }) => {
          const content = new Factory({
            type: 'data',
            projectUrl: this.projectUrl,
            header: this.header,
            path,
            targetPath,
            validate,
          })
          if (action === 'save') {
            await content.save()
          }
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Fetch and save files from GitLab.
   *  Fetch and save any file.
   * @param targetPath {string} target path to save files in
   * @param sourcePath {string} source path to fetch files from
   */
  public async assets({
    action = 'save',
    targetPath,
    sourcePath,
  }: AssetProps): Promise<void> {
    try {
      const tree = new Factory({
        type: 'tree',
        projectUrl: this.projectUrl,
        header: this.header,
        path: sourcePath,
        targetPath,
        mode: '100644', // TODO: put into a const
      })
      const filePaths = await tree.print()
      if (Array.isArray(filePaths))
        await Promise.all(
          filePaths.map(async ({ path }) => {
            const file = new Factory({
              type: 'asset',
              projectUrl: this.projectUrl,
              header: this.header,
              path,
              targetPath,
            })
            if (action === 'save') {
              // await file.fetch()
              await file.save()
            }
          })
        )
    } catch (error) {
      console.error(error)
    }
  }
}
