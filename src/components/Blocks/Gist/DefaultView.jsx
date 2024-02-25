import React from 'react';
import Gist from 'react-gist';
import Caption from '../../Caption/Caption';

const GistView = (props) => {
  const { file, gistId, caption_title, caption_description } = props;
  return (
    <>
      {gistId && <Gist id={gistId} file={file} />}
      {caption_title && <Caption title={caption_title} description={caption_description} />}
    </>
  );
};

export default GistView;
