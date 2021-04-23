import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonLoading, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';

import Button from '../../../components/Button/Button';
import { IGlobalState, ROLE_ADMIN_ID, ROLE_MANAGER_ID } from '../../../data/coreTypes';
import { 
  STATION_MODE_COFFEE_SHOP,
  STATION_MODE_BAR
} from '../../../data/coreTypes';

import { 
  StationModeProps
} from './types';

import { 
  setStationMode
} from '../actions';

import './StationMode.scss';
import { StationModeModel } from '../../../models/Setting';

const teminal_modes = [
  {
    id: STATION_MODE_COFFEE_SHOP,
    name: "Coffee Shop Mode"
  },
  {
    id: STATION_MODE_BAR,
    name: "Bar Mode"
  },
  // {
  //   id: STATION_MODE_RESTAURANT,
  //   name: "Restaurant Mode"
  // }
]

class StationMode extends React.PureComponent<StationModeProps> {
  state = {
    "cur_mode_id": STATION_MODE_COFFEE_SHOP
  };

  componentDidMount() {
    this.setState({cur_mode_id: this.props.stationModeId});
  }

  componentDidUpdate(prevProps: any) {
    // Typical usage (don't forget to compare props):
    if (this.props.stationModeId !== prevProps.stationModeId) {
      this.setState({cur_mode_id: this.props.stationModeId});
    }
  }

  changeStationMode = (event: any) => {
    this.setState({cur_mode_id: event.target.value});
  };

  saveStationMode = () => {
    const { cur_mode_id } = this.state;
    const { stationId } = this.props;
    
    this.props.setStationMode(stationId, cur_mode_id);
    
  };

  getTerminalModeById = (id: any) => {
    var modes = teminal_modes.filter(function(t) {
      return t.id == id
    })

    return modes[0].name;
  }

  render() {
    const {
      isFetching,
      //StationModes
      stationId,
      stationModeId
    } = this.props;

    console.log("stationId");
    console.log(stationId);

    const { cur_mode_id } = this.state;
    const cur_mode_name = this.getTerminalModeById(cur_mode_id);

    return (
      <div className="terminal">
        <IonLoading
          cssClass= ''
          isOpen={isFetching}
          message='Please Wait...'
        />
        <div className="teminal-box">
          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <h3 className="text-white">Terminal Mode</h3>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="form-group">
            <label>Selected Mode</label>
            <select className="form-control" value={cur_mode_id} onChange={this.changeStationMode}>
              {
                teminal_modes.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  )
                )
              }
            </select>
          </div>
            <Button cls={cur_mode_id == stationModeId ? "btn-disconnect" : "btn-block"} title={cur_mode_id == stationModeId ? "System Set to " + cur_mode_name : "Set Terminal Mode"} onClickButton={() => this.saveStationMode()}/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.SettingState.isFetching,
  //StationModes: state.SettingState.StationModes,
  stationId: state.SettingState.stationId,
  stationModeId: state.SettingState.stationModeId
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setStationMode: (stationId: number, modeId: number) => dispatch(setStationMode(stationId, modeId) as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(StationMode);
