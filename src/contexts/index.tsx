"use client";

import React, { ReactNode, lazy } from "react";
const LucidProvider = lazy(() => import("@/contexts/providers/LucidProvider"));
const WalletProvider = lazy(() => import("@/contexts/providers/WalletProvider"));

type Props = {
    children: ReactNode;
};

const ContextProvider = function ({ children }: Props) {
    return (
        <>
            <LucidProvider>
                <WalletProvider>
                    {children}
                </WalletProvider>
            </LucidProvider>
        </>
    );
};

export default ContextProvider;