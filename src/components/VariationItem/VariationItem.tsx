import React from 'react';
import { IonIcon, IonRippleEffect, IonCol } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';

import { VariationItemProps } from './types';
import './VariationItem.scss';

export class VariationItem extends React.PureComponent<VariationItemProps> {

  render() {
    const {
      variation,
      curVariationId,
      picture,
      withOptions,
      onClickItem
    } = this.props;

    return (
      <IonCol size="6" sizeLg={withOptions ? "12" : "6"} sizeMd="12" sizeSm="12" sizeXl={withOptions ? "6" : "4"} sizeXs="12" class="product-item">
        <div className="item ion-activatable button ripple-parent" onClick={() => onClickItem(variation.VariationId)}>
          <div className="item_img center_img">
              <img src={picture} className="crop_img"/>
          </div>
          <div className="text_box">
            <h2>{variation.Name}</h2>
            <h3>${variation.Cost}</h3>
          </div>
          <div className="option d-flex">
          {
            curVariationId == variation.VariationId ? (
              <IonIcon slot="icon-only" icon={checkmarkCircleOutline} />
            ) : (
              <div></div>
            )
          }
          </div>
          <IonRippleEffect type="unbounded"></IonRippleEffect>
        </div>
      </IonCol>
    );
  }
};

export default VariationItem;
