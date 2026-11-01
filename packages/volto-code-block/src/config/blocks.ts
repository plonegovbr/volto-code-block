import { cloneDeep } from 'lodash';
import type { ConfigType } from '@plone/registry';
import type { BlockConfigBase } from '@plone/types';
import codeBlock from '../components/Blocks/Code';
import gistBlock from '../components/Blocks/Gist';
import mermaidBlock from '../components/Blocks/Mermaid';

type ContainerBlock = BlockConfigBase & { allowedBlocks?: string[] };

const BLOCKS = [codeBlock, mermaidBlock, gistBlock];
const CONTAINER_BLOCKS = ['gridBlock', 'accordion'];

export default function install(config: ConfigType) {
  const { blocksConfig } = config.blocks;

  BLOCKS.forEach((block) => {
    blocksConfig[block.id] = block;
  });

  // Add Blocks to gridBlock and accordionBlock
  // It's important to maintain the chain, and do not introduce pass by reference in
  // the internal `blocksConfig` object, so we clone the object to avoid this.
  CONTAINER_BLOCKS.forEach((blockId) => {
    const container = blocksConfig[blockId] as ContainerBlock | undefined;
    if (
      container !== undefined &&
      container.allowedBlocks !== undefined &&
      container.blocksConfig !== undefined
    ) {
      container.allowedBlocks = [
        ...container.allowedBlocks,
        ...BLOCKS.map((block) => block.id),
      ];
      const containerBlocks = container.blocksConfig;
      BLOCKS.forEach((block) => {
        containerBlocks[block.id] = cloneDeep(block);
      });
    }
  });

  return config;
}
