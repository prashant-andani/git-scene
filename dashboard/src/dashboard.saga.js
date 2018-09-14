import { call, put } from 'redux-saga/effects';
import ACTIONS from 'constants/actions.constants';

const {
  getContribList,
  getReport,
  getCalendar,
  getAllCommits,
  getCurrentBranch
} = require('../node_modules/git-scene');

function* getCommits(action) {
  let response;
  try {
    response = yield call(getAllCommits);
    if (response) {
      console.log(response);
      yield put({
        type: ACTIONS.DASHBOARD.COMMITS_LIST,
        response
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getBranchName(action) {
  let response;
  try {
    response = yield call(getAllCommits);
    if (response) {
      console.log(response);
      yield put({
        type: ACTIONS.DASHBOARD.COMMITS_LIST,
        response
      });
    }
  } catch (e) {
    console.log(e);
  }
}
export { getCommits, getBranchName };
