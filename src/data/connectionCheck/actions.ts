import { IAction } from "../coreTypes";

export const SET_INTERNET_CONNECTION = "SET_INTERNET_CONNECTION";
export const setInternetConnection = (data: boolean): IAction<boolean> => {
  return {
    type: SET_INTERNET_CONNECTION,
    data
  };
};