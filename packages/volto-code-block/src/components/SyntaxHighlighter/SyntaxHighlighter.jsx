import React, { useEffect } from 'react';
import Prism from 'prismjs';
import config from '@plone/volto/registry';

import cx from 'classnames';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

const SyntaxHighlighter = (props) => {
  const { language, code, showLineNumbers, lineNbr } = props;
  const className = cx(`language-${language}`, {
    'line-numbers': showLineNumbers,
  });
  const allLanguages = config.settings.codeBlock.languages;
  useEffect(() => {
    Prism.languages[language] = allLanguages[language].language;
    Prism.highlightAll();
  }, [allLanguages, language]);
  return (
    <pre className={className} data-start={lineNbr}>
      <code data-prismjs-copy-timeout="300">{code}</code>
    </pre>
  );
};

export default SyntaxHighlighter;
