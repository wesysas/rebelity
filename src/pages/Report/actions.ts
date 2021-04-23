import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { IAction, STATUS_OK } from '../../data/coreTypes';
import { GrossSalesDataModel, WorkPeriod, WorkPeriodAggregateSaleItem } from '../../models/Report';
import { getFormattedTime } from '../../utils/methods';
import { openAlert } from '../AlertModal/actions';
import { openError} from '../ErrorModal/actions';

export const REQUEST_WORK_PERIODS = 'REQUEST_WORK_PERIODS';
export const requestWorkPeriods = (): IAction<undefined> => {
  return {
    type: REQUEST_WORK_PERIODS,
    data: undefined
  };
};

export const FAILURE_WORK_PERIODS = 'FAILURE_WORK_PERIODS';
export const failureWorkPeriods = (): IAction<undefined> => {
  return {
    type: FAILURE_WORK_PERIODS,
    data: undefined
  };
};

export const RECEIVE_WORK_PERIODS = 'RECEIVE_WORK_PERIODS';
export const receiveWorkPeriods = (data: any): IAction<any> => {
  return {
    type: RECEIVE_WORK_PERIODS,
    data
  };
};

export const REQUEST_USER_TOTALS = 'REQUEST_USER_TOTALS';
export const requestUserTotals = (): IAction<undefined> => {
  return {
    type: REQUEST_USER_TOTALS,
    data: undefined
  };
};

export const FAILURE_USER_TOTALS = 'FAILURE_USER_TOTALS';
export const failureUserTotals = (): IAction<undefined> => {
  return {
    type: FAILURE_USER_TOTALS,
    data: undefined
  };
};

export const RECEIVE_USER_TOTALS = 'RECEIVE_USER_TOTALS';
export const receiveUserTotals = (data: any): IAction<any> => {
  return {
    type: RECEIVE_USER_TOTALS,
    data
  };
};

export const REQUEST_TERMINAL_TOTALS = 'REQUEST_TERMINAL_TOTALS';
export const requestTerminalTotals = (): IAction<undefined> => {
  return {
    type: REQUEST_TERMINAL_TOTALS,
    data: undefined
  };
};

export const FAILURE_TERMINAL_TOTALS = 'FAILURE_TERMINAL_TOTALS';
export const failureTerminalTotals = (): IAction<undefined> => {
  return {
    type: FAILURE_TERMINAL_TOTALS,
    data: undefined
  };
};

export const RECEIVE_TERMINAL_TOTALS = 'RECEIVE_TERMINAL_TOTALS';
export const receiveTerminalTotals = (data: any): IAction<any> => {
  return {
    type: RECEIVE_TERMINAL_TOTALS,
    data
  };
};

export const REQUEST_PERIOD_NET_SALES = 'REQUEST_PERIOD_NET_SALES';
export const requestPeriodNetSales = (): IAction<undefined> => {
  return {
    type: REQUEST_PERIOD_NET_SALES,
    data: undefined
  };
};

export const FAILURE_PERIOD_NET_SALES = 'FAILURE_PERIOD_NET_SALES';
export const failurePeriodNetSales = (): IAction<undefined> => {
  return {
    type: FAILURE_PERIOD_NET_SALES,
    data: undefined
  };
};

export const RECEIVE_PERIOD_NET_SALES = 'RECEIVE_PERIOD_NET_SALES';
export const receivePeriodNetSales = (data: any): IAction<any> => {
  return {
    type: RECEIVE_PERIOD_NET_SALES,
    data
  };
};

export const REQUEST_PERIOD_GROSS_SALES = 'REQUEST_PERIOD_GROSS_SALES';
export const requestPeriodGrossSales = (): IAction<undefined> => {
  return {
    type: REQUEST_PERIOD_GROSS_SALES,
    data: undefined
  };
};

export const FAILURE_PERIOD_GROSS_SALES = 'FAILURE_PERIOD_GROSS_SALES';
export const failurePeriodGrossSales = (): IAction<undefined> => {
  return {
    type: FAILURE_PERIOD_GROSS_SALES,
    data: undefined
  };
};

export const RECEIVE_PERIOD_GROSS_SALES = 'RECEIVE_PERIOD_GROSS_SALES';
export const receivePeriodGrossSales = (data: any): IAction<any> => {
  return {
    type: RECEIVE_PERIOD_GROSS_SALES,
    data
  };
};

export const getWorkPeriods = () => {
    return (dispatch: Dispatch) => {
        dispatch(requestWorkPeriods());
        request({
            operation: ApiOperation.GetWorkPeriods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            if (res.status === STATUS_OK) {
                let workPeriods: WorkPeriod[] = [];
                for (let period of res.workPeriods) {
                    let startTime = '';
                    if (isNaN(Date.parse(period.Start))) {
                        startTime = period.Start;
                    } else {
                        startTime = getFormattedTime(period.Start)
                    }
                    workPeriods.push({
                        id: period.PeriodId,
                        startTime: startTime
                    });
                }

                dispatch(receiveWorkPeriods(workPeriods));
            } else {
                failureWorkPeriodsWithAlert(dispatch, 'Get Work Periods', res.message);
            }
        })
        .catch((err: any) => {
            failureWorkPeriodsWithError(dispatch);
        });
    }
};

const failureWorkPeriodsWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureWorkPeriods());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureWorkPeriodsWithError = (dispatch: Dispatch) => {
  dispatch(failureWorkPeriods());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getUserTotals = (periodId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(requestUserTotals());
        request({
            operation: ApiOperation.GetUserTotals,
            params: {
                periodId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            if (res.status === STATUS_OK) {
                let userTotals: WorkPeriodAggregateSaleItem[] = [];
                for (let total of res.userTotals) {
                    userTotals.push({
                        name: total.Name,
                        total: total.Total
                    });
                }

                dispatch(receiveUserTotals(userTotals));
            } else {
                failureUserTotalsWithAlert(dispatch, 'Get User Totals', res.message);
            }
        })
        .catch((err: any) => {
            failureUserTotalsWithError(dispatch);
        });
    }
};

const failureUserTotalsWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureUserTotals());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureUserTotalsWithError = (dispatch: Dispatch) => {
  dispatch(failureUserTotals());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getTerminalTotals = (periodId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(requestTerminalTotals());
        request({
            operation: ApiOperation.GetTerminalTotals,
            params: {
                periodId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            if (res.status === STATUS_OK) {
                let terminalTotals: WorkPeriodAggregateSaleItem[] = [];
                for (let total of res.terminalTotals) {
                    terminalTotals.push({
                        name: total.Name,
                        total: total.Total
                    });
                }

                dispatch(receiveTerminalTotals(terminalTotals));
            } else {
                failureTerminalTotalsWithAlert(dispatch, 'Get Terminal Totals', res.message);
            }
        })
        .catch((err: any) => {
            failureTerminalTotalsWithError(dispatch);
        });
    }
};

const failureTerminalTotalsWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureTerminalTotals());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureTerminalTotalsWithError = (dispatch: Dispatch) => {
  dispatch(failureTerminalTotals());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getPeriodNetSales = (periodId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(requestPeriodNetSales());
        request({
            operation: ApiOperation.GetPeriodNetSales,
            params: {
                periodId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            if (res.status === STATUS_OK) {
                dispatch(receivePeriodNetSales(res.netSales));
            } else {
                failurePeriodNetSalesWithAlert(dispatch, 'Get Period Net Sales', res.message);
            }
        })
        .catch((err: any) => {
            failurePeriodNetSalesWithError(dispatch);
        });
    }
};

const failurePeriodNetSalesWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failurePeriodNetSales());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failurePeriodNetSalesWithError = (dispatch: Dispatch) => {
  dispatch(failurePeriodNetSales());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getPeriodGrossSales = (periodId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(requestPeriodGrossSales());
    request({
      operation: ApiOperation.GetPeriodGrossSales,
      params: {
        periodId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res: any) => {
      if (res.status === STATUS_OK) {
        let grossSales: GrossSalesDataModel = {
          totalSales: res.grossTotal.TotalSales,
          details: res.grossTotal.Details
        };
        dispatch(receivePeriodGrossSales(grossSales));
      } else {
        failurePeriodGrossSalesWithAlert(dispatch, 'Get Period Gross Sales', res.message);
      }
    })
    .catch((err: any) => {
      failurePeriodGrossSalesWithError(dispatch);
    });
  }
};

const failurePeriodGrossSalesWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failurePeriodGrossSales());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failurePeriodGrossSalesWithError = (dispatch: Dispatch) => {
  dispatch(failurePeriodGrossSales());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};