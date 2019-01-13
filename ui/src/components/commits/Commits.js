import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import './commits.css';
import { Card, Tooltip, Timeline } from 'antd';
import { getCommitFiles } from '../../dashboard.saga';

const Commits = props => {
  const renderDate = date => Moment(date).format('Do MMM, YY');

  const renderCommits = commits =>
    commits.map(commit =>
      commit.message.includes('pull') ? (
        <Tooltip placement="topLeft" title={commit.author}>
          <Timeline.Item color="green">
            {commit.message} - {renderDate(commit.date)}
          </Timeline.Item>
        </Tooltip>
      ) : (
        <Tooltip placement="topLeft" title={commit.author}>
          <Timeline.Item>
            {commit.message} - {renderDate(commit.date)}
          </Timeline.Item>
        </Tooltip>
      )
    );
  return (
    <Card title="Commits" bordered={false} extra={<a href="#" />}>
      <Timeline>{renderCommits(props.data)}</Timeline>
    </Card>
  );
};

Commits.propTypes = {};

Commits.defaultProps = {};

export default Commits;
