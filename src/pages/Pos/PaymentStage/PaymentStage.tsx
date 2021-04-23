import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonLoading, IonGrid, IonRow, IonCol, IonIcon, IonInput, IonText, IonButton } from '@ionic/react';
import { checkmarkCircle, closeCircle, checkmark } from 'ionicons/icons';

import Button from '../../../components/Button/Button';
import IconButton from '../../../components/IconButton/IconButton';
import { IGlobalState, PAYMENT_TYPE_NONE, PAYMENT_STATUS_SUCCESS, PAYMENT_TYPE_CASH, PAYMENT_TYPE_CARD, PAYMENT_TYPE_CARD_AUTHORIZE, RECEIPT_STATUS_SUCCESS } from '../../../data/coreTypes';
import { 
  PaymentStageProps
} from './types';

import { 
  Order,
} from '../types';

import {
  setPaymentType,
  paymentDone,
  sendReceiptData,
  proceedCash,
  proceedCard,
  authorizeCard,
  printReceiptData
} from '../actions'

import './PaymentStage.scss';

class PaymentStage extends React.PureComponent<PaymentStageProps> {
  state = {
    "receiptSubmitted": false,
    "emailInputError": false,
    "receiptEmail": "",
    "phoneInputError": false,
    "receiptPhone": "",
    "receiptDeliveryType": 0, //1->email, 2->phone, 3->print, 0->none
  };

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps: any) {
    // Typical usage (don't forget to compare props):
    // if (this.props.readers !== prevProps.readers) {
    //   this.setState({cur_reader_id: this.props.readers[0].id});
    // }
  }

  onClickCashAmount = (amount: number) => {
    
  };

  onClickCashOut = (amount: number) => {
    
  };

  payAmount = () => {
    
  };

  onChangeEmail = (email: string) => {
    this.setState({receiptEmail: email});
  }

  onChangePhone = (phone: string) => {
    this.setState({receiptPhone: phone});
  }

  onClickPrint = () => {
    this.setState({receiptDeliveryType: 3});
    const { receiptData } = this.props;

    this.props.printReceiptData(receiptData);
  }

  onClickEmail = () => {
    this.setState({receiptDeliveryType: 1});
  }

  onClickText = () => {
    this.setState({receiptDeliveryType: 2});
  }

  onClickNoReceipt = () => {
    this.setState({receiptDeliveryType: 0});
    this.props.paymentDone();
  }

  onClickSend = () => {
    const {
      receiptEmail, receiptPhone, receiptDeliveryType
    } = this.state;

    const { receiptData } = this.props;

    var validated = false;
    if (receiptDeliveryType == 1) {
      validated = this.validationEmail(receiptEmail);
      this.setState({receiptSubmitted: true, emailInputError: !validated});
    } else {
      console.log(receiptPhone);
      //const validated = receiptPhone.startsWith("+");
      validated = this.validationPhone(receiptPhone);
      this.setState({receiptSubmitted: true, phoneInputError: !validated});
    }

    if (validated) {
      this.props.sendReceiptData(receiptData.SaleId, receiptDeliveryType, receiptEmail, receiptPhone);
    }
  }

  validationEmail = (email: string) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return true;
    }

    return false;
  }

  validationPhone = (phone: string) => {
    if (/^[0-9]{10}$/.test(phone)) {
      return true;
    }
    
    return false;
  }

  onClickDone = () => {
    this.props.paymentDone();
  }

  onClickRetryPayment = () => {
    const { order, paymentType } = this.props;
    if (paymentType == PAYMENT_TYPE_CARD) {
      this.props.proceedCard(order);
    } else if (paymentType == PAYMENT_TYPE_CASH) {
      this.props.proceedCash(order);
    } else {
      this.props.authorizeCard(order);
    }
  }

  onClickCancelPayment = () => {
    this.props.setPaymentType(PAYMENT_TYPE_NONE);
  }

  render() {
    const {
      order,
      paymentStatus,
      isSendingReceipt,
      receiptStatus,
      paymentType
    } = this.props;

    const {
      receiptSubmitted, emailInputError, receiptEmail, phoneInputError, receiptPhone, receiptDeliveryType
    } = this.state;

    return (
      <div className="payment-stage">
        {
          paymentStatus == PAYMENT_STATUS_SUCCESS ? (
            <div className="payment-success">
              <div className="success">
                <IonIcon icon={checkmarkCircle}/>
                <div>{paymentType == PAYMENT_TYPE_CARD_AUTHORIZE ? "Card Authorization succeeded" : "Payment Transaction succeeded."}</div>
              </div>
              <div className="purchase-receipt">
                <h3>Purchaser Receipt</h3>
                <div className="receipt-buttons">
                  <Button cls="receipt-but" title="Print" onClickButton={() => this.onClickPrint()}/>
                  <Button cls="receipt-but" title="Email" onClickButton={() => this.onClickEmail()}/>
                  <Button cls="receipt-but" title="Text" onClickButton={() => this.onClickText()}/>
                  <Button cls="receipt-but" title="No Receipt" onClickButton={() => this.onClickNoReceipt()}/>
                </div>
                {
                  isSendingReceipt ? (
                    <div className="payment-processing">
                          <img src="assets/gif/processing2.gif" alt="Processing" />
                          <div><h3>Sending Receipt</h3></div>
                        </div>
                  ) : (
                    <div></div>
                  )
                }
                {
                  receiptDeliveryType == 1 ? (
                    <div className="">
                      <IonInput name="receiptEmail" type="email" class="receipt-input" value={receiptEmail} placeholder="Enter Email" spellCheck={false} autocapitalize="off" onIonChange={e => this.onChangeEmail(e.detail.value!)} required></IonInput>
                      {receiptSubmitted && emailInputError && <IonText color="danger">
                        <p className="ion-padding-start">
                          Email is required
                        </p>
                      </IonText>}
                      <div className="receipt-buttons">
                        <Button cls="receipt-but" title="Send" onClickButton={() => this.onClickSend()}/>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )
                }
                {
                  receiptDeliveryType == 2 ? (
                    <div className="">
                      <IonInput name="receiptPhone" type="number" class="receipt-input" value={receiptPhone} placeholder="7345346743" spellCheck={false} autocapitalize="off" onIonChange={e => this.onChangePhone(e.detail.value!)} required></IonInput>
                      {receiptSubmitted && phoneInputError && <IonText color="danger">
                        <p className="ion-padding-start">
                          Phone is required
                        </p>
                      </IonText>}
                      <div className="receipt-buttons">
                        <Button cls="receipt-but" title="Send" onClickButton={() => this.onClickSend()}/>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )
                }
                {
                  receiptStatus == RECEIPT_STATUS_SUCCESS ? (
                    <div className="receipt-buttons">
                      <IconButton icon={checkmark} cls="receipt-but done-but" title="Done" onClickButton={() => this.onClickDone()}/>
                    </div>
                  ) : (
                    <div></div>
                  )
                }
              </div>
            </div>
          ) : (
            <div className="payment-failed">
              <div className="failed">
                <IonIcon icon={closeCircle}/>
                <div>{paymentType == PAYMENT_TYPE_CARD_AUTHORIZE ? "Card Authorization failed" : "Payment Transaction failed."}</div>
              </div>
              <div className="receipt-buttons">
                  <Button cls="receipt-but retry" title={paymentType == PAYMENT_TYPE_CARD_AUTHORIZE ? "Retry Authorization" : "Retry Payment"} onClickButton={() => this.onClickRetryPayment()}/>
                  <Button cls="receipt-but cancel" title={paymentType == PAYMENT_TYPE_CARD_AUTHORIZE ? "Cancel Authorization" : "Cancel Payment"} onClickButton={() => this.onClickCancelPayment()}/>
                </div>
            </div>
          )
        }
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  order: state.PosState.order,
  paymentStatus: state.PosState.paymentStatus,
  paymentType: state.PosState.paymentType,
  receiptData: state.PosState.receiptData,
  isSendingReceipt: state.PosState.isSendingReceipt,
  receiptStatus: state.PosState.receiptStatus
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPaymentType: (type: string) => dispatch(setPaymentType(type) as any),
  paymentDone: () => dispatch(paymentDone() as any),
  sendReceiptData: (saleId: string, deliveryType: number, email: string, phone: string) => dispatch(sendReceiptData(saleId, deliveryType, email, phone) as any),
  proceedCard: (order: Order) => dispatch(proceedCard(order) as any),
  proceedCash: (order: Order) => dispatch(proceedCash(order) as any),
  printReceiptData: (receiptData: any) => dispatch(printReceiptData(receiptData) as any),
  authorizeCard: (order: Order) => dispatch(authorizeCard(order) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStage);
