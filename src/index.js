import codeSVG from '@plone/volto/icons/code.svg';
import showcaseSVG from '@plone/volto/icons/showcase.svg';

import MermaidConfig from './helpers/Mermaid/MermaidConfig';

import CodeBlockViewBlock from './components/Blocks/Code/View';
import CodeBlockEditBlock from './components/Blocks/Code/Edit';

import MermaidBlockEdit from './components/Blocks/Mermaid/Edit';
import MermaidBlockView from './components/Blocks/Mermaid/View';

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
import 'prismjs/components/prism-mermaid';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-yaml';

import { languages } from 'prismjs/components/prism-core';

const applyConfig = (config) => {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: MermaidConfig,
    },
  ];

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

  config.blocks.blocksConfig.mermaidBlock = {
    id: 'mermaidBlock',
    title: 'Mermaid Diagram',
    icon: showcaseSVG,
    group: 'text',
    view: MermaidBlockView,
    edit: MermaidBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 0,
    blockHasOwnFocusManagement: true,
  };

  config.settings['codeBlock'] = {
    languages: {
      plain: { label: 'Plaintext', language: languages.plain },
      bash: { label: 'Bash', language: languages.bash },
      css: { label: 'CSS', language: languages.css },
      dockerfile: { label: 'Dockerfile', language: languages.dockerfile },
      javascript: { label: 'Javascript', language: languages.js },
      json: { label: 'JSON', language: languages.json },
      less: { label: 'LESS', language: languages.less },
      markdown: { label: 'Markdown', language: languages.markdown },
      mermaid: { label: 'Mermaid', language: languages.mermaid },
      nginx: { label: 'nginx', language: languages.nginx },
      python: { label: 'Python', language: languages.python },
      scss: { label: 'SCSS', language: languages.scss },
      yaml: { label: 'Yaml', language: languages.yaml },
      xml: { label: 'XML', language: languages.xml },
    },
  };

  // Check for @kitconcept/volto-blocks-grid
  const gridBlock = config.blocks.blocksConfig.__grid;
  if (gridBlock !== undefined) {
    config.blocks.blocksConfig.__grid.gridAllowedBlocks = [...gridBlock.gridAllowedBlocks, 'codeBlock', 'mermaidBlock'];
  }

  return config;
};

export { languages };
export default applyConfig;
