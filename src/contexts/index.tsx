"use client";

import dynamic from "next/dynamic";

const LucidProvider = dynamic(
    async () =>
        await import("@/contexts/providers/LucidProvider"),
    { ssr: false }
);
const WalletProvider = dynamic(
    async () =>
        import("@/contexts/providers/WalletProvider"),
    { ssr: false }
);


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