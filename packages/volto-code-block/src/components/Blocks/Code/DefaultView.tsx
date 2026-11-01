import React from 'react';
import SyntaxHighlighter from '../../SyntaxHighlighter/SyntaxHighlighter';
import Caption from '../../Caption/Caption';
import config from '@plone/volto/registry';
import cx from 'classnames';
import type { CodeBlockConfig, CodeBlockFields } from './index';

interface CodeViewProps extends CodeBlockFields {
  className?: string;
}

const CodeView: React.FC<CodeViewProps> = (props) => {
  const blockConfig = config.blocks?.blocksConfig?.codeBlock as
    | CodeBlockConfig
    | undefined;
  // The same defaults as the schema, for data that skipped the sidebar form.
  const {
    className,
    code,
    style: codeStyle = blockConfig?.defaultStyle,
    language = blockConfig?.defaultLanguage,
    lineNbr = 1,
    showLineNumbers = true,
    wrapLongLines = true,
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
                language={language as string}
                showLineNumbers={showLineNumbers}
                lineNbr={lineNbr}
              />
            </div>
            {caption_title && (
              <Caption
                title={caption_title}
                description={caption_description}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CodeView;
