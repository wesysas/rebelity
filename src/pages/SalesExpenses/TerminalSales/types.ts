import { RouteComponentProps } from 'react-router';
import { WorkPeriodAggregate, TerminalOrderItem } from '../../../models/SalesExpense';

export type TerminalSalesStateProps = {
    isFetching: boolean;
    periodId: number;
    terminalAggregates: WorkPeriodAggregate[];
    terminalOrders: TerminalOrderItem[];
    terminal: any;
}

export type TerminalSalesDispatchProps = {
    getTerminalAggregates: () => Promise<any>;
    getTerminalOrders: () => Promise<any>;
}

export type TerminalSalesProps = RouteComponentProps & TerminalSalesStateProps & TerminalSalesDispatchProps;

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

export const orderTableColumns = [
    {
        name: 'Order',
        selector: 'orderNumber'
    },
    {
        name: 'Server',
        selector: 'server'
    },
    {
        name: 'Charge Amount',
        selector: 'saleAmount'
    },
    {
        name: 'Items',
        selector: 'itemCount'
    },
    {
        name: 'Purchased On',
        selector: 'saleDate'
    },
    {
        name: 'Payment',
        selector: 'payment'
    },
    {
        name: 'Tip',
        selector: 'tip'
    },
    {
        name: 'Action'
    }
];