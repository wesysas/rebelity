import { IAction } from '../../data/coreTypes';
//import { IS_ONBOARDING_PASSED } from '../Onboarding/Onboarding';

import {
  RECEIVE_LOGIN_ADMIN,
  REMOVE_SESSION,
  REQUEST_LOGIN_ADMIN,
  FAILURE_LOGIN_ADMIN,
  SET_ADMIN_ID,
  SET_HANDLE_NAME,
  SET_DEVELOPER_MODE,
  SET_ADMIN_NAME, 
  SET_LOGINED_IN, 
  SET_MERCHANT,
  REQUEST_CHECK_LOGIN,
  RECEIVE_CHECK_LOGIN 
} from './actions';

import {
  ACCESS_TOKEN_NAME,
  ACCESS_MERCHANT,
  ACCESS_ADMIN_NAME,
  ACCESS_PERIOD_ID,
  ACCESS_CURRENT_USER_ID,
  ACCESS_CURRENT_ROLE,
  ACCESS_CLOCKIN_USERS,
  ACCESS_POS_CATEGORIES,
  ACCESS_POS_PRODUCTS,
  ACCESS_STATION_ID,
  ACCESS_STATION_MODE
} from '../../utils/session';

import AStorage from '../../utils/Storage';

export class LoginState {
  isLoginedIn: boolean;
  accessToken: string;
  isFetching: boolean;
  adminId: string;
  handle: string;
  developerMode: boolean;
  adminName: string;
  merchant: any;
  isCheckingLogin: boolean;

  constructor() {
    this.isLoginedIn = false;
    this.accessToken = '';
    this.isFetching = false;
    this.adminId = '';
    this.handle = '';
    this.developerMode = false;
    this.adminName = '';
    this.merchant = null;
    this.isCheckingLogin = true;
  }
}

export const initialState = new LoginState();

export const LoginReducer = (
  state: LoginState = initialState,
  action: IAction<any>
): LoginState => {
  switch (action.type) {

    case RECEIVE_LOGIN_ADMIN:
      AStorage.setItem(ACCESS_TOKEN_NAME, action.data.access_token);
      AStorage.setItem(ACCESS_ADMIN_NAME, action.data.userName);

      return {
        ...state,
        accessToken: action.data.access_token,
        adminName: action.data.userName,
      };

    case SET_MERCHANT:
      AStorage.setItem(ACCESS_MERCHANT, action.data);

      return {
        ...state,
        merchant: action.data
      };

    case REQUEST_LOGIN_ADMIN:

      return {
        ...state,
        isFetching: true
      };

    case FAILURE_LOGIN_ADMIN:
      return {
        ...state,
        isFetching: false
      };

    case REMOVE_SESSION:
      AStorage.clear(ACCESS_TOKEN_NAME);
      AStorage.clear(ACCESS_ADMIN_NAME);
      AStorage.clear(ACCESS_MERCHANT);
      AStorage.clear(ACCESS_PERIOD_ID);
      AStorage.clear(ACCESS_CURRENT_USER_ID);
      AStorage.clear(ACCESS_CURRENT_ROLE);
      AStorage.clear(ACCESS_CLOCKIN_USERS);
      AStorage.clear(ACCESS_POS_CATEGORIES);
      AStorage.clear(ACCESS_POS_PRODUCTS);
      AStorage.clear(ACCESS_STATION_ID);
      AStorage.clear(ACCESS_STATION_MODE);
      AStorage.clear("developerMode");
      
      return {
        ...state,
        isLoginedIn: false,
        accessToken: '',
        isFetching: false,
        adminId: '',
        handle: '',
        developerMode: false,
        adminName: '',
        merchant: null,
        isCheckingLogin: false
      };
    
    case SET_ADMIN_ID:
      return {
        ...state,
        adminId: action.data
      };
    case SET_LOGINED_IN:
      return {
        ...state,
        isLoginedIn: true,
        isFetching: false
      };
    case SET_HANDLE_NAME:
      return {
        ...state,
        handle: action.data
      };
    case SET_ADMIN_NAME:
      return {
        ...state,
        adminName: action.data
      };
    case SET_DEVELOPER_MODE:
      AStorage.setItem('developerMode', action.data);

      return {
        ...state,
        developerMode: action.data
      };

    case REQUEST_CHECK_LOGIN:
      return {
        ...state,
        isCheckingLogin: true
      };

    case RECEIVE_CHECK_LOGIN:
      return {
        ...state,
        isCheckingLogin: false
      };
    default:
      return state;
  }
};
