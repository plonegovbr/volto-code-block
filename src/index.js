import codeSVG from '@plone/volto/icons/code.svg';
import CodeBlockViewBlock from './components/Block/View';
import CodeBlockEditBlock from './components/Block/Edit';
import './theme/main.less';
import './theme/theme-dark.less';
import './theme/theme-light.less';

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
  return config;
};

export default applyConfig;
