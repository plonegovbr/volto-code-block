import React from 'react';
import BlockData from '../../BlockData/BlockData';
import type { BlockDataProps } from '../../BlockData/BlockData';
import { codeSchema } from './schema';

const CodeBlockData: React.FC<BlockDataProps> = (props) => (
  <BlockData {...props} defaultSchema={codeSchema} />
);

export default CodeBlockData;
