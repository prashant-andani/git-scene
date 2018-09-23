import React from 'react';
import PropTypes from 'prop-types';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick';
import Calendar from 'react-github-contribution-calendar';

import Counter from './components/counter/Counter';
import Card from './components/card/Card';
import Authors from './components/authors/Authors';
import Commits from './components/commits/Commits';
import { connect } from 'react-redux';
import ACTIONS from './constants/actions.constants';
import Chart from 'chart.js';
import './dashboard.css';
import '../node_modules/react-github-contribution-calendar/default.css';
import moment from 'moment';

ReactChartkick.addAdapter(Chart);

const until = new Date();

const panelColors = ['#eeeeee', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: ACTIONS.DASHBOARD.GET_BRANCH_NAME
    });
    dispatch({
      type: ACTIONS.DASHBOARD.GET_AUTHORS
    });
    dispatch({
      type: ACTIONS.DASHBOARD.GET_COMMITS
    });
    dispatch({
      type: ACTIONS.DASHBOARD.GET_COMMIT_HISTORY,
      data: { param: 'all' }
    });
  }

  onChangeAuthor = e => {
    const { dispatch } = this.props;
    dispatch({
      type: ACTIONS.DASHBOARD.GET_COMMIT_HISTORY,
      data: { param: e.target.value }
    });
  };

  getAvgDailyCommits = commitsCount => {
    const allDates = Object.keys(commitsCount);
    const now = moment(new Date()); //todays date
    const end = moment(allDates[0]); // another date
    const duration = moment.duration(now.diff(end));
    const days = duration.asDays();
    const commitValues = Object.values(commitsCount);
    const totalCommits = commitValues.reduce(
      (prev, current) => current + prev,
      1
    );
    const avg = (totalCommits / days).toFixed(2);
    return avg;
  };

  render() {
    const { authors, commits, commitHistory } = this.props.dashboard;
    return (
      <div className="dashboard-container">
        <div className="counters">
          <Counter title="Total Commits" counter={commits.length} />
          <Counter
            title="Avg. Daily Commits"
            counter={this.getAvgDailyCommits(commitHistory)}
          />
          <Counter title="Authors" counter={Object.keys(authors).length} />
          <Card className="size-md" title="Contribution Graph">
            <Calendar
              values={commitHistory}
              until={until}
              panelColors={panelColors}
            />
          </Card>
        </div>

        <div className="cards">
          <Card className="size-md" title="Commit History">
            <select onChange={this.onChangeAuthor}>
              <option value="all">All Commits</option>
              {Object.keys(authors).map(author => (
                <option value={author}>{author}</option>
              ))}
            </select>
            <LineChart data={commitHistory} download={true} />
          </Card>
          <Card className="size-md" title="Commits Share">
            <PieChart data={authors} />
          </Card>
        </div>
        <div className="cards">
          <Card title="Commits" className="size-lg">
            <Commits data={commits} />
          </Card>
          <Card title="Contributions" className="size-sm">
            <Authors data={authors} />
          </Card>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};
const mapStateToProps = state => ({
  dashboard: state.dashboard
});
export default connect(mapStateToProps)(Dashboard);
