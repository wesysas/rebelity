import { IAction } from '../../data/coreTypes';

import {
    REQUEST_WORK_PERIOD_REPORT,
    FAILURE_WORK_PERIOD_REPORT,
    RECEIVE_WORK_PERIOD_REPORT,
    REQUEST_WORK_PERIOD_TOTALS,
    FAILURE_WORK_PERIOD_TOTALS,
    RECEIVE_WORK_PERIOD_TOTALS,
    REQUEST_TERMINAL_AGGREGATES,
    FAILURE_TERMINAL_AGGREGATES,
    RECEIVE_TERMINAL_AGGREGATES,
    REQUEST_TERMINAL_ORDERS,
    FAILURE_TERMINAL_ORDERS,
    RECEIVE_TERMINAL_ORDERS,
    REQUEST_USER_AGGREGATES,
    FAILURE_USER_AGGREGATES,
    RECEIVE_USER_AGGREGATES,
    REQUEST_USER_TERMINALS,
    FAILURE_USER_TERMINALS,
    RECEIVE_USER_TERMINALS,
    REQUEST_CARD_AUTH_TIP,
    SET_CARD_AUTH_TIP, 
    REQUEST_CONFIRM_TIP,
    RECEIVE_CONFIRM_TIP,
    FAILURE_CONFIRM_TIP,
    SET_SALE_EXPENSES_MENU,
    REQUEST_NON_CAPTURED_SALES,
    RECEIVE_NON_CAPTURED_SALES,
    FAILURE_NON_CAPTURED_SALES,
    REQUEST_CAPTURE_BATCH_OUT,
    RECEIVE_CAPTURE_BATCH_OUT,
    FAILURE_CAPTURE_BATCH_OUT
} from './actions';

import {
    TerminalOrderItem,
    UserItemizedSaleItem,
    WorkPeriodAggregate,
    WorkPeriodReport
} from '../../models/SalesExpense';

export class SalesExpensesState {
    isFetching: boolean;
    periodId: number;
    workPeriodReport: WorkPeriodReport;
    workPeriodTotals: WorkPeriodAggregate[];
    terminalAggregates: WorkPeriodAggregate[];
    terminalOrders: TerminalOrderItem[];
    userAggregates: WorkPeriodAggregate[];
    userTerminals: UserItemizedSaleItem[];
    activeMenu: string;
    saleUserId: number;
    nonCapturedSales: [];
    isTipConfirmed: boolean;
    isCaptured: boolean;

    constructor() {
        this.isFetching = false;
        this.periodId = 0;
        this.workPeriodReport = {
            header: {
                workPeriodId: 0,
                label: ''
            },
            userSales: []
        };
        this.workPeriodTotals = [];
        this.terminalAggregates = [];
        this.terminalOrders = [];
        this.userAggregates = [];
        this.userTerminals = [];
        this.activeMenu = 'user-sales';
        this.saleUserId = 0;
        this.nonCapturedSales = [];
        this.isTipConfirmed = true;
        this.isCaptured = true;
    }
}

export const initialState = new SalesExpensesState();

export const SalesExpensesReducer = (
    state: SalesExpensesState = initialState,
    action: IAction<any>
  ): SalesExpensesState => {
    switch (action.type) {  
        case REQUEST_WORK_PERIOD_REPORT:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_WORK_PERIOD_REPORT:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_WORK_PERIOD_REPORT:        
            return {
                ...state,
                isFetching: false,
                workPeriodReport: action.data
            };
        case REQUEST_WORK_PERIOD_TOTALS:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_WORK_PERIOD_TOTALS:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_WORK_PERIOD_TOTALS:        
            return {
                ...state,
                isFetching: false,
                workPeriodTotals: action.data
            };
        case REQUEST_TERMINAL_AGGREGATES:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_TERMINAL_AGGREGATES:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_TERMINAL_AGGREGATES:        
            return {
                ...state,
                isFetching: false,
                terminalAggregates: action.data
            };
        case REQUEST_TERMINAL_ORDERS:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_TERMINAL_ORDERS:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_TERMINAL_ORDERS:        
            return {
                ...state,
                isFetching: false,
                terminalOrders: action.data
            };
        case REQUEST_USER_AGGREGATES:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_USER_AGGREGATES:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_USER_AGGREGATES:        
            return {
                ...state,
                isFetching: false,
                userAggregates: action.data
            };
        case REQUEST_USER_TERMINALS:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_USER_TERMINALS:
        case FAILURE_CONFIRM_TIP:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_USER_TERMINALS:        
            return {
                ...state,
                isFetching: false,
                userTerminals: action.data.userTerminals,
                isTipConfirmed: action.data.isTipConfirmed
            };
        case REQUEST_CARD_AUTH_TIP:
        case REQUEST_CONFIRM_TIP:
            return {
                ...state,
                isFetching: true
            };
        case SET_CARD_AUTH_TIP:
            var orderNumber = action.data.orderNumber;
            var tip = action.data.tip;
            var userTerminals = [...state.userTerminals];
            var userData = userTerminals.filter(function(u) {
                return u.orderNumber == orderNumber;
            });
            if (userData.length > 0) {
                userData[0].tip = tip;
            }

            return {
                ...state,
                userTerminals: userTerminals,
                isFetching: false
            };
        case RECEIVE_CONFIRM_TIP:
            var tips = action.data;
            var userTerminals = [...state.userTerminals];
            for (var i = 0; i< tips.length; i++) {
                var orderNumber = tips[i].OrderNumber;
                var tip = tips[i].ConfirmedTipAmount;

                var userData = userTerminals.filter(function(u) {
                    return u.orderNumber == orderNumber;
                });
                if (userData.length > 0) {
                    userData[0].tip = tip == 0 ? "$0.00" : `$${tip}`;
                    userData[0].tipConfirmed = true;
                }
            }

            return {
                ...state,
                userTerminals: userTerminals,
                isFetching: false,
                isTipConfirmed: true
            };
        case SET_SALE_EXPENSES_MENU:
            return {
                ...state,
                activeMenu: action.data.menu,
                saleUserId: action.data.userId
            };
        case REQUEST_NON_CAPTURED_SALES:
        case REQUEST_CAPTURE_BATCH_OUT:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_NON_CAPTURED_SALES:
        case FAILURE_CAPTURE_BATCH_OUT:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_NON_CAPTURED_SALES:        
            console.log("RECEIVE_NON_CAPTURED_SALES")
            console.log(action.data)
            return {
                ...state,
                isFetching: false,
                nonCapturedSales: action.data
            };
        case RECEIVE_CAPTURE_BATCH_OUT:        
            return {
                ...state,
                isFetching: false,
                nonCapturedSales: []
            };
        default:
            return state;
    }
}