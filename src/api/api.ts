import { SuperAgentRequest } from 'superagent';
import { getStore } from '../data/configureStore';

export enum ApiMethod {
  UNKNOWN = 1,
  GET,
  POST,
  PUT,
  PATCH,
  DELETE
}

export enum ApiOperation {
  LogIn,
  GetMerchant,
  ValidateUserIn,
  ClockIn,
  ClockOut,
  GetRoles,
  GetWorkPeriod,
  StartWorkPeriod,
  CloseWorkPeriod,
  GetCategories,
  GetProducts,
  TerminalToken,
  CalcTotalSale,
  CreateNewSale,
  CreateNewSaleManual,
  CloseCardAuth,
  CreateCashSale,
  CaptureCardSale,
  SendReceiptData,
  GetWorkPeriods,
  GetUserTotals,
  GetTerminalTotals,
  GetWorkPeriodReport,
  GetWorkPeriodTotals,
  GetTerminalAggregates,
  GetTerminalOrders,
  GetUserAggregates,
  GetUserTerminals,
  GetPeriodNetSales,
  GetPeriodGrossSales,
  GetCustomerScreenOptions,
  GetCustomerScreenOption,
  AddCustomerScreenOption,
  UpdateCustomerScreenOption,
  UpdateStationMode,
  ConfirmTip,
  GetNonCapturedSales,
  BatchOutCaptures,
}

export interface INetwork<C> {
  getHttpInstance: (config: C) => SuperAgentRequest;
  request: <T, U>(
    operation: T,
    params?: Object,
    data?: U,
    urlParams?: Object
  ) => Promise<any>;
}

export interface IApi<U> {
  readonly operation: U;
  readonly params: Object | undefined;
  readonly data: any | undefined;
  readonly urlParams: Object | undefined;
  readonly variables: any;
  getMethod: () => ApiMethod;
  getUrl: () => string;
  getParams: () => Object | undefined;
  getData: () => any | undefined;
  isProtected: () => boolean;
}

export interface IError {
  status: number;
  code: number[];
  title: string;
  details: any;
  chainedErrors: any;
}

export interface IRebelityApi {
  operation: ApiOperation;
  params?: Object | undefined;
  data?: any;
  urlParams?: Object;
  headers?: Object;
  queryType?: string;
  variables?: any;
}

export class RebelityApi implements IApi<ApiOperation> {
  readonly operation: ApiOperation;
  readonly params: Object | undefined;
  readonly data: any | undefined;
  readonly urlParams: Object | undefined;
  readonly queryType: string | undefined;
  readonly variables: any;
  readonly headers: Object | undefined;

  constructor(options: IRebelityApi) {
    const {
      operation,
      params,
      data,
      urlParams,
      queryType,
      variables,
      headers
    } = options;

    this.operation = operation;
    this.params = params;
    this.data = data;
    this.urlParams = urlParams;
    this.queryType = queryType;
    this.variables = variables;
    this.headers = headers;
  }

  getMethod(): ApiMethod {
    switch (this.operation) {
      case ApiOperation.LogIn:
      case ApiOperation.StartWorkPeriod:
      case ApiOperation.TerminalToken:
      case ApiOperation.CalcTotalSale:
      case ApiOperation.CreateNewSale:
      case ApiOperation.CreateNewSaleManual:
      case ApiOperation.CloseCardAuth:
      case ApiOperation.CreateCashSale:
      case ApiOperation.SendReceiptData:
      case ApiOperation.AddCustomerScreenOption:
      case ApiOperation.UpdateCustomerScreenOption:
      case ApiOperation.ConfirmTip:
      case ApiOperation.BatchOutCaptures:
        return ApiMethod.POST;
      
      case ApiOperation.ValidateUserIn:
      case ApiOperation.GetMerchant:
      case ApiOperation.GetRoles:
      case ApiOperation.GetWorkPeriod:
      case ApiOperation.GetCategories:
      case ApiOperation.GetProducts:
      case ApiOperation.GetWorkPeriods:
      case ApiOperation.GetUserTotals:
      case ApiOperation.GetTerminalTotals:
      case ApiOperation.GetWorkPeriodReport:
      case ApiOperation.GetWorkPeriodTotals:
      case ApiOperation.GetTerminalAggregates:
      case ApiOperation.GetTerminalOrders:
      case ApiOperation.GetUserAggregates:
      case ApiOperation.GetUserTerminals:
      case ApiOperation.GetPeriodNetSales:
      case ApiOperation.GetPeriodGrossSales:
      case ApiOperation.GetCustomerScreenOptions:
      case ApiOperation.GetCustomerScreenOption:
      case ApiOperation.GetNonCapturedSales:
        return ApiMethod.GET;

      case ApiOperation.ClockIn:
      case ApiOperation.ClockOut:
      case ApiOperation.CloseWorkPeriod:
      case ApiOperation.CaptureCardSale:
      case ApiOperation.UpdateStationMode:
        return ApiMethod.PUT;

      default:
        return ApiMethod.UNKNOWN;
    }
  }

  getUrl(): string {
    const developerMode = getStore().getState().LoginState.developerMode;
    const host = developerMode
      ? 'https://posapi.rebelity.com/api'
      : 'https://posapi.rebelity.com/api';
    const {
      userId,
      pinNumber,
      periodId,
      merchantId,
      paymentIntentId,
      terminal,
      stationId,
      modeId
    } = (this.getParams() || {}) as any;
    switch (this.operation) {
      case ApiOperation.LogIn:
        return `https://posapi.rebelity.com/token`;
      
      case ApiOperation.GetMerchant:
        return `${host}/merchant`;
      case ApiOperation.GetRoles:
        return `${host}/user/roles/${merchantId}`;
      case ApiOperation.ValidateUserIn:
        return `${host}/user/validate/${pinNumber}`;
      case ApiOperation.ClockIn:
        return `${host}/user/clockin/${pinNumber}/${periodId}`;
      case ApiOperation.ClockOut:
        return `${host}/user/clockout/${pinNumber}`;
      
      case ApiOperation.GetWorkPeriod:
        return `${host}/admin/workperiod/current`;
      case ApiOperation.StartWorkPeriod:
        return `${host}/admin/workperiod/begin`;
      case ApiOperation.CloseWorkPeriod:
        return `${host}/admin/workperiod/end/${periodId}`;
      case ApiOperation.GetWorkPeriods:
        return `${host}/admin/workperiods`;

      case ApiOperation.GetCategories:
        return `${host}/products/categories/${merchantId}`;
      case ApiOperation.GetProducts:
        return `${host}/products/${merchantId}`;

      case ApiOperation.TerminalToken:
        return `${host}/terminal/CreateToken`;
      
      case ApiOperation.CalcTotalSale:
        return `${host}/sales/totals`;
      case ApiOperation.CreateNewSale:
        return `${host}/sales/newsale`;
      case ApiOperation.CreateNewSaleManual:
        return `${host}/sales/NewSaleManual`;
      case ApiOperation.CloseCardAuth:
        return `${host}/payment/capture/close`;
      case ApiOperation.BatchOutCaptures:
        return `${host}/payment/capture/batch-captures`;

      case ApiOperation.CreateCashSale:
        return `${host}/sales/cashsale`;
      case ApiOperation.CaptureCardSale:
        return `${host}/sales/capture/${paymentIntentId}`;
      case ApiOperation.SendReceiptData:
        return `${host}/sales/receipt`;

      case ApiOperation.ConfirmTip:
        return `${host}/Sales/ConfirmTip`;

      case ApiOperation.GetUserTotals:
        return `${host}/reports/user-totals/${periodId}`;
      case ApiOperation.GetTerminalTotals:
        return `${host}/reports/terminal-totals/${periodId}`;
      case ApiOperation.GetWorkPeriodReport:
        return `${host}/reports/workperiod/${periodId}`;
      case ApiOperation.GetWorkPeriodTotals:
        return `${host}/reports/period-totals/${periodId}`;
      case ApiOperation.GetTerminalAggregates:
        return `${host}/reports/terminal-sales/aggregates/${terminal}/${periodId}`;
      case ApiOperation.GetTerminalOrders:
        return `${host}/reports/terminal-sales/orders/${terminal}/${periodId}`;
      case ApiOperation.GetUserAggregates:
        return `${host}/reports/user-sales/aggregates/${userId}/${periodId}`;
      case ApiOperation.GetUserTerminals:
        return `${host}/reports/user-sales/itemized/${userId}/${periodId}`;
      case ApiOperation.GetPeriodNetSales:
        return `${host}/reports/net-sales/${periodId}`;
      case ApiOperation.GetPeriodGrossSales:
        return `${host}/reports/gross-sales/${periodId}`;
      case ApiOperation.GetNonCapturedSales:
        return `${host}/reports/workperiod_captures/${periodId}`;

      case ApiOperation.GetCustomerScreenOptions:
        return `${host}/station/list/${merchantId}`;
      case ApiOperation.GetCustomerScreenOption:
        return `${host}/station/${stationId}`;
      case ApiOperation.AddCustomerScreenOption:
        return `${host}/station/add`;
      case ApiOperation.UpdateCustomerScreenOption:
        return `${host}/station/update`;
      case ApiOperation.UpdateStationMode:
        return `${host}/station/terminalmode/${stationId}/${modeId}`;
      
      default:
        return '';
    }
  }

  getParams(): Object | undefined {
    return this.params;
  }

  getData(): any | undefined {
    return this.variables;
  }

  getUrlParams(): Object {
    return this.urlParams || {};
  }

  isProtected(): boolean {
    switch (this.operation) {
      case ApiOperation.LogIn:
        return false;

      case ApiOperation.ValidateUserIn:
      case ApiOperation.ClockIn:
      case ApiOperation.ClockOut:
      case ApiOperation.GetRoles:
      case ApiOperation.GetWorkPeriod:
      case ApiOperation.StartWorkPeriod:
      case ApiOperation.CloseWorkPeriod:
      case ApiOperation.GetMerchant:
      case ApiOperation.GetCategories:
      case ApiOperation.GetProducts:
      case ApiOperation.TerminalToken:
      case ApiOperation.CreateNewSale:
      case ApiOperation.CreateNewSaleManual:
      case ApiOperation.CreateCashSale:
      case ApiOperation.CloseCardAuth:
      case ApiOperation.CaptureCardSale:
      case ApiOperation.SendReceiptData:
      case ApiOperation.CalcTotalSale:
      case ApiOperation.GetWorkPeriods:
      case ApiOperation.GetUserTotals:
      case ApiOperation.GetTerminalTotals:
      case ApiOperation.GetWorkPeriodReport:
      case ApiOperation.GetWorkPeriodTotals:
      case ApiOperation.GetTerminalAggregates:
      case ApiOperation.GetTerminalOrders:
      case ApiOperation.GetUserAggregates:
      case ApiOperation.GetUserTerminals:
      case ApiOperation.GetPeriodNetSales:
      case ApiOperation.GetPeriodGrossSales:
      case ApiOperation.GetCustomerScreenOptions:
      case ApiOperation.GetCustomerScreenOption:
      case ApiOperation.AddCustomerScreenOption:
      case ApiOperation.UpdateCustomerScreenOption:
      case ApiOperation.UpdateStationMode:
      case ApiOperation.ConfirmTip:
      case ApiOperation.GetNonCapturedSales:
      case ApiOperation.BatchOutCaptures:
        return true;

      default:
        return false;
    }
  }

  getHeaders(): Object {
    return this.headers || {};
  }
}
