import { rest } from 'msw'
import { GITLAB_API_URL } from '../src/Config.class'
import gitlabRepositoryFileMock from './__mocks__/gitlabRepositoryFileMock.json'

export const GITLAB_PROJECT_ID = '12345678'

const gitlabRepositoryFileHandler = rest.get(
  `${GITLAB_API_URL}${GITLAB_PROJECT_ID}/repository/files/content*`,
  (_req, res, ctx) => {
    ctx.status(200)
    return res(ctx.json(gitlabRepositoryFileMock))
  }
)

export const handlers = [gitlabRepositoryFileHandler]

export const gitlabRepositoryFileExeptionHandler = rest.get(
  `${GITLAB_API_URL}${GITLAB_PROJECT_ID}/repository/files/content*`,
  (_req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ error: '404 Not Found' }))
  }
)

export const handleException = [gitlabRepositoryFileExeptionHandler]
