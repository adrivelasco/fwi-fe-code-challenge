import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';
import Title from './Title';
import Logo from './Logo';
import List from './List';
import ListItem from './ListItem';
import Spacer from './Spacer';

const Header = ({ children }) => (
  <header id="main-header" className="header">
    {children}
  </header>
);

Header.propTypes = {
  children: PropTypes.node,
};

Header.Title = Title;
Header.Logo = Logo;
Header.List = List;
Header.ListItem = ListItem;
Header.Spacer = Spacer;

export default Header;
