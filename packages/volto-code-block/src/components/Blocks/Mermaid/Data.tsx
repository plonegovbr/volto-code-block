import React from 'react';
import BlockData from '../../BlockData/BlockData';
import type { BlockDataProps } from '../../BlockData/BlockData';
import { mermaidSchema } from './schema';

const MermaidBlockData: React.FC<BlockDataProps> = (props) => (
  <BlockData {...props} defaultSchema={mermaidSchema} />
);

export default MermaidBlockData;
