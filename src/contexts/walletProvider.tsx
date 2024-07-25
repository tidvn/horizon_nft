"use client";

import React, { ReactNode, useEffect } from "react";
import { useWalletStore } from "@/store";

type Props = {
    children: ReactNode;
};

const WalletProvider = ({ children }: Props) => {
    const { initializeWallet } = useWalletStore();

    useEffect(() => {
        initializeWallet();
    }, [initializeWallet]);

    return <>{children}</>;
};

export default WalletProvider;
