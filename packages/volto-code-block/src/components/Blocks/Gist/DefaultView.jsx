import React from 'react';
import Gist from 'react-gist';
import Caption from '../../Caption/Caption';
import cx from 'classnames';

const GistView = (props) => {
  const {
    file,
    gistId,
    caption_title,
    caption_description,
    className,
    styles = {},
  } = props;
  const align = styles?.align || 'center';
  const size = styles?.size || 'l';

  return (
    <div className={cx('block gist', className, `align-${align}`)}>
      <div className={`gist-content-wrapper block-${size}`}>
        <div className="gistWrapper">
          {gistId && <Gist id={gistId} file={file} />}
        </div>
        {caption_title && (
          <Caption title={caption_title} description={caption_description} />
        )}
      </div>
    </div>
  );
};

export default GistView;
