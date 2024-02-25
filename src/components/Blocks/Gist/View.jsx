import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import GistView from './DefaultView';

const GistBlockView = (props) => {
  const { data, block } = props;
  const { gistId, file, caption_title, caption_description } = data;
  return (
    <div className="block gist view" id={`gistBlock-${block}`}>
      {data && <GistView caption_title={caption_title} caption_description={caption_description} gistId={gistId} file={file} block={block} />}
    </div>
  );
};

export default withBlockExtensions(GistBlockView);
