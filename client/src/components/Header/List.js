import React from 'react';
import PropTypes from 'prop-types';

const List = ({ children }) => {
  return <ul className="header__list">{children}</ul>;
};

List.propTypes = {
  children: PropTypes.node,
};

export default List;
