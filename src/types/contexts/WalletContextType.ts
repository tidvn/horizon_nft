/* eslint-disable no-unused-vars */
import { IWallet } from "@/types";

export type WalletContextType = {
    connect: (wallet: IWallet) => Promise<void>;
    disconnect: () => Promise<void>;
    refresh: () => Promise<void>;
    loading: boolean;
    wallet: IWallet;  
};
