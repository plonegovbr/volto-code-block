import React from 'react';
import MermaidView from './DefaultView';
import { withBlockExtensions } from '@plone/volto/helpers';

const MermaidBlockView = (props) => {
  const { data } = props;
  const code = data.code || '';
  return <>{code && <MermaidView code={code} />}</>;
};

export default withBlockExtensions(MermaidBlockView);
