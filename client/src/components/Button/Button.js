import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ onClick, children }) => {
  return (
    <button className="btn-base" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
