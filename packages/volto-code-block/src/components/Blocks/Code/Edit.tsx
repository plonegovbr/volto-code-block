import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import config from '@plone/volto/registry';
import CodeBlockData from './Data';
import Caption from '../../Caption/Caption';
import Editor from '../../Editor/Editor';
import { getGrammar } from '../../../helpers/languages';
import { highlight } from 'prismjs/components/prism-core';
import type { BlockDataProps } from '../../BlockData/BlockData';
import type { CodeBlockConfig, CodeBlockData as Data } from './index';

interface CodeBlockEditProps extends BlockDataProps {
  data: Data;
  selected: boolean;
}

const CodeBlockEdit: React.FC<CodeBlockEditProps> = (props) => {
  const { data, selected, block, onChangeBlock } = props;
  const [code, setCode] = React.useState(data.code || '');
  const styles = data.styles || {};
  const align = styles?.align || 'center';
  const size = styles?.size || 'l';
  const className = `code-block-wrapper edit ${data.style}`;
  const { defaultLanguage, defaultStyle } = config.blocks.blocksConfig
    .codeBlock as CodeBlockConfig;
  if (data.language === undefined) {
    data.language = defaultLanguage;
    data.style = defaultStyle;
  }
  const language = getGrammar(data.language);
  const { caption_title, caption_description } = data;
  const handleChange = (code: string) => {
    setCode(code);
    onChangeBlock(block, { ...data, code: code });
  };

  return (
    <div className={`block code align-${align}`}>
      <div className={`code-content-wrapper block-${size}`}>
        <div className={className}>
          <Editor
            value={code}
            onValueChange={(code) => handleChange(code)}
            highlight={(code) => highlight(code, language)}
            padding={10}
            preClassName={`code-block-wrapper ${data.style} language-${data.language}`}
          />
        </div>
        {caption_title && (
          <Caption title={caption_title} description={caption_description} />
        )}
      </div>
      <SidebarPortal selected={selected}>
        <CodeBlockData {...props} />
      </SidebarPortal>
    </div>
  );
};

export default withBlockExtensions(CodeBlockEdit);
