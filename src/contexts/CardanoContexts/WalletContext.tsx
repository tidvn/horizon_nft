/* eslint-disable no-unused-vars */
"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { IWallet, WalletContextType } from "@/types";
import { useLucid } from "./LucidContext";
import { useToast } from "@/components/ui/use-toast";
import wallets from "@/constants/wallets";
import { Blockfrost, Lucid, Network, UTxO } from "lucid-cardano";
import { DECIMAL_PLACES, enviroments } from "@/constants";
import checkNetwork from "@/utils/check-network";
import React from "react";


const WalletContext = createContext<WalletContextType>(null!);
export const WalletProvider = function ({ children }: {
    children: ReactNode;
}) {
    const { lucid, setLucid } = useLucid();
    const { toast } = useToast();
    const [wallet, setWallet] = useState<IWallet>(null!);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const walletConnecttion = localStorage.getItem("wallet");
        if (walletConnecttion) {
            const walletConnected = JSON.parse(walletConnecttion);
            wallets.forEach(async function (wallet) {
                if (wallet.name.toLowerCase() === walletConnected.name) {
                    await connect({
                        name: wallet.name,
                        api: wallet.api,
                        checkApi: wallet.checkApi,
                        image: wallet.image,
                    });
                    return;
                }
            });
        }
        //  react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (wallet) {
            localStorage.setItem(
                "wallet",
                JSON.stringify({
                    name: wallet.name.toLowerCase(),
                    connectedAt: new Date().getTime(),
                }),
            );
        }
        // react-hooks/exhaustive-deps
    }, [wallet]);

    const connect = async function ({ name, api, image }: IWallet) {
        try {
            setLoading(true);
            const lucid = await Lucid.new(
                new Blockfrost(enviroments.blockfrost_api_url, enviroments.blockfrost_api_key),
                enviroments.network,
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

            const balance: number = utxos.reduce(function (balance: number, utxo: UTxO) {
                return balance + Number(utxo.assets.lovelace) / DECIMAL_PLACES;
            }, 0);

            
            setWallet(function (previous: IWallet) {
                return {
                    ...previous,
                    name: name,
                    image: image,
                    address: address,
                    balance: balance,
                    stakeKey: stakeKey,
                    poolId: poolId,
                };
            });
            setLucid(lucid);
        } catch (error:any) {
            toast({
                title: "Error",
                description: error.message,
              });
        } finally {
            setLoading(false);
        }
    };

    const disconnect = async function () {
        try {
            setWallet(null!);
            setLucid(null!);
            localStorage.removeItem("wallet");
        } catch (error:any) {
            toast({
                title: "Error",
                description: error.message,
              });
        }
    };

    const refresh = async function () {
        try {
            setLoading(true);
            const address: string = await lucid.wallet.address();
            const stakeKey: string = (await lucid.wallet.rewardAddress()) as string;
            const utxos: Array<UTxO> = await lucid.wallet.getUtxos();
            const { poolId } = await lucid.delegationAt(stakeKey as string);
            const balance: number = utxos.reduce(function (balance, utxo) {
                return balance + Number(utxo.assets.lovelace) / 1000000;
            }, 0);

            setWallet(function (previous: IWallet) {
                return {
                    ...previous,
                    address: address,
                    balance: balance,
                    stakeKey: stakeKey,
                    poolId: poolId,
                };
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <WalletContext.Provider value={{ connect, wallet, disconnect, refresh, loading }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = React.useContext(WalletContext)
    
    if (context === undefined)
      throw new Error("wrap your application in <WalletContext> to use useWallet components")
    return context
  }
export default WalletContext;
