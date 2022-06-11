// Languages: https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/src/languages/hljs/supported-languages.js
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

import bash from 'react-syntax-highlighter/dist/cjs/languages/hljs/bash';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import dockerfile from 'react-syntax-highlighter/dist/cjs/languages/hljs/dockerfile';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json';
import less from 'react-syntax-highlighter/dist/cjs/languages/hljs/less';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown';
import nginx from 'react-syntax-highlighter/dist/cjs/languages/hljs/nginx';
import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
import scss from 'react-syntax-highlighter/dist/cjs/languages/hljs/scss';
import xml from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/hljs/yaml';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('dockerfile', dockerfile);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('less', less);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('nginx', nginx);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('yaml', yaml);

const LANGUAGES = [
  ['bash', 'Bash'],
  ['css', 'CSS'],
  ['dockerfile', 'Dockerfile'],
  ['javascript', 'Javascript'],
  ['json', 'JSON'],
  ['less', 'LESS'],
  ['markdown', 'Markdown'],
  ['nginx', 'nginx'],
  ['python', 'Python'],
  ['scss', 'SCSS'],
  ['yaml', 'Yaml'],
  ['xml', 'XML'],
];

export { LANGUAGES, SyntaxHighlighter };
