import React from 'react';
import SyntaxHighlighter from '../../SyntaxHighlighter/SyntaxHighlighter';
import Caption from '../../Caption/Caption';

const CodeView = (props) => {
  const { data } = props;
  const { code, style, language, lineNbr, showLineNumbers, wrapLongLines } = data;
  const { caption_title, caption_description } = data;
  const styleWrap = wrapLongLines ? 'wrapLongLines' : '';
  const className = `code-block-wrapper ${style} ${styleWrap}`;

  return (
    <>
      {data && (
        <div className={'block code'}>
          <div className={className}>
            <SyntaxHighlighter code={code} language={language} showLineNumbers={showLineNumbers} lineNbr={lineNbr} />
          </div>
        </div>
      )}
      {caption_title && <Caption title={caption_title} description={caption_description} />}
    </>
  );
};

export default CodeView;
