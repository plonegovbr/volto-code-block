import React from 'react';
import type {
  BlockEditProps,
  BlockSchemaProps,
  BlocksFormData,
  JSONSchema,
} from '@plone/types';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import config from '@plone/volto/registry';
import { useIntl } from 'react-intl';

export interface BlockDataProps
  extends Partial<
    Pick<
      BlockEditProps,
      'blocksConfig' | 'blocksErrors' | 'contentType' | 'navRoot'
    >
  > {
  data: BlocksFormData;
  block: string;
  onChangeBlock: (id: string, data: BlocksFormData) => void;
}

interface Props extends BlockDataProps {
  /** Used when the block configuration has no `blockSchema`. */
  defaultSchema: (props: Pick<BlockSchemaProps, 'intl'>) => JSONSchema;
}

/** Sidebar form of a block, built from its `blockSchema`. */
const BlockData: React.FC<Props> = (props) => {
  const {
    data,
    block,
    blocksConfig = config.blocks.blocksConfig,
    blocksErrors,
    contentType,
    defaultSchema,
    navRoot,
    onChangeBlock,
  } = props;
  const intl = useIntl();
  // `@plone/types` declares `IntlShape['messages']` more narrowly than the
  // `react-intl` Volto ships. Cast until that is fixed upstream.
  const schemaIntl = intl as BlockSchemaProps['intl'];
  const blockSchema =
    blocksConfig?.[data['@type']]?.blockSchema ?? defaultSchema;
  const schema =
    typeof blockSchema === 'function'
      ? blockSchema({ ...props, intl: schemaIntl })
      : blockSchema;

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id: string, value: unknown) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      navRoot={navRoot}
      contentType={contentType}
      errors={blocksErrors}
    />
  );
};

export default BlockData;
