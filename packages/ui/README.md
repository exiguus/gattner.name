# @gattner/ui-*

Shared UI Library, Pattern Library, Design System and Style Guide

The Shared UI Library follows the [Atomic Design methodology](https://atomicdesign.bradfrost.com/chapter-2/) and categorieze in the following, more deliberate and hierarchical manner:

1. Atoms
2. Molecules
3. Organisms
4. Templates
5. Pages

## Design System

Design + Development <https://ui.gattner.name/>

_Goals_:

* Design and development work can be created and replicated quickly and at scale.
* Creates a unified language within and between cross-functional teams.
* Create visual consistency across products and channels.
* Serve as an educational tool and reference for developer, designers and content contributors.

See: <https://www.nngroup.com/articles/design-systems-101/>

## Development

### Build

* esnext build for react
* commonjs build for jest

### Peer Dependencies

* react, react-dom and react-is v16
* styled-components v5

The corporate side use Parcel 1.2 and its pre-render plugin that depends on react v16, that's the reason why stick to react v16 for now.

## TODO

* [X] storybook dev
* [x] storybook deploy
* [x] theme package
  * [x] style, fonts, theme, colors packages
  * [x] preview.ts provider for globalStyles, fonts, theme
* [ ] storybook landing page (README.md)
* [ ] move corporate components into packages and add a story
  * [ ] headline
  * [ ] paragraph
  * [x] blockquote
  * [ ] grid
  * [ ] sections / container
  * [ ] ...
* [ ] storybook assets
  * [ ] favicon
* [x] tsconfig
  * [x] use default type root (declare md for example) for all ui packages
