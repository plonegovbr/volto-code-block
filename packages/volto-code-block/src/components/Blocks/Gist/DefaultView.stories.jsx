import React from 'react';
import GistView from './DefaultView';
import Wrapper from '@plone/volto/storybook';

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
  title: 'Public/Blocks/GistBlock',
  component: GistView,
  decorators: [withWrapper],
  argTypes: {
    gistId: {
      name: 'Gist ID',
      description: 'Path of the Gist to be displayed',
    },
    file: {
      name: 'File',
      description: 'File, in the Gist, to be displayed',
    },
    caption_title: {
      name: 'Caption Title',
    },
    caption_description: {
      name: 'Caption Description',
    },
  },
  args: {
    gistId: 'ericof/6f876b895a60d07925796190a37e8263',
    file: '',
    caption_title: '',
    caption_description: '',
  },
};

export const DisplayGist = {
  args: {},
};

export const DisplayGistFile = {
  args: {
    file: 'docker-compose.yml',
  },
};

export const WithCaption = {
  args: {
    file: 'docker-compose.yml',
    caption_title: 'docker-compose.yml',
    caption_description: 'This is the main docker-compose.yml for this project',
  },
};
