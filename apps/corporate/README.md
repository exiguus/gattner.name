# gattner.name

> Consulting and development of digital solutions

---

In the middle of 2020 I released my new homepage. At that time I worked a lot with _react_, _preact_ and _Next.js_.

I wanted to take a closer look at the _parcel_ bundler and was looking for a way to build a static page with it, JAMStack style.

Performance optimization like bundle-size, asset compression or A11y and SEO therefore played a role.

That's why I decide to use the `parcel-bundler` with _react_, _preact_ and `preact-compat`. `parcel-plugin-prerender` and `parcel-plugin-compress`, `workbox-precaching` and `react-document-meta` make it a static website that works offline as a PWA thanks to _workbox_.

The optimizations have paid off. With the lighthouse cli, the website achieved [100 points in all categories](https://googlechrome.github.io/lighthouse/viewer/?gist=6b8b5f4e71fda1b8b7b412c6de92e6ab) like performance, accessibility, best practice and SEO.

Fetch data from another repo at build time.

Between the years I had some time, so I moved the repo to _GitHub_, made it public and the build and deployment is now running on _Vercel_.

Before that the website build and deployed with own workers, running behind a _Varnish_-Cache.

## Use

```shell
pnpm start
```

and build with

```shell
pnpm build
```

## Tests

Location `*/**` or `tests/**`

- `*.test.(ts|tsx)` for unit and integration tests
- `*.contract.(ts|tsx)` for contract tests
- `*.e2e.(ts|tsx)` for e2e tests

### Unit tests

```shell
pnpm test:unit
```

### E2E tests

To run the e2e tests local you need to build the app first.

```shell
pnpm build
pnpm test:e2e
```

## Prerender

`window['__PRERENDER']` is true while prerender and undefined if not.

React render called in `process.env.NODE_ENV=development` and hydrate in production mode.

## Tracking

```javascript
// component, page or layout in callback or useEffect
import('lib/tracker').then(({ track }) => {
  track({
    type: 'click',
    msg: 'Link clicked',
    value: `Link clicked with to "${to}" and "${title}"`,
  })
})
```

## TODO

- [x] update package info
- [x] update README.md
- [x] check vercel or netlify deployment
- [x] move to public repo (clear repo)
- [x] add robots.txt
- [x] add random backgrounds
- [x] add night / day mode
- [x] add multi, random home page content
- [x] auto switch dark/light theme
- [x] add LastFm .env.local and remove from env
- [x] add LastFm provider and hook
- [x] add LastFm ServiceWorker
  - [x] fallback fetch in client
  - [x] cache session or local storage
  - [x] tests
- [x] add error logging (sentry)
- [x] add tracker
- [x] data repo
  - [x] add fetch data directory three
  - [x] recursive fetch from directory
  - [x] validate data repo
- [x] use msw in development (won't do)
- [X] add e2e tests (cypress or pentf tests)
- [x] add GitHub source link
- [x] use [valita](https://github.com/badrap/valita/blob/main/README.md) instead of avj for lastFm to reduce bundle size
- [x] [color browser bar](https://stackoverflow.com/a/37630385)
- [x] refactor SSR to prerender
- [X] add a blog
  - [X] use preact and [wmr](https://wmr.dev/)
  - [X] [content layer](https://github.com/contentlayerdev/contentlayer)
  - [X] front matter [gray-matter](<https://github.com/jonschlinkert/>
  - [X] [markdown to JSON](https://github.com/MoOx/markdown-to-json)
- [x] data [schema validation](https://ajv.js.org/guide/async-validation.html)
- [x] add open graph metadata
- [x] test coverage
  - [x] Add test for utils
  - [x] Add per page content tests
  - [x] Add layout tests
  - [x] Add Provider tests
  - [X] Add hook tests
  - [X] Add lib tests
  - [x] Extract lastfm to context and test
  - [x] Extract utils from build and add tests
- [x] add a 404 page [404.html](https://vercel.com/guides/custom-404-page)
- [X] data [charts](https://nivo.rocks/)
- [x] use micro-sentry
  - [x] replace sentry
  - [x] create sentry provider
- [x] GitHub actions
  - [x] [bundlewatch](https://github.com/bundlewatch/bundlewatch) via vercel CI
  - [x] vercel PR, Production deployments
  - [X] [lighthouse](https://github.com/marketplace/actions/web-performance-audits-with-lighthouse)
  - [X] e2e tests
- [x] perf page
  - [x] lighthouse web vitals
  - [x] bundle report HTML
  - [x] bundlewatch
  - [x] Checkley
- [X] parcel 2
  - [X] three shacking
- [x] bundlewatch pattern match
- [x] GitLab fetch
  - [x] handle 500 status code
