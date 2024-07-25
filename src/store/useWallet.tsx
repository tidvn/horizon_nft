import create from "zustand";
import { IWallet } from "@/types";
import { Blockfrost, Lucid, Network, UTxO } from "lucid-cardano";
import { enviroments, DECIMAL_PLACES } from "@/constants";
import { wallets } from "@/constants";
import { checkNetwork } from "@/utils";

interface WalletState {
    connect: (wallet: IWallet) => Promise<void>;
    disconnect: () => Promise<void>;
    refresh: () => Promise<void>;
    loading: boolean;
    wallet: IWallet | null;
    lucid: Lucid | null;
    setLucid: (lucid: Lucid | null) => void;
    initializeWallet: () => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
    loading: false,
    wallet: null,
    lucid: null,
    setLucid: (lucid) => set({ lucid }),
    initializeWallet: async () => {
        const walletConnection = localStorage.getItem("wallet");
        if (walletConnection) {
            const walletConnected = JSON.parse(walletConnection);
            for (const wallet of wallets) {
                if (wallet.name.toLowerCase() === walletConnected.name) {
                    await get().connect(wallet);
                    return;
                }
            }
        }
    },
    connect: async ({ name, api, image }: IWallet) => {
        set({ loading: true });
        try {
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
                throw new Error("Invalid network connection");
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
        } catch (error: any) {
            console.error("Error", error.message);
        } finally {
            set({ loading: false });
        }
    },
    disconnect: async () => {
        set({ wallet: null, lucid: null });
        localStorage.removeItem("wallet");
    },
    refresh: async () => {
        set({ loading: true });
        try {
            const { lucid, wallet } = get();
            if (!lucid) throw new Error("Lucid is not initialized");
            const address: string = await lucid.wallet.address();
            const stakeKey: string = (await lucid.wallet.rewardAddress()) as string;
            const utxos: Array<UTxO> = await lucid.wallet.getUtxos();
            const { poolId } = await lucid.delegationAt(stakeKey as string);
            const balance: number = utxos.reduce((balance, utxo) => {
                return balance + Number(utxo.assets.lovelace) / DECIMAL_PLACES;
            }, 0);

            set({
                wallet: {
                    name: wallet?.name || '',
                    image: wallet?.image || '',
                    address: address,
                    balance: balance,
                    stakeKey: stakeKey,
                    poolId: poolId,
                    api: () => { },
                    checkApi: () => { },
                },
            });
        } catch (error) {
            console.error(error);
        } finally {
            set({ loading: false });
        }
    },
}));
