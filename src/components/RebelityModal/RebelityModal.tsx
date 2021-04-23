import React from 'react';
import { IonModal } from '@ionic/react';

import { RebelityModalProps } from './types';
import './RebelityModal.scss';

export class RebelityModal extends React.PureComponent<RebelityModalProps> {

  render() {
    const {
      visible,
      heightContent,
      onRequestClose,
      children,
    } = this.props;

    return (
      visible && (
        <div className="modal-overlay">
          <IonModal isOpen={visible} 
            onDidDismiss={onRequestClose}
            cssClass='error-modal'>
            {children}
          </IonModal>
        </div>
      )
    );
  }
};

export default RebelityModal;
