import React from 'react';
import CodeView from './DefaultView';
import Wrapper from '@plone/volto/storybook';

const codePython =
  'from Testing.makerequest import makerequest\nfrom zope.component.hooks import setSite\nimport transaction\n\n\napp = makerequest(app)\nsite = app.Plone\nsetSite(site)\n\n# Change admin password\nuser = "admin"\npassword = "verynotsecure"\napp.acl_users.users.updateUserPassword(user, password)\n\n\n# Persist changes\ntransaction.commit()\napp._p_jar.sync()';

const codeJavaScript =
  'import React from "react";\nimport { useSelector } from "react-redux";\n\nconst MyComponent = () => {\n  const user = useSelector((state) => state.user);\n  \n  return (\n    <div className="container">\n      <h1>Hello, {user.name}!</h1>\n    </div>\n  );\n};\n\nexport default MyComponent;';

const codeLongLines =
  '# Code to show how wrap long lines would work\n\ntext = "This is a really, really, really, really long line including a lot of words and letters and a text that should not make any sense, but should be long, very long"\n\nprint(text)';

const withWrapper = (Story, { args }) => {
  return (
    <Wrapper anonymous>
      <div style={{ width: '100%' }}>
        <Story {...args} />
      </div>
    </Wrapper>
  );
};

export default {
  title: 'Public/Blocks/CodeBlock',
  component: CodeView,
  decorators: [withWrapper],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: `
# Code Block

Display syntax-highlighted code snippets in your Plone pages.

## Features

- **Multiple languages**: Python, JavaScript, TypeScript, Docker, and more
- **Syntax highlighting**: Dark and light themes
- **Line numbers**: Optional line numbering
- **Long lines**: Option to wrap long lines
- **Captions**: Add title and description to code blocks

## How to use

1. Add the Code block to your page
2. Write or paste your code
3. Select the programming language
4. Configure style and display options
        `,
      },
    },
  },
  argTypes: {
    language: {
      name: 'Language',
      description: 'Language to be used for syntax highlighting',
      control: 'select',
      options: ['python', 'javascript', 'typescript', 'dockerfile', 'json'],
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
    caption_title: {
      name: 'Caption Title',
      description: 'Title for the code block caption',
      control: 'text',
    },
    caption_description: {
      name: 'Caption Description',
      description: 'Description for the code block caption',
      control: 'text',
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

/**
 * Default story showing Python code with dark theme
 */
export const Default = {
  name: '🎯 Default (Python Dark)',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Recommended default block configuration: Python code with dark theme and line numbers. Ideal for code documentation.',
      },
    },
  },
};

/**
 * Style examples
 */
export const DarkStyle = {
  name: '🌙 Dark Style',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dark theme for code blocks. Popular choice for reducing eye strain and modern aesthetics.',
      },
    },
  },
};

export const LightStyle = {
  name: '☀️ Light Style',
  args: {
    language: 'python',
    style: 'light',
    code: codePython,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Light theme for code blocks. Great for printing and bright environments.',
      },
    },
  },
};

/**
 * Language examples
 */
export const PythonCode = {
  name: '🐍 Python',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
  },
  parameters: {
    docs: {
      description: {
        story: 'Python code with proper syntax highlighting.',
      },
    },
  },
};

export const JavaScriptCode = {
  name: '📜 JavaScript',
  args: {
    language: 'javascript',
    style: 'dark',
    code: codeJavaScript,
  },
  parameters: {
    docs: {
      description: {
        story: 'JavaScript/JSX code with React syntax highlighting.',
      },
    },
  },
};

/**
 * Feature examples
 */
export const WithLineNumbers = {
  name: '🔢 With Line Numbers',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
    showLineNumbers: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Code block with line numbers (default). Useful for referencing specific lines in documentation.',
      },
    },
  },
};

export const WithoutLineNumbers = {
  name: '📄 Without Line Numbers',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
    showLineNumbers: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Code block without line numbers. Cleaner look for simple snippets.',
      },
    },
  },
};

export const LongLines = {
  name: '📏 Long Lines Wrapped',
  args: {
    language: 'python',
    style: 'dark',
    code: codeLongLines,
    wrapLongLines: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Long lines are wrapped to fit the container. Prevents horizontal scrolling.',
      },
    },
  },
};

export const LongLinesNoWrap = {
  name: '📏 Long Lines No Wrap',
  args: {
    language: 'python',
    style: 'dark',
    showLineNumbers: false,
    code: codeLongLines,
    wrapLongLines: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Long lines are not wrapped, requiring horizontal scroll. Preserves original formatting.',
      },
    },
  },
};

/**
 * Caption examples
 */
export const WithCaption = {
  name: '📝 With Caption',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
    caption_title: 'Plone Admin Password Update',
    caption_description:
      'This script demonstrates how to update the admin password in a Plone instance using the makerequest utility.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Code block with title and description caption. Perfect for adding context to code examples.',
      },
    },
  },
};

export const WithLongCaption = {
  name: '📝 With Long Caption',
  args: {
    language: 'javascript',
    style: 'dark',
    code: codeJavaScript,
    caption_title: 'React Component with Redux',
    caption_description:
      'This React component demonstrates the use of Redux hooks.\nIt uses useSelector to access the user state from the Redux store.\nThe component is written using modern React functional components and JSX syntax.\nIdeal for modern React applications with state management.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Code block with multi-line caption. Shows how to document complex code with detailed explanations.',
      },
    },
  },
};

/**
 * Practical combinations
 */
export const LightStyleWithCaption = {
  name: '💡 Light Style with Caption',
  args: {
    language: 'javascript',
    style: 'light',
    code: codeJavaScript,
    caption_title: 'React Functional Component',
    caption_description:
      'Example of a modern React component using hooks and Redux.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Useful combination for documentation with light background. The caption adds context to the code.',
      },
    },
  },
};

export const MinimalNoLineNumbers = {
  name: '💡 Minimal (No Line Numbers)',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
    showLineNumbers: false,
    caption_title: 'Quick Example',
    caption_description: 'Simple code snippet without line numbers.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimalist configuration for simple code snippets. Clean and focused on the code itself.',
      },
    },
  },
};

/**
 * Size examples
 */
export const SizeSmall = {
  name: '📐 Size Small',
  args: {
    language: 'javascript',
    style: 'dark',
    code: codeJavaScript,
    styles: {
      align: 'center',
      size: 's',
    },
    caption_title: 'Small Code Block',
    caption_description: 'Max width of 400px. Perfect for small snippets.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Small size (400px max-width). Ideal for short code snippets or when space is limited.',
      },
    },
  },
};

export const SizeMedium = {
  name: '📐 Size Medium',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
    styles: {
      align: 'center',
      size: 'm',
    },
    caption_title: 'Medium Code Block',
    caption_description: 'Max width of 600px. Good for most code examples.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Medium size (600px max-width). The default and most versatile size for code blocks.',
      },
    },
  },
};

export const SizeLarge = {
  name: '📐 Size Large',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
    styles: {
      align: 'center',
      size: 'l',
    },
    caption_title: 'Large Code Block',
    caption_description: 'Max width of 900px, or 100% when centered.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large size (900px max-width, or 100% when centered). Use for complex code that needs more horizontal space.',
      },
    },
  },
};

export const SizeLargeCentered = {
  name: '📐 Size Large + Centered (Full Width)',
  args: {
    language: 'python',
    style: 'dark',
    code: codeLongLines,
    showLineNumbers: true,
    wrapLongLines: false,
    styles: {
      align: 'center',
      size: 'l',
    },
    caption_title: 'Full Width Code Block',
    caption_description:
      'When large size is combined with center alignment, the block uses 100% width for maximum space.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large + Centered = Full Width (100%). Perfect for code with long lines that needs maximum horizontal space.',
      },
    },
  },
};

/**
 * Alignment examples with different sizes
 */
export const LeftAlignedSmall = {
  name: '↔️ Left Aligned + Small',
  args: {
    language: 'javascript',
    style: 'dark',
    code: codeJavaScript,
    styles: {
      align: 'left',
      size: 's',
    },
    caption_title: 'Left-Aligned Small Block',
    caption_description:
      'Text flows around on the right. Great for inline examples.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Small block aligned to the left with text wrapping around it. Useful for documentation with code examples.',
      },
    },
  },
};

export const RightAlignedMedium = {
  name: '↔️ Right Aligned + Medium',
  args: {
    language: 'python',
    style: 'light',
    code: codePython,
    styles: {
      align: 'right',
      size: 'm',
    },
    caption_title: 'Right-Aligned Medium Block',
    caption_description: 'Text flows around on the left.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Medium block aligned to the right. Creates interesting layouts with text on the left side.',
      },
    },
  },
};

export const CenteredLarge = {
  name: '↔️ Centered + Large (Full Width)',
  args: {
    language: 'python',
    style: 'dark',
    code: codePython,
    showLineNumbers: true,
    styles: {
      align: 'center',
      size: 'l',
    },
    caption_title: 'Centered Large Block',
    caption_description:
      'Uses full width (100%) when centered with large size.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large size + Center alignment = 100% width. Maximizes space for code that needs it.',
      },
    },
  },
};
