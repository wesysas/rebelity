import React from 'react';
import { IonInput, IonIcon, IonLabel, IonRippleEffect } from '@ionic/react';
import { searchOutline, closeOutline } from 'ionicons/icons';

import { SearchBoxProps } from './types';
import './SearchBox.scss';

export class Button extends React.PureComponent<SearchBoxProps> {

  render() {
    const {
      keyword,
      onChangeSearch,
      onClickClearSearch
    } = this.props;

    return (
      <div className="search-box">
        <div className="input-group-prepend">
          <IonIcon slot="icon-only" icon={searchOutline} />
        </div>
        <IonInput name="search_prod" type="text" class="" value={keyword} placeholder="Search Items" onIonChange={e => onChangeSearch(e.detail.value!)}></IonInput>
        {
          keyword.length > 0 ? (
            <div className="btn ion-activatable button ripple-parent" onClick={() => onClickClearSearch()}>
              <IonIcon slot="icon-only" icon={closeOutline} />
              <IonRippleEffect type="unbounded"></IonRippleEffect>
            </div>
          ) : (
            <div></div>
          )
        }
      </div>
    );
  }
};

export default Button;
