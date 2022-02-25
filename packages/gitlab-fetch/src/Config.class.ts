import { HeaderInit } from 'node-fetch'

const GITLAB_API_URL = 'https://gitlab.com/api/v4/projects/'

export default class Config {
  private token: string
  private projectId: string

  constructor(token: string, projectId: string) {
    if (!token) {
      throw new Error('Fetch data: GitLab token is missing')
    }

    if (!projectId) {
      throw new Error('Fetch data: GitLab project ID is missing')
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
