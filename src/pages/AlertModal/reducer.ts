import { IAction } from '../../data/coreTypes';

import { OPEN_ALERT, CLOSE_ALERT } from './actions';

export class AlertState {
  isAlertShown: boolean;
  title: string;
  text: string;
  onPress!: () => void;
  isDevAlert?: boolean;
  isConfirm?: boolean;

  constructor() {
    this.isAlertShown = false;
    this.title = '';
    this.text = '';
    this.onPress = () => {};
    this.isDevAlert = false;
    this.isConfirm = false;
  }
}

export const initialState = new AlertState();

export const AlertReducer = (
  state: AlertState = initialState,
  action: IAction<any>
): AlertState => {
  switch (action.type) {
    case OPEN_ALERT:
      console.log("reducer isAlertShown");
      return {
        ...state,
        isAlertShown: true,
        ...action.data
      };
    case CLOSE_ALERT:
      return {
        ...state,
        isAlertShown: false
      };
    default:
      return state;
  }
};
