import React from 'react';
import { IonItem, IonIcon, IonLabel, IonRippleEffect } from '@ionic/react';

import { ButtonProps } from './types';
import './Button.scss';

export class Button extends React.PureComponent<ButtonProps> {

  render() {
    const {
      title,
      cls,
      onClickButton
    } = this.props;

    return (
      <div className={cls + " ion-activatable but-parent but-ripple-parent"} onClick={() => onClickButton()}>
        <div>
          <IonLabel>{title}</IonLabel>
        </div>
        <IonRippleEffect type="unbounded"></IonRippleEffect>  
      </div>
    );
  }
};

export default Button;
