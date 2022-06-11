import { defineMessages } from 'react-intl';
import { LANGUAGES } from '../SyntaxHighlighter/SyntaxHighlighter';
import STYLES from '../SyntaxHighlighter/Styles';
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
});

export const codeSchema = (props) => {
  const defaultLanguage =
    config.blocks?.blocksConfig?.codeBlock?.defaultLanguage;
  const defaultStyle = config.blocks?.blocksConfig?.codeBlock?.defaultStyle;

  const availableLanguages = () => {
    return LANGUAGES.map((item) => [item[0], item[1]]);
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
        fields: ['language', 'style', 'showLineNumbers', 'wrapLongLines'],
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
    },
    required: ['language'],
  };
};
