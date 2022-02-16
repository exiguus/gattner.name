import Config from './Config.class'
import Factory from './Factory.class'
import { FilePath } from './types'
/*
 * Fetch data from GitLab API v4
 *  GET /projects/:id/repository/files/:file_path
 *  see: https://docs.gitlab.com/ee/api/repository_files.html
 * @param options {{token: string, projectId: string}} bearer token send with the request header to authenticate and GitLab project ID
 */
export default class Client extends Config {
  /**
   * Fetch and save from GitLab.
   *  Fetch, validate and save JSON files.
   * @param targetPath {string} target path to save content in
   * @param filePaths {FilePath[]} array of objects containing file path and validate function of the content
   */
  public async saveContent(
    targetPath: string,
    filePaths: FilePath[]
  ): Promise<void> {
    try {
      Promise.all(
        filePaths.map(async ({ path, validate }) => {
          const content = new Factory({
            type: 'content',
            projectUrl: this.projectUrl,
            header: this.header,
            path,
            targetPath,
            validate,
          })
          await content.save()
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
  public async saveFiles(
    targetPath: string,
    sourcePath: string
  ): Promise<void> {
    try {
      const tree = new Factory({
        type: 'tree',
        projectUrl: this.projectUrl,
        header: this.header,
        path: sourcePath,
        targetPath,
        mode: '100644', // TODO: put into a const
      })
      const filePaths = await tree.filePaths()
      Promise.all(
        filePaths.map(async ({ path }) => {
          const file = new Factory({
            type: 'file',
            projectUrl: this.projectUrl,
            header: this.header,
            path,
            targetPath,
          })
          await file.save()
        })
      )
    } catch (error) {
      console.error(error)
    }
  }
}
