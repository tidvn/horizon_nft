"use client";

import dynamic from 'next/dynamic';

const LucidProvider = dynamic(() => import('./lucidProvider'), { ssr: false });
const WalletProvider = dynamic(() => import('./walletProvider'), { ssr: false });

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