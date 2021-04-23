import { GrossSalesDataModel, WorkPeriod, WorkPeriodAggregateSaleItem } from '../../models/Report';

export type ReportScreenStateProps = {
    isFetching: boolean;
    workPeriods: WorkPeriod[];
    userTotals: WorkPeriodAggregateSaleItem[];
    terminalTotals: WorkPeriodAggregateSaleItem[];
    netSales: number;
    grossSales: GrossSalesDataModel;
    history: any;
}

export type ReportScreenDispatchProps = {
    getWorkPeriods: () => Promise<any>;
    getUserTotals: (periodId: number) => Promise<any>;
    getTerminalTotals: (periodId: number) => Promise<any>;
    getPeriodNetSales: (periodId: number) => Promise<any>;
    getPeriodGrossSales: (periodId: number) => Promise<any>;
}

export type ReportScreenProps = ReportScreenStateProps & ReportScreenDispatchProps;

