import { afterEach, describe, expect, it } from 'vitest';
import config from '@plone/volto/registry';
import { getGrammar, getLanguages } from './languages';

const python = { comment: /#.*/ };

describe('languages', () => {
  afterEach(() => {
    config.settings.codeBlock = undefined;
  });

  it('has no languages before the settings are installed', () => {
    expect(getLanguages()).toEqual({});
    expect(getGrammar('python')).toEqual({});
  });

  describe('with languages', () => {
    const install = () => {
      config.settings.codeBlock = {
        languages: {
          python: { label: 'Python', language: python },
          markdown: { label: 'Markdown', language: undefined },
        },
      };
    };

    it('returns the grammar of a language', () => {
      install();
      expect(getGrammar('python')).toBe(python);
    });

    it.each([[undefined], ['cobol'], ['markdown']])(
      'falls back to plain text for %s',
      (language) => {
        install();
        expect(getGrammar(language)).toEqual({});
      },
    );
  });
});
