import { Dispatch } from 'redux';
import { ApiOperation } from '../../api/api';
import { request } from '../../api/network';
import { IAction, STATUS_OK } from '../../data/coreTypes';
import { openError} from '../ErrorModal/actions';
import { openAlert } from '../AlertModal/actions';
import { Plugins } from '@capacitor/core';
import 'capacitor-plugin-sunmi-printer';
import { BPrinter, StationModel, TerminalReader } from '../../models/Setting';
import { loadStripeTerminal, StripeTerminal } from '@stripe/terminal-js';
import { getStore } from '../../data/configureStore';

import {
  displayCart,
  showImageByUrl,
  showVideoByUrl,
  showWebsiteByUrl
} from '../../utils/customer-screen';

const { SunmiPrinter } = Plugins;

export const REQUEST_BLUETOOTH_PRINTERS = 'REQUEST_BLUETOOTH_PRINTERS';
export const requestBluetoothPrinters = (): IAction<undefined> => {
  return {
    type: REQUEST_BLUETOOTH_PRINTERS,
    data: undefined
  };
};

export const FAILURE_BLUETOOTH_PRINTERS = 'FAILURE_BLUETOOTH_PRINTERS';
export const failureBluetoothPrinters = (): IAction<undefined> => {
  return {
    type: FAILURE_BLUETOOTH_PRINTERS,
    data: undefined
  };
};

export const RECEIVE_BLUETOOTH_PRINTERS = 'RECEIVE_BLUETOOTH_PRINTERS';
export const receiveBluetoothPrinters = (data: any): IAction<any> => {
  return {
    type: RECEIVE_BLUETOOTH_PRINTERS,
    data
  };
};

export const REQUEST_CONNECT_PRINTER = 'REQUEST_CONNECT_PRINTER';
export const requestConnectPrinter = (): IAction<undefined> => {
  return {
    type: REQUEST_CONNECT_PRINTER,
    data: undefined
  };
};

export const FAILURE_CONNECT_PRINTER = 'FAILURE_CONNECT_PRINTER';
export const failureConnectPrinter = (): IAction<undefined> => {
  return {
    type: FAILURE_CONNECT_PRINTER,
    data: undefined
  };
};

export const RECEIVE_CONNECT_PRINTER = 'RECEIVE_CONNECT_PRINTER';
export const receiveConnectPrinter = (data: any): IAction<any> => {
  return {
    type: RECEIVE_CONNECT_PRINTER,
    data
  };
};

export const REQUEST_DISCONNECT_PRINTER = 'REQUEST_DISCONNECT_PRINTER';
export const requestDisconnectPrinter = (): IAction<undefined> => {
  return {
    type: REQUEST_DISCONNECT_PRINTER,
    data: undefined
  };
};

export const FAILURE_DISCONNECT_PRINTER = 'FAILURE_DISCONNECT_PRINTER';
export const failureDisconnectPrinter = (): IAction<undefined> => {
  return {
    type: FAILURE_DISCONNECT_PRINTER,
    data: undefined
  };
};

export const RECEIVE_DISCONNECT_PRINTER = 'RECEIVE_DISCONNECT_PRINTER';
export const receiveDisconnectPrinter = (): IAction<undefined> => {
  return {
    type: RECEIVE_DISCONNECT_PRINTER,
    data: undefined
  };
};

export const REQUEST_STRIPE_TERMINAL = 'REQUEST_STRIPE_TERMINAL';
export const requestStripeTerminal = (): IAction<undefined> => {
  return {
    type: REQUEST_STRIPE_TERMINAL,
    data: undefined
  };
};

export const FAILURE_STRIPE_TERMINAL = 'FAILURE_STRIPE_TERMINAL';
export const failureStripeTerminal = (): IAction<undefined> => {
  return {
    type: FAILURE_STRIPE_TERMINAL,
    data: undefined
  };
};

export const RECEIVE_STRIPE_TERMINAL = 'RECEIVE_STRIPE_TERMINAL';
export const receiveStripeTerminal = (data: any): IAction<any> => {
  return {
    type: RECEIVE_STRIPE_TERMINAL,
    data
  };
};

export const REQUEST_DISCOVER_READERS = 'REQUEST_DISCOVER_READERS';
export const requestDiscoverReaders = (): IAction<undefined> => {
  return {
    type: REQUEST_DISCOVER_READERS,
    data: undefined
  };
};

export const FAILURE_DISCOVER_READERS = 'FAILURE_DISCOVER_READERS';
export const failureDiscoverReaders = (): IAction<undefined> => {
  return {
    type: FAILURE_DISCOVER_READERS,
    data: undefined
  };
};

export const RECEIVE_DISCOVER_READERS = 'RECEIVE_DISCOVER_READERS';
export const receiveDiscoverReaders = (data: any): IAction<any> => {
  return {
    type: RECEIVE_DISCOVER_READERS,
    data
  };
};

export const REQUEST_CONNECT_TERMINAL = 'REQUEST_CONNECT_TERMINAL';
export const requestConnectTerminal = (): IAction<undefined> => {
  return {
    type: REQUEST_CONNECT_TERMINAL,
    data: undefined
  };
};

export const FAILURE_CONNECT_TERMINAL = 'FAILURE_CONNECT_TERMINAL';
export const failureConnectTerminal = (): IAction<undefined> => {
  return {
    type: FAILURE_CONNECT_TERMINAL,
    data: undefined
  };
};

export const RECEIVE_CONENCT_TERMINAL = 'RECEIVE_CONENCT_TERMINAL';
export const receiveConnectTerminal = (data: any): IAction<any> => {
  return {
    type: RECEIVE_CONENCT_TERMINAL,
    data
  };
};

export const REQUEST_DISCONNECT_TERMINAL = 'REQUEST_DISCONNECT_TERMINAL';
export const requestDisconnectTerminal = (): IAction<undefined> => {
  return {
    type: REQUEST_DISCONNECT_TERMINAL,
    data: undefined
  };
};

export const FAILURE_DISCONNECT_TERMINAL = 'FAILURE_DISCONNECT_TERMINAL';
export const failureDisconnectTerminal = (): IAction<undefined> => {
  return {
    type: FAILURE_DISCONNECT_TERMINAL,
    data: undefined
  };
};

export const RECEIVE_DISCONNECT_TERMINAL = 'RECEIVE_DISCONNECT_TERMINAL';
export const receiveDisconnectTerminal = (): IAction<undefined> => {
  return {
    type: RECEIVE_DISCONNECT_TERMINAL,
    data: undefined
  };
};

export const REQUEST_GET_CUSTOMER_SCREEN_OPTIONS = 'REQUEST_GET_CUSTOMER_SCREEN_OPTIONS';
export const requestGetCustomerScreenOptions = (): IAction<undefined> => {
  return {
    type: REQUEST_GET_CUSTOMER_SCREEN_OPTIONS,
    data: undefined
  };
};

export const FAILURE_GET_CUSTOMER_SCREEN_OPTIONS = 'FAILURE_GET_CUSTOMER_SCREEN_OPTIONS';
export const failureGetCustomerScreenOptions = (): IAction<undefined> => {
  return {
    type: FAILURE_GET_CUSTOMER_SCREEN_OPTIONS,
    data: undefined
  };
};

export const RECEIVE_GET_CUSTOMER_SCREEN_OPTIONS = 'RECEIVE_GET_CUSTOMER_SCREEN_OPTIONS';
export const receiveCustomerScreenOptions = (data: any): IAction<any> => {
  return {
    type: RECEIVE_GET_CUSTOMER_SCREEN_OPTIONS,
    data
  };
};

export const REQUEST_GET_CUSTOMER_SCREEN_OPTION = 'REQUEST_GET_CUSTOMER_SCREEN_OPTION';
export const requestGetCustomerScreenOption = (): IAction<undefined> => {
  return {
    type: REQUEST_GET_CUSTOMER_SCREEN_OPTION,
    data: undefined
  };
};

export const FAILURE_GET_CUSTOMER_SCREEN_OPTION = 'FAILURE_GET_CUSTOMER_SCREEN_OPTION';
export const failureGetCustomerScreenOption = (): IAction<undefined> => {
  return {
    type: FAILURE_GET_CUSTOMER_SCREEN_OPTION,
    data: undefined
  };
};

export const RECEIVE_GET_CUSTOMER_SCREEN_OPTION = 'RECEIVE_GET_CUSTOMER_SCREEN_OPTION';
export const receiveCustomerScreenOption = (data: any): IAction<any> => {
  return {
    type: RECEIVE_GET_CUSTOMER_SCREEN_OPTION,
    data
  };
};

export const REQUEST_ADD_CUSTOMER_SCREEN_OPTION = 'REQUEST_ADD_CUSTOMER_SCREEN_OPTION';
export const requestAddCustomerScreenOption = (): IAction<undefined> => {
  return {
    type: REQUEST_ADD_CUSTOMER_SCREEN_OPTION,
    data: undefined
  };
};

export const FAILURE_ADD_CUSTOMER_SCREEN_OPTION = 'FAILURE_ADD_CUSTOMER_SCREEN_OPTION';
export const failureAddCustomerScreenOption = (): IAction<undefined> => {
  return {
    type: FAILURE_ADD_CUSTOMER_SCREEN_OPTION,
    data: undefined
  };
};

export const RECEIVE_ADD_CUSTOMER_SCREEN_OPTION = 'RECEIVE_ADD_CUSTOMER_SCREEN_OPTION';
export const receiveAddCustomerScreenOption = (data: any): IAction<any> => {
  return {
    type: RECEIVE_ADD_CUSTOMER_SCREEN_OPTION,
    data
  };
};

export const REQUEST_SAVE_CUSTOMER_SCREEN_OPTION = 'REQUEST_SAVE_CUSTOMER_SCREEN_OPTION';
export const requestSaveCustomerScreenOption = (): IAction<undefined> => {
  return {
    type: REQUEST_SAVE_CUSTOMER_SCREEN_OPTION,
    data: undefined
  };
};

export const FAILURE_SAVE_CUSTOMER_SCREEN_OPTION = 'FAILURE_SAVE_CUSTOMER_SCREEN_OPTION';
export const failureSaveCustomerScreenOption = (): IAction<undefined> => {
  return {
    type: FAILURE_SAVE_CUSTOMER_SCREEN_OPTION,
    data: undefined
  };
};

export const RECEIVE_SAVE_CUSTOMER_SCREEN_OPTION = 'RECEIVE_SAVE_CUSTOMER_SCREEN_OPTION';
export const receiveSaveCustomerScreenOption = (data: any): IAction<any> => {
  return {
    type: RECEIVE_SAVE_CUSTOMER_SCREEN_OPTION,
    data
  };
};

export const SET_STATION_ID = 'SET_STATION_ID';
export const setStationId = (data: any): IAction<any> => {
  return {
    type: SET_STATION_ID,
    data
  };
};

export const SET_CUSTOMER_SCREEN_UPDATED = 'SET_CUSTOMER_SCREEN_UPDATED';
export const setCustomerScreenUpdated = (data: any): IAction<any> => {
  return {
    type: SET_CUSTOMER_SCREEN_UPDATED,
    data
  };
};

export const REQUEST_SET_STATION_MODE = 'REQUEST_SET_STATION_MODE';
export const requestSetStationMode = (): IAction<undefined> => {
  return {
    type: REQUEST_SET_STATION_MODE,
    data: undefined
  };
};

export const FAILURE_SET_STATION_MODE = 'FAILURE_SET_STATION_MODE';
export const failureSetStationMode = (): IAction<undefined> => {
  return {
    type: FAILURE_SET_STATION_MODE,
    data: undefined
  };
};

export const RECEIVE_SET_STATION_MODE = 'RECEIVE_SET_STATION_MODE';
export const receiveSetStationMode = (data: any): IAction<any> => {
  return {
    type: RECEIVE_SET_STATION_MODE,
    data
  };
};

export const loadBluetoothPrinters = (
  
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestBluetoothPrinters());
    SunmiPrinter.discoverPrinters().then((res: any)=> {
      let results = res.results;
      var printers: BPrinter[] = [];
      for (var i = 0; i< results.length; i++) {
        let printer: BPrinter = {
          "id": i + 1,
          "name": results[i].name,
          "address": results[i].address,
          "connected": false
        }

        printers.push(printer);
      }
      dispatch(receiveBluetoothPrinters(printers));
    })
    .catch((err: any) => {
      dispatch(failureBluetoothPrinters());
      dispatch(
        openAlert({
          title: "Printers",
          text: "Failed to load bluetooth printers"
        })
      );
    });
  }
};

export const connectPrinter = (
  address: string
) => {
  return (dispatch: Dispatch) => {
    console.log("address");
    console.log(address);
    const options = {
      address : address
    }

    dispatch(requestConnectPrinter());
    SunmiPrinter.connectPrinter(options).then((res: any)=> {
      if (res.results == true) {
        dispatch(receiveConnectPrinter(address));  
      } else {
        dispatch(failureConnectPrinter());
        dispatch(
          openAlert({
            title: "Printers",
            text: "Failed to connect the printer"
          })
        );
      }
    })
    .catch((err: any) => {
      dispatch(failureConnectPrinter());
      dispatch(
        openAlert({
          title: "Printers",
          text: "Failed to connect the printer"
        })
      );
    });
  }
};

export const disconnectPrinter = (
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestDisconnectPrinter());
    SunmiPrinter.disconnectPrinter().then((res: any)=> {
      if (res.results == true) {
        dispatch(receiveDisconnectPrinter());  
      } else {
        dispatch(failureDisconnectPrinter());
        dispatch(
          openAlert({
            title: "Printers",
            text: "Failed to disconnect the printer"
          })
        );
      }
    })
    .catch((err: any) => {
      dispatch(failureDisconnectPrinter());
      dispatch(
        openAlert({
          title: "Printers",
          text: "Failed to disconnect the printer"
        })
      );
    });
  }
};

export const createStripeTerminal = (
  
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestStripeTerminal());
    loadTerminal(dispatch);
  }
};

const loadTerminal = async (dispatch: Dispatch) => {
  const stripeTerminal: StripeTerminal | null = (await loadStripeTerminal());
  console.log("termianl");
  console.log(stripeTerminal);
  
  if (stripeTerminal != null) {
    const terminal = stripeTerminal.create({
      onFetchConnectionToken: getConnectionToken,
      onUnexpectedReaderDisconnect: () => {
        dispatch(
          openAlert({
            title: "Stripe Terminal",
            text: "Terminal has been disconnected unexpectedly"
          })
        );
      }
    });

    console.log("stripe terminal");
    console.log(terminal);

    initDiscoverReaders(terminal, dispatch);
  }
  
}

const getConnectionToken = async () => {
    const results = (await request({
      operation: ApiOperation.TerminalToken,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }));
    
    console.log("token result");
    console.log(results);

    return results;
}

const initDiscoverReaders = (terminal: any, dispatch: Dispatch) => {
  const config = { simulated: false };
  terminal.discoverReaders(config).then(function (discoverResult: any) {
      if (discoverResult.error) {
        dispatch(failureStripeTerminal());
        dispatch(
          openAlert({
            title: "Stripe Terminal",
            text: "Failed to discover payment terminals"
          })
        );
      } else if (discoverResult.discoveredReaders.length === 0) {
        dispatch(failureStripeTerminal());
        dispatch(
          openAlert({
            title: "Stripe Terminal",
            text: "Found no readers"
          })
        );
      } else {
          const data = {
            terminal: terminal,
            readers: discoverResult.discoveredReaders
          }
          dispatch(receiveStripeTerminal(data));
      }
  });
}

export const findStripeReaders = (
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestDiscoverReaders());
    const { terminal } = getStore().getState().SettingState;
    discoverReaders(terminal, dispatch);
  }
};

const discoverReaders = (terminal: any, dispatch: Dispatch) => {
  const config = { simulated: false };
  terminal.discoverReaders(config).then(function (discoverResult: any) {
      if (discoverResult.error) {
        dispatch(failureDiscoverReaders());
        dispatch(
          openAlert({
            title: "Discover readers",
            text: "Failed to discover payment terminals"
          })
        );
      } else if (discoverResult.discoveredReaders.length === 0) {
        dispatch(failureDiscoverReaders());
        dispatch(
          openAlert({
            title: "Discover Readers",
            text: "Found no readers"
          })
        );
      } else {
          dispatch(receiveDiscoverReaders(discoverResult.discoveredReaders));
      }
  });
}

export const connectTerminal = (
  reader: TerminalReader
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestConnectTerminal());
    const { terminal } = getStore().getState().SettingState;
    
    terminal.connectReader(reader, {fail_if_in_use: true}).then(function (connectResult: any) {
      if (connectResult.error) {
        console.log(connectResult.error);
        dispatch(
          openAlert({
            title: connectResult.error.code,
            text: `Reader id: ${reader.id}, label: ${reader.label}, location: ${reader.location}, status: ${reader.status}, ip address: ${reader.ip_address}. Stripe error: ${connectResult.error.message}`
          })
        );
        dispatch(failureConnectTerminal());
      } else {
        dispatch(receiveConnectTerminal(reader));
      }
    });
  }
};

export const disconnectTerminal = (
) => {
  return (dispatch: Dispatch) => {
    dispatch(requestDisconnectTerminal());
    const { terminal } = getStore().getState().SettingState;
    
    terminal.disconnectReader();
    dispatch(receiveDisconnectTerminal());
  }
};

export const getCustomerScreenOptions = () => {
  const { currentUserId } = getStore().getState().ClockInState;
  return (dispatch: Dispatch) => {
    dispatch(requestGetCustomerScreenOptions());
    request({
      operation: ApiOperation.GetCustomerScreenOptions,
      params: {
        merchantId: currentUserId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res: any) => {
      if (res.status === STATUS_OK) {
        let stations = res.stations.map((s: any) => {
          return {
            id: s.StationId,
            name: s.Name
          };
        });
        dispatch(receiveCustomerScreenOptions(stations));
      } else {
        failureGetCustomerScreenOptionsWithAlert(dispatch, 'Get Customer Screen Options', res.message);
      }
    })
    .catch((err: any) => {
      failureGetCustomerScreenOptionsWithError(dispatch);
    });
  }
};

const failureGetCustomerScreenOptionsWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureGetCustomerScreenOptions());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureGetCustomerScreenOptionsWithError = (dispatch: Dispatch) => {
  dispatch(failureGetCustomerScreenOptions());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const getCustomerScreenOption = (stationId: number) => {
  const { customerScreenUpdated } = getStore().getState().SettingState;

  return (dispatch: Dispatch) => {
    dispatch(requestGetCustomerScreenOptions());
    request({
      operation: ApiOperation.GetCustomerScreenOption,
      params: {
        stationId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((res: any) => {
      if (res.status === STATUS_OK) {
        let station: StationModel = {
          stationId: res.station.StationId,
          merchantId: res.station.MerchantId,
          stationName: res.station.Name,
          enableUserTipping: res.station.UserTipping,
          enableUserTouchScreen: res.station.UserTouchscreen,
          displayCartByDefault: res.station.DisplayCart,
          displayDefaultImage: false,
          defaultImageUrl: res.station.DisplayPicture,
          displayDefaultWebpage: res.station.DisplayWebsite.length > 0,
          defaultWebpageUrl: res.station.DisplayWebsite,
          displayDefaultVideo: false,
          defaultVideoUrl: res.station.DisplayVideo
        };
        console.log("res.station");
        console.log(res.station);
        dispatch(receiveSetStationMode(res.station.StationMode))
        dispatch(receiveCustomerScreenOption(station));
        if (!customerScreenUpdated) {
          dispatch(setCustomerScreenUpdated(true));
          applyCustomerScreenOption(station);
        }
      } else {
        failureGetCustomerScreenOptionWithAlert(dispatch, 'Get Customer Screen Option', res.message);
      }
    })
    .catch((err: any) => {
      console.log(err)
      failureGetCustomerScreenOptionWithError(dispatch);
    });
  }
};

const failureGetCustomerScreenOptionWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureGetCustomerScreenOption());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureGetCustomerScreenOptionWithError = (dispatch: Dispatch) => {
  dispatch(failureGetCustomerScreenOption());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const addCustomerScreenOption = (station: StationModel) => {  
  const { currentUserId } = getStore().getState().ClockInState;
  const { customerScreenOptions } = getStore().getState().SettingState;
  let requestData = {
    MerchantId: currentUserId,
    Name: 'Station ' + (customerScreenOptions.length + 1),
    DisplayPicture: station.defaultImageUrl,
    DisplayVideo: station.defaultVideoUrl,
    DisplayWebsite: station.defaultWebpageUrl,
    UserTipping: station.enableUserTipping,
    UserTouchscreen: station.enableUserTouchScreen,
    DisplayCart: station.displayCartByDefault
  };

  return (dispatch: Dispatch) => {
    dispatch(requestAddCustomerScreenOption());
    request({
      operation: ApiOperation.AddCustomerScreenOption,
      variables: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res: any) => {
      if (res.status === STATUS_OK) {
        let newStation = {
          ...station,
          stationId: res.stationId
        }
        dispatch(receiveAddCustomerScreenOption(newStation));
        dispatch(setStationId(res.stationId));
        applyCustomerScreenOption(station);
      } else {
        failureAddCustomerScreenOptionWithAlert(dispatch, 'Add Customer Screen Option', res.message);
      }
    })
    .catch((err: any) => {
      failureAddCustomerScreenOptionWithError(dispatch);
    });
  }
};

const failureAddCustomerScreenOptionWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureAddCustomerScreenOption());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureAddCustomerScreenOptionWithError = (dispatch: Dispatch) => {
  dispatch(failureAddCustomerScreenOption());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

export const saveCustomerScreenOption = (station: StationModel) => {
  let requestData = {
    StationId: station.stationId,
    Name: station.stationName,
    DisplayPicture: station.defaultImageUrl,
    DisplayVideo: station.defaultVideoUrl,
    DisplayWebsite: station.defaultWebpageUrl,
    UserTipping: station.enableUserTipping,
    UserTouchscreen: station.enableUserTouchScreen,
    DisplayCart: station.displayCartByDefault
  };

  return (dispatch: Dispatch) => {
    dispatch(requestSaveCustomerScreenOption());
    request({
      operation: ApiOperation.UpdateCustomerScreenOption,
      variables: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res: any) => {
      if (res.status === STATUS_OK) {
        dispatch(receiveSaveCustomerScreenOption(station));
        applyCustomerScreenOption(station);
      } else {
        failureSaveCustomerScreenOptionWithAlert(dispatch, 'Save Customer Screen Option', res.message);
      }
    })
    .catch((err: any) => {
      failureSaveCustomerScreenOptionWithError(dispatch);
    });
  }
};

const failureSaveCustomerScreenOptionWithAlert = (dispatch: Dispatch, title: string, text: string) => {
  dispatch(failureSaveCustomerScreenOption());
  dispatch(
    openAlert({
      title: title,
      text: text
    })
  );
};

const failureSaveCustomerScreenOptionWithError = (dispatch: Dispatch) => {
  dispatch(failureSaveCustomerScreenOption());
  dispatch(
    openError({
      type: 'unknown',
      onPress: () => {}
    })
  );
};

const applyCustomerScreenOption = (options: StationModel) => {
  const { order } = getStore().getState().PosState;
  if (options.displayCartByDefault) {
    displayCart(order, options.enableUserTouchScreen);
  } else if (options.displayDefaultImage) {
    showImageByUrl(options.defaultImageUrl, options.enableUserTouchScreen);
  } else if (options.displayDefaultVideo) {
    showVideoByUrl(options.defaultVideoUrl, options.enableUserTouchScreen);
  } else if (options.displayDefaultWebpage) {
    showWebsiteByUrl(options.defaultWebpageUrl, options.enableUserTouchScreen);
  }
}

export const setStationMode = (stationId: number, modeId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(requestSetStationMode());
    
    request({
      operation: ApiOperation.UpdateStationMode,
      params: {
        stationId,
        modeId
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => {
      if (res.status == STATUS_OK) {
        console.log("terminal mode");
        console.log(modeId);
        dispatch(receiveSetStationMode(modeId));
        dispatch(
          openAlert({
            title: "Station Mode",
            text: "Station mode has been updated successfully."
          })
        );
      } else {
        dispatch(failureSetStationMode());
        dispatch(
          openAlert({
            title: "Station Mode",
            text: res.message
          })
        );
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(failureSetStationMode());
      dispatch(
        openAlert({
          title: "Station Mode",
          text: "Station mode has been failed"
        })
      );
    });
  }
};