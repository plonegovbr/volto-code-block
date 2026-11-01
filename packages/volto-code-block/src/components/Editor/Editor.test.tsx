import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import Editor from './Editor';

const KEYCODE_Y = 89;
const KEYCODE_Z = 90;
const KEYCODE_M = 77;
const KEYCODE_BRACKET = 219;
const KEYCODE_QUOTE = 222;

type EditorProps = Partial<React.ComponentProps<typeof Editor>>;

/** Keeps the value in state, as the blocks do. */
const Controlled: React.FC<EditorProps & { initial: string }> = ({
  initial,
  ...props
}) => {
  const [value, setValue] = React.useState(initial);
  return (
    <Editor
      value={value}
      onValueChange={setValue}
      highlight={(code) => code}
      {...props}
    />
  );
};

function setup(initial = '', props: EditorProps = {}) {
  const { container } = render(<Controlled initial={initial} {...props} />);
  const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
  return { container, textarea };
}

function select(textarea: HTMLTextAreaElement, start: number, end = start) {
  textarea.setSelectionRange(start, end);
}

describe('Editor rendering', () => {
  it('shows the value in the textarea', () => {
    const { textarea } = setup('print(1)');
    expect(textarea.value).toBe('print(1)');
  });

  it('renders a highlighted string as markup', () => {
    const { container } = setup('x', {
      highlight: () => '<b class="token">x</b>',
    });
    expect(container.querySelector('pre b.token')?.textContent).toBe('x');
  });

  it('renders highlighted React nodes', () => {
    const { container } = setup('x', {
      highlight: () => <i className="node">x</i>,
    });
    expect(container.querySelector('pre i.node')).not.toBeNull();
  });

  it('applies preClassName to the highlighted code', () => {
    const { container } = setup('x', { preClassName: 'language-python' });
    expect(container.querySelector('pre')?.className).toBe('language-python');
  });

  it('expands a padding object into each side', () => {
    const { textarea } = setup('x', { padding: { top: 5, left: 7 } });
    expect(textarea.style.paddingTop).toBe('5px');
    expect(textarea.style.paddingLeft).toBe('7px');
  });

  it('hands a textarea id and class name to the textarea', () => {
    const { textarea } = setup('x', {
      textareaId: 'code',
      textareaClassName: 'mine',
    });
    expect(textarea.id).toBe('code');
    expect(textarea.classList.contains('mine')).toBe(true);
  });
});

describe('Editor typing', () => {
  it('reports the new value', () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Editor value="" onValueChange={onValueChange} highlight={(c) => c} />,
    );
    fireEvent.change(container.querySelector('textarea') as HTMLElement, {
      target: { value: 'abc' },
    });
    expect(onValueChange).toHaveBeenCalledWith('abc');
  });

  it('lets onKeyDown take over a key', () => {
    const { textarea } = setup('x', {
      onKeyDown: (e) => e.preventDefault(),
    });
    fireEvent.keyDown(textarea, { key: 'Tab' });
    expect(textarea.value).toBe('x');
  });

  it('leaves the editor on Escape', () => {
    const { textarea } = setup('x');
    textarea.focus();
    fireEvent.keyDown(textarea, { key: 'Escape' });
    expect(document.activeElement).not.toBe(textarea);
  });
});

describe('Editor indentation', () => {
  it('inserts spaces on Tab', () => {
    const { textarea } = setup('ab');
    select(textarea, 1);
    fireEvent.keyDown(textarea, { key: 'Tab' });
    expect(textarea.value).toBe('a  b');
    expect(textarea.selectionStart).toBe(3);
  });

  it('honors tabSize', () => {
    const { textarea } = setup('', { tabSize: 4 });
    fireEvent.keyDown(textarea, { key: 'Tab' });
    expect(textarea.value).toBe('    ');
  });

  it('inserts a tab character without insertSpaces', () => {
    const { textarea } = setup('', { insertSpaces: false, tabSize: 1 });
    fireEvent.keyDown(textarea, { key: 'Tab' });
    expect(textarea.value).toBe('\t');
  });

  it('does nothing on Tab with ignoreTabKey', () => {
    const { textarea } = setup('x', { ignoreTabKey: true });
    fireEvent.keyDown(textarea, { key: 'Tab' });
    expect(textarea.value).toBe('x');
  });

  it('indents every selected line', () => {
    const { textarea } = setup('a\nb\nc');
    select(textarea, 0, 3);
    fireEvent.keyDown(textarea, { key: 'Tab' });
    expect(textarea.value).toBe('  a\n  b\nc');
  });

  it('unindents the selected lines on Shift+Tab', () => {
    const { textarea } = setup('  a\n  b\nc');
    select(textarea, 0, 7);
    fireEvent.keyDown(textarea, { key: 'Tab', shiftKey: true });
    expect(textarea.value).toBe('a\nb\nc');
  });

  it('removes a whole indent on Backspace', () => {
    const { textarea } = setup('  a');
    select(textarea, 2);
    fireEvent.keyDown(textarea, { key: 'Backspace' });
    expect(textarea.value).toBe('a');
  });

  it('keeps the indentation of the line on Enter', () => {
    const { textarea } = setup('    a');
    select(textarea, 5);
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(textarea.value).toBe('    a\n    ');
  });

  it('stops capturing Tab after Ctrl+M', () => {
    const { textarea } = setup('x');
    fireEvent.keyDown(textarea, { keyCode: KEYCODE_M, ctrlKey: true });
    fireEvent.keyDown(textarea, { key: 'Tab' });
    expect(textarea.value).toBe('x');
  });
});

describe('Editor wrapping', () => {
  it('wraps the selection in brackets', () => {
    const { textarea } = setup('ab');
    select(textarea, 0, 2);
    fireEvent.keyDown(textarea, { keyCode: KEYCODE_BRACKET });
    expect(textarea.value).toBe('[ab]');
  });

  it('wraps the selection in double quotes with Shift', () => {
    const { textarea } = setup('ab');
    select(textarea, 0, 2);
    fireEvent.keyDown(textarea, { keyCode: KEYCODE_QUOTE, shiftKey: true });
    expect(textarea.value).toBe('"ab"');
  });

  it('adds nothing without a selection', () => {
    const { textarea } = setup('ab');
    select(textarea, 1);
    fireEvent.keyDown(textarea, { keyCode: KEYCODE_BRACKET });
    expect(textarea.value).toBe('ab');
  });
});

describe('Editor history', () => {
  // jsdom reports no platform, so these are the shortcuts of "other platforms".
  const undo = { keyCode: KEYCODE_Z, ctrlKey: true };
  const redo = { keyCode: KEYCODE_Z, ctrlKey: true, shiftKey: true };

  it('undoes an edit', () => {
    const { textarea } = setup('x');
    fireEvent.keyDown(textarea, { key: 'Tab' });
    fireEvent.keyDown(textarea, undo);
    expect(textarea.value).toBe('x');
  });

  it('redoes an undone edit', () => {
    const { textarea } = setup('x');
    select(textarea, 0);
    fireEvent.keyDown(textarea, { key: 'Tab' });
    fireEvent.keyDown(textarea, undo);
    fireEvent.keyDown(textarea, redo);
    expect(textarea.value).toBe('  x');
  });

  it('stops at the first state', () => {
    const { textarea } = setup('x');
    fireEvent.keyDown(textarea, undo);
    expect(textarea.value).toBe('x');
  });

  it('drops the undone edits after a new one', () => {
    const { textarea } = setup('x');
    select(textarea, 0);
    fireEvent.keyDown(textarea, { key: 'Tab' });
    select(textarea, 0);
    fireEvent.keyDown(textarea, { key: 'Tab' });
    fireEvent.keyDown(textarea, undo);
    fireEvent.keyDown(textarea, undo);
    select(textarea, 1);
    fireEvent.keyDown(textarea, { key: 'Tab' });
    fireEvent.keyDown(textarea, redo);
    expect(textarea.value).toBe('x  ');
  });

  it('ignores the redo shortcut of Windows on other platforms', () => {
    const { textarea } = setup('x');
    fireEvent.keyDown(textarea, { key: 'Tab' });
    fireEvent.keyDown(textarea, undo);
    fireEvent.keyDown(textarea, { keyCode: KEYCODE_Y, ctrlKey: true });
    expect(textarea.value).toBe('x');
  });
});
