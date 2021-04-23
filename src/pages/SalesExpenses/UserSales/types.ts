import { RouteComponentProps } from 'react-router';
import { WorkPeriodAggregate, UserItemizedSaleItem } from '../../../models/SalesExpense';

export type UserSalesStateProps = {
    isFetching: boolean;
    periodId: number;
    userAggregates: WorkPeriodAggregate[];
    userTerminals: UserItemizedSaleItem[];
    stationModeId: number;
    saleUserId: number;
    isTipConfirmed: boolean;
}

export type UserSalesDispatchProps = {
    getUserAggregates: () => Promise<any>;
    getUserTerminals: () => Promise<any>;
    updateOrderTip: (orderNumber: number, tip: number) => Promise<any>;
    alertEmptyTip: (title: any, text: any, onPress: any, isConfirm: boolean) => Promise<any>;
    confirmCustomerTip: (tips: any) => Promise<any>;
}

export type UserSalesProps = RouteComponentProps & UserSalesStateProps & UserSalesDispatchProps;

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

export const terminalTableColumns = [
    {
        name: 'Terminal',
        selector: 'terminal'
    },
    {
        name: 'Order Number',
        selector: 'orderNumber'
    },
    {
        name: 'Order',
        selector: 'order'
    },
    {
        name: 'Gross Amount',
        selector: 'amount'
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