import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import './Button.scss';

const types = {
  theme: ['light', 'dark'],
  variant: ['outlined', 'flat', 'contained'],
  color: ['default', 'primary', 'success', 'error'],
};

const Button = props => {
  const { onClick, children } = props;
  const btnClasses = {};

  for (const type in types) {
    const values = types[type];
    if (values) {
      values.forEach(val => {
        btnClasses[`btn--${val}`] = props[type] === val;
      });
    }
  }

  return (
    <button className={cs({ btn: true, ...btnClasses })} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(types.variant),
  color: PropTypes.oneOf(types.color),
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  theme: 'light',
  variant: 'flat',
  color: 'default',
};

export default Button;
