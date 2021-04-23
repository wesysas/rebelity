import { IAction } from '../../data/coreTypes';

import {
  REQUEST_BLUETOOTH_PRINTERS,
  RECEIVE_BLUETOOTH_PRINTERS,
  FAILURE_BLUETOOTH_PRINTERS,
  REQUEST_CONNECT_PRINTER,
  RECEIVE_CONNECT_PRINTER,
  FAILURE_CONNECT_PRINTER,
  REQUEST_DISCONNECT_PRINTER,
  RECEIVE_DISCONNECT_PRINTER,
  FAILURE_DISCONNECT_PRINTER,
  REQUEST_STRIPE_TERMINAL,
  RECEIVE_STRIPE_TERMINAL,
  FAILURE_STRIPE_TERMINAL,
  REQUEST_DISCOVER_READERS,
  RECEIVE_DISCOVER_READERS,
  FAILURE_DISCOVER_READERS,
  REQUEST_CONNECT_TERMINAL,
  RECEIVE_CONENCT_TERMINAL,
  FAILURE_CONNECT_TERMINAL,
  REQUEST_DISCONNECT_TERMINAL,
  RECEIVE_DISCONNECT_TERMINAL,
  REQUEST_GET_CUSTOMER_SCREEN_OPTIONS,
  RECEIVE_GET_CUSTOMER_SCREEN_OPTIONS,
  FAILURE_GET_CUSTOMER_SCREEN_OPTIONS,
  REQUEST_GET_CUSTOMER_SCREEN_OPTION,
  RECEIVE_GET_CUSTOMER_SCREEN_OPTION,
  FAILURE_GET_CUSTOMER_SCREEN_OPTION,
  REQUEST_ADD_CUSTOMER_SCREEN_OPTION,
  RECEIVE_ADD_CUSTOMER_SCREEN_OPTION,
  FAILURE_ADD_CUSTOMER_SCREEN_OPTION,
  REQUEST_SAVE_CUSTOMER_SCREEN_OPTION,
  RECEIVE_SAVE_CUSTOMER_SCREEN_OPTION,
  FAILURE_SAVE_CUSTOMER_SCREEN_OPTION,
  SET_STATION_ID,
  SET_CUSTOMER_SCREEN_UPDATED,
  REQUEST_SET_STATION_MODE,
  FAILURE_SET_STATION_MODE,
  RECEIVE_SET_STATION_MODE
} from './actions';

import {
  BPrinter,
  StationListItem,
  StationModel,
  TerminalReader,
  StationModeModel
} from '../../models/Setting';

import {
  STRIPE_TERMINAL_CONNECTED,
  STRIPE_TERMINAL_CONNECTING,
  STRIPE_TERMINAL_DISCONNECTED,
  STRIPE_TERMINAL_FAILED
} from './Terminals/types';

import {
  STATION_MODE_COFFEE_SHOP,
  STATION_MODE_BAR
} from '../../data/coreTypes';

import { ACCESS_STATION_ID, ACCESS_STATION_MODE } from '../../utils/session';
import AStorage from '../../utils/Storage';

export class SettingState {
  isFetching: boolean;
  isPrinterConnected: boolean;
  printers: BPrinter[];
  terminal: any;
  connectedReader: TerminalReader | null;
  readers: TerminalReader[];
  connectStatus: string;
  stationId: number;
  customerScreenOptions: StationListItem[];
  customerScreenOption: StationModel;
  customerScreenUpdated: boolean;
  stationModeId: number;

  
  constructor() {
    this.isFetching = false;
    this.isPrinterConnected = false;
    this.printers = [];
    this.terminal = null;
    this.connectedReader = null;
    this.readers = [];
    this.connectStatus = STRIPE_TERMINAL_DISCONNECTED;
    this.stationId = 0;
    this.customerScreenOptions = [];
    this.customerScreenOption = {
      stationId: 0,
      merchantId: 0,
      stationName: '',
      enableUserTipping: true,
      enableUserTouchScreen: false,
      displayCartByDefault: true,
      displayDefaultImage: false,
      defaultImageUrl: '',
      displayDefaultWebpage: false,
      defaultWebpageUrl: '',
      displayDefaultVideo: false,
      defaultVideoUrl: ''
    };
    this.customerScreenUpdated = false;
    this.stationModeId = 0;
  }
}

export const initialState = new SettingState();

export const SettingReducer = (
  state: SettingState = initialState,
  action: IAction<any>
): SettingState => {
  switch (action.type) {

    case REQUEST_BLUETOOTH_PRINTERS:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_BLUETOOTH_PRINTERS:
      return {
        ...state,
        isFetching: false
      };

    case RECEIVE_BLUETOOTH_PRINTERS:
      
      return {
        ...state,
        isFetching: false,
        printers: action.data
      };

    case REQUEST_CONNECT_PRINTER:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_CONNECT_PRINTER:
      return {
        ...state,
        isPrinterConnected: false,
        isFetching: false
      };

    case RECEIVE_CONNECT_PRINTER:
      state.printers = state.printers.filter(function( printer ) {
        printer.connected = false;
        if (printer.address == action.data) {
          printer.connected = true;
        }
        return true;
      });

      return {
        ...state,
        isFetching: false,
        isPrinterConnected: true
      };

    case REQUEST_DISCONNECT_PRINTER:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_DISCONNECT_PRINTER:
      return {
        ...state,
        isFetching: false
      };

    case RECEIVE_DISCONNECT_PRINTER:
      state.printers = state.printers.filter(function( printer ) {
        printer.connected = false;
        return true;
      });

      return {
        ...state,
        isFetching: false,
        isPrinterConnected: false
      };

    case REQUEST_STRIPE_TERMINAL:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_STRIPE_TERMINAL:
      return {
        ...state,
        isFetching: false
      };

    case RECEIVE_STRIPE_TERMINAL:
      return {
        ...state,
        isFetching: false,
        terminal: action.data.terminal,
        readers: action.data.readers
      };

    case REQUEST_DISCOVER_READERS:
      return {
        ...state,
        isFetching: true
      };

    case FAILURE_DISCOVER_READERS:
      return {
        ...state,
        isFetching: false
      };

    case RECEIVE_DISCOVER_READERS:
      return {
        ...state,
        isFetching: false,
        readers: action.data
      };

    case REQUEST_CONNECT_TERMINAL:
      return {
        ...state,
        connectStatus: STRIPE_TERMINAL_CONNECTING
      };

    case FAILURE_CONNECT_TERMINAL:
      return {
        ...state,
        connectStatus: STRIPE_TERMINAL_FAILED
      };

    case RECEIVE_CONENCT_TERMINAL:
      return {
        ...state,
        connectStatus: STRIPE_TERMINAL_CONNECTED,
        connectedReader: action.data
      };
    
    case REQUEST_DISCONNECT_TERMINAL:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_DISCONNECT_TERMINAL:
      return {
        ...state,
        isFetching: false,
        connectStatus: STRIPE_TERMINAL_DISCONNECTED,
        connectedReader: null
      };

    case REQUEST_GET_CUSTOMER_SCREEN_OPTIONS:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_GET_CUSTOMER_SCREEN_OPTIONS:
      return {
        ...state,
        isFetching: false,
        customerScreenOptions: action.data
      };

    case FAILURE_GET_CUSTOMER_SCREEN_OPTIONS:
      return {
        ...state,
        isFetching: false
      };

    case REQUEST_GET_CUSTOMER_SCREEN_OPTION:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_GET_CUSTOMER_SCREEN_OPTION:
      return {
        ...state,
        isFetching: false,
        customerScreenOption: action.data
      };

    case FAILURE_GET_CUSTOMER_SCREEN_OPTION:
      return {
        ...state,
        isFetching: false
      };

    case REQUEST_ADD_CUSTOMER_SCREEN_OPTION:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_ADD_CUSTOMER_SCREEN_OPTION:
      let options = state.customerScreenOptions;
      options.push({
        id: action.data.stationId,
        name: action.data.name
      });
      AStorage.setItem(ACCESS_STATION_ID, action.data.stationId);
      
      return {
        ...state,
        isFetching: false,
        customerScreenOptions: options,
        customerScreenOption: action.data
      };

    case FAILURE_ADD_CUSTOMER_SCREEN_OPTION:
      return {
        ...state,
        isFetching: false
      };

    case REQUEST_SAVE_CUSTOMER_SCREEN_OPTION:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_SAVE_CUSTOMER_SCREEN_OPTION:
      return {
        ...state,
        isFetching: false,
        customerScreenOption: action.data
      };

    case FAILURE_SAVE_CUSTOMER_SCREEN_OPTION:
      return {
        ...state,
        isFetching: false
      };

    case SET_STATION_ID:    
      return {
        ...state,
        stationId: action.data
      };

    case SET_CUSTOMER_SCREEN_UPDATED:    
      return {
        ...state,
        customerScreenUpdated: action.data
      };
    case REQUEST_SET_STATION_MODE:
        return {
          ...state,
          isFetching: true
        };
    case RECEIVE_SET_STATION_MODE:
        AStorage.setItem(ACCESS_STATION_MODE, action.data * 1);

        return {
          ...state,
          stationModeId: action.data,
          isFetching: false
        };
    case FAILURE_SET_STATION_MODE:
        return {
          ...state,
          isFetching: false
        };
    default:
      return state;
  }
};
