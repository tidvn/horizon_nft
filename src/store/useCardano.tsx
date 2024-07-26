/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { IWallet } from "@/types";
import { Blockfrost, Lucid, Network, UTxO } from 'lucid-cardano';
import { DECIMAL_PLACES, enviroments } from '@/constants';
import { checkNetwork } from '@/utils';
import { toast } from '@/components/ui/use-toast';

interface BlockchainState {
    wallet: IWallet | null;
    lucid: Lucid | null;
    connect: (wallet: IWallet) => Promise<void>;
    disconnect: () => Promise<void>;
}

export const useCardanoStore = create<BlockchainState>((set) => ({
    loading: false,
    wallet: null,
    lucid: null,
    connect: async (wallet: IWallet) => {
        try{
        const { name, api, image } = wallet;
        const lucid = await Lucid.new(
            new Blockfrost(enviroments.blockfrost_api_url, enviroments.blockfrost_api_key),
            enviroments.network
        );
        lucid.selectWallet(await api());
        const address: string = (await lucid.wallet.address()) as string;
        const networkConnection: Network = checkNetwork({
            address: address as string,
            pattern: "test",
        });
        if (networkConnection !== enviroments.network) {
            throw new Error(`This app is only available on ${enviroments.network} network`);
        }
        const stakeKey: string = (await lucid.wallet.rewardAddress()) as string;
        const utxos: Array<UTxO> = (await lucid.wallet.getUtxos()) as Array<UTxO>;
        const { poolId } = await lucid.delegationAt(stakeKey as string);

        const balance: number = utxos.reduce((balance: number, utxo: UTxO) => {
            return balance + Number(utxo.assets.lovelace) / DECIMAL_PLACES;
        }, 0);
        set({
            wallet: {
                name: name,
                image: image,
                address: address,
                balance: balance,
                stakeKey: stakeKey,
                poolId: poolId,
                api: () => { },
                checkApi: () => { },
            },
            lucid: lucid,
        });
        localStorage.setItem(
            "wallet",
            JSON.stringify({
                name: name.toLowerCase(),
                connectedAt: new Date().getTime(),
            })
        );
    } catch (error:any) {
        toast({
            title: "Error",
            description: error.message,
            duration: 5000,
        });
    }
    },
    disconnect: async () => {
        set({ wallet: null, lucid: null });
        localStorage.removeItem("wallet");
    },
}));
