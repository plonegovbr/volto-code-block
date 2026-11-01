import Caption from './Caption';
import '../../theme/main.less';

const meta = {
  title: 'Components/Caption',
  component: Caption,
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Caption shown below a block, with a title and a description. Each line of the description becomes a paragraph.',
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'Title of the caption',
      control: 'text',
    },
    description: {
      name: 'Description',
      description: 'Text below the title. Line breaks are kept.',
      control: 'text',
    },
  },
};

export default meta;

export const Default = {
  name: 'Title and description',
  args: {
    title: 'Get a user',
    description: 'Uses plone.api to get a user by its username.',
  },
};

export const TitleOnly = {
  name: 'Title only',
  args: {
    title: 'Get a user',
  },
};

export const DescriptionOnly = {
  name: 'Description only',
  args: {
    description: 'Uses plone.api to get a user by its username.',
  },
};

export const MultipleLines = {
  name: 'Description with several lines',
  args: {
    title: 'Get a user',
    description:
      'The first line.\nThe second line.\n\nA line after a blank line.',
  },
};
