const bundlewatchConfig = {
  files: [
    {
      path: 'dist/src.*.js',
      maxSize: '300KB',
      compression: 'none',
    },
    {
      path: 'dist/sw-cache.js',
      maxSize: '30KB',
      compression: 'none',
    },
    {
      path: 'dist/sw-lastfm.js',
      maxSize: '60KB',
      compression: 'none',
    },
  ],
  normalizeFilenames: /^.+?(\..+?)\.\w+$/,
  bundlewatchServiceHost: 'https://service.bundlewatch.io',
  ci: {
    githubAccessToken: process.env.BUNDLEWATCH_GITHUB_TOKEN,
    repoOwner: process.env.VERCEL_GIT_REPO_OWNER,
    repoName: process.env.VERCEL_GIT_REPO_SLUG,
    repoCurrentBranch: process.env.VERCEL_GIT_COMMIT_REF,
    repoBranchBase: 'main', // Branch PR is being merged into
    commitSha: process.env.VERCEL_GIT_COMMIT_SHA,
    trackBranches: ['main'],
  },
  defaultCompression: 'gzip',
}

module.exports = bundlewatchConfig
