import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonToolbar, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { documentText, people, settings, exit, documents, construct, closeCircleOutline } from 'ionicons/icons';

import { RebelityHeaderProps, Pages } from './types';
import { logoutAdmin } from '../../pages/Login/actions';
import { setActiveMenu, exitPinUser } from '../../pages/ClockIn/actions';
import { clearOrder } from '../../pages/Pos/actions';
import { IGlobalState, ROLE_ADMIN_ID, ROLE_MANAGER_ID } from '../../data/coreTypes';
import './RebelityHeader.scss';

const routes = {
  clockedInAdmin: [
    { title: 'POS', path: '/pos', icon: documentText },
    { title: 'People', path: '/people', icon: people },
    { title: 'Reports', path: '/report', icon: documents },
    { title: 'Settings', path: '/setting', icon: settings },
    { title: 'Utilities', path: '/utility', icon: construct }
  ],
  clockedInManager: [
    { title: 'POS', path: '/pos', icon: documentText },
    { title: 'People', path: '/people', icon: people },
    { title: 'Reports', path: '/report', icon: documents },
    { title: 'Utilities', path: '/utility', icon: construct }
  ],
  clockedInUser: [
    { title: 'POS', path: '/pos', icon: documentText },
    { title: 'Reports', path: '/report', icon: documents },
    { title: 'Utilities', path: '/utility', icon: construct }
  ],
  clockedOutUser: [
    { title: 'Reports', path: '/report', icon: documents },
    { title: 'Utilities', path: '/utility', icon: construct }
  ]
};

class RebelityHeader extends React.PureComponent<RebelityHeaderProps> {

  // onChangeSegment = (value: string) => {
  //   console.log(`${value} segment selected`)};
  // }
  // renderlistItems = (list: Pages[]) => {
  //   return list
  //     .map(p => (
  //       <IonSegmentButton key={p.path} value={p.path} layout="icon-start" class="menu-button" onClick={() => this.onChangeSegment(p.path)}>
  //         <IonLabel>{p.title}</IonLabel>
  //         <IonIcon icon={p.icon} />
  //       </IonSegmentButton>
  //     ));
  // }

  renderlistItems = (list: Pages[]) => {
    const {
      activeMenu
    } = this.props;

    console.log("active");
    console.log(activeMenu);

    return list
      .map(p => (
        <IonItem  key={p.path} slot="end" class={activeMenu === p.path ? 'active-menu-button' : 'menu-button'} lines="none" mode="md" routerLink={p.path} routerDirection="none" onClick={() => this.setActive(p.path)}>
          <IonLabel>{p.title}</IonLabel>
          <IonIcon icon={p.icon} slot="start"/>
        </IonItem >
      ));
  }
  
  logout = (value: any) => {
    const {
      logoutAdmin
    } = this.props;

    logoutAdmin();
  };

  setActive = (value: string) => {
    const {
      setActiveMenu
    } = this.props;

    //this.setState({active: value});
    setActiveMenu(value);
  };

  exitUser = () => {
    const {
      exitPinUser,
      clearOrder
    } = this.props;

    clearOrder();
    exitPinUser();
  };

  render() {
    const {
      isClockedIn,
      currentRole
    } = this.props;

    return (
      <div className="rebelity-header">
        <div className="logo-box">
          <img src="assets/img/logo.png" alt="Ionic logo" />        
        </div>
        <div className="menu-container">
          <IonToolbar class="menu-bar">
            {
              isClockedIn ? (
                currentRole == ROLE_ADMIN_ID ? this.renderlistItems(routes.clockedInAdmin) : (
                  currentRole == ROLE_MANAGER_ID ? this.renderlistItems(routes.clockedInManager) : this.renderlistItems(routes.clockedInUser)
                )
              ) : this.renderlistItems(routes.clockedOutUser)
            }
            
             {/* <IonItem  slot="end" class="menu-button" lines="none" mode="md" routerLink="/report" routerDirection="none">
              <IonLabel>Report</IonLabel>
              <IonIcon icon={documents} slot="start"/>
            </IonItem >
            <IonItem  slot="end" class="menu-button" lines="none" mode="md" routerLink="/utility" routerDirection="none">
              <IonLabel>Utilities</IonLabel>
              <IonIcon icon={construct} slot="start"/>
            </IonItem >  */}
            {
              currentRole == ROLE_ADMIN_ID ? (
                <IonItem  slot="end" class="logout-button" lines="none" mode="md" routerLink="/login" routerDirection="none" onClick={() => this.logout("/logout")}>
                  <IonLabel>Logout</IonLabel>
                  <IonIcon icon={exit} slot="start"/>
                </IonItem >
              ) : (
                <IonItem  slot="end" class="logout-button" lines="none" mode="md" routerLink="/clockin" routerDirection="none" onClick={() => this.exitUser()}>
                  <IonLabel>Exit Out</IonLabel>
                  <IonIcon icon={closeCircleOutline} slot="start"/>
                </IonItem >
              )
            }
          </IonToolbar>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  isClockedIn: state.ClockInState.isClockedIn,
  currentRole: state.ClockInState.currentRole,
  activeMenu: state.ClockInState.activeMenu
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutAdmin: () => dispatch(logoutAdmin() as any),
  setActiveMenu: (nav: string) => dispatch(setActiveMenu(nav) as any),
  exitPinUser: () => dispatch(exitPinUser() as any),
  clearOrder: () => dispatch(clearOrder() as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(RebelityHeader);
