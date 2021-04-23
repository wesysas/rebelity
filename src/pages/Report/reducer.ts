import { IAction } from '../../data/coreTypes';

import {
    REQUEST_WORK_PERIODS,
    FAILURE_WORK_PERIODS,
    RECEIVE_WORK_PERIODS,
    REQUEST_USER_TOTALS,
    FAILURE_USER_TOTALS,
    RECEIVE_USER_TOTALS,
    REQUEST_TERMINAL_TOTALS,
    FAILURE_TERMINAL_TOTALS,
    RECEIVE_TERMINAL_TOTALS,
    REQUEST_PERIOD_NET_SALES,
    FAILURE_PERIOD_NET_SALES,
    RECEIVE_PERIOD_NET_SALES,
    REQUEST_PERIOD_GROSS_SALES,
    FAILURE_PERIOD_GROSS_SALES,
    RECEIVE_PERIOD_GROSS_SALES
} from './actions';

import {
    GrossSalesDataModel,
    WorkPeriod, WorkPeriodAggregateSaleItem
} from '../../models/Report';

export class ReportState {
    isFetching: boolean;
    workPeriods: WorkPeriod[];
    userTotals: WorkPeriodAggregateSaleItem[];
    terminalTotals: WorkPeriodAggregateSaleItem[];
    netSales: number;
    grossSales: GrossSalesDataModel;

    constructor() {
        this.isFetching = false;
        this.workPeriods = [];
        this.userTotals = [];
        this.terminalTotals = [];
        this.netSales = 0;
        this.grossSales = {
            totalSales: '',
            details: ''
        };
    }
}

export const initialState = new ReportState();

export const ReportReducer = (
    state: ReportState = initialState,
    action: IAction<any>
  ): ReportState => {
    switch (action.type) {  
        case REQUEST_WORK_PERIODS:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_WORK_PERIODS:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_WORK_PERIODS:        
            return {
                ...state,
                isFetching: false,
                workPeriods: action.data
            };
        case REQUEST_USER_TOTALS:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_USER_TOTALS:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_USER_TOTALS:        
            return {
                ...state,
                isFetching: false,
                userTotals: action.data
            };
        case REQUEST_TERMINAL_TOTALS:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_TERMINAL_TOTALS:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_TERMINAL_TOTALS:        
            return {
                ...state,
                isFetching: false,
                terminalTotals: action.data
            };
        case REQUEST_PERIOD_NET_SALES:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_PERIOD_NET_SALES:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_PERIOD_NET_SALES:        
            return {
                ...state,
                isFetching: false,
                netSales: action.data
            };
        case REQUEST_PERIOD_GROSS_SALES:
            return {
                ...state,
                isFetching: true
            };  
        case FAILURE_PERIOD_GROSS_SALES:
            return {
                ...state,
                isFetching: false
            };  
        case RECEIVE_PERIOD_GROSS_SALES:        
            return {
                ...state,
                isFetching: false,
                grossSales: action.data
            };
        default:
            return state;
    }
}