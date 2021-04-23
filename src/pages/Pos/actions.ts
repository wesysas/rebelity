import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { 
  IAction, 
  STATUS_OK,
  PRINT_ALIGN_LEFT,
  PRINT_ALIGN_RIGHT,
  PRINT_ALIGN_CENTER,
  PRINT_NEXT_LINE,
  PAYMENT_TYPE_CASH,
  PAYMENT_TYPE_CARD,
  PAYMENT_TYPE_CARD_AUTHORIZE,
  PAYMENT_TYPE_NONE
 } from '../../data/coreTypes';

import { Option } from '../../models/Pos';
import { openAlert } from '../AlertModal/actions';
import { Order } from './types';
import { getStore } from '../../data/configureStore';

import { Plugins } from '@capacitor/core';
import 'capacitor-plugin-sunmi-printer';

const { SunmiPrinter } = Plugins;

export const REQUEST_POS_CATEGORIES = 'REQUEST_POS_CATEGORIES';
export const requestPosCategories = (): IAction<undefined> => {
  return {
    type: REQUEST_POS_CATEGORIES,
    data: undefined
  };
};

export const FAILURE_POS_CATEGORIES = 'FAILURE_POS_CATEGORIES';
export const failurePosCategories = (): IAction<undefined> => {
  return {
    type: FAILURE_POS_CATEGORIES,
    data: undefined
  };
};

export const RECEIVE_POS_CATEGORIES = 'RECEIVE_POS_CATEGORIES';
export const receivePosCategories = (data: any): IAction<any> => {
  return {
    type: RECEIVE_POS_CATEGORIES,
    data
  };
};

export const SET_POS_CATEGORIES = 'SET_POS_CATEGORIES';
export const setPosCategories = (data: any): IAction<any> => {
  return {
    type: SET_POS_CATEGORIES,
    data
  };
};

export const REQUEST_POS_PRODUCTS = 'REQUEST_POS_PRODUCTS';
export const requestPosProducts = (): IAction<undefined> => {
  return {
    type: REQUEST_POS_PRODUCTS,
    data: undefined
  };
};

export const FAILURE_POS_PRODUCTS = 'FAILURE_POS_PRODUCTS';
export const failurePosProducts = (): IAction<undefined> => {
  return {
    type: FAILURE_POS_PRODUCTS,
    data: undefined
  };
};

export const RECEIVE_POS_PRODUCTS = 'RECEIVE_POS_PRODUCTS';
export const receivePosProducts = (data: any): IAction<any> => {
  return {
    type: RECEIVE_POS_PRODUCTS,
    data
  };
};

export const SET_POS_PRODUCTS = 'SET_POS_PRODUCTS';
export const setPosProducts = (data: any): IAction<any> => {
  return {
    type: SET_POS_PRODUCTS,
    data
  };
};

export const REQUEST_PROD_CATEGORIES = 'REQUEST_PROD_CATEGORIES';
export const requestProdCategories = (): IAction<undefined> => {
  return {
    type: REQUEST_PROD_CATEGORIES,
    data: undefined
  };
};

export const RECEIVE_PROD_CATEGORIES = 'RECEIVE_PROD_CATEGORIES';
export const receiveProdCategories = (): IAction<undefined> => {
  return {
    type: RECEIVE_PROD_CATEGORIES,
    data: undefined
  };
};

export const SELECT_PROD_CATEGORIES = 'SELECT_PROD_CATEGORIES';
export const toggleProdCategory = (data: number): IAction<number> => {
  return {
    type: SELECT_PROD_CATEGORIES,
    data
  };
};

export const SET_PROD_KEYWORD = 'SET_PROD_KEYWORD';
export const setProdKeyword = (data: string): IAction<string> => {
  return {
    type: SET_PROD_KEYWORD,
    data
  };
};

export const SET_CUR_PRODUCT = 'SET_CUR_PRODUCT';
export const setCurProduct = (data: number): IAction<number> => {
  return {
    type: SET_CUR_PRODUCT,
    data
  };
};

export const SET_CUR_VARIATION = 'SET_CUR_VARIATION';
export const setCurVariation = (data: number): IAction<number> => {
  return {
    type: SET_CUR_VARIATION,
    data
  };
};

export const REQUEST_POS_PENDING = 'REQUEST_POS_PENDING';
export const requestPosPending = (): IAction<undefined> => {
  return {
    type: REQUEST_POS_PENDING,
    data: undefined
  };
};

export const SET_LINEITEM_OPTION = 'SET_LINEITEM_OPTION';
export const setLineitemOption = (data: Option): IAction<Option> => {
  return {
    type: SET_LINEITEM_OPTION,
    data
  };
};

export const CLEAR_CURRENT_ITEMS = 'CLEAR_CURRENT_ITEMS';
export const clearCurrentItems = (): IAction<undefined> => {
  return {
    type: CLEAR_CURRENT_ITEMS,
    data: undefined
  };
};

export const CANCEL_ORDER_LINEITEM = 'CANCEL_ORDER_LINEITEM';
export const cancelOrderLineitem = (): IAction<undefined> => {
  return {
    type: CANCEL_ORDER_LINEITEM,
    data: undefined
  };
};

export const INCREASE_LINEITEM_QUANTITY = 'INCREASE_LINEITEM_QUANTITY';
export const increaseLineitemQuantity = (data: any): IAction<any> => {
  return {
    type: INCREASE_LINEITEM_QUANTITY,
    data
  };
};

export const DECREASE_LINEITEM_QUANTITY = 'DECREASE_LINEITEM_QUANTITY';
export const decreaseLineitemQuantity = (data: any): IAction<any> => {
  return {
    type: DECREASE_LINEITEM_QUANTITY,
    data
  };
};

export const INCREASE_OPTION_QUANTITY = 'INCREASE_OPTION_QUANTITY';
export const increaseOptionQuantity = (data: any): IAction<any> => {
  return {
    type: INCREASE_OPTION_QUANTITY,
    data
  };
};

export const DECREASE_OPTION_QUANTITY = 'DECREASE_OPTION_QUANTITY';
export const decreaseOptionQuantity = (data: any): IAction<any> => {
  return {
    type: DECREASE_OPTION_QUANTITY,
    data
  };
};

export const INITIALIZE_POS_ORDER = 'INITIALIZE_POS_ORDER';
export const initializePosOrder = (): IAction<undefined> => {
  return {
    type: INITIALIZE_POS_ORDER,
    data: undefined
  };
};

export const SEND_PAYMENT_TYPE = 'SEND_PAYMENT_TYPE';
export const sendPaymentType = (data: any): IAction<any> => {
  return {
    type: SEND_PAYMENT_TYPE,
    data
  };
};

export const REQUEST_PAYMENT_PROCEED = 'REQUEST_PAYMENT_PROCEED';
export const requestPaymentProceed = (): IAction<undefined> => {
  return {
    type: REQUEST_PAYMENT_PROCEED,
    data: undefined
  };
};

export const RECEIVE_PAYMENT_PROCEED = 'RECEIVE_PAYMENT_PROCEED';
export const receivePaymentProceed = (data: any): IAction<any> => {
  return {
    type: RECEIVE_PAYMENT_PROCEED,
    data
  };
};

export const FAILURE_PAYMENT_PROCEED = 'FAILURE_PAYMENT_PROCEED';
export const failurePaymentProceed = (): IAction<undefined> => {
  return {
    type: FAILURE_PAYMENT_PROCEED,
    data: undefined
  };
};

export const REQUEST_CARD_INSERT = 'REQUEST_CARD_INSERT';
export const requestCardInsert = (): IAction<undefined> => {
  return {
    type: REQUEST_CARD_INSERT,
    data: undefined
  };
};

export const RECEIVE_CARD_INSERT = 'RECEIVE_CARD_INSERT';
export const receiveCardInsert = (): IAction<any> => {
  return {
    type: RECEIVE_CARD_INSERT,
    data: undefined
  };
};

export const FAILURE_CARD_INSERT = 'FAILURE_CARD_INSERT';
export const failureCardInsert = (): IAction<undefined> => {
  return {
    type: FAILURE_CARD_INSERT,
    data: undefined
  };
};

export const REQUEST_CARD_AUTHORIZE = 'REQUEST_CARD_AUTHORIZE';
export const requestCardAuthorize = (): IAction<undefined> => {
  return {
    type: REQUEST_CARD_AUTHORIZE,
    data: undefined
  };
};

export const RECEIVE_CARD_AUTHORIZE = 'RECEIVE_CARD_AUTHORIZE';
export const receiveCardAuthorize = (data: any): IAction<any> => {
  return {
    type: RECEIVE_CARD_AUTHORIZE,
    data
  };
};

export const FAILURE_CARD_AUTHORIZE = 'FAILURE_CARD_AUTHORIZE';
export const failureCardAuthorize = (): IAction<undefined> => {
  return {
    type: FAILURE_CARD_AUTHORIZE,
    data: undefined
  };
};

export const REQUEST_SALE_RESULT = 'REQUEST_SALE_RESULT';
export const requestSaleResult = (): IAction<undefined> => {
  return {
    type: REQUEST_SALE_RESULT,
    data: undefined
  };
};

export const RECEIVE_SALE_RESULT = 'RECEIVE_SALE_RESULT';
export const receiveSaleResult = (data: any): IAction<any> => {
  return {
    type: RECEIVE_SALE_RESULT,
    data
  };
};

export const FAILURE_SALE_RESULT = 'FAILURE_SALE_RESULT';
export const failureSaleResult = (): IAction<undefined> => {
  return {
    type: FAILURE_SALE_RESULT,
    data: undefined
  };
};

export const SET_PAYMENT_DONE = 'SET_PAYMENT_DONE';
export const setPaymentDone = (): IAction<undefined> => {
  return {
    type: SET_PAYMENT_DONE,
    data: undefined
  };
};

export const REQUEST_SEND_RECEIPT = 'REQUEST_SEND_RECEIPT';
export const requestSendReceipt = (): IAction<undefined> => {
  return {
    type: REQUEST_SEND_RECEIPT,
    data: undefined
  };
};

export const RECEIVE_SEND_RECEIPT = 'RECEIVE_SEND_RECEIPT';
export const receiveSendReceipt = (): IAction<undefined> => {
  return {
    type: RECEIVE_SEND_RECEIPT,
    data: undefined
  };
};

export const FAILURE_SEND_RECEIPT = 'FAILURE_SEND_RECEIPT';
export const failureSendReceipt = (): IAction<undefined> => {
  return {
    type: FAILURE_SEND_RECEIPT,
    data: undefined
  };
};

export const getProdCategories = () => {
  return (dispatch: Dispatch) => {
    console.log("get product categories");

    dispatch(requestProdCategories());
    dispatch(receiveProdCategories());
  };
};

export const selectProdCategory = (
  categoryId: number
) => {
  return (dispatch: Dispatch) => {
    console.log("select product category");

    dispatch(toggleProdCategory(categoryId));
  };
};

export const searchProduct = (
  keyword: string
) => {
  return (dispatch: Dispatch) => {
    console.log("search products");

    dispatch(setProdKeyword(keyword));
  };
};

export const selectProduct = (
  productId: number
) => {
  return (dispatch: Dispatch) => {
    console.log("select product");

    dispatch(setCurProduct(productId));
  };
};

export const selectVariation = (
  variationId: number
) => {
  return (dispatch: Dispatch) => {
    console.log("select variation");
    dispatch(requestPosPending());
    dispatch(setCurVariation(variationId));
  };
};

export const addOption = (
  option: Option
) => {
  return (dispatch: Dispatch) => {
    console.log("add option");
    dispatch(requestPosPending());
    dispatch(setLineitemOption(option));
  };
};

export const cancelProduct = (
) => {
  return (dispatch: Dispatch) => {
    dispatch(cancelOrderLineitem());
  };
};

export const doneProduct = (
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestPosPending());
    dispatch(clearCurrentItems());
    //dispatch(addOrderLineitem());
  };
};

export const increaseLineitem = (
  productId: number,
  variantId: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestPosPending());
    var data: any = {
      productId: productId,
      variantId: variantId
    }
    dispatch(increaseLineitemQuantity(data));
  };
};

export const decreaseLineitem = (
  productId: number,
  variantId: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestPosPending());
    var data: any = {
      productId: productId,
      variantId: variantId
    }
    dispatch(decreaseLineitemQuantity(data));
  };
};

export const increaseOption = (
  productId: number,
  variantId: number,
  optionId: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestPosPending());
    var data: any = {
      productId: productId,
      variantId: variantId,
      optionId: optionId
    }
    dispatch(increaseOptionQuantity(data));
  };
};

export const decreaseOption = (
  productId: number,
  variantId: number,
  optionId: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestPosPending());
    var data: any = {
      productId: productId,
      variantId: variantId,
      optionId: optionId
    }
    dispatch(decreaseOptionQuantity(data));
  };
};

export const clearOrder = (
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestPosPending());
    dispatch(initializePosOrder());
  };
};

export const setCustomerTip = (
  tip: number
) => {
  return (dispatch: Dispatch) => {
    const { order } = getStore().getState().PosState;
    dispatch(requestSaleResult());

    const sale = {
      saleId: 0,
      tip: tip,
      fee: order.cardFee,
      tax: order.tax,
      totalCharge: order.price + order.tax + order.cardFee + tip
    }

    dispatch(receiveSaleResult(sale));
  };
};

export const setPaymentType = (
  type: string
) => {
  return (dispatch: Dispatch) => {
    const { order } = getStore().getState().PosState;

    if (type == PAYMENT_TYPE_CARD) {
      calcTotalCardSale(dispatch, order);
    } else {
      dispatch(requestSaleResult());

      const sale = {
        saleId: 0,
        tip: 0,
        fee: 0,
        tax: order.tax,
        totalCharge: order.price + order.tax
      }
      dispatch(receiveSaleResult(sale));
    }
    dispatch(sendPaymentType(type));
  };
};

const calcTotalCardSale = (dispatch: Dispatch, order: Order) => {
  dispatch(requestSaleResult());

  var data: any[] = [];
  for (var i = 0; i< order.lineitems.length; i++) {
    var options: any[] = [];
    for (var j = 0; j < order.lineitems[i].options.length; j++){
      let option = {
        OptionId: order.lineitems[i].options[j].optionId,
        Quantity: order.lineitems[i].options[j].quantity
      }

      options.push(option);
    }
    let item = {
      ProductId: order.lineitems[i].productId,
      Quantity: order.lineitems[i].quantity,
      VariationId: order.lineitems[i].variantId == 0 ? null : order.lineitems[i].variantId,
      Options: options
    }

    data.push(item);
  }

  console.log("calc total data");
  console.log(data);
  console.log(JSON.stringify(data));

  request({
    operation: ApiOperation.CalcTotalSale,
    variables: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log("calc sale res");
    console.log(res);
    if (res.status == STATUS_OK) {
      const sale = {
        saleId: 0,
        tip: res.totals.Tip,
        fee: res.totals.Fee,
        tax: res.totals.Tax,
        totalCharge: res.totals.TotalCharge
      }
      dispatch(receiveSaleResult(sale));
    } else {
      dispatch(failureSaleResult());
      dispatch(
        openAlert({
          title: "Card Payment",
          text: res.message
        })
      );
    }
  })
  .catch(err => {
    dispatch(failureSaleResult());
    dispatch(
      openAlert({
        title: "Card Payment",
        text: "Calculation of fee has been failed"
      })
    );
    console.log(err);
  });
};

export const paymentDone = (
) => {
  return (dispatch: Dispatch) => {
    dispatch(setPaymentDone());
  };
};

export const proceedCash = (
  order: Order
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestPaymentProceed());

    const { connectedReader, isPrinterConnected } = getStore().getState().SettingState;
    if (connectedReader == null) {
      dispatch(failurePaymentProceed());
      dispatch(
        openAlert({
          title: "Cash Payment",
          text: "Please connect the terminal"
        })
      );
      return;
    }
    console.log("order");
    console.log(order);

    if (!isPrinterConnected) {
      dispatch(failurePaymentProceed());
      dispatch(
        openAlert({
          title: "Cash Payment",
          text: "Please connect to a printer"
        })
      );
      return;
    }

    createSashSale(dispatch, order, connectedReader.label);
  };
};

const createSashSale = (dispatch: Dispatch, order: Order, terminal: string) => {
  
  const { currentUserId, periodId } = getStore().getState().ClockInState;

  var items: any[] = [];
  for (var i = 0; i< order.lineitems.length; i++) {
    var options: any[] = [];
    for (var j = 0; j < order.lineitems[i].options.length; j++){
      let option = {
        OptionId: order.lineitems[i].options[j].optionId,
        Quantity: order.lineitems[i].options[j].quantity
      }

      options.push(option);
    }
    let item = {
      ProductId: order.lineitems[i].productId,
      Quantity: order.lineitems[i].quantity,
      VariationId: order.lineitems[i].variantId == 0 ? null : order.lineitems[i].variantId,
      Options: options
    }

    items.push(item);
  }

  const data: any = {
    Terminal: terminal,
    UserId: currentUserId,
    WorkperiodId: periodId,
    items: items
  }

  console.log("data");
  console.log(data);

  request({
    operation: ApiOperation.CreateCashSale,
    variables: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log("create new cash sale res");
    console.log(res);
    if (res.status == STATUS_OK) {
      openCashRegister();
      dispatch(receivePaymentProceed(res.receipt));
    } else {
      dispatch(failurePaymentProceed());
      dispatch(
        openAlert({
          title: "Cash Payment",
          text: res.message
        })
      );
    }
    
  })
  .catch(err => {
    dispatch(failurePaymentProceed());
    dispatch(
      openAlert({
        title: "Cash Payment",
        text: "Card payment has been failed"
      })
    );
    console.log(err);
  });
};

export const proceedCard = (
  order: Order
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestCardInsert());
    
    
    const { connectedReader } = getStore().getState().SettingState;
    if (connectedReader == null) {
      dispatch(failureCardInsert());
      dispatch(
        openAlert({
          title: "Card Payment",
          text: "Please connect the terminal"
        })
      );
      return;
    }
    console.log("order");
    console.log(order);

    createNewSale(dispatch, order, connectedReader.label);
  };
};

export const cancelTerminalPayment = (
) => {
  return (dispatch: Dispatch) => {
    const { terminal } = getStore().getState().SettingState;
    
    terminal.cancelCollectPaymentMethod().then(function (result: any) {
      dispatch(sendPaymentType(PAYMENT_TYPE_NONE));
    });
    
  };
};

const createNewSale = (dispatch: Dispatch, order: Order, terminal: string) => {
  const { currentUserId, periodId } = getStore().getState().ClockInState;

  var items: any[] = [];
  for (var i = 0; i< order.lineitems.length; i++) {
    var options: any[] = [];
    for (var j = 0; j < order.lineitems[i].options.length; j++){
      let option = {
        OptionId: order.lineitems[i].options[j].optionId,
        Quantity: order.lineitems[i].options[j].quantity
      }

      options.push(option);
    }
    let item = {
      ProductId: order.lineitems[i].productId,
      Quantity: order.lineitems[i].quantity,
      VariationId: order.lineitems[i].variantId == 0 ? null : order.lineitems[i].variantId,
      Options: options
    }

    items.push(item);
  }

  const data: any = {
    Tip: order.tip,
    Terminal: terminal,
    UserId: currentUserId,
    WorkperiodId: periodId,
    items: items
  }

  console.log("data");
  console.log(data);

  request({
    operation: ApiOperation.CreateNewSale,
    variables: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log("create new sale res");
    if (res.status == STATUS_OK) {
      const sale = {
        saleId: res.sale.SaleId,
        tip: res.sale.Tip,
        fee: res.sale.Fee,
        tax: res.sale.Tax,
        totalCharge: res.sale.TotalCharge
      }

      dispatch(receiveSaleResult(sale));

      const clientSecret = res.sale.ClientSecret;
      collectPaymentMethod(dispatch, clientSecret);
    } else {
      dispatch(failureCardInsert());
      dispatch(
        openAlert({
          title: "Card Payment",
          text: res.message
        })
      );
    }
    console.log(res);
  })
  .catch(err => {
    dispatch(failureCardInsert());
    dispatch(
      openAlert({
        title: "Card Payment",
        text: "Card payment has been failed"
      })
    );
    console.log(err);
  });
};

const collectPaymentMethod = (dispatch: Dispatch, clientSecret: string) => {
  const { terminal } = getStore().getState().SettingState;

  terminal.collectPaymentMethod(clientSecret).then(function (result: any) {
    console.log("collect payment method result");
    console.log(result);
    if (result.error) {
      dispatch(failureCardInsert());
      dispatch(
        openAlert({
          title: "Card Payment",
          text: result.error.message
        })
      );
    } else {
      dispatch(receiveCardInsert());
      processCardPayment(dispatch, result.paymentIntent);
    }
  });
};

const processCardPayment = (dispatch: Dispatch, paymentIntent: any) => {
  const { terminal } = getStore().getState().SettingState;
  dispatch(requestPaymentProceed());

  terminal.processPayment(paymentIntent).then(function (result: any) {
    console.log("process payment result");
    console.log(result);
    if (result.error) {
      dispatch(failurePaymentProceed());
      dispatch(
        openAlert({
          title: "Card Payment",
          text: result.error.message
        })
      );
    } else {
      capturePaymentIntent(dispatch, result.paymentIntent.id);
    }
  });
};

const capturePaymentIntent = (dispatch: Dispatch, paymentIntentId: string) => {
  request({
    operation: ApiOperation.CaptureCardSale,
    params: {
      paymentIntentId
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    console.log("capture payement result");
    console.log(res);
    if (res.status == STATUS_OK) {
      dispatch(receivePaymentProceed(res.receipt));
    } else {
      dispatch(failurePaymentProceed());
      dispatch(
        openAlert({
          title: "Card Payment",
          text: res.message
        })
      );
    }
  })
  .catch(err => {
    console.log(err);
    dispatch(failurePaymentProceed());
    dispatch(
      openAlert({
        title: "Card Payment",
        text: "Card payment has been failed"
      })
    );
  });
};

export const authorizeCard = (
  order: Order
) => {
  return (dispatch: Dispatch) => {
    
    const { connectedReader } = getStore().getState().SettingState;
    if (connectedReader == null) {
      dispatch(
        openAlert({
          title: "Card Authorization",
          text: "Please connect the terminal"
        })
      );
      return;
    }
    console.log("order");
    console.log(order);

    calcTotalCardAuthorize(dispatch, order, connectedReader.label);
  };
};

const calcTotalCardAuthorize = (dispatch: Dispatch, order: Order, terminal: string) => {
  dispatch(requestSaleResult());
  dispatch(sendPaymentType(PAYMENT_TYPE_CARD_AUTHORIZE));

  var data: any[] = [];
  for (var i = 0; i< order.lineitems.length; i++) {
    var options: any[] = [];
    for (var j = 0; j < order.lineitems[i].options.length; j++){
      let option = {
        OptionId: order.lineitems[i].options[j].optionId,
        Quantity: order.lineitems[i].options[j].quantity
      }

      options.push(option);
    }
    let item = {
      ProductId: order.lineitems[i].productId,
      Quantity: order.lineitems[i].quantity,
      VariationId: order.lineitems[i].variantId == 0 ? null : order.lineitems[i].variantId,
      Options: options
    }

    data.push(item);
  }

  console.log("data");
  console.log(data);

  request({
    operation: ApiOperation.CalcTotalSale,
    variables: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log("calc sale res");
    if (res.status == STATUS_OK) {
      const sale = {
        saleId: 0,
        tip: res.totals.Tip,
        fee: res.totals.Fee,
        tax: res.totals.Tax,
        totalCharge: res.totals.TotalCharge
      }
      dispatch(receiveSaleResult(sale));

      order.tip = sale.tip;
      order.tax = sale.tax;
      order.payAmount = sale.totalCharge;
      order.cardFee = sale.fee;

      createNewSaleManual(dispatch, order, terminal);
    } else {
      dispatch(failureSaleResult());
      dispatch(
        openAlert({
          title: "Card Authorize",
          text: res.message
        })
      );
    }
    console.log(res);
  })
  .catch(err => {
    dispatch(failureSaleResult());
    dispatch(
      openAlert({
        title: "Card Authorize",
        text: "Calculation of fee has been failed"
      })
    );
    console.log(err);
  });
};

const createNewSaleManual = (dispatch: Dispatch, order: Order, terminal: string) => {
  const { currentUserId, periodId } = getStore().getState().ClockInState;

  dispatch(requestCardInsert());
    

  var items: any[] = [];
  for (var i = 0; i< order.lineitems.length; i++) {
    var options: any[] = [];
    for (var j = 0; j < order.lineitems[i].options.length; j++){
      let option = {
        OptionId: order.lineitems[i].options[j].optionId,
        Quantity: order.lineitems[i].options[j].quantity
      }

      options.push(option);
    }
    let item = {
      ProductId: order.lineitems[i].productId,
      Quantity: order.lineitems[i].quantity,
      VariationId: order.lineitems[i].variantId == 0 ? null : order.lineitems[i].variantId,
      Options: options
    }

    items.push(item);
  }

  const data: any = {
    Tip: order.tip,
    Terminal: terminal,
    UserId: currentUserId,
    WorkperiodId: periodId,
    items: items
  }

  console.log("create new sale manual data");
  console.log(data);

  request({
    operation: ApiOperation.CreateNewSaleManual,
    variables: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log("create new sale manual res");
    console.log(res);
    if (res.status == STATUS_OK) {
      const sale = {
        saleId: res.sale.SaleId,
        tip: res.sale.Tip,
        fee: res.sale.Fee,
        tax: res.sale.Tax,
        totalCharge: res.sale.TotalCharge
      }

      dispatch(receiveSaleResult(sale));

      const clientSecret = res.sale.ClientSecret;
      collectCartAuthorize(dispatch, clientSecret, sale.saleId);
    } else {
      dispatch(failureCardInsert());
      dispatch(
        openAlert({
          title: "Card Authorize",
          text: res.message
        })
      );
    }
    console.log(res);
  })
  .catch(err => {
    dispatch(failureCardInsert());
    dispatch(
      openAlert({
        title: "Card Authorize",
        text: "Card authorization has been failed"
      })
    );
    console.log(err);
  });
};


const collectCartAuthorize = (dispatch: Dispatch, clientSecret: string, saleId: any) => {
  const { terminal } = getStore().getState().SettingState;

  terminal.collectPaymentMethod(clientSecret).then(function (result: any) {
    console.log("collect payment of card authorize method result");
    console.log(result);
    if (result.error) {
      dispatch(failureCardInsert());
      dispatch(
        openAlert({
          title: "Card Authorize",
          text: result.error.message
        })
      );
    } else {
      dispatch(receiveCardInsert());
      processCardAuthorize(dispatch, result.paymentIntent, saleId);
    }
  });
};

const processCardAuthorize = (dispatch: Dispatch, paymentIntent: any, saleId: any) => {
  const { terminal } = getStore().getState().SettingState;

  dispatch(requestCardAuthorize());

  terminal.processPayment(paymentIntent).then(function (result: any) {
    console.log("card authorize result");
    console.log(result);
    if (result.error) {
      dispatch(failureCardAuthorize());
      dispatch(
        openAlert({
          title: "Card Authorize",
          text: result.error.message
        })
      );
    } else {
      closeCardAuthorize(dispatch, result.paymentIntent.id, saleId);
    }
  });
};

const closeCardAuthorize = (dispatch: Dispatch, paymentIntentId: any, saleId: any) => {
  const data = {
    saleId: saleId,
    intentId: paymentIntentId
  }

  console.log("close auth data");
  console.log(data);
  console.log(JSON.stringify(data));

  request({
    operation: ApiOperation.CloseCardAuth,
    // variables: data,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
    variables: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    console.log("res.receipt");
    console.log(res);
    if (res.status == STATUS_OK) {
      dispatch(receiveCardAuthorize(res.receipt));
    } else {
      dispatch(failureCardAuthorize());
      dispatch(
        openAlert({
          title: "Card Authorize",
          text: res.message
        })
      );
    }
  })
  .catch(err => {
    dispatch(failureCardAuthorize());
    dispatch(
      openAlert({
        title: "Card Authorize",
        text: "Card Authorization has been failed"
      })
    );
  });
};


export const sendReceiptData = (
  saleId: string,
  deliveryType: number,
  email: string,
  phone: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestSendReceipt());

    const data = {
      SaleId: saleId,
      Delivery: deliveryType,
      Email: email,
      Telephone: phone
    }

    request({
      operation: ApiOperation.SendReceiptData,
      variables: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status == STATUS_OK) {
        console.log("send receipt result");
        console.log(res);
        dispatch(receiveSendReceipt());
        dispatch(
          openAlert({
            title: "Send Receipt",
            text: "Receipt has been sent successfully"
          })
        );
      } else {
        dispatch(failureSendReceipt());
        dispatch(
          openAlert({
            title: "Send Receipt",
            text: res.message
          })
        );
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(failureSendReceipt());
      dispatch(
        openAlert({
          title: "Send Receipt",
          text: "Payment receipt can't be sent"
        })
      );
    });
  };
};

export const openCashDrawer = (
) => {
  return (dispatch: Dispatch) => {
    const { isPrinterConnected } = getStore().getState().SettingState;
    if (!isPrinterConnected) {
      dispatch(
        openAlert({
          title: "Print Receipt",
          text: "Please connect to a printer"
        })
      );
      return;
    }

    openCashRegister();
  };
};

export const printReceiptData = (
  receiptData: any
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestSendReceipt());

    const { isPrinterConnected } = getStore().getState().SettingState;
    if (!isPrinterConnected) {
      dispatch(failureSendReceipt());
      dispatch(
        openAlert({
          title: "Print Receipt",
          text: "Please connect to a printer"
        })
      );
      return;
    }

    sendStringToPrinter("\n", false, false);                                                                 //empty line
    
    sendCommandToPrinter(PRINT_ALIGN_CENTER);                                                                // text align center
    sendBarcodeToPrinter(receiptData.OrderNumber + "", 6, 120);                                                      // order number barcode
    sendStringToPrinter("\n", false, false);                                                                 //empty line
    
    sendCommandToPrinter(PRINT_ALIGN_CENTER);                                                                // text align center
    sendStringToPrinter(receiptData.Merchant.Name + "\n", true, false);                                      //merchant name
    sendStringToPrinter(receiptData.Merchant.Address + " " + receiptData.Merchant.State + "\n", true, false);          //merchant address and state
    sendStringToPrinter("--------------------------------\n\n", true, false);

    sendCommandToPrinter(PRINT_ALIGN_LEFT);                                                                   // text align left
    sendStringToPrinter("Server: ", false, false);                                                            //server
    sendStringToPrinter(receiptData.Server + "\n", false, false);                                             //server

    sendStringToPrinter("SaleDate: ", false, false);                                                          //server saled date
    sendStringToPrinter(receiptData.SaleDate + "\n", false, false);                                           //server saled date

    sendStringToPrinter("Order #: ", false, false);                                           // order number
    sendStringToPrinter(receiptData.OrderNumber + "\n", false, false);                         // order number

    sendStringToPrinter("Station: ", false, false);                                           // terminal
    sendStringToPrinter(receiptData.Terminal + "\n", false, false);                                 // terminal

    sendCommandToPrinter(PRINT_ALIGN_LEFT);
    for (var i = 0; i< receiptData.Items.length; i++) {
      var item = receiptData.Items[i];

      sendStringToPrinter(item.ItemName + ": ", true, false);                                                 //server item name
      const itemTotal = item.ItemTotal == null || item.ItemTotal == 0 ? "" : item.ItemTotal;
      sendStringToPrinter(itemTotal + "\n", true, false);                                                // item price
    }
    
    sendCommandToPrinter(PRINT_ALIGN_LEFT);                                                                //empty line
    
    if (receiptData.SaleType == 1) {// card
      const fee = receiptData.Fee == null || receiptData.Fee == 0 ? "" : receiptData.Fee;
      sendStringToPrinter("Fees: ", false, false);                                                              //
      sendStringToPrinter(fee + "\n", false, false);                                                // fee
  
      const tax = receiptData.Tax == null || receiptData.Tax == 0  ? "" : receiptData.Tax;
      sendStringToPrinter("Tax: ", false, false);                                                               //
      sendStringToPrinter(tax + "\n", false, false);                                              // tip

      const subTotal = receiptData.SubTotal == null || receiptData.SubTotal  == 0  ? "" : receiptData.SubTotal ;
      sendStringToPrinter("Total: ", false, false);                                                               //
      sendStringToPrinter(subTotal + "\n\n", false, false);    

      const tip = receiptData.Tip == null || receiptData.Tip == 0 ? "" : receiptData.Tip;
      sendStringToPrinter("Tip: ", false, false);
      sendStringToPrinter(tip + "\n", false, false);                                                // tip

  
      sendCommandToPrinter(PRINT_ALIGN_LEFT);
      const saleType = receiptData.CardNumber;
      sendStringToPrinter("Paid with card ", false, false);                                                      //
      sendStringToPrinter(saleType + ": ", true, false);                                                        //
      const orderTotal = receiptData.OrderTotal == null || receiptData.OrderTotal == 0 ? "" : receiptData.OrderTotal;
      sendStringToPrinter(orderTotal + "\n\n", true, false);                                      // order total
  
      sendCommandToPrinter(PRINT_ALIGN_LEFT);
      sendStringToPrinter("Signature: ", false, false);                                                      //
      sendStringToPrinter("_________________________________\n\n", true, false);
    } else if (receiptData.SaleType == 2) {//cash sale
      const fee = receiptData.Fee == null || receiptData.Fee == 0 ? "" : receiptData.Fee;
      sendStringToPrinter("Fees: ", false, false);                                                              //
      sendStringToPrinter(fee + "\n", false, false);                                                // fee
  
      const tax = receiptData.Tax == null || receiptData.Tax == 0  ? "" : receiptData.Tax;
      sendStringToPrinter("Tax: ", false, false);                                                               //
      sendStringToPrinter(tax + "\n", false, false);                                              // tip
  
      sendCommandToPrinter(PRINT_ALIGN_LEFT);
      sendStringToPrinter("Paid in Cash: ", false, false);                                                      //
      const orderTotal = receiptData.OrderTotal == null || receiptData.OrderTotal == 0 ? "" : receiptData.OrderTotal;
      sendStringToPrinter(orderTotal + "\n\n", true, false);      
      
      sendCommandToPrinter(PRINT_ALIGN_LEFT);
      sendStringToPrinter("Signature: ", false, false);                                                      //
      sendStringToPrinter("_________________________________\n\n", true, false);

    } else {//card auth
      const fee = receiptData.Fee == null || receiptData.Fee == 0 ? "" : receiptData.Fee;
      sendStringToPrinter("Fees: ", false, false);                                                              //
      sendStringToPrinter(fee + "\n", false, false);                                                // fee
  
      const tax = receiptData.Tax == null || receiptData.Tax == 0  ? "" : receiptData.Tax;
      sendStringToPrinter("Tax: ", false, false);                                                               //
      sendStringToPrinter(tax + "\n", false, false);                                              // tip
  
      sendCommandToPrinter(PRINT_ALIGN_LEFT);
      const saleType = receiptData.CardNumber;
      sendStringToPrinter("Paid with card ", false, false);                                                      //
      sendStringToPrinter(saleType + ": ", true, false);                                                        //
      const orderTotal = receiptData.OrderTotal == null || receiptData.OrderTotal == 0 ? "" : receiptData.OrderTotal;
      sendStringToPrinter(orderTotal + "\n\n", true, false);                                      // order total
  
      sendStringToPrinter("Tip: ", false, false);
      sendStringToPrinter("______________________________________\n\n", true, false);

      sendStringToPrinter("Total: ", false, false);
      sendStringToPrinter("_____________________________________\n\n", true, false);
      
      sendCommandToPrinter(PRINT_ALIGN_LEFT);
      sendStringToPrinter("Signature: ", false, false);                                                      //
      sendStringToPrinter("_________________________________\n\n", true, false);
    }

    sendCommandToPrinter(PRINT_ALIGN_CENTER);
    
    sendStringToPrinter("THANK YOU FOR PATRONAGE" + "\n", true, false);                                       //
    sendStringToPrinter(receiptData.Merchant.Name + "\n", true, false);                                       //merchant name

    sendCommandToPrinter(PRINT_NEXT_LINE);
    sendCommandToPrinter(PRINT_NEXT_LINE);
    sendCommandToPrinter(PRINT_NEXT_LINE);

    dispatch(receiveSendReceipt());
  };
};

const sendStringToPrinter = async (contents: string, is_bold: boolean, is_underline: boolean) => {
  const options = {
    contents : contents,
    is_bold: is_bold,
    is_underline: is_underline
  }
  
  const results = (await SunmiPrinter.printString(options)).results;
};

const sendBarcodeToPrinter = async (contents: string, width: number, height: number) => {
  const options = {
    barcode : contents,
    width: width,
    height: height
  }
  
  const results = (await SunmiPrinter.printBarcode(options)).results;
};

const sendCommandToPrinter = async (command: string) => {
  const options = {
    command : command
  }
  const results = (await SunmiPrinter.printCommand(options)).results;
};

const openCashRegister = async () => {
  const results = (await SunmiPrinter.openCashRegister()).results;
};