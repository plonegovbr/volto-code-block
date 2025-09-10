import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import Editor from '../../Editor/Editor.tsx';
import Prism from 'prismjs/components/prism-core';

// Register mermaid as a simple text language for Prism.js
Prism.languages.mermaid = Prism.languages.text;

const MermaidBlockEdit = (props) => {
  const { data, block, onChangeBlock } = props;
  const [code, setCode] = React.useState(data.code || '');
  const className = `code-block-wrapper edit light`;
  const language = 'mermaid';

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
          highlight={(code) => Prism.highlight(code, Prism.languages.mermaid, language)}
          padding={10}
          preClassName={`code-block-wrapper ${data.style} language-mermaid`}
        />
      </div>
    </div>
  );
};

export default withBlockExtensions(MermaidBlockEdit);
