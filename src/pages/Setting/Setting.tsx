import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonPage } from '@ionic/react';

import RebelityContent from '../../components/RebelityContent/RebelityContent';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import StationMode from './StationMode/StationMode';
import Terminals from './Terminals/Terminals';
import Printers from './Printers/Printers';
import CustomerScreen from './CustomerScreen/CustomerScreen';

import { IGlobalState } from '../../data/coreTypes';
import { SettingScreenProps } from './types';
import './Setting.scss';

const subMenu = [
  { title: 'Mode', key: 'mode'},
  { title: 'Terminals', key: 'terminals'},
  { title: 'Printers', key: 'printers' },
  { title: 'Customer Screen', key: 'customer-screen' }
];

const Setting: React.FC<SettingScreenProps> = ({history}) => {
  
  const [active, setActive] = useState('mode');

  const onClickMenu = (key: string) => { 
    setActive(key);
  };

  return (
    <IonPage>
      <RebelityContent
        isFetching={false}>
        <LeftSidebar menus={subMenu} active={active} onClickMenu={onClickMenu}/>
        <div className="setting-container">
          {
            active == "mode" && 
            <StationMode/>
          }
          {
            active == "terminals" && 
            <Terminals/>
          }
          {
            active == "printers" && 
            <Printers/>
          }
          {
            active == "customer-screen" && 
            <CustomerScreen/>
          }
        </div>
      </RebelityContent>
    </IonPage>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
