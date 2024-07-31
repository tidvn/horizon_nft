"use client";

import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

const LucidProvider = dynamic(() => import("@/contexts/Cardano/Provider/LucidProvider"), { ssr: false, });
const WalletProvider = dynamic(() => import("@/contexts/Cardano/Provider/WalletProvider"), { ssr: false, });
const SmartContractProvider = dynamic(() => import("@/contexts/Cardano/Provider/SmartContractProvider"), { ssr: false, });


export const CardanoProvider = function ({ children }: PropsWithChildren) {
    if (!LucidProvider || !WalletProvider || !SmartContractProvider) {
        return;
    }

    return (
        <>
            <LucidProvider>
                <WalletProvider>
                    <SmartContractProvider>
                        {children}
                    </SmartContractProvider>
                </WalletProvider>
            </LucidProvider>
        </>
    );
};