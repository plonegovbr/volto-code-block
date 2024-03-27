import { cloneDeep } from 'lodash';
import codeSVG from '@plone/volto/icons/code.svg';
import showcaseSVG from '@plone/volto/icons/showcase.svg';

// Blocks - CodeBlock
import CodeBlockView from './components/Blocks/Code/View';
import CodeBlockEdit from './components/Blocks/Code/Edit';

// Blocks - MermaidBlock
import MermaidBlockEdit from './components/Blocks/Mermaid/Edit';
import MermaidBlockView from './components/Blocks/Mermaid/View';

// Blocks - GistBlock
import GistBlockEdit from './components/Blocks/Gist/Edit';
import GistBlockView from './components/Blocks/Gist/View';

import './theme/main.less';
import './theme/theme-dark.less';
import './theme/theme-light.less';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-less';
// import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-mermaid';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-yaml';
// They have to be the last ones (at least after markup)
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import { languages } from 'prismjs/components/prism-core';

const applyConfig = (config) => {
  config.blocks.blocksConfig.codeBlock = {
    id: 'codeBlock',
    title: 'Code Block',
    icon: codeSVG,
    group: 'text',
    view: CodeBlockView,
    edit: CodeBlockEdit,
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

  config.blocks.blocksConfig.gistBlock = {
    id: 'gistBlock',
    title: 'Gist Block',
    icon: codeSVG,
    group: 'text',
    view: GistBlockView,
    edit: GistBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: false,
  };

  config.settings['codeBlock'] = {
    languages: {
      plain: { label: 'Plaintext', language: languages.plain },
      bash: { label: 'Bash', language: languages.bash },
      css: { label: 'CSS', language: languages.css },
      dockerfile: { label: 'Dockerfile', language: languages.dockerfile },
      javascript: { label: 'JavaScript', language: languages.js },
      typescript: { label: 'TypeScript', language: languages.ts },
      jsx: { label: 'JSX', language: languages.jsx },
      tsx: { label: 'TSX', language: languages.tsx },
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

  // Add Blocks to gridBlock and accordionBlock
  // It's important to maintain the chain, and do not introduce pass by reference in
  // the internal `blocksConfig` object, so we clone the object to avoid this.
  ['gridBlock', 'accordion'].forEach((blockId) => {
    const block = config.blocks.blocksConfig[blockId];
    if (block !== undefined && block.allowedBlocks !== undefined && block.blocksConfig !== undefined) {
      block.allowedBlocks = [...block.allowedBlocks, 'codeBlock', 'mermaidBlock', 'gistBlock'];
      block.blocksConfig.codeBlock = cloneDeep(config.blocks.blocksConfig.codeBlock);
      block.blocksConfig.mermaidBlock = cloneDeep(config.blocks.blocksConfig.mermaidBlock);
      block.blocksConfig.gistBlock = cloneDeep(config.blocks.blocksConfig.gistBlock);
    }
  });

  return config;
};

export { languages };
export default applyConfig;
