export type BPrinter = {
    id: number;
    name: string;
    address: string;
    connected: boolean;
}

export type TerminalReader = {
    device_type: string;
    id: string;
    ip_address: string;
    label: string;
    location: string;
    object: string;
    serial_number: string;
    status: string;
}

export type StationModel = {
    stationId: number;
    merchantId: number;
    stationName: string;
    enableUserTipping: boolean;
    enableUserTouchScreen: boolean;
    displayCartByDefault: boolean;
    displayDefaultImage: boolean;
    defaultImageUrl: string;
    displayDefaultWebpage: boolean;
    defaultWebpageUrl: string;
    displayDefaultVideo: boolean;
    defaultVideoUrl: string;
}

export type StationListItem = {
    id: number;
    name: string;
}

export type StationModeModel = {
    id: number;
    name: string;
}