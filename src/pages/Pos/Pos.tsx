import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonPage, IonGrid, IonRow, IonCol, IonRippleEffect, IonList, IonListHeader, IonText } from '@ionic/react';

import RebelityContent from '../../components/RebelityContent/RebelityContent';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
import ProductItem from '../../components/ProductItem/ProductItem';
import VariationItem from '../../components/VariationItem/VariationItem';
import OptionItem from '../../components/OptionItem/OptionItem';
import LineitemRow from '../../components/LineitemRow/LineitemRow';
import SearchBox from '../../components/SearchBox/SearchBox';
import Button from '../../components/Button/Button';

import { 
  IGlobalState,
  PAYMENT_TYPE_CASH,
  PAYMENT_TYPE_CARD,
  PAYMENT_TYPE_CARD_AUTHORIZE,
  PAYMENT_TYPE_NONE,
  PAYMENT_STATUS_NONE,
  STATION_MODE_BAR
} from '../../data/coreTypes';

import { PosScreenProps, Order } from './types';

import { 
  getProdCategories, 
  selectProdCategory, 
  searchProduct, 
  selectProduct, 
  selectVariation, 
  addOption, 
  cancelProduct, 
  doneProduct,
  increaseLineitem,
  decreaseLineitem,
  increaseOption,
  decreaseOption,
  clearOrder,
  setPaymentType,
  openCashDrawer,
  cancelTerminalPayment,
  authorizeCard
} from './actions';

import { getProductById, getProducts } from '../../data/selectors';
import { Option } from '../../models/Pos';
import CashSale from './CashSale/CashSale';
import CardSale from './CardSale/CardSale';
import PaymentStage from './PaymentStage/PaymentStage';

import './Pos.scss';

const Pos: React.FC<PosScreenProps> = ({
  prodCategories, products, searchName, curProdId, curProd, curVariationId, curLineitemOptions, order, 
  paymentType, isPaymentProcessing, paymentStatus, isSaling, stationModeId, isWaitingCard,
  getProdCategories, selectProdCategory, searchProduct, selectProduct, selectVariation, addOption, cancelProduct, doneProduct,
  increaseLineitem, decreaseLineitem, increaseOption, decreaseOption, clearOrder, setPaymentType, openCashDrawer, cancelTerminalPayment, authorizeCard}) => {

  useEffect(() => {
    clearOrder();
    getProdCategories();
  }, []);

  const [keyword, setKeyword] = useState('');
  const [variantError, setVariantError] = useState(false);

  const renderProdCategories = () => {
    return prodCategories
      .map(c => (
        <CategoryItem key={c.categoryId} category = {c} onClickItem = {onClickCategory} />
      ));
  }

  const renderProducts = () => {
    return products
      .map(p => (
        <ProductItem key={p.ProductId} product = {p} curProdId = {curProdId} onClickItem = {onClickProduct} asVariant={false}/>
      ));
  }

  const renderVariantions = () => {
    var withOptions = curProd?.Options.length != 0;
    return curProd?.Variations
      .map(v => (
        <VariationItem key={v.VariationId} variation = {v} curVariationId = {curVariationId} onClickItem = {onClickVariation} picture={curProd.Picture} withOptions={withOptions} />
      ));
  }

  const renderOptions = () => {
    console.log("cur lineitem options");
    console.log(curLineitemOptions);

    return curProd?.Options
      .map(o => (
        <OptionItem key={o.OptionId} option = {o} curLineitemOptions={curLineitemOptions} onClickItem = {onClickOption} />
      ));
  }

  const renderLineitems = () => {
    return order.lineitems
      .map(lineitem => (
        <LineitemRow key={lineitem.productId + " - " + lineitem.variantId} lineitem={lineitem} onClickIncrease = {onClickIncrease} onClickDecrease = {onClickDecrease} onClickOptionIncrease = {onClickOptionIncrease} onClickOptionDecrease = {onClickOptionDecrease}/>
      ));
  }

  const onClickCategory = (categoryId: number) => { 
    selectProdCategory(categoryId);
  };

  const onClickProduct = (productId: number) => { 
    setVariantError(false);
    selectProduct(productId);
  };

  const onClickVariation = (variationId: number) => { 
    setVariantError(false);
    selectVariation(variationId);
  };

  const onClickOption = (optionId: number) => { 
    if (curProd != null) {
      if (curProd?.Variations.length > 0 && curVariationId == 0 ) {
        setVariantError(true);
      } else {
        setVariantError(false);
        
        var options = curProd?.Options.filter(function( o ) {
          return o.OptionId == optionId;
        });
    
        console.log("option");
        console.log(options[0]);
        addOption(options[0]);
      }
    }
  };

  const onChangeSearch = (value: string) => { 
    console.log("clicked search");
    setKeyword(value);
    if (value.length > 1) {
      searchProduct(value);
    } else {
      searchProduct("");
    }
  };

  const onClickSearch = () => { 
    console.log("clicked search");
    console.log(keyword);

    searchProduct(keyword);
  };

  const onClickClearSearch = () => { 
    console.log("clicked clear search");
    setKeyword("");
    searchProduct("");
  };

  const onClickCancel = () => { 
    console.log("clicked cancel");
    
    if (curProd != null) {
      if (curProd?.Variations.length > 0 && curVariationId == 0 ) {
        //setVariantError(true);
        doneProduct();
      } else {
        ///setVariantError(false);
        cancelProduct();
      }
    }
  };

  const onClickDone = () => { 
    doneProduct();
  };

  const onClickIncrease = (productId: number, variantId: number) => { 
    increaseLineitem(productId, variantId);
  };

  const onClickDecrease = (productId: number, variantId: number) => { 
    decreaseLineitem(productId, variantId);
  };

  const onClickOptionIncrease = (productId: number, variantId: number, optionId: number) => { 
    increaseOption(productId, variantId, optionId);
  };

  const onClickOptionDecrease = (productId: number, variantId: number, optionId: number) => { 
    decreaseOption(productId, variantId, optionId);
  };

  const onClickClear = () => { 
    clearOrder()
  };

  const onClickOpenDrawer = () => { 
    openCashDrawer();
  };

  const onClickCashSale = () => { 
    if (order.lineitems.length > 0) {
      setPaymentType(PAYMENT_TYPE_CASH);
    }
  };

  const onClickCardSale = () => { 
    if (order.lineitems.length > 0) {
      if (stationModeId == STATION_MODE_BAR) {
        authorizeCard(order);
      } else {
        setPaymentType(PAYMENT_TYPE_CARD);
      }
    }
  };

  const onClickCancelWaitingCard = () => {
    cancelTerminalPayment();
  }

  const onClickCancelPayment = () => {
    if (isPaymentProcessing) {
      if (!isSaling) {
        cancelTerminalPayment();
      }
    } else {
      setPaymentType(PAYMENT_TYPE_NONE);
    }
  }

  const renderPayment=(payment_type:any)=>{
    var element = null;
    
    if (payment_type == PAYMENT_TYPE_CASH) {
      element = <CashSale/>
    } else if (paymentType == PAYMENT_TYPE_CARD) {
      element = <CardSale/>
    } else {
      element = <div></div>
    }
    return element;
  }

  return (
    <IonPage>
      <RebelityContent
        isFetching={false}>
        <div className="pos-container">
          <IonGrid class="pos-root-grid">
            <IonRow class="pos-container-row">
              <IonCol size="4" sizeMd="4" sizeSm="12" sizeXs="12" class="order-container">
                <div className="order-container-header">
                  <div className="nav-order">
                    <span>Order</span>
                  </div>
                  <div>
                    <div className="nav-open-drawer ion-activatable button ripple-parent" onClick={() => onClickOpenDrawer()}>
                      <span>Open Drawer</span>
                      <IonRippleEffect type="unbounded"></IonRippleEffect>
                    </div>
                    <div className="nav-clear ion-activatable button ripple-parent" onClick={() => onClickClear()}>
                      <span>Clear</span>
                      <IonRippleEffect type="unbounded"></IonRippleEffect>
                    </div>
                  </div>
                </div>
                <div className="order-cart-container">
                  <IonList mode="md">
                    <IonListHeader class="list-header" mode="md">
                      <IonGrid>
                        <IonRow>
                          <IonCol size="4"> Item
                          </IonCol>
                          <IonCol size="2">Price
                          </IonCol>
                          <IonCol size="3">Qnt
                          </IonCol>
                          <IonCol size="3">Total($)
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonListHeader>
                    {
                      renderLineitems()
                    }
                  </IonList>
                  <div className="order-cart-bottom">
                    <div className="total-container">
                      <IonGrid>
                        <IonRow>
                          <IonCol size="3" offset="6"> Sub total
                          </IonCol>
                          <IonCol size="3">{order.price.toFixed(2)}
                          </IonCol>
                        </IonRow>
                        {
                          order.cardFee == 0 ? (
                            <div></div>
                          ) : (
                            <IonRow>
                              <IonCol size="3" offset="6"> Card Fee
                              </IonCol>
                              <IonCol size="3">{order.cardFee.toFixed(2)}
                              </IonCol>
                            </IonRow>
                          )
                        }
                        <IonRow>
                          <IonCol size="3" offset="6"> Tax
                          </IonCol>
                          <IonCol size="3">{order.tax.toFixed(2)}
                          </IonCol>
                        </IonRow>
                        {
                          order.tip == 0 ? (
                            <div></div>
                          ) : (
                            <IonRow>
                              <IonCol size="3" offset="6"> Tip
                              </IonCol>
                              <IonCol size="3">{order.tip.toFixed(2)}
                              </IonCol>
                            </IonRow>
                          )
                        }
                      </IonGrid>
                    </div>
                    <div className="total-pay-container">
                      <IonGrid>
                        <IonRow>
                          <IonCol size="5" offset="4"> Amount to Pay
                          </IonCol>
                          <IonCol size="3">{order.payAmount.toFixed(2)}
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </div>
                    <div className="sale-button-container">
                      <div className="cash-sale-button ion-activatable button ripple-parent" color="primary" onClick={() => onClickCashSale()}>
                        <span>Cash Sale</span>
                        <IonRippleEffect type="unbounded"></IonRippleEffect>
                      </div>
                      <div className="card-sale-button ion-activatable button ripple-parent" color="primary" onClick={() => onClickCardSale()}>
                        <span>Card Sale</span>
                        <IonRippleEffect type="unbounded"></IonRippleEffect>
                      </div>
                    </div>
                  </div>
                </div>
              </IonCol>
              <IonCol size="8" sizeMd="8" sizeSm="12" sizeXs="12" class="product-container">
                {
                  paymentType == "none" ? (
                  <div>
                    <div className="prod-category">
                      {
                        renderProdCategories()
                      }
                    </div>
                    <SearchBox keyword={keyword} onChangeSearch={(value) => onChangeSearch(value)} onClickClearSearch={() => onClickClearSearch()}/>
                    <div className="products">
                      <IonGrid>
                        <IonRow>
                          {
                            renderProducts()
                          }
                        </IonRow>
                      </IonGrid>
                      {
                        curProd == null ? (
                          <div></div>
                        ):(
                          <div>
                            {
                              curProd.Variations.length == 0 && curProd.Options.length == 0 ? (
                                <div></div>
                              ) : (
                                <div className="variant-container">
                                  <IonGrid>
                                    <IonRow>
                                      <IonCol size={curProd.Options.length == 0 ? "12" : "6"}>
                                        {
                                          curProd.Variations.length == 0 ? (
                                            <ProductItem product = {curProd} curProdId = {curProdId} onClickItem = {onClickProduct} asVariant={true} />
                                          ) : (
                                            <div>
                                              <h3 className="text-white sub-title">{curProd.Name} Variantions</h3>
                                              <IonGrid>
                                                <IonRow>
                                                  {
                                                    renderVariantions()
                                                  }
                                                </IonRow>
                                              </IonGrid>
                                            </div>
                                          )
                                        }
                                        {variantError && <IonText color="danger">
                                            <p className="ion-padding-start">
                                              Please choose a variation
                                            </p>
                                          </IonText>
                                        }
                                      </IonCol>
                                    <IonCol size={curProd.Options.length == 0 ? "0" : "6"}>
                                      {
                                        curProd.Options.length == 0 ? (
                                          <div></div>
                                        ) : (
                                          <div>
                                            <h3 className="text-white sub-title">{curProd.Name} Add-On Options</h3>
                                            <div className="product-options">
                                            {
                                              renderOptions()
                                            }
                                            </div>
                                          </div>
                                        )
                                      }
                                    </IonCol>
                                    </IonRow>
                                  </IonGrid>  
                                  <div className="bottom-buttons">
                                    <div className="cancel-button">
                                      <div className="ion-activatable button ripple-parent" color="primary" onClick={() => onClickCancel()}>
                                        <span>Cancel</span>
                                        <IonRippleEffect type="unbounded"></IonRippleEffect>
                                      </div>
                                    </div>
                                    <div className="done-button">
                                      <div className="ion-activatable button ripple-parent" color="primary" onClick={() => onClickDone()}>
                                        <span>Done</span>
                                        <IonRippleEffect type="unbounded"></IonRippleEffect>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                        )
                      }
                    </div>
                  </div>
                  ) : (
                    <div className="payment-container">
                      {
                        paymentStatus == PAYMENT_STATUS_NONE && isPaymentProcessing != true ? (
                          <div>
                            {
                              renderPayment(paymentType)                             
                            }
                          </div>
                        ) : (
                          <div></div>
                        )
                      }
                      {
                        isWaitingCard == true ? (
                          <div className="payment-processing">
                            <img src="assets/gif/processing2.gif" alt="Processing" />
                            <div>
                              <h3>Please insert, Tap or Swipe Card</h3>    
                            </div>
                            <Button cls={isSaling ? "btn-cancel disabled" : "pay-btn btn-cancel"} title="Cancel" onClickButton={() => onClickCancelWaitingCard()}/>
                          </div>
                        ) : (
                          <div>
                          </div>
                        )
                      }
                      {
                        isPaymentProcessing == true ? (
                          <div className="payment-processing">
                            <img src="assets/gif/processing2.gif" alt="Processing" />
                            <div>
                              {
                                paymentType == PAYMENT_TYPE_CARD_AUTHORIZE ? (
                                  <h3>Authorizing Card Payment</h3>    
                                ) : (
                                  <h3>Processing {paymentType == PAYMENT_TYPE_CASH ? "Cash" : "Card"} Payment</h3>
                                )
                              }
                            </div>
                            {
                              paymentType == PAYMENT_TYPE_CARD || paymentType == PAYMENT_TYPE_CARD_AUTHORIZE ? (
                                <Button cls={isSaling && isPaymentProcessing ? "btn-cancel disabled" : "pay-btn btn-cancel"} title="Cancel" onClickButton={() => onClickCancelPayment()}/>
                              ) : (
                                <div></div>
                              )
                            }
                          </div>
                        ) : (
                          <div>
                            {
                              paymentStatus == PAYMENT_STATUS_NONE ? (
                                <div></div>
                              ) : (
                                <PaymentStage/>
                              )
                            }
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </RebelityContent>
      <div>test 123</div>
    </IonPage>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.PosState.isFetching,
  isPending: state.PosState.isPending,
  prodCategories: state.PosState.prodCategories,
  products: getProducts(state),
  curProd: getProductById(state),
  curProdId: state.PosState.curProdId,
  curVariationId: state.PosState.curVariationId,
  curLineitemOptions: state.PosState.curLineitemOptions,
  searchName: state.PosState.searchName,
  order: state.PosState.order,
  paymentType: state.PosState.paymentType,
  isPaymentProcessing: state.PosState.isPaymentProcessing,
  paymentStatus: state.PosState.paymentStatus,
  isSaling: state.PosState.isSaling,
  stationModeId: state.SettingState.stationModeId,
  isWaitingCard: state.PosState.isWaitingCard
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProdCategories: () => dispatch(getProdCategories() as any),
  selectProdCategory: (categoryId: number) => dispatch(selectProdCategory(categoryId) as any),
  searchProduct: (keyword: string) => dispatch(searchProduct(keyword) as any),
  selectProduct: (productId: number) => dispatch(selectProduct(productId) as any),
  selectVariation: (variationId: number) => dispatch(selectVariation(variationId) as any),
  addOption: (option: Option) => dispatch(addOption(option) as any),
  cancelProduct: () => dispatch(cancelProduct() as any),
  doneProduct: () => dispatch(doneProduct() as any),
  increaseLineitem: (productId: number, variantId: number) => dispatch(increaseLineitem(productId, variantId) as any),
  decreaseLineitem: (productId: number, variantId: number) => dispatch(decreaseLineitem(productId, variantId) as any),
  increaseOption: (productId: number, variantId: number, optionId: number) => dispatch(increaseOption(productId, variantId, optionId) as any),
  decreaseOption: (productId: number, variantId: number, optionId: number) => dispatch(decreaseOption(productId, variantId, optionId) as any),
  clearOrder: () => dispatch(clearOrder() as any),
  setPaymentType: (type: string) => dispatch(setPaymentType(type) as any),
  openCashDrawer: () => dispatch(openCashDrawer() as any),
  cancelTerminalPayment: () => dispatch(cancelTerminalPayment() as any),
  authorizeCard: (order: Order) => dispatch(authorizeCard(order) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(Pos);
