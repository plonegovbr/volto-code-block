import React from 'react';
import CodeView from './DefaultView';
import Wrapper from '@plone/volto/storybook';

const codePython =
  'from Testing.makerequest import makerequest\nfrom zope.component.hooks import setSite\nimport transaction\n\n\napp = makerequest(app)\nsite = app.Plone\nsetSite(site)\n\n# Change admin password\nuser = "admin"\npassword = "verynotsecure"\napp.acl_users.users.updateUserPassword(user, password)\n\n\n# Persist changes\ntransaction.commit()\napp._p_jar.sync()';

const codeLongLines =
  '# Code to show how wrap long lines would work\n\ntext = "This is a really, really, really, really long line including a lot of words and letters and a text that should not make any sense, but should be long, very long"\n\nprint(text)';

const withWrapper = (Story, { args }) => {
  return (
    <Wrapper anonymous>
      <div style={{ width: '1000px' }}>
        <Story {...args} />
      </div>
    </Wrapper>
  );
};

export default {
  title: 'Public/Blocks/CodeBlock',
  component: CodeView,
  decorators: [withWrapper],
  argTypes: {
    language: {
      name: 'Language',
      description: 'Language to be used for syntax hightlighting',
      control: 'select',
      options: ['python', 'javascript', 'dockerfile'],
    },
    style: {
      name: 'Style',
      description: 'Color style to be used',
      control: 'select',
      options: ['dark', 'light'],
    },
    code: {
      name: 'Code',
      description: 'Code to be displayed',
      control: 'text',
    },
    showLineNumbers: {
      name: 'Show Line Numbers',
      description: 'Display line numbers in the code block',
      control: 'boolean',
    },
    wrapLongLines: {
      name: 'Wrap Long Lines',
      description: 'Wrap long lines in the code block',
      control: 'boolean',
    },
  },
  args: {
    language: 'python',
    style: 'dark',
    code: '',
    showLineNumbers: true,
    wrapLongLines: true,
  },
};

export const DarkStyle = {
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
  },
};

export const LightStyle = {
  args: {
    language: 'python',
    style: 'light',
    code: codePython,
  },
};

export const LongLines = {
  args: {
    language: 'python',
    style: 'dark',
    code: codeLongLines,
  },
};
export const LongLinesNoLineNumbers = {
  args: {
    language: 'python',
    style: 'dark',
    showLineNumbers: false,
    code: codeLongLines,
  },
};
