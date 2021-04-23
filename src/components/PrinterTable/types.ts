import { BPrinter } from '../../models/Setting';

export type PrinterTableProps = {
  data: BPrinter[];
  isConnected: boolean;
  onClickConnect: (address: string) => void;
  onClickDisconnect: () => void;
};
