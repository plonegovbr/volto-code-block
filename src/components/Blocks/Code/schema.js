import { defineMessages } from 'react-intl';
import STYLES from '../../SyntaxHighlighter/Styles';
import config from '@plone/volto/registry';

const messages = defineMessages({
  codeBlock: {
    id: 'Code Block',
    defaultMessage: 'Code Block',
  },
  language: {
    id: 'Language',
    defaultMessage: 'Language',
  },
  style: {
    id: 'Style',
    defaultMessage: 'Style',
  },
  showLineNumbers: {
    id: 'Show Line Numbers',
    defaultMessage: 'Show Line Numbers',
  },
  wrapLongLines: {
    id: 'Wrap Long Lines',
    defaultMessage: 'Wrap Long Lines',
  },
  lineNbr: {
    id: 'Starting Line Number',
    defaultMessage: 'Starting Line Number',
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

export const codeSchema = (props) => {
  const defaultLanguage =
    config.blocks?.blocksConfig?.codeBlock?.defaultLanguage;
  const defaultStyle = config.blocks?.blocksConfig?.codeBlock?.defaultStyle;

  const availableLanguages = () => {
    const allLanguages = config.settings.codeBlock.languages || {};
    const languages = Array.from(
      Object.entries(allLanguages),
      ([key, value]) => {
        return [key, value.label];
      },
    );
    return languages;
  };

  const availableStyles = () => {
    return STYLES.map((item) => [item[0], props.intl.formatMessage(item[1])]);
  };

  return {
    title: props.intl.formatMessage(messages.codeBlock),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'language',
          'style',
          'showLineNumbers',
          'wrapLongLines',
          'lineNbr',
        ],
      },
      {
        id: 'caption',
        title: 'Caption',
        fields: ['caption_title', 'caption_description'],
      },
    ],

    properties: {
      language: {
        title: props.intl.formatMessage(messages.language),
        choices: availableLanguages(),
        default: defaultLanguage,
        noValueOption: false,
      },
      style: {
        title: props.intl.formatMessage(messages.style),
        choices: availableStyles(),
        default: defaultStyle,
        noValueOption: false,
      },
      showLineNumbers: {
        title: props.intl.formatMessage(messages.showLineNumbers),
        default: true,
        type: 'boolean',
      },
      wrapLongLines: {
        title: props.intl.formatMessage(messages.wrapLongLines),
        default: true,
        type: 'boolean',
      },
      lineNbr: {
        title: props.intl.formatMessage(messages.lineNbr),
        type: 'integer',
        default: 1,
      },
      caption_title: {
        title: props.intl.formatMessage(messages.caption_title),
      },
      caption_description: {
        title: props.intl.formatMessage(messages.caption_description),
        widget: 'textarea',
      },
    },
    required: ['language'],
  };
};
