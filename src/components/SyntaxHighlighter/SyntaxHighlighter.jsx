// Languages: https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/src/languages/hljs/supported-languages.js
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import config from '@plone/volto/registry';

export const SyntaxHighlighterConfig = () => {
  const languages = config.settings.codeBlock.languages || [];
  languages.forEach(async (element, i) => {
    SyntaxHighlighter.registerLanguage(element[0], element[2]);
  });
  return SyntaxHighlighter;
};
