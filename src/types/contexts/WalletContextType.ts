import { IWallet } from "@/types";

export type WalletContextType = {
    connect: ({ name, api, image }: IWallet) => Promise<void>;
    disconnect: () => Promise<void>;
    refresh: () => Promise<void>;
    loading: boolean;
    wallet: IWallet;  
};
