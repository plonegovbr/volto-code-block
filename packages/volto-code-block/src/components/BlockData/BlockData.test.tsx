import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import type { BlocksFormData, JSONSchema } from '@plone/types';
import BlockData from './BlockData';
import type { BlockDataProps } from './BlockData';

// The types of `react-intl` 3 predate React 18 and do not declare `children`.
const Intl = IntlProvider as unknown as React.FC<
  React.PropsWithChildren<{ locale: string }>
>;

const form = vi.hoisted(() => ({ props: {} as Record<string, any> }));

vi.mock('@plone/volto/components/manage/Form', () => ({
  BlockDataForm: (props: Record<string, unknown>) => {
    form.props = props;
    return null;
  },
}));

const schema = (title: string): JSONSchema => ({
  title,
  fieldsets: [],
  properties: {},
  required: [],
});

const data = { '@type': 'codeBlock', code: 'x' } as BlocksFormData;

function renderForm(props: Partial<BlockDataProps> = {}) {
  const onChangeBlock = vi.fn();
  render(
    <Intl locale="en">
      <BlockData
        block="abc"
        blocksConfig={{} as BlockDataProps['blocksConfig']}
        data={data}
        defaultSchema={() => schema('default')}
        onChangeBlock={onChangeBlock}
        {...props}
      />
    </Intl>,
  );
  return onChangeBlock;
}

describe('BlockData', () => {
  beforeEach(() => {
    form.props = {};
  });

  it('prefers the schema of the block configuration', () => {
    renderForm({
      blocksConfig: {
        codeBlock: { blockSchema: () => schema('customized') },
      } as unknown as BlockDataProps['blocksConfig'],
    });
    expect(form.props.title).toBe('customized');
  });

  it('accepts a schema that is not a function', () => {
    renderForm({
      blocksConfig: {
        codeBlock: { blockSchema: schema('static') },
      } as unknown as BlockDataProps['blocksConfig'],
    });
    expect(form.props.title).toBe('static');
  });

  it('falls back to the default schema', () => {
    renderForm();
    expect(form.props.title).toBe('default');
  });

  it('hands the form the same props as core', () => {
    const blocksErrors = { abc: { code: ['Required'] } };
    const navRoot = { id: 'root' };
    const onChangeBlock = renderForm({
      blocksErrors,
      contentType: 'Document',
      navRoot,
    } as unknown as Partial<BlockDataProps>);
    expect(form.props).toMatchObject({
      block: 'abc',
      contentType: 'Document',
      errors: blocksErrors,
      formData: data,
      navRoot,
      onChangeBlock,
    });
  });

  it('merges a changed field into the block data', () => {
    const onChangeBlock = renderForm();
    form.props.onChangeField('language', 'python');
    expect(onChangeBlock).toHaveBeenCalledWith('abc', {
      ...data,
      language: 'python',
    });
  });
});
