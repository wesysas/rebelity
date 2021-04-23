import React from 'react';
import { IonItem, IonGrid, IonRow, IonCol, IonButton, IonIcon} from '@ionic/react';
import { remove, add } from 'ionicons/icons';

import { LineitemRowProps } from './types';
import './LineitemRow.scss';

export class LineitemRow extends React.PureComponent<LineitemRowProps> {

  render() {
    const {
      lineitem,
      onClickIncrease,
      onClickDecrease,
      onClickOptionIncrease,
      onClickOptionDecrease
    } = this.props;

    return (
      <IonItem class="order-list-row" lines="full">
        <IonGrid>
          <IonRow class="lineitem-row">
            <IonCol size="4"> {lineitem.name}
            </IonCol>
            <IonCol size="2">{lineitem.cost}
            </IonCol>
            <IonCol size="3">
              <div className="qnt-col">
                <IonButton size="small" class="qnt-button" onClick={() => onClickDecrease(lineitem.productId, lineitem.variantId)}>
                  <IonIcon slot="icon-only" icon={remove} />
                </IonButton>
                <span>{lineitem.quantity}</span>
                <IonButton size="small" class="qnt-button" onClick={() => onClickIncrease(lineitem.productId, lineitem.variantId)}>
                  <IonIcon slot="icon-only" icon={add} />
                </IonButton>
              </div>
            </IonCol>
            <IonCol size="3" class="total-col">{(lineitem.cost * lineitem.quantity).toFixed(2)}
            </IonCol>
          </IonRow>
          {
          lineitem.options
          .map(option => (
            <IonRow key={option.optionId} class="lineitem-option-row">
              <IonCol size="4"> Extra {option.name}
              </IonCol>
              <IonCol size="2">{option.cost == 0 ? "" : option.cost}
              </IonCol>
              <IonCol size="3">
                <div className="qnt-col">
                  <IonButton size="small" class="qnt-button" onClick={() => onClickOptionDecrease(lineitem.productId, lineitem.variantId, option.optionId)}>
                    <IonIcon slot="icon-only" icon={remove} />
                  </IonButton>
                  <span>{option.quantity}</span>
                  <IonButton size="small" class="qnt-button" onClick={() => onClickOptionIncrease(lineitem.productId, lineitem.variantId, option.optionId)}>
                    <IonIcon slot="icon-only" icon={add} />
                  </IonButton>
                </div>
              </IonCol>
              <IonCol size="3" class="total-col">{option.cost == 0 ? "" : (option.cost * option.quantity).toFixed(2)}
              </IonCol>
            </IonRow>
          ))
        }
        </IonGrid>
      </IonItem>
    );
  }
};

export default LineitemRow;
