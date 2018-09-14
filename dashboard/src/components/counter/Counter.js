import React from 'react';
import PropTypes from 'prop-types';
import './counter.css';
const Counter = ({ title, counter }) => {
  return (
    <div className="counter-content">
      <div className="title">{title}</div>
      <div className="counter">{counter}</div>
    </div>
  );
};

Counter.propTypes = {};

Counter.defaultProps = {};

export default Counter;
