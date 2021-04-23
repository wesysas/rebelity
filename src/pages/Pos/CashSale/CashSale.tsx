import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonLoading, IonGrid, IonRow, IonCol, IonIcon, IonInput, IonText, IonButton } from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

import Button from '../../../components/Button/Button';
import { IGlobalState, PAYMENT_TYPE_NONE } from '../../../data/coreTypes';
import { 
  CashSaleProps
} from './types';

import { 
  Order,
} from '../types';

import {
  setPaymentType,
  proceedCash
} from '../actions'

import './CashSale.scss';

const cashAmounts = [1, 2, 5, 10, 20, 50, 100];

class CashSale extends React.PureComponent<CashSaleProps> {
  state = {
    "amountSubmitted": false,
    "amountInputError": false,
    "paidAmount": ""
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
    console.log(amount);
    const { paidAmount } = this.state;
    const preAmount: number = paidAmount == "" ? 0 : +paidAmount;

    this.setState({paidAmount: amount + preAmount});
  };

  onClickCashOut = (amount: number) => {
    console.log(amount);
    this.setState({paidAmount: amount});
    
    const {
      order
    } = this.props;

    this.props.proceedCash(order);
  };

  renderAmounts = () => {
    return cashAmounts
    .map(a => (
      <Button key={a} cls="btn-amount" title={"$" + a} onClickButton={() => this.onClickCashAmount(a)}/>
    ));
  }

  payAmount = () => {
    this.setState({amountSubmitted: true});
    
    const { paidAmount } = this.state;
    if(!paidAmount) {
      this.setState({amountInputError: true});
    } else {
      this.setState({amountInputError: false});
    }
    
    if(paidAmount) {
      console.log("paidAmount");
      console.log(paidAmount);
      const {
        order
      } = this.props;
  
      this.props.proceedCash(order);
    }
  };

  onChangeAmount = (amount: string) => {
    this.setState({paidAmount: amount});
  }

  onClickClearAmount = () => {
    this.setState({paidAmount: ""});
  }

  onClickCancelPayment = () => {
    this.props.setPaymentType(PAYMENT_TYPE_NONE);
  }

  render() {
    const {
      order
    } = this.props;

    const {
      amountInputError, amountSubmitted, paidAmount
    } = this.state;

    const amount: number = paidAmount == "" ? 0 : +paidAmount;
    const payAmount = parseFloat(order.payAmount.toFixed(2));
    const changeDue = amount - payAmount < 0 ? 0 : amount - payAmount;

    return (
      <div className="cash-sale">
        <div className="calc-board">
          <div id="ticket">
            <h1>Change Due: <b>${changeDue.toFixed(2)}</b></h1>
            <div>
                <h4>Total Due <span>${payAmount}</span> </h4>
            </div>
          </div>
          <div className="amount-buttons">
            <Button cls="btn-out" title="EXACT" onClickButton={() => this.onClickCashOut(payAmount)}/>
            {this.renderAmounts()}
          </div>
          <div className="pay-container">
              <div className="">
                <IonInput name="paidAmount" type="number" class="amount-input" value={paidAmount} placeholder="Amount Paid" spellCheck={false} autocapitalize="off" onIonChange={e => this.onChangeAmount(e.detail.value!)} required></IonInput>
                {amountSubmitted && amountInputError && <IonText color="danger">
                  <p className="ion-padding-start">
                    Amount is required
                  </p>
                </IonText>}
              </div>
              <div className="pay-buttons">
                <Button cls="pay-btn btn-cancel" title="Cancel" onClickButton={() => this.onClickCancelPayment()}/>
                <Button cls="pay-btn btn-clear" title="Clear" onClickButton={() => this.onClickClearAmount()}/>
                <Button cls="pay-btn btn-continue" title="Continue" onClickButton={() => this.payAmount()}/>
              </div>
            </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  order: state.PosState.order
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPaymentType: (type: string) => dispatch(setPaymentType(type) as any),
  proceedCash: (order: Order) => dispatch(proceedCash(order) as any),
});

export default connect(mapStateToProps, mapDispatchToProps)(CashSale);
