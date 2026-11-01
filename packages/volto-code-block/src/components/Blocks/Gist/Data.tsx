import React from 'react';
import BlockData from '../../BlockData/BlockData';
import type { BlockDataProps } from '../../BlockData/BlockData';
import { gistSchema } from './schema';

const GistBlockData: React.FC<BlockDataProps> = (props) => (
  <BlockData {...props} defaultSchema={gistSchema} />
);

export default GistBlockData;
