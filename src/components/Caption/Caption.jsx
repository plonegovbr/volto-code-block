/**
 * @module components/Caption
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Image/video caption component class.
 * @function Caption
 * @params {string} title Caption title.
 * @params {string} description Caption description.
 * @returns {string} Markup of the component.
 */
const Caption = ({ title, description }) => {
  return (
    <div className={'codeBlockCaption'}>
      {title && <p className="title">{title}</p>}
      {description && (
        <p className="description">
          {description.split('\n').map((line, index) => (
            <p key={index}>{line || '\u00A0'}</p>
          ))}
        </p>
      )}
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Caption.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Caption;
