import * as path from 'path'
import * as fs from 'fs'
import { rest } from 'msw'
import { GITLAB_API_URL } from '../src/Config.class'
import gitlabRepositoryFileMock from './__mocks__/gitlabRepositoryFileMock.json'
import gitlabRepositoryTreeMock from './__mocks__/gitlabRepositoryTreeMock.json'

export const GITLAB_PROJECT_ID = '12345678'

const gitlabRepositoryFileHandler = rest.get(
  `${GITLAB_API_URL}${GITLAB_PROJECT_ID}/repository/files/content%2Fapp.json/raw`,
  (_req, res, ctx) => {
    ctx.status(200)
    return res(ctx.json(gitlabRepositoryFileMock))
  }
)

const gitlabRepositoryAssetHandler = rest.get(
  `${GITLAB_API_URL}${GITLAB_PROJECT_ID}/repository/files/assets%2Fimage.png/raw`,
  (_req, res, ctx) => {
    const imageBuffer = fs.readFileSync(
      path.resolve(__dirname, './__mocks__/image.png')
    )
    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/png'),
      ctx.body(imageBuffer)
    )
  }
)

const gitlabRepositoryTreeHandler = rest.get(
  `${GITLAB_API_URL}${GITLAB_PROJECT_ID}/repository/tree/`,
  (_req, res, ctx) => {
    ctx.status(200)
    return res(ctx.json(gitlabRepositoryTreeMock))
  }
)

export const handlers = [
  gitlabRepositoryFileHandler,
  gitlabRepositoryTreeHandler,
]

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

const gitlabRepositoryTreeExemptionHandler = rest.get(
  `${GITLAB_API_URL}projectId/repository/tree/`,
  (_req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ error: '401 Unauthorized' }))
  }
)

export const handleExceptions = [
  gitlabRepositoryFileExemptionHandler,
  gitlabRepositoryAssetHandler,
  gitlabRepositoryClientExemptionHandler,
  gitlabRepositoryTreeExemptionHandler,
]
