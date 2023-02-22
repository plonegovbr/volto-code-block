import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import CodeView from './DefaultView';

const CodeBlockView = (props) => {
  const { data } = props;

  return <>{data && <CodeView data={data} />}</>;
};

export default withBlockExtensions(CodeBlockView);
