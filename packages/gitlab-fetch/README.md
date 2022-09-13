# @gattner/gitlab-fetch

Fetch from GitLab with the GitLab Files API

## Use case

### Build in public on GitHub and edit in private on GitLab

* Build in public on GitHub
* Store and edit your content, data (JSON files) and assets (image, document plops) in private on GitLab
* Fetch and validate your data and assets in public on GitHub
* Deploy to Vercel [1]

[1] Trigger a deployment hook [with Vercel](https://vercel.com/docs/concepts/git/deploy-hooks)

## Example

```ts
import {
  targetPath,
  sourcePath,
  projectId,
  token,
  contentFilePaths,
} from './config'
import GitLabApi from '@gattner/gitlab-fetch'

/*
 * Fetch assets (plop) and data (json)
 *  from GitLab and store it in {sourcePath}
 */

async function fetchData() {
  if (!token) {
    throw new Error('Fetch data: GitLab token is missing')
  }

  if (!projectId) {
    throw new Error('Fetch data: GitLab project ID is missing')
  }

  const client = new GitLabApi(token, projectId)
  await Promise.all([
    await client.assets({ targetPath, sourcePath, action: 'save' }),
    await client.data({
      targetPath,
      filePaths: contentFilePaths,
      action: 'save',
    }),
  ])
}

fetchData()
```

```ts
// file config.ts
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
]

export const token = process.env.GITLAB_API_BEARER_TOKEN
export const targetPath = './data'
export const sourcePath = 'files/'
export const projectId = process.env.GITLAB_PROJECT_ID

```

## TODO

* [x] refactor tests
  * [x] fix includes
  * [x] asset
  * [x] data
  * [x] validation
  * [x] exceptions
  * [x] diff data
  * [x] diff assets
* [x] refactor asset/data classes
* [x] refactor asset/data interface
* [x] refactor Helper error handling
* [x] add print option
