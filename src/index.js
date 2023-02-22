import codeSVG from '@plone/volto/icons/code.svg';
import CodeBlockViewBlock from './components/Block/View';
import CodeBlockEditBlock from './components/Block/Edit';

import './theme/main.less';
import './theme/theme-dark.less';
import './theme/theme-light.less';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-less';
// import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-yaml';

import { languages } from 'prismjs/components/prism-core';

const applyConfig = (config) => {
  config.blocks.blocksConfig.codeBlock = {
    id: 'codeBlock',
    title: 'Code Block',
    icon: codeSVG,
    group: 'text',
    view: CodeBlockViewBlock,
    edit: CodeBlockEditBlock,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: true,
    defaultLanguage: 'python',
    defaultStyle: 'dark',
  };
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
