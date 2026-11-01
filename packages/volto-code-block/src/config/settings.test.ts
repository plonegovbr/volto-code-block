import { describe, expect, it } from 'vitest';
import type { ConfigType } from '@plone/registry';
import type { CodeBlockSettings } from '../helpers/languages';
import applyConfig, { languages as exported } from '../index';
import install, { languages } from './settings';

function installSettings() {
  const config = { settings: {} } as unknown as ConfigType;
  install(config);
  return config.settings.codeBlock as CodeBlockSettings;
}

describe('settings config', () => {
  it('labels every language', () => {
    for (const { label } of Object.values(installSettings().languages)) {
      expect(label).toBeTruthy();
    }
  });

  it('references the Prism grammars', () => {
    const settings = installSettings();
    expect(settings.languages.python.language).toBe(languages.python);
    // `prism-markdown` is not imported, so there is no grammar for it.
    const missing = Object.entries(settings.languages)
      .filter(([, { language }]) => language === undefined)
      .map(([key]) => key);
    expect(missing).toEqual(['markdown']);
  });

  it('keeps the languages available from the package', () => {
    expect(exported).toBe(languages);
  });

  it('installs both the settings and the blocks', () => {
    const config = {
      settings: {},
      blocks: { blocksConfig: {} },
    } as unknown as ConfigType;
    const result = applyConfig(config);
    expect(result).toBe(config);
    expect(result.settings.codeBlock).toBeDefined();
    expect(result.blocks.blocksConfig.codeBlock).toBeDefined();
  });
});
