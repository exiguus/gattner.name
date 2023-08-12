# @gattner.name v3

Move to Monorepo v3

## Motivation

- Stuck in using old technologies and tools.
- Countless compatibility issues.
- Countless configuration issues.

Better developer experience, better performance, better compatibility, better stability, better extensibility, better documentation, better upgradability.

## Current Setup

- JAMStack (JavaScript, API, Markup, Styles) as architecture
- monorepo as project structure (packages, ui, apps etc.)
- GitLab as Content Management System
- GitHub as Source Code Management System
- GitHub Actions as CI/CD
- [Vercel](https://vercel.com/) as CI/CD and Hosting Provider
- [gitlab-fetch](file://./packages/gitlab-fetch) as gitlab api client
- [parcel v1](https://v1.parceljs.org/) as bundler
- [preact](https://preactjs.com/) as react alternative
- preact-compat as react compatibility layer
- [react](https://reactjs.org/) as ui development framework
- [styled-components](https://styled-components.com/) as css-in-js solution
- [react-router](https://reactrouter.com/) as router
- [Storybook](https://storybook.js.org) as UI Library
- [workbox](https://web.dev/learn/pwa/workbox/) PWA and service worker

## Current Situation

Parcel v1 is a great tool, but it has some limitations:

- no stable scope-hoisting support (mean no support)
- (plugins) not compatible with parcel v2
- prerenadering is only supported via plugins
- caching is not stable
- lag of documentation and examples

Preact / Compat is a great tool, but it has some limitations:

- behind react
- not compatible with react v18 in the current state

## Goals

- Better Developer Experience (less configuration, less boilerplate, less dependencies, less build steps more automation and more speed)
- Better Performance (less code, less dependencies, less build steps)
- Better Compatibility (with react v18, parcel v2, etc.)
- Better Stability (stable caching, stable scope-hoisting, etc.)
- Better Extensibility (plugins, etc.)
- Better Documentation (examples, etc.)
- Better Upgradability (react v20, etc.)

## Solution

Flexible Solution and future prof stack that is extensible, stable, upgradeable and has a nice developer experience

1. Replace Parcel v1 with swc/webpack provided by the Next.js framework
2. Replace Styled-Components with Tailwind and css-modules
3. Replace the JAMStack with a Headless / Composable architecture
4. Add Peer Dependencies to the packages to reduce the bundle size and force the usage of the same versions of the dependencies (react, react-dom, etc.)
5. Create a new package for each UI component in the UI Library (Storybook)
6. Use the UI Library and CMS in the apps
7. Create Serverless Functions for the API
8. Create a new package for each API endpoint
9. Use the API packages in the apps and serverless projects
10. Use the API in the apps

- Headless / Composable Architecture
- monorepo as project structure (packages, ui, apps etc.)
- GitLab as Content Management System
- GitHub as Source Code Management System
- GitHub Actions as CI/CD
- Vercel as CI/CD and hosting provider (ISR, edge, lambdas)
- [gitlab-fetch](file://./packages/gitlab-fetch) as gitlab api client
- GitLab as CMS
- [Next.js](https://nextjs.org) as Router, SSG, ISR and middleware
- [react](https://reactjs.org) as UI development framework
- [Storybook](https://storybook.js.org) as UI Library
- [workbox](https://web.dev/learn/pwa/workbox/) PWA and service worker
- [Tailwind](https://tailwindcss.com) and css-modules
- [workbox](https://web.dev/learn/pwa/workbox/) PWA and service worker

## Tasks

1. [ ] Create and Setup monorepo structure
2. [ ] Setup Next.js for the Corporate app
3. [ ] Create and Setup UI Library (Storybook)
4. [ ] Setup Tailwind and css-modules support for the UI Library and Corporate app
5. [ ] Port existing UI components to Tailwind and css-modules in the UI Library
6. [ ] Port the Corporate app to Next.js and Tailwind
7. [ ] Create a new package for each UI component in the corporate app in the UI Library (Storybook)
8. [ ] Port packages to the new monorepo structure
9. [ ] Add PWA support to the Corporate app
10. [ ] ...
