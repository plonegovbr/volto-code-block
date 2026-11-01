import React from 'react';
import { beforeAll, describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';
import installBlocks from '../../../config/blocks';
import installSettings from '../../../config/settings';
import CodeView from './DefaultView';

beforeAll(() => {
  config.blocks.blocksConfig = {} as typeof config.blocks.blocksConfig;
  installSettings(config);
  installBlocks(config);
});

describe('CodeView with data that skipped the sidebar form', () => {
  it('renders nothing without code', () => {
    const { container } = render(<CodeView />);
    expect(container.innerHTML).toBe('');
  });

  it('uses the defaults of the schema', () => {
    const { container } = render(<CodeView code="print(1)" />);
    const wrapper = container.querySelector('.code-block-wrapper');
    const pre = container.querySelector('pre');
    expect(wrapper?.classList.contains('dark')).toBe(true);
    expect(wrapper?.classList.contains('wrapLongLines')).toBe(true);
    expect(pre?.classList.contains('language-python')).toBe(true);
    expect(pre?.classList.contains('line-numbers')).toBe(true);
    expect(pre?.getAttribute('data-start')).toBe('1');
  });

  it('keeps explicit values, even when false', () => {
    const { container } = render(
      <CodeView
        code="a"
        language="bash"
        {...{ style: 'light' }}
        lineNbr={5}
        showLineNumbers={false}
        wrapLongLines={false}
      />,
    );
    const wrapper = container.querySelector('.code-block-wrapper');
    const pre = container.querySelector('pre');
    expect(wrapper?.classList.contains('light')).toBe(true);
    expect(wrapper?.classList.contains('wrapLongLines')).toBe(false);
    expect(pre?.classList.contains('language-bash')).toBe(true);
    expect(pre?.classList.contains('line-numbers')).toBe(false);
    expect(pre?.getAttribute('data-start')).toBe('5');
  });

  it.each(['cobol', 'markdown'])('does not break on %s', (language) => {
    const { container } = render(<CodeView code="a" language={language} />);
    expect(container.querySelector('code')?.textContent).toContain('a');
  });
});
