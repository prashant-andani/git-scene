import { takeEvery, all } from 'redux-saga/effects';
import { login, logout, forgotPassword } from 'container/login/Login.saga';
import {
  updatePassword,
  updateProfile
} from 'container/account_settings/AccountSettings.saga';

import {
  getMoreProjectList,
  getMoreCompanyList,
  getProjectDashboard,
  getCompanyDashboard
} from 'container/discover_tab/Discover.saga';
import {
  getDetails,
  getCommentsDetails,
  addComments,
  getParticipants,
  getBidders,
  getSubProjects,
  getUpdatesDetails
} from 'container/project_details/ProjectDetails.saga';

import {
  getCompanyComments,
  getCompanyDetails,
  addCompanyComments,
  getContacts,
  getAssociatedProjects,
  getCompanyProjectBidders
} from 'container/company_details/CompanyDetails.saga';

import header from 'container/header/Header.saga';

import {
  getProjectFilters,
  getCompanyFilters,
  getJurisdiction
} from 'container/filters/Filters.saga';

import ACTIONS from 'api-config/actions.constants';

export default () =>
  all([
    takeEvery(ACTIONS.AUTH.LOGIN, login),
    takeEvery(ACTIONS.AUTH.FORGOT_PASSWORD, forgotPassword),
    takeEvery(ACTIONS.AUTH.LOGOUT, logout),
    takeEvery(ACTIONS.ACCOUNT_SETTINGS.UPDATE_PASSWORD, updatePassword),
    takeEvery(ACTIONS.ACCOUNT_SETTINGS.UPDATE_PROFILE, updateProfile),
    takeEvery(
      ACTIONS.PROJECT_LISTING.GET_MORE_PROJECT_LIST,
      getMoreProjectList
    ),
    takeEvery(
      ACTIONS.COMPANY_LISTING.GET_MORE_COMPANY_LIST,
      getMoreCompanyList
    ),
    takeEvery(
      ACTIONS.PROJECT_DASHBOARD.GET_DASHBOARD_PROJECTS,
      getProjectDashboard
    ),
    takeEvery(
      ACTIONS.COMPANY_DASHBOARD.GET_DASHBOARD_COMPANY,
      getCompanyDashboard
    ),
    takeEvery(ACTIONS.PROJECT_DETAILS.GET_DETAILS, getDetails),
    takeEvery(ACTIONS.PROJECT_DETAILS.GET_DETAILS_COMMENTS, getCommentsDetails),
    takeEvery(ACTIONS.PROJECT_DETAILS.ADD_COMMENTS, addComments),
    takeEvery(ACTIONS.PROJECT_DETAILS.GET_PARTICIPANTS, getParticipants),
    takeEvery(ACTIONS.PROJECT_DETAILS.GET_BIDDERS, getBidders),
    takeEvery(ACTIONS.PROJECT_DETAILS.GET_SUB_PROJECTS, getSubProjects),
    takeEvery(ACTIONS.COMPANY_DETAILS.GET_CONTACTS, getContacts),
    takeEvery(ACTIONS.COMPANY_DETAILS.GET_COMPANY_DETAILS, getCompanyDetails),
    takeEvery(ACTIONS.COMPANY_DETAILS.GET_COMPANY_COMMENTS, getCompanyComments),
    takeEvery(ACTIONS.COMPANY_DETAILS.ADD_COMPANY_COMMENTS, addCompanyComments),
    takeEvery(ACTIONS.PROJECT_DETAILS.GET_DETAILS_UPDATES, getUpdatesDetails),
    takeEvery(
      ACTIONS.COMPANY_DETAILS.GET_PROJECT_BIDDERS,
      getCompanyProjectBidders
    ),
    takeEvery(
      ACTIONS.COMPANY_DETAILS.GET_ASSOCIATED_PROJECTS,
      getAssociatedProjects
    ),
    takeEvery(ACTIONS.HEADER.TRIGGER_SEARCH, header),
    takeEvery(ACTIONS.FILTERS.GET_PROJECT_FILTERS, getProjectFilters),
    takeEvery(ACTIONS.FILTERS.GET_COMPANY_FILTERS, getCompanyFilters),
    takeEvery(ACTIONS.FILTERS.GET_JURISDICTION, getJurisdiction)
  ]);
