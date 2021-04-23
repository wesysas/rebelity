import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import { IGlobalState, IAction } from "./coreTypes";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import { LoginReducer } from "../pages/Login/reducer";
import { ClockInReducer } from "../pages/ClockIn/reducer";
import { PosReducer } from "../pages/Pos/reducer";
import { SettingReducer } from "../pages/Setting/reducer";
import { AlertReducer } from '../pages/AlertModal/reducer';
import { ErrorReducer } from '../pages/ErrorModal/reducer';
import { ConnectionReducer } from "./connectionCheck/reducer";
import { ReportReducer } from "../pages/Report/reducer";
import { SalesExpensesReducer } from "../pages/SalesExpenses/reducer";

const getReducerObject = () => ({
  LoginState: LoginReducer,
  ClockInState: ClockInReducer,
  PosState: PosReducer,
  SettingState: SettingReducer,
  AlertState: AlertReducer,
  ErrorState: ErrorReducer,
  ConnectionState: ConnectionReducer,
  ReportState: ReportReducer,
  SalesExpensesState: SalesExpensesReducer
});

const configureReducers = () =>
  combineReducers<IGlobalState>(getReducerObject());

const rootReducer = (
  state: IGlobalState,
  action: IAction<any>
): IGlobalState => {
  return configureReducers()(state, action);
};

const middlewares = [thunk];
const enhancers = process.env.NODE_ENV 
  ? composeWithDevTools(applyMiddleware(...middlewares)) 
  : applyMiddleware(...middlewares);

const store = createStore<IGlobalState, any, any, any>(
  rootReducer as any,
  enhancers
);

export const getStore = (): Store<IGlobalState> => {
  if (!store) {
    throw new Error(
      "redux store is not defined, use function withAppStore or withMockStore"
    );
  }
  return store;
};
