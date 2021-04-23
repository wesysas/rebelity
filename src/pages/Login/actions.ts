import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { LoginScreenFromData, AuthResponse } from './types';
import { IAction, STATUS_OK } from '../../data/coreTypes';
import { openError } from '../ErrorModal/actions';
import { openAlert } from '../AlertModal/actions';
import { removeClockInUsers } from '../ClockIn/actions';
import { receivePosCategories, receivePosProducts } from '../Pos/actions';


export const REQUEST_LOGIN_ADMIN = 'REQUEST_LOGIN_ADMIN';
export const requestLogInAdmin = (): IAction<undefined> => {
  return {
    type: REQUEST_LOGIN_ADMIN,
    data: undefined
  };
};

export const FAILURE_LOGIN_ADMIN = 'FAILURE_LOGIN_ADMIN';
export const failureLogInAdmin = (): IAction<undefined> => {
  return {
    type: FAILURE_LOGIN_ADMIN,
    data: undefined
  };
};

export const RECEIVE_LOGIN_ADMIN = 'RECEIVE_LOGIN_ADMIN';
export const receiveLoginAdmin = (data: AuthResponse): IAction<AuthResponse> => {
  return {
    type: RECEIVE_LOGIN_ADMIN,
    data
  };
};

export const SET_MERCHANT = 'SET_MERCHANT';
export const setMerchant = (data: any): IAction<any> => {
  return {
    type: SET_MERCHANT,
    data
  };
};

export const RECEIVE_SESSION_FROM_LOCAL_STORAGE =
  'RECEIVE_SESSION_FROM_LOCAL_STORAGE';
export const receiveSessionFromLocalStorage = (
  session: AuthResponse
): IAction<AuthResponse> => {
  return {
    type: RECEIVE_SESSION_FROM_LOCAL_STORAGE,
    data: session
  };
};

export const REMOVE_SESSION = 'REMOVE_SESSION';
export const removeSession = (): IAction<undefined> => {
  return {
    type: REMOVE_SESSION,
    data: undefined
  };
};

export const SET_ADMIN_ID = 'SET_ADMIN_ID';
export const setUserId = (data: string): IAction<string> => {
  return {
    type: SET_ADMIN_ID,
    data
  };
};

export const SET_LOGINED_IN = 'SET_LOGINED_IN';
export const setLoginedIn = (): IAction<undefined> => {
  return {
    type: SET_LOGINED_IN,
    data: undefined
  };
};

export const SET_HANDLE_NAME = 'SET_HANDLE_NAME';
export const setHandleName = (data: string): IAction<string> => {
  return {
    type: SET_HANDLE_NAME,
    data
  };
};

export const SET_ADMIN_NAME = 'SET_ADMIN_NAME';
export const setAdminName = (data: string): IAction<string> => {
  return {
    type: SET_ADMIN_NAME,
    data
  };
};

export const SET_DEVELOPER_MODE = 'SET_DEVELOPER_MODE';
export const setDeveloperMode = (data: boolean) => {
  return {
    type: SET_DEVELOPER_MODE,
    data
  };
};

export const REQUEST_CHECK_LOGIN = 'REQUEST_CHECK_LOGIN';
export const requestCheckLogin = (): IAction<undefined> => {
  return {
    type: REQUEST_CHECK_LOGIN,
    data: undefined
  };
};

export const RECEIVE_CHECK_LOGIN = 'RECEIVE_CHECK_LOGIN';
export const receiveCheckLogin = (): IAction<undefined> => {
  return {
    type: RECEIVE_CHECK_LOGIN,
    data: undefined
  };
};

export const logoutAdmin = () => {
  return (dispatch: Dispatch) => {
    dispatch(removeSession());
    dispatch(removeClockInUsers());
    
    console.log("logout");
    //history.replace("/", {direction: 'none'});
  };
};

export const loginAdmin = (
  payload: LoginScreenFromData,
  setErrors: any,
  history: any
) => {
  return (dispatch: Dispatch) => {
    const { username, password } = payload;

    dispatch(requestLogInAdmin());
    request({
      operation: ApiOperation.LogIn,
      variables: {
        username,
        password,
        grant_type: "password"
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      console.log("user");
      console.log(res);
      dispatch(receiveLoginAdmin(res));
      getMerchant(dispatch, history);
    })
    .catch(err => {
      failureLoginWithError(dispatch);
    });
  };
};

const getMerchant = (dispatch: Dispatch, history: any) => {
  request({
    operation: ApiOperation.GetMerchant,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    console.log("merchant");
    console.log(res);
    const merchantId = res.MerchantId;

    dispatch(setMerchant(res));
    getPosCategories(dispatch, history, merchantId);
  })
  .catch(err => {
    console.log("merchant error");
    console.log(err);
    failureLoginWithError(dispatch);
  });
}

const getPosCategories = (
  dispatch: Dispatch, 
  history: any,
  merchantId: number
) => {
  console.log("get categories");
    
  request({
    operation: ApiOperation.GetCategories,
    params: {
      merchantId
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    if (res.status == STATUS_OK) {
      
      console.log("received categories");
      console.log(res);
      dispatch(receivePosCategories(res.categories));

      getPosProducts(dispatch, history, merchantId);
    } else {
      failureLoginWithAlert(dispatch, 'Get Categories', res.message);
    }
  })
  .catch(err => {
    failureLoginWithError(dispatch);
  });
};

const getPosProducts = (
  dispatch: Dispatch, 
  history: any,
  merchantId: number
) => {
  request({
    operation: ApiOperation.GetProducts,
    params: {
      merchantId
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    if (res.status == STATUS_OK) {
      
      console.log("get products");
      console.log(res);
      dispatch(receivePosProducts(res.products));

      dispatch(setLoginedIn());
      history.replace("/clockin", {direction: 'none'});
      
    } else {
      failureLoginWithAlert(dispatch, 'Get Products', res.message);
    }
  })
  .catch(err => {
    failureLoginWithError(dispatch);
  });
};

const failureLoginWithError = (dispatch: Dispatch) => {
  dispatch(failureLogInAdmin());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

const failureLoginWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureLogInAdmin());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};