import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import GistBlockData from './Data';
import View from './DefaultView';

const GistBlockEdit = (props) => {
  const { data, selected, block, className } = props;
  const { gistId, file, styles, caption_title, caption_description } = data;

  return (
    <div className="block gist edit" id={`gistBlock-${block}`}>
      {data && (
        <>
          <div className={'gist editLayer'}></div>
          <View
            gistId={gistId}
            file={file}
            caption_title={caption_title}
            caption_description={caption_description}
            className={className}
            styles={styles}
          />
        </>
      )}
      <SidebarPortal selected={selected}>
        <GistBlockData {...props} />
      </SidebarPortal>
    </div>
  );
};

export default withBlockExtensions(GistBlockEdit);
