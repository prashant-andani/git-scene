import { takeEvery, all } from 'redux-saga/effects';
import {
  getBranchName,
  getAllAuthors,
  getCommits,
  getCommitHistory,
  getCommitFiles
} from './dashboard.saga';

import ACTIONS from './constants/actions.constants';

export default () =>
  all([
    takeEvery(ACTIONS.DASHBOARD.GET_BRANCH_NAME, getBranchName),
    takeEvery(ACTIONS.DASHBOARD.GET_AUTHORS, getAllAuthors),
    takeEvery(ACTIONS.DASHBOARD.GET_COMMITS, getCommits),
    takeEvery(ACTIONS.DASHBOARD.GET_COMMIT_HISTORY, getCommitHistory),
    takeEvery(ACTIONS.DASHBOARD.GET_COMMIT_FILES, getCommitFiles)
  ]);
