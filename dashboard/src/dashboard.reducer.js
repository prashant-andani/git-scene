import ACTIONS from 'constants/actions.constants';

const initialState = {
  commits: []
};

const dashboard = (state = initialState, action) => {
  const tempState = Object.assign({}, state);
  switch (action.type) {
    case ACTIONS.DASHBOARD.COMMITS_LIST: {
      tempState.commits = action.response.data.commits;
      return tempState;
    }

    default:
      return state;
  }
};

export default dashboard;
