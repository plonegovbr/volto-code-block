# Code Block for Volto (@plonegovbr/volto-code-block)

Addon implementing a code block with syntax highlight for [Plone](https://plone.org) projects with [Volto](https://github.com/plone/volto).

[![npm](https://img.shields.io/npm/v/@plonegovbr/volto-code-block)](https://www.npmjs.com/package/@plonegovbr/volto-code-block)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://plonegovbr.github.io/volto-code-block/)
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

You can also check its [Storybook](https://plonegovbr.github.io/volto-code-block/).

## Install

### New Volto Project

Create a Volto project, install the new add-on and restart Volto:

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

### Configure language available in the block setting

You can specify the language available in the setting by changing in `config.js` (or index.js) by modifying the object in `config.settings.codeBlock.languages`. Each item is composed of an object containing:

* label: Friendly name for the language. i.e.: Python
* language: Reference to `prismjs` language component.


Example:

```javascript

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-yaml';


import { languages } from '@plonegovbr/volto-code-block';

const applyConfig = (config) => {
    config.settings['codeBlock'] = {
        languages: {
        bash: { label: 'Bash', language: languages.bash },
        css: { label: 'CSS', language: languages.css },
        dockerfile: { label: 'Dockerfile', language: languages.dockerfile },
        javascript: { label: 'Javascript', language: languages.js },
        json: { label: 'JSON', language: languages.json },
        less: { label: 'LESS', language: languages.less },
        markdown: { label: 'Markdown', language: languages.markdown },
        nginx: { label: 'nginx', language: languages.nginx },
        python: { label: 'Python', language: languages.python },
        scss: { label: 'SCSS', language: languages.scss },
        yaml: { label: 'Yaml', language: languages.yaml },
        xml: { label: 'XML', language: languages.xml },
        },
    };

    return config;
};

export default applyConfig;
```

### Test it

Go to http://localhost:3000/

## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other Volto core improvements.
For this reason, it only works with pnpm and Volto 18 (currently in alpha)

### Requisites

- Volto 18
- pnpm as package manager

### Make convenience commands

Run `make help` to list the available commands.

```text
help                                 Show this help
install                              Installs the dev environment using mrs-developer
i18n                                 Sync i18n
format                               Format codebase
lint                                 Lint Codebase
test                                 Run unit tests
test-ci                              Run unit tests in CI
storybook-start                      Start Storybook server on port 6006
storybook-build                      Build Storybook
start-backend-docker                 Starts a Docker-based backend for developing
start-test-acceptance-frontend-dev   Start acceptance frontend in dev mode
start-test-acceptance-frontend       Start acceptance frontend in prod mode
start-test-acceptance-server         Start acceptance server
test-acceptance                      Start Cypress in interactive mode
test-acceptance-headless             Run cypress tests in headless mode for CI
```

### Development Environment Setup

Install package requirements

```shell
make install
```

### Start developing

Run (in separate terminal sessions)

Start backend server

```shell
make start-backend-docker
```

Start frontend

```shell
pnpm start
```

### Linting

Run ESlint, Prettier and Stylelint

```shell
make lint
```

### Formatting

Run ESlint, Prettier and Stylelint in fix mode

```shell
make format
```

### i18n

Extract the i18n messages to locales

```shell
make i18n
```

### Unit tests

Run unit tests

```shell
make test
```

### Run Cypress tests

Run (in separate terminal sessions)

Start the frontend in dev mode

```shell
make start-test-acceptance-frontend-dev
```

Start the backend acceptance server

```shell
make start-test-acceptance-server
```

Start the Cypress interactive test runner

```shell
make test-acceptance
```


## Credits

The development of this add-on was sponsored by the Brazilian Plone Community

[![PloneGov-Br](docs/plonegovbr.png)](https://plone.org.br/)
