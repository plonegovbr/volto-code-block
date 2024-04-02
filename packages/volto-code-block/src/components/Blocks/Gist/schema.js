import { defineMessages } from 'react-intl';

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
});

export const gistSchema = (props) => {
  return {
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
};
