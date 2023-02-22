import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';
import config from '@plone/volto/registry';
import CodeBlockData from './Data';
import Editor from '../../Editor/Editor.tsx';
import { highlight } from 'prismjs/components/prism-core';

const CodeBlockEdit = (props) => {
  const { data, selected, block, onChangeBlock } = props;
  const [code, setCode] = React.useState(data.code || '');
  const className = `code-block-wrapper edit ${data.style}`;
  const codeBlockConfig = config.blocks?.blocksConfig?.codeBlock;
  const defaultLanguage = codeBlockConfig?.defaultLanguage;
  const defaultStyle = codeBlockConfig?.defaultStyle;
  if (data.language === undefined) {
    data.language = defaultLanguage;
    data.style = defaultStyle;
  }
  const allLanguages = config.settings.codeBlock.languages;
  const language = allLanguages[data.language].language;

  const handleChange = (code) => {
    setCode(code);
    onChangeBlock(block, { ...data, code: code });
  };

  return (
    <div className="block code">
      <div className={className}>
        <Editor
          value={code}
          onValueChange={(code) => handleChange(code)}
          highlight={(code) => highlight(code, language)}
          padding={10}
          preClassName={`code-block-wrapper ${data.style} language-${data.language}`}
        />
        <SidebarPortal selected={selected}>
          <CodeBlockData {...props} />
        </SidebarPortal>
      </div>
    </div>
  );
};

export default withBlockExtensions(CodeBlockEdit);
