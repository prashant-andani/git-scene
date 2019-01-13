import React from 'react';
import PropTypes from 'prop-types';
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'antd/lib/button';

const Card = props => {
  const classes = `card-container ${props.className}`;
  return (
    <div className={classes}>
      <div className="title">
        <FontAwesomeIcon icon={props.icon} /> {props.title}
      </div>
      <div className="card-body">{props.children}</div>
      <Button type="primary">Button</Button>
    </div>
  );
};

Card.propTypes = {};

Card.defaultProps = {
  icon: ''
};

export default Card;
