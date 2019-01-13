import React from 'react';
import PropTypes from 'prop-types';
import './counter.css';
const Counter = ({ title, counter, subContent }) => {
  return (
    <div className="counter-content">
      <div className="counter">{counter}</div>
      <div className="title">{title}</div>
      <div className="line" />
      <div className="sub-content">{subContent}</div>
    </div>
  );
};

Counter.propTypes = {};

Counter.defaultProps = {};

export default Counter;
