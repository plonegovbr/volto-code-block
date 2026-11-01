import { describe, expect, it } from 'vitest';
import type { ConfigType } from '@plone/registry';
import install from './blocks';

const BLOCK_IDS = ['codeBlock', 'mermaidBlock', 'gistBlock'];

function makeConfig(blocksConfig: Record<string, unknown> = {}) {
  return { blocks: { blocksConfig } } as unknown as ConfigType;
}

function container(allowedBlocks: string[] = ['slate']) {
  return { id: 'container', allowedBlocks, blocksConfig: {} };
}

describe('blocks config', () => {
  it('keys every block by its own id', () => {
    const { blocksConfig } = install(makeConfig()).blocks;
    for (const id of BLOCK_IDS) {
      expect(blocksConfig[id].id).toBe(id);
    }
  });

  it('offers the blocks in the text group of the chooser', () => {
    const { blocksConfig } = install(makeConfig()).blocks;
    for (const id of BLOCK_IDS) {
      expect(blocksConfig[id].group).toBe('text');
      expect(blocksConfig[id].restricted).toBe(false);
    }
  });

  it('gives every block a schema and both components', () => {
    const { blocksConfig } = install(makeConfig()).blocks;
    for (const id of BLOCK_IDS) {
      expect(blocksConfig[id].blockSchema).toBeTypeOf('function');
      expect(blocksConfig[id].view).toBeDefined();
      expect(blocksConfig[id].edit).toBeDefined();
    }
  });

  it('sets the defaults of the code block', () => {
    const { codeBlock } = install(makeConfig()).blocks.blocksConfig;
    expect(codeBlock).toMatchObject({
      defaultLanguage: 'python',
      defaultStyle: 'dark',
    });
  });

  it.each(['gridBlock', 'accordion'])('adds the blocks to %s', (blockId) => {
    const { blocksConfig } = install(
      makeConfig({ [blockId]: container() }),
    ).blocks;
    const block = blocksConfig[blockId] as unknown as ReturnType<
      typeof container
    >;
    expect(block.allowedBlocks).toEqual(['slate', ...BLOCK_IDS]);
    expect(Object.keys(block.blocksConfig)).toEqual(BLOCK_IDS);
  });

  it('gives containers a copy, not a reference', () => {
    const { blocksConfig } = install(
      makeConfig({ gridBlock: container() }),
    ).blocks;
    const grid = blocksConfig.gridBlock as unknown as {
      blocksConfig: Record<string, unknown>;
    };
    expect(grid.blocksConfig.codeBlock).not.toBe(blocksConfig.codeBlock);
    expect(grid.blocksConfig.codeBlock).toMatchObject({ id: 'codeBlock' });
  });

  it('leaves alone a container that has no allowedBlocks', () => {
    const accordion = { id: 'accordion', blocksConfig: {} };
    const { blocksConfig } = install(makeConfig({ accordion })).blocks;
    expect(blocksConfig.accordion).toEqual({
      id: 'accordion',
      blocksConfig: {},
    });
  });
});
