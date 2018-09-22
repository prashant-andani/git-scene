import { call, put } from 'redux-saga/effects';
import ACTIONS from './constants/actions.constants';
import { getData } from './utils/axios';

const baseUrl = 'http://localhost:8008';

const API = {
  getBranchName: `${baseUrl}/getCurrentBranch/`,
  getAllAuthors: `${baseUrl}/getAllAuthors/`,
  getCommits: `${baseUrl}/getAllCommits/`,
  getCommitHistory: `${baseUrl}/getCommitHistory`,
  getCommitFiles: `${baseUrl}/commitFiles/`
};

function* getBranchName(action) {
  let response;
  try {
    response = yield call(getData, API.getBranchName);
    if (response.status === 200) {
      yield put({
        type: ACTIONS.DASHBOARD.BRANCH_NAME,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: e });
  }
}
function* getAllAuthors(action) {
  let response;
  try {
    response = yield call(getData, API.getAllAuthors);
    if (response.status === 200) {
      yield put({
        type: ACTIONS.DASHBOARD.AUTHORS,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: e });
  }
}
function* getCommits(action) {
  let response;
  try {
    response = yield call(getData, API.getCommits);
    if (response.status === 200) {
      yield put({
        type: ACTIONS.DASHBOARD.COMMITS_LIST,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: e });
  }
}
function* getCommitFiles(action) {
  let response;
  try {
    response = yield call(getData, API.getCommitFiles);
    if (response.status === 200) {
      yield put({
        type: ACTIONS.DASHBOARD.COMMIT_FILES,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: e });
  }
}
function* getCommitHistory(action) {
  let response;
  const url = API.getCommitHistory + '/' + action.data.param;
  try {
    response = yield call(getData, url);
    if (response.status === 200) {
      yield put({
        type: ACTIONS.DASHBOARD.COMMIT_HISTORY,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.AUTH.LOGIN_FAIL, data: e });
  }
}
export {
  getBranchName,
  getAllAuthors,
  getCommits,
  getCommitHistory,
  getCommitFiles
};
