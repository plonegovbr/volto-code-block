import React from 'react';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { gistSchema } from './schema';
import { useIntl } from 'react-intl';

const GistBlockData = (props) => {
  const { block, blocksConfig, data, onChangeBlock, navRoot, contentType } =
    props;
  const intl = useIntl();
  const schema = gistSchema({ ...props, intl });

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

export default GistBlockData;
