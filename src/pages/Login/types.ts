import { RouteComponentProps } from 'react-router';

export type LoginScreenStateProps = {
  isFetching: boolean;
  isLoginedIn: boolean;
}

export type LoginScreenDispatchProps = {
  loginAdmin: (data: LoginScreenFromData, setErrors: any, history: any) => Promise<any>;
}

export type LoginScreenProps = RouteComponentProps & LoginScreenStateProps & LoginScreenDispatchProps;

export type LoginScreenFromData = {
  username: string;
  password: string;
}

export type AuthResponse = {
  accessToken: string;
}