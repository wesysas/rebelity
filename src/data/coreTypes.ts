import { LoginState } from "../pages/Login/reducer";
import { ClockInState } from "../pages/ClockIn/reducer";
import { PosState } from "../pages/Pos/reducer";
import { SettingState } from "../pages/Setting/reducer";
import { AlertState } from "../pages/AlertModal/reducer";
import { ErrorState } from "../pages/ErrorModal/reducer";
import { ConnectionState } from "./connectionCheck/reducer";
import { ReportState } from "../pages/Report/reducer";
import { SalesExpensesState } from "../pages/SalesExpenses/reducer";

export interface IGlobalState {
  LoginState: LoginState;
  ClockInState: ClockInState;
  PosState: PosState;
  SettingState: SettingState;
  AlertState: AlertState;
  ErrorState: ErrorState;
  ConnectionState: ConnectionState;
  ReportState: ReportState;
  SalesExpensesState: SalesExpensesState;
}

export interface IAction<T> {
  type: string;
  data: T;
}

export type ObjectWithStrings = { [key: string]: string };

export const STATUS_OK = "Ok";
export const STATUS_ERROR = "Error";

export const ROLE_ADMIN_ID = 1;
export const ROLE_MANAGER_ID = 2;
export const ROLE_USER_ID = 3;

export const PAYMENT_TYPE_NONE = "none";
export const PAYMENT_TYPE_CASH = "cash";
export const PAYMENT_TYPE_CARD = "card";
export const PAYMENT_TYPE_CARD_AUTHORIZE = "card_authorize";

export const PAYMENT_STATUS_NONE = "none";
export const PAYMENT_STATUS_SUCCESS = "success";
export const PAYMENT_STATUS_FAILED = "failed";

export const PRINT_ALIGN_LEFT = "align_left";
export const PRINT_ALIGN_RIGHT = "align_right";
export const PRINT_ALIGN_CENTER = "align_center";
export const PRINT_NEXT_LINE = "next_line";

export const RECEIPT_STATUS_NONE = "none";
export const RECEIPT_STATUS_SUCCESS = "success";
export const RECEIPT_STATUS_FAILED = "failed";

export const STATION_MODE_COFFEE_SHOP : number = 1;
export const STATION_MODE_BAR : number = 2;
export const STATION_MODE_RESTAURANT : number = 3;