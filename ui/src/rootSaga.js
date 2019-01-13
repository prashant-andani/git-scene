import { takeEvery, all } from 'redux-saga/effects';
import {
  getBranchName,
  getAllAuthors,
  getCommits,
  getCommitHistory,
  getCommitFiles,
  getFilesCommitCount,
  getAuthorStats
} from './dashboard.saga';

import ACTIONS from './constants/actions.constants';

export default () =>
  all([
    takeEvery(ACTIONS.DASHBOARD.GET_BRANCH_NAME, getBranchName),
    takeEvery(ACTIONS.DASHBOARD.GET_AUTHORS, getAllAuthors),
    takeEvery(ACTIONS.DASHBOARD.GET_COMMITS, getCommits),
    takeEvery(ACTIONS.DASHBOARD.GET_COMMIT_HISTORY, getCommitHistory),
    takeEvery(ACTIONS.DASHBOARD.GET_COMMIT_FILES, getCommitFiles),
    takeEvery(ACTIONS.DASHBOARD.GET_FILES_COMMIT_COUNT, getFilesCommitCount),
    takeEvery(ACTIONS.DASHBOARD.GET_AUTHOR_STATS, getAuthorStats)
  ]);
