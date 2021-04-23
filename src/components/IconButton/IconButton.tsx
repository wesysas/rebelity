import React from 'react';
import { IonIcon, IonLabel, IonRippleEffect } from '@ionic/react';

import { IconButtonProps } from './types';
import './IconButton.scss';

export class IconButton extends React.PureComponent<IconButtonProps> {

  render() {
    const {
      icon,
      title,
      cls,
      onClickButton
    } = this.props;

    return (
      <div className={cls + " icon-but ion-activatable but-parent but-ripple-parent"} onClick={() => onClickButton()}>
        <div>
          <IonLabel>{title}</IonLabel>
          <IonIcon icon={icon} />
        </div>
        <IonRippleEffect type="unbounded"></IonRippleEffect>  
      </div>
    );
  }
};

export default IconButton;
