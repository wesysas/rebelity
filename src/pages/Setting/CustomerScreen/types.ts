
import { StationListItem, StationModel } from '../../../models/Setting';

export type CustomerScreenProps = {
    isFetching: boolean;
    stationId: number;
    customerScreenOptions: StationListItem[];
    customerScreenOption: StationModel;
    getCustomerScreenOptions: () => Promise<any>;
    getCustomerScreenOption: (stationId: number) => Promise<any>;
    addCustomerScreenOption: (station: StationModel) => Promise<any>;
    saveCustomerScreenOption: (station: StationModel) => Promise<any>;
}