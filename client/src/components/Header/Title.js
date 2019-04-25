import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => <h1 className="header__title">{children}</h1>;

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
