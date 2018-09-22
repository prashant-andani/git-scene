import React from 'react';
import PropTypes from 'prop-types';
import './card.css';
const Card = props => {
  const classes = `card-container ${props.className}`;
  return (
    <div className={classes}>
      <div className="title">{props.title}</div>
      <div className="card-body">{props.children}</div>
    </div>
  );
};

Card.propTypes = {};

Card.defaultProps = {};

export default Card;
