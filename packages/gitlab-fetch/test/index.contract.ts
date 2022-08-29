import GitLabApi from '../src'
import { FilePath } from '../src'
import Ajv, { JSONSchemaType } from 'ajv'

import { GITLAB_PROJECT_ID } from '../mocks/handlers'

export type Meta = {
  title?: string
  description?: string
  canonical?: string
  meta: {
    name?: {
      [x: string]: string
    }
    property?: {
      [x: string]: string
    }
  } | null
} | null

export type Route = {
  name: string
  path: string
  meta: Meta | null
}

export const metaSchema: JSONSchemaType<Meta> = {
  type: 'object',
  properties: {
    title: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    canonical: { type: 'string', nullable: true },
    meta: {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          patternProperties: {
            '[a-z]*': { type: 'string' },
          },
          required: [],
          nullable: true,
          additionalProperties: false,
        },
        property: {
          type: 'object',
          patternProperties: {
            '[a-z]*': { type: 'string' },
          },
          required: [],
          nullable: true,
          additionalProperties: false,
        },
      },
      required: [],
      nullable: true,
      additionalProperties: false,
    },
  },
  required: [],
  nullable: true,
  additionalProperties: false,
}

export const routeSchema: JSONSchemaType<Route> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    path: { type: 'string' },
    meta: metaSchema,
  },
  required: ['name', 'path'],
  additionalProperties: false,
}

export const routesSchema: JSONSchemaType<Route[]> = {
  type: 'array',
  items: routeSchema,
  minItems: 1,
  uniqueItems: true,
}

export interface AppProps {
  origin: string
  routes: Route[]
  meta: Meta
}

export const appSchema: JSONSchemaType<AppProps> = {
  type: 'object',
  properties: {
    origin: { type: 'string' },
    routes: routesSchema,
    meta: metaSchema,
  },
  required: ['routes', 'meta', 'origin'],
  additionalProperties: false,
}

const ajv = new Ajv()

const filePath = { path: 'content/app.json', validate: ajv.compile(appSchema) }
export const filePaths: FilePath[] = [filePath]

export const token = 'x-xxx'
export const targetPath = './data'
export const sourcePath = 'assets/'
export const projectId = GITLAB_PROJECT_ID

describe('gitlab api', () => {
  test('client throw unauthorized error', async () => {
    const client = new GitLabApi('token', 'projectId')

    await expect(
      async () =>
        await client.data({
          action: 'save',
          targetPath,
          filePaths: [{ ...filePath, path: 'content/unauthorized.json' }],
        })
    ).rejects.toThrow(
      'File: content/unauthorized.json failed to fetch. Status: 401 - Unauthorized'
    )
  })

  test('save content', async () => {
    const client = new GitLabApi(token, projectId)
    const fetchData = async () =>
      await client.data({ action: 'save', targetPath, filePaths })
    const fetched = fetchData()
      .then(() => true)
      .catch(() => false)
      .finally(() => false)

    await expect(await fetched).toBe(true)
  })

  test('save content throw not found error', async () => {
    const client = new GitLabApi(token, projectId)

    await expect(
      async () =>
        await client.data({
          action: 'save',
          targetPath,
          filePaths: [{ ...filePath, path: 'content/notfound.json' }],
        })
    ).rejects.toThrow(
      'File: content/notfound.json failed to fetch. Status: 404 - Not Found'
    )
  })
})

// const isError = (error: unknown): error is Error =>
//   typeof error === 'object' &&
//   error != null &&
//   'message' in error &&
//   // eslint-disable-next-line no-prototype-builtins
//   hasOwnProperty(error, 'message') &&
//   typeof error['message'] === 'string'

// function hasOwnProperty<
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   X extends Object,
//   Y extends PropertyKey
// >(obj: X, prop: Y): obj is X & Record<Y, unknown> {
//   // eslint-disable-next-line no-prototype-builtins
//   return obj.hasOwnProperty(prop)
// }
