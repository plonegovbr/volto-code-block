import { describe, expect, it } from 'vitest';
import { highlight, languages } from 'prismjs/components/prism-core';
import '../config/settings';
import { addLineMarkers } from './lineNumbers';

const countMarkers = (html: string) =>
  html.match(/class="line-number"/g)?.length ?? 0;

describe('addLineMarkers', () => {
  it.each([
    ['', 1],
    ['a', 1],
    ['a\nb', 2],
    ['a\n\nb', 3],
    ['a\n', 2],
  ])('marks every line of %j', (code, lines) => {
    expect(countMarkers(addLineMarkers(code))).toBe(lines);
  });

  it('starts a line with its marker', () => {
    expect(addLineMarkers('a\nb')).toBe(
      '<span class="line-number"></span>a\n<span class="line-number"></span>b',
    );
  });

  it('keeps the tags of a multi-line token balanced', () => {
    const code = '"""two\nlines"""\nx = 1';
    const html = highlight(code, languages.python);
    const container = document.createElement('pre');
    container.innerHTML = addLineMarkers(html);
    expect(container.textContent).toBe(code);
    expect(container.querySelectorAll('.line-number')).toHaveLength(3);
    expect(
      container.querySelector('.token.string .line-number'),
    ).not.toBeNull();
  });
});
