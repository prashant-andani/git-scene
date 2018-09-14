import React from 'react';
import PropTypes from 'prop-types';
import './header.css';
const Header = props => {
  return (
    <div className="header">
      <div className="git-scene-logo">Git Scene</div>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
