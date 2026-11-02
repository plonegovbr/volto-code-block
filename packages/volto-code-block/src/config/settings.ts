import type { ConfigType } from '@plone/registry';

// It has to be the first one: the components below register their grammars in
// the global `Prism`, and loading this module is what sets it to this instance.
import Prism from '../helpers/prism';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-less';
// import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-mermaid';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-yaml';
// They have to be the last ones (at least after markup)
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

export const { languages } = Prism;

export default function install(config: ConfigType) {
  config.settings.codeBlock = {
    languages: {
      plain: { label: 'Plaintext', language: languages.plain },
      bash: { label: 'Bash', language: languages.bash },
      css: { label: 'CSS', language: languages.css },
      dockerfile: { label: 'Dockerfile', language: languages.dockerfile },
      javascript: { label: 'JavaScript', language: languages.js },
      typescript: { label: 'TypeScript', language: languages.ts },
      jsx: { label: 'JSX', language: languages.jsx },
      tsx: { label: 'TSX', language: languages.tsx },
      json: { label: 'JSON', language: languages.json },
      less: { label: 'LESS', language: languages.less },
      markdown: { label: 'Markdown', language: languages.markdown },
      mermaid: { label: 'Mermaid', language: languages.mermaid },
      nginx: { label: 'nginx', language: languages.nginx },
      python: { label: 'Python', language: languages.python },
      scss: { label: 'SCSS', language: languages.scss },
      toml: { label: 'TOML', language: languages.toml },
      yaml: { label: 'Yaml', language: languages.yaml },
      xml: { label: 'XML', language: languages.xml },
    },
  };

  return config;
}
