"use client";

import React, { ReactNode, useEffect } from "react";
import { useWalletStore } from "@/store/useWallet";
import { wallets } from "@/constants";

type Props = {
    children: ReactNode;
};

const WalletProvider = ({ children }: Props) => {
    const { wallet,connect } = useWalletStore();

    useEffect(() => {
        const walletConnection = localStorage.getItem("wallet");
        if (walletConnection) {
            const walletConnected = JSON.parse(walletConnection);
            for (const wallet of wallets) {
                if (wallet.name.toLowerCase() === walletConnected.name) {
                    connect(wallet);
                    return;
                }
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if(!wallet){
        return
    }
    return <>{children}</>;
};

export default WalletProvider;
