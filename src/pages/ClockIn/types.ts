import { RouteComponentProps } from 'react-router';

export type ClockScreenStateProps = {
  isFetching: boolean;
  isPinedIn: boolean;
}

export type ClockScreenDispatchProps = {
  pinInUser: (data: ClockScreenFromData, setErrors: any, history: any) => Promise<any>;
}

export type ClockScreenProps = RouteComponentProps & ClockScreenStateProps & ClockScreenDispatchProps;

export type ClockScreenFromData = {
  pinNumber: string;
}
