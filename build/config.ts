import { HeaderInit } from 'node-fetch'
import { JSONSchemaType } from 'ajv'
import {
  homeSchema,
  aboutSchema,
  contactSchema,
  impressumSchema,
  appSchema,
  pageSchema,
  errorSchema,
  AppProps,
  PageProps,
  ErrorProps,
  HomeProps,
  AboutProps,
  ContactProps,
  ImpressumProps,
} from '../schemas'

type PageSchema =
  | AppProps
  | PageProps
  | ErrorProps
  | HomeProps
  | AboutProps
  | ContactProps
  | ImpressumProps

export type FilePath = {
  path: string
  schema: JSONSchemaType<PageSchema>
}

export const targetPath = './data'

export const contentFilePaths: FilePath[] = [
  { path: 'content/app.json', schema: appSchema },
  { path: 'content/page.json', schema: pageSchema },
  { path: 'content/error.json', schema: errorSchema },
  { path: 'content/home.json', schema: homeSchema },
  { path: 'content/about.json', schema: aboutSchema },
  { path: 'content/contact.json', schema: contactSchema },
  { path: 'content/impressum.json', schema: impressumSchema },
]

const token = process.env.GITLAB_API_BEARER_TOKEN
export const header: HeaderInit = {
  Accept: 'text/plain; charset=utf-8',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token,
}
