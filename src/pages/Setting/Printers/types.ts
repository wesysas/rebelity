import { BPrinter } from '../../../models/Setting';

export type PrintersProps = {
    isFetching: boolean;
    isPrinterConnected: boolean;
    printers: BPrinter[];
    loadBluetoothPrinters: () => Promise<any>;
    connectPrinter: (address: string) => Promise<any>;
    disconnectPrinter: () => Promise<any>;
}
