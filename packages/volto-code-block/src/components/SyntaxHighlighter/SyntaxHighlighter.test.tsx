import React from 'react';
import { beforeAll, describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';
import installSettings from '../../config/settings';
import Prism from '../../helpers/prism';
import SyntaxHighlighter from './SyntaxHighlighter';

beforeAll(() => {
  installSettings(config);
});

describe('Prism', () => {
  it('does not highlight the page on its own', () => {
    expect(Prism.manual).toBe(true);
  });

  it('is the global instance, with the plugins', () => {
    expect((window as unknown as { Prism: unknown }).Prism).toBe(Prism);
    expect(Prism.plugins.lineNumbers).toBeDefined();
    expect(Prism.plugins.toolbar).toBeDefined();
  });
});

describe('SyntaxHighlighter', () => {
  const code = 'a = 1\nb = 2\nc = 3';

  // The block has a wrapper: the toolbar plugin moves the `pre` into its own.
  const setup = (showLineNumbers = false) =>
    render(
      <div>
        <SyntaxHighlighter
          code={code}
          language="python"
          showLineNumbers={showLineNumbers}
        />
      </div>,
    );

  it('highlights the code', () => {
    const { container } = setup();
    expect(container.querySelector('.token.number')?.textContent).toBe('1');
  });

  it('adds a line number for each line', () => {
    const { container } = setup(true);
    const rows = container.querySelector('pre .line-numbers-rows');
    expect(rows?.children).toHaveLength(3);
  });

  it('keeps the line numbers when the page is highlighted again', () => {
    const { container } = setup(true);
    Prism.highlightAll();
    expect(container.querySelectorAll('.line-numbers-rows')).toHaveLength(1);
  });

  it('adds no line numbers unless asked to', () => {
    const { container } = setup();
    expect(container.querySelector('.line-numbers-rows')).toBeNull();
  });
});
