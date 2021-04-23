import { RouteComponentProps } from 'react-router';
import { ClockInUser } from '../../models/ClockInUser';

export type UtilityScreenStateProps = {
    isLoginedIn: boolean;
    adminName: string;
    pinNumber: string;
    isClockedIn: boolean;
    user?: ClockInUser | null;
    currentUserId: number;
    clockInUsers: ClockInUser[];
    isFetching: boolean;
    periodId: number;
    periodStart: string;
    currentRole: number;
    stationId: number;
    customerScreenUpdated: boolean;
    stationModeId: number;
}

export type UtilityScreenDispatchProps = {
    exitPinUser: () => Promise<any>;
    clockInUser: (pinNumber: string, periodId: number) => Promise<any>;
    clockOutUser: (payload: any) => Promise<any>;
    endWordPeriod: (periodId: number) => Promise<any>;
    startWordPeriod: () => Promise<any>;
    getCustomerScreenOption: (stationId: number) => Promise<any>;
    clearOrder: () => Promise<any>;
}

export type UtilityScreenProps = RouteComponentProps & UtilityScreenStateProps & UtilityScreenDispatchProps;

