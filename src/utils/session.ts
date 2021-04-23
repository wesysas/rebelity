import jwtDecode from 'jwt-decode';
import { Dispatch } from 'redux';

import { getStore } from '../data/configureStore';
import AStorage from './Storage';

import {
  removeSession,
  setDeveloperMode,
  setAdminName,
  setLoginedIn,
  setMerchant,
  requestCheckLogin,
  receiveCheckLogin
} from '../pages/Login/actions';

import {
  setCurrentUserId,
  setCurrentRole,
  setWorkPeriod,
  setClockInUsers
} from '../pages/ClockIn/actions';

import {
  setPosCategories,
  setPosProducts
} from '../pages/Pos/actions';

import {
  STATION_MODE_COFFEE_SHOP,
  STATION_MODE_BAR
} from '../data/coreTypes';


import { ClockInUser } from '../models/ClockInUser';
import { Category, Product } from '../models/Pos';
import { setStationId, receiveSetStationMode } from '../pages/Setting/actions';

export const ACCESS_TOKEN_NAME = 'access_token';
export const ACCESS_HANDLE_NAME = 'handle_name';
export const ACCESS_ADMIN_NAME = 'admin_name';
export const ACCESS_MERCHANT = 'merchant';
export const ACCESS_PERIOD_ID = 'work_period_id';
export const ACCESS_PERIOD_START = 'work_period_start';
export const ACCESS_CURRENT_USER_ID = 'current_user_id';
export const ACCESS_CURRENT_ROLE = 'current_role';
export const ACCESS_CLOCKIN_USERS = 'clockin_users';
export const ACCESS_POS_CATEGORIES = 'pos_categories';
export const ACCESS_POS_PRODUCTS = 'pos_products';
export const ACCESS_STATION_ID = 'station_id';
export const ACCESS_STATION_MODE = 'station_mode_id';

const isTokenExpired = (expiresAt: number): boolean => {
  // TODO: Add proper time zone comparison
  const now = Math.round(Date.now() / 1000);
  return expiresAt < now;
};

export const getToken = async () => {
  let accessToken: string | null = '';
  let adminId: string | null = '';
  let handle: string | null = '';
  let adminName: string | null = '';
  let merchant: any | null = null;
  let periodId: number | null = 0;
  let periodStart: string | null = "";
  let currentUserId: number | null = 0;
  let currentRole: number | null = 0;
  let clockInUsers: ClockInUser[] | null = [];
  let posCategories: Category[] | null = [];
  let posProducts: Product[] | null = [];
  let developerMode: boolean;
  let stationId: number | null = 0;
  let stationModeId: number | null = 0;

  try {
    accessToken = getStore().getState().LoginState.accessToken;
    adminId = getStore().getState().LoginState.adminId;
    handle = getStore().getState().LoginState.handle;
    adminName = getStore().getState().LoginState.adminName;
    merchant = getStore().getState().LoginState.merchant;
    periodId = getStore().getState().ClockInState.periodId;
    periodStart = getStore().getState().ClockInState.periodStart;
    currentUserId = getStore().getState().ClockInState.currentUserId;
    currentRole = getStore().getState().ClockInState.currentRole;
    clockInUsers = getStore().getState().ClockInState.clockInUsers;
    posCategories = getStore().getState().PosState.categories;
    posProducts = getStore().getState().PosState.products;
    stationId = getStore().getState().SettingState.stationId;
    stationModeId = getStore().getState().SettingState.stationModeId;
        
    var devMode: any = await AStorage.getItem('developerMode');
    
    devMode = (devMode == 'true')
    devMode = devMode == null ? false : devMode;
    developerMode = getStore().getState().LoginState.developerMode || devMode;
    
    if (!accessToken) {
      var token = await AStorage.getItem(ACCESS_TOKEN_NAME);
      console.log("storage token");
      console.log(token);
      token = token == null ? "" : eval(token);
      accessToken = token;
    }

    if (!merchant) {
      var storate_merchant = await AStorage.getItem(ACCESS_MERCHANT);
      
      storate_merchant = storate_merchant == null ? null : JSON.parse(storate_merchant);
      console.log("storage merchant");

      console.log(storate_merchant);
      getStore().dispatch(setMerchant(storate_merchant));
    }

    if (currentUserId == 0) {
      var user_id = await AStorage.getItem(ACCESS_CURRENT_USER_ID);
      user_id = user_id == null ? 0 : user_id;
      getStore().dispatch(setCurrentUserId(user_id));
    }

    if (currentRole == 0) {
      var role = await AStorage.getItem(ACCESS_CURRENT_ROLE);
      role = role == null ? 0 : role;
      getStore().dispatch(setCurrentRole(role));
    }

    if (periodId == 0) {
      var work_period_id = await AStorage.getItem(ACCESS_PERIOD_ID);
      work_period_id = work_period_id == null ? 0 : work_period_id;

      var work_period_start = await AStorage.getItem(ACCESS_PERIOD_START);
      work_period_start = work_period_start == null ? "" : eval(work_period_start);

      getStore().dispatch(setWorkPeriod({periodId: work_period_id, periodStart: work_period_start}));
    }

    if (clockInUsers.length == 0) {
      var users = await AStorage.getItem(ACCESS_CLOCKIN_USERS);
      users = users == null ? [] : JSON.parse(users) as ClockInUser[];

      getStore().dispatch(setClockInUsers(users));
    }

    if (posCategories.length == 0) {
      var categories = await AStorage.getItem(ACCESS_POS_CATEGORIES);
      categories = categories == null ? [] : JSON.parse(categories) as Category[];

      getStore().dispatch(setPosCategories(categories));
    }

    if (posProducts.length == 0) {
      var products = await AStorage.getItem(ACCESS_POS_PRODUCTS);
      products = products == null ? [] : JSON.parse(products) as Product[];

      getStore().dispatch(setPosProducts(products));
    }
      /**/

    /*if (!userId) {
      let decoded = jwtDecode(accessToken as string) as any;

      getStore().dispatch(setUserId(decoded.id));
    }*/
    /*if (!handle) {
      const handleStorage = await AStorage.getItem('handle_name');

      getStore().dispatch(setHandleName(handleStorage));
    }*/
    if (!adminName) {
      const handleUserName = await AStorage.getItem(ACCESS_ADMIN_NAME);
      getStore().dispatch(setAdminName(handleUserName));
    }

    if (!stationId) {
      var storedStationId = await AStorage.getItem(ACCESS_STATION_ID);
      storedStationId = storedStationId == null ? 0 : storedStationId;
      getStore().dispatch(setStationId(storedStationId));
    }

    if (!stationModeId) {
      var storedModeId = await AStorage.getItem(ACCESS_STATION_MODE);
      storedModeId = storedModeId == null ? STATION_MODE_COFFEE_SHOP : storedModeId * 1;
      getStore().dispatch(receiveSetStationMode(storedModeId));
    }

    getStore().dispatch(setDeveloperMode(developerMode));

    
  } catch (err) {
    const accessTokenFromLocaleStorage = await AStorage.getItem(
      ACCESS_TOKEN_NAME
    );
    
    accessToken = accessTokenFromLocaleStorage
      ? accessTokenFromLocaleStorage.token
      : '';
  }
  return accessToken;
};

export const authenticate = () => {
  return async (dispatch: Dispatch) => {
    dispatch(requestCheckLogin());
    const token = await getToken();
 
    if (!token) {
      dispatch(removeSession());
    } else {
      dispatch(setLoginedIn());
      //dispatch(removeSession());

      //history.replaceState('/home', {direction: 'none'});
      //dispatch(removeSession());
      //await store.dispatch(initialLoadProfile() as any);
    }
    dispatch(receiveCheckLogin());
  }
}

export const checkLogined = async (history: any) => {
  let accessToken: string | null = '';
  
  try {
    accessToken = getStore().getState().LoginState.accessToken;
        
    if (!accessToken) {
      var token = await AStorage.getItem(ACCESS_TOKEN_NAME);
      console.log("login test storage token");
      console.log(token);
      token = token == null ? "" : eval(token);
      accessToken = token;
    }
    
  } catch (err) {
    const accessTokenFromLocaleStorage = await AStorage.getItem(
      ACCESS_TOKEN_NAME
    );
    
    accessToken = accessTokenFromLocaleStorage
      ? accessTokenFromLocaleStorage.token
      : '';
  }

  //console.log("***********");
 // console.log(accessToken);
 // console.log("***********");
  if (accessToken == null || accessToken == '') {
    return false;
  } else {
    console.log("history");
    console.log(history);
    //history.replace("/clockin", {direction: 'none'});

    return true;
  } 
};

