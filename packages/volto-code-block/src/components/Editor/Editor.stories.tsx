import React from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import Editor from './Editor';
import '../../theme/main.less';
import '../../theme/theme-dark.less';
import '../../theme/theme-light.less';

interface EditorStoryProps {
  value: string;
  codeStyle: string;
  tabSize: number;
  insertSpaces: boolean;
  ignoreTabKey: boolean;
  padding: number;
  readOnly: boolean;
  placeholder: string;
}

/** Keeps the value in state, so the story can be typed in. */
const EditorStory: React.FC<EditorStoryProps> = ({
  value,
  codeStyle,
  ...props
}) => {
  const [code, setCode] = React.useState(value);
  return (
    <div className={`code-block-wrapper edit ${codeStyle}`}>
      <Editor
        {...props}
        value={code}
        onValueChange={setCode}
        highlight={(text) => highlight(text, languages.python)}
        preClassName={`code-block-wrapper ${codeStyle} language-python`}
      />
    </div>
  );
};

const CODE = `from plone import api


def get_user(username):
    return api.user.get(username=username)
`;

const meta = {
  title: 'Components/Editor',
  component: EditorStory,
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: `
Text area that keeps highlighted code behind what is typed, used by the Code and Mermaid blocks.

- **Tab** and **Shift+Tab** indent and unindent the selected lines
- **Enter** keeps the indentation of the line
- **Backspace** removes a whole indent
- Typing a bracket or a quote wraps the selection
- **Ctrl+Z** undoes and **Ctrl+Shift+Z** redoes (**⌘** on a Mac)
- **Ctrl+M** stops capturing Tab, so the keyboard can leave the editor
- **Escape** leaves the editor
        `,
      },
    },
  },
  argTypes: {
    codeStyle: {
      name: 'Style',
      control: 'select',
      options: ['dark', 'light'],
    },
    tabSize: { name: 'Tab size', control: 'number' },
    insertSpaces: { name: 'Insert spaces', control: 'boolean' },
    ignoreTabKey: { name: 'Ignore Tab key', control: 'boolean' },
    padding: { name: 'Padding', control: 'number' },
    readOnly: { name: 'Read only', control: 'boolean' },
    placeholder: { name: 'Placeholder', control: 'text' },
  },
  args: {
    value: CODE,
    codeStyle: 'dark',
    tabSize: 2,
    insertSpaces: true,
    ignoreTabKey: false,
    padding: 10,
    readOnly: false,
    placeholder: '',
  },
};

export default meta;

export const Default = {
  name: 'Dark',
};

export const Light = {
  name: 'Light',
  args: { codeStyle: 'light' },
};

export const WideTabs = {
  name: 'Four spaces on Tab',
  args: { tabSize: 4 },
};

export const IgnoreTab = {
  name: 'Tab moves the focus',
  args: { ignoreTabKey: true },
};

export const ReadOnly = {
  name: 'Read only',
  args: { readOnly: true },
};

export const Empty = {
  name: 'Empty, with a placeholder',
  args: { value: '', placeholder: 'Type your code here' },
};
