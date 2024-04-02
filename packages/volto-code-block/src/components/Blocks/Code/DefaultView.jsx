import React from 'react';
import SyntaxHighlighter from '../../SyntaxHighlighter/SyntaxHighlighter';
import Caption from '../../Caption/Caption';
import cx from 'classnames';

const CodeView = (props) => {
  const {
    className,
    code,
    style: codeStyle,
    language,
    lineNbr,
    showLineNumbers,
    wrapLongLines,
    caption_title,
    caption_description,
  } = props;
  const styleWrap = wrapLongLines ? 'wrapLongLines' : '';
  const codeClassName = `code-block-wrapper ${codeStyle} ${styleWrap}`;

  return (
    <>
      {code && (
        <div className={cx('block code', className)}>
          <div className={codeClassName}>
            <SyntaxHighlighter
              code={code}
              language={language}
              showLineNumbers={showLineNumbers}
              lineNbr={lineNbr}
            />
          </div>
        </div>
      )}
      {caption_title && (
        <Caption title={caption_title} description={caption_description} />
      )}
    </>
  );
};

export default CodeView;
