import React from 'react';
import MermaidView from './DefaultView';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

const MermaidBlockView = (props) => {
  const { block, data } = props;
  return <>{data && <MermaidView {...data} block={block} />}</>;
};

export default withBlockExtensions(MermaidBlockView);
