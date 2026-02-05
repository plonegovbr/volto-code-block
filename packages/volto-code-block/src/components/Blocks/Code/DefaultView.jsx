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
    styles = {},
  } = props;
  const align = styles?.align || 'center';
  const size = styles?.size || 'l';
  const styleWrap = wrapLongLines ? 'wrapLongLines' : '';
  const codeClassName = `code-block-wrapper ${codeStyle} ${styleWrap}`;

  return (
    <>
      {code && (
        <div className={cx('block code', className, `align-${align}`)}>
          <div className={`code-content-wrapper block-${size}`}>
            <div className={codeClassName}>
              <SyntaxHighlighter
                code={code}
                language={language}
                showLineNumbers={showLineNumbers}
                lineNbr={lineNbr}
              />
            </div>
            {caption_title && (
              <Caption title={caption_title} description={caption_description} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CodeView;
