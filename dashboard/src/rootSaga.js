import { takeEvery, all } from 'redux-saga/effects';
import { getCommits, getBranchName } from 'dashboard.saga';

import ACTIONS from 'constants/actions.constants';

export default () =>
  all([takeEvery(ACTIONS.DASHBOARD.GET_COMMITS, getCommits)]);
