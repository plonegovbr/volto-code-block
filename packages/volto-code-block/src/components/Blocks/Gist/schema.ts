import type { BlockSchemaProps, JSONSchema } from '@plone/types';
import { defineMessages } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  gistBlock: {
    id: 'Gist Block',
    defaultMessage: 'Gist Block',
  },
  gistId: {
    id: 'Gist Id',
    defaultMessage: 'Gist Id',
  },
  file: {
    id: 'File',
    defaultMessage: 'File',
  },
  caption_title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  caption_description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  size: {
    id: 'Size',
    defaultMessage: 'Size',
  },
});

export const gistSchema = (
  props: Pick<BlockSchemaProps, 'intl'>,
): JSONSchema => {
  const schema: JSONSchema = {
    title: props.intl.formatMessage(messages.gistBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['gistId', 'file'],
      },
      {
        id: 'caption',
        title: 'Caption',
        fields: ['caption_title', 'caption_description'],
      },
    ],

    properties: {
      gistId: {
        title: props.intl.formatMessage(messages.gistId),
      },
      file: {
        title: props.intl.formatMessage(messages.file),
      },
      caption_title: {
        title: props.intl.formatMessage(messages.caption_title),
      },
      caption_description: {
        title: props.intl.formatMessage(messages.caption_description),
        widget: 'textarea',
      },
    },
    required: ['gistId'],
  };
  // Add styling with alignment and size
  // `@plone/types` declares its own, narrower `IntlShape`.
  addStyling({ schema, intl: props.intl as unknown as IntlShape });
  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: props.intl.formatMessage(messages.align),
    actions: ['left', 'center', 'right'],
    default: 'center',
  };
  schema.properties.styles.schema.properties.size = {
    title: props.intl.formatMessage(messages.size),
    widget: 'image_size',
    default: 'l',
  };
  schema.properties.styles.schema.fieldsets[0].fields.push('align');
  schema.properties.styles.schema.fieldsets[0].fields.push('size');
  return schema;
};
