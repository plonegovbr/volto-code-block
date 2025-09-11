import { cloneDeep } from 'lodash';
import codeSVG from '@plone/volto/icons/code.svg';
import showcaseSVG from '@plone/volto/icons/showcase.svg';

// Blocks - CodeBlock
import CodeBlockView from './components/Blocks/Code/View';
import CodeBlockEdit from './components/Blocks/Code/Edit';

// Blocks - MermaidBlock
import MermaidBlockEdit from './components/Blocks/Mermaid/Edit';
import MermaidBlockView from './components/Blocks/Mermaid/View';

// Blocks - GistBlock
import GistBlockEdit from './components/Blocks/Gist/Edit';
import GistBlockView from './components/Blocks/Gist/View';

import './theme/main.less';
import './theme/theme-dark.less';
import './theme/theme-light.less';

const applyConfig = (config) => {
  config.blocks.blocksConfig.codeBlock = {
    id: 'codeBlock',
    title: 'Code Block',
    icon: codeSVG,
    group: 'text',
    view: CodeBlockView,
    edit: CodeBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: true,
    defaultLanguage: 'python',
    defaultStyle: 'dark',
  };

  config.blocks.blocksConfig.mermaidBlock = {
    id: 'mermaidBlock',
    title: 'Mermaid Diagram',
    icon: showcaseSVG,
    group: 'text',
    view: MermaidBlockView,
    edit: MermaidBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 0,
    blockHasOwnFocusManagement: true,
  };

  config.blocks.blocksConfig.gistBlock = {
    id: 'gistBlock',
    title: 'Gist Block',
    icon: codeSVG,
    group: 'text',
    view: GistBlockView,
    edit: GistBlockEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: false,
  };

  // Default configuration - backwards compatible
  if (!config.settings['codeBlock']) {
    config.settings['codeBlock'] = {
      languages: {
        // Core languages - backwards compatible format
        text: { label: 'Plain Text' },
        bash: { label: 'Bash / Shell' },
        c: { label: 'C' },
        cpp: { label: 'C++' },
        csharp: { label: 'C#' },
        css: { label: 'CSS' },
        diff: { label: 'Diff' },
        dockerfile: { label: 'Dockerfile' },
        go: { label: 'Go' },
        html: { label: 'HTML' },
        java: { label: 'Java' },
        javascript: { label: 'JavaScript' },
        jsx: { label: 'JSX' },
        json: { label: 'JSON' },
        kotlin: { label: 'Kotlin' },
        less: { label: 'LESS' },
        lua: { label: 'Lua' },
        makefile: { label: 'Makefile' },
        markdown: { label: 'Markdown' },
        mermaid: { label: 'Mermaid' },
        objectivec: { label: 'Objective-C' },
        perl: { label: 'Perl' },
        php: { label: 'PHP' },
        python: { label: 'Python' },
        ruby: { label: 'Ruby' },
        rust: { label: 'Rust' },
        scss: { label: 'SCSS/Sass' },
        sql: { label: 'SQL' },
        swift: { label: 'Swift' },
        typescript: { label: 'TypeScript' },
        xml: { label: 'XML' },
        yaml: { label: 'YAML' },

        // Modern frameworks and libraries
        tsx: { label: 'TSX (React TypeScript)' },
        vue: { label: 'Vue.js' },
        svelte: { label: 'Svelte' },
        graphql: { label: 'GraphQL' },

        // DevOps and Configuration
        docker: { label: 'Docker Compose' },
        nginx: { label: 'Nginx' },
        apache: { label: 'Apache Config' },
        terraform: { label: 'Terraform' },
        ansible: { label: 'Ansible' },
        kubernetes: { label: 'Kubernetes' },

        // Data formats
        toml: { label: 'TOML' },
        ini: { label: 'INI' },
        properties: { label: 'Properties' },
        csv: { label: 'CSV' },

        // Shell scripts
        powershell: { label: 'PowerShell' },
        batch: { label: 'Batch' },
        fish: { label: 'Fish Shell' },
        zsh: { label: 'Zsh' },

        // Functional languages
        haskell: { label: 'Haskell' },
        clojure: { label: 'Clojure' },
        erlang: { label: 'Erlang' },
        elixir: { label: 'Elixir' },
        fsharp: { label: 'F#' },
        ocaml: { label: 'OCaml' },
        elm: { label: 'Elm' },
        scala: { label: 'Scala' },

        // Systems programming
        assembly: { label: 'Assembly' },
        nasm: { label: 'NASM Assembly' },
        llvm: { label: 'LLVM IR' },

        // Web technologies
        handlebars: { label: 'Handlebars' },
        pug: { label: 'Pug' },
        ejs: { label: 'EJS' },
        twig: { label: 'Twig' },
        django: { label: 'Django Template' },
        jinja2: { label: 'Jinja2' },

        // Mobile development
        dart: { label: 'Dart' },
        flutter: { label: 'Flutter' },
        solidity: { label: 'Solidity' },

        // Scientific computing
        r: { label: 'R' },
        matlab: { label: 'MATLAB' },
        julia: { label: 'Julia' },
        latex: { label: 'LaTeX' },

        // Esoteric and legacy
        cobol: { label: 'COBOL' },
        fortran: { label: 'Fortran' },
        pascal: { label: 'Pascal' },
        ada: { label: 'Ada' },
        scheme: { label: 'Scheme' },
        prolog: { label: 'Prolog' },

        // Markup and documentation
        asciidoc: { label: 'AsciiDoc' },
        restructuredtext: { label: 'reStructuredText' },
        wiki: { label: 'Wiki markup' },
      },
    };
  }

  // Add Blocks to gridBlock and accordionBlock
  // It's important to maintain the chain, and do not introduce pass by reference in
  // the internal `blocksConfig` object, so we clone the object to avoid this.
  ['gridBlock', 'accordion'].forEach((blockId) => {
    const block = config.blocks.blocksConfig[blockId];
    if (
      block !== undefined &&
      block.allowedBlocks !== undefined &&
      block.blocksConfig !== undefined
    ) {
      block.allowedBlocks = [
        ...block.allowedBlocks,
        'codeBlock',
        'mermaidBlock',
        'gistBlock',
      ];
      block.blocksConfig.codeBlock = cloneDeep(
        config.blocks.blocksConfig.codeBlock,
      );
      block.blocksConfig.mermaidBlock = cloneDeep(
        config.blocks.blocksConfig.mermaidBlock,
      );
      block.blocksConfig.gistBlock = cloneDeep(
        config.blocks.blocksConfig.gistBlock,
      );
    }
  });
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['de', 'en'];
  config.settings.defaultLanguage = 'de';
  return config;
};

export default applyConfig;
