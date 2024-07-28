"use client";

import dynamic from "next/dynamic";

const LucidProvider = dynamic(
    async () =>
        (await import("@/contexts/CardanoContexts/LucidContext")).LucidProvider,
    { ssr: false }
);
const WalletProvider = dynamic(
    async () =>
        (await import("@/contexts/CardanoContexts/WalletContext")).WalletProvider,
    { ssr: false }
);

const CardanoProvider = function ({ children }: {
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

export default CardanoProvider;