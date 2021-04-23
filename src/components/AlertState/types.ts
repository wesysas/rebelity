export type AlertProps = {
  closeAlert: () => void;
  isAlertShown: boolean;
  onPress: () => void;
  isFetching: boolean;
};

export type AlertStateProps = {
  closeAlert: any;
  isAlertShown: any;
  title: any;
  text: any;
  onPress: any;
  isConfirm?: boolean;
};