"use client";

import dynamic from "next/dynamic";

const LucidProvider = dynamic(
    async () =>
        (await import("@/contexts/CardanoContexts")).LucidProvider,
    { ssr: false }
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

export const CardanoProvider = function ({ children }: {
    children: React.ReactNode;
}) {
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