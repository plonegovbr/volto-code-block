import React from 'react';
import { BlockDataForm } from '@plone/volto/components';
import { codeSchema } from './schema';
import { useIntl } from 'react-intl';

const CodeBlockData = (props) => {
  const { block, blocksConfig, data, onChangeBlock, navRoot, contentType } =
    props;

  const schema = codeSchema({ ...props });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      blocksConfig={blocksConfig}
      navRoot={navRoot}
      contentType={contentType}
    />
  );
};

export default CodeBlockData;
