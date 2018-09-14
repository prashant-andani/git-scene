import React from 'react';
import PropTypes from 'prop-types';
import './card.css';
const Card = props => {
  return (
    <div className="card-container">
      <div className="title">{props.title}</div>
      <div>
        <props.content />
      </div>
    </div>
  );
};

Card.propTypes = {};

Card.defaultProps = {};

export default Card;
