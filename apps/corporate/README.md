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

## Prerender

`window['__PRERENDER']` is true while prerender and undefined if not.

React render called in `process.env.NODE_ENV=development` and hydrate in production mode.

## TODO

- [x] update package info
- [x] update README.md
- [x] check vercel or netlify deployment
- [x] move to public repo (clear repo)
- [x] add robots.txt
- [x] add random backgrounds
- [x] add night / day mode
- [x] add multi, random home page content
- [ ] add dark/light switch
  - [x] auto switch theme
- [ ] add [gradient](https://www.joshwcomeau.com/css/make-beautiful-gradients/) switch with [chrome.js](https://gka.github.io/chroma.js/)
- [x] add LastFm .env.local and remove from env
- [x] add LastFm provider and hook
- [ ] add LastFm Middleware
- [x] add LastFm ServiceWorker
  - [x] fallback fetch in client
  - [x] cache session or local storage
  - [x] tests
- [x] add error logging (sentry)
- [x] add analytics (counter.dev)
- [ ] add advanced analytics (hotjar)
- [x] data repo
  - [x] add fetch data directory three
  - [x] recursive fetch from directory
  - [x] validate data repo
- [x] use msw in development (won't do)
- [ ] add e2e tests (cypress or pentf tests)
- [x] add GitHub source link
- [x] use [valita](https://github.com/badrap/valita/blob/main/README.md) instead of avj for lastFm to reduce bundle size
- [x] [color browser bar](https://stackoverflow.com/a/37630385)
- [x] refactor SSR to prerender
- [ ] add a blog
  - [ ] use preact and [wmr](https://wmr.dev/)
  - [ ] [content layer](https://github.com/contentlayerdev/contentlayer)
  - [ ] front matter [gray-matter](<https://github.com/jonschlinkert/>
  - [ ] [markdown to JSON](https://github.com/MoOx/markdown-to-json)
- [x] data [schema validation](https://ajv.js.org/guide/async-validation.html)
- [x] add open graph metadata
- [ ] test coverage
  - [x] Add test for utils
  - [x] Add per page content tests
  - [x] Add layout tests
  - [x] Add Provider tests
  - [ ] Add hook tests
  - [ ] Add lib tests
  - [x] Extract lastfm to context and test
  - [x] Extract utils from build and add tests
- [x] add a 404 page [404.html](https://vercel.com/guides/custom-404-page)
- [ ] data [charts](https://nivo.rocks/)
- [x] use micro-sentry
  - [x] replace sentry
  - [x] create sentry provider
- [ ] GitHub actions
  - [x] [bundlewatch](https://github.com/bundlewatch/bundlewatch) via vercel CI
  - [ ] vercel PR, Production deployments
  - [ ] [lighthouse](https://github.com/marketplace/actions/web-performance-audits-with-lighthouse)
  - [ ] e2e tests
- [ ] perf page
  - [ ] lighthouse web vitals
  - [ ] bundle report HTML
  - [ ] bundlewatch
  - [ ] Checkley
- [ ] parcel 2
  - [ ] three shacking
- [x] bundlewatch pattern match
- [x] GitLab fetch
  - [x] handle 500 status code
