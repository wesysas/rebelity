import { Order } from '../types';

export type CardSaleProps = {
    order: Order;
    isPaymentProcessing: boolean;
    isSaling: boolean;
    userTippingEnabled: boolean;
    enableUserTouch: boolean;
    setPaymentType: (type: string) => Promise<any>;
    proceedCard: (order: Order) => Promise<any>;
    cancelTerminalPayment: () => Promise<any>;
    setCustomerTip: (tip: number) => Promise<any>;
}
