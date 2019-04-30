import React from 'react';
import PropTypes from 'prop-types';

const Actions = ({ children }) => {
  return <div className="dialog__actions">{children}</div>;
};

Actions.propTypes = {
  children: PropTypes.node,
};

export default Actions;
