const pages = ['About', 'Contact', 'Error', 'Contact', 'Home', 'Impressum']
const bundlewatchConfig = {
  files: [
    ...pages.map(page => ({
      path: `dist/${page}.*.js`,
      maxSize: '10KB',
      compression: 'none',
    })),
    {
      path: 'dist/src.*.js',
      maxSize: '60KB',
      compression: 'none',
    },
    {
      path: 'dist/App.*.js',
      maxSize: '275KB',
      compression: 'none',
    },
    {
      path: 'dist/sw-register.*.js',
      maxSize: '10KB',
      compression: 'none',
    },
    {
      path: 'dist/sw.js',
      maxSize: '300KB',
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
