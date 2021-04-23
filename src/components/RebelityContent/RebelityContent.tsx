import React from 'react';
import { IonContent, IonLoading } from '@ionic/react';

import RebelityHeader from '../RebelityHeader/RebelityHeader';
import { ErrorModal } from '../ErrorState/ErrorState';
import { AlertModal } from '../AlertState/AlertState';

import { RebelityContentProps } from './types';
import './RebelityContent.scss';

export class RebelityContent extends React.PureComponent<RebelityContentProps> {

  render() {
    const {
      isFetching,
      cls,
      message,
      children,
    } = this.props;

    console.log("rebeility-content");

    return (
      <IonContent class="rebeility-content" fullscreen scrollY={false}>
        <IonLoading
          cssClass={cls == undefined ? '' : cls}
          isOpen={isFetching}
          message={message == undefined ? 'Please Wait...' : message}
        />
        <RebelityHeader/>
        {children}
      </IonContent>
    );
  }
};

export default RebelityContent;
