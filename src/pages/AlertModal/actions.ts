import { IAction } from '../../data/coreTypes';

export const OPEN_ALERT = 'OPEN_ALERT';
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const openAlert = ({
  title,
  text,
  onPress,
  isDevAlert = false,
  isConfirm = false
}: any): IAction<any> => {
  return {
    type: OPEN_ALERT,
    data: { title, text, onPress, isDevAlert, isConfirm}
  };
};
export const closeAlert = (): IAction<undefined> => {
  return {
    type: CLOSE_ALERT,
    data: undefined
  };
};
