import { beforeAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createIntl } from 'react-intl';
import type { BlockConfigBase, JSONSchema } from '@plone/types';
import config from '@plone/volto/registry';
import installBlocks from '../../config/blocks';
import installSettings from '../../config/settings';
import codeBlock from './Code';
import gistBlock from './Gist';
import mermaidBlock from './Mermaid';

const blocksDir = path.dirname(fileURLToPath(import.meta.url));

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;

/** Fields stored by the block that the sidebar schema does not hold. */
const EDITED_IN_BLOCK: Record<string, string[]> = {
  codeBlock: ['code'],
  gistBlock: [],
  mermaidBlock: ['code'],
};

/** Split a `*.block.md` file into its frontmatter and its Markdown. */
function readDocs(folder: string) {
  const file = readFileSync(
    path.join(blocksDir, folder, 'docs.block.md'),
    'utf8',
  );
  return {
    frontmatter: file.match(FRONTMATTER)?.[1] ?? '',
    markdown: file.replace(FRONTMATTER, '').trim(),
  };
}

/** Resolve a block's schema with the arguments `@blocks-schema` passes. */
function resolveSchema(block: BlockConfigBase): JSONSchema {
  const intl = createIntl({ locale: 'en', messages: {}, onError: () => {} });
  const data = { '@type': block.id };
  return (block.blockSchema as (args: unknown) => JSONSchema)({
    data,
    intl,
    props: { data },
  });
}

beforeAll(() => {
  config.settings.codeBlock = undefined;
  config.blocks.blocksConfig = {} as typeof config.blocks.blocksConfig;
  installSettings(config);
  installBlocks(config);
});

describe.each([
  ['Code', codeBlock],
  ['Gist', gistBlock],
  ['Mermaid', mermaidBlock],
] as const)('%s docs', (folder, block) => {
  const { frontmatter, markdown } = readDocs(folder);
  const examples = [...markdown.matchAll(/```json\n([\s\S]*?)\n```/g)].map(
    ([, json]) => JSON.parse(json),
  );
  const fields = () => [
    ...Object.keys(resolveSchema(block).properties),
    ...EDITED_IN_BLOCK[block.id],
  ];

  it('names the block by the id the registry keys it by', () => {
    expect(frontmatter).toBe(`block: ${block.id}`);
  });

  it('opens with a one-paragraph summary', () => {
    expect(markdown.split(/\n\s*\n/)[0]).not.toMatch(/^#|^-/);
  });

  it('nests its headings below the one the endpoint adds', () => {
    expect(markdown).not.toMatch(/^#{1,2} /m);
  });

  it('explains every field', () => {
    for (const field of fields()) {
      expect(markdown).toContain(`- \`${field}\`: `);
    }
  });

  it('only explains fields the block has', () => {
    const documented = [...markdown.matchAll(/^- `(\w+)`: /gm)].map(
      ([, field]) => field,
    );
    expect(fields()).toEqual(expect.arrayContaining(documented));
  });

  it('has a minimal example and one using every field', () => {
    expect(examples).toContainEqual({ '@type': block.id });
    expect(examples.flatMap(Object.keys)).toEqual(
      expect.arrayContaining(fields()),
    );
  });

  it('only has examples that are data for this block', () => {
    const known = ['@type', ...fields()];
    for (const example of examples) {
      expect(example['@type']).toBe(block.id);
      expect(known).toEqual(expect.arrayContaining(Object.keys(example)));
    }
  });
});

describe('Code docs placeholders', () => {
  it('refer to keys of the block configuration', () => {
    const { markdown } = readDocs('Code');
    const keys = [...markdown.matchAll(/\{\{(\w+)\}\}/g)].map(([, key]) => key);
    expect(keys).toEqual(['defaultLanguage', 'defaultStyle']);
    for (const key of keys) {
      expect(codeBlock).toHaveProperty(key);
    }
  });
});
