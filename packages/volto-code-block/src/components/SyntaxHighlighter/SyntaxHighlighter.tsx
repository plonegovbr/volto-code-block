import React, { useEffect, useRef } from 'react';
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
  const preRef = useRef<HTMLPreElement>(null);
  useEffect(() => {
    Prism.languages[language] = getGrammar(language);
    Prism.highlightAll();
  }, [language]);
  // Prism measures the lines when it highlights, and a `pre` that is not
  // displayed yet, as in a closed accordion panel, measures 0.
  useEffect(() => {
    const pre = preRef.current;
    if (!pre || !showLineNumbers || typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(() => {
      if (pre.offsetHeight > 0) {
        Prism.plugins.lineNumbers.resize(pre);
      }
    });
    observer.observe(pre);
    return () => observer.disconnect();
  }, [showLineNumbers]);
  return (
    <pre ref={preRef} className={className} data-start={lineNbr}>
      <code data-prismjs-copy-timeout="300">{code}</code>
    </pre>
  );
};

export default SyntaxHighlighter;
