# gattner.name

> Consulting and development of digital solutions

***

In the middle of 2020 I rebuild my website. At that time I worked a lot with _react_, _preact_ and _Next.js_.

I wanted to take a closer look at the _parcel_ bundler and was looking for a way to build a static page with it, JAMStack style.

From the beginning, I used the GitLab file API as a headless CMS.

I have a lot of experience with headless content management systems like Contentful or Storyblok.  Which is why I decided to use GitLab and its file API as a headless CMS. Which in turn was the reason to develop the [gitlab-fetch package](/packages/gitlab-fetch).

Performance optimization like bundle-size, asset compression or A11y and SEO therefore played a role.

The optimizations have paid off. With the lighthouse CLI, the website achieved [100 points in all categories](https://googlechrome.github.io/lighthouse/viewer/?gist=6b8b5f4e71fda1b8b7b412c6de92e6ab) like performance, accessibility, best practice and SEO.

Early 2022 transformed into a Monorepo. Using pnpm workspaces and a Turborepo build system.

In the next few months, the plan is to move from [Parcel v1](https://v1.parceljs.org/) to [WMR](https://wmr.dev/) for the corporate app. Create a shared UI Library with packages for buttons, headlines, teaser etc. and document them in Storybook. Build a resume app in Next.js and Supabase.
And build a blog using the Astro island architecture.

* [x] Corporate Site Application
* [ ] Resume Application
* [ ] Weblog Application
* [ ] Dashboard Application
* [ ] LastFm Serverless
* [ ] CodeInfo Serverless

## Use

install

```shell
pnpm i
```

develop

```shell
pnpm dev
```

build

```shell
pnpm build
```

## monorepo

* [x] build with Turborepo
* [x] workspaces with pnpm
* [x] dependencies with pnpm
* [x] lint with eslint, commitlint and husky
* [x] format with prettier and editorconfig
* [x] unit tests with jest and testing-library
* [x] e2e tests with Playwright Vercel deployment GitHub Action
* [x] bundlewatch Vercel deployment GitHub Action

## Research

* [x] e2e tests with [cypress](https://github.com/cypress-io/cypress) with [GitHub action](https://github.com/cypress-io/github-action)
* [x] e2e tests with Playwright and [GitHub action](.github/e2e.yml)
* [ ] performance tests with [GitHub action](https://github.com/preactjs/compressed-size-action)
* [x] publishing with pnpm or [lerna](https://github.com/lerna/lerna)
  * [x] [bootstrapping](https://github.com/lerna/lerna/issues/878#issuecomment-308191660) with lerna
  * [x] [changelog](https://github.com/lerna/lerna-changelog) with lerna
* [x] config
  * [x] example from AJV [config](https://github.com/ajv-validator/config) / [usage](https://github.com/ajv-validator/ajv)
* [ ] conditional font loading
  * [ ] [font face test](https://stackoverflow.com/questions/2881645/detect-whether-a-particular-font-is-installed)
  * [ ] [local font](https://css-tricks.com/responsible-conditional-loading/)

## Packages

* [x] [@gattner/ui](packages/ui/README.md)
* [x] [@gattner/utils](packages/utils/README.md)
* [x] [@gattner/gitlab-fetch](packages/gitlab-fetch/README.md)
* [x] [@gattner/storage](packages/storage/README.md)
* [x] [@gattner/storybook](packages/storybook/README.md)
* [x] [@gattner/superbase](packages/superbase/README.md)
* [x] [@gattner/tracker](packages/tracker/README.md)
* [ ] @gattner/config

## Article

* [ ] feat(api): JSON schema validation with yup, ajv and valita (runtime, build) JAMStack **[corporate/ajv](apps/corporate/schemas/index.ts) [corporate/valita](apps/corporate/schemas/lastFm.ts)
* [ ] feat(api): GitLab file API and JAMStack **[@gattner/gitlab-fetch](packages/gitlab-fetch/README.md)
* [ ] perf: pre-render styled-components and puppeteer **[corporate/app](apps/corporate/src/index.tsx)**[corporate/routes](apps/corporate/package.json)
* [ ] perf: Adaptive serving based on network quality (react) ** [corporate/useNetwork](apps/corporate/src/hooks/useNetwork.ts)
* [ ] perf: Replace sentry with micro-sentry ** [corporate/useSentry](app/apps/corporate/src/hooks/useSentry.ts) [corporate/lib](apps/corporate/src/providers/sentry/lib.ts)
  * [ ] [Sentry v7](https://github.com/getsentry/sentry-javascript/issues/4240)
  * [ ] [Alternatives](https://github.com/getsentry/sentry-javascript/issues/2707)
  * [ ] [Micro-Sentry](https://github.com/Tinkoff/micro-sentry)
* [ ] build: Save in public (open source security and copyright) ** [LICENCE](LICENCE) [@gattner/gitlab-fetch](packages/gitlab-fetch/README.md) [GitGuardian](https://www.gitguardian.com/)
* [ ] ci: Vercel ** [error page](https://www.gattner.name/error) [corporate/vercel.json](apps/corporate/vercel.json)
* [ ] perf(workbox): register and configure workbox service-worker (pre-) cache and routing **[corporate/src/ts-cache.ts](corporate/src/service-worker.ts)
* [ ] perf(serviceworker): use service worker to run fetch request parallel in another thread with fallback and caching ** [corporate/src/ts-lastfm.ts]
* [ ] test(e2e): monorepo deployments on Vercel with GitHub actions **[.github/e2e.yml](.github/e2e.yml)
* [ ] feat(stats): show current programming and system info with <https://github.com/it-novum/openitcockpit-agent-go/wiki/Agent-Overview>
* [ ] feat(serveless): api using express with Vercel

## TODO

### UI

* [ ] feat(icons): [iconoir](https://iconoir.com/) or IBM carbon icons and integrate them via package
* [ ] feat(font): conditional

### Corporate

* [x] perf(loading): prefetch App to avoid blocking time
* [x] ci(patch): patch packages for bundler-prerender plugin
* [x] perf(loading): adjust pre-render hydration switch
* [x] perf(tracker): corporate load lazy
* [x] perf(tracker): corporate add tracking events (and optimize animation events)
* [ ] test(lastfm): mocks for sw
* [ ] test(tracker): mock for sw and supabase
* [ ] test(theme): provider, lib and store
* [ ] test(cache): mock
* [ ] test(sw): register
* [ ] test(prerender): event
* [ ] test(supabase): api and utils
* [ ] test(utils): fingerprint
* [ ] test(utils): murmurhash3
* [ ] perf(lastfm): middleware
* [x] perf(animation): randext and pre-render
* [x] feat(navigation): swipeable to prev or next page
* [ ] feat(theme): add dark/light switch
* [ ] feat(gradient): switch (<https://www.joshwcomeau.com/css/make-beautiful-gradients/> with <https://gka.github.io/chroma.js/>)
* [ ] fix(test): LastFmContextProvider act
  * `Warning: An update to LastFmContextProvider inside a test was not wrapped in act(...).`
* [ ] fix(test): mock canvas
  * `Error: Not implemented: HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)`
* [ ] fix(test): printWarning
  * `corporate:test:       at printWarning (../../node_modules/.pnpm/react-dom@16.14.0_react@16.14.0/node_modules/react-dom/cjs/react-dom.development.js:60:5)
corporate:test:       at error (../../node_modules/.pnpm/react-dom@16.14.0_react@16.14.0/node_modules/react-dom/cjs/react-dom.development.js:23284:7)
corporate:test:       at warnIfNotCurrentlyActingUpdatesInDev (../../node_modules/.pnpm/react-dom@16.14.0_react@16.14.0/node_modules/react-dom/cjs/react-dom.development.js:15656:9)`
* [x] feat(track): conditional
* [x] feat(lastfm): wait for sw to get recent tracks
* [x] feat(track): support sw and browser
* [ ] feat(track): shared fingerprint for sw and browser window
* [ ] test(utils): waitFor
