"use client";

import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

const LucidProvider = dynamic(
    async () =>
        (await import("@/contexts/CardanoContexts")).LucidProvider,
    { ssr: false, }
);
const WalletProvider = dynamic(
    async () =>
        (await import("@/contexts/CardanoContexts")).WalletProvider,
    { ssr: false }
);
const SmartContractProvider = dynamic(
    async () =>
        (await import("@/contexts/CardanoContexts")).SmartContractProvider,
    { ssr: false }
);

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