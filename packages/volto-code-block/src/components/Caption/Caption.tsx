import React from 'react';

interface CaptionProps {
  title?: string;
  description?: string;
}

/** Caption of a block, with a title and a multi-line description. */
const Caption: React.FC<CaptionProps> = ({ title, description }) => {
  return (
    <div className={'codeBlockCaption'}>
      {title && <p className="title">{title}</p>}
      {description && (
        <div className="description">
          {description.split('\n').map((line, index) => (
            <p key={index}>{line || '\u00A0'}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Caption;
