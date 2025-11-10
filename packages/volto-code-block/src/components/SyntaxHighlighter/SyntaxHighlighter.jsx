import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import config from '@plone/volto/registry';

import cx from 'classnames';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

const SyntaxHighlighter = (props) => {
  const { language, code, showLineNumbers, lineNbr } = props;
  const preRef = useRef(null);
  const className = cx(`language-${language}`, {
    'line-numbers': showLineNumbers,
  });
  const allLanguages = config.settings.codeBlock.languages;
  
  useEffect(() => {
    Prism.languages[language] = allLanguages[language].language;
    Prism.highlightAll();
    
    // Force line numbers plugin to recalculate after a short delay
    if (showLineNumbers) {
      setTimeout(() => {
        // Dispatch a resize event to trigger line numbers recalculation
        window.dispatchEvent(new Event('resize'));
      }, 10);
    }
  }, [allLanguages, language, showLineNumbers]);
  
  return (
    <pre ref={preRef} className={className} data-start={lineNbr}>
      <code data-prismjs-copy-timeout="300">{code}</code>
    </pre>
  );
};

export default SyntaxHighlighter;
