import {
  targetPath,
  sourcePath,
  projectId,
  token,
  contentFilePaths,
} from './config'
import { getContent, getFiles } from '@gattner/gitlab-fetch'

if (!token) {
  throw new Error('Fetch data: GitLab token is missing')
}

if (!projectId) {
  throw new Error('Fetch data: GitLab project ID is missing')
}

/*
 * Fetch files and content
 *  from GitLab and store it in {sourcePath}
 */
getContent(targetPath, contentFilePaths, token, projectId)
getFiles(targetPath, sourcePath, token, projectId)
