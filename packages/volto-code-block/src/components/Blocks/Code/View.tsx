import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import CodeView from './DefaultView';
import type { CodeBlockData } from './index';

interface CodeBlockViewProps {
  data: CodeBlockData;
}

const CodeBlockView: React.FC<CodeBlockViewProps> = (props) => {
  const { data } = props;
  return <>{data && <CodeView {...data} />}</>;
};

export default withBlockExtensions(CodeBlockView);
