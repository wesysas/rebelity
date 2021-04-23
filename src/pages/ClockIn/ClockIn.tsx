import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import { IonContent, IonPage, IonLoading } from '@ionic/react';

import { IGlobalState } from '../../data/coreTypes';
import { ErrorModal } from '../../components/ErrorState/ErrorState';
import { AlertModal } from '../../components/AlertState/AlertState';
import { ClockScreenProps, ClockScreenFromData } from './types';
import { pinInUser } from './actions';
import './ClockIn.scss';

const ClockIn: React.FC<ClockScreenProps> = ({pinInUser, isFetching, isPinedIn, history}) => {

  const [pinNumber, setPinNumber] = useState('');

  const numberClick = (number: number) => { 
    console.log(`Clicked ${number}`);

    var strPinNumber = pinNumber + "" + number;
    if (strPinNumber.length < 5) {
      setPinNumber(strPinNumber);
      if (strPinNumber.length == 4) {
        const values : ClockScreenFromData = {
          pinNumber: strPinNumber
        }

        console.log("pinnumber");
        console.log(strPinNumber);

        pinInUser(values, null, history);
        setPinNumber("");
      }
    }
    
  };

  const removeClick = () => {
    let pinLength = pinNumber.length;
    if (pinLength > 0 ) {
      var strPinNumber = pinNumber.substring(0, pinLength - 1);
      setPinNumber(strPinNumber);
    }
  };

  const clearClick = () => { 
    setPinNumber("");
  };

  let pinLength = pinNumber.length;

  
  console.log("clockin page pined in");
  console.log(isPinedIn);
  
  
  return (
    
    <IonPage id="page_check_pin">
      <IonContent>
        <IonLoading
          cssClass=''
          isOpen={isFetching}
          message={'Please wait...'}
        />
        <div className="login-background">
          <div className="login-container">
            <div className="keypadwrapper">
              <div className="inputwrapper">
                <span className={ pinLength > 0 ?"numberinput white-numberinput":"numberinput" }></span>
                <span className={ pinLength > 1 ?"numberinput white-numberinput":"numberinput" }></span>
                <span className={ pinLength > 2 ?"numberinput white-numberinput":"numberinput" }></span>
                <span className={ pinLength > 3 ?"numberinput white-numberinput":"numberinput" }></span>
              </div>
              <div className="keypad">
                <div id="lineone" className="numberline">
                  <div className="content">
                    <div onClick={(e) => numberClick(1)}>
                      <span className="number">1</span>
                    </div>
                  </div>
                  <div className="content">
                    <div onClick={(e) => numberClick(2)}>
                        <span className="number">2</span>
                    </div>
                  </div>
                  <div className="content">
                    <div onClick={(e) => numberClick(3)}>
                      <span className="number">3</span>
                    </div>
                  </div>
                </div>
                <div id="linetwo" className="numberline">
                  <div className="content">
                    <div onClick={(e) => numberClick(4)}>
                      <span className="number">4</span>
                    </div>
                  </div>
                  <div className="content">
                    <div onClick={(e) => numberClick(5)}>
                      <span className="number">5</span>
                    </div>
                  </div>
                  <div className="content">
                    <div onClick={(e) => numberClick(6)}>
                      <span className="number">6</span>
                    </div>
                  </div>
                </div>
                <div id="linethree" className="numberline">
                  <div className="content">
                    <div onClick={(e) => numberClick(7)}>
                      <span className="number">7</span>
                    </div>
                  </div>
                  <div className="content">
                    <div onClick={(e) => numberClick(8)}>
                      <span className="number">8</span>
                    </div>
                  </div>
                  <div className="content">
                    <div onClick={(e) => numberClick(9)}>
                      <span className="number">9</span>
                    </div>
                  </div>
                </div>
                <div id="linefour" className="numberline">
                  <div className="content">
                    <div onClick={(e) => removeClick()}>
                      <span className="number">&lt;</span>
                    </div>
                  </div>
                  <div className="content">
                    <div onClick={(e) => numberClick(0)}>
                      <span className="number">0</span>
                    </div>
                  </div>
                  <div className="content">
                    <div onClick={(e) => clearClick()}>
                      <span className="number">x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <img src="assets/img/appicon.svg" alt="Ionic logo" /> */}
        </div>
        {/* <ErrorModal/>
        <AlertModal/> */}
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.ClockInState.isFetching,
  isPinedIn: state.ClockInState.isPinedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  pinInUser: (data: ClockScreenFromData, setErrors: any, navigation: any) =>
    dispatch(pinInUser(data, setErrors, navigation) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(ClockIn);

