import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { ClockInUser} from '../../models/ClockInUser';
import { ClockScreenFromData } from './types';
import { IAction, STATUS_OK, ROLE_ADMIN_ID, STATION_MODE_BAR } from '../../data/coreTypes';
import { openError} from '../ErrorModal/actions';
import { openAlert } from '../AlertModal/actions';
import { getStore } from '../../data/configureStore';

export const REQUEST_PIN_USER = 'REQUEST_PIN_USER';
export const requestPinUser = (data: string): IAction<string> => {
  return {
    type: REQUEST_PIN_USER,
    data
  };
};

export const FAILURE_PIN_USER = 'FAILURE_PIN_USER';
export const failurePinUser = (): IAction<undefined> => {
  return {
    type: FAILURE_PIN_USER,
    data: undefined
  };
};

export const VALIDATE_PIN_USER = 'VALIDATE_PIN_USER';
export const validatePinUser = (data: any): IAction<any> => {
  return {
    type: VALIDATE_PIN_USER,
    data
  };
};

export const RECEIVE_PIN_USER = 'RECEIVE_PIN_USER';
export const receivePinUser = (): IAction<undefined> => {
  return {
    type: RECEIVE_PIN_USER,
    data: undefined
  };
};

export const EXIT_PIN_USER = 'EXIT_PIN_USER';
export const exitPinUser = (): IAction<undefined> => {
  return {
    type: EXIT_PIN_USER,
    data: undefined
  };
};

export const REQUEST_CLOCKIN_USER = 'REQUEST_CLOCKIN_USER';
export const requestClockInUser = (): IAction<undefined> => {
  return {
    type: REQUEST_CLOCKIN_USER,
    data: undefined
  };
};

export const FAILURE_CLOCKIN_USER = 'FAILURE_CLOCKIN_USER';
export const failureClockInUser = (): IAction<undefined> => {
  return {
    type: FAILURE_CLOCKIN_USER,
    data: undefined
  };
};

export const RECEIVE_CLOCKIN_USER = 'RECEIVE_CLOCKIN_USER';
export const receiveClockInUser = (data: any): IAction<any> => {
  return {
    type: RECEIVE_CLOCKIN_USER,
    data
  };
};

export const REQUEST_CLOCKOUT_USER = 'REQUEST_CLOCKOUT_USER';
export const requestClockOutUser = (): IAction<undefined> => {
  return {
    type: REQUEST_CLOCKOUT_USER,
    data: undefined
  };
};

export const FAILURE_CLOCKOUT_USER = 'FAILURE_CLOCKOUT_USER';
export const failureClockOutUser = (): IAction<undefined> => {
  return {
    type: FAILURE_CLOCKOUT_USER,
    data: undefined
  };
};

export const RECEIVE_CLOCKOUT_USER = 'RECEIVE_CLOCKOUT_USER';
export const receiveClockOutUser = (data: any): IAction<any> => {
  return {
    type: RECEIVE_CLOCKOUT_USER,
    data
  };
};

export const RECEIVE_WORK_PERIOD = 'RECEIVE_WORK_PERIOD';
export const receiveWorkPeriod = (data: any): IAction<any> => {
  return {
    type: RECEIVE_WORK_PERIOD,
    data
  };
};

export const RECEIVE_START_PERIOD = 'RECEIVE_START_PERIOD';
export const receiveStartPeriod = (data: any): IAction<any> => {
  return {
    type: RECEIVE_START_PERIOD,
    data
  };
};

export const SET_WORK_PERIOD = 'SET_WORK_PERIOD';
export const setWorkPeriod = (data: any): IAction<any> => {
  return {
    type: SET_WORK_PERIOD,
    data
  };
};

export const REEIVE_END_PERIOD = 'REEIVE_END_PERIOD';
export const receiveEndPeriod = (): IAction<undefined> => {
  return {
    type: REEIVE_END_PERIOD,
    data: undefined
  };
};

export const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';
export const setCurrentUserId = (data: number): IAction<number> => {
  return {
    type: SET_CURRENT_USER_ID,
    data
  };
};

export const SET_CURRENT_ROLE = 'SET_CURRENT_ROLE';
export const setCurrentRole = (data: number): IAction<number> => {
  return {
    type: SET_CURRENT_ROLE,
    data
  };
};

export const SET_CLOCK_IN_OUT = 'SET_CLOCK_IN_OUT';
export const setClockInOut = (data: any): IAction<any> => {
  return {
    type: SET_CLOCK_IN_OUT,
    data
  };
};

export const SET_CLOCKIN_USERS = 'SET_CLOCKIN_USERS';
export const setClockInUsers = (data: any): IAction<any> => {
  return {
    type: SET_CLOCKIN_USERS,
    data
  };
};

export const REMOVE_CLOCKIN_USERS = 'REMOVE_CLOCKIN_USERS';
export const removeClockInUsers = (): IAction<undefined> => {
  return {
    type: REMOVE_CLOCKIN_USERS,
    data: undefined
  };
};

export const ACTIVE_NAV_MENU = 'ACTIVE_NAV_MENU';
export const setActiveMenu = (data: string): IAction<string> => {
  return {
    type: ACTIVE_NAV_MENU,
    data
  };
};

export const pinInUser = (
  payload: ClockScreenFromData,
  setErrors: any,
  history: any
) => {
  return (dispatch: Dispatch) => {
    const { pinNumber } = payload;
    
    dispatch(requestPinUser(pinNumber));

    request({
      operation: ApiOperation.ValidateUserIn,
      params: {
        pinNumber
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      if (res.status == STATUS_OK) {
        
        console.log("validate user");
        console.log(res);

        let role = Math.min(...res.userRoles.Roles);
        let userId = res.userRoles.UserId;

        dispatch(validatePinUser({userId: userId, role: role}));
        checkPeriod(dispatch, userId, role, history);

      } else {
        failurePinWithAlert(dispatch, 'Validate User', res.message);
      }
    })
    .catch(err => {
      failurePinWithError(dispatch);
    });
  };
};

const checkPeriod = (dispatch: Dispatch, userId: number, role: number, history: any) => {
  
  request({
    operation: ApiOperation.GetWorkPeriod,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    console.log("period");
    console.log(res);

    if (res.status == STATUS_OK) {
      let workPeriodId = res.workPeriod.PeriodId;
      let periodStart = res.workPeriod.Start;
      dispatch(receiveWorkPeriod({periodId: workPeriodId, periodStart: periodStart}));

      var isClockedIn = false;
      if (role == ROLE_ADMIN_ID) {
        if (workPeriodId > 0 ) {
          isClockedIn = checkClockIn(userId);
        }
        dispatch(receivePinUser());
        dispatch(setClockInOut(isClockedIn));
        dispatch(setActiveMenu('/utility'));

        history.push('/utility', {direction: 'none'});
      } else {
        if (workPeriodId == 0) {
          failurePinWithAlert(dispatch, 'Pin In', 'Please ask the adminstrator to start work period.');
        } else {
          isClockedIn = checkClockIn(userId);
          dispatch(receivePinUser());
          dispatch(setClockInOut(isClockedIn));

          if (isClockedIn) {
            dispatch(setActiveMenu('/pos'));
            history.push('/pos', {direction: 'none'});
          } else {
            dispatch(setActiveMenu('/utility'));
            history.push('/utility', {direction: 'none'});
          }
        }
      }
    } else {
      failurePinWithAlert(dispatch, 'Work Period', res.message);
    }
  })
  .catch(err => {
    failurePinWithError(dispatch);
  });
};

const checkClockIn = (userId: number) => {
  const { clockInUsers } = getStore().getState().ClockInState;

  console.log("validate user id");
  console.log(userId);

  console.log("validate clockIn users");
  console.log(clockInUsers);

  for (var i = 0; i < clockInUsers.length; i++) {
    console.log("collection users");
    console.log(clockInUsers[i]);
    console.log(clockInUsers[i].userId);

    if (clockInUsers[i].userId == userId) {
      console.log("validate clockIn return true");
      console.log(clockInUsers[i]);

      return true;
    }
  }

  console.log("validate clockIn return false");

  return false;
};

export const clockInUser = (
  pinNumber: string,
  periodId: number
) => {
  return (dispatch: Dispatch) => {
    
    console.log("clock in");
    console.log(pinNumber);
    console.log(periodId);

    dispatch(requestClockInUser());

    request({
      operation: ApiOperation.ClockIn,
      params: {
        pinNumber,
        periodId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      if (res.status == STATUS_OK) {
        console.log("clock in res");
        console.log(res);
        let user : ClockInUser = {
          userId: res.user.UserId,
          userName: res.user.Username,
          clockInDate: res.user.ClockinDate,
          topRole: Math.min(...res.user.Roles),
          roles: res.user.Roles
        };

        dispatch(receiveClockInUser(user));
      } else {
        failureClockInWithAlert(dispatch, 'Clock In', res.message);
      }
    })
    .catch(err => {
      console.log("Clock In");
      console.log(err);
      failureClockInWithError(dispatch);
    });
  };
};

export const clockOutUser = (
  payload: any
) => {
  return (dispatch: Dispatch) => {
    
    console.log("clock out");
    const pinNumber = payload.pinNumber;
    const userId = payload.currentUserId;
    const periodId = payload.periodId;
    const stationModeId = payload.stationModeId;

    console.log(pinNumber);
    console.log(userId);

    dispatch(requestClockOutUser());

    if (stationModeId != STATION_MODE_BAR) {
      clockOutUserFromSystem(dispatch, pinNumber, userId);
    } else {
      const userTerminals = getStore().getState().SalesExpensesState.userTerminals

      if (userTerminals.length > 0) {
        let tips = userTerminals.filter((s: any) => s.tipConfirmed == false);
        if (tips.length > 0) {
          failureClockOutWithAlert(dispatch, 'Clock Out', "There are some unconfirmed tips, please confirm tips");
        } else {
          clockOutUserFromSystem(dispatch, pinNumber, userId);
        }
      } else {
        request({
          operation: ApiOperation.GetUserTerminals,
          params: {
              userId: userId,
              periodId: periodId
          },
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((res: any) => {
            if (res.status == STATUS_OK) {
              console.log("clock out res.sales");
              console.log(res.sales);
              if (res.sales.length > 0) {
                let tips = res.sales.filter((s: any) => s.TipConfirmed == false);
              
                if (tips.length > 0) {
                  failureClockOutWithAlert(dispatch, 'Clock Out', "There are some unconfirmed tips, please confirm tips");
                } else {
                  clockOutUserFromSystem(dispatch, pinNumber, userId);
                }
              } else {
                clockOutUserFromSystem(dispatch, pinNumber, userId);
              }
            } else {
              failureClockOutWithAlert(dispatch, 'Clock Out', res.message);
            }
        })
        .catch((err: any) => {
          failureClockOutWithError(dispatch);
        });
      }
    }
  } 
};

const clockOutUserFromSystem = (dispatch: Dispatch, pinNumber: any, userId: any) => {
  request({
    operation: ApiOperation.ClockOut,
    params: {
      pinNumber
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    if (res.status == STATUS_OK) {
      dispatch(receiveClockOutUser(userId));
    } else {
      failureClockOutWithAlert(dispatch, 'Clock Out', res.message);
    }
  })
  .catch(err => {
    console.log("Clock Out");
    console.log(err);
    failureClockOutWithError(dispatch);
  });
};

export const endWordPeriod = (
  periodId: number
) => {
  return (dispatch: Dispatch) => {
    
    dispatch(requestClockOutUser());
    console.log("end period uncaptured request");
    const nonCapturedSales = getStore().getState().SalesExpensesState.nonCapturedSales

    if (nonCapturedSales.length > 0) {
      failureClockOutWithAlert(dispatch, 'End Period', "There are some uncaptured sales, please capture the sales");
    } else {
      request({
        operation: ApiOperation.GetNonCapturedSales,
        params: {
            periodId
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((res: any) => {
        console.log("end period uncaptured res");
        console.log(res);

        if (res.status == STATUS_OK) { 
          console.log("end period uncaptured res ok");
          var captures = res.report.Captures;
          var nonCapturedSales = captures.filter((c: any) => c.IsCaptured == false);
          if (nonCapturedSales.length > 0) {
            failureClockOutWithAlert(dispatch, 'End Period', "There are some uncaptured sales, please capture the sales");
          } else {
            endWordPeriodFromSystem(dispatch, periodId);
          }
          //endWordPeriodFromSystem(dispatch, periodId);
        } else {
          failureClockOutWithAlert(dispatch, 'End Period', res.message);
        }
      })
      .catch((err: any) => {
        failureClockOutWithError(dispatch);
      });
    }
  };
};

const endWordPeriodFromSystem = (dispatch: Dispatch,  periodId: number) => {
  dispatch(requestClockOutUser());
  console.log("end period request");
  request({
    operation: ApiOperation.CloseWorkPeriod,
    params: {
      periodId
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    console.log("end period res");
    console.log(res);
    if (res.status == STATUS_OK) {
      dispatch(receiveEndPeriod());
    } else {
      failureClockOutWithAlert(dispatch, 'End Period', res.message);
    }
  })
  .catch(err => {
    console.log("End Period");
    console.log(err);
    failureClockOutWithError(dispatch);
  });
  
};

export const startWordPeriod = () => {
  return (dispatch: Dispatch) => {
    
    dispatch(requestClockInUser());

    request({
      operation: ApiOperation.StartWorkPeriod,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      if (res.status == STATUS_OK) {
        console.log("period start response");
        console.log(res);
        dispatch(receiveStartPeriod({periodId: res.workPeriod.PeriodId, periodStart: res.workPeriod.Start}));
      } else {
        failureClockInWithAlert(dispatch, 'Start Period', res.message);
      }
    })
    .catch(err => {
      console.log("Start Period");
      console.log(err);
      failureClockInWithError(dispatch);
    });
  };
};

const failurePinWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failurePinUser());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failurePinWithError = (dispatch: Dispatch) => {
  dispatch(failurePinUser());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

const failureClockInWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureClockInUser());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureClockInWithError = (dispatch: Dispatch) => {
  dispatch(failureClockInUser());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

const failureClockOutWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureClockOutUser());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureClockOutWithError = (dispatch: Dispatch) => {
  dispatch(failureClockOutUser());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};