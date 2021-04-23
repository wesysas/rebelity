export type WorkPeriodHeader = {
    workPeriodId: number;
    label: string;
}

export type WorkPeriodUserItem = {
    userId: number;
    name: string;
    tranCount: number;
    gross: string;
    net: string;
    clockIn: string;
    clockOut: string;
    workedHours: string;
}

export type WorkPeriodReport = {
    header: WorkPeriodHeader;
    userSales: WorkPeriodUserItem[];
}

export type WorkPeriodAggregate = {
    tranCount: number;
    grossSales: string;
    netSales: string;
    itemCount: number;
    cardSales: string;
    cashSales: string;
    cardTips: string;
    tipOut: string;
}

export type UserItemizedSaleItem = {
    terminal: string;
    order: string;
    orderNumber: string;
    amount: string;
    itemCount: number;
    saleDate: string;
    payment: string;
    tip: string;
    tipConfirmed: boolean;
    saleType: number;
}

export type TerminalOrderItem = {
    orderNumber: number;
    server: string;
    saleAmount: string;
    itemCount: number;
    saleDate: string;
    payment: string;
    tip: string;
}