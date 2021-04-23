import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonLoading, IonGrid, IonRow, IonCol, IonIcon, IonInput, IonText, IonButton } from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

import Button from '../../../components/Button/Button';
import { IGlobalState, PAYMENT_TYPE_NONE } from '../../../data/coreTypes';
import { 
  CardSaleProps,
} from './types';

import { 
  Order,
} from '../types';

import {
  setPaymentType,
  proceedCard,
  cancelTerminalPayment,
  setCustomerTip
} from '../actions';

import { getTip } from '../../../utils/customer-screen';

import './CardSale.scss';
import { openAlert } from '../../AlertModal/actions';

const tipPercents = [0, 5, 10, 15, 20, 25, 30];

class CardSale extends React.PureComponent<CardSaleProps> {
  state = {
    "customTip": "",
    "tipPercent": 0,
  };

  componentDidMount() {
    if (this.props.userTippingEnabled) {
      getTip(this.props.enableUserTouch).then((res: any) => {
        if (res.tip < 0) {
          openAlert({
            title: "Customer screen",
            text: "Connection failed"
          })
        } else {
          if (res.type === 'amount') {
            this.onChangeTip(res.tip);
          } else {
            this.onClickTipPercent(res.tip);
          }
        }
      })
      .catch((err: any) => {
        openAlert({
          title: "Customer screen",
          text: "Unknown error"
        })
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    // Typical usage (don't forget to compare props):
    // if (this.props.readers !== prevProps.readers) {
    //   this.setState({cur_reader_id: this.props.readers[0].id});
    // }
  }

  onClickTipPercent = (percent: number) => {
    console.log("percent");
    console.log(percent);
    percent = percent == undefined ? 0 : percent;
    console.log(percent);

    const { order } = this.props;
    const tip = (order.price + order.cardFee + order.tax) * percent / 100;
    this.props.setCustomerTip(tip);

    this.setState({tipPercent: percent});
  };

  renderTipPercents = () => {
    return tipPercents
    .map(a => (
      <Button key={a} cls="btn-amount" title={a == 0 ? "None" : a + "%"} onClickButton={() => this.onClickTipPercent(a)}/>
    ));
  }

  payAmount = () => {
    const {
      order
    } = this.props;

    // const {
    //   customTip, tipPercent
    // } = this.state;

    // var tip = 0;
    // if (customTip != "") {
    //   tip = parseFloat(customTip);
    // } else {
    //   tip = order.payAmount * tipPercent / 100;
    //   tip = parseFloat(tip.toFixed(2));
    // }

    this.props.proceedCard(order);
  };

  onChangeTip = (customTip: string) => {
    const tip = parseFloat(customTip);
    this.props.setCustomerTip(tip);

    this.setState({customTip: customTip});
  }

  onClickClearTip = () => {
    const tip = 0;
    this.props.setCustomerTip(tip);

    this.setState({customTip: "", tipPercent: 0});
  }

  onClickCancelPayment = () => {
    const { isPaymentProcessing, isSaling } = this.props;
    if (isPaymentProcessing) {
      if (!isSaling) {
        this.props.cancelTerminalPayment();
      }
    } else {
      this.props.setPaymentType(PAYMENT_TYPE_NONE);
    }
  }

  render() {
    const {
      order, isSaling, isPaymentProcessing
    } = this.props;

    const {
      customTip, tipPercent
    } = this.state;

    var amount: number = order.payAmount;
    var tipStatus: string = "None";
    if (customTip != "") {
      tipStatus = "Custom";

    //  amount = order.payAmount + parseFloat(customTip);
    } else {
      tipStatus = tipPercent == 0 ? "None" : tipPercent + "%";
    //  amount = order.payAmount + order.payAmount * tipPercent / 100;
    }

    return (
      <div className="card-sale">
        <div className="calc-board">
          <div id="ticket">
            <h1>Total: <b>${order.payAmount.toFixed(2)}</b></h1>
            <div>
                <h4>Tip: <span>{tipStatus}</span> </h4>
            </div>
          </div>
          <div className="amount-buttons">
            {this.renderTipPercents()}
          </div>
          <div className="pay-container">
              <div className="">
                <IonInput name="tipAmount" type="number" class="amount-input" value={customTip} placeholder="Enter Custom Tip" spellCheck={false} autocapitalize="off" onIonChange={e => this.onChangeTip(e.detail.value!)} required></IonInput>
              </div>
              <div className="pay-buttons">
                <Button cls={isSaling && isPaymentProcessing ? "pay-btn btn-cancel disabled" : "pay-btn btn-cancel"} title="Cancel" onClickButton={() => this.onClickCancelPayment()}/>
                <Button cls="pay-btn btn-clear" title="Clear" onClickButton={() => this.onClickClearTip()}/>
                <Button cls="pay-btn btn-continue" title={amount == 0 ? "Continue": "PAY $" + amount.toFixed(2)} onClickButton={() => this.payAmount()}/>
              </div>
            </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  order: state.PosState.order,
  isPaymentProcessing: state.PosState.isPaymentProcessing,
  isSaling: state.PosState.isSaling,
  userTippingEnabled: state.SettingState.customerScreenOption.enableUserTipping,
  enableUserTouch: state.SettingState.customerScreenOption.enableUserTouchScreen
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPaymentType: (type: string) => dispatch(setPaymentType(type) as any),
  proceedCard: (order: Order) => dispatch(proceedCard(order) as any),
  cancelTerminalPayment: () => dispatch(cancelTerminalPayment() as any),
  setCustomerTip: (tip: number) => dispatch(setCustomerTip(tip) as any),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardSale);
