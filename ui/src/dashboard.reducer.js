import ACTIONS from './constants/actions.constants';

const initialState = {
  commits: [],
  branchName: '',
  authors: {},
  commitHistory: {},
  filesList: {}
};

const dashboard = (state = initialState, action) => {
  const tempState = Object.assign({}, state);
  switch (action.type) {
    case ACTIONS.DASHBOARD.BRANCH_NAME: {
      tempState.branchName = action.response.branchName;
      return tempState;
    }
    case ACTIONS.DASHBOARD.COMMITS_LIST: {
      tempState.commits = action.response;
      return tempState;
    }
    case ACTIONS.DASHBOARD.COMMIT_HISTORY: {
      tempState.commitHistory = action.response;
      return tempState;
    }
    case ACTIONS.DASHBOARD.AUTHORS: {
      tempState.authors = action.response;
      return tempState;
    }
    case ACTIONS.DASHBOARD.FILES_COMMIT_COUNT: {
      tempState.filesList = action.response;
      return tempState;
    }

    default:
      return state;
  }
};

export default dashboard;
