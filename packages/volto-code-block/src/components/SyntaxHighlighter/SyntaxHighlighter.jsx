import React, { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
// Import all common languages
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

import config from '@plone/volto/registry';

// Register all languages
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

const SyntaxHighlighter = (props) => {
  const { language, code, showLineNumbers, lineNbr } = props;

  const highlightCode = () => {
    try {
      const result = hljs.highlight(code, { language: language || 'javascript' });
      return result.value;
    } catch (err) {
      try {
        const result = hljs.highlightAuto(code);
        return result.value;
      } catch (err2) {
        return code;
      }
    }
  };

  const processCodeWithLineNumbers = () => {
    if (!showLineNumbers) {
      return highlightCode();
    }
    
    const lines = code.split('\n');
    // Remove only the last empty line if it exists
    if (lines.length > 1 && lines[lines.length - 1] === '') {
      lines.pop();
    }
    const startNum = parseInt(lineNbr, 10) || 1;
    
    // Process each line individually and add line numbers
    const processedLines = lines.map((line, index) => {
      try {
        const result = hljs.highlight(line, { language: language || 'javascript' });
        return `<span class="code-line" data-line="${startNum + index}">${result.value}</span>`;
      } catch (err) {
        try {
          const result = hljs.highlightAuto(line);
          return `<span class="code-line" data-line="${startNum + index}">${result.value}</span>`;
        } catch (err2) {
          return `<span class="code-line" data-line="${startNum + index}">${line}</span>`;
        }
      }
    });
    
    return processedLines.join('\n');
  };

  return (
    <div className={`code-editor-container ${showLineNumbers ? 'with-line-numbers' : ''}`}>
      <pre className={`code-editor-with-highlighting language-${language || 'text'}`}>
        <code
          className={`language-${language || 'text'}`}
          style={{
            fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
            fontSize: '14px',
            lineHeight: '1.4',
            display: 'block',
            padding: showLineNumbers ? '15px 15px 15px 60px' : '15px',
            margin: 0,
            border: 0,
          }}
          dangerouslySetInnerHTML={{ __html: showLineNumbers ? processCodeWithLineNumbers() : highlightCode() }}
        />
      </pre>
    </div>
  );
};

export default SyntaxHighlighter;
