import React from 'react';
import PropTypes from 'prop-types';
import './header.css';
import logo from '../../assets/giraffe.png';

const Header = props => {
  return (
    <div className="header">
      <div className="git-scene-logo">
        <img src={logo} /> <span>Git Scene</span>
      </div>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
