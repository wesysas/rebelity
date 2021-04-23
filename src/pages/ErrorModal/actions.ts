import { IAction } from '../../data/coreTypes';
import { ErrorActionProps } from './';

export const OPEN_ERROR = 'OPEN_ERROR';
export const CLOSE_ERROR = 'CLOSE_ERROR';
export const openError = ({
  type,
  onPress
}: ErrorActionProps): IAction<ErrorActionProps> => {
  let data;
  switch (type) {
    case 'connectionFail':
      data = {
        title: 'Network',
        text: 'Connection Failed. Could not connect to the network. Please try again.',
        buttonText: 'OK',
        imgSource: 'assets/img/errorStates/connection.png'
      };
      break;
    case 'itemUnavailable':
      data = {
        title: 'Blistering Barnacles!',
        text: 'Item Unavailable. There, there… we’ve got plenty else you don’t want to miss. ',
        buttonText: 'OK',
        imgSource: 'assets/img/errorStates/item.png'
      };
      break;
    case 'paymentFail':
      data = {
        title: 'Ailaa!',
        text: 'Payment Rejected. Please verify you entered details correctly.',
        buttonText: 'TRY AGAIN',
        imgSource: 'assets/img/errorStates/payment.png'
      };
      break;
    case 'noResults':
      data = {
        title: 'Let it go!',
        text: 'No Results. Dang! Sometimes s**t hits the fan but we’ll all come out alright.',
        buttonText: 'TRY AGAIN',
        imgSource: 'assets/img/errorStates/results.png'
      };
      break;
    case 'failedLogin':
      data = {
        title: 'Login',
        text: 'Login Failed, User name/ Password is incorrect.',
        buttonText: 'Close',
        imgSource: 'assets/img/errorStates/login_failed.png'
      };
      break;
    default:
      data = {
        title: 'Oh My Science!',
        text: 'Unknown unknown. We are crunching a ton at the back. Please try again.',
        buttonText: 'TRY AGAIN',
        imgSource: 'assets/img/errorStates/unknown.png'
      };
  }
  return {
    type: OPEN_ERROR,
    data: { ...data, onPress }
  };
};
export const closeError = (): IAction<undefined> => {
  return {
    type: CLOSE_ERROR,
    data: undefined
  };
};
