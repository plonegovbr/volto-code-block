import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import mermaid from 'mermaid/dist/mermaid.esm.mjs';
import MermaidView from './DefaultView';

vi.mock('mermaid/dist/mermaid.esm.mjs', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn(async () => ({ svg: '<svg class="diagram"></svg>' })),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('MermaidView', () => {
  it('renders nothing without code', () => {
    const { container } = render(<MermaidView block="a" />);
    expect(container.innerHTML).toBe('');
  });

  it('leaves rendering the diagram to the block', async () => {
    render(<MermaidView block="a" code="graph TD" />);
    await waitFor(() => expect(mermaid.render).toHaveBeenCalled());
    expect(mermaid.initialize).toHaveBeenCalledWith(
      expect.objectContaining({ startOnLoad: false }),
    );
    expect(mermaid.render).toHaveBeenCalledWith('mermaid-a', 'graph TD');
  });

  it('shows the diagram and its caption', async () => {
    const { container } = render(
      <MermaidView block="a" code="graph TD" caption_title="A title" />,
    );
    await waitFor(() =>
      expect(container.querySelector('.mermaidWrapper svg')).not.toBeNull(),
    );
    expect(container.querySelector('.codeBlockCaption')).not.toBeNull();
  });
});
