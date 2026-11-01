import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import Editor from '../../Editor/Editor';
import { getGrammar } from '../../../helpers/languages';
import { highlight } from 'prismjs/components/prism-core';
import MermaidBlockData from './Data';
import type { BlockDataProps } from '../../BlockData/BlockData';
import type { MermaidBlockData as Data } from './index';

interface MermaidBlockEditProps extends BlockDataProps {
  data: Data;
  selected: boolean;
}

const MermaidBlockEdit: React.FC<MermaidBlockEditProps> = (props) => {
  const { data, block, onChangeBlock, selected } = props;
  const [code, setCode] = React.useState(data.code || '');
  const className = `code-block-wrapper edit light`;
  const language = getGrammar('mermaid');

  const handleChange = (code: string) => {
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
