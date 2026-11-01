import React from 'react';
import MermaidView from './DefaultView';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import type { MermaidBlockData } from './index';

interface MermaidBlockViewProps {
  block: string;
  data: MermaidBlockData;
}

const MermaidBlockView: React.FC<MermaidBlockViewProps> = (props) => {
  const { block, data } = props;
  return <>{data && <MermaidView {...data} block={block} />}</>;
};

export default withBlockExtensions(MermaidBlockView);
