import loadable from '@loadable/component';
import type { BlockConfigBase, BlocksFormData } from '@plone/types';
import showcaseSVG from '@plone/volto/icons/showcase.svg';
import MermaidBlockView from './View';
import { mermaidSchema } from './schema';
import type { CaptionedBlock } from '../types';

export interface MermaidBlockFields extends CaptionedBlock {
  code?: string;
  style?: string;
}

export interface MermaidBlockData extends BlocksFormData, MermaidBlockFields {}

const blockInfo: BlockConfigBase = {
  id: 'mermaidBlock',
  title: 'Mermaid Diagram',
  icon: showcaseSVG,
  group: 'text',
  view: MermaidBlockView as unknown as BlockConfigBase['view'],
  edit: loadable(
    () => import(/* webpackChunkName: "volto-code-block" */ './Edit'),
  ) as unknown as BlockConfigBase['edit'],
  restricted: false,
  mostUsed: false,
  sidebarTab: 1,
  blockHasOwnFocusManagement: true,
  blockSchema: mermaidSchema as BlockConfigBase['blockSchema'],
};

export default blockInfo;
