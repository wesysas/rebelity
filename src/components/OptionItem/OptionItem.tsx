import React from 'react';
import { IonRippleEffect} from '@ionic/react';

import { OptionItemProps } from './types';
import './OptionItem.scss';

export class OptionItem extends React.PureComponent<OptionItemProps> {

  render() {
    const {
      option,
      curLineitemOptions,
      onClickItem
    } = this.props;

    var options = curLineitemOptions.filter(function( o ) {
      return o.optionId == option.OptionId;
    });

    var quantity = options.length < 1 ? 0 : options[0].quantity;

    return (
      <div className="product-option-button ion-activatable button ripple-parent" color="primary" onClick={() => onClickItem(option.OptionId)}>
        {
          option.Cost == null ? (
            <span>{option.Name}</span>
          ) : (
            <span>{option.Name} +(${option.Cost})</span>
          )
        }
        {
          quantity == 0 ? (
            <div></div>
          ) : (
          <h5 className="mr-0 ml-auto">{quantity}</h5>
          )
        }
        <IonRippleEffect type="unbounded"></IonRippleEffect>
      </div>
    );
  }
};

export default OptionItem;
