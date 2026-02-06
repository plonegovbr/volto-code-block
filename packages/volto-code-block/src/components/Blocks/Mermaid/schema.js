import { defineMessages } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

const messages = defineMessages({
  mermaidBlock: {
    id: 'Mermaid Diagram',
    defaultMessage: 'Mermaid Diagram',
  },
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  alignLeft: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  alignCenter: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  alignRight: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  caption_title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  caption_description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  caption: {
    id: 'Caption',
    defaultMessage: 'Caption',
  },
  size: {
    id: 'Size',
    defaultMessage: 'Size',
  },
});

export const mermaidSchema = (props) => {
  const schema = {
    title: props.intl.formatMessage(messages.mermaidBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [],
      },
      {
        id: 'caption',
        title: props.intl.formatMessage(messages.caption),
        fields: ['caption_title', 'caption_description'],
      },
    ],
    properties: {
      caption_title: {
        title: props.intl.formatMessage(messages.caption_title),
      },
      caption_description: {
        title: props.intl.formatMessage(messages.caption_description),
        widget: 'textarea',
      },
    },
    required: [],
  };
  // Add styling with alignment
  addStyling({ schema, intl: props.intl });
  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: props.intl.formatMessage(messages.align),
    actions: ['left', 'center', 'right'],
    default: 'center',
  };
  schema.properties.styles.schema.fieldsets[0].fields.push('align');
  return schema;
};
