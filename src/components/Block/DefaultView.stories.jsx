import { injectIntl } from 'react-intl';
import React from 'react';
import CodeView from './DefaultView';
import Wrapper from '@plone/volto/storybook';

const codePython =
  'import requests\nresp = requests.get("https://plone.org")\nassert resp.status_code == 200';

const StoryComponent = injectIntl(({ children, ...args }) => {
  const { language, style, code, showLineNumbers, wrapLongLines } = args;
  return (
    <Wrapper>
      <div>
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
