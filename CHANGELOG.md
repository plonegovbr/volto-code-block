# Changelog

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html#contributing-change-log-label
-->

<!-- towncrier release notes start -->

## 3.0.0 (2025-11-13)

### Feature

- Translate to German (de). @mxurice-rm 
- Update translation to pt_BR. @ericof 

### Bugfix

- Code block: Wrap the Caption component inside the main block. @ericof 
- Fixed bogus peerDependencies with react-intl @sneridagh 

### Internal

- Remove barrel imports from @plone/volto. @ericof 

## 2.3.0 (2024-04-02)

### Internal

- Reorganize repository to use new Volto add-on format based on `cookiecutter-volto` [@ericof] [#21](https://github.com/plonegovbr/volto-code-block/issue/21)

## [2.2.2](https://github.com/plonegovbr/volto-code-block/compare/2.2.1...2.2.2) (2024-03-28)


### Bug Fixes

* Accordion is present, add JSX and TSX imports ([#20](https://github.com/plonegovbr/volto-code-block/issues/20)) ([2055da5](https://github.com/plonegovbr/volto-code-block/commit/2055da53bac906d12ff1415e023059eb0a337800))

## [2.2.1](https://github.com/plonegovbr/volto-code-block/compare/2.2.0...2.2.1) (2024-03-12)


### Bug Fixes

* Use clone to avoid pass by reference ([#19](https://github.com/plonegovbr/volto-code-block/issues/19)) ([b4fc613](https://github.com/plonegovbr/volto-code-block/commit/b4fc613da30bf26fcadef727a4f550d10e9f5e25))

## [2.2.0](https://github.com/plonegovbr/volto-code-block/compare/2.1.0...2.2.0) (2024-02-25)


### Features

* Add Gist Block and Caption component ([#18](https://github.com/plonegovbr/volto-code-block/issues/18)) ([2bd58b8](https://github.com/plonegovbr/volto-code-block/commit/2bd58b8d1d11561efc65873ba4f6de8f071d5499))
* Add plain to default languages to be able to use it like a pre-block ([#12](https://github.com/plonegovbr/volto-code-block/issues/12)) ([9899762](https://github.com/plonegovbr/volto-code-block/commit/98997628d07c332cf2ce8075b79bf7faa8b8286b))


### Bug Fixes

* Fix extensibility while adding new languages syntaxes [@sneridagh](https://github.com/sneridagh) ([#10](https://github.com/plonegovbr/volto-code-block/issues/10)) ([e683b15](https://github.com/plonegovbr/volto-code-block/commit/e683b15edfe72d6bf575e45ed4283f2df2d43952))
* Fix Storybook generation ([f6aed35](https://github.com/plonegovbr/volto-code-block/commit/f6aed35653ea8a23a1a5233004be9837cb82369e))
* Load Mermaid only when the Mermaid Block is visible ([#13](https://github.com/plonegovbr/volto-code-block/issues/13)) ([#16](https://github.com/plonegovbr/volto-code-block/issues/16)) ([68d4505](https://github.com/plonegovbr/volto-code-block/commit/68d450589ea7e651f9688e21792600cd12e95fa2))

## [2.1.0](https://github.com/plonegovbr/volto-code-block/compare/2.0.0...2.1.0) (2023-05-22)


### Features

* Integrate with @kitconcept/volto-blocks-grid, allowing our blocks to be added to grids. ([7823232](https://github.com/plonegovbr/volto-code-block/commit/782323277e324d8287fa5cd98e870ef11072ca50))


### Bug Fixes

* Line numbers now align to code ([#9](https://github.com/plonegovbr/volto-code-block/issues/9)) ([90c5eb8](https://github.com/plonegovbr/volto-code-block/commit/90c5eb8d08fb6ac29fac4313fdf8f78d792d31d0))
* Set blockHasOwnFocusManagement to true for Mermaid block editing. ([e8605bf](https://github.com/plonegovbr/volto-code-block/commit/e8605bfdc50bad66cb824d5ac6a5dd72ef2f623d))

## [2.0.0](https://github.com/plonegovbr/volto-code-block/compare/1.0.0...2.0.0) (2023-02-23)


### Features

* Add easy language list configuration ([7458028](https://github.com/plonegovbr/volto-code-block/commit/74580286dfec0b99169ad6fbae24a0167eac7787))
* Add Mermaid Diagram block ([f393f99](https://github.com/plonegovbr/volto-code-block/commit/f393f99324a4f767509ad34514a111838d4c0c64))
* Add possiblity to change start line number ([8e079a0](https://github.com/plonegovbr/volto-code-block/commit/8e079a02176b6ab69e63580f46625a761c25f0f2))
* Use prismjs as default highlighter mechanism. ([#6](https://github.com/plonegovbr/volto-code-block/issues/6)) ([8e7717a](https://github.com/plonegovbr/volto-code-block/commit/8e7717a03029c75ee5d2e4314bd20f5490dc4bba))

## [1.0.0](https://github.com/plonegovbr/volto-code-block/compare/1.0.0-alpha.0...1.0.0) (2022-07-14)

### Features

- Fix issue with wrap long lines and styles applied together. ([cb0cf3c](https://github.com/plonegovbr/volto-code-block/commit/cb0cf3c044347eca4a1b9d3fa748604fc5e9e599))

## 1.0.0-alpha.0 (2022-06-13)

### Features

- Add Brazilian Portuguese translation. ([8932d31](https://github.com/plonegovbr/volto-code-block/commit/8932d317a44dd0d5ee3c957e42a84655fe7c0dbb))
- Add Storybook support. ([65b9a73](https://github.com/plonegovbr/volto-code-block/commit/65b9a73f1d9e5ae09ff098d39af1a8794dcc79e9))
