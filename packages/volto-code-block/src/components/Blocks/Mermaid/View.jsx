import React from 'react';
import MermaidView from './DefaultView';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

const MermaidBlockView = (props) => {
  const { block, data } = props;
  const code = data.code || '';
  return <>{code && <MermaidView code={code} block={block} />}</>;
};

export default withBlockExtensions(MermaidBlockView);
