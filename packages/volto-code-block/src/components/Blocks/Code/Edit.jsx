import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';
import config from '@plone/volto/registry';
import CodeBlockData from './Data';
import Caption from '../../Caption/Caption.jsx';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import diff from 'highlight.js/lib/languages/diff';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import kotlin from 'highlight.js/lib/languages/kotlin';
import less from 'highlight.js/lib/languages/less';
import lua from 'highlight.js/lib/languages/lua';
import makefile from 'highlight.js/lib/languages/makefile';
import markdown from 'highlight.js/lib/languages/markdown';
import objectivec from 'highlight.js/lib/languages/objectivec';
import perl from 'highlight.js/lib/languages/perl';
import php from 'highlight.js/lib/languages/php';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import scss from 'highlight.js/lib/languages/scss';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import nginx from 'highlight.js/lib/languages/nginx';
import powershell from 'highlight.js/lib/languages/powershell';
import r from 'highlight.js/lib/languages/r';
import 'highlight.js/styles/github.css';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('c', c);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('diff', diff);
hljs.registerLanguage('go', go);
hljs.registerLanguage('java', java);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('less', less);
hljs.registerLanguage('lua', lua);
hljs.registerLanguage('makefile', makefile);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('objectivec', objectivec);
hljs.registerLanguage('perl', perl);
hljs.registerLanguage('php', php);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('powershell', powershell);
hljs.registerLanguage('r', r);

// Register aliases
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('text', () => ({})); // Plain text
hljs.registerLanguage('docker', dockerfile);
hljs.registerLanguage('batch', powershell);
hljs.registerLanguage('fish', bash);
hljs.registerLanguage('zsh', bash);

const CodeBlockEdit = (props) => {
  const { data, selected, block, onChangeBlock } = props;
  const [code, setCode] = React.useState(data.code || '');
  const codeRef = React.useRef(null);
  const cursorPositionRef = React.useRef(0);
  const className = `code-block-wrapper edit ${data.style}`;
  const codeBlockConfig = config.blocks?.blocksConfig?.codeBlock;
  const defaultLanguage = codeBlockConfig?.defaultLanguage;
  const defaultStyle = codeBlockConfig?.defaultStyle;
  if (data.language === undefined) {
    data.language = defaultLanguage;
    data.style = defaultStyle;
  }
  const allLanguages = config.settings.codeBlock.languages;
  const language =
    data.language && allLanguages[data.language]
      ? data.language
      : defaultLanguage || 'javascript';

  // Create highlight function using highlight.js
  const highlightCode = (code) => {
    if (!code) return code;
    try {
      const result = hljs.highlight(code, { language: language });
      return result.value;
    } catch (err) {
      // Fallback to auto-detection or plain text
      try {
        const result = hljs.highlightAuto(code);
        return result.value;
      } catch (err2) {
        // Return code with basic escaping
        return code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
    }
  };

  const { caption_title, caption_description } = data;

  // Save and restore cursor position
  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(codeRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    }
    return 0;
  };

  const restoreCursorPosition = (position) => {
    const selection = window.getSelection();
    const range = document.createRange();
    let charCount = 0;
    let nodeStack = [codeRef.current];
    let node;
    let foundStart = false;

    while (!foundStart && (node = nodeStack.pop())) {
      if (node.nodeType === Node.TEXT_NODE) {
        const nextCharCount = charCount + node.textContent.length;
        if (position >= charCount && position <= nextCharCount) {
          range.setStart(node, position - charCount);
          range.setEnd(node, position - charCount);
          foundStart = true;
        }
        charCount = nextCharCount;
      } else {
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    if (foundStart) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleChange = (newCode) => {
    const cursorPosition = saveCursorPosition();
    cursorPositionRef.current = cursorPosition;
    setCode(newCode);
    onChangeBlock(block, { ...data, code: newCode });
  };

  // Restore cursor position after re-render
  React.useLayoutEffect(() => {
    if (cursorPositionRef.current > 0) {
      restoreCursorPosition(cursorPositionRef.current);
      cursorPositionRef.current = 0;
    }
  }, [code]);

  const renderLineNumbers = () => {
    if (!data.showLineNumbers) return null;
    
    const lines = code.split('\n');
    const startNum = parseInt(data.lineNbr, 10) || 1;
    
    return (
      <div className="line-numbers">
        {lines.map((_, index) => (
          <span key={index} className="line-number">
            {startNum + index}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="block code">
      <div className={className}>
        <div className={`code-editor-container ${data.showLineNumbers ? 'with-line-numbers' : ''}`}>
          {renderLineNumbers()}
          <pre className={`code-editor-with-highlighting language-${language}`}>
            <code
              ref={codeRef}
              className={`language-${language}`}
              contentEditable
              suppressContentEditableWarning={true}
              onInput={(e) => handleChange(e.target.textContent)}
              style={{
                fontFamily:
                  'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                fontSize: '14px',
                lineHeight: '1.4',
                outline: 'none',
                whiteSpace: 'pre-wrap',
                minHeight: '200px',
                display: 'block',
                padding: '15px',
                margin: 0,
                border: 0,
              }}
              dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
            />
          </pre>
        </div>

        {caption_title && (
          <Caption title={caption_title} description={caption_description} />
        )}
        <SidebarPortal selected={selected}>
          <CodeBlockData {...props} />
        </SidebarPortal>
      </div>
    </div>
  );
};

export default withBlockExtensions(CodeBlockEdit);
