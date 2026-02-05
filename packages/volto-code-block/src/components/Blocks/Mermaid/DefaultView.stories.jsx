import React from 'react';
import MermaidView from './DefaultView';
import Wrapper from '@plone/volto/storybook';

const codeSequence =
  'sequenceDiagram\n    Alice->>John: Hello John, how are you?\nJohn-->>Alice: Great!\nAlice-)John: See you later!';

const codeFlowChart =
  'flowchart LR\n  subgraph TOP\n    direction TB\n    subgraph B1\n        direction RL\n        i1 -->f1\n    end\n    subgraph B2\n        direction BT\n        i2 -->f2\n    end\n  end\n  A --> TOP --> B\n  B1 --> B2\n';
const codeClassDiagram =
  'classDiagram\n    note "From Duck till Zebra"\n    Animal <|-- Duck\n    note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"\n    Animal <|-- Fish\n    Animal <|-- Zebra\n    Animal : +int age\n    Animal : +String gender\n    Animal: +isMammal()\n    Animal: +mate()\n    class Duck{\n        +String beakColor\n        +swim()\n        +quack()\n    }\n    class Fish{\n        -int sizeInFeet\n        -canEat()\n    }\n    class Zebra{\n        +bool is_wild\n        +run()\n    }';
const codePieChart =
  'pie title Pets adopted by volunteers\n    "Dogs" : 386\n    "Cats" : 85\n    "Rats" : 15\n';

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
  title: 'Public/Blocks/MermaidBlock',
  component: MermaidView,
  decorators: [withWrapper],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: `
# Mermaid Block

Embed Mermaid diagrams directly into your Plone pages.

## Features

- **Multiple diagram types**: Flowcharts, sequence diagrams, class diagrams, and more
- **Flexible alignment**: Left, center, or right alignment
- **Responsive**: Diagrams adapt to their container

## How to use

1. Add the Mermaid block to your page
2. Write your Mermaid diagram code
3. Configure alignment
4. The diagram will be automatically rendered
        `,
      },
    },
  },
  argTypes: {
    code: {
      name: 'Code',
      description: 'Code to be displayed',
      control: 'text',
    },
    block: {
      name: 'Block ID',
      description: 'Id of the block being used',
    },
    'styles.align': {
      name: 'Alignment',
      description: 'Horizontal alignment of the diagram',
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    caption_title: {
      name: 'Caption Title',
      description: 'Title for the diagram caption',
      control: 'text',
    },
    caption_description: {
      name: 'Caption Description',
      description: 'Description for the diagram caption',
      control: 'text',
    },
  },
  args: {
    code: '',
    block: '12345',
    styles: {
      align: 'center',
    },
  },
};

/**
 * Default story showing a sequence diagram centered
 */
export const Default = {
  name: '🎯 Default (Sequence Diagram Centered)',
  args: {
    code: codeSequence,
    block: 'default-123',
    styles: {
      align: 'center',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Recommended default block configuration: sequence diagram with centered alignment. Ideal for documenting communication flows.',
      },
    },
  },
};

/**
 * Examples of different diagram types
 */
export const SequenceDiagram = {
  name: '📊 Sequence Diagram',
  args: {
    code: codeSequence,
    block: 'sequence-123',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sequence diagram showing message exchanges between participants. Perfect for documenting interactions between systems or components.',
      },
    },
  },
};

export const FlowChart = {
  name: '📊 Flow Chart',
  args: {
    code: codeFlowChart,
    block: 'flowchart-123',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Flow chart with nested subgraphs. Useful for representing complex processes with multiple decision paths.',
      },
    },
  },
};

export const ClassDiagram = {
  name: '📊 Class Diagram',
  args: {
    code: codeClassDiagram,
    block: 'classdiagram-123',
  },
  parameters: {
    docs: {
      description: {
        story:
          'UML class diagram showing inheritance and relationships. Ideal for documenting software architecture.',
      },
    },
  },
};

export const PieChart = {
  name: '📊 Pie Chart',
  args: {
    code: codePieChart,
    block: 'piechart-123',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pie chart for representing proportions and percentages. Great for visualizing data distribution.',
      },
    },
  },
};

/**
 * Alignment examples
 */
export const AlignLeft = {
  name: '◀️ Left Alignment',
  args: {
    code: codeSequence,
    block: 'align-left-123',
    styles: {
      align: 'left',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Diagram aligned to the left. Useful in layouts with text on the right or in multi-column pages.',
      },
    },
  },
};

export const AlignCenter = {
  name: '▪️ Center Alignment',
  args: {
    code: codeFlowChart,
    block: 'align-center-123',
    styles: {
      align: 'center',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Centered diagram (default configuration). Offers a balanced visual and is the most common option.',
      },
    },
  },
};

export const AlignRight = {
  name: '▶️ Right Alignment',
  args: {
    code: codeClassDiagram,
    block: 'align-right-123',
    styles: {
      align: 'right',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Diagram aligned to the right. Useful in special layouts or to create visual contrast with other elements.',
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
    code: codeSequence,
    block: 'caption-123',
    styles: {
      align: 'center',
    },
    caption_title: 'Communication Flow',
    caption_description:
      'This diagram shows the message exchange between Alice and John.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Diagram with title and description caption. Perfect for adding context and explanations to your diagrams.',
      },
    },
  },
};

export const WithLongCaption = {
  name: '📝 With Long Caption',
  args: {
    code: codeFlowChart,
    block: 'long-caption-123',
    styles: {
      align: 'center',
    },
    caption_title: 'Nested Subgraphs Example',
    caption_description:
      'This flowchart demonstrates the use of nested subgraphs with different directions.\nThe TOP subgraph contains two nested subgraphs (B1 and B2).\nB1 has a right-to-left (RL) direction, while B2 has a bottom-to-top (BT) direction.\nThis structure allows for complex hierarchical representations.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Diagram with multi-line caption. Shows how to document complex diagrams with detailed explanations.',
      },
    },
  },
};

/**
 * Practical combinations
 */
export const LeftAlignedWithCaption = {
  name: '💡 Left-Aligned with Caption',
  args: {
    code: codePieChart,
    block: 'left-caption-123',
    styles: {
      align: 'left',
    },
    caption_title: 'Pet Adoption Statistics',
    caption_description:
      'Distribution of pets adopted by volunteers in 2024. Dogs are the most adopted, followed by cats.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Useful combination for sidebars or when you want text to wrap around the diagram on the right side.',
      },
    },
  },
};

export const RightAlignedWithCaption = {
  name: '💡 Right-Aligned with Caption',
  args: {
    code: codeClassDiagram,
    block: 'right-caption-123',
    styles: {
      align: 'right',
    },
    caption_title: 'Animal Class Hierarchy',
    caption_description:
      'Object-oriented design showing inheritance relationships between animal classes.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interesting combination for layouts with text on the left. The diagram complements the content without dominating the page.',
      },
    },
  },
};
