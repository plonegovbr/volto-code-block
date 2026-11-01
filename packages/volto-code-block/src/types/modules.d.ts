declare const __CLIENT__: boolean;

declare module '*.less';

declare module 'mermaid/dist/mermaid.esm.mjs';

declare module 'prismjs/components/prism-*';

declare module 'prismjs/components/prism-core' {
  export const languages: Record<string, unknown>;
  export function highlight(code: string, grammar: unknown): string;
}

declare module 'prismjs/plugins/*';

declare module 'prismjs' {
  const Prism: {
    languages: Record<string, unknown>;
    highlightAll: () => void;
  };
  export default Prism;
}

declare module 'react-gist' {
  import type { ComponentType } from 'react';
  const Gist: ComponentType<{ id: string; file?: string }>;
  export default Gist;
}
