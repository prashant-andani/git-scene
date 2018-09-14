import React from 'react';
import PropTypes from 'prop-types';
import Counter from './components/counter/Counter';
import Card from './components/card/Card';
import Authors from './components/authors/Authors';
import { connect } from 'react-redux';

import './dashboard.css';
const authors = {};

const Dashboard = props => {
  return (
    <div className="dashboard-container">
      <div className="counters">
        <Counter title="Total Commits" counter="546" />
        <Counter title="Authors" counter="8" />
        <Counter title="Last Commit" counter="1 Day" />
      </div>

      <div className="cards">
        <Card title="Contributions" content={Authors} />
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};
const mapStateToProps = state => ({
  dashboard: state.dashboard
});
export default connect(mapStateToProps)(Dashboard);
