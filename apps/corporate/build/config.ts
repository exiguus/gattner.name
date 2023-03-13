import { FilePath } from '@gattner/gitlab-fetch'
import Ajv from 'ajv'

import {
  homeSchema,
  aboutSchema,
  contactSchema,
  impressumSchema,
  appSchema,
  pageSchema,
  errorSchema,
  i18nSchema,
} from '../schemas'

const ajv = new Ajv()

export const contentFilePaths: FilePath[] = [
  { path: 'content/app.json', validate: ajv.compile(appSchema) },
  { path: 'content/page.json', validate: ajv.compile(pageSchema) },
  { path: 'content/error.json', validate: ajv.compile(errorSchema) },
  { path: 'content/home.json', validate: ajv.compile(homeSchema) },
  { path: 'content/about.json', validate: ajv.compile(aboutSchema) },
  { path: 'content/contact.json', validate: ajv.compile(contactSchema) },
  { path: 'content/impressum.json', validate: ajv.compile(impressumSchema) },
  { path: 'content/i18n.json', validate: ajv.compile(i18nSchema) },
]

export const token = process.env.GITLAB_API_BEARER_TOKEN
export const targetPath = './data'
export const sourcePath = 'files/'
export const projectId = process.env.GITLAB_PROJECT_ID
