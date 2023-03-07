import { JSONSchemaType } from 'ajv'

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
  title?: string
  meta?: Meta | null
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
    title: { type: 'string', nullable: true },
    path: { type: 'string' },
    meta: { ...metaSchema, nullable: true },
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
