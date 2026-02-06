import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import GistView from './DefaultView';

const GistBlockView = (props) => {
  const { data, block, className } = props;
  const { gistId, file, caption_title, caption_description, styles } = data;

  return (
    <div id={`gistBlock-${block}`}>
      {data && (
        <GistView
          caption_title={caption_title}
          caption_description={caption_description}
          gistId={gistId}
          file={file}
          block={block}
          className={className}
          styles={styles}
        />
      )}
    </div>
  );
};

export default withBlockExtensions(GistBlockView);
