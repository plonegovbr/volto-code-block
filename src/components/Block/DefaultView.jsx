import React from 'react';
import SyntaxHighlighter from '../SyntaxHighlighter/SyntaxHighlighter';

const CodeView = (props) => {
  const { data } = props;
  const {
    code,
    style,
    language,
    lineNbr,
    showLineNumbers,
    wrapLongLines,
  } = data;
  const styleWrap = wrapLongLines ? 'wrapLongLines' : '';
  const className = `code-block-wrapper ${style} ${styleWrap}`;

  return (
    <>
      {data && (
        <div className={'block code'}>
          <div className={className}>
            <SyntaxHighlighter
              code={code}
              language={language}
              showLineNumbers={showLineNumbers}
              lineNbr={lineNbr}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CodeView;
