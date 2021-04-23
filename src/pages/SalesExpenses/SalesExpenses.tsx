import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonPage } from '@ionic/react';

import RebelityContent from '../../components/RebelityContent/RebelityContent';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import TerminalSales from './TerminalSales/TerminalSales';
import UserSales from './UserSales/UserSales';
import WorkPeriod from './WorkPeriod/WorkPeriod';

import { IGlobalState, ROLE_ADMIN_ID } from '../../data/coreTypes';
import { SalesExpensesProps } from './types';
import './SalesExpenses.scss';

import { setActiveMenu } from './actions';

const adminMenu = [
  { title: 'Work Period', key: 'work-period'},
  { title: 'User Sales', key: 'user-sales' },
  { title: 'Terminal Sales', key: 'terminal-sales' }
];

const userMenu = [
  { title: 'User Sales', key: 'user-sales' },
];

const SalesExpenses: React.FC<SalesExpensesProps> = ({history, match, location, currentRole, activeMenu, currentUserId, saleUserId, setActiveMenu}) => {
  
  //const [active, setActive] = useState(currentRole == ROLE_ADMIN_ID ? 'work-period' : 'user-sales');
  useState(() => {
    const menu = currentRole == ROLE_ADMIN_ID ? 'work-period' : 'user-sales';
    console.log("menu");
    console.log(menu);
    setActiveMenu(menu, currentUserId);
  })

  useEffect(() => {
    
  })

  const onClickMenu = (key: string) => { 
    //setActive(key);
    console.log("key");
    console.log(key);
    console.log(currentUserId);
    setActiveMenu(key, currentUserId);
  };

  const getMenuItems = () => {
    return currentRole == ROLE_ADMIN_ID ? adminMenu : userMenu;
  };

  const renderItems = () => {
    if (currentRole == ROLE_ADMIN_ID) {
      switch (activeMenu) {
        case 'work-period':
          return <WorkPeriod history={history} match={match} location={location} />;
        case 'user-sales':
          return <UserSales history={history} match={match} location={location} />;
        case 'terminal-sales':
          return <TerminalSales history={history} match={match} location={location} />;
      }
    } else {
      return <UserSales history={history} match={match} location={location} />;
    }
  };

  return (
    <IonPage>
      <RebelityContent isFetching={false}>
        <LeftSidebar menus={getMenuItems()} active={activeMenu} onClickMenu={onClickMenu}/>
        <div className="sales-expenses-container">
        {
          renderItems()
        }
        </div>
      </RebelityContent>
    </IonPage>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  currentRole: state.ClockInState.currentRole,
  activeMenu: state.SalesExpensesState.activeMenu,
  currentUserId: state.ClockInState.currentUserId,
  saleUserId: state.SalesExpensesState.saleUserId
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveMenu: (activeMenu: string, userId: number) => dispatch(setActiveMenu(activeMenu, userId) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesExpenses);
