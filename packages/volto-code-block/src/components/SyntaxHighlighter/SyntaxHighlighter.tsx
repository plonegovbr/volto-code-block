import React, { useEffect } from 'react';
import Prism from '../../helpers/prism';
import { getGrammar } from '../../helpers/languages';

import cx from 'classnames';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

interface SyntaxHighlighterProps {
  language: string;
  code: string;
  showLineNumbers?: boolean;
  lineNbr?: number;
}

const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = (props) => {
  const { language, code, showLineNumbers, lineNbr } = props;
  const className = cx(`language-${language}`, {
    'line-numbers': showLineNumbers,
  });
  useEffect(() => {
    Prism.languages[language] = getGrammar(language);
    Prism.highlightAll();
  }, [language]);
  return (
    <pre className={className} data-start={lineNbr}>
      <code data-prismjs-copy-timeout="300">{code}</code>
    </pre>
  );
};

export default SyntaxHighlighter;
