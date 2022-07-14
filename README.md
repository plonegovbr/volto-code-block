# Code Block for Volto (@plonegovbr/volto-code-block)

Addon implementing a code block with syntax highlight for [Plone](https://plone.org) projects with [Volto](https://github.com/plone/volto).

![npm](https://img.shields.io/npm/v/@plonegovbr/volto-code-block)
[![Code analysis checks](https://github.com/plonegovbr/volto-code-block/actions/workflows/code.yml/badge.svg)](https://github.com/plonegovbr/volto-code-block/actions/workflows/code.yml)
[![Unit tests](https://github.com/plonegovbr/volto-code-block/actions/workflows/unit.yml/badge.svg)](https://github.com/plonegovbr/volto-code-block/actions/workflows/unit.yml)

## Screenshots

### Code Block with Dark style

<img alt="Screenshot" src="./docs/block-dark.png" width="500" />

### Code Block with Light style

<img alt="Screenshot" src="./docs/block-light.png" width="500" />

## Examples

@plonegovbr/volto-code-block can be seen in action at the following sites:

- [Plone Brasil](https://plone.org.br)

## Install

### New Volto Project

Create a Volto project

```shell
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon @plonegovbr/volto-code-block
cd my-volto-project
```

Install new add-on and restart Volto:

```shell
yarn install
yarn start
```

### Existing Volto Project

If you already have a Volto project, just update `package.json`:

```JSON
"addons": [
    "@plonegovbr/volto-code-block"
],

"dependencies": {
    "@plonegovbr/volto-code-block": "*"
}
```

### Test it

Go to http://localhost:3000/

## Credits

The development of this add on was sponsored by the Brazilian Plone Community

[![PloneGov-Br](docs/plonegovbr.png)](https://plone.org.br/)
