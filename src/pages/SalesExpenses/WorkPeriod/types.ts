import { RouteComponentProps } from 'react-router';
import { WorkPeriodAggregate, WorkPeriodReport } from '../../../models/SalesExpense';

export type WorkPeriodStateProps = {
    isFetching: boolean;
    periodId: number;
    workPeriodReport: WorkPeriodReport;
    workPeriodTotals: WorkPeriodAggregate[];
    stationModeId: number;
    nonCapturedSales: [];
}

export type WorkPeriodDispatchProps = {
    getWorkPeriodReport: () => Promise<any>;
    getWorkPeriodTotals: () => Promise<any>;
    getNonCapturedSales: () => Promise<any>;
    setActiveMenu: (activeMenu: string, userId: number) => Promise<any>;
    batchOutCapture: () => Promise<any>;
}

export type WorkPeriodProps = RouteComponentProps & WorkPeriodStateProps & WorkPeriodDispatchProps;

export const totalTableColumns = [
    {
        name: 'Transactions',
        selector: 'tranCount'
    },
    {
        name: 'Gross Sales',
        selector: 'grossSales'
    },
    {
        name: 'Net Sales',        
    },
    {
        name: 'Items',
        selector: 'itemCount'
    },
    {
        name: 'Card',
        selector: 'cardSales'
    },
    {
        name: 'Cash',
        selector: 'cashSales'
    },
    {
        name: 'Card Tips',
        selector: 'cardTips'
    },
    {
        name: 'Tip Out',
        selector: 'tipOut'
    }
];

export const userTableColumns = [
    {
        name: 'User',
        selector: 'name'
    },
    {
        name: 'Transactions',
        selector: 'tranCount'
    },
    {
        name: 'Gross',
        selector: 'gross'
    },
    {
        name: 'Net',
        selector: 'net'
    },
    {
        name: 'Clock In',
        selector: 'clockIn'
    },
    {
        name: 'Clock Out',
        selector: 'clockOut'
    },
    {
        name: 'Hrs Worked',
        selector: 'workedHours'
    },
    {
        name: 'Action'
    }
];