import loadable from '@loadable/component';
import type { BlockConfigBase, BlocksFormData } from '@plone/types';
import codeSVG from '@plone/volto/icons/code.svg';
import GistBlockView from './View';
import { gistSchema } from './schema';
import type { CaptionedBlock } from '../types';

export interface GistBlockFields extends CaptionedBlock {
  gistId?: string;
  file?: string;
}

export interface GistBlockData extends BlocksFormData, GistBlockFields {}

const blockInfo: BlockConfigBase = {
  id: 'gistBlock',
  title: 'Gist Block',
  icon: codeSVG,
  group: 'text',
  view: GistBlockView as unknown as BlockConfigBase['view'],
  edit: loadable(
    () => import(/* webpackChunkName: "volto-code-block" */ './Edit'),
  ) as unknown as BlockConfigBase['edit'],
  restricted: false,
  mostUsed: false,
  sidebarTab: 1,
  blockHasOwnFocusManagement: false,
  blockSchema: gistSchema as BlockConfigBase['blockSchema'],
};

export default blockInfo;
