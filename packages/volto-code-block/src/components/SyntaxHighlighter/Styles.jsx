import { defineMessages } from 'react-intl';

const messages = defineMessages({
  styleDark: {
    id: 'Dark',
    defaultMessage: 'Dark',
  },
  styleLight: {
    id: 'Light',
    defaultMessage: 'Light',
  },
});

const STYLES = [
  ['dark', messages.styleDark],
  ['light', messages.styleLight],
];

export default STYLES;
