import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IonGrid, IonRow, IonCol, IonLoading } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import 'capacitor-plugin-sunmi-printer';

import Button from '../../../components/Button/Button';
import PrinterTable from '../../../components/PrinterTable/PrinterTable';
import { IGlobalState } from '../../../data/coreTypes';
import { PrintersProps } from './types';
import './Printers.scss';
import { 
  loadBluetoothPrinters,
  connectPrinter,
  disconnectPrinter
} from '../actions';

const { SunmiPrinter } = Plugins;

class Printers extends React.PureComponent<PrintersProps> {

  componentDidMount() {
    this.findPrinter();
  }

  // loadPrinters = async () => {
  //   const results = (await SunmiPrinter.discoverPrinters('somefilter')).results;
  //   console.log(results[0].firstName);
  // };

  state = {
    "keyword": ''
  };
  
  findPrinter = () => {
    this.props.loadBluetoothPrinters();
  };

  onChangeSearch = (value: string) => { 
    console.log("clicked search");
    this.setState({"keyword": value});
  };

  onClickClearSearch = () => { 
    this.setState({"keyword": ""});
  };

  onClickConnect = (address: string) => { 
    console.log("clicked connect");
    console.log(address);
    console.log("printed address");
    this.props.connectPrinter(address);
  };

  onClickDisconnect = () => { 
    console.log("clicked disconect")
    this.props.disconnectPrinter();
  };

  onClickPrintTest = () => { 
    console.log("clicked print test");
    const {
      isPrinterConnected
    } = this.props;

    if (isPrinterConnected) {
      console.log("connected test");
      this.printerTest();
    }
  };

  printerTest = async () => {
    const options = {
      contents : "This is a test print \n\n",
      is_bold: true,
      is_underline: true
    }
    console.log("print options");
    console.log(options);
    const results = (await SunmiPrinter.printString(options)).results;
    console.log("print result");
    console.log(results);
  };

  render() {
    const {
      printers,
      isFetching,
      isPrinterConnected
    } = this.props;

    console.log(printers);

    const {keyword} = this.state;

    return (
      <div className="printer">
        <IonLoading
          cssClass= ''
          isOpen={isFetching}
          message='Please Wait...'
        />
        <div className="header">
          <IonGrid>
            <IonRow>
              <IonCol size="2">
                <div className="title">Printers</div>
              </IonCol>
              <IonCol size="4">
                <Button cls="btn-block" title="Find Available Printers" onClickButton={() => this.findPrinter()}/>
              </IonCol>
              <IonCol size="2">
                <Button cls="btn-test" title="Print Test" onClickButton={() => this.onClickPrintTest()}/>
              </IonCol>
              {/* <IonCol offset="1" size="5">
                <SearchBox keyword={keyword} onChangeSearch={(value) => this.onChangeSearch(value)} onClickClearSearch={() => this.onClickClearSearch()}/>
              </IonCol> */}
            </IonRow>
          </IonGrid>
        </div>
        <div className="body">
          <PrinterTable 
            data={printers} 
            isConnected={isPrinterConnected} 
            onClickConnect={(address) => this.onClickConnect(address)}
            onClickDisconnect={() => this.onClickDisconnect()}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state: IGlobalState) => ({
  isFetching: state.SettingState.isFetching,
  isPrinterConnected: state.SettingState.isPrinterConnected,
  printers: state.SettingState.printers
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadBluetoothPrinters: () => dispatch(loadBluetoothPrinters() as any),
  connectPrinter: (address: string) => dispatch(connectPrinter(address) as any),
  disconnectPrinter: () => dispatch(disconnectPrinter() as any)
});

export default connect(mapStateToProps, mapDispatchToProps)(Printers);
