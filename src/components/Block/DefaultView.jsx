import React from 'react';
import useCopy from 'use-copy';
import { SyntaxHighlighterConfig } from '../SyntaxHighlighter/SyntaxHighlighter';
import { Icon } from '@plone/volto/components';
import checkSVG from '@plone/volto/icons/check.svg';
import clipboardSVG from '@plone/volto/icons/copy.svg';

const CodeView = (props) => {
  const { data } = props;
  const { style, showLineNumbers, wrapLongLines } = data;
  const styleWrap = wrapLongLines ? 'wrapLongLines' : '';
  const className = `code-block-wrapper ${style} ${styleWrap}`;
  const [copied, copy, setCopied] = useCopy(data.code);
  const SyntaxHighlighter = SyntaxHighlighterConfig();

  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <>
      {data && (
        <div className={'block code'}>
          <div className={className}>
            {copied ? (
              <Icon name={checkSVG} className={'copy button copied'} />
            ) : (
              <Icon
                name={clipboardSVG}
                onClick={copyText}
                className={'copy button'}
              />
            )}
            <SyntaxHighlighter
              language={data.language}
              useInlineStyles={false}
              showLineNumbers={showLineNumbers}
              wrapLongLines={wrapLongLines}
            >
              {data.code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </>
  );
};

export default CodeView;
