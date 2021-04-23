import { IAction } from '../../data/coreTypes';
//import { IS_ONBOARDING_PASSED } from '../Onboarding/Onboarding';

import {
  REQUEST_PIN_USER,
  FAILURE_PIN_USER,
  RECEIVE_PIN_USER,
  EXIT_PIN_USER,
  VALIDATE_PIN_USER,
  REQUEST_CLOCKIN_USER,
  FAILURE_CLOCKIN_USER,
  RECEIVE_CLOCKIN_USER,
  SET_CURRENT_USER_ID,
  SET_CURRENT_ROLE,
  RECEIVE_WORK_PERIOD,
  RECEIVE_START_PERIOD,
  SET_WORK_PERIOD,
  REEIVE_END_PERIOD,
  SET_CLOCK_IN_OUT,
  SET_CLOCKIN_USERS,
  REMOVE_CLOCKIN_USERS,
  REQUEST_CLOCKOUT_USER,
  FAILURE_CLOCKOUT_USER,
  RECEIVE_CLOCKOUT_USER,
  ACTIVE_NAV_MENU
} from './actions';

import {
  ACCESS_PERIOD_ID,
  ACCESS_CURRENT_USER_ID,
  ACCESS_CURRENT_ROLE,
  ACCESS_CLOCKIN_USERS, ACCESS_PERIOD_START
} from '../../utils/session';

import { ClockInUser } from '../../models/ClockInUser';

import AStorage from '../../utils/Storage';

export class ClockInState {
  isFetching: boolean;
  isPinedIn: boolean;
  pinNumber: string;
  isClockedIn: boolean;
  periodId: number;
  periodStart: string;
  currentRole: number;
  currentUserId: number;
  activeMenu: string;
  clockInUsers: ClockInUser[];
  
  constructor() {
    this.isFetching = false;
    this.isPinedIn = false;
    this.pinNumber = "";
    this.isClockedIn = false;
    this.periodId = 0;
    this.periodStart = "";
    this.currentRole = 0;
    this.currentUserId = 0;
    this.activeMenu = "";
    this.clockInUsers = [];
  }
}

export const initialState = new ClockInState();

export const ClockInReducer = (
  state: ClockInState = initialState,
  action: IAction<any>
): ClockInState => {
  switch (action.type) {

    case VALIDATE_PIN_USER:
      
      AStorage.setItem(ACCESS_CURRENT_USER_ID, action.data.userId);
      AStorage.setItem(ACCESS_CURRENT_ROLE, action.data.role);
      
      return {
        ...state,
        currentUserId: action.data.userId,
        currentRole: action.data.role
      };

    case RECEIVE_PIN_USER:
      
      return {
        ...state,
        isFetching: false,
        isPinedIn: true
      };

    case REQUEST_PIN_USER:
      return {
        ...state,
        isFetching: true,
        isPinedIn: false,
        pinNumber: action.data
      };

    case FAILURE_PIN_USER:
      return {
        ...state,
        isFetching: false,
        isPinedIn: false
      };

    case EXIT_PIN_USER:
      return {
        ...state,
        isFetching: false,
        isPinedIn: false,
        pinNumber: ""
      };

    case REQUEST_CLOCKIN_USER:
      return {
        ...state,
        isFetching: true,
        isClockedIn: false
      };

    case FAILURE_CLOCKIN_USER:
      return {
        ...state,
        isFetching: false,
        isClockedIn: false
      };

    case RECEIVE_CLOCKIN_USER:
      
      state.clockInUsers.push(action.data);

      AStorage.setItem(ACCESS_CLOCKIN_USERS, state.clockInUsers);
      
      return {
        ...state,
        isFetching: false,
        isClockedIn: true,
      };

    case REQUEST_CLOCKOUT_USER:
      return {
        ...state,
        isFetching: true,
        isClockedIn: true
      };

    case FAILURE_CLOCKOUT_USER:
      return {
        ...state,
        isFetching: false,
        isClockedIn: true
      };

    case RECEIVE_CLOCKOUT_USER:
    
      state.clockInUsers = state.clockInUsers.filter(function( user ) {
          return user.userId !== action.data;
      });

      AStorage.setItem(ACCESS_CLOCKIN_USERS, state.clockInUsers);
      
      return {
        ...state,
        isFetching: false,
        isClockedIn: false,
      };

    
    case SET_CURRENT_USER_ID:
      return {
        ...state,
        currentUserId: action.data
      };
    case SET_CURRENT_ROLE:
      return {
        ...state,
        currentRole: action.data
      };
    case RECEIVE_WORK_PERIOD:
      AStorage.setItem(ACCESS_PERIOD_ID, action.data.periodId);
      AStorage.setItem(ACCESS_PERIOD_START, action.data.periodStart);

      return {
        ...state,
        periodId: action.data.periodId,
        periodStart: action.data.periodStart
      };

    case RECEIVE_START_PERIOD:
      AStorage.setItem(ACCESS_PERIOD_ID, action.data.periodId);
      AStorage.setItem(ACCESS_PERIOD_START, action.data.periodStart);

      return {
        ...state,
        isFetching: false,
        periodId: action.data.periodId,
        periodStart: action.data.periodStart
      };

    case SET_WORK_PERIOD:
      return {
        ...state,
        periodId: action.data.periodId,
        periodStart: action.data.periodStart
      };

    case REEIVE_END_PERIOD:
      AStorage.clear(ACCESS_PERIOD_ID);
      AStorage.clear(ACCESS_PERIOD_START);
      AStorage.clear(ACCESS_CLOCKIN_USERS);

      return {
        ...state,
        isFetching : false,
        periodId: 0,
        periodStart: "",
        isClockedIn: false,
        clockInUsers: []
      };

    case SET_CLOCK_IN_OUT:
      return {
        ...state,
        isClockedIn: action.data
      };
    case SET_CLOCKIN_USERS:
      return {
        ...state,
        clockInUsers: action.data
      };
    case ACTIVE_NAV_MENU:
      return {
        ...state,
        activeMenu: action.data
      };
    case REMOVE_CLOCKIN_USERS:
      AStorage.clear(ACCESS_PERIOD_ID);
      AStorage.clear(ACCESS_PERIOD_START);
      AStorage.clear(ACCESS_CURRENT_USER_ID);
      AStorage.clear(ACCESS_CURRENT_ROLE);
      AStorage.clear(ACCESS_CLOCKIN_USERS);
      
      return new ClockInState();
    default:
      return state;
  }
};
