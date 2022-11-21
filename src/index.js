import codeSVG from '@plone/volto/icons/code.svg';
import CodeBlockViewBlock from './components/Block/View';
import CodeBlockEditBlock from './components/Block/Edit';
import './theme/main.less';
import './theme/theme-dark.less';
import './theme/theme-light.less';

import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import dockerfile from 'react-syntax-highlighter/dist/cjs/languages/hljs/dockerfile';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json';
import less from 'react-syntax-highlighter/dist/cjs/languages/hljs/less';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown';
import nginx from 'react-syntax-highlighter/dist/cjs/languages/hljs/nginx';
import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
import scss from 'react-syntax-highlighter/dist/cjs/languages/hljs/scss';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/hljs/yaml';
import xml from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml';

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
    languages: [
      ['bash', 'Bash', bash],
      ['css', 'CSS', css],
      ['dockerfile', 'Dockerfile', dockerfile],
      ['javascript', 'Javascript', javascript],
      ['json', 'JSON', json],
      ['less', 'LESS', less],
      ['markdown', 'Markdown', markdown],
      ['nginx', 'nginx', nginx],
      ['python', 'Python', python],
      ['scss', 'SCSS', scss],
      ['yaml', 'Yaml', yaml],
      ['xml', 'XML', xml],
    ],
  };

  return config;
};

export default applyConfig;
