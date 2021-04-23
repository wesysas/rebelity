import React from 'react';
import { IonRippleEffect } from '@ionic/react';

import { LeftSidebarProps } from './types';
import './LeftSidebar.scss';

export class LeftSidebar extends React.PureComponent<LeftSidebarProps> {

  render() {
    const {
      active,
      menus,
      onClickMenu
    } = this.props;

    return (
      <div className="left-sidebar">
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {
            menus
            .map(m => (
              <div key={m.key} className={m.key == active ? "nav-item nav-link active ion-activatable button ripple-parent" : "nav-item nav-link ion-activatable button ripple-parent"} onClick={() => onClickMenu(m.key)}>
                {m.title}
                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
};

export default LeftSidebar;
