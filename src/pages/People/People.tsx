import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonPage } from '@ionic/react';

import RebelityContent from '../../components/RebelityContent/RebelityContent';

import { IGlobalState } from '../../data/coreTypes';
import { PeopleScreenProps } from './types';
import './People.scss';

const People: React.FC<PeopleScreenProps> = ({history}) => {
  return (
    <IonPage>
      <RebelityContent isFetching={false}>
        <div>
          Staff
        </div>
      </RebelityContent>
    </IonPage>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
