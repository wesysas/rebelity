import React from 'react';
import { IonIcon, IonRippleEffect, IonCol } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';

import { ProductItemProps } from './types';
import './ProductItem.scss';

export class ProductItem extends React.PureComponent<ProductItemProps> {

  render() {
    const {
      product,
      curProdId,
      asVariant,
      onClickItem
    } = this.props;

    return (
      <IonCol size="4" sizeLg="4" sizeMd="6" sizeSm="12" sizeXl="3" sizeXs="12" class={asVariant ? "product-item as-variant" : "product-item"}>
        <div className="item ion-activatable button ripple-parent" onClick={() => onClickItem(product.ProductId)}>
          <div className="item_img center_img">
              <img src={product.Picture} className="crop_img"/>
          </div>
          <div className="text_box">
            <h2>{product.Name}</h2>
            <h3>${product.Price}</h3>
          </div>
          <div className="option d-flex">
          {
            curProdId == product.ProductId ? (
              <IonIcon slot="icon-only" icon={checkmarkCircleOutline} />
            ) : (
              <div></div>
            )
          }
          {
            product.Variations.length > 0 ? 
            (   
              <h5 className="mr-0 ml-auto">{product.Variations.length}</h5>
            ) : (<div></div>)
          }
          </div>
          <IonRippleEffect type="unbounded"></IonRippleEffect>
        </div>
      </IonCol>
    );
  }
};

export default ProductItem;
