import { injectIntl } from 'react-intl';
import React from 'react';
import CodeView from './DefaultView';
import Wrapper from '@plone/volto/storybook';

const codePython =
  'import requests\nresp = requests.get("https://plone.org")\nassert resp.status_code == 200';

const codeLongLines =
  '# Code to show how wrap long lines would work\n\ntext = "This is a really, really, really, really long line including a lot of words and letters and a text that should not make any sense, but should be long, very long"\n\nprint(text)';

const StoryComponent = injectIntl(({ children, ...args }) => {
  const { language, style, code, showLineNumbers, wrapLongLines } = args;
  return (
    <Wrapper>
      <div style={{ maxWidth: '1000px', margin: 'auto' }}>
        <CodeView
          data={{
            language: language,
            style: style,
            code: code,
            showLineNumbers: showLineNumbers,
            wrapLongLines: wrapLongLines,
          }}
        />
      </div>
    </Wrapper>
  );
});

export const DarkStyle = StoryComponent.bind({});
DarkStyle.args = {
  language: 'python',
  style: 'dark',
  code: codePython,
};

export const LightStyle = StoryComponent.bind({});
LightStyle.args = {
  language: 'python',
  style: 'light',
  code: codePython,
};

export const LongLines = StoryComponent.bind({});
LongLines.args = {
  language: 'python',
  style: 'dark',
  code: codeLongLines,
};

export const LongLinesNoLineNumbers = StoryComponent.bind({});
LongLinesNoLineNumbers.args = {
  language: 'python',
  style: 'dark',
  showLineNumbers: false,
  code: codeLongLines,
};

export default {
  title: 'Public/Blocks/CodeBlock',
  component: CodeView,
  argTypes: {
    language: {
      name: 'Language',
      description: 'Language to be used for syntax hightlighting',
      defaultValue: 'python',
      control: {
        type: 'select',
        options: ['python', 'javascript', 'dockerfile'],
      },
    },
    style: {
      name: 'Style',
      defaultValue: 'dark',
      description: 'Color style to be used',
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
    code: {
      name: 'Code',
      description: 'Code to be displayed',
      control: {
        type: 'text',
      },
    },
    showLineNumbers: {
      name: 'Show Line Numbers',
      description: 'Display line numbers in the code block',
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
    wrapLongLines: {
      name: 'Wrap Long Lines',
      description: 'Wrap long lines in the code block',
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
  },
};
