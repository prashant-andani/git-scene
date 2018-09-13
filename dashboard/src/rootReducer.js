import { combineReducers } from 'redux';
import login from 'container/login/Login.reducer';
import discover from 'container/discover_tab/Discover.reducer';
import projectDetails from 'container/project_details/ProjectDetails.reducer';
import companyDetails from 'container/company_details/CompanyDetails.reducer';
import headerReducer from 'container/header/Header.reducer';
import accountSettings from 'container/account_settings/AccountSettings.reducer';

import filters from 'container/filters/Filters.reducer';

const rootReducer = combineReducers({
  login,
  discover,
  filters,
  projectDetails,
  companyDetails,
  headerReducer,
  accountSettings
});

export default rootReducer;
