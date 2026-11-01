import { defineMessages } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

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

const STYLES: [string, MessageDescriptor][] = [
  ['dark', messages.styleDark],
  ['light', messages.styleLight],
];

export default STYLES;
