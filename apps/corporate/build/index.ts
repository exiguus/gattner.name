import { header, contentFilePaths } from './config'
import { getContent, getFiles } from './lib'

/*
 * Fetch data from GitLab
 *  GET /projects/:id/repository/files/:file_path
 *  see: https://docs.gitlab.com/ee/api/repository_files.html
 */

getContent(contentFilePaths, header)
getFiles(header)
