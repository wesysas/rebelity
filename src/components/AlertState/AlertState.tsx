import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IonButton } from '@ionic/react';

import { IGlobalState } from '../../data/coreTypes';
import { closeAlert } from '../../pages/AlertModal/actions';
import { RebelityModal } from '../RebelityModal/RebelityModal';
import { AlertStateProps } from './types';
import './AlertState.scss';

const mapStateToProps = (state: IGlobalState) => ({
  isAlertShown: state.AlertState.isAlertShown,
  title: state.AlertState.title,
  text: state.AlertState.text,
  onPress: state.AlertState.onPress,
  isConfirm: state.AlertState.isConfirm
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeAlert: () => dispatch(closeAlert())
});

export class Component extends React.PureComponent<AlertStateProps> {

  onClickPress = () => {
    const {
      closeAlert,
      onPress
    } = this.props;

    onPress();
    closeAlert();
  }

  render() {
    const {
      closeAlert,
      isAlertShown,
      title,
      text,
      onPress,
      isConfirm
    } = this.props;

    console.log(isConfirm);
    console.log("isAlertShown");
    console.log(isAlertShown);
    return (
      <RebelityModal
        visible = {isAlertShown}
        onRequestClose={() => closeAlert()}
        heightContent={1000}>
        <div className="alert-modal">
          <div>
            <img src="assets/img/errorStates/unknown.png" alt="Alert" /> 
          </div>
          <div>
            <h2 className="text-white">{title}</h2>
            <h4 className="text-white">{text}</h4>
          </div>
          {
            isConfirm == undefined || isConfirm == false ? (
              <IonButton expand="full" class="modal-bottom-btn" color="primary" onClick={() => closeAlert()}>OK</IonButton>    
            ) : (
              <div className="modal-button-bar">
                <IonButton class="modal-confirm-btn" color="primary" onClick={() => closeAlert()}>No</IonButton>
                <IonButton class="modal-confirm-btn" color="danger" onClick={() => this.onClickPress()}>Yes</IonButton>
              </div>
            )
          }
        </div>
      </RebelityModal>
    );
  }
};

export const AlertModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
