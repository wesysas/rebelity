
import { TerminalReader } from '../../../models/Setting';

export type TerminalsProps = {
    isFetching: boolean;
    connectedReader: TerminalReader | null;
    readers: TerminalReader[];
    connectStatus: string;
    createStripeTerminal: () => Promise<any>;
    findStripeReaders: () => Promise<any>;
    connectTerminal: (reader: TerminalReader) => Promise<any>;
    disconnectTerminal: () => Promise<any>;
}

export const STRIPE_TERMINAL_CONNECTED : string = "connected";
export const STRIPE_TERMINAL_DISCONNECTED : string = "disconnected";
export const STRIPE_TERMINAL_CONNECTING : string = "connecting";
export const STRIPE_TERMINAL_FAILED : string = "failed";