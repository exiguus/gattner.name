import { rest } from 'msw'
import { GITLAB_API_URL } from '../src/Config.class'
import gitlabRepositoryFileMock from './__mocks__/gitlabRepositoryFileMock.json'

export const GITLAB_PROJECT_ID = '12345678'

const gitlabRepositoryFileHandler = rest.get(
  `${GITLAB_API_URL}${GITLAB_PROJECT_ID}/repository/files/content%2Fapp.json/raw`,
  (_req, res, ctx) => {
    ctx.status(200)
    return res(ctx.json(gitlabRepositoryFileMock))
  }
)

export const handlers = [gitlabRepositoryFileHandler]

export const gitlabRepositoryFileExemptionHandler = rest.get(
  `${GITLAB_API_URL}${GITLAB_PROJECT_ID}/repository/files/content%2Fnotfound.json/raw`,
  (_req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ error: '404 Not Found' }))
  }
)

export const gitlabRepositoryClientExemptionHandler = rest.get(
  `${GITLAB_API_URL}projectId/repository/files/content%2Funauthorized.json/raw`,
  (_req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ error: '401 Unauthorized' }))
  }
)

export const handleExceptions = [
  gitlabRepositoryFileExemptionHandler,
  gitlabRepositoryClientExemptionHandler,
]
