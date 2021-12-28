# gattner.name

Consulting and development of digital solutions

## Deploy

vercel

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
