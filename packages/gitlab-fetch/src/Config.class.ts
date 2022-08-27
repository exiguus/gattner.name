import { HeaderInit } from 'node-fetch'
import Helper from './Helper.class'

export const GITLAB_API_URL = 'https://gitlab.com/api/v4/projects/'
export default class Config {
  private token: string
  private projectId: string

  constructor(token: string, projectId: string) {
    if (!token) {
      Helper.throwError('GitLab `token` is missing', 'Config')
    }

    if (!projectId) {
      Helper.throwError('GitLab `projectId` is missing', 'Config')
    }

    this.projectId = projectId
    this.token = token
  }

  public get header(): HeaderInit {
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
