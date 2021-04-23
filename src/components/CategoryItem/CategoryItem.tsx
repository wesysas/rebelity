import React from 'react';
import { IonRippleEffect } from '@ionic/react';

import { CategoryItemProps } from './types';
import './CategoryItem.scss';

export class CategoryItem extends React.PureComponent<CategoryItemProps> {

  render() {
    const {
      category,
      onClickItem
    } = this.props;

    return (
      <div className={category.selected ? "item active ion-activatable button ripple-parent" : "item ion-activatable button ripple-parent"} onClick={() => onClickItem(category.categoryId)}>
        <img src={category.image} alt="prod categroy" />
        <h5>{category.name}</h5>
        <IonRippleEffect type="unbounded"></IonRippleEffect>
      </div>
    );
  }
};

export default CategoryItem;
