import { HeadersInit } from 'node-fetch'
import Helper from './Helper.class'

export const GITLAB_API_URL = 'https://gitlab.com/api/v4/projects/'
export const GITLAB_API_FILE_MODE = '100644'

Helper.sourceName = 'Config'

export default class Config {
  private token: string
  private projectId: string

  constructor(token: string, projectId: string) {
    if (!token) {
      Helper.throwError('GitLab `token` is missing')
    }

    if (!projectId) {
      Helper.throwError('GitLab `projectId` is missing')
    }

    this.projectId = projectId
    this.token = token
  }

  public get header(): HeadersInit {
    return {
      Accept: 'text/plain; charset=utf-8',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    }
  }

  public get projectUrl(): string {
    return `${GITLAB_API_URL + this.projectId}`
  }
}
