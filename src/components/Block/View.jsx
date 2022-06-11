import React from 'react';
import useCopy from 'use-copy';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SyntaxHighlighter } from '../SyntaxHighlighter/SyntaxHighlighter';
import { Icon } from '@plone/volto/components';
import checkSVG from '@plone/volto/icons/check.svg';
import clipboardSVG from '@plone/volto/icons/copy.svg';

const CodeBlockView = (props) => {
  const { data } = props;
  const className = `code-block-wrapper ${data.style}`;
  const [copied, copy, setCopied] = useCopy(data.code);

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
              showLineNumbers={data.showLineNumbers}
              wrapLongLines={data.wrapLongLines}
            >
              {data.code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </>
  );
};

export default withBlockExtensions(CodeBlockView);
