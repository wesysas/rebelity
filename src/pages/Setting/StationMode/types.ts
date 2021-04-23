
import { StationModeModel } from '../../../models/Setting';

export type StationModeProps = {
    isFetching: boolean;
    stationId: number;
    stationModeId: number;
    setStationMode: (stationId: number, modeId: number) => Promise<any>;
}
