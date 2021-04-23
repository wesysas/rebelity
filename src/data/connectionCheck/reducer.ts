import { SET_INTERNET_CONNECTION } from "./actions";
import { IAction } from "../coreTypes";

export class ConnectionState {
    isOnline: boolean;

    constructor() {
        this.isOnline = false;
    }
};

export const initialState = new ConnectionState();

export const ConnectionReducer = (
    state: ConnectionState = initialState,
    action: IAction<any>
): ConnectionState => {
    switch (action.type) {
        case SET_INTERNET_CONNECTION:
            return {
                ...state,
                isOnline: action.data
            }
        default:
            return state;
    }
}