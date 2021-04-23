import { RouteComponentProps } from 'react-router';
import { Product, Option } from '../../models/Pos';

export type PosScreenStateProps = {
    isFetching: boolean,
    searchName: string,
    prodCategories: ProdCategory[],
    products: Product[],
    curProd: Product | null,
    curProdId: number,
    curVariationId: number,
    isPending: boolean,
    curLineitemOptions: LineitemOption[],
    order: Order,
    paymentType: string,
    isPaymentProcessing: boolean,
    paymentStatus: string,
    isSaling: boolean,
    stationModeId: number,
    isWaitingCard: boolean
}

export type PosScreenDispatchProps = {
    getProdCategories: () => Promise<any>;
    selectProdCategory: (categoryId: number) => Promise<any>;
    searchProduct: (keyword: string) => Promise<any>;
    selectProduct: (productId: number)  => Promise<any>;
    selectVariation: (variantionId: number)  => Promise<any>;
    addOption: (option: Option)  => Promise<any>;
    cancelProduct: () => Promise<any>;
    doneProduct: () => Promise<any>;
    increaseLineitem: (productId: number, variantId: number) => Promise<any>;
    decreaseLineitem: (productId: number, variantId: number) => Promise<any>;
    increaseOption: (productId: number, variantId: number, optionId: number) => Promise<any>;
    decreaseOption: (productId: number, variantId: number, optionId: number) => Promise<any>;
    clearOrder: () => Promise<any>;
    setPaymentType: (type: string) => Promise<any>;
    openCashDrawer: () => Promise<any>;
    cancelTerminalPayment: () => Promise<any>;
    authorizeCard: (order: Order) => Promise<any>;
}

export type PosScreenProps = RouteComponentProps & PosScreenStateProps & PosScreenDispatchProps;

export type ProdCategory = {
    categoryId: number,
    name: string,
    selected: boolean,
    image: string
}

export type LineitemOption = {
    optionId: number,
    cost: number,
    name: string,
    quantity: number
}

export type Lineitem = {
    productId: number,
    productName: string,
    variantId: number,
    variantName: string,
    name: string,
    quantity: number,
    cost: number,
    taxRate: number,
    options: LineitemOption[]
}

export type Order = {
    lineitems: Lineitem[],
    price: number, // sum of price of lineitems 
    tax: number, // sum of taxes of lineitems
    cardFee: number,
    tip: number,
    payAmount: number, //price + tax + cardFee + tip
}