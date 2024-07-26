"use client";

import React, { ReactNode, useEffect } from "react";
import { wallets } from "@/constants";
import { useCardanoStore } from "@/store/useCardano";


const CardanoProvider = ({ children }: {
    children: ReactNode;
}) => {
    const { connect } = useCardanoStore();
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
    return <>{children}</>;
};

export default CardanoProvider;
