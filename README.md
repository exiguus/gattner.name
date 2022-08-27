# gattner.name

> Consulting and development of digital solutions

---

In the middle of 2020 I rebuild my website. At that time I worked a lot with _react_, _preact_ and _Next.js_.

I wanted to take a closer look at the _parcel_ bundler and was looking for a way to build a static page with it, JAMStack style.

Performance optimization like bundle-size, asset compression or A11y and SEO therefore played a role.

The optimizations have paid off. With the lighthouse cli, the website achieved [100 points in all categories](https://googlechrome.github.io/lighthouse/viewer/?gist=6b8b5f4e71fda1b8b7b412c6de92e6ab) like performance, accessibility, best practice and SEO.

Early 2022 transformed into a mono repo with the goal to create different packages to later switch from [Parcel v1](https://v1.parceljs.org/) to [WMR](https://wmr.dev/) and build various [Next.js](https://nextjs.org/) applications:

- [x] Corporate Site Application
- [ ] Resume Application
- [ ] Weblog Application
- [ ] Dashboard Application
- [ ] GitLab API data Package
- [ ] UI Component Library Package
- [ ] UI Icon Library Package
- [ ] Utility Library Package

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
