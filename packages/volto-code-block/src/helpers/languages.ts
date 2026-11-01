import config from '@plone/volto/registry';

export interface CodeBlockLanguage {
  /** Friendly name of the language, shown in the block settings. */
  label: string;
  /** Reference to the `prismjs` language component. */
  language: unknown;
}

export interface CodeBlockSettings {
  languages: Record<string, CodeBlockLanguage>;
}

/** Languages registered in `config.settings.codeBlock`. */
export const getLanguages = (): CodeBlockSettings['languages'] =>
  (config.settings.codeBlock as CodeBlockSettings | undefined)?.languages ?? {};

/**
 * Grammar of a language, or the plain text one when there is none: a language
 * can be unset or unknown in data that did not come from the sidebar form.
 */
export const getGrammar = (language?: string): unknown => {
  const languages = getLanguages();
  return languages[language as string]?.language ?? languages.plain?.language;
};
