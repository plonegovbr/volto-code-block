import React from 'react';
import { BlockDataForm } from '@plone/volto/components';
import { gistSchema } from './schema';
import { useIntl } from 'react-intl';

const GistBlockData = (props) => {
  const { data, block, onChangeBlock } = props;
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
      formData={data}
      block={block}
    />
  );
};

export default GistBlockData;
