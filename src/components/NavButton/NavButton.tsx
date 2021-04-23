import React from 'react';
import { IonItem, IonIcon, IonLabel, IonRippleEffect } from '@ionic/react';

import { NavButtonProps } from './types';
import './NavButton.scss';

export class NavButton extends React.PureComponent<NavButtonProps> {

  render() {
    const {
      path,
      icon,
      title,
      cls,
      onClickButton
    } = this.props;

    return (
      <IonItem className={cls + " ion-activatable button ripple-parent"} lines="none" mode="md" routerLink={path} routerDirection="none" onClick={() => onClickButton()}>
        <div>
          <IonIcon icon={icon} />
          <IonLabel>{title}</IonLabel>
        </div>
        <IonRippleEffect type="unbounded"></IonRippleEffect>  
      </IonItem>
    );
  }
};

export default NavButton;
