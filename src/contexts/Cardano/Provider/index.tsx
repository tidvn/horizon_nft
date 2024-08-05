"use client";

import { enviroments } from "@/constants";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
const CardanoProvideBase = dynamic(
    async () => (await import("@use-cardano")).CardanoProvider,
    { ssr: false }
)

export const CardanoProvider = function ({ children }: PropsWithChildren) {
    if (!CardanoProvideBase) {
        return;
    }
    const options: any = {
        allowedNetworks: ['Testnet'],
        testnetNetwork: 'Preprod',
        node: {
            provider: 'blockfrost',
            projectId: enviroments.blockfrost_api_key
        }
    }
    return (
        <>
            <CardanoProvideBase options={options}>
                {children}
            </CardanoProvideBase>
        </>
    );
};