import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

const mapStateToProps = state => ({
  dashboard: state.dashboard
});
export default connect(mapStateToProps)(Header);
