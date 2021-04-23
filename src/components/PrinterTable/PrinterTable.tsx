import React from 'react';
import { IonGrid, IonRow, IonCol, IonInput, IonIcon, IonLabel, IonRippleEffect } from '@ionic/react';
import { searchOutline, closeOutline, trashSharp } from 'ionicons/icons';

import Button from '../Button/Button';
import { BPrinter } from '../../models/Setting';
import { PrinterTableProps } from './types';
import './PrinterTable.scss';

export class PrinterTable extends React.PureComponent<PrinterTableProps> {

  renderPrinters = () => {
    const {
      data,
      isConnected,
      onClickConnect,
      onClickDisconnect
    } = this.props;
    
    return data
      .map(p => (
        <IonRow class="table-row" key={p.id}>
          <IonCol size="1">{p.id}</IonCol>
          <IonCol size="4">{p.name}</IonCol>
          <IonCol size="4">{p.address}</IonCol>
          <IonCol size="3">
            <Button cls={p.connected ? "btn-disconnect" : "btn-connect"} title={p.connected ? "Disconnect" : "Connect"} 
              onClickButton={() => {
                if (p.connected) {
                  onClickDisconnect();
                } else {
                  onClickConnect(p.address);
                }
              }}/>
            {
              // isConnected ? (
              //   <Button cls={p.connected ? "btn-disconnect" : "btn-disabled"} title={p.connected ? "Disconnect" : "Connect"} 
              //   onClickButton={() => {
              //     if (p.connected) {
              //       onClickDisconnect();
              //     } else {
              //       onClickConnect(p.address);
              //     }
              //   }}/>
              // ) : (
              //   <Button cls={"btn-connect"} title={"Connect"} onClickButton={() => {onClickConnect(p.address)}}/>
              // )
            }
            
            {/* <div className="trash">
              <IonIcon icon={trashSharp}/>
            </div> */}
          </IonCol>
        </IonRow >
      ));
  }

  render() {
    
    return (
      <IonGrid>
        <IonRow class="table-header">
          <IonCol size="1">ID</IonCol>
          <IonCol size="4">Printer Name</IonCol>
          <IonCol size="4">Printer Address</IonCol>
          <IonCol size="3">Action</IonCol>
        </IonRow>
        {
          this.renderPrinters()
        }
      </IonGrid>
    );
  }
};

export default PrinterTable;
