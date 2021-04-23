import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IonButton } from '@ionic/react';

import { IGlobalState } from '../../data/coreTypes';
import { closeError } from '../../pages/ErrorModal/actions';
import { RebelityModal } from '../RebelityModal/RebelityModal';
import { ErrorStateProps } from './types';
import './ErrorState.scss';

const mapStateToProps = (state: IGlobalState) => ({
  isErrorShown: state.ErrorState.isErrorShown,
  title: state.ErrorState.title,
  text: state.ErrorState.text,
  onPress: state.ErrorState.onPress,
  buttonText: state.ErrorState.buttonText,
  imgSource: state.ErrorState.imgSource
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeError: () => dispatch(closeError())
});

export class Component extends React.PureComponent<ErrorStateProps> {

  render() {
    const {
      closeError,
      isErrorShown,
      title,
      text,
      imgSource,
      onPress,
      buttonText
    } = this.props;

    return (
      <RebelityModal
        visible = {isErrorShown}
        onRequestClose={() => closeError()}
        heightContent={1000}>
        <div className="modal">
          <div>
            <img src={imgSource} alt="Error" /> 
          </div>
          <div>
            <h2 className="text-white">{title}</h2>
            <h2 className="text-white">{text}</h2>
          </div>
          <IonButton expand="full" class="modal-bottom-btn" color="primary" onClick={() => closeError()}>{buttonText}</IonButton>
        </div>
      </RebelityModal>
    );
  }
};

export const ErrorModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
