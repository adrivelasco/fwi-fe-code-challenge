import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ children }) => {
  return <li className="header__list-item">{children}</li>;
};

ListItem.propTypes = {
  children: PropTypes.node,
};

export default ListItem;
