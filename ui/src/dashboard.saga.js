import { call, put } from 'redux-saga/effects';
import ACTIONS from './constants/actions.constants';
import { getData, postData } from './utils/axios';

const baseUrl = 'http://localhost:8008';

const API = {
  getBranchName: `${baseUrl}/getCurrentBranch/`,
  getAllAuthors: `${baseUrl}/getAllAuthors/`,
  getCommits: `${baseUrl}/getAllCommits/`,
  getCommitHistory: `${baseUrl}/getCommitHistory`,
  getCommitFiles: `${baseUrl}/commitFiles/`,
  getFilesCommitCount: `${baseUrl}/getFilesCommitCount/`,
  getAuthorStats: `${baseUrl}/getAuthorStats/`
};
const getLocalData = key => localStorage.getItem(key);

function* getBranchName(action) {
  let response;
  const data = getLocalData('branchName');
  if (data) {
    yield put({
      type: ACTIONS.DASHBOARD.BRANCH_NAME,
      response: JSON.parse(data)
    });
    return;
  }
  try {
    response = yield call(getData, API.getBranchName);
    if (response.status === 200) {
      localStorage.setItem('branchName', JSON.stringify(response.data));
      yield put({
        type: ACTIONS.DASHBOARD.BRANCH_NAME,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: e });
  }
}

function* getAllAuthors(action) {
  let response;
  const data = getLocalData('getAllAuthors');
  if (data) {
    yield put({
      type: ACTIONS.DASHBOARD.AUTHORS,
      response: JSON.parse(data)
    });
    return;
  }
  try {
    response = yield call(getData, API.getAllAuthors);
    if (response.status === 200) {
      localStorage.setItem('getAllAuthors', JSON.stringify(response.data));
      yield put({
        type: ACTIONS.DASHBOARD.AUTHORS,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: e });
  }
}
function* getCommits(action) {
  let response;
  const data = getLocalData('getCommits');
  if (data) {
    yield put({
      type: ACTIONS.DASHBOARD.COMMITS_LIST,
      response: JSON.parse(data)
    });
    return;
  }
  try {
    response = yield call(getData, API.getCommits);
    if (response.status === 200) {
      localStorage.setItem('getCommits', JSON.stringify(response.data));
      yield put({
        type: ACTIONS.DASHBOARD.COMMITS_LIST,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: e });
  }
}
function* getCommitFiles(action) {
  let response;
  const data = getLocalData('getCommitFiles');
  if (data) {
    yield put({
      type: ACTIONS.DASHBOARD.COMMIT_FILES,
      response: JSON.parse(data)
    });
    return;
  }
  try {
    response = yield call(getData, API.getCommitFiles);
    if (response.status === 200) {
      localStorage.setItem('getCommitFiles', JSON.stringify(response.data));
      yield put({
        type: ACTIONS.DASHBOARD.COMMIT_FILES,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: e });
  }
}
function* getCommitHistory(action) {
  console.log(action);
  let response;
  // const data = getLocalData('getCommitHistory');
  // if (data) {
  //   yield put({
  //     type: ACTIONS.DASHBOARD.COMMIT_HISTORY,
  //     response: JSON.parse(data)
  //   });
  //   return;
  // }

  try {
    response = yield call(postData, API.getCommitHistory, action.data);
    if (response.status === 200) {
      localStorage.setItem('getCommitHistory', JSON.stringify(response.data));
      yield put({
        type: ACTIONS.DASHBOARD.COMMIT_HISTORY,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: e });
  }
}

function* getFilesCommitCount() {
  let response;
  const data = getLocalData('getFilesCommitCount');
  if (data) {
    yield put({
      type: ACTIONS.DASHBOARD.FILES_COMMIT_COUNT,
      response: JSON.parse(data)
    });
    return;
  }
  try {
    response = yield call(getData, API.getFilesCommitCount);
    if (response.status === 200) {
      localStorage.setItem(
        'getFilesCommitCount',
        JSON.stringify(response.data)
      );
      yield put({
        type: ACTIONS.DASHBOARD.FILES_COMMIT_COUNT,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: e });
  }
}
function* getAuthorStats(action) {
  let response;
  const data = getLocalData('getAuthorStats');
  if (data) {
    yield put({
      type: ACTIONS.DASHBOARD.AUTHORS,
      response: JSON.parse(data)
    });
    return;
  }
  try {
    response = yield call(getData, API.getAuthorStats);
    if (response.status === 200) {
      localStorage.setItem('getAuthorStats', JSON.stringify(response.data));
      yield put({
        type: ACTIONS.DASHBOARD.AUTHOR_STATS,
        response: response.data
      });
    } else {
      yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: response.data });
    }
  } catch (e) {
    yield put({ type: ACTIONS.DASHBOARD.API_FAIL, data: e });
  }
}
export {
  getBranchName,
  getAllAuthors,
  getCommits,
  getCommitHistory,
  getCommitFiles,
  getFilesCommitCount,
  getAuthorStats
};
