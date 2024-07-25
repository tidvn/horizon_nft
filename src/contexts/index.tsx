"use client";

import LucidProvider from "./lucidProvider";
import WalletProvider from "./walletProvider";

const ContextProvider = function ({ children }: {
    children: React.ReactNode;
}) {
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