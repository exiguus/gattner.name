# Patch

use `pnpm patch`

<https://pnpm.io/cli/patch>

## update patches

```sh
pnpm patch <pgk@version>
pnpm patch-commit <path>
```

```sh
## patch a specific version of parcel-plugin-prerender example
❯ pnpm patch parcel-plugin-prerender@1.4.1
You can now edit the following folder: /tmp/670a4ce46578b306bf52735f7f61d058/user
## apply your changes
❯ code /tmp/670a4ce46578b306bf52735f7f61d058/user/
## commit the patch
❯ pnpm patch-commit /tmp/670a4ce46578b306bf52735f7f61d058/user/
## add the patch to the packages.json
# "pnpm": {
#   "patchedDependencies": {
#     "parcel-plugin-prerender@1.4.1": "patches/parcel-plugin-prerender@1.4.1.patch"
#   }
# }
```
