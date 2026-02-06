import React from 'react';
import GistView from './DefaultView';
import Wrapper from '@plone/volto/storybook';

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
  title: 'Public/Blocks/GistBlock',
  component: GistView,
  decorators: [withWrapper],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: `
# Gist Block

Embed GitHub Gists directly into your Plone pages.

## Features

- **GitHub integration**: Directly embed public Gists
- **File selection**: Choose specific files from multi-file Gists
- **Flexible alignment**: Left, center, or right alignment
- **Size control**: Small, medium, or large display
- **Captions**: Add title and description to Gists
- **Automatic styling**: Gists maintain GitHub's native styling

## How to use

1. Add the Gist block to your page
2. Paste the Gist ID or URL
3. Optionally select a specific file
4. Configure alignment, size, and caption
        `,
      },
    },
  },
  argTypes: {
    gistId: {
      name: 'Gist ID',
      description: 'Path of the Gist to be displayed (username/gist-id)',
      control: 'text',
    },
    file: {
      name: 'File',
      description: 'Specific file in the Gist to be displayed',
      control: 'text',
    },
    caption_title: {
      name: 'Caption Title',
      description: 'Title for the Gist caption',
      control: 'text',
    },
    caption_description: {
      name: 'Caption Description',
      description: 'Description for the Gist caption',
      control: 'text',
    },
  },
  args: {
    gistId: 'ericof/6f876b895a60d07925796190a37e8263',
    file: '',
    caption_title: '',
    caption_description: '',
  },
};

/**
 * Default story showing a complete Gist
 */
export const Default = {
  name: '🎯 Default (Complete Gist)',
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Recommended default configuration: displays all files in the Gist with centered alignment and large size.',
      },
    },
  },
};

/**
 * File selection examples
 */
export const CompleteGist = {
  name: '📦 Complete Gist (All Files)',
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Displays all files from the Gist. Useful when you want to show the entire content of a multi-file Gist.',
      },
    },
  },
};

export const SingleFile = {
  name: '📄 Single File',
  args: {
    file: 'docker-compose.yml',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays only a specific file from the Gist. Perfect when you want to highlight a particular file from a multi-file Gist.',
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
    file: 'docker-compose.yml',
    caption_title: 'Docker Compose Configuration',
    caption_description:
      'This is the main docker-compose.yml for this project.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Gist with title and description caption. Perfect for adding context and explanations.',
      },
    },
  },
};

export const WithLongCaption = {
  name: '📝 With Long Caption',
  args: {
    caption_title: 'Complete Plone Configuration',
    caption_description:
      'This Gist contains multiple configuration files for a Plone project.\nIncludes Docker setup, environment variables, and deployment scripts.\nEach file serves a specific purpose in the project architecture.\nUse this as a reference for setting up similar projects.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Gist with multi-line caption. Shows how to document complex configurations with detailed explanations.',
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
    file: 'docker-compose.yml',
    styles: {
      align: 'center',
      size: 's',
    },
    caption_title: 'Small Gist',
    caption_description: 'Max width of 400px. Perfect for small code snippets.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Small size (400px max-width). Ideal for short Gist files or when space is limited.',
      },
    },
  },
};

export const SizeMedium = {
  name: '📐 Size Medium',
  args: {
    file: 'docker-compose.yml',
    styles: {
      align: 'center',
      size: 'm',
    },
    caption_title: 'Medium Gist',
    caption_description: 'Max width of 600px. Good for most Gist embeds.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Medium size (600px max-width). The default and most versatile size for Gist blocks.',
      },
    },
  },
};

export const SizeLarge = {
  name: '📐 Size Large',
  args: {
    styles: {
      align: 'center',
      size: 'l',
    },
    caption_title: 'Large Gist',
    caption_description: 'Max width of 900px, or 100% when centered.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large size (900px max-width, or 100% when centered). Use for complex Gists that need more horizontal space.',
      },
    },
  },
};

export const SizeLargeCentered = {
  name: '📐 Size Large + Centered (Full Width)',
  args: {
    styles: {
      align: 'center',
      size: 'l',
    },
    caption_title: 'Full Width Gist',
    caption_description:
      'When large size is combined with center alignment, the Gist uses 100% width for maximum space.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large + Centered = Full Width (100%). Perfect for multi-file Gists or wide code that needs maximum horizontal space.',
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
    file: 'docker-compose.yml',
    styles: {
      align: 'left',
      size: 's',
    },
    caption_title: 'Left-Aligned Small Gist',
    caption_description:
      'Text flows around on the right. Great for inline examples.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Small Gist aligned to the left with text wrapping around it. Useful for documentation with code examples.',
      },
    },
  },
};

export const RightAlignedMedium = {
  name: '↔️ Right Aligned + Medium',
  args: {
    file: 'docker-compose.yml',
    styles: {
      align: 'right',
      size: 'm',
    },
    caption_title: 'Right-Aligned Medium Gist',
    caption_description: 'Text flows around on the left.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Medium Gist aligned to the right. Creates interesting layouts with text on the left side.',
      },
    },
  },
};

export const CenteredLarge = {
  name: '↔️ Centered + Large (Full Width)',
  args: {
    styles: {
      align: 'center',
      size: 'l',
    },
    caption_title: 'Centered Large Gist',
    caption_description:
      'Uses full width (100%) when centered with large size.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large size + Center alignment = 100% width. Maximizes space for Gists that need it.',
      },
    },
  },
};
