const bundlewatchConfig = {
  files: [
    {
      path: 'dist/src.*.js',
      maxSize: '99KB',
    },
    {
      path: 'dist/service-worker.js',
      maxSize: '9KB',
    },
  ],
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
