import loadable from '@loadable/component';
import type { BlockConfigBase, BlocksFormData } from '@plone/types';
import codeSVG from '@plone/volto/icons/code.svg';
import CodeBlockView from './View';
import { codeSchema } from './schema';
import type { CaptionedBlock } from '../types';

export interface CodeBlockFields extends CaptionedBlock {
  code?: string;
  language?: string;
  style?: string;
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
  lineNbr?: number;
}

export interface CodeBlockData extends BlocksFormData, CodeBlockFields {}

export interface CodeBlockConfig extends BlockConfigBase {
  defaultLanguage: string;
  defaultStyle: string;
}

const blockInfo: CodeBlockConfig = {
  id: 'codeBlock',
  title: 'Code Block',
  icon: codeSVG,
  group: 'text',
  view: CodeBlockView as unknown as BlockConfigBase['view'],
  edit: loadable(
    () => import(/* webpackChunkName: "volto-code-block" */ './Edit'),
  ) as unknown as BlockConfigBase['edit'],
  restricted: false,
  mostUsed: false,
  sidebarTab: 1,
  blockHasOwnFocusManagement: true,
  defaultLanguage: 'python',
  defaultStyle: 'dark',
  blockSchema: codeSchema as BlockConfigBase['blockSchema'],
};

export default blockInfo;
