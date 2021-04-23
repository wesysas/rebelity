import { Order } from '../types';

export type PaymentStageProps = {
    order: Order;
    paymentStatus: string;
    paymentType: string;
    receiptData: any;
    isSendingReceipt: boolean;
    receiptStatus: string;
    setPaymentType: (type: string) => Promise<any>;
    paymentDone: () => Promise<any>;
    sendReceiptData: (saleId: string, deliveryType: number, email: string, phone: string) => Promise<any>;
    proceedCash: (order: Order) => Promise<any>;
    proceedCard: (order: Order) => Promise<any>;
    printReceiptData: (receiptData: any) => Promise<any>;
    authorizeCard: (order: Order) => Promise<any>;
}
