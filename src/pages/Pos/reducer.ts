import { 
  IAction, 
  PAYMENT_TYPE_CARD, 
  PAYMENT_TYPE_CASH, 
  PAYMENT_TYPE_NONE,
  PAYMENT_STATUS_NONE,
  PAYMENT_STATUS_SUCCESS,
  PAYMENT_STATUS_FAILED,
  RECEIPT_STATUS_NONE,
  RECEIPT_STATUS_SUCCESS,
  RECEIPT_STATUS_FAILED
} from '../../data/coreTypes';

import {
  REQUEST_POS_CATEGORIES,
  FAILURE_POS_CATEGORIES,
  RECEIVE_POS_CATEGORIES,
  SET_POS_CATEGORIES,
  REQUEST_POS_PRODUCTS,
  FAILURE_POS_PRODUCTS,
  RECEIVE_POS_PRODUCTS,
  SET_POS_PRODUCTS,
  REQUEST_PROD_CATEGORIES,
  RECEIVE_PROD_CATEGORIES,
  SELECT_PROD_CATEGORIES,
  SET_PROD_KEYWORD,
  SET_CUR_PRODUCT,
  SET_CUR_VARIATION,
  SET_LINEITEM_OPTION,
  REQUEST_POS_PENDING,
  CLEAR_CURRENT_ITEMS,
  CANCEL_ORDER_LINEITEM,
  INCREASE_LINEITEM_QUANTITY,
  DECREASE_LINEITEM_QUANTITY,
  INCREASE_OPTION_QUANTITY,
  DECREASE_OPTION_QUANTITY,
  INITIALIZE_POS_ORDER,
  SEND_PAYMENT_TYPE,
  REQUEST_PAYMENT_PROCEED,
  RECEIVE_PAYMENT_PROCEED,
  FAILURE_PAYMENT_PROCEED,
  REQUEST_SALE_RESULT,
  RECEIVE_SALE_RESULT,
  FAILURE_SALE_RESULT,
  SET_PAYMENT_DONE,
  REQUEST_SEND_RECEIPT,
  RECEIVE_SEND_RECEIPT,
  FAILURE_SEND_RECEIPT,
  REQUEST_CARD_AUTHORIZE,
  RECEIVE_CARD_AUTHORIZE,
  FAILURE_CARD_AUTHORIZE,
  REQUEST_CARD_INSERT,
  RECEIVE_CARD_INSERT,
  FAILURE_CARD_INSERT
} from './actions';

import {
  ACCESS_POS_CATEGORIES,
  ACCESS_POS_PRODUCTS
} from '../../utils/session';

import {
  Category,
  Product
} from '../../models/Pos';

import {
  ProdCategory,
  Order,
  Lineitem,
  LineitemOption
} from './types';

import AStorage from '../../utils/Storage';

import { 
  displayCart
} from '../../utils/customer-screen';

export class PosState {
  isFetching: boolean;
  isPending: boolean;
  categories: Category[];
  products: Product[];
  prodCategories: ProdCategory[];
  searchName: string;
  curProdId: number;
  curVariationId: number;
  curLineitemOptions: LineitemOption[];
  order: Order;
  paymentType: string;
  isPaymentProcessing: boolean;
  paymentStatus: string;
  receiptData: any;
  isSendingReceipt: boolean;
  receiptStatus: string;
  isSaling: boolean;
  isWaitingCard: boolean;
  
  constructor() {
    this.isFetching = false;
    this.isPending = false;
    this.categories = [];
    this.products = [];
    this.prodCategories = [];
    this.searchName = "";
    this.curProdId = 0;
    this.curVariationId = 0;
    this.curLineitemOptions = [];
    this.paymentType = PAYMENT_TYPE_NONE;
    this.isPaymentProcessing = false;
    this.paymentStatus = PAYMENT_STATUS_NONE;
    this.receiptData = null;
    this.isSendingReceipt = false;
    this.receiptStatus = RECEIPT_STATUS_NONE;
    this.isSaling = false;
    this.isWaitingCard = false;
    this.order = {
      lineitems: [], 
      price: 0, 
      tax: 0, 
      cardFee: 0, 
      tip: 0,
      payAmount: 0
    };
  }
}

export const initialState = new PosState();

export const PosReducer = (
  state: PosState = initialState,
  action: IAction<any>
): PosState => {
  switch (action.type) {

    case REQUEST_POS_CATEGORIES:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_POS_CATEGORIES:
      return {
        ...state,
        isFetching: false
      };

    case RECEIVE_POS_CATEGORIES:
      
      AStorage.setItem(ACCESS_POS_CATEGORIES, action.data);
      
      return {
        ...state,
        isFetching: false,
        categories: action.data
      };

    case SET_POS_CATEGORIES:
      
      return {
        ...state,
        isFetching: false,
        categories: action.data
      };

    case REQUEST_POS_PRODUCTS:
      return {
        ...state,
        isFetching: true
      };
  
    case FAILURE_POS_PRODUCTS:
      return {
        ...state,
        isFetching: false
      };
  
    case RECEIVE_POS_PRODUCTS:
      
      AStorage.setItem(ACCESS_POS_PRODUCTS, action.data);
      
      return {
        ...state,
        isFetching: false,
        products: action.data
      };
  
    case SET_POS_PRODUCTS:
      
      return {
        ...state,
        isFetching: false,
        products: action.data
      };

    case REQUEST_PROD_CATEGORIES:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_PROD_CATEGORIES:
      
      state.prodCategories = [];

      for (var i = 0; i < state.categories.length; i++) {
        const prod_category : ProdCategory = {
          categoryId: state.categories[i].CategoryId,
          name: state.categories[i].Name,
          selected: false,
          image: state.categories[i].Picture
        }

        state.prodCategories.push(prod_category);
      }

      return {
        ...state,
        isFetching: false
      };

    case SELECT_PROD_CATEGORIES: {
      state.prodCategories = state.prodCategories.filter(function( cateogry ) {
        cateogry.selected = cateogry.categoryId == action.data ? !cateogry.selected : cateogry.selected;

        return true;
      });

      return {
        ...state,
        curProdId: 0,
        curVariationId: 0,
        curLineitemOptions: []
      };
    }

    case SET_PROD_KEYWORD: {
      return {
        ...state,
        searchName: action.data
      };
    }

    case SET_CUR_PRODUCT: {
      var curProds = state.products.filter(function(product){
        return product.ProductId == action.data;
      });
      var curProd = curProds[0];
      if (curProd.Variations.length == 0) {
        addVariantToOrder(state.order, curProd, 0);
      }

      return {
        ...state,
        curProdId: curProd.ProductId,
        curVariationId: 0,
        curLineitemOptions: []
      };
    }

    case SET_CUR_VARIATION: {
      var variationId = action.data;
      var curProds = state.products.filter(function(product){
        return product.ProductId == state.curProdId;
      });
      var curProd = curProds[0];
      addVariantToOrder(state.order, curProd, variationId);

      return {
        ...state,
        isPending: false,
        curVariationId: variationId
      };
    }

    case REQUEST_POS_PENDING: {
      return {
        ...state,
        isPending: true
      }
    }

    case SET_LINEITEM_OPTION: {
      var curProds = state.products.filter(function(product){
        return product.ProductId == state.curProdId;
      });
      var curProd = curProds[0];
      var option: LineitemOption = {
        optionId: action.data.OptionId,
        cost: action.data.Cost,
        name: action.data.Name,
        quantity: 1
      }
      addOptionToOrder(state.order, curProd, state.curVariationId, option);

      return {
        ...state,
        isPending: false
      };
    }

    case CLEAR_CURRENT_ITEMS: {
      return {
        ...state,
        curProdId: 0,
        curVariationId: 0,
        curLineitemOptions: []
      };
    }

    case CANCEL_ORDER_LINEITEM: {
      var lineitems = state.order.lineitems.filter(function(l){
        return l.productId != state.curProdId;
      });

      state.order.lineitems = lineitems;
      calcOrderPrice(state.order);
      
      return {
        ...state,
        isPending: false,
        curProdId: 0,
        curVariationId: 0,
        curLineitemOptions: []
      };
    }

    case INCREASE_LINEITEM_QUANTITY: {
      var productId = action.data.productId;
      var variantId = action.data.variantId;

      var lineitems = state.order.lineitems.filter(function(l){
        return l.productId == productId && l.variantId == variantId;
      });
      var lineitem = lineitems[0];
      lineitem.quantity++;
      calcOrderPrice(state.order);
      
      return {
        ...state,
        isPending: false
      };
    }

    case DECREASE_LINEITEM_QUANTITY: {
      var productId = action.data.productId;
      var variantId = action.data.variantId;

      var lineitems = state.order.lineitems.filter(function(l){
        return l.productId == productId && l.variantId == variantId;
      });
      var lineitem = lineitems[0];
      lineitem.quantity--;
      if (lineitem.quantity == 0) {
        lineitems = state.order.lineitems.filter(function(l){
          return !(l.productId == productId && l.variantId == variantId);
        });
        state.order.lineitems = lineitems;
      }
      calcOrderPrice(state.order);
      
      return {
        ...state,
        isPending: false
      };
    }

    case INCREASE_OPTION_QUANTITY: {
      var productId = action.data.productId;
      var variantId = action.data.variantId;
      var optionId = action.data.optionId;

      var lineitems = state.order.lineitems.filter(function(l){
        return l.productId == productId && l.variantId == variantId;
      });
      var lineitem = lineitems[0];
      var options = lineitem.options.filter(function(o){
        return o.optionId == optionId;
      });
      var option = options[0];
      option.quantity++;
      calcOrderPrice(state.order);
      
      return {
        ...state,
        isPending: false
      };
    }

    case DECREASE_OPTION_QUANTITY: {
      var productId = action.data.productId;
      var variantId = action.data.variantId;
      var optionId = action.data.optionId;

      var lineitems = state.order.lineitems.filter(function(l){
        return l.productId == productId && l.variantId == variantId;
      });
      var lineitem = lineitems[0];
      var options = lineitem.options.filter(function(o){
        return o.optionId == optionId;
      });
      var option = options[0];
      option.quantity--;
      if (option.quantity == 0) {
        options = lineitem.options.filter(function(o){
          return o.optionId != optionId;
        });
        lineitem.options = options;
      }
      calcOrderPrice(state.order);
      
      return {
        ...state,
        isPending: false
      };
    }

    case INITIALIZE_POS_ORDER: {
      return {
        ...state,
        isPending: false,
        order: {
          lineitems: [], 
          price: 0, 
          tax: 0, 
          cardFee: 0, 
          tip: 0,
          payAmount: 0
        }
      };
    }

    case SEND_PAYMENT_TYPE: {
      return {
        ...state,
        paymentStatus: PAYMENT_STATUS_NONE,
        paymentType: action.data
      }
    }

    case REQUEST_PAYMENT_PROCEED: {
      return {
        ...state,
        isPaymentProcessing: true,
        receiptData: null
      }
    }

    case RECEIVE_PAYMENT_PROCEED: {
      const order: Order = {
        lineitems: [], 
        price: 0, 
        tax: 0, 
        cardFee: 0, 
        tip: 0,
        payAmount: 0
      };

      return {
        ...state,
        order: order,
        isPaymentProcessing: false,
        paymentStatus: PAYMENT_STATUS_SUCCESS,
        receiptData: action.data
      }
    }

    case FAILURE_PAYMENT_PROCEED: {
      return {
        ...state,
        isPaymentProcessing: false,
        paymentStatus: PAYMENT_STATUS_FAILED,
        receiptData: null,
        isSaling: false
      }
    }

    case REQUEST_CARD_AUTHORIZE: {
      return {
        ...state,
        isPaymentProcessing: true,
        receiptData: null
      }
    }

    case RECEIVE_CARD_AUTHORIZE: {
      const order: Order = {
        lineitems: [], 
        price: 0, 
        tax: 0, 
        cardFee: 0, 
        tip: 0,
        payAmount: 0
      };

      return {
        ...state,
        order: order,
        isPaymentProcessing: false,
        paymentStatus: PAYMENT_STATUS_SUCCESS,
        receiptData: action.data
      }
    }

    case FAILURE_CARD_AUTHORIZE: {
      return {
        ...state,
        isPaymentProcessing: false,
        paymentStatus: PAYMENT_STATUS_FAILED,
        receiptData: null,
        isSaling: false
      }
    }

    case REQUEST_SALE_RESULT: {
      return {
        ...state,
        isSaling: true
      }
    }

    case RECEIVE_SALE_RESULT: {
      var order: Order = state.order;
      console.log("order");
      console.log(order);
      var newOrder = {...order};
      newOrder.tip = action.data.tip;
      newOrder.tax = action.data.tax;
      newOrder.payAmount = action.data.totalCharge;
      newOrder.cardFee = action.data.fee;

      console.log("new order");
      console.log(newOrder);

      return {
        ...state,
        order: newOrder,
        isSaling: false
      }
    }

    case FAILURE_SALE_RESULT: {
      return {
        ...state,
        isSaling: false
      }
    }

    case SET_PAYMENT_DONE: {
      return {
        ...state,
        paymentStatus: PAYMENT_STATUS_NONE,
        paymentType: PAYMENT_TYPE_NONE,
        receiptStatus: RECEIPT_STATUS_NONE,
        curProdId: 0,
        curVariationId: 0,
        receiptData: null
      }
    }

    case REQUEST_SEND_RECEIPT: {
      return {
        ...state,
        isSendingReceipt: true,
        receiptStatus: RECEIPT_STATUS_NONE
      }
    }

    case RECEIVE_SEND_RECEIPT: {
      return {
        ...state,
        isSendingReceipt: false,
        receiptStatus: RECEIPT_STATUS_SUCCESS
      }
    }

    case FAILURE_SEND_RECEIPT: {
      return {
        ...state,
        isSendingReceipt: false,
        receiptStatus: RECEIPT_STATUS_FAILED
      }
    }

    case REQUEST_CARD_INSERT: {
      return {
        ...state,
        isWaitingCard: true,
        isSaling: true
      }
    }

    case RECEIVE_CARD_INSERT: {
      return {
        ...state,
        isWaitingCard: false
      }
    }

    case FAILURE_CARD_INSERT: {
      return {
        ...state,
        isWaitingCard: false
      }
    }

    default:
      return state;
  }
};

const addVariantToOrder = (order: Order, product: Product, variantId: number) => {
  console.log("add variant to order");

  var oldLineitems =order.lineitems.filter(function(l){
    //return l.productId == product.ProductId;
    return l.productId == product.ProductId && l.variantId == variantId;
  });

  if (oldLineitems.length > 0) {
    var lineitem = oldLineitems[0];
    lineitem.quantity++;
    /*if (lineitem.variantId == variantId) {
      lineitem.quantity++;
    } else {
      var variations =product.Variations.filter(function(v){
        return v.VariationId == variantId;
      });
      var variation = variations[0];

      lineitem.variantId = variation.VariationId;
      lineitem.variantName = variation.Name;
      lineitem.name = lineitem.productName + " - " + variation.Name;
      lineitem.quantity = 1;
      lineitem.cost = variation.Cost;
    }*/
  } else {
    
    if (variantId != 0) {
      var variations =product.Variations.filter(function(v){
        return v.VariationId == variantId;
      });
      var variation = variations[0];

      var options: LineitemOption[] = [];
      var lineitem = {
        productId: product.ProductId,
        productName: product.Name,
        variantId: variation.VariationId,
        variantName: variation.Name,
        name: product.Name + " - " + variation.Name,
        quantity: 1,
        cost: variation.Cost,
        taxRate: product.TaxRate,
        options: options
      }

      order.lineitems.push(lineitem);
    } else {
      var options: LineitemOption[] = [];
      var lineitem = {
        productId: product.ProductId,
        productName: product.Name,
        variantId: 0,
        variantName: "",
        name: product.Name,
        quantity: 1,
        cost: product.Price,
        taxRate: product.TaxRate,
        options: options
      }

      order.lineitems.push(lineitem);
    }
  }

  calcOrderPrice(order);
}

const addOptionToOrder = (order: Order, product: Product, variantId: number, option: LineitemOption) => {
  console.log("add option to order");

  var oldLineitems =order.lineitems.filter(function(l){
    return l.productId == product.ProductId && l.variantId == variantId;
  });

  if (oldLineitems.length > 0) {
    var lineitem = oldLineitems[0];
    var oldOption = null;
    for (var i = 0; i < lineitem.options.length; i++) {
      if (option.optionId == lineitem.options[i].optionId) {
        oldOption = lineitem.options[i];
        break;
      }
    }
    if (oldOption == null) {
      lineitem.options.push(option);
    } else {
      oldOption.quantity++;
    }
  }

  calcOrderPrice(order);
}

const addProductToOrder = (order: Order, product: Product, variantId: number, options: LineitemOption[]) => {
  console.log("add product to order");

  var oldLineitems =order.lineitems.filter(function(l){
    return l.productId == product.ProductId && l.variantId == variantId;
  });

  if (oldLineitems.length > 0) {
    var lineitem = oldLineitems[0];
    for (var i = 0; i< options.length; i++) {
      var oldOption = null;
      for (var j = 0; j < lineitem.options.length; j++) {
        if (options[i].optionId == lineitem.options[j].optionId) {
          oldOption = lineitem.options[j];
          break;
        }
      }
      if (oldOption == null) {
        lineitem.options.push(options[i]);
      } else {
        oldOption.quantity += options[i].quantity;
      }
    }

    lineitem.quantity++;
    
  } else {
    
    if (variantId != 0) {
      var variations =product.Variations.filter(function(v){
        return v.VariationId == variantId;
      });
      var variation = variations[0];

      var lineitem = {
        productId: product.ProductId,
        productName: product.Name,
        variantId: variation.VariationId,
        variantName: variation.Name,
        name: product.Name + " - " + variation.Name,
        quantity: 1,
        cost: variation.Cost,
        taxRate: product.TaxRate,
        options: options,
      }

      order.lineitems.push(lineitem);
    } else {
      var lineitem = {
        productId: product.ProductId,
        productName: product.Name,
        variantId: 0,
        variantName: "",
        name: product.Name,
        quantity: 1,
        cost: product.Price,
        taxRate: product.TaxRate,
        options: options 
      }

      order.lineitems.push(lineitem);
    }
  }

  calcOrderPrice(order);
}

const calcOrderPrice = (order: Order) => {
  var order_price = 0;
  var order_tax = 0;
  for (var i = 0; i< order.lineitems.length; i++) {
    var options_price = 0;
    var lineitem = order.lineitems[i];
    for (var j = 0; j< lineitem.options.length; j++) {
      options_price += lineitem.options[j].cost * lineitem.options[j].quantity;
    }

    var lineitem_price = lineitem.cost * lineitem.quantity + options_price;
    var lineitem_tax = lineitem_price * lineitem.taxRate;
    order_price += lineitem_price;
    order_tax += lineitem_tax;
  }

  order.price = order_price;
  order.tax = order_tax;
  order.payAmount = order_price + order_tax;

  displayCart(order, false);
}