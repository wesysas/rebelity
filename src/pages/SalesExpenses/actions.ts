import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { getStore } from '../../data/configureStore';
import { IAction, STATUS_OK } from '../../data/coreTypes';
import { TerminalOrderItem, UserItemizedSaleItem, WorkPeriodAggregate } from '../../models/SalesExpense';
import AStorage from '../../utils/Storage';
import { openAlert } from '../AlertModal/actions';
import { openError} from '../ErrorModal/actions';
import { receiveCardAuthorize } from '../Pos/actions';

export const REQUEST_WORK_PERIOD_REPORT = 'REQUEST_WORK_PERIOD_REPORT';
export const requestWorkPeriodReport = (): IAction<undefined> => {
  return {
    type: REQUEST_WORK_PERIOD_REPORT,
    data: undefined
  };
};

export const FAILURE_WORK_PERIOD_REPORT = 'FAILURE_WORK_PERIOD_REPORT';
export const failureWorkPeriodReport = (): IAction<undefined> => {
  return {
    type: FAILURE_WORK_PERIOD_REPORT,
    data: undefined
  };
};

export const RECEIVE_WORK_PERIOD_REPORT = 'RECEIVE_WORK_PERIOD_REPORT';
export const receiveWorkPeriodReport = (data: any): IAction<any> => {
  return {
    type: RECEIVE_WORK_PERIOD_REPORT,
    data
  };
};

export const REQUEST_WORK_PERIOD_TOTALS = 'REQUEST_WORK_PERIOD_TOTALS';
export const requestWorkPeriodTotals = (): IAction<undefined> => {
  return {
    type: REQUEST_WORK_PERIOD_TOTALS,
    data: undefined
  };
};

export const FAILURE_WORK_PERIOD_TOTALS = 'FAILURE_WORK_PERIOD_TOTALS';
export const failureWorkPeriodTotals = (): IAction<undefined> => {
  return {
    type: FAILURE_WORK_PERIOD_TOTALS,
    data: undefined
  };
};

export const RECEIVE_WORK_PERIOD_TOTALS = 'RECEIVE_WORK_PERIOD_TOTALS';
export const receiveWorkPeriodTotals = (data: any): IAction<any> => {
  return {
    type: RECEIVE_WORK_PERIOD_TOTALS,
    data
  };
};

export const REQUEST_TERMINAL_AGGREGATES = 'REQUEST_TERMINAL_AGGREGATES';
export const requestTerminalAggregates = (): IAction<undefined> => {
  return {
    type: REQUEST_TERMINAL_AGGREGATES,
    data: undefined
  };
};

export const FAILURE_TERMINAL_AGGREGATES = 'FAILURE_TERMINAL_AGGREGATES';
export const failureTerminalAggregates = (): IAction<undefined> => {
  return {
    type: FAILURE_TERMINAL_AGGREGATES,
    data: undefined
  };
};

export const RECEIVE_TERMINAL_AGGREGATES = 'RECEIVE_TERMINAL_AGGREGATES';
export const receiveTerminalAggregates = (data: any): IAction<any> => {
  return {
    type: RECEIVE_TERMINAL_AGGREGATES,
    data
  };
};

export const REQUEST_TERMINAL_ORDERS = 'REQUEST_TERMINAL_ORDERS';
export const requestTerminalOrders = (): IAction<undefined> => {
  return {
    type: REQUEST_TERMINAL_ORDERS,
    data: undefined
  };
};

export const FAILURE_TERMINAL_ORDERS = 'FAILURE_TERMINAL_ORDERS';
export const failureTerminalOrders = (): IAction<undefined> => {
  return {
    type: FAILURE_TERMINAL_ORDERS,
    data: undefined
  };
};

export const RECEIVE_TERMINAL_ORDERS = 'RECEIVE_TERMINAL_ORDERS';
export const receiveTerminalOrders = (data: any): IAction<any> => {
  return {
    type: RECEIVE_TERMINAL_ORDERS,
    data
  };
};

export const REQUEST_USER_AGGREGATES = 'REQUEST_USER_AGGREGATES';
export const requestUserAggregates = (): IAction<undefined> => {
  return {
    type: REQUEST_USER_AGGREGATES,
    data: undefined
  };
};

export const FAILURE_USER_AGGREGATES = 'FAILURE_USER_AGGREGATES';
export const failureUserAggregates = (): IAction<undefined> => {
  return {
    type: FAILURE_USER_AGGREGATES,
    data: undefined
  };
};

export const RECEIVE_USER_AGGREGATES = 'RECEIVE_USER_AGGREGATES';
export const receiveUserAggregates = (data: any): IAction<any> => {
  return {
    type: RECEIVE_USER_AGGREGATES,
    data
  };
};

export const REQUEST_USER_TERMINALS = 'REQUEST_USER_TERMINALS';
export const requestUserTerminals = (): IAction<undefined> => {
  return {
    type: REQUEST_USER_TERMINALS,
    data: undefined
  };
};

export const FAILURE_USER_TERMINALS = 'FAILURE_USER_TERMINALS';
export const failureUserTerminals = (): IAction<undefined> => {
  return {
    type: FAILURE_USER_TERMINALS,
    data: undefined
  };
};

export const RECEIVE_USER_TERMINALS = 'RECEIVE_USER_TERMINALS';
export const receiveUserTerminals = (data: any): IAction<any> => {
  return {
    type: RECEIVE_USER_TERMINALS,
    data
  };
};

export const REQUEST_CARD_AUTH_TIP = 'REQUEST_CARD_AUTH_TIP';
export const requestCardAuthTip = (): IAction<undefined> => {
  return {
    type: REQUEST_CARD_AUTH_TIP,
    data: undefined
  };
};

export const SET_CARD_AUTH_TIP = 'SET_CARD_AUTH_TIP';
export const setCardAuthTip = (data: any): IAction<any> => {
  return {
    type: SET_CARD_AUTH_TIP,
    data
  };
};

export const REQUEST_CONFIRM_TIP = 'REQUEST_CONFIRM_TIP';
export const requestConfirmTip = (): IAction<undefined> => {
  return {
    type: REQUEST_CONFIRM_TIP,
    data: undefined
  };
};

export const RECEIVE_CONFIRM_TIP = 'RECEIVE_CONFIRM_TIP';
export const receiveConfirmTip = (data: any): IAction<any> => {
  return {
    type: RECEIVE_CONFIRM_TIP,
    data
  };
};

export const FAILURE_CONFIRM_TIP = 'FAILURE_CONFIRM_TIP';
export const failtureConfirmTip = (): IAction<undefined> => {
  return {
    type: FAILURE_CONFIRM_TIP,
    data: undefined
  };
};

export const SET_SALE_EXPENSES_MENU = 'SET_SALE_EXPENSES_MENU';
export const setSaleExpensesMenu = (data: any): IAction<undefined> => {
  return {
    type: SET_SALE_EXPENSES_MENU,
    data
  };
};

export const REQUEST_NON_CAPTURED_SALES = 'REQUEST_NON_CAPTURED_SALES';
export const requestNonCapturedSales = (): IAction<undefined> => {
  return {
    type: REQUEST_NON_CAPTURED_SALES,
    data: undefined
  };
};

export const FAILURE_NON_CAPTURED_SALES = 'FAILURE_NON_CAPTURED_SALES';
export const failureNonCapturedSales = (): IAction<undefined> => {
  return {
    type: FAILURE_NON_CAPTURED_SALES,
    data: undefined
  };
};

export const RECEIVE_NON_CAPTURED_SALES = 'RECEIVE_NON_CAPTURED_SALES';
export const receiveNonCapturedSales = (data: any): IAction<any> => {
  return {
    type: RECEIVE_NON_CAPTURED_SALES,
    data
  };
};

export const REQUEST_CAPTURE_BATCH_OUT = 'REQUEST_CAPTURE_BATCH_OUT';
export const requestCaptureBatchOut = (): IAction<undefined> => {
  return {
    type: REQUEST_CAPTURE_BATCH_OUT,
    data: undefined
  };
};

export const FAILURE_CAPTURE_BATCH_OUT = 'FAILURE_CAPTURE_BATCH_OUT';
export const failureCaptureBatchOut = (): IAction<undefined> => {
  return {
    type: FAILURE_CAPTURE_BATCH_OUT,
    data: undefined
  };
};

export const RECEIVE_CAPTURE_BATCH_OUT = 'RECEIVE_CAPTURE_BATCH_OUT';
export const receiveCaptureBatchOut = (): IAction<any> => {
  return {
    type: RECEIVE_CAPTURE_BATCH_OUT,
    data: undefined
  };
};

export const getWorkPeriodReport = () => {
    return (dispatch: Dispatch) => {
        dispatch(requestWorkPeriodReport());
        request({
            operation: ApiOperation.GetWorkPeriodReport,
            params: {
                periodId: getStore().getState().SalesExpensesState.periodId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            console.log("get work period ");
           console.log(res);
            if (res.status === STATUS_OK) {
                let workPeriodReport: {
                    header: any,
                    userSales: any[]
                } = {
                    header: {
                        workPeriodId: res.report.Header.WorkperiodId,
                        label: res.report.Header.Label
                    },
                    userSales: []
                };
                for (let userItem of res.report.UserSales) {
                    workPeriodReport.userSales.push({
                        userId: userItem.UserId,
                        name: userItem.Name,
                        tranCount: userItem.Transactions,
                        gross: userItem.Gross,
                        net: userItem.Net,
                        clockIn: userItem.ClockIn,
                        clockOut: userItem.ClockOut,
                        workedHours: userItem.HoursWorked,
                    });
                }

                dispatch(receiveWorkPeriodReport(workPeriodReport));
            } else {
                failureWorkPeriodDataWithAlert(dispatch, 'Get Work Period Report', res.message);
            }
        })
        .catch((err: any) => {
            failureWorkPeriodDataWithError(dispatch);
        });
    }
};

const failureWorkPeriodDataWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureWorkPeriodReport());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureWorkPeriodDataWithError = (dispatch: Dispatch) => {
  dispatch(failureWorkPeriodReport());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getWorkPeriodTotals = () => {
    return (dispatch: Dispatch) => {
        dispatch(requestWorkPeriodTotals());
        request({
            operation: ApiOperation.GetWorkPeriodTotals,
            params: {
                periodId: getStore().getState().SalesExpensesState.periodId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            if (res.status === STATUS_OK) {
                let periodTotals: WorkPeriodAggregate[] = [{
                    tranCount: res.totals.Transactions,
                    grossSales: res.totals.GrossSales,
                    netSales: res.totals.NetSales,
                    itemCount: res.totals.Items,
                    cardSales: res.totals.CardSales,
                    cashSales: res.totals.CashSales,
                    cardTips: res.totals.CardTips,
                    tipOut: res.totals.TipOut
                }];

                dispatch(receiveWorkPeriodTotals(periodTotals));
            } else {
                failureWorkPeriodTotalsWithAlert(dispatch, 'Get Work Period Totals', res.message);
            }
        })
        .catch((err: any) => {
            failureWorkPeriodTotalsWithError(dispatch);
        });
    }
};

const failureWorkPeriodTotalsWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureWorkPeriodTotals());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureWorkPeriodTotalsWithError = (dispatch: Dispatch) => {
  dispatch(failureWorkPeriodTotals());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getTerminalAggregates = () => {
    return (dispatch: Dispatch) => {
        dispatch(requestTerminalAggregates());
        request({
            operation: ApiOperation.GetTerminalAggregates,
            params: {
                terminal: getStore().getState().SettingState.terminal,
                periodId: getStore().getState().SalesExpensesState.periodId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            if (res.status === STATUS_OK) {
                let aggregates: WorkPeriodAggregate[] = [{
                    tranCount: res.totals.Transactions,
                    grossSales: res.totals.GrossSales,
                    netSales: res.totals.NetSales,
                    itemCount: res.totals.Items,
                    cardSales: res.totals.CardSales,
                    cashSales: res.totals.CashSales,
                    cardTips: res.totals.CardTips,
                    tipOut: res.totals.TipOut
                }];

                dispatch(receiveTerminalAggregates(aggregates));
            } else {
                failureTerminalAggregatesWithAlert(dispatch, 'Get Terminal Aggregates', res.message);
            }
        })
        .catch((err: any) => {
            failureTerminalAggregatesWithError(dispatch);
        });
    }
};

const failureTerminalAggregatesWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureTerminalAggregates());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureTerminalAggregatesWithError = (dispatch: Dispatch) => {
  dispatch(failureTerminalAggregates());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getTerminalOrders = () => {
    return (dispatch: Dispatch) => {
        dispatch(requestTerminalOrders());
        request({
            operation: ApiOperation.GetTerminalOrders,
            params: {
                terminal: getStore().getState().SettingState.terminal,
                periodId: getStore().getState().SalesExpensesState.periodId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            if (res.status === STATUS_OK) {
                let orderItems: TerminalOrderItem[] = [];
                for (let order of res.orders) {
                    orderItems.push({
                        orderNumber: order.OrderNumber,
                        server: order.Server,
                        saleAmount: order.SaleAmount,
                        itemCount: order.Items,
                        saleDate: order.SaleDate,
                        payment: order.Payment,
                        tip: order.Tip,
                    });
                }

                dispatch(receiveTerminalOrders(orderItems));
            } else {
                failureTerminalOrdersWithAlert(dispatch, 'Get Terminal Orders', res.message);
            }
        })
        .catch((err: any) => {
            failureTerminalOrdersWithError(dispatch);
        });
    }
};

const failureTerminalOrdersWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureTerminalOrders());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureTerminalOrdersWithError = (dispatch: Dispatch) => {
  dispatch(failureTerminalOrders());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getUserAggregates = () => {
    return (dispatch: Dispatch) => {
        dispatch(requestUserAggregates());
        request({
            operation: ApiOperation.GetUserAggregates,
            params: {
                userId: getStore().getState().SalesExpensesState.saleUserId,
                periodId: getStore().getState().SalesExpensesState.periodId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            if (res.status === STATUS_OK) {
                let userAggregates: WorkPeriodAggregate[] = [{
                    tranCount: res.totals.Transactions,
                    grossSales: res.totals.GrossSales,
                    netSales: res.totals.NetSales,
                    itemCount: res.totals.Items,
                    cardSales: res.totals.CardSales,
                    cashSales: res.totals.CashSales,
                    cardTips: res.totals.CardTips,
                    tipOut: res.totals.TipOut
                }];

                dispatch(receiveUserAggregates(userAggregates));
            } else {
                failureUserAggregatesWithAlert(dispatch, 'Get User Aggregates', res.message);
            }
        })
        .catch((err: any) => {
            failureUserAggregatesWithError(dispatch);
        });
    }
};

const failureUserAggregatesWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureUserAggregates());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureUserAggregatesWithError = (dispatch: Dispatch) => {
  dispatch(failureUserAggregates());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getUserTerminals = () => {
    return (dispatch: Dispatch) => {
        dispatch(requestUserTerminals());
        request({
            operation: ApiOperation.GetUserTerminals,
            params: {
                userId: getStore().getState().SalesExpensesState.saleUserId,
                periodId: getStore().getState().SalesExpensesState.periodId
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then((res: any) => {
            if (res.status === STATUS_OK) {
                let userTerminals: UserItemizedSaleItem[] = [];
                console.log(res.sales);
                var isTipConfirmed = true;
                for (let terminal of res.sales) {
                    userTerminals.push({
                        terminal: terminal.Terminal,
                        order: terminal.Order,
                        orderNumber: terminal.OrderNumber,
                        amount: terminal.Amount,
                        itemCount: terminal.Items,
                        saleDate: terminal.SaleDate,
                        payment: terminal.Payment,
                        tip: terminal.Tip,
                        tipConfirmed: terminal.TipConfirmed,
                        saleType: terminal.SaleType
                    });
                    if (terminal.TipConfirmed == false) {
                      isTipConfirmed = false;
                    }
                }

                const payload = {
                  isTipConfirmed,
                  userTerminals
                }

                dispatch(receiveUserTerminals(payload));
            } else {
                failureUserTerminalsWithAlert(dispatch, 'Get User Terminals', res.message);
            }
        })
        .catch((err: any) => {
            failureUserTerminalsWithError(dispatch);
        });
    }
};

const failureUserTerminalsWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureUserTerminals());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureUserTerminalsWithError = (dispatch: Dispatch) => {
  dispatch(failureUserTerminals());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const updateOrderTip = (orderNumber: number, tip: number) => {
  return (dispatch: Dispatch) => {
    const payload = {
      orderNumber,
      tip
    }
    
    dispatch(requestCardAuthTip());
    dispatch(setCardAuthTip(payload));
  }
};

export const confirmCustomerTip = (tips: any) => {
  return (dispatch: Dispatch) => {
    dispatch(requestConfirmTip());
    //dispatch(receiveConfirmTip(tips));
    // var data = {
    //   JsonParam: JSON.stringify(tips)
    // }

    var data = {
        JsonParam: JSON.stringify(tips)
    }
    
    console.log(JSON.stringify(data));
    request({
      operation: ApiOperation.ConfirmTip,
      // variables: data,
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // }
      variables: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res);
      if (res.status == STATUS_OK) {
        dispatch(receiveConfirmTip(tips));
        // dispatch(
        //   openAlert({
        //     title: "Confirm Tips",
        //     text: "Tips have been confirmed successfully",
        //   })
        // );
      } else {
        dispatch(failtureConfirmTip());
        dispatch(
          openAlert({
            title: "Confirm Tips",
            text: res.message
          })
        );
      }
    })
    .catch(err => {
      dispatch(failtureConfirmTip());
      dispatch(
        openAlert({
          title: "Confirm Tips",
          text: "Tips can't be confirmed"
        })
      );
      console.log(err);
    });
  }
};

export const setActiveMenu = (activeMenu: string, userId: number) => {
  return (dispatch: Dispatch) => {
    const payload = {
      menu: activeMenu,
      userId
    }
    dispatch(setSaleExpensesMenu(payload));
  }
};

export const getNonCapturedSales = () => {
  return (dispatch: Dispatch) => {
      dispatch(requestNonCapturedSales());
      request({
        operation: ApiOperation.GetNonCapturedSales,
        params: {
            periodId: getStore().getState().SalesExpensesState.periodId
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((res: any) => {
        if (res.status === STATUS_OK) { 
          var captures = res.report.Captures;
          var nonCapturedSales = captures.filter((c: any) => c.IsCaptured == false);
          console.log("non_captured_sales")
          console.log(nonCapturedSales)
          dispatch(receiveNonCapturedSales(nonCapturedSales));
        } else {
          failureNonCapturedSalesWithAlert(dispatch, 'Get Non Captured Sales', res.message);
        }
      })
      .catch((err: any) => {
        failureNonCapturedSalesWithError(dispatch);
      });
  }
};

const failureNonCapturedSalesWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureNonCapturedSales());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureNonCapturedSalesWithError = (dispatch: Dispatch) => {
  dispatch(failureNonCapturedSales());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const batchOutCapture = () => {
  return (dispatch: Dispatch) => {
    dispatch(requestCaptureBatchOut());

    var nonCapturedSales = getStore().getState().SalesExpensesState.nonCapturedSales

    console.log("nonCapturedSales")
    console.log(nonCapturedSales)
    if (nonCapturedSales.length < 1) {
      failureCaptureBatchOutWithAlert(dispatch, "Capture Batch Out", "All sales have already been captured");
    } else {
      var nonConfirmTipsSales = nonCapturedSales.filter((c: any) => c.IsConfirmed == false);
      if (nonConfirmTipsSales.length > 0) {
        console.log("failureCaptureBatchOutWithAlert");
        failureCaptureBatchOutWithAlert(dispatch, "Capture Batch Out", "There are some unconfirmed tips");
      } else {
        var saleIds: any = [];
        for (var i = 0; i < nonCapturedSales.length; i++) {
          const { SaleId } = nonCapturedSales[i];
          saleIds.push(SaleId);
        }

        request({
          operation: ApiOperation.BatchOutCaptures,
          variables: JSON.stringify(saleIds),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.status == STATUS_OK) {
            dispatch(receiveCaptureBatchOut());
            dispatch(
              openAlert({
                title: "Capture Batch Out",
                text: "The sales have been captured successfully"
              })
            );
          } else {
            failureCaptureBatchOutWithAlert(dispatch, "Capture Batch Out", res.message);
          }
        })
        .catch(err => {
          failureCaptureBatchOutWithError(dispatch);
        });
      }
    }
  }
};

const failureCaptureBatchOutWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureCaptureBatchOut());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureCaptureBatchOutWithError = (dispatch: Dispatch) => {
  dispatch(failureCaptureBatchOut());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};