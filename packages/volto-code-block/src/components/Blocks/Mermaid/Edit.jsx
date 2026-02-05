import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import config from '@plone/volto/registry';
import Editor from '../../Editor/Editor.tsx';
import { highlight } from 'prismjs/components/prism-core';
import MermaidBlockData from './Data';

const MermaidBlockEdit = (props) => {
  const { data, block, onChangeBlock, selected } = props;
  const [code, setCode] = React.useState(data.code || '');
  const className = `code-block-wrapper edit light`;
  const allLanguages = config.settings.codeBlock.languages;
  const language = allLanguages['mermaid'].language;

  const handleChange = (code) => {
    setCode(code);
    onChangeBlock(block, { ...data, code: code });
  };

  return (
    <>
      <div className="block code">
        <div className={className}>
          <Editor
            value={code}
            onValueChange={(code) => handleChange(code)}
            highlight={(code) => highlight(code, language)}
            padding={10}
            preClassName={`code-block-wrapper ${data.style} language-mermaid`}
          />
        </div>
      </div>
      <SidebarPortal selected={selected}>
        <MermaidBlockData {...props} />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(MermaidBlockEdit);
