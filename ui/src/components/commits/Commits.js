import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import './commits.css';

const Commits = props => {
  const renderDate = date => Moment(date).format('Do MMM, YY');

  const commitList = props.data.map(commit => {
    return (
      <div className="commit">
        {commit.message}
        <div className="grey-text">
          {commit.author}
          <span className="commit-date">{renderDate(commit.date)}</span>
        </div>
      </div>
    );
  });
  return <div className="commitList">{commitList}</div>;
};

Commits.propTypes = {};

Commits.defaultProps = {};

export default Commits;
