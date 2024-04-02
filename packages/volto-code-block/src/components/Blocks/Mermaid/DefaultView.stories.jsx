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
      <div style={{ width: '1000px' }}>
        <Story {...args} />
      </div>
    </Wrapper>
  );
};

export default {
  title: 'Public/Blocks/MermaidBlock',
  component: MermaidView,
  decorators: [withWrapper],
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
  },
  args: {
    code: '',
    block: '12345',
  },
};

export const SequenceDiagram = {
  args: {
    code: codeSequence,
    block: 'sequence-123',
  },
};
export const FlowChart = {
  args: {
    code: codeFlowChart,
    block: 'flowchar-123',
  },
};
export const ClassDiagram = {
  args: {
    code: codeClassDiagram,
    block: 'classdiagram-123',
  },
};
export const PieChart = {
  args: {
    code: codePieChart,
    block: 'piechart-123',
  },
};
