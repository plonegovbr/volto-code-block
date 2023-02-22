import React from 'react';
import { BlockDataForm } from '@plone/volto/components';
import { codeSchema } from './schema';
import { useIntl } from 'react-intl';

const CodeBlockData = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = codeSchema({ ...props, intl });

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

export default CodeBlockData;
