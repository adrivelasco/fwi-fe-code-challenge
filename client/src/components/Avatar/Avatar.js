import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.scss';

const Avatar = ({ src, children, style }) => (
  <span style={style} className="avatar">
    {children || <img src={src} alt="" />}
  </span>
);

Avatar.propTypes = {
  src: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default Avatar;
