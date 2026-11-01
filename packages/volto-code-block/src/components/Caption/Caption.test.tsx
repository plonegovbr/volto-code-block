import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Caption from './Caption';

describe('Caption', () => {
  it('shows the title', () => {
    const { container } = render(<Caption title="A title" />);
    expect(container.querySelector('.title')?.textContent).toBe('A title');
  });

  it('has no title element without a title', () => {
    const { container } = render(<Caption description="Text" />);
    expect(container.querySelector('.title')).toBeNull();
  });

  it('has no description element without a description', () => {
    const { container } = render(<Caption title="A title" />);
    expect(container.querySelector('.description')).toBeNull();
  });

  it('does not nest paragraphs, which browsers would split apart', () => {
    const { container } = render(<Caption description={'First\nSecond'} />);
    expect(container.querySelector('p p')).toBeNull();
  });

  it('gives each line of the description its own paragraph', () => {
    const { container } = render(<Caption description={'First\nSecond'} />);
    const lines = container.querySelectorAll('.description p');
    expect([...lines].map((line) => line.textContent)).toEqual([
      'First',
      'Second',
    ]);
  });

  it('keeps blank lines of the description visible', () => {
    const { container } = render(<Caption description={'First\n\nThird'} />);
    const lines = container.querySelectorAll('.description p');
    expect(lines[1].textContent).toBe('\u00A0');
  });
});
