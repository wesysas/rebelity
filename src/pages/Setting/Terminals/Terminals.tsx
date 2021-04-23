import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonLoading, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

import Button from '../../../components/Button/Button';
import { IGlobalState, ROLE_ADMIN_ID, ROLE_MANAGER_ID } from '../../../data/coreTypes';
import { 
  TerminalsProps,
  STRIPE_TERMINAL_CONNECTED,
  STRIPE_TERMINAL_CONNECTING,
  STRIPE_TERMINAL_DISCONNECTED,
  STRIPE_TERMINAL_FAILED 
} from './types';

import { 
  createStripeTerminal, 
  findStripeReaders,
  connectTerminal,
  disconnectTerminal
} from '../actions';

import './Terminals.scss';
import { TerminalReader } from '../../../models/Setting';

class Terminals extends React.PureComponent<TerminalsProps> {
  state = {
    "cur_reader_id": ''
  };

  componentDidMount() {
    this.props.createStripeTerminal();
  }

  componentDidUpdate(prevProps: any) {
    // Typical usage (don't forget to compare props):
    if (this.props.readers !== prevProps.readers) {
      this.setState({cur_reader_id: this.props.readers[0].id});
    }
  }

  findStripeReaders = () => {
    this.props.findStripeReaders();
  };

  handleReaders = (event: any) => {
    console.log("cur id");
    console.log(event.target.value);
    this.setState({cur_reader_id: event.target.value});
  };

  connectTerminal = () => {
    const { cur_reader_id } = this.state;
    const { readers } = this.props;
    
    const cur_readers = readers.filter(function( reader ) {
      return reader.id == cur_reader_id;
    });

    if (cur_readers.length > 0) {
      this.props.connectTerminal(cur_readers[0]);
    }

  };

  disconnectTerminal = () => {
    this.props.disconnectTerminal();
  };

  render() {
    const {
      isFetching,
      readers,
      connectedReader,
      connectStatus
    } = this.props;

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
                <h3 className="text-white">Terminal Settings</h3>
              </IonCol>
              <IonCol size="4">
                <Button cls="btn-block" title="Discover Readers" onClickButton={() => this.findStripeReaders()}/>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="form-group">
            <label>Terminal <i>(online terminals)</i></label>
            {
              connectedReader == null ? 
              (
                <select className="form-control" onChange={this.handleReaders}>
                  {
                    readers.map(r => (
                    <option key={r.serial_number} value={r.id}>{r.label} - {r.status}</option>  
                      )
                    )
                  }
                </select>
              ) : (
                <h3 className="text-white">Connected Reader: {connectedReader.label}</h3>
              )
            }
          </div>
          {
            connectedReader != null ? 
            (
              <Button cls="btn-disconnect" title="Disconnect Terminal" onClickButton={() => this.disconnectTerminal()}/>              
            ) : (
              <Button cls="btn-block" title="Connect Terminal" onClickButton={() => this.connectTerminal()}/>
            )
          }
          
        </div>
        <div className="status-box">
          {
            connectStatus == STRIPE_TERMINAL_CONNECTING ? (
              <img src="assets/gif/connecting.gif" alt="Connecting" />
            ) : (
              <div>
                {
                  connectStatus == STRIPE_TERMINAL_CONNECTED ? (
                    <div className="success">
                      <IonIcon icon={checkmarkCircle}/>
                      <div>SUCCESS: Connected to {connectedReader?.label}</div>
                    </div>
                  ) : (
                    <div>
                      {
                        connectStatus == STRIPE_TERMINAL_FAILED ? (
                          <div className="failed">
                            <IonIcon icon={closeCircle}/>
                            <div>ERROR: Not connected to Terminal</div>
                          </div>
                        ) : (
                          <div></div>
                        )
                      }
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.SettingState.isFetching,
  connectedReader: state.SettingState.connectedReader,
  readers: state.SettingState.readers,
  connectStatus: state.SettingState.connectStatus
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createStripeTerminal: () => dispatch(createStripeTerminal() as any), 
  findStripeReaders: () => dispatch(findStripeReaders() as any),
  connectTerminal: (reader: TerminalReader) => dispatch(connectTerminal(reader) as any),
  disconnectTerminal: () => dispatch(disconnectTerminal() as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(Terminals);
