import { Order } from '../types';

export type CashSaleProps = {
    order: Order;
    setPaymentType: (type: string) => Promise<any>;
    proceedCash: (order: Order) => Promise<any>;
}
