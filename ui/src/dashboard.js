import React from 'react';
import PropTypes from 'prop-types';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick';
import Calendar from 'react-github-contribution-calendar';
import { Row, Col, Card, Select, Divider } from 'antd';

import Counter from './components/counter/Counter';

import Authors from './components/authors/Authors';
import Commits from './components/commits/Commits';
import CommitCountList from './components/commitCountList/CommitCountList';
import { connect } from 'react-redux';
import ACTIONS from './constants/actions.constants';
import Chart from 'chart.js';
import './dashboard.css';
import '../node_modules/react-github-contribution-calendar/default.css';
import moment from 'moment';
import PR from './components/pr/PR';
import CommitsCard from './components/commitsCard/CommitsCard';
import CommitShare from './components/commitShare/CommitShare';

ReactChartkick.addAdapter(Chart);

const until = new Date();

const panelColors = ['#eeeeee', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: 'all',
      duration: 'weeks'
    };
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
      data: { author: 'all', duration: this.getDateByDuration('weeks') }
    });
    dispatch({
      type: ACTIONS.DASHBOARD.GET_FILES_COMMIT_COUNT
    });
    // dispatch({
    //   type: ACTIONS.DASHBOARD.GET_AUTHOR_STATS
    // });
  }

  getDateByDuration = duration => {
    const durationToDays = { week: 7, weeks: 14, quarter: 90, half_year: 180 };

    return moment()
      .subtract(durationToDays[duration], 'd')
      .format('YYYY-MM-DD');
  };

  onChangeAuthor = value => {
    const { dispatch } = this.props;
    this.setState({ author: value });
    dispatch({
      type: ACTIONS.DASHBOARD.GET_COMMIT_HISTORY,
      data: {
        author: value,
        duration: this.getDateByDuration(this.state.duration)
      }
    });
  };

  onChangeDuration = value => {
    const { dispatch } = this.props;
    this.setState({ duration: value });
    dispatch({
      type: ACTIONS.DASHBOARD.GET_COMMIT_HISTORY,
      data: {
        author: this.state.author,
        duration: this.getDateByDuration(value)
      }
    });
  };

  getCommitsLastWeek = commits => {
    const allDates = Object.keys(commits);
    const duration = this.getDateByDuration('week');

    const lastWeekCommits = allDates.reduce((total = 0, date) => {
      const momentDate = moment(date).format('YYYY-MM-DD');
      if (
        momentDate >= duration &&
        momentDate <= moment().format('YYYY-MM-DD')
      ) {
        return total + commits[date];
      }
    }, 0);
    return `Last week ${lastWeekCommits}`;
  };

  getAvgDailyCommits = commitsCount => {
    const allDates = Object.keys(commitsCount);
    if (allDates.length < 1) return 0;
    const allCommitsCount = Object.assign(commitsCount) || {};
    const now = moment(new Date()); //todays date
    const end = moment(allDates[0]); //another date
    const duration = moment.duration(now.diff(end));
    const days = duration.asDays();
    Object.keys(commitsCount).map(eachDate => {
      const day = moment(eachDate).format('ddd');
      // if (day === 'Sun' || day === 'Sat') {
      //   delete allCommitsCount[eachDate];
      // }
    });
    const commitValues = Object.values(allCommitsCount);
    const totalCommits = commitValues.reduce(
      (prev, current) => current + prev,
      1
    );
    const avg = (totalCommits / days).toFixed(2);
    return avg;
  };

  getPR = commits => {
    const pr = commits.map(commit => {
      return commit && commit.message.includes('pull');
    });
    return pr;
  };

  getDataForCharts = data => {
    if (data.length < 1) return [];
    const addData = [];
    for (let [key, value] of Object.entries(data)) {
      addData.push({ x: key, y: value });
    }
    return addData;
  };

  getDataForTimeLineCharts = data => {
    if (data.length < 1) return [];
    const addData = [];
    for (let [key, value] of Object.entries(data)) {
      addData.push({ x: key, y1: value });
    }
    return addData;
  };

  renderDropDowns = authors => {
    const Option = Select.Option;

    return (
      <React.Fragment>
        <Select
          defaultValue="All Commits"
          onChange={this.onChangeAuthor}
          style={{ width: 200 }}
        >
          <Option value="all">All Commits</Option>
          {Object.keys(authors).map(author => (
            <Option value={author}>{author}</Option>
          ))}
        </Select>
        <Select
          defaultValue="week"
          onChange={this.onChangeDuration}
          style={{ width: 120 }}
        >
          <Option value="week">Last week</Option>
          <Option value="weeks">Two weeks</Option>
          <Option value="quarter">3 Months</Option>
          <Option value="half_year">6 Months</Option>
        </Select>
      </React.Fragment>
    );
  };

  render() {
    const { authors, commits, commitHistory, filesList } = this.props.dashboard;
    const filesListCount = `Files/Commits - Total files ${
      Object.keys(filesList).length
    }`;

    return (
      <div className="">
        <Row gutter={16}>
          <Col className="gutter-row" span={18}>
            <div className="gutter-box">
              {' '}
              <Card
                className="size-md"
                title="Commit History"
                icon="chart-line"
                bordered={false}
                extra={this.renderDropDowns(authors)}
              >
                <LineChart data={commitHistory} />
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <CommitsCard
                totalCount={commits.length}
                commits={this.getDataForCharts(commitHistory)}
                avgCommits={this.getAvgDailyCommits(commitHistory)}
              />
            </div>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col className="gutter-row" span={16}>
            <CommitShare data={this.getDataForCharts(authors)} />
          </Col>
          <Col className="gutter-row" span={8}>
            <Card
              className="size-md"
              title="Contribution Graph"
              bordered={false}
            >
              <Calendar
                values={commitHistory}
                until={until}
                panelColors={panelColors}
              />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col className="gutter-row" span={17}>
            <Commits data={commits} />
          </Col>
          <Col className="gutter-row" span={6}>
            <Authors data={authors} />
          </Col>
        </Row>
        <Divider />
        <div className="cards">
          <Card
            title={filesListCount}
            className="size-md"
            icon="list-alt"
            bordered={false}
          >
            <CommitCountList data={filesList} />
          </Card>
        </div>
        <div>
          <Card
            title="Pull Requests"
            className="size-sm"
            icon="list-alt"
            bordered={false}
          >
            <PR data={commits} />
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
