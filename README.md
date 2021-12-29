# gattner.name

> Consulting and development of digital solutions

---

In the middle of 2020 I released my new homepage. At that time I worked a lot with _react_, _preact_ and _Next.js_.

I wanted to take a closer look at the _parcel_ bundler and was looking for a way to build a static page with it, JAMStack style.

Performance optimization like bundle-size, asset compression or A11y and SEO also played a role.

That's why i decide to use the `parcel-bundler` with _react_, _preact_ and `preact-compat`. `parcel-plugin-prerender` and `parcel-plugin-compress`, `workbox-precaching` and `react-document-meta` make it a static website that also works offline as a PWA thanks to _workbox_.

The optimizations have paid off. With the lighthouse cli, the website achieved [100 points in all categories](https://googlechrome.github.io/lighthouse/viewer/?gist=6b8b5f4e71fda1b8b7b412c6de92e6ab) like performance, accessibility, best practice and SEO.

Data is fetched from another repo at build time.

Between the years I had some time, so I moved the repo to _Github_, made it public and the build and deployment is now running on _Vercel_.

Before that the site was built and deployed with own workers, running behind a _Varnish_-Cache.

## Use

```shell
npm start
```

and build with

```shell
npm run build
```

## Prerender

`window['__SSR']` is true while prerender and undefined if not.

React render is called in `process.env.NODE_ENV=development` and hydrate in production mode.
