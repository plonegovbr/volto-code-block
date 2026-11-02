import React from 'react';
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
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

  describe('when the size of the code changes', () => {
    let notify: () => void;
    const disconnect = vi.fn();

    beforeEach(() => {
      disconnect.mockClear();
      vi.stubGlobal(
        'ResizeObserver',
        class {
          constructor(callback: () => void) {
            notify = callback;
          }
          observe() {}
          disconnect = disconnect;
        },
      );
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    });

    const displayed = (height: number) =>
      vi
        .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
        .mockReturnValue(height);

    it('sizes the line numbers once the code is displayed', () => {
      const { container } = setup(true);
      const resize = vi.spyOn(Prism.plugins.lineNumbers, 'resize');
      displayed(100);
      notify();
      expect(resize).toHaveBeenCalledWith(container.querySelector('pre'));
    });

    it('does not measure code that is hidden', () => {
      setup(true);
      const resize = vi.spyOn(Prism.plugins.lineNumbers, 'resize');
      displayed(0);
      notify();
      expect(resize).not.toHaveBeenCalled();
    });

    it('stops observing when the block is removed', () => {
      const { unmount } = setup(true);
      unmount();
      expect(disconnect).toHaveBeenCalled();
    });
  });
});
